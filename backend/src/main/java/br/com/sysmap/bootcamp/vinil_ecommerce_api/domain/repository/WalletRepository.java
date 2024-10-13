package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The interface Wallet repository.
 */
public interface WalletRepository extends JpaRepository<Wallet, UUID> {

  Optional<Wallet> findByUser(User users);

}
