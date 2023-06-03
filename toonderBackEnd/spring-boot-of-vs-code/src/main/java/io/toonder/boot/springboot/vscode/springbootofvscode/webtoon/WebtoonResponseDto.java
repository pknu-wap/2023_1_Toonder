package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import java.util.List;
import java.util.stream.Collectors;
    
import io.toonder.boot.springboot.vscode.springbootofvscode.review.ReviewResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
    
@Getter
@AllArgsConstructor
public class WebtoonResponseDto {

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
    private List<ReviewResponseDto> review;

    /* Entity -> Dto*/
    public WebtoonResponseDto(Webtoon webtoon) {
        this.mastrId = webtoon.getMastrId();
        this.title = webtoon.getTitle();
        this.pictrWritrNm = webtoon.getPictrWritrNm();
        this.sntncWritrNm = webtoon.getSntncWritrNm();
        this.mainGenreCdNm = webtoon.getMainGenreCdNm();
        this.outline = webtoon.getOutline();
        this.pltfomCdNm = webtoon.getPltfomCdNm();
        this.fnshYn = webtoon.getFnshYn();
        this.webtoonPusryYn = webtoon.getWebtoonPusryYn();
        this.imageDownloadUrl = webtoon.getImageDownloadUrl();

        if(webtoon.getReview() != null){
            this.review = webtoon.getReview().stream().map(ReviewResponseDto::new).collect(Collectors.toList());
        }
    }
}