package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import se.michaelthelin.spotify.enums.AlbumType;
import se.michaelthelin.spotify.enums.ModelObjectType;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.ExternalUrl;
import se.michaelthelin.spotify.model_objects.specification.Image;

import java.math.BigDecimal;

/**
 * The type Album spotify dto.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlbumSpotifyDto {

  private AlbumType albumType;
  private ArtistSimplified[] artists;
  private ExternalUrl externalUrls;
  private String id;
  private Image[] images;
  private String name;
  private String releaseDate;
  private ModelObjectType type;
  private BigDecimal value;
}