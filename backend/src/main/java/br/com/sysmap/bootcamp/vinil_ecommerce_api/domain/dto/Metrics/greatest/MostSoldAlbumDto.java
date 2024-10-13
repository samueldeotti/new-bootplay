package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest;

import lombok.Builder;

/**
 * The type User metrics dto.
 */
@Builder
public record MostSoldAlbumDto(
    String spotifyId,
    String albumName,
    Long totalSold
) {

}
