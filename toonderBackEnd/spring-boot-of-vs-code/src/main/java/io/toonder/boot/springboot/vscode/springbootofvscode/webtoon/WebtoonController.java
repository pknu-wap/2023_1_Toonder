package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/toonder")
public class WebtoonController {
    
    @Autowired
    private WebtoonService webtoonService;

    
    // 웹툰 목록 리턴 (페이징 처리)
    @GetMapping("/webtoon")
    public ResponseEntity<List<WebtoonResponseDto>> getAllWebtoons(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;
    
        ResponseEntity<Map<String, Object>> response = webtoonService.getPagingWebtoon(p_num);
        if (response == null || response.getBody() == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    
        List<WebtoonResponseDto> webtoonResponseDtoList = (List<WebtoonResponseDto>) response.getBody().get("list");
    
        return ResponseEntity.ok(webtoonResponseDtoList);
    }

    // 웹툰 상세보기
    @GetMapping("/webtoon/{mastrId}")
    public ResponseEntity<WebtoonResponseDto> getWebtoon(@PathVariable String mastrId) {
        WebtoonResponseDto webtoonResponseDto = webtoonService.getWebtoon(mastrId);
        return ResponseEntity.ok(webtoonResponseDto);
    } 

    //웹툰 제목으로 검색
    @GetMapping("/webtoon/search")
    public ResponseEntity<Map<String, Object>> searchWebtoons(
            @RequestParam("keyword") String keyword,
            @RequestParam(value = "p_num", required = false) Integer p_num
    ) {
        if (p_num == null || p_num <= 0) p_num = 1;

        ResponseEntity<Map<String, Object>> response = webtoonService.searchWebtoonsByTitle(keyword, p_num);
        if (response == null || response.getBody() == null) {
            return ResponseEntity.ok(Collections.emptyMap());
        }

        return ResponseEntity.ok(response.getBody());
    }
}
