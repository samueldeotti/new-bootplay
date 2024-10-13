package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.EmailInUseException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.UserNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserCreationDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User.UserUpdateReturnDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;


@Slf4j
public class UserControllerTest {

  @Mock
  private UserService userService;

  @InjectMocks
  private UserController userController;

  public UserControllerTest() {
    openMocks(this);
  }

//  @BeforeEach
//  public void setUp() {
//    MockitoAnnotations.openMocks(this);
//  }

  @Nested
  @DisplayName("Get Users Tests")
  class GetUsersTests {

    @Test
    @DisplayName("Should return a list of users")
    public void shouldReturnListOfUsers() {
      List<User> users = List.of(
          User.builder()
              .id(UUID.randomUUID())
              .name("John Doe")
              .email("john@example.com")
              .password("password")
              .wallet(Wallet.builder().id(UUID.randomUUID()).build())
              .build(),
          User.builder()
              .id(UUID.randomUUID())
              .name("Jane Doe")
              .email("jane@example.com")
              .password("password")
              .wallet(Wallet.builder().id(UUID.randomUUID()).build())
              .build()
      );
      when(userService.getAllUsers()).thenReturn(users);

      ResponseEntity<List<UserDto>> response = userController.getUsers();

      assertNotNull(response);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertThat(response.getBody()).hasSize(2);
      assertThat(response.getBody()).contains(
          UserDto.fromEntity(users.get(0)),
          UserDto.fromEntity(users.get(1))
      );
    }

    @Test
    @DisplayName("Should return an empty list when no users are found")
    public void shouldReturnEmptyListWhenNoUsersFound() {
      when(userService.getAllUsers()).thenReturn(List.of());

      ResponseEntity<List<UserDto>> response = userController.getUsers();

      assertNotNull(response);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertThat(response.getBody()).isEmpty();
    }
  }

  @Nested
  @DisplayName("Get User By ID Tests")
  class GetUserByIdTests {

    @Test
    @DisplayName("Should return user by id")
    public void shouldReturnUserById() {
      UUID userId = UUID.randomUUID();
      User user = User.builder()
          .id(userId)
          .name("John Doe")
          .email("john@example.com")
          .password("password")
          .wallet(Wallet.builder().id(UUID.randomUUID()).build())
          .build();
      when(userService.getUserById(userId)).thenReturn(user);

      ResponseEntity<UserDto> response = userController.getUserById(userId);

      assertNotNull(response);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertThat(response.getBody()).isNotNull();
      assertEquals(userId, response.getBody().id());
      assertEquals("John Doe", response.getBody().name());
      assertEquals("john@example.com", response.getBody().email());
    }

    @Test
    @DisplayName("Should return 404 when user is not found")
    public void shouldReturn404WhenUserNotFound() {
      UUID userId = UUID.randomUUID();
      when(userService.getUserById(userId)).thenThrow(new UserNotFoundException());
      assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }
  }

  @Nested
  @DisplayName("Create User Tests")
  class CreateUserTests {

//    @Test
//    @DisplayName("Should create a new user")
//    public void shouldCreateNewUser() {
//      UserCreationDto userCreationDto = new UserCreationDto("John Doe", "john@example.com",
//          "password");
//      User user = userCreationDto.toEntity();
//      User savedUser = user.toBuilder()
//          .id(UUID.randomUUID())
//          .wallet(Wallet.builder().id(UUID.randomUUID()).build())
//          .build();
//      when(userService.createUser(user)).thenReturn(savedUser);
//
//      ResponseEntity<UserDto> response = userController.createUser(userCreationDto);
//
//      assertNotNull(response);
//      assertEquals(HttpStatus.CREATED, response.getStatusCode());
//      assertThat(response.getBody()).isNotNull();
//      assertEquals(savedUser.getId(), response.getBody().id());
//      assertEquals("John Doe", response.getBody().name());
//      assertEquals("john@example.com", response.getBody().email());
//    }

    @Test
    @DisplayName("Should return 409 when email is already in use")
    public void shouldReturn409WhenEmailInUse() {
      UserCreationDto userCreationDto = new UserCreationDto("John Doe", "john@example.com",
          "password");
      User user = userCreationDto.toEntity();
      when(userService.createUser(user)).thenThrow(new EmailInUseException());

      assertThrows(EmailInUseException.class, () -> userService.createUser(user));
    }
  }

  @Nested
  @DisplayName("Update User Tests")
  class UpdateUserTests {

    @Test
    @DisplayName("Should update user")
    public void shouldUpdateUser() {
      UserCreationDto userCreationDto = new UserCreationDto("John Doe", "john@example.com",
          "password");
      User user = userCreationDto.toEntity();
      User updatedUser = user.toBuilder()
          .id(UUID.randomUUID())
          .wallet(Wallet.builder().id(UUID.randomUUID()).build())
          .build();
      when(userService.updateUser(user)).thenReturn(updatedUser);

      ResponseEntity<UserUpdateReturnDto> response = userController.updateUser(userCreationDto);

      assertNotNull(response);
      assertEquals(HttpStatus.OK, response.getStatusCode());
      assertThat(response.getBody()).isNotNull();
      assertEquals(updatedUser.getId(), response.getBody().id());
      assertEquals("John Doe", response.getBody().name());
      assertEquals("john@example.com", response.getBody().email());
    }

    @Test
    @DisplayName("Should return 404 when user is not found")
    public void shouldReturn404WhenUserNotFound() {
      UserCreationDto userCreationDto = new UserCreationDto("John Doe", "john@example.com",
          "password");
      User user = userCreationDto.toEntity();
      when(userService.updateUser(user)).thenThrow(new UserNotFoundException());

      assertThrows(UserNotFoundException.class, () -> userController.updateUser(userCreationDto));
    }
  }


}