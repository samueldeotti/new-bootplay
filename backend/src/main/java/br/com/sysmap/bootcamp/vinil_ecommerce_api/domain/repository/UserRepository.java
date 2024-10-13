package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The interface User repository.
 */
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmail(String email);
}
