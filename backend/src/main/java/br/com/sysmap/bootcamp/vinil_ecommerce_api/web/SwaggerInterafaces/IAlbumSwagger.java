package br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumCreationDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Album.AlbumSpotifyDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * The interface Album swagger.
 */
@Tag(name = "Album")
public interface IAlbumSwagger {

  /**
   * Save album response entity.
   *
   * @param album the album
   * @return the response entity
   */
  @Operation(summary = "Buy an album")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Album saved successfully", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = AlbumDto.class),
          examples = {
              @ExampleObject(value = """
                  [
                    {
                       "id": "37409833-7297-44f4-895c-3ce16f9922cc",
                       "name": "Album Name",
                       "artistName": "Artist Name",
                       "imageUrl": "https://i.scdn.co/image/ab67616d0000b2733faa0df2405b9c5b1cdefbb4",
                       "spotifyUrl": "https://open.spotify.com/artist/5MraexJKZDrQYzS98kNwie",
                       "value": 20,
                       "userId": "fb7a63c7-eb96-485d-860d-ac164035fbbd"
                     }
                  ]
                  """)
          }
      )),
      @ApiResponse(responseCode = "400", description = "Invalid album data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid album data\"")
          }
      )),
      @ApiResponse(responseCode = "402", description = "Insufficient balance", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Insufficient balance\"")
          }
      )),
      @ApiResponse(responseCode = "403", description = "Forbidden: Insufficient permissions to perform this operation", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Forbidden: Insufficient permissions\"")
          }
      )),
      @ApiResponse(responseCode = "409", description = "Album already in collection", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Album already in collection\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<AlbumDto> saveAlbum(@RequestBody @Valid AlbumCreationDto album);

  /**
   * Gets collection albums.
   *
   * @param userId the user id
   * @return the collection albums
   */
  @Operation(summary = "Get all albums from my collection")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return all albums in user's collections", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = AlbumDto.class),
          examples = {
              @ExampleObject(value = """
                  [
                    {
                       "id": "37409833-7297-44f4-895c-3ce16f9922cc",
                       "name": "Album Name",
                       "artistName": "Artist Name",
                       "idSpotify": "1123123412312"
                       "imageUrl": "https://i.scdn.co/image/ab67616d0000b2733faa0df2405b9c5b1cdefbb4",
                       "spotifyUrl": "https://open.spotify.com/artist/5MraexJKZDrQYzS98kNwie",
                       "value": 20,
                       "userId": "fb7a63c7-eb96-485d-860d-ac164035fbbd"
                     }
                  ]
                  """)
          }
      )),
      @ApiResponse(responseCode = "403", description = "Forbidden: Insufficient permissions to access this resource", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Forbidden: Insufficient permissions\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "User not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"User not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<List<AlbumDto>> getCollectionAlbums(@PathVariable @Valid UUID userId);

  /**
   * Gets all albums.
   *
   * @param search the search parameter
   * @return the all albums
   */
  @Operation(summary = "Get all albums from Spotify service by Text parameter")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return all albums from Spotify service", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = AlbumSpotifyDto.class),
          examples = {
              @ExampleObject(value = """
                  [
                    [
                        {
                          "albumType": "SINGLE",
                          "artists": [
                            {
                              "externalUrls": {
                                "externalUrls": {
                                  "spotify": "https://open.spotify.com/artist/5MraexJKZDrQYzS98kNwie"
                                }
                              },
                              "href": "https://api.spotify.com/v1/artists/5MraexJKZDrQYzS98kNwie",
                              "id": "5MraexJKZDrQYzS98kNwie",
                              "name": "Sevdaliza",
                              "type": "ARTIST",
                              "uri": "spotify:artist:5MraexJKZDrQYzS98kNwie"
                            },
                            {
                              "externalUrls": {
                                "externalUrls": {
                                  "spotify": "https://open.spotify.com/artist/7FNnA9vBm6EKceENgCGRMb"
                                }
                              },
                              "href": "https://api.spotify.com/v1/artists/7FNnA9vBm6EKceENgCGRMb",
                              "id": "7FNnA9vBm6EKceENgCGRMb",
                              "name": "Anitta",
                              "type": "ARTIST",
                              "uri": "spotify:artist:7FNnA9vBm6EKceENgCGRMb"
                            },
                            {
                              "externalUrls": {
                                "externalUrls": {
                                  "spotify": "https://open.spotify.com/artist/6tzRZ39aZlNqlUzQlkuhDV"
                                }
                              },
                              "href": "https://api.spotify.com/v1/artists/6tzRZ39aZlNqlUzQlkuhDV",
                              "id": "6tzRZ39aZlNqlUzQlkuhDV",
                              "name": "Pabllo Vittar",
                              "type": "ARTIST",
                              "uri": "spotify:artist:6tzRZ39aZlNqlUzQlkuhDV"
                            }
                          ],
                          "externalUrls": {
                            "externalUrls": {
                              "spotify": "https://open.spotify.com/album/68KhQJFTOVcrGovzksAsWm"
                            }
                          },
                          "id": "68KhQJFTOVcrGovzksAsWm",
                          "images": [
                            {
                              "height": 640,
                              "url": "https://i.scdn.co/image/ab67616d0000b2733faa0df2405b9c5b1cdefbb4",
                              "width": 640
                            },
                            {
                              "height": 300,
                              "url": "https://i.scdn.co/image/ab67616d00001e023faa0df2405b9c5b1cdefbb4",
                              "width": 300
                            },
                            {
                              "height": 64,
                              "url": "https://i.scdn.co/image/ab67616d000048513faa0df2405b9c5b1cdefbb4",
                              "width": 64
                            }
                          ],
                          "name": "Alibi Pt. 2 (with Anitta, Pabllo Vittar & Yseult)",
                          "releaseDate": "2024-09-02",
                          "type": "ALBUM",
                          "value": 14.54
                        },
                  ]
                  """)
          }
      )),
      @ApiResponse(responseCode = "400", description = "Invalid search parameter", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid search parameter\"")
          }
      )),
      @ApiResponse(responseCode = "403", description = "Forbidden: Insufficient permissions to access this resource", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Forbidden: Insufficient permissions\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<List<AlbumSpotifyDto>> getAllAlbums(
      @RequestParam("search") @Valid String search);

  /**
   * Remove album response entity.
   *
   * @param albumId the album id
   * @return the response entity
   */
  @Operation(summary = "Delete album from my collections")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Album removed successfully"),
      @ApiResponse(responseCode = "403", description = "Forbidden: Insufficient permissions to remove this album", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Forbidden: Insufficient permissions\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "Album not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Album not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<AlbumDto> removeAlbum(@PathVariable @Valid UUID albumId);

}