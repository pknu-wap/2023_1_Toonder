package io.toonder.boot.springboot.vscode.springbootofvscode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SpringBootOfVsCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootOfVsCodeApplication.class, args);
	}
}
