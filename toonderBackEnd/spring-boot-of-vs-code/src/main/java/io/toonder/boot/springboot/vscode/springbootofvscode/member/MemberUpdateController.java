package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/toonder")
@RestController
public class MemberUpdateController {
    
    @Autowired
    private MemberRepository memberRepository;

    @RequestMapping(value = "/update", method = {RequestMethod.GET, RequestMethod.POST})
    public Member udpateMemberInfo(@RequestBody MemberUpdateDto map){
        Member member = memberRepository.findById(map.getMem_email()).orElse(null);
        member.setMem_name(map.getMem_name());
        member.setMem_hashtag(map.getMem_hashtag());

        return memberRepository.save(member);
    }
    
}
