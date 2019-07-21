### Inversion of Control

. Create and manage objects

. Config Spring Container

##### XML

. it is like a config file for the java bean(object)

. you can load class during the java code

. you can change the class you want to load just in the xml file, you don't need to change the java code

### Dependency Injection

. Inject object's dependencies

. helper objects

##### Constructor injection

when you use spring to create a new class, you can customize the constructor, just like you can put different class input when you construct a new class

`<constructor-arg ref="myFortune"/>`

##### Setter injection

. create no-arg constructor

. create setter

. set the xml file

`<property name="fortuneService" ref="myFortuneService"/>`

you can also inject literal values just change input from class to values

`<property name="email" value="sample@gmail.com"/>`

samely, you can inject property file that storing values

. Create property file:

`foo.email=sample@gmail.com`

. Load property file:

`<context:property-placeholder location="classpath:sport.properties"/>`

. Reference the values:

`value="${foo.email}$"`

### Bean Scopes

. life cycle of bean

**singleton**: only one object

**prototype**: new object for each request

Bean life cycle method

. custom codes in initialization

`init-method="doMyInitStuff"`

. custom codes in destruction

`destroy-method="doMyFinalStuff"`

**for prototype, spring will not call destruction method!**

### Java Annotations

. meta-data about the class

. it just a alternative to XML for config

. `@Override`

1. enable component scanning in Spring config file

  `<context:component-scan base-package="the package name u want to scan">`

2. add `@Component Annotation` to your Java classes

  `@Component("bean ID")`

3. use bean

**default bean id**

**TennisCoach --> tennisCoach**

So you just need `@Component`

### Injection with Auto Wiring

##### Constructor
1. scan all `@Components` (registered)
2. if match `Interface` (which class implement this Interface)

`@Autowired` onto the `constructor()`

##### Setter
`@Autowired` onto the setter()

##### Any Method
`@Autowired` onto the someFun()

##### Field
Even for private field, so that u do not even need `setter()`

**How to pick?**

Stay consistent

##### property
`@Value("${foo.email}")`

### Qualifier

To avoid multiple matched classes

`@Qualifier("the desired bean id")`

**When u want to use Qualifier in constructor injection, u have to put it into the argument**

### Scope Annotation

**default:** singleton

**to change:** `@Scope("prototype")`

Similarly you can also add methods to **Initialization** and **Destruction**:

`@PostConsturct`, `@PreDestroy`

. it can access all kinds of methods: protected, public, private

. The method should be no-arg.

. Again, Spring will not run the `@PreDestroy` of prototype.

### Spring Configuration with Java Code

Instead of using XML

3 ways:

1. Full XML config
2. XML component scan
3. Java configuration class `@Configuration`

```java
@Configuration
@ComponentScan("you package name") // only scan this package
public class SportConfig {
  
}
AnnotationConfigApplicationContext context =
  new AnnotationConfigApplicationContext(SportConfig.class)
```

##### Define beans with no XML but java class

```java
@Configuration
public class SportConfig {
  @Bean
  public FortuneService happyFortuneService() {
    ...
  } // dependency
  @Bean
  public Coach swimCoach() {
    SwimCoach mySwimCoach = new SwimCoach(happyFortuneService());
    return mySwimCoach;
  }
}
```

##### Inject property file

```java
@PropertySource("you proerty file name")
public class SwimCoach implements Coach {
  @Value("$(foo.email)")
  private String theEmail;
}
```

