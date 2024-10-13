package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

/**
 * The type Add wallet credit dto.
 */
public record AddWalletCreditDto(

    @NotNull(message = "The amount is required.")
    @Positive(message = "The amount must be greater than zero.")
    BigDecimal value
) {

}
