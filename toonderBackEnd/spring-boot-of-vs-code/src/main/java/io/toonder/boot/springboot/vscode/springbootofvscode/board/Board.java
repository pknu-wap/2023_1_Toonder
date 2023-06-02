package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.JoinColumn;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import io.toonder.boot.springboot.vscode.springbootofvscode.comment.Comment;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter // 제거?
@Entity
@Table(name = "board")
@DynamicInsert  //Insert시 Null인 필드를 제외하기위해 사용
@DynamicUpdate //update시 Null인 필드를 제외하기위해 사용
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer brdNo;  //게시글 번호(자동생성)
	
	private String brdTitle; //게시글 제목

	@Column(length = 5000)
	private String brdContent; //게시글 내용
	
    @CreationTimestamp
	private Timestamp brdRegDate; //게시글 등록일

    @UpdateTimestamp
    private Timestamp brdUpdateDate; //게시글 수정일
	
	private Integer brdViewCount; //게시글 조회수
	private Integer brdLike; //게시글 좋아요 수 

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="mem_email") 
	private MemberDto member;
	
	@OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@OrderBy("cmtNo asc") // 댓글 정렬
	private List<Comment> comment;
	
	/* 게시글 수정 메소드 */
	public void update(String brdTitle, String brdContent) {
		this.brdTitle = brdTitle;
		this.brdContent = brdContent;
	}


}
