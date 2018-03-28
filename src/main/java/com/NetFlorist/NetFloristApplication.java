package com.NetFlorist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.NetFlorist","com.NetFlorist.model","com.NetFlorist.services","com.NetFlorist.controller","com.NetFlorist.repositories"})
public class NetFloristApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetFloristApplication.class, args);
	}
}
