package io.toonder.boot.springboot.vscode.springbootofvscode.review;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewResponseDto {
    private Integer revNo; 
	private String revContent; 
	private Timestamp revRegDate = Timestamp.valueOf(LocalDateTime.now());
    private Timestamp revUpdateDate = Timestamp.valueOf(LocalDateTime.now()); 
    private Integer revLike; 
    private Double revRating;
    private String memName;
    private String mastrId;
 

    /* Entity -> Dto*/
    public ReviewResponseDto(Review review) {
    this.revNo = review.getRevNo();
    this.revContent = review.getRevContent();
    this.revRegDate = review.getRevRegDate();
    this.revUpdateDate = review.getRevUpdateDate();
    this.revLike = review.getRevLike();
    this.revRating = review.getRevRating();
    this.memName = review.getMember().getMem_name(); 
    this.mastrId = review.getWebtoon().getMastrId();
    }
}
