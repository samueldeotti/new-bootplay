package br.com.sysmap.bootcamp.vinil_ecommerce_api.utils;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * The type Authenticated user.
 */
public class AuthenticatedUser {

  public static User getUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal();
  }

}
