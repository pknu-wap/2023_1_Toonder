package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.toonder.boot.springboot.vscode.springbootofvscode.ResourceNotFoundException;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;
	
    public int findAllCount() {
		return (int) boardRepository.count();
	}
	
	// 페이징
	public ResponseEntity<Map> getPagingBoard(Integer p_num) {
		Map result = null;
		
		PagingUtil pu = new PagingUtil(p_num, 5, 5); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
		List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		pu.setObjectCountTotal(findAllCount());
		pu.setCalcForPaging();
		
		System.out.println("p_num : "+p_num);
		System.out.println(pu.toString());
		
		if (list == null || list.size() == 0) {
			return null;
		}
		
		result = new HashMap<>();
		result.put("pagingData", pu);
		result.put("list", list);
		
		return ResponseEntity.ok(result);
	}

    //Repository를 호출해서 글목록 데이터를 리턴하는 메소드
	public List<Board> getAllBoard() { 
		return boardRepository.findAll();
	}

    // 게시글 생성 (create)
	public Board createBoard(Board board) {
		return boardRepository.save(board);
	}

    // id값에 해당하는 게시글 불러오기
	public ResponseEntity<Board> getBoard(Integer brdNo) {
		Board board = boardRepository.findById(brdNo)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by brdNo : ["+brdNo+"]"));
		return ResponseEntity.ok(board);
	}

    // id에 해당하는 게시글 수정 (제목, 내용)
	public ResponseEntity<Board> updateBoard(
        Integer brdNo, Board updatedBoard) {
        Board board = boardRepository.findById(brdNo)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by brdNo : ["+brdNo+"]"));
        board.setBrdTitle(updatedBoard.getBrdTitle());
        board.setBrdContent(updatedBoard.getBrdContent());
        board.setBrdUpdateDate(new Timestamp(System.currentTimeMillis()));
        
        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    //게시글 삭제
    public ResponseEntity<Map<String, Boolean>> deleteBoard(
			Integer brdNo) {
		Board board = boardRepository.findById(brdNo)
				.orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by brdNo : ["+brdNo+"]"));
		
		boardRepository.delete(board);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Board Data by brdNo : ["+brdNo+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}









}

