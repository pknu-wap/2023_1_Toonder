package io.toonder.boot.springboot.vscode.springbootofvscode.review;

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

import io.toonder.boot.springboot.vscode.springbootofvscode.webtoon.WebtoonService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/toonder")
public class ReviewController {

    @Autowired
    private WebtoonService webtoonService;
    
    // 웹툰에 해당하는 리뷰 전체보기
    @GetMapping("/webtoon/{mastrId}/review")
    public ResponseEntity<List<ReviewResponseDto>> getAllReviewsForWebtoon(@PathVariable String mastrId) {
        List<ReviewResponseDto> reviews = webtoonService.getAllReviewsForWebtoon(mastrId);
        return ResponseEntity.ok(reviews);
    }

    // 리뷰 생성
    @PostMapping("/webtoon/{mastrId}/review")
    public ResponseEntity<ReviewResponseDto> createReview(
            @PathVariable String mastrId, @RequestBody ReviewRequestDto reviewDto) {
        ReviewResponseDto createdReview = webtoonService.createReview(mastrId, reviewDto);
        return ResponseEntity.ok(createdReview);
    }

    // 리뷰 수정 - 작성자만 수정 가능
    @PutMapping("/webtoon/{mastrId}/review/{revNo}")
    public ResponseEntity<ReviewResponseDto> updateReviewByRevNo(
            @PathVariable String mastrId, @PathVariable Integer revNo,
            @RequestBody ReviewRequestDto reviewDto) {
        ReviewResponseDto updatedReview = webtoonService.updateReview(mastrId, revNo, reviewDto);
        return ResponseEntity.ok(updatedReview);
    }

    // 리뷰 삭제 - 작성자만 삭제 가능
    @DeleteMapping("/webtoon/{mastrId}/review/{revNo}")
    public ResponseEntity<Map<String, Boolean>> deleteReviewByRevNo(
            @PathVariable String mastrId, @PathVariable Integer revNo, @RequestBody ReviewRequestDto reviewDto) {
        webtoonService.deleteReview(mastrId, revNo, reviewDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put(revNo + "번 리뷰가 삭제되었습니다", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // 리뷰 좋아요 기능
    @PostMapping("/webtoon/{mastrId}/review/{revNo}/like")
    public ResponseEntity<ReviewResponseDto> likeReview(
            @PathVariable String mastrId, @PathVariable Integer revNo, @RequestHeader("mem_email") String memEmail) {
        ReviewResponseDto likedReview = webtoonService.likeReview(mastrId, revNo, memEmail);
        return ResponseEntity.ok(likedReview);
    }
}