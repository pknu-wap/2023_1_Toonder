package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.toonder.boot.springboot.vscode.springbootofvscode.board.BoardService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/toonder")
public class CommentController {

    @Autowired
    private BoardService boardService;
    
    // 게시글에 해당하는 댓글 전체보기
    @GetMapping("/board/{brdNo}/comment")
    public ResponseEntity<List<CommentResponseDto>> getAllCommentsForBoard(@PathVariable Integer brdNo) {
        List<CommentResponseDto> comments = boardService.getAllCommentsForBoard(brdNo);
        return ResponseEntity.ok(comments);
    }

    // 게시글에 댓글 생성
    @PostMapping("/board/{brdNo}/comment")
    public ResponseEntity<CommentResponseDto> createComment(
            @PathVariable Integer brdNo, @RequestBody CommentRequestDto commentDto) {
        CommentResponseDto createdComment = boardService.createComment(brdNo, commentDto);
        return ResponseEntity.ok(createdComment);
    }

    // 댓글 수정 - 작성자만 수정 가능
    @PutMapping("/board/{brdNo}/comment/{cmtNo}")
    public ResponseEntity<CommentResponseDto> updateCommentByCmtNo(
            @PathVariable Integer brdNo, @PathVariable Integer cmtNo,
            @RequestBody CommentRequestDto commentDto) {
        CommentResponseDto updatedComment = boardService.updateComment(brdNo, cmtNo, commentDto);
        return ResponseEntity.ok(updatedComment);
    }

    // 댓글 삭제 - 작성자만 삭제 가능
    @DeleteMapping("/board/{brdNo}/comment/{cmtNo}")
    public ResponseEntity<Map<String, Boolean>> deleteCommentByCmtNo(
            @PathVariable Integer brdNo, @PathVariable Integer cmtNo, @RequestBody CommentRequestDto commentDto) {
        boardService.deleteComment(brdNo,cmtNo, commentDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Comment Data by cmtNo: " + cmtNo, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // 댓글 좋아요 기능
    @PostMapping("/board/{brdNo}/comment/{cmtNo}/like")
    public ResponseEntity<CommentResponseDto> likeComment(
            @PathVariable Integer brdNo, @PathVariable Integer cmtNo, @RequestHeader("mem_email") String memEmail) {
        CommentResponseDto likedComment = boardService.likeComment(brdNo, cmtNo, memEmail);
        return ResponseEntity.ok(likedComment);
    }
}
