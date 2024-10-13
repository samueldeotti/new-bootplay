package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Builder;

/**
 * The type Album dto.
 */
@Builder
public record AlbumDto(UUID id, String name, String artistName, String imageUrl, String spotifyUrl,
                       String idSpotify, BigDecimal value, UUID userId) {

  /**
   * From entity album dto.
   *
   * @param album the album
   * @return the album dto
   */
  public static AlbumDto fromEntity(Album album) {
    return AlbumDto.builder()
        .id(album.getId())
        .name(album.getName())
        .artistName(album.getArtistName())
        .imageUrl(album.getImageUrl())
        .spotifyUrl(album.getSpotifyUrl())
        .idSpotify(album.getIdSpotify())
        .value(album.getValue())
        .userId(album.getUser().getId())
        .build();

  }

}
