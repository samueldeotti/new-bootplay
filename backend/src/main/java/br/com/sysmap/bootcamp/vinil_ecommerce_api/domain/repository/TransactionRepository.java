package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.AlbumWithGreatestValueDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.MostSoldAlbumDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWhoSpentTheMostDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMoreAlbumsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMorePointsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Transaction;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * The interface Transaction repository.
 */
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

  @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END FROM Transaction t")
  boolean existsTransactions();

  @Query("SELECT COUNT(t) FROM Transaction t")
  Long countTransactions();

  @Query("SELECT COUNT(DISTINCT t.user) FROM Transaction t")
  Long countUsers();

  @Query("SELECT SUM(t.value) FROM Transaction t")
  BigDecimal sumTransactions();

  @Query("SELECT COUNT(t) FROM Transaction t WHERE t.album.deletedAt IS NULL")
  Long countNotDeletedAlbums();

  @Query("SELECT SUM(t.pointsEarned) FROM Transaction t")
  Long transactionsPoints();

  // =================================================================
  //it returns a list of objects, it's not the best way to do it, but it works, i don't have to create a new dto, and there was no time.
  @Query("SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserMetricsDto("
      + "u.id, "
      + "u.name, "
      + "u.email, "
      + "COUNT(a), "
      + "SUM(t.value), "
      + "SUM(t.pointsEarned)) "
      + "FROM User u "
      + "LEFT JOIN u.albums a "
      + "LEFT JOIN u.transactions t "
      + "GROUP BY u.id, u.name, u.email")
  List<UserMetricsDto> getUserMetricsWithTransactionsAndNotDeletedAlbums();


  @Query(
      "SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.AlbumWithGreatestValueDto(a.id, a.name, a.value) "
          + "FROM Album a "
          + "WHERE a.value = (SELECT MAX(a2.value) FROM Album a2)")
  List<AlbumWithGreatestValueDto> getAlbumWithGreatestValue();

  //for now, it's not the best, but it is working
  @Query(
      "SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.MostSoldAlbumDto(a.idSpotify, a.name, COUNT(t)) "
          + "FROM Album a "
          + "JOIN a.transaction t "
          + "GROUP BY a.idSpotify, a.name "
          + "ORDER BY COUNT(t) DESC")
  List<MostSoldAlbumDto> getMostSoldAlbum();

  @Query(
      "SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMoreAlbumsDto(u.id, u.email, COUNT(a)) "
          + "FROM User u "
          + "JOIN u.albums a "
          + "WHERE a.deletedAt IS NULL "
          + "GROUP BY u.id, u.email "
          + "ORDER BY COUNT(a) DESC "
          + "LIMIT 1")
  List<UserWithMoreAlbumsDto> getUserWithMoreAlbums();


  @Query(
      "SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWithMorePointsDto(u.id, u.email, SUM(t.pointsEarned)) "
          + "FROM User u "
          + "JOIN u.transactions t "
          + "GROUP BY u.id, u.email "
          + "ORDER BY SUM(t.pointsEarned) DESC "
          + "LIMIT 1")
  List<UserWithMorePointsDto> getUserWithMorePoints();


  @Query(
      "SELECT new br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.UserWhoSpentTheMostDto(u.id, u.email, SUM(t.value)) "
          + "FROM User u "
          + "JOIN u.transactions t "
          + "GROUP BY u.id, u.email "
          + "ORDER BY SUM(t.value) DESC "
          + "LIMIT 1")
  List<UserWhoSpentTheMostDto> userWhoSpentTheMost();


}
