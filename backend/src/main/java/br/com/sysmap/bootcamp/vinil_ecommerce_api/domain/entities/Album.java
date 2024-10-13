package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
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
 * The type Album.
 */
@Setter
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "ALBUMS")
public class Album {

  @Schema(description = "Album's id", example = "550e8400-e29b-41d4-a716-446655440000")
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  private UUID id;

  @Schema(description = "Album's name", example = "Thriller")
  @NotEmpty(message = "Name is required")
  @Column(name = "name", nullable = false, length = 150)
  private String name;

  @Schema(description = "Album's Spotify id", example = "1")
  @NotEmpty(message = "Spotify id is required")
  @Column(name = "id_spotify", nullable = false, length = 100)
  private String idSpotify;

  @Schema(description = "Album's artist name", example = "Vintage Culture")
  @NotEmpty(message = "Artist name is required")
  @Column(name = "artist_name", nullable = false, length = 150)
  private String artistName;

  @Schema(description = "Album's image url", example = "http://example.com/image.jpg")
  @NotEmpty(message = "Image url is required")
  @Column(name = "image_url", nullable = false, length = 150)
  private String imageUrl;

  @Schema(description = "Album's url", example = "http://example.com/album")
  @NotEmpty(message = "Spotify url is required")
  @Column(name = "spotify_url", nullable = false, length = 150)
  private String spotifyUrl;

  @Schema(description = "Album's value", example = "100.00")
  @Positive
  @Column(name = "value", nullable = false)
  private BigDecimal value;

  @Schema(description = "Album sold at", example = "2024-09-12T23:59:59")
  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @OneToOne(mappedBy = "album", cascade = CascadeType.ALL)
  private Transaction transaction;


}
