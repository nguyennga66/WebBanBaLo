package web.webbanbalo.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.webbanbalo.entity.User;
import web.webbanbalo.repository.UserRepository;

@RestController
public class SigninController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @CrossOrigin(origins = "*")
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user, HttpServletRequest request) {
        User u = userRepository.findByEmail(user.getEmail());
        if (u != null && bCryptPasswordEncoder.matches(user.getPassword(), u.getPassword())) {
            HttpSession session = request.getSession();
            session.setAttribute("user", u);
            return ResponseEntity.ok(u);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
