package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.webbanbalo.entity.User;
import web.webbanbalo.repository.UserRepository;

@RestController
public class SigninController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signin")
    public User login(@RequestBody User user) {
        if ((userRepository.findByEmail(user.getEmail())) != null && user.getPassword().equals(user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
