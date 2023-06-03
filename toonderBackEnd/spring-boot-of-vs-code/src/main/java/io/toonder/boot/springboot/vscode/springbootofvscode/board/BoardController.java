package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://localhost:8080") //@CrossOrigin : CORS 문제를 해결하기 위해 추가 - 수정필요
@RestController
@RequestMapping("/toonder")
public class BoardController {
    
    @Autowired
    private BoardService boardService;

    @GetMapping("/board")
    public ResponseEntity<List<BoardResponseDto>> getAllBoards(@RequestParam(value = "p_num", required = false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;
    
        ResponseEntity<Map<String, Object>> response = boardService.getPagingBoard(p_num);
        if (response == null || response.getBody() == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    
        List<BoardResponseDto> boardResponseDtoList = (List<BoardResponseDto>) response.getBody().get("list");
    
        return ResponseEntity.ok(boardResponseDtoList);
    }

    // 게시글 생성 (create)
    @PostMapping("/board")
    public ResponseEntity<BoardResponseDto> createBoard(@RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto createdBoard = boardService.createBoard(boardRequestDto);
        return ResponseEntity.ok(createdBoard);
    }

    // 게시글 상세보기
    @GetMapping("/board/{brdNo}")
    public ResponseEntity<BoardResponseDto> getBoardByBrdNo(@PathVariable Integer brdNo) {
        boardService.increaseViewCount(brdNo); 
        BoardResponseDto boardResponseDto = boardService.getBoard(brdNo);
        return ResponseEntity.ok(boardResponseDto);
    }
        
    // 게시글 수정 (update)
    @PutMapping("/board/{brdNo}")
    public ResponseEntity<BoardResponseDto> updateBoardByNo(@PathVariable Integer brdNo, @RequestBody BoardRequestDto boardRequestDto) {
        BoardResponseDto updatedBoard = boardService.updateBoard(brdNo, boardRequestDto);
        return ResponseEntity.ok(updatedBoard);
    }

    // 게시글 삭제
    @DeleteMapping("/board/{brdNo}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(@PathVariable Integer brdNo, @RequestBody BoardRequestDto boardRequestDto) {
        boardService.deleteBoard(brdNo, boardRequestDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by brdNo: " + brdNo, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // 게시글 좋아요 기능
    @PostMapping("/board/{brdNo}/like")
    public ResponseEntity<BoardResponseDto> likeBoard(@PathVariable Integer brdNo, @RequestHeader("mem_email") String memEmail) {
        BoardResponseDto likedBoard = boardService.likeBoard(brdNo, memEmail);
        return ResponseEntity.ok(likedBoard);
    }  
}
