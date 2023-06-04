package io.toonder.boot.springboot.vscode.springbootofvscode.member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
public class MemberPhotoDto {
    private String mem_photo;

    public MemberPhotoDto(String mem_photo) {
        this.mem_photo = mem_photo;
    }
}
