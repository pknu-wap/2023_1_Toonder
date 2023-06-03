package io.toonder.boot.springboot.vscode.springbootofvscode.recommand;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.member.MemberDto;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.MemberRepository;
import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.Webtoon;
import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.WebtoonRepository;

import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/toonder")
@RestController
public class RecommandWebtoon {
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private WebtoonRepository webtoonRepository;

    @RequestMapping(value = "/recommand", method = {RequestMethod.GET, RequestMethod.POST})
    public List<List<Map<String, String>>> selectById(@RequestBody Map<String,String> memberEmail){
        
        
        MemberDto member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }        
        List<String> hashTagArray = splitHashTagString(member.getMem_hashtag());

        List<List<Map<String, String>>> result = null;
        
        result = randomSelectWebtoonInMemGenre(hashTagArray);

        return result;
    }


    private List<List<Map<String, String>>> randomSelectWebtoonInMemGenre(List<String> hashTagArray) {

        List<List<Map<String, String>>> chosenWebtoonsIdAndImageLink = new ArrayList<>();
        
        Random random = new Random();
        
        
        for (int i=0; i<4; i++){
            String randomGenre = hashTagArray.get(random.nextInt(hashTagArray.size()));
            List<Webtoon> webtoons = webtoonRepository.findByMainGenreCdNm(randomGenre);
            
            Map<String,String> randomWebtoonIdFromGenre = new HashMap<>() ;
            Map<String,String> randomWebtoonImageLinkFromGenre = new HashMap<>() ;
            List<Map<String, String>> chosenWebtoonIdAndImageLink = new ArrayList<>();

            randomWebtoonIdFromGenre.put("mastrId" ,webtoons.get(random.nextInt(webtoons.size())).getMastrId());
            randomWebtoonImageLinkFromGenre.put("imageDownloadUrl" ,webtoons.get(random.nextInt(webtoons.size())).getImageDownloadUrl());
            chosenWebtoonIdAndImageLink.add(randomWebtoonIdFromGenre);
            chosenWebtoonIdAndImageLink.add(randomWebtoonImageLinkFromGenre);

            chosenWebtoonsIdAndImageLink.add(chosenWebtoonIdAndImageLink);
            System.out.println(chosenWebtoonsIdAndImageLink);
        }
        
        return chosenWebtoonsIdAndImageLink;
    }
    

    private ArrayList<String> splitHashTagString(String hashTagString){
        ArrayList<String> hastTagArrayList = new ArrayList<>();
        String[] hashTagTempArray = hashTagString.split(" #");
        for (int i=0; i<hashTagTempArray.length; i++){
            String hashtag;
            if (i==0) hashtag = hashTagTempArray[i].replace("#", "");
            else hashtag = hashTagTempArray[i];
            hastTagArrayList.add(hashtag);
        }
        return hastTagArrayList;
    }
}
