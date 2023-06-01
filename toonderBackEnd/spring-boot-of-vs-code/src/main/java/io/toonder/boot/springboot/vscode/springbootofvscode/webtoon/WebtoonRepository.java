package io.toonder.boot.springboot.vscode.springbootofvscode.webtoon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebtoonRepository extends JpaRepository<Webtoon, String> {
    
}
