package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics;

import java.util.List;
import lombok.Builder;


/**
 * The type User return metrics dto.
 */
@Builder
public record UserReturnMetricsDto(
    Long usersQuantity,
    List<UserMetricsDto> usersMetrics
) {

}
