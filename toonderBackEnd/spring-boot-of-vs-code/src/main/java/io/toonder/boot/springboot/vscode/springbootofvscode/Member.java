package io.toonder.boot.springboot.vscode.springbootofvscode;
 
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.OrderBy;
 
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="member")
public class Member {
    @Id
    private String mem_email;
    private String mem_name;
    private String mem_hashtag;
    
    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@OrderBy("cmtNo asc") // 댓글 정렬
	private List<Comment> comment;
 
}