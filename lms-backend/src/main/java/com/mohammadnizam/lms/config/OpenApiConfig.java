package com.mohammadnizam.lms.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "Library Management System API", version = "1.0",
                description = "API documentation for the LMS"),
        servers = @Server(url = "/", description = "Default")
)
public class OpenApiConfig {
}
