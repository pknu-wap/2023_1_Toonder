package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/toonder")
@RestController
public class WebtoonInfoController {
    @Autowired
    private WebtoonRepository webtoonRepository;
    
    @GetMapping("/webtoon/{mastrId}")
    public Webtoon getBoardByBrdNo(@PathVariable String mastrId) {
        return webtoonRepository.findById(mastrId).orElse(null);
    }
}
