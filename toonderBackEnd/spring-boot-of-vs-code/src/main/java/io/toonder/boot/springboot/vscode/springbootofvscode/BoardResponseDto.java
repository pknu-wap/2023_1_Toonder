package io.toonder.boot.springboot.vscode.springbootofvscode;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;

/**
 * 게시글 정보를 리턴할 응답(Response) 클래스
 * Entity 클래스를 생성자 파라미터로 받아 데이터를 Dto로 변환하여 응답
 * 별도의 전달 객체를 활용해 연관관계를 맺은 엔티티간의 무한참조를 방지
 */

@Getter
public class BoardResponseDto {
    
	private Integer brdNo;  
	private String brdTitle;
	private String brdContent; 

	private String name; // 게시글 작성자명
	private String memId; //게시글 작성자ID - Member의 mem_email

	private Timestamp brdRegDate; 
    private Timestamp brdUpdateDate; 
	private Integer brdViewCount; 
	private Integer brdLike;  
	private List<CommentResponseDto> comment;
	
	/* Entity -> Dto*/
	public BoardResponseDto(Board board) {
		this.brdNo = board.getBrdNo();
		this.brdTitle = board.getBrdTitle();
		this.name = board.getMember().getMem_name();
		this.brdContent = board.getBrdContent();
		this.brdRegDate = board.getBrdRegDate();
		this.brdUpdateDate = board.getBrdUpdateDate();
		this.brdViewCount = board.getBrdViewCount();
		this.memId = board.getMember().getMem_email();
		//comment 필드의 List 타입을 DTO 클래스로 지정해서 엔티티간 무한 참조를 방지
		this.comment = board.getComment().stream().map(CommentResponseDto::new).collect(Collectors.toList());
	}
}
