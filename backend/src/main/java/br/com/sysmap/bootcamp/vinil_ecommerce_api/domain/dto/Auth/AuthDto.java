package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

/**
 * The type Auth dto.
 */
public record AuthDto(
    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    String email,

    @NotEmpty(message = "Password is required")
    String password
) {

}
