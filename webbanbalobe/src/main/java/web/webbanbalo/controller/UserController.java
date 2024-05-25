package web.webbanbalo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import web.webbanbalo.entity.User;
import web.webbanbalo.repository.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JavaMailSender mailSender;

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
        try {
            Optional<User> optionalUser = userRepository.findById(userId);
            if (optionalUser.isPresent()) {
                User existingUser = optionalUser.get();
                existingUser.setFullName(userToUpdate.getFullName());
                existingUser.setPhone(userToUpdate.getPhone());
                existingUser.setEmail(userToUpdate.getEmail());
                existingUser.setAddress(userToUpdate.getAddress());

                User updatedUser = userRepository.save(existingUser);

                if (updatedUser != null) {
                    return ResponseEntity.ok(updatedUser);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Lỗi khi cập nhật thông tin người dùng: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Đối tượng mã hóa BCrypt
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PutMapping("/pass/{userId}")
    public ResponseEntity<String> changePass(@PathVariable int userId, @RequestBody Map<String, String> passwordMap) {
        try {
            // Tìm người dùng cần thay đổi mật khẩu trong cơ sở dữ liệu
            Optional<User> optionalUser = userRepository.findById(userId);

            // Kiểm tra xem người dùng có tồn tại không
            if (!optionalUser.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            User user = optionalUser.get();

            // Kiểm tra xem passwordMap có chứa trường password mới không
            if (!passwordMap.containsKey("oldPassword") || !passwordMap.containsKey("newPassword")) {
                return ResponseEntity.badRequest().build();
            }

            String oldPassword = passwordMap.get("oldPassword");
            String newPassword = passwordMap.get("newPassword");

            // Kiểm tra xem mật khẩu cũ có khớp với mật khẩu đã lưu trong cơ sở dữ liệu không
            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu cũ không đúng");
            }

            // Mã hóa mật khẩu mới
            String encryptedNewPassword = passwordEncoder.encode(newPassword);

            // Cập nhật mật khẩu mới cho người dùng
            user.setPassword(encryptedNewPassword);

            // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("Đổi mật khẩu thành công");
        } catch (Exception e) {
            System.err.println("Lỗi khi thay đổi mật khẩu: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/forgot-password/{userId}")
    public ResponseEntity<String> processForgotPassword(@PathVariable int userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            String token = generateUniqueToken(); // Hàm này để tạo token duy nhất
            user.setResetToken(token);
            userRepository.save(user);

            String resetLink = "/users/reset-password?token=" + token;
            sendEmail(user.getEmail(), "Reset Your Password",
                    "Please click on the following link to reset your password: " + resetLink);

            return ResponseEntity.ok("Reset password email sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @PostMapping("/reset-password/{userId}")
    public ResponseEntity<String> processResetPassword(@PathVariable int userId, @RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        User user = userRepository.findById(userId).orElse(null);
        if (user == null || !token.equals(user.getResetToken())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid or expired token.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully.");
    }

    public String generateUniqueToken() {
        return UUID.randomUUID().toString();
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
