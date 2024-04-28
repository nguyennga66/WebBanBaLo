package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.webbanbalo.entity.User;
import web.webbanbalo.repository.UserRepository;

@RestController
public class SignupController {

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public User signUp(@RequestBody User user) {
        // Kiểm tra xem tên người dùng đã tồn tại hay chưa
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        } else{
            // Lưu thông tin người dùng vào cơ sở dữ liệu

            return userRepository.save(user);
        }
    }
}
