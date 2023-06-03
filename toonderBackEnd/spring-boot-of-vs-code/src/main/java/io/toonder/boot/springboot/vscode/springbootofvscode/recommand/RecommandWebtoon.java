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

import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.MemberRepository;
import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.Webtoon;
import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.WebtoonRecommendationDto;
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
    public List<WebtoonRecommendationDto> recommandByEmail(@RequestBody Map<String,String> memberEmail){
        
        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }        
        List<String> hashTagArray = splitHashTagString(member.getMem_hashtag());

        List<WebtoonRecommendationDto> result = null;
        
        result = randomSelectWebtoonInMemGenre(hashTagArray);

        return result;
    }


    private List<WebtoonRecommendationDto> randomSelectWebtoonInMemGenre(List<String> hashTagArray) {
;
        
        Random random = new Random();
        
        List<WebtoonRecommendationDto> chosenWebtoonsInfo = new ArrayList<>();
        for (int i=0; i<4; i++){
            String randomGenre = hashTagArray.get(random.nextInt(hashTagArray.size()));
            List<Webtoon> chosenGenreWebtoons = webtoonRepository.findByMainGenreCdNm(randomGenre);
            Webtoon chosenWebtoon = chosenGenreWebtoons.get(random.nextInt(chosenGenreWebtoons.size()));
            chosenWebtoonsInfo.add(new WebtoonRecommendationDto(chosenWebtoon.getMastrId(), chosenWebtoon.getTitle(), chosenWebtoon.getImageDownloadUrl()));
        }
        
        return chosenWebtoonsInfo;
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
