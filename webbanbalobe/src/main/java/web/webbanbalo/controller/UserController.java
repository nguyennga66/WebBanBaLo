package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.User;
import web.webbanbalo.repository.UserRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable int userId) {
        User user = userRepository.findById(userId).get();
        return user;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(
            @PathVariable int userId,
            @RequestBody User userToUpdate) {

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFullName(userToUpdate.getFullName());
            existingUser.setPhone(userToUpdate.getPhone());
            existingUser.setEmail(userToUpdate.getEmail());
            existingUser.setAddress(userToUpdate.getAddress());

            User updatedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}