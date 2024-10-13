package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;


import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserCreationDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserUpdateReturnDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.UserService;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces.IUserSwagger;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type User controller.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController implements IUserSwagger {

  private final UserService userService;

  /**
   * Gets users.
   *
   * @return the users
   */
  @GetMapping
  public ResponseEntity<List<UserDto>> getUsers() {
    List<User> users = userService.getAllUsers();

    return ResponseEntity.ok(users.stream().map(UserDto::fromEntity).toList());
  }

  /**
   * Gets user by id.
   *
   * @param id the id
   * @return the user by id
   */
  @GetMapping("/{id}")
  public ResponseEntity<UserDto> getUserById(@PathVariable @Valid UUID id) {
    return ResponseEntity.ok(UserDto.fromEntity(userService.getUserById(id)));
  }

  /**
   * Create user response entity.
   *
   * @param userCreationDto the user creation dto
   * @return the response entity
   */
  @PostMapping("/signUp")
  public ResponseEntity<UserDto> createUser(@RequestBody @Valid UserCreationDto userCreationDto) {

    User user = userCreationDto.toEntity();

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(UserDto.fromEntity(userService.createUser(user)));
  }


  /**
   * Update user response entity.
   *
   * @param userCreationDto the user creation dto
   * @return the response entity
   */
  @PutMapping("/update")
  public ResponseEntity<UserUpdateReturnDto> updateUser(
      @RequestBody @Valid UserCreationDto userCreationDto) {

    User user = userCreationDto.toEntity();

    return ResponseEntity.ok(UserUpdateReturnDto.fromEntity(userService.updateUser(user)));
  }
}
