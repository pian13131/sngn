a framework for security

Servlet Filter

checkt the user id and password in db

built-in login form

#### Config

```java
@Configuration
@EnableWebMvc
@ComponentScan("com.aksnkansdlk")
public class DemoAppConfig {
  @Bean
  public ViewResolver viewResolver() {
    InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
    viewResolver.setPrefix("/WEB-INF/view/");
    viewResolver.setSuffix(".jsp"); // so you can just return the view name
    
    return viewResolver;
  }
}
```

just the same function with web.xml

you should add Maven WAR plugin in pom.xml to tell it we use the java class to config

```html
<build>
  <finalName>spring-security-demo</finalName>
  <pluginManagement>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.2.0</version>
      </plugin>
    </plugins>
  </pluginManagement>
</build>
```



#### Initialize the Servlet

```java
public class MySpringMvcDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return null;
  }
  @Override
  protected Class<?>[] getServletConfigClasses() { // set the config
    return new Class[] {DemoAppConfig.class};
  }
  @Override
  protected String[] getServletMappings() { // set the root mapping
    return new String[] {"/"};
  }
}
```

#### Initialize the Security

```java
public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {
  // this is just active the security function, that is it
}
```

##### config

```java
@Configuration
@EnableWebSecurity
public class DemoSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    // add our users for in memory authentication
    // so later you do not need these stuff actually
    UserBuilder users = User.withDefaultPasswordEncoder();
    auth.inMemoryAuthentication ()
      .withUser(users.username ("john").password("test123").roles("EMPLOYEE"))
      .withUser(users.username ("mary").password("test123").roles("MANAGER"))
      .withUser(users.username ("susan").password("test123").roles("ADMIN"));
  }
}
```

you can run even without jsp page, the default page was provided by SpringSecurity

so for now, you only can login with the account in the memory

##### Context Root

the root path of your web application

if it is `mpapp` , you can access it by `http://localhost:8080/myapp`

#### Custom Login Form

in the Security Config class

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // config the paths in app, login, logout
  http.authorizeRequests() // 
    .anyRequest()
    .authenticated()
    .and()
    .formLogin()
    .loginPage("/showMyLoginPage") // login jsp page
    .loginProcessingUrl("/authenticateTheUser") // post data to this url
    .permitAll () ; // anyone can see the login page
}
```

```java
@Controller
public class LoginController {
  @GetMapping("/showMyLoginPage")
  public String showMyLoginPage() {
    return "plain-login"; // login page
  }
}
```

```html
<form:form action="${pageContext.request.contextPath}/authenticateTheUser" method="POST">
  User name: <input type="text" name="username"/>
  Passwor: <input type="password" name="password"/>
  <input type="submit" value="Login"/>
</form:form>
```

Spring will handle the process after you submit this form

`pageContext.request.contextPath` is just the context root, this just return the url dynamically, so you do not need to hardcoding

#### Error message

`?error`

```html
<form:form action="${pageContext.request.contextPath}/authenticateTheUser" method="POST">
  <c:if test="${param.error != null}">
    <i>Sorry! Wrong username/password!</i>
  </c:if>
  User name: <input type="text" name="username"/>
  Passwor: <input type="password" name="password"/>
  <input type="submit" value="Login"/>
</form:form>
```

#### Logout

you should also add logout support in security configuration

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // config the paths in app, login, logout
  http.authorizeRequests() // 
      .anyRequest()
      .authenticated()
    .and()
    .formLogin()
      .loginPage("/showMyLoginPage") // login jsp page
      .loginProcessingUrl("/authenticateTheUser") // post data to this url
      .permitAll () ; // anyone can see the login page
    .and()
      .logout() // default url /logout
      .permitAll();
}
```

##### button

```html
<form:form action="${pageContext.request.contextPath}/logout" method="POST">
  <input type="submit" value="Logout"/>
</form:form>
```

`?logout`

```html
<c:if test="${param.logout != null}">
  <i>You logout</i>
</c:if>
```

#### Cross Site Request Forgery

Spring provide this by default, in the SpringSecurityFilter

a security attack trick you do sth stupid when you logged in

send money, buy sth

under CSRF protection:

- form must use POST instead of GET
- include CSRF token(this handled by `<form:form>`)

#### Display user ID

- add spring-security-taglibs in POM file

- add JSP tag in JSP page
- refer in JSP

1. ```html
   User: <security:authentication property="principal.username" />
   ```

   ```html
   Role: <security:authentication property="principal.authorities" />
   ```

you can have many roles

#### Restrict Access

according to role

- handle this in controller class

- update roles form

- update Spring Security config

- ```java
  antMatchers(<< add path to match on >>).hasRole(<< authorized role >>)
  ```

  ```java
  antMatchers(<< add path to match on >>).hasAnyRole(<< authorized role >>)
  ```

  ```java
  antMatchers("/").hasRole("EMPLOYEE")
  ```

  ```java
  antMatchers("/leaders/**").hasRole("MANAGER")
  ```

  

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // config the paths in app, login, logout
  http.authorizeRequests() // 
      .antMatchers("/").hasRole("EMPLOYEE")
      .antMatchers("/leaders/**").hasRole("MANAGER")
    .
    .
    .
}
```

##### custom deny page

in security config class again

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
  // config the paths in app, login, logout
  http.authorizeRequests()
    .and()
    .exceptionHandling()
      .accessDeniedPage("/access-denied") // request mapping
}
```

##### show page according with role

```html
<security:authorize access="hasRole('MANAGER')">
  text for manager
</security:authorize>
```

#### User stored in DB (pre-defined schema)

##### tables

you have to set the exact particular table name `authorities, users`, and column name `username, password, enabled, authority(role)`

##### password

```mysql
('Lyu', '{noop}test123', 1)
```

`noop` means plain, `bcrypt` means hash with bcrypt. it just tell spring what format you store



*luv2code only talked about the pre-defined schema and JDBC, not about with hibernate*





#### Password Encryption

bcrypt

every time generation will be different

must at least 68 chars wide

when compare, will use the same salt