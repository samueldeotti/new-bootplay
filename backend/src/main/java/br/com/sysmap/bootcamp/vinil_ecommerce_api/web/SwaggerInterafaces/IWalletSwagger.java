package br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet.AddWalletCreditDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Wallet.WalletDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;


/**
 * The interface Wallet swagger.
 */
@Tag(name = "Wallet")
public interface IWalletSwagger {

  /**
   * Gets wallet by id.
   *
   * @param walletId the wallet id
   * @return the wallet by id
   */
  @Operation(summary = "Obtain user wallet")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return a wallet by id", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = WalletDto.class),
          examples = {
              @ExampleObject(value = """
                      {
                          "id": "d5b8e1f4-8a5a-4e53-a7c0-cdc2a05a3456",
                          "balance": 150.75,
                          "points": 120,
                          "userId": "9d6a43d1-ec4e-4d37-9f1d-9f9cda562c6b"
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
      @ApiResponse(responseCode = "404", description = "Wallet not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Wallet not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<WalletDto> getWalletById(@Valid UUID walletId);

  /**
   * Credit wallet response entity.
   *
   * @param value the value to be credited
   * @return the response entity
   */
  @Operation(summary = "Add credit to the user's wallet")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Wallet credited successfully", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = WalletDto.class),
          examples = {
              @ExampleObject(value = """
                      {
                          "id": "d5b8e1f4-8a5a-4e53-a7c0-cdc2a05a3456",
                          "balance": 200.75,
                          "points": 120,
                          "userId": "9d6a43d1-ec4e-4d37-9f1d-9f9cda562c6b"
                      }
                  """)
          }
      )),
      @ApiResponse(responseCode = "400", description = "Invalid amount value", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid amount value\"")
          }
      )),
      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<WalletDto> creditWallet(
      @RequestBody @Valid AddWalletCreditDto addWalletCreditDto);
}
