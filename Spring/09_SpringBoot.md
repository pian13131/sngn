#### Why Spring boot?

easy to start a Spring app

resolve dependency conflict

embedded server

auto annotation

auto scan in all packages in your app name folder

if you want to other package, you should add by yourself

#### Spring Initializr

- config at website

- unzip

- import

you should run as Java application

#### Project structure

**mvnw.cmd/mvnw.sh**: maven wrap file

no need to installed Maven

**pom.xml**: dependency

**application.properties**: server.port…custom properties, key=value

**static**: HTML, CSS, JS

**Templates**: FreeMarker, Thymeleaf...

#### Spring Boot Starter

a package dependency for a group of dependency

##### Web

just for SpringMVC

you just select and download the start project

#### Spring Boot Starter Parent

default version config

you can override the version of java version

#### Spring Dev tool

just add it to the pom

*just like nodemon*

restart app when you change the code

#### Spring boot actuator

expose endpoints for metrics

predefined url

**/actuator/health**

**/actuator/info**

**/actuator/beans**

you can set those in the application.properties

you need choose which actuator you want to expose

#### Command Line

```bash
java -jar fileName.jar
```

**OR**

```bash
./mvnw spring-boot:run
```

#### Data Source

the connection to the database

you just need to provide url, username, password in the application property file

##### JPA

Java persistence API

standard API for ORM

one them is Hibernate

`EnrityManager` is the same with Hibernate's `SessionFactory`

We can inject `EnrityManager` in to DAO

then get the session

```java
Session currentSession = entityManager.unwrap(Session.class);
// do the query stuff
```

you can use standard JPA instead of Hibernate itself

##### Spring data JPA

another kind of JPA, just like hibernate

build DAO with template

Spring will create full CRUD methods for you

you just extend `JpaRepository` interface

```java
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
	// no need to implementation class
}
```

then you just inject it into the Service class, then use it as it is the DAO class

#### Spring data REST

just like generate DAO above, it can also generate the REST API for CRUD

it will create endpoints based on entity type by scanning the `JpaRepository`

it is like all two key parts are handled by Spring Data

when it return the json, it may include other meta-info

you do not need controller and service

for whole, there are only 3 java file:

- main
- repository (extends from JpaRepository)
- entity

##### custom the base path

just add in application.properties

##### custom the name

```java
@RepositoryRestResource(path="newName")
// the repository interface
```

##### pagination

default return first 20 pages

```
/students?page=9
```

you can also set it in the application.properties as well

##### Sort

```java
/students?sort=lastName
```

*damn, that is really magical*

#### Thymeleaf

template engine

processed in server

receive the model(java object) from controller

sounds like JSP, but it can be used in Web or no-Web

Email Template, CSV template, PDF template

you just need add it into POM, spring will handle using it

`src/main/resources/templates/email.html`

```html
<html xmlns:th="http://www.thymeleaf.org">
  <p th:text="'Time on the server is' + ${theDate}">
  </p>
</html>
```

