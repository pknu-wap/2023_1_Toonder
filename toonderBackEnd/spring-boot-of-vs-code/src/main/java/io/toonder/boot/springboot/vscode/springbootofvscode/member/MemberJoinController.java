package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
 
@RequestMapping("/toonder")
@RestController
public class MemberJoinController {
    @Autowired
    private MemberRepository memberRepository;
 
    @RequestMapping(value = "/join", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/json; charset=utf-8")
    public Member insert(@RequestBody Map<String, String> map) {
        return memberRepository.save(new Member(map.get("mem_email"),map.get("mem_name"), map.get("mem_hashtag"),null));
    }
    
}