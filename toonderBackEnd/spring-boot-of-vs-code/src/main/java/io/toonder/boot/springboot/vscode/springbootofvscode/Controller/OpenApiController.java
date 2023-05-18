package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.WebtoonService;

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

    @GetMapping("/openapi-load-data")
    public String callApi() throws IOException {
        StringBuilder result = new StringBuilder();

        int totalPages = 350; //350 혹은 toalPages를 모르는 경우 동작하는 코드로 추후 수정 <- 트래픽 초과 문제 발생 가능

        String apiKey = ""; //코드 실행시 apiKey 추가 필요 + rds 비밀번호도 application.yml에 추가해서 코드 실행
        String urlPattern = "https://www.kmas.or.kr/openapi/search/rgDtaMasterList?" +
                "prvKey=" + apiKey +
                "&listSeCd=1" +
                "&pageNo=%d" + 
                "&viewItemCnt=100"; //100으로 추후 수정 <- 트래픽 초과 문제 발생 가능

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

            // 웹툰 정보 초기화 및 저장
            webtoonService.init(result.toString());

            result.setLength(0); // Clear the StringBuilder for the next iteration
        }

        return "Webtoon information saved successfully.";
    }
}

/* 
@RestController
public class Controller {

    private final WebtoonService webtoonService;

    public Controller(WebtoonService webtoonService) {
        this.webtoonService = webtoonService;
    }

    @GetMapping("/openapi")
    public String callApi() throws IOException {
        String apiKey = "ac588af480c81e0c020a57c56bec3efa";
        //int pageNo = 1;
        int itemsPerPage = 100;
        boolean hasMorePages = true;

        while (hasMorePages) {
            StringBuilder result = new StringBuilder(); // Move the StringBuilder here

            String urlStr = "https://www.kmas.or.kr/openapi/search/rgDtaMasterList?" +
                    "prvKey=" + apiKey +
                    "&listSeCd=1" +
                    //"&pageNo=" + pageNo +
                    "&viewItemCnt=" + itemsPerPage;

                URL url = new URL(urlStr);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");
                urlConnection.setRequestProperty("Content-type", "application/json");

                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

                String returnLine;
                while ((returnLine = br.readLine()) != null) {
                    result.append(returnLine).append("\n\r");
                }
        
                urlConnection.disconnect();
        
                // Webtoon 정보 초기화 및 저장
                webtoonService.init(result.toString());
        
                // Check if there are more pages available
                String responseHeader = urlConnection.getHeaderField("link");
                if (responseHeader == null || !responseHeader.contains("rel=\"next\"")) {
                    hasMorePages = false;
                } else {
                    //pageNo++; // Move to the next page
                }
            }
            return "Webtoon 정보가 성공적으로 저장되었습니다.";
        }
}
*/