import com.wlfei.mvc.service.ConfigService;
import com.wlfei.mvc.service.impl.ConfigServiceImpl;

public class ConfigDaoTest {
	public static void main(String[] args) {
		ConfigService configService = new ConfigServiceImpl();
		System.out.println( configService.getConfig("1"));
	}
}
