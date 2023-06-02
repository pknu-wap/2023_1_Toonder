package io.toonder.boot.springboot.vscode.springbootofvscode.member;
 
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

import io.toonder.boot.springboot.vscode.springbootofvscode.comment.Comment;
import io.toonder.boot.springboot.vscode.springbootofvscode.board.Board;

import javax.persistence.OrderBy;
 
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="member")
public class MemberDto {
    @Id
    private String mem_email;
    private String mem_name;
    private String mem_hashtag;
    private String mem_photo;


    
    
 
}