package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;


import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumCreationDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumSpotifyDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Album;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.AlbumService;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces.IAlbumSwagger;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Album controller.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/albums")
public class AlbumController implements IAlbumSwagger {

  private final AlbumService albumService;


  /**
   * Save album response entity.
   *
   * @param albumCreationDto the album creation dto
   * @return the response entity
   */

  @PostMapping("/sale")
  public ResponseEntity<AlbumDto> saveAlbum(@RequestBody @Valid AlbumCreationDto albumCreationDto) {

    Album album = albumCreationDto.toEntity();

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(AlbumDto.fromEntity(albumService.saveAlbum(album)));
  }

  /**
   * Gets collection albums.
   *
   * @param userId the user id
   * @return the collection albums
   */
  @GetMapping("/my-collection/{userId}")
  public ResponseEntity<List<AlbumDto>> getCollectionAlbums(@PathVariable @Valid UUID userId) {
    return ResponseEntity.ok(albumService.getCollectionAlbums(userId).stream()
        .map(AlbumDto::fromEntity).toList());
  }

  /**
   * Gets all albums.
   *
   * @param search the search
   * @return the all albums
   */
  @GetMapping("/all")
  public ResponseEntity<List<AlbumSpotifyDto>> getAllAlbums(
      @RequestParam("search") @Valid String search) {
    return ResponseEntity.ok(albumService.getAlbums(search));
  }

  /**
   * Remove album response entity.
   *
   * @param id the album id
   * @return the response entity
   */
  @DeleteMapping("/remove/{id}")
  public ResponseEntity<AlbumDto> removeAlbum(@PathVariable @Valid UUID id) {
    return ResponseEntity.ok(AlbumDto.fromEntity(albumService.removeAlbum(id)));
  }


}
