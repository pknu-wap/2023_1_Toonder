package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RequestMapping("/api/member")
@RestController
public class UserNameController {
    @Autowired
    private MemberRepository memberRepository;
    
    @RequestMapping(value = "/select/{id}", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, String> selectById(@PathVariable String id) {
        Member member = memberRepository.findById(id).orElse(null);
        if (member == null) {
            return null;
        }
        Map<String, String> result = new HashMap<>();
        result.put("mem_name", member.getMem_name());
        result.put("mem_hashtag", member.getMem_hashtag());
        return result;
    }
}