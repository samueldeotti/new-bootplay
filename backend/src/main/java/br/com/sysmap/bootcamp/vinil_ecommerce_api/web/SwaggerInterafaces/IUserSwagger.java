package br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserCreationDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserUpdateReturnDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;


/**
 * The interface User swagger.
 */
@Tag(name = "User")
public interface IUserSwagger {

  /**
   * Gets users.
   *
   * @return the users
   */
  @Operation(summary = "List users")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return all users", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = UserDto.class),
          examples = {
              @ExampleObject(value = """
                      [
                          {
                              "id": "e1d2c3b4-a5f6-7g8h-9i0j-k1l2m3n4o5p6",
                              "name": "John Doe",
                              "email": "john.doe@example.com",
                              "walletId": "f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2"
                          },
                          {
                              "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
                              "name": "Jane Smith",
                              "email": "jane.smith@example.com",
                              "walletId": "v9w0x1y2-z3a4-b5c6-d7e8-f9g0h1i2j3k4"
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
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<List<UserDto>> getUsers();

  /**
   * Gets user by id.
   *
   * @param id the id
   * @return the user by id
   */
  @Operation(summary = "Get a user")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return a user by id", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = UserDto.class),
          examples = {
              @ExampleObject(value = """
                      {
                          "id": "e1d2c3b4-a5f6-7g8h-9i0j-k1l2m3n4o5p6",
                          "name": "John Doe",
                          "email": "john.doe@example.com",
                          "walletId": "f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2"
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
  ResponseEntity<UserDto> getUserById(UUID id);

  /**
   * Create user response entity.
   *
   * @param userCreationDto the user creation dto
   * @return the response entity
   */
  @Operation(summary = "Create a new user")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "User created successfully", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = UserDto.class),
          examples = {
              @ExampleObject(value = """
                      {
                          "id": "e1d2c3b4-a5f6-7g8h-9i0j-k1l2m3n4o5p6",
                          "name": "John Doe",
                          "email": "john.doe@example.com",
                          "walletId": "f7g8h9i0-j1k2-l3m4-n5o6-p7q8r9s0t1u2"
                      }
                  """)
          }
      )),
      @ApiResponse(responseCode = "400", description = "Invalid user data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid user data\"")
          }
      )),
      @ApiResponse(responseCode = "409", description = "Email already in use", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Email already in use\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<UserDto> createUser(UserCreationDto userCreationDto);

  /**
   * Update user response entity.
   *
   * @param userCreationDto the user creation dto
   * @return the response entity
   */
  @Operation(summary = "Update a user")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "User updated successfully", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = UserDto.class),
          examples = {
              @ExampleObject(value = """
                      {
                          "id": "e1d2c3b4-a5f6-7g8h-9i0j-k1l2m3n4o5p6",
                          "name": "John Doe",
                          "email": "john.doe@example.com",
                      }
                  """)
          }
      )),
      @ApiResponse(responseCode = "400", description = "Invalid user data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid user data\"")
          }
      )),
      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "User not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"User not found\"")
          }
      )),
      @ApiResponse(responseCode = "409", description = "Email already in use", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Email already in use\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<UserUpdateReturnDto> updateUser(UserCreationDto userCreationDto);
}
