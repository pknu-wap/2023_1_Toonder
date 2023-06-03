package io.toonder.boot.springboot.vscode.springbootofvscode.member;
 
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;
import io.toonder.boot.springboot.vscode.springbootofvscode.comment.Comment;

import javax.persistence.OrderBy;
 
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="member")
public class Member {
    @Id
    @Column(name = "mem_email")
    private String mem_email;
    private String mem_name;
    private String mem_hashtag;
    private String mem_photo;
    
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@OrderBy("cmtNo asc") // 댓글 정렬
    @JsonBackReference
	private List<Comment> comment;
 
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    @JsonBackReference
    private List<Board> board;
}
