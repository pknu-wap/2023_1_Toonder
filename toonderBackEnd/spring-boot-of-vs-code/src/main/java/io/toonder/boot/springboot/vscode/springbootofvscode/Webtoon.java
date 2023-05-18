package io.toonder.boot.springboot.vscode.springbootofvscode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "webtoon")
public class Webtoon {
    @Id
    @Column(name = "mastrId", nullable = false)
    private String mastrId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "pictrWritrNm")
    private String pictrWritrNm;

    @Column(name = "sntncWritrNm")
    private String sntncWritrNm;

    @Column(name = "mainGenreCdNm")
    private String mainGenreCdNm;

    @Column(name = "outline",columnDefinition = "TEXT")
    private String outline;

    @Column(name = "pltfomCdNm")
    private String pltfomCdNm;

    @Column(name = "fnshYn")
    private String fnshYn;

    @Column(name = "webtoonPusryYn")
    private String webtoonPusryYn;

    @Column(name = "imageDownloadUrl")
    private String imageDownloadUrl;

}
