package com.univate.univate01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
    org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class
})
public class Univate01Application {

	public static void main(String[] args) {
		SpringApplication.run(Univate01Application.class, args);
	}

}
