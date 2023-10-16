package com.project.User.config;

import com.project.User.Model.LoginData;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.core.convert.support.DefaultConversionService;

import java.sql.Timestamp;
import java.util.Date;

@Configuration
public class AppConfig {
    @Bean
    public LoginData loginData() {
        return new LoginData();
    }


}

