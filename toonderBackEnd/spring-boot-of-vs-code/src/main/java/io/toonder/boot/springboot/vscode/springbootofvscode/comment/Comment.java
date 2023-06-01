package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
@Entity 
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cmtNo; //댓글번호(자동생성)
	
	@Column(nullable = false, length = 1000)
	private String cmtContent; //댓글내용
	
    @CreationTimestamp
	private Timestamp cmtRegDate; //댓글 등록일

    @UpdateTimestamp
    private Timestamp cmtUpdateDate; //댓글 수정일

    private Integer cmtLike; //댓글 좋아요 수 
    
    @ManyToOne 
	@JoinColumn(name="brdNo") 
	private Board board;

	@ManyToOne
	@JoinColumn(name="mem_email") 
	private Member member;

	/* 댓글 수정을 위한 setter */
    public void update(String cmtContent) {
        this.cmtContent = cmtContent;
    }
}



