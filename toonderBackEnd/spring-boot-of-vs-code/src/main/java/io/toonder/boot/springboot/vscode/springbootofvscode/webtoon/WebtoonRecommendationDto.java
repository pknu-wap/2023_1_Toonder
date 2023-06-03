package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class WebtoonRecommendationDto {
    private String mastrId;
    private String title;
    private String imageDownloadUrl;

    public WebtoonRecommendationDto(String mastrId, String title,String imageDownloadUrl) {
        this.mastrId = mastrId;
        this.title = title;
        this.imageDownloadUrl = imageDownloadUrl;
    }
}




