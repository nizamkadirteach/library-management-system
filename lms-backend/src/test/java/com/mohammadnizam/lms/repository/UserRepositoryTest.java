package com.mohammadnizam.lms.repository;

import com.mohammadnizam.lms.model.User;
import com.mohammadnizam.lms.model.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDateTime;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByUsername_returnsUser() {
        User user = new User();
        user.setUsername("johndoe");
        user.setPassword("pass");
        user.setRole(Role.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        user = userRepository.save(user);

        User found = userRepository.findByUsername("johndoe");
        assertThat(found).isNotNull();
        assertThat(found.getId()).isEqualTo(user.getId());
        assertThat(found.getUsername()).isEqualTo("johndoe");
    }
}
