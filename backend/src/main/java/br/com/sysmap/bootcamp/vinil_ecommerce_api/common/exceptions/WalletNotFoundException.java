package br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The type Wallet not found exception.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class WalletNotFoundException extends RuntimeException {

  /**
   * Instantiates a new Wallet not found exception.
   */
  public WalletNotFoundException() {
    super("Wallet Not Found");
  }
}
