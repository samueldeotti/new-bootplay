package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.UserNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Transaction;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.AlbumRepository;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.AlbumAlreadyInCollectionException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.AlbumNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.InsufficientBalanceException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.integration.SpotifyApiClient;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumSpotifyDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.utils.AuthenticatedUser;
import jakarta.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * The type Album service.
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class AlbumService {

  private final AlbumRepository albumRepository;
  private final SpotifyApiClient spotifyApi;
  private final UserService userService;
  private final WalletService walletService;
  private final TransactionService transactionService;

  /**
   * Calculate points integer.
   *
   * @return the integer
   */
  public Integer calculatePoints() {
    DayOfWeek dayOfWeek = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).getDayOfWeek();

    return switch (dayOfWeek) {
      case MONDAY -> 7;
      case TUESDAY -> 6;
      case WEDNESDAY -> 2;
      case THURSDAY -> 10;
      case FRIDAY -> 15;
      case SATURDAY -> 20;
      case SUNDAY -> 25;
    };
  }

  /**
   * Gets albums.
   *
   * @param search the search
   * @return the albums
   */
  public List<AlbumSpotifyDto> getAlbums(String search) {
    return this.spotifyApi.getAlbums(search);
  }

  /**
   * Verify if user has albums.
   *
   * @param newAlbum the new album
   * @param user     the user
   * @throws AlbumAlreadyInCollectionException the album already in collection exception
   */
  public void verifyIfUserHasAlbums(Album newAlbum, User user)
      throws AlbumAlreadyInCollectionException {

    log.info("Verifying if user has album");
    boolean albumExists = albumRepository.existsByUserIdAndIdSpotify(user.getId(),
        newAlbum.getIdSpotify());

    if (albumExists) {
      log.error("Album already in collection");
      throw new AlbumAlreadyInCollectionException();
    }
  }

  /**
   * Save album album.
   *
   * @param album the album
   * @return the album
   * @throws AlbumAlreadyInCollectionException the album already in collection exception
   * @throws InsufficientBalanceException      the insufficient balance exception
   */
  @Transactional
  public Album saveAlbum(Album album)
      throws AlbumAlreadyInCollectionException, InsufficientBalanceException {
    log.info("Saving album");

    User user = AuthenticatedUser.getUser();

    verifyIfUserHasAlbums(album, user);

    Wallet wallet = user.getWallet();

    if (wallet.getBalance().compareTo(album.getValue()) < 0) {
      throw new InsufficientBalanceException();
    }

    album.setUser(user);
    albumRepository.save(album);

    Integer points = calculatePoints();

    walletService.subtractWallet(wallet, album.getValue(), points);

    Transaction transaction = transactionService.createTransaction(user, album, points);

    album.setTransaction(transaction);

    log.info("Album updated");
    return albumRepository.save(album);

  }


  /**
   * Gets collection albums.
   *
   * @param userId the user id
   * @return the collection albums
   * @throws UserNotFoundException the user not found exception
   */
  public List<Album> getCollectionAlbums(UUID userId) throws UserNotFoundException {
    log.info("Getting collection albums");
    userService.getUserById(userId);

    log.info("Returning collection albums");
    return albumRepository.findActiveAlbumsByUserId(userId);
  }

  /**
   * Gets album by id.
   *
   * @param albumId the album id
   * @return the album by id
   * @throws AlbumNotFoundException the album not found exception
   */
  public Album getAlbumById(UUID albumId) throws AlbumNotFoundException {
    log.info("Getting album by id");
    return albumRepository.findById(albumId)
        .orElseThrow(AlbumNotFoundException::new);
  }


  /**
   * Remove album album.
   *
   * @param albumId the album id
   * @return the album
   * @throws AlbumNotFoundException the album not found exception
   */
  public Album removeAlbum(UUID albumId) throws AlbumNotFoundException {
    Album album = getAlbumById(albumId);

    album.setDeletedAt(LocalDateTime.now());

    log.info("Album removed");

    log.info("Deleted at {}", album.getDeletedAt());

    return albumRepository.save(album);

  }
}
