package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;
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
	private Integer cmtNo; //댓글번호(자동생성)
	private String cmtContent; //댓글내용
	private Timestamp cmtRegDate = Timestamp.valueOf(LocalDateTime.now()); //댓글 등록일
    private Timestamp cmtUpdateDate = Timestamp.valueOf(LocalDateTime.now()); //댓글 수정일
    private Integer cmtLike; //댓글 좋아요 수 
	private Board board;
	private Member member;

    /* Dto -> Entity */
    public Comment toEntity() {
        Comment comment = Comment.builder()
                .cmtNo(cmtNo)
                .cmtContent(cmtContent)
                .cmtRegDate(cmtRegDate)
                .cmtUpdateDate(cmtUpdateDate)
                .cmtLike(cmtLike)
                .board(board)
                .member(member)
                .build();

        return comment;
    }
}
