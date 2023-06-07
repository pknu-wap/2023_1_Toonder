package io.toonder.boot.springboot.vscode.springbootofvscode.review;

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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.Webtoon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder 
@Entity 
@Table(name = "review")
public class Review {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer revNo; //리뷰번호(자동생성)
	
	@Column(nullable = false, length = 1000)
	private String revContent; //댓글내용
	
    @CreationTimestamp
	private Timestamp revRegDate; //댓글 등록일

    @UpdateTimestamp
    private Timestamp revUpdateDate; //댓글 수정일

	@Column(columnDefinition = "integer default 0")
    private Integer revLike; //댓글 좋아요 수 
    
	@Column(columnDefinition = "integer default 0")
	private Double revRating;

    @ManyToOne 
	//@JsonManagedReference
	@JoinColumn(name="mastrId") 
	private Webtoon webtoon;

	@ManyToOne
	@JoinColumn(name="mem_email") 
	private Member member;

	@ElementCollection
	@CollectionTable(name = "review_likes", joinColumns = @JoinColumn(name = "revNo"))
	@Column(name = "mem_email")
	private Set<String> likedByMembers = new HashSet<>(); // 좋아요를 누른 사용자 이메일 저장

	/* 리뷰 수정을 위한 setter */
    public void update(String revContent) {
        this.revContent = revContent;
    }

    // 댓글 좋아요 메소드
	public void increaseLike(String mem_email) {
		if (this.revLike == null) {
			this.revLike = 0;
		}
		if (likedByMembers == null) {
			likedByMembers = new HashSet<>();
		}
		if (!likedByMembers.contains(mem_email)) {
			revLike++;
			likedByMembers.add(mem_email);
		}
	}
	
	public void decreaseLike(String mem_email) {
		if (likedByMembers != null && likedByMembers.contains(mem_email)) {
			revLike--;
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