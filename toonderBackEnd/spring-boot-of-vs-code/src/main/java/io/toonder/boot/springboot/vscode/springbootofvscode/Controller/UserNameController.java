package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserNameController {

    @GetMapping("/api/username")
    public String test() {
        return "장홍준";

        // 대충 DB에서 가져온 데이터를 보내줍니당
    }
}