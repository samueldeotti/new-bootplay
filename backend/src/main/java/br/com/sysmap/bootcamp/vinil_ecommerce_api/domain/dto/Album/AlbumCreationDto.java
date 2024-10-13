package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

/**
 * The type Album creation dto.
 */
public record AlbumCreationDto(
    @NotEmpty(message = "Name is required")
    String name,

    @NotEmpty(message = "Spotify ID is required")
    String idSpotify,

    @NotEmpty(message = "Artist name is required")
    String artistName,

    @NotEmpty(message = "Image URL is required")
    String imageUrl,

    @NotEmpty(message = "Spotify URL is required")
    String spotifyUrl,

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be positive")
    BigDecimal value
) {

  /**
   * To entity album creation dto.
   *
   * @return the album creation dto
   */
  public Album toEntity() {
    return Album.builder()
        .name(this.name)
        .idSpotify(this.idSpotify)
        .artistName(this.artistName)
        .imageUrl(this.imageUrl)
        .spotifyUrl(this.spotifyUrl)
        .value(this.value)
        .build();
  }


}
