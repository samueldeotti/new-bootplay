package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.EmailInUseException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.UserNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.UserRepository;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.WalletRepository;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class UserServiceTest {

  @Autowired
  private UserService userService;

  @MockBean
  private UserRepository userRepository;

  @MockBean
  private WalletRepository walletRepository;

  @Nested
  @DisplayName("Tests for create user")
  class CreateUser {

    @Test
    @DisplayName("Should create a user")
    public void shouldCreateAUser() {
      User user = User.builder().name("John Doe").email("john@example.com").password("password")
          .build();

      when(userRepository.findByEmail(user.getEmail())).thenReturn(java.util.Optional.empty());
      when(userRepository.save(any(User.class))).thenReturn(user);
      when(walletRepository.save(any(Wallet.class))).thenReturn(Wallet.builder().build());

      User userUpdated = userService.createUser(user);

      assertEquals(user.getId(), userUpdated.getId());
      assertEquals(user.getName(), userUpdated.getName());
      assertEquals(user.getEmail(), userUpdated.getEmail());
      assertEquals(user.getPassword(), userUpdated.getPassword());

    }

    @Test
    @DisplayName("Should return an exception when email is already in use")
    public void shouldReturnAnExceptionWhenEmailIsAlreadyInUse() {
      User user = User.builder().email("john@example.com").password("password").build();
      when(userRepository.findByEmail(user.getEmail())).thenReturn(java.util.Optional.of(user));
      assertThrows(EmailInUseException.class, () -> userService.createUser(user));

    }

  }

  @Nested
  @DisplayName("Tests for update user")
  class UpdateUser {

    @Test
    @DisplayName("Should update a user")
    public void shouldUpdateAUser() {
      UUID id = UUID.randomUUID();
      User mockedUser = User.builder().id(id).email("john@example.com")
          .password("password")
          .build();
      when(userRepository.findById(id)).thenReturn(java.util.Optional.of(mockedUser));
      when(userRepository.findByEmail(mockedUser.getEmail())).thenReturn(
          java.util.Optional.empty());
      when(userRepository.save(any(User.class))).thenReturn(mockedUser);

      User userUpdated = userService.updateUser(mockedUser);

      assertEquals(mockedUser.getId(), userUpdated.getId());
      assertEquals(mockedUser.getName(), userUpdated.getName());
      assertEquals(mockedUser.getEmail(), userUpdated.getEmail());
      assertEquals(mockedUser.getPassword(), userUpdated.getPassword());

    }

    @Test
    @DisplayName("Should return an exception when email is already in use")
    public void shouldReturnAnExceptionWhenEmailAlreadyInUse() {

      UUID id = UUID.randomUUID();
      User user = User.builder().id(id).email("john@example.com").password("password")
          .name("john")
          .build();

      when(userRepository.findByEmail(user.getEmail())).thenReturn(java.util.Optional.of(user));
      assertThrows(EmailInUseException.class, () -> userService.updateUser(user));
    }

    @Test
    @DisplayName("Should return an exception when userId does not exist")
    public void shouldReturnAnExceptionWhenUserNotFound() {

      UUID id = UUID.randomUUID();
      User users = User.builder().id(id).email("john@example.com").password("password")
          .name("john")
          .build();

      when(userRepository.findById(id)).thenReturn(java.util.Optional.empty());
      assertThrows(UserNotFoundException.class, () -> userService.updateUser(users));
    }
  }
}
