package io.toonder.boot.springboot.vscode.springbootofvscode;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
}