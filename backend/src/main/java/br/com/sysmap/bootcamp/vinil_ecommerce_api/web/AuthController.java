package br.com.sysmap.bootcamp.vinil_ecommerce_api.web;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Auth.AuthDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.Auth.TokenDto;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service.TokenService;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.web.SwaggerInterafaces.IAuthSwagger;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The type Auth controller.
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users/auth")
public class AuthController implements IAuthSwagger {

  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;

  /**
   * Auth user token dto.
   *
   * @param authDto the auth dto
   * @return the token dto
   */
  @PostMapping
  public TokenDto authUser(@RequestBody @Valid AuthDto authDto) {

    UsernamePasswordAuthenticationToken usernamePassword =
        new UsernamePasswordAuthenticationToken(authDto.email(), authDto.password());

    Authentication auth = authenticationManager.authenticate(usernamePassword);

    String token = tokenService.generateToken(auth.getName());

    return new TokenDto(token);
  }

}
