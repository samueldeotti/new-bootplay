package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

/**
 * The type User creation dto.
 */
public record UserCreationDto(

    @NotEmpty(message = "Name is required")
    String name,

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    String email,

    @NotEmpty(message = "Password is required")
    String password
) {

  /**
   * To entity user.
   *
   * @return the user
   */
  public User toEntity() {
    return User.builder()
        .name(this.name)
        .email(this.email)
        .password(this.password)
        .build();
  }

}
