package io.toonder.boot.springboot.vscode.springbootofvscode;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class CommentResponseDto {

    private Integer cmtNo; 
	private String cmtContent; 
	private Timestamp cmtRegDate = Timestamp.valueOf(LocalDateTime.now());
    private Timestamp cmtUpdateDate = Timestamp.valueOf(LocalDateTime.now()); 
    private Integer cmtLike; 
    private String memName;
    private Integer brdNo;
 
    /* Entity -> Dto*/
    public CommentResponseDto(Comment comment) {
    this.cmtNo = comment.getCmtNo();
    this.cmtContent = comment.getCmtContent();
    this.cmtRegDate = comment.getCmtRegDate();
    this.cmtUpdateDate = comment.getCmtUpdateDate();
    this.cmtLike = comment.getCmtLike();
    this.memName = comment.getMember().getMem_name(); 
    this.brdNo = comment.getBoard().getBrdNo();
    }
}