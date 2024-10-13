package br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Auth.AuthDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Auth.TokenDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

/**
 * The interface Auth swagger.
 */
@Tag(name = "User")
public interface IAuthSwagger {

  /**
   * Auth user token dto.
   *
   * @param authDto the auth dto
   * @return the token dto
   */
  @Operation(summary = "Authenticate a user")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return an token and user data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = TokenDto.class),
          examples = {
              @ExampleObject(value = "{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\"}")
          }
      )),
      @ApiResponse(responseCode = "400", description = "Usuário inexistente ou senha inválida", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Usuário inexistente ou senha inválida\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  TokenDto authUser(AuthDto authDto);

}
