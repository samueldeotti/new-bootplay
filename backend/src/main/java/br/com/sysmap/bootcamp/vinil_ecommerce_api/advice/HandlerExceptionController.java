package br.com.sysmap.bootcamp.vinil_ecommerce_api.advice;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.AlbumAlreadyInCollectionException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.AlbumNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.EmailInUseException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.InsufficientBalanceException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.NoTransactionFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.UserNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.WalletNotFoundException;
import java.security.InvalidParameterException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * The type Handler exception controller.
 */
@ControllerAdvice
public class HandlerExceptionController {

  /**
   * Handle email in use exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(EmailInUseException.class)
  public ResponseEntity<String> handleEmailInUseException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
  }

  /**
   * Handle user not found exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  /**
   * Handle wallet not found exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(WalletNotFoundException.class)
  public ResponseEntity<String> handleWalletNotFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  /**
   * Handle album not found exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(AlbumNotFoundException.class)
  public ResponseEntity<String> handleAlbumNotFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  /**
   * Handle no transaction found exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(NoTransactionFoundException.class)
  public ResponseEntity<String> handleNoTransactionFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  /**
   * Handle album already in collection exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(AlbumAlreadyInCollectionException.class)
  public ResponseEntity<String> handleAlbumAlreadyInCollectionException(
      RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
  }

  /**
   * Handle insufficient balance exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(InsufficientBalanceException.class)
  public ResponseEntity<String> handleInsufficientBalanceException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(exception.getMessage());
  }

  /**
   * Handle validation exceptions response entity.
   *
   * @param ex the ex
   * @return the response entity
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(
            "Invalid Request Body\n" + ex.getBindingResult().getFieldError().getDefaultMessage());
  }

  /**
   * Handle invalid param exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(InvalidParameterException.class)
  public ResponseEntity<String> handleInvalidParamException(RuntimeException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(exception.getMessage());
  }


  /**
   * Handle runtime exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<String> handleRuntimeException(RuntimeException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(exception.getMessage());
  }

  /**
   * Handle exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleException(Exception exception) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(exception.getMessage());
  }

  /**
   * Handle throwable response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Throwable.class)
  public ResponseEntity<String> handleThrowable(Throwable exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_GATEWAY)
        .body(exception.getMessage());
  }
}
