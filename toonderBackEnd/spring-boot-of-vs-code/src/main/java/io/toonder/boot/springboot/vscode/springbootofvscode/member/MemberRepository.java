package io.toonder.boot.springboot.vscode.springbootofvscode.member;
 
import org.springframework.data.jpa.repository.JpaRepository;

 
public interface MemberRepository extends JpaRepository<Member, String> {
    //Member findByMem_email(String mem_email);
}