package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The type Wallet.
 */
@Setter
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "WALLETS")
public class Wallet {

  @Schema(description = "Wallet's id", example = "550e8400-e29b-41d4-a716-446655440000")
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Schema(description = "Wallet's balance", example = "100.00")
  @PositiveOrZero
  @Column(name = "balance")
  private BigDecimal balance;

  @Schema(description = "Wallet's points", example = "100")
  @PositiveOrZero
  @Column(name = "points")
  private Integer points;

  @Schema(description = "Wallet's last update", example = "2024-09-12T23:59:59")
  @Column(name = "last_update")
  private LocalDateTime lastUpdate;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;


}
