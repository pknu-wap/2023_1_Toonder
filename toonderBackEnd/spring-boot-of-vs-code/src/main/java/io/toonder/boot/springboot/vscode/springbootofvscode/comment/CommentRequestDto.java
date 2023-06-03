package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRequestDto {
	private String cmtContent; //댓글내용

    private String mem_name;
    private String mem_email;

    /* Dto -> Entity */
    public Comment toEntity() {
        Member member = Member.builder()
                .mem_name(mem_name)
                .mem_email(mem_email)
                .build();

        Comment comment = Comment.builder()
                .cmtContent(cmtContent)
                .member(member)
                .build();

        return comment;
    }
}
