package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics;

import java.math.BigDecimal;
import lombok.Builder;

import java.util.UUID;
import lombok.Setter;

/**
 * The type User metrics dto.
 */
@Builder
public record UserMetricsDto(
    UUID userId,
    String name,
    String email,
    Long totalAlbums,
    BigDecimal totalValueSpent,
    Long totalPointsEarned
) {

}
