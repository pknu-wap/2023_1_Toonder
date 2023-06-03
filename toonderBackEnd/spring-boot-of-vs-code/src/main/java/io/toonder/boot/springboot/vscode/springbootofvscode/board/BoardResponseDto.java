package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import io.toonder.boot.springboot.vscode.springbootofvscode.comment.CommentResponseDto;
import lombok.Getter;

@Getter
public class BoardResponseDto {
    
	private Integer brdNo;  
	private String brdTitle;
	private String brdContent; 

	private String mem_name; 
	private String mem_email; 

	private Timestamp brdRegDate = Timestamp.valueOf(LocalDateTime.now()); 
    private Timestamp brdUpdateDate = Timestamp.valueOf(LocalDateTime.now()); 
	private Integer brdViewCount; 
	private Integer brdLike;  
	private List<CommentResponseDto> comment;
	
	/* Entity -> Dto*/
	public BoardResponseDto(Board board) {
		this.brdNo = board.getBrdNo();
		this.brdTitle = board.getBrdTitle();
		if (board.getMember() != null) {
			this.mem_name = board.getMember().getMem_name();
			this.mem_email = board.getMember().getMem_email();
		}
		this.brdContent = board.getBrdContent();
		this.brdRegDate = board.getBrdRegDate();
		this.brdUpdateDate = board.getBrdUpdateDate();
		this.brdViewCount = board.getBrdViewCount();
		this.brdLike = board.getBrdLike();

		if(board.getComment() != null){
			this.comment = board.getComment().stream().map(CommentResponseDto::new).collect(Collectors.toList());
		}
	}
}
