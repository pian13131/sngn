### Definition of SpringMVC

- a framework for Web dev with Spring

- pages + beans + configs

- model -> controller -> model -> view

#### Dev Environment setup

1. Config DispatcherServlet
2. Setup URL mapping
3. Add support for component scanning
4. Add support for conversion, formatting and validation
5. Config MVC view resolver (add prefix, suffix)

#### Create Home Controller and View

1. Create controller class `@Controller`
1. Define controller method inside of the class
1. Add request mapping `@RequestMapping("/")`
1. Return view name, Spring will try to find the view(jsp file)
1. Develop view page

#### Read form data

```html
<form action="processForm" method="GET">
		<input type="text" name="studentName" placeholder="your name?"/>
		<input type="submit"/>
</form>
```

Just use `${param.name}` inside of html

this will only in **frontend**

#### Handle data from form

This will be in **backend**

```java
@RequestMapping("/processForm")
public String func(HttpServiceRequest request, Model model) {
  String theName = request.getParameter("studentName");
  model.addAttribute("keyName", "value");
  
  return "viewName";
}
```

Then, in the frontend, you can access the model's attribute with `${"keyName"}`

#### Access the resources file

- You should config the path in xml file

`<mvc:resources mapping="/resources/**" location="/resources/"></mvc:resources>`

- then the frontend can access by 

  `src="${pageContext.request.contextPath}/static/js/sample.js"`

#### Read form data with Annotation

```java
public String func(@RequestParam("studentName") String Name, Model model) {
  
}
```

this will bind the value in `studentName` into `Name`

### Request Mapping

You can add `@RequestMapping("")` to methods, it will become the sub directory of the class's mapping

### Form Tag

- support data binding

- generate html

- reference them in the jsp file, just like jsx (Remember you should add a tag in the html code, to use form)

#### Text field

- add model attribute with new object

```java
theModel.addAttribute("student", new Student());
```

- data binding

```html
<form:form action="processForm" modelAttribute="student">
  First name: <form:input path="firstName"/>
```

for the `path="firstName"`, when form is loaded, SpringMVC will call `student.getFirstName()`

when submitted, SpringMVC will call `student.setFirstName()`

**As a result, you SHOULD define `get()` and `set()` for object Student**

Then, just like `@RequestParam("studentName")`, we can bind object by

```java
public String func(@ModelAttribute("student") Student theStudent) {
  // the student will have all form info
}
```

#### Drop down list

```html
<form:select path="country">
  <form:option value="China" label="China"/>
  ...
</form:select>
```

Or you can put options in a list

```html
<form:select path="country">
  <form:option items="${student.countryOptions}"/>
</form:select>
```

**Use the property**

```html
<util:properties id="countryOptions" location="classpath:../countries.properties"/>
```

```java
@Value("#{countryOptions}")
private Map<String, String> countryOptions;
```

`${}` can do only a get, while the `#{}` can do a get and a set of the value

#### Radio Buttons

```html
Java <form:radiobutton path="favoriteLanguage" value="Java"/>
```

Of course, you can also show all those radio button with a list, just like the drop down list above

#### Check box

```html
<form:checkbox path="operatingSystems" value="Mac OS"/>
```

### Form Validation

- Use Bean Validation API

- Annotations

```java
// backend, in the model class
@NotNull(message="is required")
@Min
@Max
@Size(min=1, message="is reqired")
@Pattern // expression
@Future // date
@Past

@Valid // apply validation
```

#### Hibernate Validator

- add validation JAR file to project

```html
<form:errors path="LastName" cssClass="error">
```

```java
public String func(@Valid @ModelAttribute("student") Student theStudent, BindingResult theBindingResult) { // the binding has to be right behind the model attribute
  // auto binding the error
  if (theBindingResult.hasResult()) {
    return "customer-form";
  } else {
    return "customer-confirmation";
  }
}
```

##### @InitBinder

It will pre-process all request to the controller

*Just like the middleware in node.js*

```java
@InitBinder
public void initBinder(WebDataBinder dataBinder) {
  StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
  dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
  // remove all leading and ening space
}
```

##### Validate number range

```java
@Min(value=0, message="must greater than 0")
@Max(value=100, message="must less than 100")
```

##### Regular expression

```java
@Pattern(regexp="your re codes", message="error!")
```

##### Integer field

change `int` to `Integer` for the definition of model

##### Customize error message

1. add messages.properties file 

   `typeMismatch.customer.freePasses=Invalid number`

1. load in the xml file

#### Custom validation

**create custom Java Annotation **

```java
@CourseCode(value="LUV", message="must start with LUV")
private String courseCode;
```

```java
@Constraint(validatedBy = CourseCodeConstrainValidator.class)
// helper class with rules
@Target({ElementType.METHOD, ElementType.FIELD})
// choose apply to method or field
@Retention(RetentionPolicy.RUNTIME)
// retain this annotation at runtime
public @interface CourseCode {
  //   @ just means it is an annotation
  public String value() default "LUV";
  public String message() default "must start with LUV";
  public Class<?>[] groups() default {};
  public Class<? extends Payload>[] payload() default {};
}
```

```java
public class CourseCodeConstrainValidator
  implements ConstrainValidator<CourseCode, String> {
  //         interface from java ee
  	private String coursePrefix;
  	@Override
  	public void initialize(CourseCode theCourseCode){
		coursePrefix = theCourseCode.value(); // just as you defined
  }
  	@Override
  	public boolean isValid(String theCode, ConstrainValidatorContext 
                          theConstrainValidatorContext) {
      // 									additional error messages
      //     SpringMVC will call isValid()
      boolean result;
      if (theCode != null) {
        result = theCode.startsWith(coursePrefix);
      } else {
        result = true;
      }
      return result;
    }
}
```

