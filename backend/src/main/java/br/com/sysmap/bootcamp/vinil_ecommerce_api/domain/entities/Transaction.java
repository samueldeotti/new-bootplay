package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Positive;
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
 * The type Transaction.
 */
@Setter
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "TRANSACTIONS")
public class Transaction {

  @Schema(description = "Transaction's id", example = "550e8400-e29b-41d4-a716-446655440000")
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Schema(description = "Transaction value", example = "100.00")
  @Positive
  @Column(name = "value")
  private BigDecimal value;

  @Schema(description = "When transaction was created", example = "2024-09-12T23:59:59")
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Schema(description = "Transaction points earned", example = "25")
  @Positive
  @Column(name = "points_earned")
  private Integer pointsEarned;

  @OneToOne
  @JoinColumn(name = "album_id")
  private Album album;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;


}
