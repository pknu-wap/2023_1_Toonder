package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WebtoonService { 

    @Autowired
    private WebtoonRepository webtoonRepository;


    /* 
    private final WebtoonRepository webtoonRepository;

    @Autowired
    public WebtoonService(WebtoonRepository webtoonRepository) {
        this.webtoonRepository = webtoonRepository;
    }*/
    
    //웹툰 정보 저장
    @Transactional(rollbackFor = Exception.class)
    public void init(String jsonData) {
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonData);
            JSONArray jsonArray = (JSONArray) jsonObject.get("itemList");

            if (jsonArray != null) {
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject jObj = (JSONObject) jsonArray.get(i);

                    String ageGradCdNm = jObj.get("ageGradCdNm").toString();

                    if (!ageGradCdNm.equals("19세 이상") ) {
                        String mastrId = jObj.get("mastrId").toString();

                        // mastrId로 이미 저장된 웹툰 정보가 있는지 확인
                        Webtoon existingWebtoon = webtoonRepository.findById(mastrId).orElse(null);

                        if (existingWebtoon == null) {
                            Webtoon webtoon = new Webtoon();
                            webtoon.setMastrId(mastrId);
                            webtoon.setTitle(jObj.get("title").toString());
                            //webtoon.setPictrWritrNm(jObj.get("pictrWritrNm").toString());
                            //webtoon.setSntncWritrNm(jObj.get("sntncWritrNm").toString());
                            
                            String[] properties = {"pictrWritrNm", "sntncWritrNm", "mainGenreCdNm", "imageDownloadUrl", "outline", "pltfomCdNm", "fnshYn", "webtoonPusryYn"};
                            for (String property : properties) {
                                String value = jObj.get(property) != null ? jObj.get(property).toString() : "";
                                switch (property) {
                                    case "pictrWritrNm":
                                        webtoon.setPictrWritrNm(value);
                                        break;
                                    case "sntncWritrNm":
                                        webtoon.setSntncWritrNm(value);
                                        break;
                                    case "mainGenreCdNm":
                                        webtoon.setMainGenreCdNm(value);
                                        break;
                                    case "imageDownloadUrl":
                                        webtoon.setImageDownloadUrl(value);
                                        break;
                                    case "outline":
                                        webtoon.setOutline(value);
                                        break;
                                    case "pltfomCdNm":
                                        webtoon.setPltfomCdNm(value);
                                        break;
                                    case "fnshYn":
                                        webtoon.setFnshYn(value);
                                        break;
                                    case "webtoonPusryYn":
                                        webtoon.setWebtoonPusryYn(value);
                                        break;
                                }
                            }

                            webtoonRepository.save(webtoon);
                        }
                    }
                }
            }

            webtoonRepository.flush(); // 변경 사항을 즉시 데이터베이스에 반영

        } catch (Exception e) {
            e.printStackTrace();
            //예외 처리
        }
    }
}


