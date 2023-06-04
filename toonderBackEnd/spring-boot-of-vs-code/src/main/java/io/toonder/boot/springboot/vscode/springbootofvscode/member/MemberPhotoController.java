package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/toonder")
@RestController
public class MemberPhotoController {

    @Autowired
    private MemberRepository memberRepository;

    @RequestMapping(value = "/photo", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/json; charset=utf-8")
    public MemberPhotoDto updatePhoto(@RequestBody Map<String,String> memberEmail){

        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }
        return new MemberPhotoDto("data:" + member.getMem_photo());
    }   
}
