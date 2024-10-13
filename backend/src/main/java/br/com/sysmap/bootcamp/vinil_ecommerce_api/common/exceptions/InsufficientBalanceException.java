package br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The type Insufficient balance exception.
 */
@ResponseStatus(HttpStatus.PAYMENT_REQUIRED)
public class InsufficientBalanceException extends RuntimeException {

  /**
   * Instantiates a new Insufficient balance exception.
   */
  public InsufficientBalanceException() {
    super("Insuficient balance to buy this album");
  }
}
