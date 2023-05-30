package io.toonder.boot.springboot.vscode.springbootofvscode;
 
import org.springframework.data.jpa.repository.JpaRepository;

 
public interface MemberRepository extends JpaRepository<Member, String> {
}