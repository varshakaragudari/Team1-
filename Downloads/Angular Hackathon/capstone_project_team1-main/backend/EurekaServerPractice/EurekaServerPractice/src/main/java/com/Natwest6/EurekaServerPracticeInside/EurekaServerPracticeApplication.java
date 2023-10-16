package com.Natwest6.EurekaServerPracticeInside;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaServerPracticeApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaServerPracticeApplication.class, args);
	}

}
