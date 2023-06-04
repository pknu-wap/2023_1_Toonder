package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/toonder")
@RestController
public class MemberPhotoUpdateController {

    @Autowired
    private MemberRepository memberRepository;

    @RequestMapping(value = "/photo/update", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/json; charset=utf-8")
    public Member updatePhoto(@RequestBody Map<String, String> memberEmailAndImageFile){

        Member member = memberRepository.findById(memberEmailAndImageFile.get("email")).orElse(null);
        member.setMem_photo(memberEmailAndImageFile.get("image").replace("data:",""));

        return memberRepository.save(member);
    }   
}
