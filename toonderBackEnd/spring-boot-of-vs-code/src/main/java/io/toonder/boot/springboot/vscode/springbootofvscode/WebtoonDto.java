package io.toonder.boot.springboot.vscode.springbootofvscode;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class WebtoonDto {
    private String mastrId;
    private String title;
    private String pictrWritrNm;
    private String sntncWritrNm;
    private String mainGenreCdNm;
    private String outline;
    private String pltfomCdNm;
    private String fnshYn;
    private String webtoonPusryYn;
    private String imageDownloadUrl;

    public WebtoonDto(String mastrId, String title, String pictrWritrNm, String sntncWritrNm, String mainGenreCdNm,
                      String outline, String pltfomCdNm, String fnshYn, String webtoonPusryYn,
                      String imageDownloadUrl) {
        this.mastrId = mastrId;
        this.title = title;
        this.pictrWritrNm = pictrWritrNm;
        this.sntncWritrNm = sntncWritrNm;
        this.mainGenreCdNm = mainGenreCdNm;
        this.outline = outline;
        this.pltfomCdNm = pltfomCdNm;
        this.fnshYn = fnshYn;
        this.webtoonPusryYn = webtoonPusryYn;
        this.imageDownloadUrl = imageDownloadUrl;
    }
}




