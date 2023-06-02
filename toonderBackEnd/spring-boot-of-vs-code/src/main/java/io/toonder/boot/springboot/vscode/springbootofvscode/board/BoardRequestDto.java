package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import io.toonder.boot.springboot.vscode.springbootofvscode.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardRequestDto {
	private String brdTitle;
	private String brdContent; 

    private String mem_name;
    private String mem_email;

    /* Dto -> Entity */
    public Board toEntity() {
        Member member = Member.builder()
                .mem_name(mem_name)
                .mem_email(mem_email)
                .build();
        Board board = Board.builder()
                .brdTitle(brdTitle)
                .brdContent(brdContent)
                .member(member)
                .build();

        return board;
    }
}