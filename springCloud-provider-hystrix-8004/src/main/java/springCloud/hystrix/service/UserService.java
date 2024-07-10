package springCloud.hystrix.service;

import org.apache.ibatis.annotations.Param;
import springCloud.hystrix.entity.User;

import java.util.List;

/**
 * @author codeofwhite
 * @date 2024/6/26
 * @Description
 */

public interface UserService {
    User validateUser(String uemail, String password);

    void register(String username, String uemail, String password);

    List<User> getAllUser();

    User findByEmail(String uemail);

    boolean updateUserInformation(String uemail, String username, String password, String sex);

    void adminUpdateUser(@Param("user") User user);
}
