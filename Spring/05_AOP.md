#### Aspect Oriented Programming

Cross-Cutting-Concerns

##### Aspect

module reused at many locations

##### Advice

**what** action is taken and **when** it should be applied

- before advice: run before the method
- after finally advice: run after the method(finally)
- after returning advice: run after the method(success execution)
- after throwing advice: run after the method(if exception thrown)
- Around advice: run before and after method

*just like the life cycle of component in React, haha*

##### Join Point

**when** to apply code during program execution

##### Point-cut

a predicate expression for **where** advice should be applied

##### Weaving

connect aspects to target objects to create an advised object

- compile time
- load time
- run time

##### Pros

- only one class

- you only focus on those old functions

- easy to config

*just like the middleware in node.js, haha*

##### Cons

- too many aspects, it hard to follow the app flow

- performance cost

#### @Before Advice

logging, security, transaction

before add account, you should ask client to login

```java
@Aspect
@Component
public class MyDemoLoggingAspect {
  @Before("execution(public void addAcount())") // point cut expression
  public void beforeAddAccountAdvice() {
    
  }
}
```

##### Config class

```java
@Configuration
@EnableAspectJAutoProxy // enable aop
@ComponentScan("packageName")
public class yourConfig {
  
}
```

then, you just do as you done before. Except the aspect class, it is just nothing change, pretty magical, because, all connection happened in aspect class

most of the time, you should create a new package to hold all your aspects

#### Point-cut expression

execution(modifiers? **return-type** declaring-type? **method-name(param)** throws?)

if you don't mention the declaring-type, which tell which class, all the methods with the same name in different classes will be matched

##### Wildcards

you can use * to match all

`"execution(public void add*())"`

all methods start with add

##### param

**()** - match a method with no arg

**(*)** - match a method with one arg of any type

**(..)** - match a method with 0 or more args of any type

when you want limit param to some class, you should put the **fully qualified class name** into the ()

##### Reuse solution

```java
@Aspect
@Component
public class MyDemoLoggingAspect {
  @Pointcut("execution(public void addAcount())") // point cut expression
  public void forDaoPackage(){}
  
  @Before("forDaoPackage()") // you can attach it to many advices
  public void beforeAddAccountAdvice() {
    
  }
}
```

##### combine point-cut

use logic operators

```
@Before("expressionOne() && !expressionTwo()")
```

so you can match all methods except the getter()

you can even pass those logic expression into new @Pointcut

#### Ordering

order for different advices

place advices in separate aspects, add `@Order(3)` to aspects

*Aspects -> Class, advice - > method*

more lower, more high priority

same order? they only random in the aspects with same order

#### Access Params

##### get signature

```java
@Before("...")
  public void beforeAddAccountAdvice(JoinPoint aJoinPoint) {
    MethodSignature methodSig = (MethodSignature) aJoinPoint.getSignature();
  }
```

this will get the like

`void averylongpackagename.ClassName.methodName(InputType)`

##### get arguments

```java
@Before("...")
  public void beforeAddAccountAdvice(JoinPoint aJoinPoint) {
    Object[] args = aJoinPoint.getArgs();
    
    for (Object tempArg : args) {
      
    }
  }
```

#### @AfterReturning

add the annotation just like the before

##### access return value

```java
@AfterReturning(
  pointcut="execution()",
  returning="result"----------------------|
)                                         |
public void afterReturnFindAccountAdvice( |
  JoinPoint theJoinPoint, List<Account> result) {
  
}
```

##### modify return value

you just modify it in the method above

#### @AfterTrowing

log the exception

handle the error

```java
@AfterTrowing(
  pointcut="...",
  throwing="theExc"
)
public void afterThrowingFindAccountAdvice(
  JoinPoint theJoinPoint, Throwable theExc) {
  
}
```

#### @After(finally)

- this will run when success or exception, just like the combine of @AfterReturning and @AfterTrowing

- however, the @After will always run before those two @After* advice

- however, it cannot access to the exception

#### @Around

before and after

```java
@Around(
  pointcut="...",
)
public Object afterGetFortune(
  ProcessdingJoinPoint theProcessdingJoinPoint) throw Throwable {
  //handle the target method
  
 	// do the stuff before the method
  
  Object result = theProceedingJoinPoint.proceed();
  // run the target method manually
  
  // do the stuff after the method
  
  return result;
}
```

##### Exception

```java
try{
  Object result = theProceedingJoinPoint.proceed();
} catch (Exception exc) {
  
}

return result;
```

main method will not know the exception happened, so you need re-throwing

##### Re-throwing

you just `throw exc` in the catch

