package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;

/**
 * The type Wallet dto.
 */
@Builder
public record WalletDto(UUID id, BigDecimal balance, Integer points, LocalDateTime lastUpdate,
                        String userId) {

  /**
   * From entity wallet dto.
   *
   * @param wallet the wallet
   * @return the wallet dto
   */
  public static WalletDto fromEntity(Wallet wallet) {
    return WalletDto.builder()
        .id(wallet.getId())
        .balance(wallet.getBalance())
        .points(wallet.getPoints())
        .lastUpdate(wallet.getLastUpdate())
        .userId(wallet.getUser().getId().toString())
        .build();
  }

}
