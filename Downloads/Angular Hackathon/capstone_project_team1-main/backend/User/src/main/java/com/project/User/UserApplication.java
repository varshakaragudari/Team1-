package com.project.User;

import com.project.User.Repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
@EnableEurekaClient
@EnableSwagger2
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}

}
