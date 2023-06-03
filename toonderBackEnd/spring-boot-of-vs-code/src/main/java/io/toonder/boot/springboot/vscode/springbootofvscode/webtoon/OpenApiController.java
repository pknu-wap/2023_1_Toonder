package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
 
@RestController
public class OpenApiController {

    private final WebtoonService webtoonService;

    public OpenApiController(WebtoonService webtoonService) {
        this.webtoonService = webtoonService;
    }

    @GetMapping("/openApiLoadData") //DB 저장 및 업데이트 - api 호출
    public String callApi() throws IOException {
        StringBuilder result = new StringBuilder();

        int totalPages = 400; 

        String apiKey = "ac588af480c81e0c020a57c56bec3efa"; //코드 실행시 apiKey 추가 필요 + rds 비밀번호도 application.yml에 추가해서 코드 실행
        String urlPattern = "https://www.kmas.or.kr/openapi/search/rgDtaMasterList?" +
                "prvKey=" + apiKey +
                "&listSeCd=1" +
                "&pageNo=%d" + 
                "&viewItemCnt=100"; 

        for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
            String urlStr = String.format(urlPattern, pageNo);

            URL url = new URL(urlStr);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            
            urlConnection.setConnectTimeout(5000); 

            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("Content-type", "application/json");

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

            String returnLine;
            while ((returnLine = br.readLine()) != null) {
                result.append(returnLine).append("\n\r");
            }

            urlConnection.disconnect();

            webtoonService.init(result.toString());

            result.setLength(0); 
        }

        return "Webtoon information saved successfully.";
    }
}
