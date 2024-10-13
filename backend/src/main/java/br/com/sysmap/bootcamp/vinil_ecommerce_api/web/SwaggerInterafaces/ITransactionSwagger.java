package br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.GenericMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.UserReturnMetricsDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Metrics.greatest.GreatestMetricsDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * The interface Transaction swagger.
 */
@Tag(name = "Transactions")
public interface ITransactionSwagger {

  /**
   * Gets users metrics.
   *
   * @return the users metrics
   */
  @Operation(summary = "Returns users transaction metrics", description = "Retrieve detailed metrics for all users including total albums, value spent, and points earned.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved user metrics", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = UserMetricsDto.class),
          examples = {
              @ExampleObject(value = """
                  [
                    {
                      "userId": "e257cdfd-50ae-47fb-a5f7-d201e1b8a3cb",
                      "name": "John Doe",
                      "email": "johndoe@example.com",
                      "totalAlbums": 10,
                      "removedAlbums": 2,
                      "totalValueSpent": 150,
                      "totalPointsEarned": 200
                    }
                  ]
                  """)
          }
      )),
      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "No transactions found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"No transactions found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<UserReturnMetricsDto> getUsersMetrics();

  /**
   * Gets generic metrics.
   *
   * @return the generic metrics
   */
  @Operation(summary = "Returns transaction metrics", description = "Retrieve generic metrics about transactions including total users, albums sold, albums deleted, value spent, and points generated.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved generic metrics", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = GenericMetricsDto.class),
          examples = {
              @ExampleObject(value = """
                  {
                    "totalUsers": 10,
                    "totalAlbumsSold": 100,
                    "totalAlbumsDeleted": 5,
                    "totalValueSpent": 1500,
                    "totalPointsGenerated": 2000
                  }
                  """)
          }
      )),
      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "No transactions found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"No transactions found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<GenericMetricsDto> getGenericMetrics();

  /**
   * Gets greatest metrics.
   *
   * @return the greatest metrics
   */
  @Operation(summary = "Returns greatest metrics",
      description = "Retrieve detailed metrics about the greatest album values, most sold albums, users with the most albums, users with the most points, and users who spent the most.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Successfully retrieved greatest metrics", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = GreatestMetricsDto.class),
          examples = {
              @ExampleObject(value = """
                  {
                    "albumWithGreatestValue": {
                      "albumId": "e257cdfd-50ae-47fb-a5f7-d201e1b8a3cb",
                      "albumName": "Greatest Hits",
                      "albumValue": 150.00
                    },
                    "mostSoldAlbum": {
                      "spotifyId": "spotify12345",
                      "albumName": "Top Album",
                      "totalSold": 200
                    },
                    "userWithMoreAlbums": {
                      "userId": "cb505581-3c43-48d2-81b8-2c4b0337a014",
                      "email": "user@example.com",
                      "totalAlbums": 10
                    },
                    "userWithMorePoints": {
                      "userId": "d354f0d4-c4d5-42b7-a2d3-22a3e6e8e8d9",
                      "email": "anotheruser@example.com",
                      "totalPoints": 500
                    },
                    "userWhoSpentTheMost": {
                      "userId": "a74b4d5e-4b6f-4a2d-8f6d-3d8b9f07a4d1",
                      "email": "spender@example.com",
                      "totalSpent": 1000.00
                    }
                  }
                  """)
          }
      )),

      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "No transactions found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"No transactions found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<GreatestMetricsDto> getGreatestMetrics();

}
