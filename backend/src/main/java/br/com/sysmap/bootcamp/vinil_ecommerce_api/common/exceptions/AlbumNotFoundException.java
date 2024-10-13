package br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The type Album not found exception.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AlbumNotFoundException extends RuntimeException {

  /**
   * Instantiates a new Album not found exception.
   */
  public AlbumNotFoundException() {
    super("Album not found");
  }

}
