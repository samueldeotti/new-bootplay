package br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The type No transaction found exception.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoTransactionFoundException extends RuntimeException {

  /**
   * Instantiates a new No transaction found exception.
   */
  public NoTransactionFoundException() {
    super("No transaction found");
  }
}
