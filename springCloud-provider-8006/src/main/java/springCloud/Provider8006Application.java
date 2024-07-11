package springCloud;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author codeofwhite
 * @date 2024/7/11
 * @Description
 */
@SpringBootApplication
@EnableEurekaClient //开启 Eureka 客户端功能
@MapperScan("springCloud.mapper")
public class Provider8006Application {
    public static void main(String[] args) {
        SpringApplication.run(Provider8006Application.class, args);
    }
}
