package br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.dto.User;

import br.com.sysmap.bootcamp.vinil_ecommerce_api.domain.entities.User;
import java.util.UUID;
import lombok.Builder;

/**
 * The type User update return dto.
 */
@Builder
public record UserUpdateReturnDto(
    UUID id,
    String name,
    String email
) {

  /**
   * From entity user update return dto.
   *
   * @param user the user
   * @return the user update return dto
   */
  public static UserUpdateReturnDto fromEntity(User user) {
    return UserUpdateReturnDto.builder()
        .id(user.getId())
        .name(user.getName())
        .email(user.getEmail())
        .build();
  }

}
