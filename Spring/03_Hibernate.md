### Hibernate

**A framework for saving Java objects in database**

Provides the Object-to-Relational Mapping (**ORM**)

You need tell hibernate how your **class** related with data in **database**

Your	-—>			 	—->	

Java	   	Hibernate	   	Database

App	 <—-				 <--

```java
Student theStudent = new Student("Jialun", "Lyu", "sample@gmail.com")
int theId = (Integer) session.save(theStudent) // save
Student myStudent = session.get(Student.class, theId) // retrieve
Query query = session.createQuery("from Student"); // query
// 													hibernate query language
List<Student> students = query.list(); // convert to list
```

##### Hibernate vs JDBC

- hibernate is using JDBC API to communicate with database

##### Config hibernate

You can set username, password in the java code, or just in xml file

##### Entity Class

A java class that mapped to database

option for mapping:

- XML config file
- Java Annotations (modern)

#### Map a class to database

```java
@Entity
@Table(name="student")
public class Student {
  @Id // primary key
  @Column(name="id")
  private int id;
  
  @Column(name="first_name")
  private String firstName;
}
```

You can use *RightClick -> Sourse -> Generate \** to generate methods automatically

##### SessionFactory class

Read hibernate config file, create session class, only created once in app

##### Session class

Used to save/retrieve objects with JDBC connection

Retrieved from SessionFactory

```java
SessionFactory factory = new   Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Student.class).buildSessionFactory();

Session session = factory.getCurrentSession();

try {
  // use session to do something
  // CREATE
  Student tempStudent = new Student("Jialun", "Lyu", "sample@gmail.com");
  session.beginTransaction(); // start
  session.save(tempStudent); // save object
  
  // READ
  Student myStudent = session.get(Student.class, aPrimaryKeyValue);
  
  		// query: HQL 													just put your sql here
  List<Student> theStudents=session.createQuery("from Student").getResultList();
  List<Student> theStudents=session.createQuery("from Student s where s.lastName='Lyu'").getResultList();
  
  // UPDATE
  myStudent.setFirstName("Jay");
  session.createQuery("update Student set email='foo@gmail.com'");
  
  
  // DELETE
  session.delete(mySudent);
  session.createQuery("delete from Student where id=2").executeUpdate();
    
  session.getTransaction().commit(); // commit, save all changes
} finally {
  factory.close()
}
```

#### Advanced Mapping

- one-to-one
- one-to-many, many-to-one
- many-to-many

##### Primary key

- unique identifier for a row in a table

```java
@Id
@GeneratedValue(strategy=GenerationType.IDENTIFY) // AUTO_INCREMENT
```

##### Foreign key

- to link tables together

- a field in one table that refers to primary key in another table

##### Cascade

- when you operate on one table, it will also affect related other tables
- The relation defined by PK and FK. 
- developer should control this function

##### Uni-Directional vs Bi-Directional

*A -> B*  vs  *A <-> B*

#### One-To-One

- create two class(table)
- add FK

```java
// in the Instructor class
@OneToOne(cascade=CascadeType.ALL) // by default, no cascade
@JoinColumn(name="instructor_detail_id")
private InstructorDetail instructorDetail;
//                            |
// if you want to connect detail back to instructor, which means it becomes Bi-Directional                   |
// in the detail class        |
@OneToOne(mappedBy="instructorDetail", cascade=CascadeType.ALL)
//        this tell hbnt to go back to class Instructor and use info in @JoinColumn to relate instructor and detail
private Instructor instructor;
```

there will be `getInstructor()`, `setInstructor()` in the detail class

so, in default, not only when you operate data in instructor will affect detail, vice versa.

##### Entity lifecycle

- Detach: entity detached means it is not associated with session
- Merge: reattach an instance to session
- Persist: transitions new instances to manage state
- Remove: transitions managed entity to be removed
- Refresh: reload/synch object with data from db

##### Cascade Types

- persist: one saved, related one saved
- remove: one deleted, related one deleted
- refresh: one refresh, related one refresh
- merge:
- all:

#### One-To-Many / Many-To-One Bi-Directional

most of the time, the deletion of each table should not affect each other

```java
// in the Course class
@ManyToOne
@JoinColumn(name="instructor_id")
private Instructor instructor
```

##### Add method

when you want add a new course, you should connect this course to some instructor manually with `tempCourse.setInstructor(this)` (this is in Instructor class)

so when you add a new course, you use a instructor object to add course

#### Eager vs Lazy loading

**Eager: every thing**

load one instructor and its **all courses**

**Lazy: on request** (preferred)

```java
public class Instructor {
  @OneToMany(fetch=FetchType.LAZY, mappedBy="instructor")
  private List<Course> courses;
}
```

- there are default fetch type

- if you close the session before you load the lazy data, spring will cause error
- To avoid above issue, you have 2 options:
- 1. call getter method when session is open
  1. Query with HQL

#### One-To-Many / Many-To-One Uni-Directional

course -—> reviews

delete a course, review should be deleted

#### Many-To-Many

courses <- course_student —> students

we need a join table

##### Join table

provides a mapping between two tables, it has foreign keys for each table to define the mapping relationship

so you should create a new course_student table just like before

you should add 2 FK in that table

```mysql
CONSTRAINT `FK_COURSE_05`
FOREIGN KEY (`course_id`)
REFERENCES `course` (`id`),

CONSTRAINT `FK_STUDENT`
FOREIGN KEY (`student_id`)
REFERENCES `student` (`id`),
```

```java
public class Course {
  @ManyToMany
  @JoinTable(
    name="course_student",
    joinColumns=@JoinColumn(name="course_id"), // here, this side
    inverseJoinColumns=@JoinColmn(name="student_id") // there, other side
  )
  private List<Student> students;
}
```

you should do the same thing in the student side

do not add the delete cascade

