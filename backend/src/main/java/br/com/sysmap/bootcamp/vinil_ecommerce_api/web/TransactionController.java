package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.GenericMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.GreatestMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserReturnMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.TransactionService;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces.ITransactionSwagger;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Transaction controller.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/transactions")
public class TransactionController implements ITransactionSwagger {

  private final TransactionService transactionService;

  /**
   * Gets users metrics.
   *
   * @return the users metrics
   */
  @GetMapping("/users/metrics")
  public ResponseEntity<UserReturnMetricsDto> getUsersMetrics() {
    return ResponseEntity.ok(transactionService.getUsersMetrics());
  }


  /**
   * Gets generic metrics.
   *
   * @return the generic metrics
   */
  @GetMapping("/metrics")
  public ResponseEntity<GenericMetricsDto> getGenericMetrics() {
    return ResponseEntity.ok(transactionService.getGenericsMetrics());
  }

  /**
   * Gets greatest metrics.
   *
   * @return the greatest metrics
   */
  @GetMapping("/greatest/metrics")
  public ResponseEntity<GreatestMetricsDto> getGreatestMetrics() {
    return ResponseEntity.ok(transactionService.getGreatestMetrics());
  }

}
