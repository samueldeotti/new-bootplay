package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest;

import java.math.BigDecimal;
import java.util.UUID;
import lombok.Builder;

/**
 * The type User metrics dto.
 */
@Builder
public record AlbumWithGreatestValueDto(
    UUID albumId,
    String albumName,
    BigDecimal albumValue
) {

}
