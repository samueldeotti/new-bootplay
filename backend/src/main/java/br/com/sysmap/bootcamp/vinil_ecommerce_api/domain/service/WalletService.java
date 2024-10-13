package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.service;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.common.exceptions.WalletNotFoundException;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.Wallet;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.repository.WalletRepository;
import br.com.sysmap.bootcamp.vinil_ecommerce_api.utils.AuthenticatedUser;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * The type Wallet service.
 */
@RequiredArgsConstructor
@Slf4j
@Service
public class WalletService {

  private final WalletRepository walletRepository;

  /**
   * Create wallet.
   *
   * @param user the user
   * @return the wallet
   */
  public Wallet createWallet(User user) {
    Wallet wallet = Wallet.builder()
        .balance(BigDecimal.valueOf(1000))
        .points(0)
        .lastUpdate(LocalDateTime.now())
        .user(user)
        .build();

    log.info("Wallet created {}", wallet);
    return walletRepository.save(wallet);
  }

  /**
   * Subtract wallet.
   *
   * @param wallet the wallet
   * @param value  the value
   * @param points the points
   */
  public void subtractWallet(Wallet wallet, BigDecimal value, Integer points) {

    wallet.setBalance(wallet.getBalance().subtract(value));
    wallet.setPoints(wallet.getPoints() + points);
    wallet.setLastUpdate(LocalDateTime.now());

    walletRepository.save(wallet);
    log.info("Wallet updated balance {}", wallet.getBalance());
    log.info("Wallet updated points {}", wallet.getPoints());
  }

  /**
   * Gets wallet by id.
   *
   * @param id the id
   * @return the wallet by id
   * @throws WalletNotFoundException the wallet not found exception
   */
  public Wallet getWalletById(UUID id) throws WalletNotFoundException {
    log.info("Getting wallet by id");
    return walletRepository.findById(id).orElseThrow(WalletNotFoundException::new);
  }

  /**
   * Credit wallet wallet.
   *
   * @param value the value
   * @return the wallet
   * @throws WalletNotFoundException the wallet not found exception
   */
  public Wallet creditWallet(BigDecimal value) throws WalletNotFoundException {
    log.info("Crediting wallet");

    User user = AuthenticatedUser.getUser();

    Wallet wallet = walletRepository.findByUser(user).orElseThrow(WalletNotFoundException::new);

    wallet.setLastUpdate(LocalDateTime.now());
    wallet.setBalance(wallet.getBalance().add(value));

    log.info("Wallet credited {}", wallet.getBalance());

    return walletRepository.save(wallet);
  }


}
