package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WebtoonRepository extends JpaRepository<Webtoon, String> {

    List<Webtoon> findByMainGenreCdNm(String mainGenreCdNm);
    
    List<Webtoon> findByTitleContaining(String keyword, Pageable pageable);

	public final static String SELECT_WEBTOON_LIST_PAGED = ""
			+ "SELECT "
			+ "mastrId,"
			+ "title,"
            + "pictrWritrNm,"
            + "sntncWritrNm,"
            + "mainGenreCdNm,"
            + "outline,"
            + "pltfomCdNm,"
            + "fnshYn,"
            + "webtoonPusryYn,"
			+ "imageDownloadUrl"
			+ " FROM webtoon WHERE 0 < mastrId "
			+ "ORDER BY mastrId DESC LIMIT ?1, ?2";

	@Query(value = SELECT_WEBTOON_LIST_PAGED, nativeQuery = true)
	List<Webtoon> findFromTo(
			final Integer objectStartNum,
			final Integer objectEndNum);
}
