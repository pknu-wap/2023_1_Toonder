package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

<<<<<<< HEAD
import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
=======
import java.sql.Timestamp;
import java.time.LocalDateTime;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.MemberDto;
>>>>>>> 98d4d09cb2a8389addadabeb73f4154d49f438e8
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
<<<<<<< HEAD

    private String mem_name;
    private String mem_email;
=======
	private Timestamp cmtRegDate = Timestamp.valueOf(LocalDateTime.now()); //댓글 등록일
    private Timestamp cmtUpdateDate = Timestamp.valueOf(LocalDateTime.now()); //댓글 수정일
    private Integer cmtLike; //댓글 좋아요 수 
	private Board board;
	private MemberDto member;
>>>>>>> 98d4d09cb2a8389addadabeb73f4154d49f438e8

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
