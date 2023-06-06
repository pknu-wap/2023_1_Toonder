package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.toonder.boot.springboot.vscode.springbootofvscode.review.Review;
import lombok.Data;


@Data
@Entity
@Table(name = "webtoon")
public class Webtoon {
    @Id
    @Column(name = "mastrId", nullable = false)
    private String mastrId; //자료고유ID

    @Column(name = "title", nullable = false)
    private String title; //작품명

    private String pictrWritrNm; //그림작가
    private String sntncWritrNm; //글작가
    private String mainGenreCdNm; //대표장르코드명

    @Column(length = 3000)
    private String outline; //줄거리

    private String pltfomCdNm; //플랫폼코드명
    private String fnshYn; //완결여부
    private String webtoonPusryYn; //웹툰연재여부	
    private String imageDownloadUrl; //이미지다운로드URL(표지)

    @OneToMany(mappedBy = "webtoon", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JsonBackReference
    @OrderBy("revNo asc") // 리뷰 정렬
	private List<Review> review;
}
