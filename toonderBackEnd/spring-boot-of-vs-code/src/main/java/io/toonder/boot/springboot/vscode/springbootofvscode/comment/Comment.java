package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@Table(name = "comment")
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

	@Column(columnDefinition = "integer default 0")
    private Integer cmtLike; //댓글 좋아요 수 
    
    @ManyToOne 
	//@JsonManagedReference
	@JoinColumn(name="brdNo") 
	private Board board;

	@ManyToOne
	//@JsonManagedReference
	@JoinColumn(name="mem_email") 
	private Member member;

	@ElementCollection
	@CollectionTable(name = "comment_likes", joinColumns = @JoinColumn(name = "cmt_no"))
	@Column(name = "mem_email")
	private Set<String> likedByMembers = new HashSet<>(); // 좋아요를 누른 사용자 이메일 저장

	/* 댓글 수정을 위한 setter */
    public void update(String cmtContent) {
        this.cmtContent = cmtContent;
    }

	// 댓글 좋아요 메소드
	public void increaseLike(String mem_email) {
		if (this.cmtLike == null) {
			this.cmtLike = 0;
		}
		if (likedByMembers == null) {
			likedByMembers = new HashSet<>();
		}
		if (!likedByMembers.contains(mem_email)) {
			cmtLike++;
			likedByMembers.add(mem_email);
		}
	}
	
	public void decreaseLike(String mem_email) {
		if (likedByMembers != null && likedByMembers.contains(mem_email)) {
			cmtLike--;
			likedByMembers.remove(mem_email);
		}
	}
	
	public boolean isLikedByMember(String mem_email) {
		if (this.member == null || this.likedByMembers.isEmpty()) {
			return false;
		}
		return this.likedByMembers.contains(mem_email);
	}
}



