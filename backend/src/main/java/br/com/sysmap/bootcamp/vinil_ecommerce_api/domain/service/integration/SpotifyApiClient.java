package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.integration;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumSpotifyDto;
import com.neovisionaries.i18n.CountryCode;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * The type Spotify api client.
 */
@Slf4j
@Service
public class SpotifyApiClient {

  @Value("${spotify.client-id}")
  private String clientId;

  @Value("${spotify.client-secret}")
  private String clientSecret;

  private SpotifyApi spotifyApi;

  /**
   * Init.
   */
  @PostConstruct
  public void init() {
    this.spotifyApi = new SpotifyApi.Builder()
        .setClientId(clientId)
        .setClientSecret(clientSecret)
        .build();
  }

  private BigDecimal getRandomValue() {
    return BigDecimal.valueOf(Math.random() * ((100.00 - 12.00) + 1) + 12.00)
        .setScale(2, RoundingMode.UP);
  }

  /**
   * Gets albums.
   *
   * @param search the search
   * @return the albums
   */
  public List<AlbumSpotifyDto> getAlbums(String search) {
    try {
      log.info("Getting albums from Spotify");
      spotifyApi.setAccessToken(getAccessToken());
      var albums = spotifyApi.searchAlbums(search).market(CountryCode.BR).limit(30).build()
          .execute().getItems();
      List<AlbumSpotifyDto> albumDtos = new java.util.ArrayList<>(List.of());
      for (var album : albums) {
        albumDtos.add(AlbumSpotifyDto.builder()
            .albumType(album.getAlbumType())
            .artists(album.getArtists())
            .externalUrls(album.getExternalUrls())
            .id(album.getId())
            .images(album.getImages())
            .name(album.getName())
            .releaseDate(album.getReleaseDate())
            .type(album.getType())
            .value(this.getRandomValue())
            .build());
      }
      log.info("Albums from Spotify retrieved successfully");
      return albumDtos;
    } catch (IOException | SpotifyWebApiException | ParseException ex) {
      log.error("Error while trying to get albums from Spotify", ex);
      throw new RuntimeException(ex);
    }
  }

  private String getAccessToken() throws IOException, ParseException, SpotifyWebApiException {
    ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
    return clientCredentialsRequest.execute().getAccessToken();
  }
}
