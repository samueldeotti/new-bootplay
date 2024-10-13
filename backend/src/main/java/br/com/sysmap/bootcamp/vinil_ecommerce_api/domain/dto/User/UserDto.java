package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import java.util.UUID;
import lombok.Builder;

/**
 * The type User dto.
 */
@Builder
public record UserDto(UUID id, String name, String email, UUID walletId) {

  /**
   * From entity user dto.
   *
   * @param user the user
   * @return the user dto
   */
  public static UserDto fromEntity(User user) {
    return UserDto.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .walletId(user.getWallet().getId())
        .build();
  }

}
