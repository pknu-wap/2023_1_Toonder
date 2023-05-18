package io.toonder.boot.springboot.vscode.springbootofvscode;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WebtoonService {

    private final WebtoonRepository webtoonRepository;

    @Autowired
    public WebtoonService(WebtoonRepository webtoonRepository) {
        this.webtoonRepository = webtoonRepository;
    }
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
                    String pltfomCdNm = jObj.get("pltfomCdNm").toString();

                    if (!ageGradCdNm.equals("19세 이상") && (pltfomCdNm.equals("네이버웹툰") 
                            || pltfomCdNm.equals("다음웹툰") || pltfomCdNm.equals("카카오페이지")
                                    || pltfomCdNm.equals("카카오웹툰"))) {
                        String mastrId = jObj.get("mastrId").toString();

                        // mastrId로 이미 저장된 웹툰 정보가 있는지 확인
                        Webtoon existingWebtoon = webtoonRepository.findById(mastrId).orElse(null);

                        if (existingWebtoon == null) {
                            Webtoon webtoon = new Webtoon();
                            webtoon.setMastrId(mastrId);
                            webtoon.setTitle(jObj.get("title").toString());
                            webtoon.setPictrWritrNm(jObj.get("pictrWritrNm").toString());
                            webtoon.setSntncWritrNm(jObj.get("sntncWritrNm").toString());
                            
                            // Handle null or blank mainGenreCdNm
                            String mainGenreCdNm = jObj.get("mainGenreCdNm") != null ? jObj.get("mainGenreCdNm").toString() : "";
                            webtoon.setMainGenreCdNm(mainGenreCdNm);
                            
                            webtoon.setOutline(jObj.get("outline").toString());
                            webtoon.setPltfomCdNm(jObj.get("pltfomCdNm").toString());
                            webtoon.setFnshYn(jObj.get("fnshYn").toString());
                            webtoon.setWebtoonPusryYn(jObj.get("webtoonPusryYn").toString());
                            webtoon.setImageDownloadUrl(jObj.get("imageDownloadUrl").toString());

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


/* 
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
                    String pltfomCdNm = jObj.get("pltfomCdNm").toString();

                    if (!ageGradCdNm.equals("19세 이상") && (pltfomCdNm.equals("네이버웹툰") 
                            || pltfomCdNm.equals("다음웹툰") || pltfomCdNm.equals("카카오페이지")
                                    || pltfomCdNm.equals("카카오웹툰"))) {
                        String mastrId = jObj.get("mastrId").toString();

                        // mastrId로 이미 저장된 웹툰 정보가 있는지 확인
                        Webtoon existingWebtoon = webtoonRepository.findById(mastrId).orElse(null);

                        if (existingWebtoon == null) {
                            Webtoon webtoon = new Webtoon();
                            webtoon.setMastrId(mastrId);
                            webtoon.setTitle(jObj.get("title").toString());
                            webtoon.setPictrWritrNm(jObj.get("pictrWritrNm").toString());
                            webtoon.setSntncWritrNm(jObj.get("sntncWritrNm").toString());
                            webtoon.setMainGenreCdNm(jObj.get("mainGenreCdNm").toString());
                            webtoon.setOutline(jObj.get("outline").toString());
                            webtoon.setPltfomCdNm(jObj.get("pltfomCdNm").toString());
                            webtoon.setFnshYn(jObj.get("fnshYn").toString());
                            webtoon.setWebtoonPusryYn(jObj.get("webtoonPusryYn").toString());
                            webtoon.setImageDownloadUrl(jObj.get("imageDownloadUrl").toString());

                            webtoonRepository.save(webtoon);
                        }
                    }
                }
            }

            webtoonRepository.flush(); // 변경 사항을 즉시 데이터베이스에 반영

        } catch (Exception e) {
            e.printStackTrace();
            // 예외 처리를 추가로 수행할 수 있습니다.
        }
    }*/
}


