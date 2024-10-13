package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet.AddWalletCreditDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet.WalletDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.WalletService;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces.IWalletSwagger;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Wallet controller.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/wallet")
public class WalletController implements IWalletSwagger {

  private final WalletService walletService;

  /**
   * Gets user by id.
   *
   * @param walletId the wallet id
   * @return the user by id
   */
  @GetMapping("/{walletId}")
  public ResponseEntity<WalletDto> getWalletById(@PathVariable @Valid UUID walletId) {
    return ResponseEntity.ok(WalletDto.fromEntity(walletService.getWalletById(walletId)));
  }

  /**
   * Credit wallet response entity.
   *
   * @param addWalletCreditDto the add wallet credit dto
   * @return the response entity
   */
  @PostMapping("/credit")
  public ResponseEntity<WalletDto> creditWallet(
      @RequestBody @Valid AddWalletCreditDto addWalletCreditDto) {
    return ResponseEntity.ok(
        WalletDto.fromEntity(walletService.creditWallet(addWalletCreditDto.value())));
  }

}
