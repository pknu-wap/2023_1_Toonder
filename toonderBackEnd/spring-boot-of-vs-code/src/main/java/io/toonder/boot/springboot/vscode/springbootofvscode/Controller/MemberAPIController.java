package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.Member;
import io.toonder.boot.springboot.vscode.springbootofvscode.MemberRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
@RequestMapping("/api/member")
@RestController
public class MemberAPIController {
    @Autowired
    private MemberRepository memberRepository;
 
    @RequestMapping(value = "/select", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Member> selectAll() {
        return memberRepository.findAll();
    }
 
    @RequestMapping(value = "/insert", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/json; charset=utf-8")
    public Member insert(@RequestBody Map<String, String> map) {
        System.out.println(map.get("mem_id"));
        System.out.println(map.get("mem_name"));
        System.out.println(map.get("mem_hashtag"));
        return memberRepository.save(new Member(map.get("mem_id"), map.get("mem_name"), map.get("mem_hashtag")));
    }

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