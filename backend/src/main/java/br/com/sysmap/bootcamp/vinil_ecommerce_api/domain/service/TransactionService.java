package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.NoTransactionFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.AlbumWithGreatestValueDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.GenericMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.GreatestMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.MostSoldAlbumDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserMetricsDto;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserReturnMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMoreAlbumsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMorePointsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWhoSpentTheMostDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Transaction;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.TransactionRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * The type Transaction service.
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class TransactionService {

  private final TransactionRepository transactionRepository;


  /**
   * Create transaction.
   *
   * @param user   the user
   * @param album  the album
   * @param points the points
   * @return the transaction
   */
  public Transaction createTransaction(User user, Album album, Integer points) {

    Transaction transaction = Transaction.builder()
        .value(album.getValue())
        .pointsEarned(points)
        .createdAt(LocalDateTime.now())
        .album(album)
        .user(user)
        .build();

    log.info("Transaction saved");

    return transactionRepository.save(transaction);
  }

  /**
   * Exists transactions.
   */
  public void existsTransactions() {
    boolean transactionExists = transactionRepository.existsTransactions();
    if (!transactionExists) {
      throw new NoTransactionFoundException();
    }
  }


  /**
   * Gets all users metrics.
   *
   * @return the all users metrics
   */
  public UserReturnMetricsDto getUsersMetrics() {
    List<UserMetricsDto> usersMetrics = transactionRepository.getUserMetricsWithTransactionsAndNotDeletedAlbums();

    if (usersMetrics.isEmpty()) {
      throw new NoTransactionFoundException();
    }

    List<UserMetricsDto> metricsList = usersMetrics.stream()
        .map(metric -> UserMetricsDto.builder()
            .userId(metric.userId())
            .name(metric.name())
            .email(metric.email())
            .totalAlbums(metric.totalAlbums())
            .totalValueSpent(
                metric.totalValueSpent() != null ? metric.totalValueSpent() : BigDecimal.ZERO)
            .totalPointsEarned(metric.totalPointsEarned() != null ? metric.totalPointsEarned() : 0L)
            .build())
        .toList();

    return UserReturnMetricsDto.builder()
        .usersQuantity((long) metricsList.size())
        .usersMetrics(metricsList)
        .build();
  }

  /**
   * Gets greatest metrics.
   *
   * @return the greatest metrics
   */
  public GreatestMetricsDto getGreatestMetrics() {

    existsTransactions();

    AlbumWithGreatestValueDto albumWithGreatestValueResult = transactionRepository.getAlbumWithGreatestValue()
        .getFirst();
    MostSoldAlbumDto mostSoldAlbumResult = transactionRepository.getMostSoldAlbum().getFirst();
    UserWithMoreAlbumsDto userWithMoreAlbumsResult = transactionRepository.getUserWithMoreAlbums()
        .getFirst();
    UserWithMorePointsDto userWithMorePointsResult = transactionRepository.getUserWithMorePoints()
        .getFirst();
    UserWhoSpentTheMostDto userWhoSpentMoreResult = transactionRepository.userWhoSpentTheMost()
        .getFirst();

    log.info("Album with greatest value: {}", albumWithGreatestValueResult);
    log.info("Most sold album: {}", mostSoldAlbumResult);
    log.info("User with more albums: {}", userWithMoreAlbumsResult);
    log.info("User with more points: {}", userWithMorePointsResult);
    log.info("User who spent the most: {}", userWhoSpentMoreResult);

    return GreatestMetricsDto.builder()
        .albumWithGreatestValue(albumWithGreatestValueResult)
        .mostSoldAlbum(mostSoldAlbumResult)
        .userWithMoreAlbums(userWithMoreAlbumsResult)
        .userWithMorePoints(userWithMorePointsResult)
        .userWhoSpentTheMost(userWhoSpentMoreResult)
        .build();
  }


  /**
   * Gets generics metrics.
   *
   * @return the generics metrics
   */
  public GenericMetricsDto getGenericsMetrics() {

    existsTransactions();

    Long totalUsers = transactionRepository.countUsers();
    Long totalAlbumsSold = transactionRepository.countTransactions();
    Long totalAlbumsDeleted = totalAlbumsSold - transactionRepository.countNotDeletedAlbums();
    BigDecimal totalValueSpent = transactionRepository.sumTransactions();
    Long totalPointsGenerated = transactionRepository.transactionsPoints();

    log.info("Total users: {}", totalUsers);
    log.info("Total sold albums: {}", totalAlbumsSold);
    log.info("Total removed albums: {}", totalAlbumsDeleted);
    log.info("Total value spetn: {}", totalValueSpent);
    log.info("Total points generated: {}", totalPointsGenerated);

    return GenericMetricsDto.builder()
        .totalUsers(totalUsers)
        .totalAlbumsSold(totalAlbumsSold)
        .totalAlbumsDeleted(totalAlbumsDeleted)
        .totalValueSpent(totalValueSpent)
        .totalPointsGenerated(totalPointsGenerated)
        .build();
  }
}
