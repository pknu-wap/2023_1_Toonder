package io.toonder.boot.springboot.vscode.springbootofvscode;
 
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
 
import javax.persistence.Entity;
import javax.persistence.Id;
 
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
    @Id
    private String mem_id;
    private String mem_name;
    private String mem_hashtag;
 
}