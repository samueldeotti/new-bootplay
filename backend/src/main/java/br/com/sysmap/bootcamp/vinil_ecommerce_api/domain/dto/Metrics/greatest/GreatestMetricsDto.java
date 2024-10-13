package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest;

import lombok.Builder;

/**
 * The type Generic metrics dto.
 */
@Builder
public record GreatestMetricsDto(
    AlbumWithGreatestValueDto albumWithGreatestValue,
    MostSoldAlbumDto mostSoldAlbum,
    UserWithMoreAlbumsDto userWithMoreAlbums,
    UserWhoSpentTheMostDto userWhoSpentTheMost,
    UserWithMorePointsDto userWithMorePoints
) {


}
