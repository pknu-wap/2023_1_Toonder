package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;
import io.toonder.boot.springboot.vscode.springbootofvscode.board.BoardRepository;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.Review;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.ReviewRepository;

@RestController
@RequestMapping("/toonder")
public class MemberMyPageInfoController{
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @RequestMapping(value = "/mypage/board", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Board> getMemberBoards(@RequestBody Map<String, String> memberEmail) {    
        System.out.println(memberEmail.get("email"));  
        List<Board> allBoards =  boardRepository.findAll();
        List<Board> result = new ArrayList<Board>();
        for (int i=0; i<allBoards.size(); i++){
            
            if (allBoards.get(i).getMember().getMem_email().equals(memberEmail.get("email")) ){
                System.out.println(allBoards.get(i).getMember().getMem_email());    
                result.add(allBoards.get(i));
            }
            
        }   
        return result;
        
    }

    @RequestMapping(value = "/mypage/review", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Review> getMemberReview(@RequestBody Map<String, String> memberEmail) {    
        System.out.println(memberEmail.get("email"));  
        List<Review> allReviews=  reviewRepository.findAll();
        List<Review> result = new ArrayList<Review>();
        for (int i=0; i<allReviews.size(); i++){
            
            if (allReviews.get(i).getMember().getMem_email().equals(memberEmail.get("email")) ){
                System.out.println(allReviews.get(i).getMember().getMem_email());    
                result.add(allReviews.get(i));
            }
            
        }   
        return result;
        
    }
    

    @RequestMapping(value = "/mypage", method = {RequestMethod.GET, RequestMethod.POST})
    public MemberMyPageInfoDto selectById(@RequestBody Map<String,String> memberEmail){

        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }
        return new MemberMyPageInfoDto(member.getMem_name(), member.getMem_hashtag());
    }
}