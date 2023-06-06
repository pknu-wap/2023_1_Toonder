package io.toonder.boot.springboot.vscode.springbootofvscode.review;

import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewRequestDto {

	private String revContent;
    private Double revRating; 
    private String mem_name;
    private String memEmail;

    /* Dto -> Entity */
    public Review toEntity() {
        Member member = Member.builder()
                .mem_name(mem_name)
                .mem_email(memEmail)
                .build();

        Review review = Review.builder()
                .revContent(revContent)
                .revRating(revRating)
                .member(member)
                .build();

        return review;
    }
}
