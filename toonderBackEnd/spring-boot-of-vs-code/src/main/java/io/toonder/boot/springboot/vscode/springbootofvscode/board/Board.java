package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
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

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

import io.toonder.boot.springboot.vscode.springbootofvscode.comment.Comment;
import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder 
@Entity
@Data
@Getter
@Setter
@Table(name = "board")
@DynamicInsert  //Insert시 Null인 필드를 제외하기위해 사용
@DynamicUpdate //update시 Null인 필드를 제외하기위해 사용
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer brdNo;  //게시글 번호(자동생성)
	
	@Column(nullable = false)
	private String brdTitle; //게시글 제목

	@Column(length = 5000)
	private String brdContent; //게시글 내용
	
    @CreationTimestamp
	private Timestamp brdRegDate; //게시글 등록일

    @UpdateTimestamp
    private Timestamp brdUpdateDate; //게시글 수정일
	
	@Column(columnDefinition = "integer default 0")
	private Integer brdViewCount; //게시글 조회수
	@Column(columnDefinition = "integer default 0")
	private Integer brdLike; //게시글 좋아요 수 

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonManagedReference
	@JoinColumn(name="mem_email") 
	private Member member;
	
	@OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JsonBackReference
	@OrderBy("cmtNo asc") // 댓글 정렬
	private List<Comment> comment;

	@ElementCollection
    @CollectionTable(name = "board_likes", joinColumns = @JoinColumn(name = "brdNo"))
    @Column(name = "mem_email")
    private Set<String> likedByMembers = new HashSet<>(); // 좋아요를 누른 사용자 이메일 저장
	
	// 게시글 수정 메소드 
	public void update(String brdTitle, String brdContent) {
		this.brdTitle = brdTitle;
		this.brdContent = brdContent;
	}
	
	// 게시글 좋아요 메소드
	public void increaseLike(String mem_email) {
        if (!likedByMembers.contains(mem_email)) {
            brdLike++;
            likedByMembers.add(mem_email);
        }
    }

    public void decreaseLike(String mem_email) {
        if (likedByMembers.contains(mem_email)) {
            brdLike--;
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
