package io.toonder.boot.springboot.vscode.springbootofvscode.comment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository <Comment, Integer> {
    
}
