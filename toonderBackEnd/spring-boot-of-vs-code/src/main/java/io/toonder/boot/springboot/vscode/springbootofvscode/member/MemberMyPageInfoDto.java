package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
public class MemberMyPageInfoDto {
    private String mem_name;
    private String mem_hashtag;

    public MemberMyPageInfoDto(String mem_name, String mem_hashtag) {
        this.mem_name = mem_name;
        this.mem_hashtag = mem_hashtag;
    }
}
