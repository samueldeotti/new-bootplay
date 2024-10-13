package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.EmailInUseException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.UserNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.UserRepository;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.utils.AuthenticatedUser;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * The type User service.
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final WalletService walletService;

  /**
   * Gets all users.
   *
   * @return the all users
   */
  public List<User> getAllUsers() {
    log.info("Getting all users");
    return userRepository.findAll();
  }

  /**
   * Gets user by id.
   *
   * @param id the id
   * @return the user by id
   * @throws UserNotFoundException the user not found exception
   */
  public User getUserById(UUID id) throws UserNotFoundException {
    log.info("Getting user by id");
    return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
  }

  /**
   * Create user.
   *
   * @param user the user
   * @return the user
   * @throws EmailInUseException the email in use exception
   */
  public User createUser(User user) throws EmailInUseException {
    log.info("Creating user");
    Optional<User> usersOptional = userRepository.findByEmail(user.getEmail());

    if (usersOptional.isPresent()) {
      throw new EmailInUseException();
    }

    User savedUser = userRepository.save(user);
    Wallet savedWallet = walletService.createWallet(savedUser);
    String hashedPassword = new BCryptPasswordEncoder().encode(user.getPassword());

    savedUser.setWallet(savedWallet);
    savedUser.setPassword(hashedPassword);

    log.info("User created");
    return userRepository.save(savedUser);
  }

  /**
   * Update user user.
   *
   * @param updatedUser the updated user
   * @return the user
   * @throws EmailInUseException   the email in use exception
   * @throws UserNotFoundException the user not found exception
   */
  public User updateUser(User updatedUser) throws EmailInUseException, UserNotFoundException {
    log.info("Updating user");
    User authenticatedUser = AuthenticatedUser.getUser();

    Optional<User> usersOptional = userRepository.findByEmail(updatedUser.getEmail());

    if (usersOptional.isPresent() && !Objects.equals(usersOptional.get().getId(),
        authenticatedUser.getId())) {
      log.error("Email already in use");
      throw new EmailInUseException();
    }

    log.info("User updated {}", authenticatedUser.getName());
    log.info("User updated {}", authenticatedUser.getEmail());

    String hashedPassword = new BCryptPasswordEncoder().encode(updatedUser.getPassword());

    log.info("User updated {}", authenticatedUser.getPassword());

    return userRepository.save(authenticatedUser.toBuilder()
        .name(updatedUser.getName())
        .email(updatedUser.getEmail())
        .password(hashedPassword)
        .build());
  }


  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    log.info("Loading user by email");
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException(email));
  }


}
