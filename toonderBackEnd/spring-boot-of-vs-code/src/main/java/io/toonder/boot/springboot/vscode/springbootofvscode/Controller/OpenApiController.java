package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenApiController {

    @GetMapping("/openapi")
    public String callApi() throws IOException{
        StringBuilder result = new StringBuilder();
        
            String urlStr = "https://www.kmas.or.kr/openapi/search/rgDtaMasterList?" + 
                "prvKey=ac588af480c81e0c020a57c56bec3efa" +
                "&listSeCd=1" ;

            URL url = new URL(urlStr);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
        
            BufferedReader br;

            br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

            String returnLine;

            while((returnLine = br.readLine()) != null){
                result.append(returnLine+"\n\r");
            }

            urlConnection.disconnect();

        return result.toString();
        
    }
}
