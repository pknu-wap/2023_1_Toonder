package io.toonder.boot.springboot.vscode.springbootofvscode.board;

import java.nio.file.AccessDeniedException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.toonder.boot.springboot.vscode.springbootofvscode.ResourceNotFoundException;
import io.toonder.boot.springboot.vscode.springbootofvscode.comment.Comment;
import io.toonder.boot.springboot.vscode.springbootofvscode.comment.CommentRepository;
import io.toonder.boot.springboot.vscode.springbootofvscode.comment.CommentRequestDto;
import io.toonder.boot.springboot.vscode.springbootofvscode.comment.CommentResponseDto;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

	@Autowired
    private CommentRepository commentRepository;


    public int findAllCount() {
        return (int) boardRepository.count();
    }
	// 게시글 목록 데이터를 리턴
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }

	// 페이징 처리된 글목록 데이터를 리턴
	public ResponseEntity<Map<String, Object>> getPagingBoard(Integer p_num) {
		Map<String, Object> result = new HashMap<>();

		int totalObjectCount = findAllCount(); // 전체 글 수 조회

		PagingUtil pu = new PagingUtil(p_num, 5, 5);
		List<Board> boardList = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		pu.setObjectCountTotal(totalObjectCount);
		pu.setCalcForPaging();

		if (boardList == null || boardList.size() == 0) {
			return ResponseEntity.ok(Collections.emptyMap());
		}

		List<BoardResponseDto> boardResponseDtoList = boardList.stream()
				.map(BoardResponseDto::new)
				.collect(Collectors.toList());

		result.put("pagingData", pu);
		result.put("list", boardResponseDtoList);
		return ResponseEntity.ok(result);
	}


    // 게시글 생성 (create)
    public BoardResponseDto createBoard(BoardRequestDto boardRequestDto) {
        Board board = boardRequestDto.toEntity();
        Board savedBoard = boardRepository.save(board);
        return new BoardResponseDto(savedBoard);
    }

    // id값에 해당하는 게시글 불러오기
    public BoardResponseDto getBoard(Integer brdNo) {
        Board board = boardRepository.findById(brdNo)
                .orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));
        return new BoardResponseDto(board);
    }

	// id에 해당하는 게시글 수정 (제목, 내용)
	public BoardResponseDto updateBoard(Integer brdNo, BoardRequestDto boardRequestDto) {
		try {
			Board board = boardRepository.findById(brdNo)
					.orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));

			if (!board.getMember().getMem_email().equals(boardRequestDto.getMem_email())) {
				throw new AccessDeniedException("게시글 수정 권한이 없습니다");
			}

			board.setBrdTitle(boardRequestDto.getBrdTitle());
			board.setBrdContent(boardRequestDto.getBrdContent());
			board.setBrdUpdateDate(Timestamp.valueOf(LocalDateTime.now()));
			Board updatedBoard = boardRepository.save(board);
			return new BoardResponseDto(updatedBoard);
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 수정 권한이 없습니다");
		}
	}

	// 게시글 삭제
	public void deleteBoard(Integer brdNo, BoardRequestDto boardRequestDto) {
		try {
			Board board = boardRepository.findById(brdNo)
					.orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by brdNo: " + brdNo));

			if (!board.getMember().getMem_email().equals(boardRequestDto.getMem_email())) {
				throw new AccessDeniedException("게시글 삭제 권한이 없습니다");
			}

			boardRepository.delete(board);
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "게시글 삭제 권한이 없습니다");
		}
	}

	// 게시글 좋아요 기능
    public BoardResponseDto likeBoard(Integer brdNo, String mem_email) {
		Board board = boardRepository.findById(brdNo)
				.orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
	
		if (board.isLikedByMember(mem_email)) {
			board.decreaseLike(mem_email); // 좋아요 취소
		} else {
			board.increaseLike(mem_email); // 좋아요 추가
		}
	
		Board likedBoard = boardRepository.save(board);
		return new BoardResponseDto(likedBoard);
	}

	// 게시글 조회 시 조회수 증가 
    public ResponseEntity<Board> increaseViewCount(Integer brdNo) {
        Board board = boardRepository.findById(brdNo)
                .orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));

        board.setBrdViewCount(board.getBrdViewCount() + 1);
        boardRepository.save(board);

        return ResponseEntity.ok(board);
    }



	// --- 댓글 ---



	// 게시글에 댓글 작성 (create)
    public CommentResponseDto createComment(Integer brdNo, CommentRequestDto commentDto) {
        Board board = boardRepository.findById(brdNo)
                .orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));

        Comment comment = commentDto.toEntity();
        comment.setBoard(board);
		comment.setCmtLike(0);

        Comment savedComment = commentRepository.save(comment);
        CommentResponseDto responseDto = new CommentResponseDto(savedComment);
        return responseDto;
    }

    // 댓글 조회
    public List<CommentResponseDto> getAllCommentsForBoard(Integer brdNo) {
        Board board = boardRepository.findById(brdNo)
                .orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));

        List<CommentResponseDto> responseDtoList = new ArrayList<>();
        for (Comment comment : board.getComment()) {
            CommentResponseDto responseDto = new CommentResponseDto(comment);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    // 댓글 수정
	public CommentResponseDto updateComment(Integer brdNo, Integer cmtNo, CommentRequestDto commentDto) {
		try {
			Board board = boardRepository.findById(brdNo)
					.orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));

			Comment comment = board.getComment().stream()
					.filter(c -> c.getCmtNo().equals(cmtNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(cmtNo + "번 댓글이 존재하지 않습니다"));

			if (!comment.getMember().getMem_email().equals(commentDto.getMem_email())) {
				throw new AccessDeniedException("댓글 수정 권한이 없습니다");
			}

			comment.update(commentDto.getCmtContent());
			comment.setCmtUpdateDate(new Timestamp(System.currentTimeMillis()));

			Comment updatedComment = commentRepository.save(comment);
			CommentResponseDto responseDto = new CommentResponseDto(updatedComment);
			return responseDto;
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 수정 권한이 없습니다");
		}
	}

	//댓글 삭제
    public ResponseEntity<Map<String, Boolean>> deleteComment(Integer brdNo, Integer cmtNo, CommentRequestDto commentDto) {
		try {
			Board board = boardRepository.findById(brdNo)
					.orElseThrow(() -> new ResourceNotFoundException(brdNo + "번 게시글이 존재하지 않습니다"));
	
			Comment comment = board.getComment().stream()
					.filter(c -> c.getCmtNo().equals(cmtNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(cmtNo + "번 댓글이 존재하지 않습니다"));
	
			if (!comment.getMember().getMem_email().equals(commentDto.getMem_email())) {
				throw new AccessDeniedException("댓글 삭제 권한이 없습니다");
			}
	
			commentRepository.delete(comment);
	
			Map<String, Boolean> response = new HashMap<>();
			response.put(cmtNo + "번 댓글이 삭제되었습니다", Boolean.TRUE);
			return ResponseEntity.ok(response);
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 삭제 권한이 없습니다");
		}
	}

	// 댓글 좋아요 기능
    public CommentResponseDto likeComment(Integer brdNo, Integer cmtNo, String mem_email) {
        Comment comment = commentRepository.findById(cmtNo)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

		if (comment.isLikedByMember(mem_email)) {
			comment.decreaseLike(mem_email); // 좋아요 취소
		} else {
			comment.increaseLike(mem_email); // 좋아요 추가
		}
	
		Comment likedComment = commentRepository.save(comment);
		return new CommentResponseDto(likedComment);
	}
}

