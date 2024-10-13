package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * The interface Album repository.
 */
@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {

  @Query("SELECT a FROM Album a WHERE a.user.id = :userId AND a.deletedAt IS NULL")
  List<Album> findActiveAlbumsByUserId(UUID userId);

  @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END FROM Album a WHERE a.user.id = :userId AND a.idSpotify = :idSpotify AND a.deletedAt IS NULL")
  boolean existsByUserIdAndIdSpotify(@Param("userId") UUID userId,
      @Param("idSpotify") String idSpotify);
}
