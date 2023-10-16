package com.Natwest7.SpringCloudRoutingInside;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SpringCloudRoutingApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringCloudRoutingApplication.class, args);
	}

}
