package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import java.nio.file.AccessDeniedException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import io.toonder.boot.springboot.vscode.springbootofvscode.ResourceNotFoundException;
import io.toonder.boot.springboot.vscode.springbootofvscode.board.PagingUtil;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.Review;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.ReviewRepository;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.ReviewRequestDto;
import io.toonder.boot.springboot.vscode.springbootofvscode.review.ReviewResponseDto;

@Service
public class WebtoonService { 

    @Autowired
    private WebtoonRepository webtoonRepository;

	@Autowired
    private ReviewRepository reviewRepository;

    
    // 웹툰 목록 
    public List<Webtoon> getAllWebtoons() {
        return webtoonRepository.findAll();
    }
    public int findAllCount() {
        return (int) webtoonRepository.count();
    }
    
    // 페이징 처리된 웹툰목록 데이터를 리턴
	public ResponseEntity<Map<String, Object>> getPagingWebtoon(Integer p_num) {
		Map<String, Object> result = new HashMap<>();

		int totalObjectCount = findAllCount(); // 전체 글 수 조회

		PagingUtil pu = new PagingUtil(p_num, 64, 10);
		List<Webtoon> webtoonList = webtoonRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		pu.setObjectCountTotal(totalObjectCount);
		pu.setCalcForPaging();

		if (webtoonList == null || webtoonList.size() == 0) {
			return ResponseEntity.ok(Collections.emptyMap());
		}

		List<WebtoonResponseDto> webtoonResponseDtoList = webtoonList.stream()
				.map(WebtoonResponseDto::new)
				.collect(Collectors.toList());

		result.put("pagingData", pu);
		result.put("list", webtoonResponseDtoList);
		return ResponseEntity.ok(result);
	}

    // id값에 해당하는 웹툰 불러오기
    public WebtoonResponseDto getWebtoon(String mastrId) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번에 해당하는 웹툰이 존재하지 않습니다"));
        return new WebtoonResponseDto(webtoon);
    }

    /* 
    //키워드로 제목 비교해서 search
    public List<Webtoon> searchWebtoonsByTitle(String keyword) {
        return webtoonRepository.findByTitleContaining(keyword);
    }*/
    // 키워드로 제목 비교해서 search
    public ResponseEntity<Map<String, Object>> searchWebtoonsByTitle(String keyword, int currentPageNum) {
        int totalCount = webtoonRepository.countByTitleContaining(keyword);

        PagingUtil pagingUtil = new PagingUtil(currentPageNum, 64, 10, totalCount);
        pagingUtil.setCalcForPaging();

        PageRequest pageable = PageRequest.of(pagingUtil.getCurrentPage() - 1, pagingUtil.getObjectCountPerPage());

        Page<Webtoon> webtoonPage = webtoonRepository.findByTitleContaining(keyword, pageable);

        List<WebtoonResponseDto> webtoonResponseList = webtoonPage.getContent().stream()
                .map(WebtoonResponseDto::new)
                .collect(Collectors.toList());

        if (webtoonResponseList.isEmpty()) {
            Map<String, Object> emptyResponse = new HashMap<>();
            emptyResponse.put("message", "검색 결과가 없습니다.");
            return ResponseEntity.ok(emptyResponse);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("webtoonList", webtoonResponseList);
        response.put("pagingUtil", pagingUtil);

        return ResponseEntity.ok(response);
    }
    


	// --- 리뷰 ---



    // 웹툰에 리뷰 작성 (create)
    public ReviewResponseDto createReview(String mastrId, ReviewRequestDto reviewDto) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));

        double revRating = reviewDto.getRevRating();

        if (revRating < 0 || revRating > 5 || revRating % 0.5 != 0) {
            throw new IllegalArgumentException("별점은 0부터 5까지 0.5단위로 가능합니다.");
        }

        Review review = reviewDto.toEntity();
        review.setWebtoon(webtoon);

        Review savedReview = reviewRepository.save(review);
        ReviewResponseDto responseDto = new ReviewResponseDto(savedReview);
        return responseDto;
    }

    // 리뷰 조회
    public List<ReviewResponseDto> getAllReviewsForWebtoon(String mastrId) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));

        List<ReviewResponseDto> responseDtoList = new ArrayList<>();
        for (Review review : webtoon.getReview()) {
            ReviewResponseDto responseDto = new ReviewResponseDto(review);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    // 리뷰 수정
	public ReviewResponseDto updateReview(String mastrId, Integer revNo, ReviewRequestDto reviewDto) {
		try {
            Webtoon webtoon = webtoonRepository.findById(mastrId)
                    .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));
			Review review = webtoon.getReview().stream()
					.filter(c -> c.getRevNo().equals(revNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(revNo + "번 댓글이 존재하지 않습니다"));

			if (!review.getMember().getMem_email().equals(reviewDto.getMem_email())) {
				throw new AccessDeniedException("댓글 수정 권한이 없습니다");
			}

            double revRating = reviewDto.getRevRating();
            if (revRating < 0 || revRating > 5 || revRating % 0.5 != 0) {
                throw new IllegalArgumentException("별점은 0부터 5까지 0.5단위로 가능합니다.");
            }

			review.update(reviewDto.getRevContent());
            review.setRevRating(reviewDto.getRevRating());
			review.setRevUpdateDate(new Timestamp(System.currentTimeMillis()));

			Review updatedReview = reviewRepository.save(review);
			ReviewResponseDto responseDto = new ReviewResponseDto(updatedReview);
			return responseDto;
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 수정 권한이 없습니다");
		}
	}

	//댓글 삭제
    public ResponseEntity<Map<String, Boolean>> deleteReview(String mastrId, Integer revNo, ReviewRequestDto reviewDto) {
		try {
			Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));
	
            Review review = webtoon.getReview().stream()
					.filter(c -> c.getRevNo().equals(revNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(revNo + "번 댓글이 존재하지 않습니다"));
	
			if (!review.getMember().getMem_email().equals(reviewDto.getMem_email())) {
				throw new AccessDeniedException("댓글 삭제 권한이 없습니다");
			}
	
			reviewRepository.delete(review);
	
			Map<String, Boolean> response = new HashMap<>();
			response.put(revNo + "번 댓글이 삭제되었습니다", Boolean.TRUE);
			return ResponseEntity.ok(response);
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 삭제 권한이 없습니다");
		}
	}

	// 댓글 좋아요 기능
    public ReviewResponseDto likeReview(String mastrId, Integer revNo,String mem_email) {
        //Webtoon webtoon = webtoonRepository.findById(mastrId).orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        Review review = reviewRepository.findById(revNo)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

		if (review.isLikedByMember(mem_email)) {
			review.decreaseLike(mem_email); // 좋아요 취소
		} else {
			review.increaseLike(mem_email); // 좋아요 추가
		}
	
		Review likedReview = reviewRepository.save(review);
		return new ReviewResponseDto(likedReview);
	}


    //--- 웹툰 정보 저장 ---
    @Transactional(rollbackFor = Exception.class)
    public void init(String jsonData) {
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonData);
            JSONArray jsonArray = (JSONArray) jsonObject.get("itemList");

            if (jsonArray != null) {
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject jObj = (JSONObject) jsonArray.get(i);

                    String ageGradCdNm = jObj.get("ageGradCdNm").toString();

                    if (!ageGradCdNm.equals("19세 이상") ) {
                        String mastrId = jObj.get("mastrId").toString();

                        // mastrId로 이미 저장된 웹툰 정보가 있는지 확인
                        Webtoon existingWebtoon = webtoonRepository.findById(mastrId).orElse(null);

                        if (existingWebtoon == null) {
                            Webtoon webtoon = new Webtoon();
                            webtoon.setMastrId(mastrId);
                            webtoon.setTitle(jObj.get("title").toString());
                            //webtoon.setPictrWritrNm(jObj.get("pictrWritrNm").toString());
                            //webtoon.setSntncWritrNm(jObj.get("sntncWritrNm").toString());
                            
                            String[] properties = {"pictrWritrNm", "sntncWritrNm", "mainGenreCdNm", "imageDownloadUrl", "outline", "pltfomCdNm", "fnshYn", "webtoonPusryYn"};
                            for (String property : properties) {
                                String value = jObj.get(property) != null ? jObj.get(property).toString() : "";
                                switch (property) {
                                    case "pictrWritrNm":
                                        webtoon.setPictrWritrNm(value);
                                        break;
                                    case "sntncWritrNm":
                                        webtoon.setSntncWritrNm(value);
                                        break;
                                    case "mainGenreCdNm":
                                        webtoon.setMainGenreCdNm(value);
                                        break;
                                    case "imageDownloadUrl":
                                        webtoon.setImageDownloadUrl(value);
                                        break;
                                    case "outline":
                                        webtoon.setOutline(value);
                                        break;
                                    case "pltfomCdNm":
                                        webtoon.setPltfomCdNm(value);
                                        break;
                                    case "fnshYn":
                                        webtoon.setFnshYn(value);
                                        break;
                                    case "webtoonPusryYn":
                                        webtoon.setWebtoonPusryYn(value);
                                        break;
                                }
                            }

                            webtoonRepository.save(webtoon);
                        }
                    }
                }
            }

            webtoonRepository.flush(); // 변경 사항을 즉시 데이터베이스에 반영

        } catch (Exception e) {
            e.printStackTrace();
            //예외 처리
        }
    }
}


