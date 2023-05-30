package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.Member;
import io.toonder.boot.springboot.vscode.springbootofvscode.MemberRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
 
@RequestMapping("/api/member")
@RequiredArgsConstructor
@RestController
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;
 
    @RequestMapping(value = "/select", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Member> selectAll() {
        return memberRepository.findAll();
    }
    
}