package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Builder
@NoArgsConstructor
public class MemberUpdateDto {
    private String mem_email;
    private String mem_name;
    private String mem_hashtag;

    public MemberUpdateDto(String mem_email, String mem_name, String mem_hashtag) {
        this.mem_email = mem_email;
        this.mem_name = mem_name;
        this.mem_hashtag = mem_hashtag;
    }
}
