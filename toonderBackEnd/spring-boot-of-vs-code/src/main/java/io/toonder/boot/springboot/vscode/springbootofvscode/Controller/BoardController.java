package io.toonder.boot.springboot.vscode.springbootofvscode.Controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.Board;
import io.toonder.boot.springboot.vscode.springbootofvscode.BoardService;

@CrossOrigin(origins = "http://localhost:8080") //@CrossOrigin : CORS 문제를 해결하기 위해 추가 - 수정필요
@RestController
@RequestMapping("/toonder")
public class BoardController {
    
    @Autowired
	private BoardService boardService;

    //Service 호출 -> 글목록 리턴
    // 페이징 처리
	@GetMapping("/board") 
	public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required=false) Integer p_num) {
		if (p_num == null || p_num <= 0) p_num = 1;
		
		return boardService.getPagingBoard(p_num);
    }

    // 게시글 생성 (create)
	@PostMapping("/board")
	public Board createBoard(@RequestBody Board board) {
		return boardService.createBoard(board);
	}

    // 게시글 상세보기
	@GetMapping("/board/{brdNo}")
	public ResponseEntity<Board> getBoardByBrdNo(
			@PathVariable Integer brdNo) {
		return boardService.getBoard(brdNo);
	}

    //게시글 수정 (update)
	@PutMapping("/board/{brdNo}")
	public ResponseEntity<Board> updateBoardByNo(
			@PathVariable Integer brdNo, @RequestBody Board board){
		
		return boardService.updateBoard(brdNo, board);
	}

    //게시글 삭제 
	@DeleteMapping("/board/{brdNo}")
	public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
			@PathVariable Integer brdNo) {
		
		return boardService.deleteBoard(brdNo);
	}








}
