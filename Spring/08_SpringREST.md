#### REST?

**RE**presentational **S**tate **T**ransfer

lightweight approach for communicating between apps

language independent

data format: JSON or XML

#### JSON <-> Java POJO with Jackson

data binding

Plain Old Java Object

Jackson will call setter and getter

*so for pojo, they most of the time should have setter and getter*

*most of the time, you just need set all those private members, generate all setter and getter with IDE*

```java
ObjectMapper mapper = new ObjectMapper(); // from jackson

// json -> pojo
Student myStudent = mapper.readValue(new File("data/sample.json"), Student.class);
// pojo -> json

mapper.enable(SerializationFeature.INDENT_OUTPUT); // indent
mapper.writeValue(new File("data/output.json"), myStudent);
```

however, when you use REST controller, the conversion between json and pojo are all behind the sense, you do not need to worry about it. You just return the object

##### ignore

```java
@JsonIgnoreProperties(ignroeUnknown=true)
public class Student {
  
}
```

#### HTTP

##### request

three parts:

- request line: GET, POST ...
- header variable: request metadata
- message body: json, form-data

##### response

- response: status code
- header variable: response metadata
- message body: json, form-data

##### MIME content type

Multipurpose Internet Mail-Extension

Syntax: type/sub-type

text/html, text/plain

application/json, application/xml

#### Spring REST controller

```java
@RestController // extension of @Controller
@RequestMapping("/test")
public class DemoController {
  
}
```

1. maven
1. config class
1. servlet initialize

*when you use RestController and return "helloWorld!", it will return the plain text, instead of jsp*

##### default page

/src/main/java/webapp/index.jsp

tomcat will look for by default

##### Path variables

/api/students/{studentId}

you should return student

```java
@GetMapping("/student/{studentId}")
public Student getStudent(@PathVariable int studentId) { // auto binding
  
}
```

#### handle exception

- create custom error response class

- ```java
  public class StudentErrorResponse {
    private int status;
  	private String message;
    setter();
    getter();
  }
  ```

- create custom exception class

- ```java
  throw new StudentNotFoundException("no such ID");
  ```

- add exception to handler method

- ```java
  // in the controller class
  
  @ExceptionHandler
  public ResponseEntity<StudentErrorResponse> handleException(StudentNotFoundException exc) {
    StudentNotFoundException error = new StudentNotFoundException();
    // set the value in error
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }
  ```

  

##### global exception

@ControllerAdvice

AOP again

so you just throw the error, advice will handle it

#### REST API design

POST: /api/students

GET: /api/students

GET: /api/students/{id}

PUT: /api/students/{id}

DELETE: /api/students/{id}

do not include actions word in url

