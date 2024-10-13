package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics;

import java.math.BigDecimal;
import lombok.Builder;

/**
 * The type Generic metrics dto.
 */
@Builder
public record GenericMetricsDto(
    Long totalUsers,
    Long totalAlbumsSold,
    Long totalAlbumsDeleted,
    BigDecimal totalValueSpent,
    Long totalPointsGenerated
) {


}
