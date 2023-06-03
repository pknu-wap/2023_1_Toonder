package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/toonder")
@RestController
public class MemberMyPageInfoController{
    @Autowired
    private MemberRepository memberRepository;
    
    @RequestMapping(value = "/mypage", method = {RequestMethod.GET, RequestMethod.POST})
    public MemberMyPageInfoDto selectById(@RequestBody Map<String,String> memberEmail){

        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }
        return new MemberMyPageInfoDto(member.getMem_name(), member.getMem_hashtag());
    }
}