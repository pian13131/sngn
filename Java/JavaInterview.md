#### Differences between C++ and Java

|                                         | C++                                                          | Java                                                         |
| --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Mainly used for**                     | C++ is mainly used for system programming.                   | Java is mainly used for application programming.             |
| **Goto**                                | C++ supports the [goto](https://www.javatpoint.com/cpp-goto-statement) statement. | Java doesn't support the goto statement.                     |
| **Multiple inheritance**                | C++ supports multiple inheritance.                           | Java doesn't support multiple inheritance through class. It can be achieved by [interfaces in java](https://www.javatpoint.com/interface-in-java). |
| **Operator Overloading**                | C++ supports [operator overloading](https://www.javatpoint.com/cpp-overloading). | Java doesn't support operator overloading.                   |
| **Pointers**                            | C++ supports [pointers](https://www.javatpoint.com/cpp-pointers). You can write pointer program in C++. | Java supports pointer internally. However, you can't write the pointer program in java. It means java has restricted pointer support in java. |
| **Compiler and Interpreter**            | C++ uses compiler only. C++ is compiled and run using the compiler which converts source code into machine code so, C++ is platform dependent. | Java uses compiler and interpreter both. Java source code is converted into bytecode at compilation time. The interpreter executes this bytecode at runtime and produces output. Java is interpreted that is why it is platform independent. |
| **Call by Value and Call by reference** | C++ supports both call by value and call by reference.       | Java supports call by value only. There is no call by reference in java. |
| **Structure and Union**                 | C++ supports structures and unions.                          | Java doesn't support structures and unions.                  |
| **Thread Support**                      | C++ doesn't have built-in support for threads.               | Java has built-in [thread](https://www.javatpoint.com/multithreading-in-java) support. |
| **Virtual Keyword**                     | C++ supports virtual keyword so that we can decide whether or not override a function. | Java has no virtual keyword. We can override all non-static methods by default. In other words, non-static methods are virtual by default. |
| **Inheritance Tree**                    | C++ creates a new inheritance tree always.                   | Java uses a single inheritance tree always because all classes are the child of Object class in java. The object class is the root of the [inheritance](https://www.javatpoint.com/inheritance-in-java) tree in java. |
| **Hardware**                            | C++ is nearer to hardware.                                   | Java is not so interactive with hardware.                    |
| **Object-oriented**                     | C++ is an object-oriented language. However, in C language, single root hierarchy is not possible. | Java is also an [object-oriented](https://www.javatpoint.com/java-oops-concepts) language. However, everything (except fundamental types) is an object in Java. It is a single root hierarchy as everything gets derived from java.lang.Object. |

#### features of Java

- **Object-Oriented:** Java follows the object-oriented paradigm which allows us to maintain our code as the combination of different type of objects that incorporates both data and behavior.
- **Portable:** Java supports read-once-write-anywhere approach. We can execute the Java program on every machine. Java program (.java) is converted to bytecode (.class) which can be easily run on every machine.
- **Platform Independent:** Java is a platform independent programming language. It is different from other programming languages like C and C++ which needs a platform to be executed. Java comes with its platform on which its code is executed. Java doesn't depend upon the operating system to be executed. 
- **Secured:** Java is secured because it doesn't use explicit pointers. Java also provides the concept of ByteCode and Exception handling which makes it more secured.
- **Robust:** Java is a strong programming language as it uses strong memory management. The concepts like Automatic garbage collection, Exception handling, etc. make it more robust. 
- **Architecture Neutral:** Java is architectural neutral as it is not dependent on the architecture. In C, the size of data types may vary according to the architecture (32 bit or 64 bit) which doesn't exist in Java.
- **Interpreted:** Java uses the Just-in-time (JIT) interpreter along with the compiler for the program execution.
- **High Performance:** Java is faster than other traditional interpreted programming languages because Java bytecode is "close" to native code. It is still a little bit slower than a compiled language (e.g., C++).
- **Multithreaded:** We can write Java programs that deal with many tasks at once by defining multiple threads. The main advantage of multi-threading is that it doesn't occupy memory for each thread. It shares a common memory area. Threads are important for multi-media, Web applications, etc.
- **Distributed:** Java is distributed because it facilitates users to create distributed applications in Java. RMI and EJB are used for creating distributed applications. This feature of Java makes us able to access files by calling the methods from any machine on the internet.
- **Dynamic:** Java is a dynamic language. It supports dynamic loading of classes. It means classes are loaded on demand. It also supports functions from its native languages, i.e., C and C++.

#### JVM

Java Virtual Machine is a virtual machine that enables the computer to run the Java program. JVM acts like a run-time engine which calls the main method present in the Java code. The Java code is compiled by JVM to be a Bytecode which is machine independent and close to the native code.

#### JRE

JRE stands for Java Runtime Environment. It is the implementation of JVM. The Java Runtime Environment is a set of software tools which are used for developing Java applications.

#### JDK

JDK is an acronym for Java Development Kit. It is a software development environment which is used to develop Java applications.It contains JRE + development tools. 

#### JIT

**Just-In-Time(JIT) compiler:** It is used to improve the performance. JIT compiles parts of the bytecode that have similar functionality at the same time, and hence reduces the amount of time needed for compilation. Here the term “compiler” refers to a translator from the instruction set of a Java virtual machine (JVM) to the instruction set of a specific CPU.

#### Types of memory areas are allocated by JVM?

- **Class(Method) Area:** Class Area stores per-class structures such as the runtime constant pool, field, method data, and the code for methods.

- **Heap:** It is the runtime data area in which the memory is allocated to the objects

- **Stack:** Java Stack stores frames. It holds local variables and partial results, and plays a part in method invocation and return. Each thread has a private JVM stack, created at the same time as the thread. A new frame is created each time a method is invoked. A frame is destroyed when its method invocation completes.

- **Program Counter Register:** PC (program counter) register contains the address of the Java virtual machine instruction currently being executed.

- **Native Method Stack:** It contains all the native methods used in the application.

#### What is the platform

A platform is the hardware or software environment in which a piece of software is executed. There are two types of platforms, software-based and hardware-based. Java provides the software-based platform.

#### What gives Java its 'write once and run anywhere' nature? 

The bytecode. Java compiler converts the Java programs into the class file (Byte Code) which is the intermediate language between source code and machine code. This bytecode is not platform specific and can be executed on any computer.

#### What is classloader?

Classloader is a subsystem of JVM which is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java.

### Access specifiers in Java?

In Java, access specifiers are the keywords which are used to define the access scope of the method, class, or a variable.

- **Public** The classes, methods, or variables which are defined as public, can be accessed by any class or method.
- **Protected** Protected can be accessed by the class of the same package, or by the sub-class of this class, or within the same class.
- **Default** Default are accessible within the package only. By default, all the classes, methods, and variables are of default scope.
- **Private** The private class, methods, or variables defined as private can be accessed within the class only.

#### What is the purpose of static methods and variables?

The methods or variables defined as static are shared among all the objects of the class. The static is the part of the class and not of the object. The static variables are stored in the class area, and we do not need to create the object to access such variables. Therefore, static is used in the case, where we need to define variables or methods which are common to all the objects of the class.

#### object-oriented paradigm

Objects having data and methods defined in the class to which it belongs.

Encapsulation, inheritance, and polymorphism

#### types of constructors are used in Java

- **Default Constructor:** default constructor is the one which does not accept any value.
- **Parameterized Constructor:** The parameterized constructor is the one which can initialize the instance variables with the given values.

#### difference between static (class) method and instance method

| static or class method                                       | instance method                                              |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| A method that is declared as static is known as the static method. | A method that is not declared as static is known as the instance method. |
| We don't need to create the objects to call the static methods. | The object is required to call the instance methods.         |
| Non-static (instance) members cannot be accessed in the static context (static method, static block, and static nested class) directly. | Static and non-static variables both can be accessed in instance methods. |
| For example: `public static int cube(int n){ return n*n*n;}` | For example: `public void msg(){...}`.                       |

#### Uses of `this` keyword

- **this** can be used to refer to the current class instance variable.
- **this** can be used to invoke current class method (implicitly)
- **this()** can be used to invoke the current class constructor.
- **this** can be passed as an argument in the method call.
- **this** can be passed as an argument in the constructor call.
- **this** can be used to return the current class instance from the method.

#### Why is Inheritance used in Java

- Inheritance provides code reusability.
- Runtime polymorphism cannot be achieved without using inheritance.
- We can simulate the inheritance of classes with the real-time objects which makes OOPs more realistic.
- Inheritance provides data hiding.
- Method overriding cannot be achieved without inheritance. By method overriding, we can give a specific implementation of some basic method contained by the base class.

#### What is aggregation

Aggregate class contains a reference to the class it owns. 

### What is composition

Composition is the particular case of aggregation which represents a stronger relationship between two objects. When an object contains the other object, if the contained object cannot exist without the existence of container object

#### What is super in java

The **super** keyword in Java is a reference variable that is used to refer to the immediate parent class object. Whenever you create the instance of the subclass, an instance of the parent class is created implicitly which is referred by super reference variable.

####  What is method overloading

Method overloading is the polymorphism technique which allows us to create multiple methods with the same name but different signature. We can achieve method overloading in two ways. method overloading is not possible by changing the return type of the program due to avoid the ambiguity.

- Changing the number of arguments
- Changing the return type

#### What is method overloading with type promotion

By Type promotion is method overloading, we mean that one data type can be promoted to another implicitly if no exact matching is found.

#### What is method overriding

If a subclass provides a specific implementation of a method that is already provided by its parent class, it is known as Method Overriding. It is used for runtime polymorphism and to implement the interface methods.

- The method must have the same name as in the parent class.
- The method must have the same signature as in the parent class.
- Two classes must have an IS-A relationship between them.

#### What is covariant return type

it is possible to override any method by changing the return type if the return type of the subclass overriding method is subclass type. It is known as covariant return type. The covariant return type specifies that the return type may vary in the same direction as the subclass.

#### What is the final

- the final variable is used to restrict the user from updating it. 

- If we change any method to a final method, we can't override it. 

- If we make any class final, we can't inherit it into any of the subclasses.

- A final variable, not initialized at the time of declaration, is known as the final blank variable. We can't initialize the final blank variable directly. Instead, we have to initialize it by using the class constructor. It can only be initialized once

#### What is Java instanceOf operato

The instanceof in Java is also known as type comparison operator because it compares the instance with type. 

#### What is the abstract class

A class that is declared as abstract is known as an abstract class. It needs to be extended and its method implemented. It cannot be instantiated.

#### What is the interface

The interface is a blueprint for a class that has static constants and abstract methods. It can be used to achieve full abstraction and multiple inheritance. It is a mechanism to achieve abstraction. There can be only abstract methods in the Java interface, not method body.

#### What is the package

A package is a group of similar type of classes, interfaces, and sub-packages. It provides access protection and removes naming collision. The packages in Java can be categorized into two forms, inbuilt package, and user-defined package. 

#### How many types of exception can occur in a Java program

- **Checked Exception:** Checked exceptions are the one which are checked at compile-time. For example, SQLException, ClassNotFoundException, etc.
- **Unchecked Exception:** Unchecked exceptions are the one which are handled at runtime because they can not be checked at compile-time. For example, ArithmaticException, NullPointerException, ArrayIndexOutOfBoundsException, etc.
- **Error:** Error cause the program to exit since they are not recoverable. For Example, OutOfMemoryError, AssertionError, etc.

#### What is exception propagation

An exception is first thrown from the top of the stack and if it is not caught, it drops down the call stack to the previous method, If not caught there, the exception again drops down to the previous method, and so on until they are caught or until they reach the very bottom of the call stack.

#### What is String Pool

String pool is the space reserved in the heap memory that can be used to store the strings. The main advantage of using the String pool is whenever we create a string literal; the JVM checks the "string constant pool" first. If the string already exists in the pool, a reference to the pooled instance is returned. If the string doesn't exist in the pool, a new string instance is created and placed in the pool.

#### == and equals()

- Main difference between .equals() method and == operator is that one is method and other is operator. 

- We can use == operators for reference comparison (**address comparison**) and .equals() method for **content comparison**. In simple words, == checks if both objects point to the same memory location whereas .equals() evaluates to the comparison of values in the objects.

- If a class does not [override the equals method](https://www.geeksforgeeks.org/overriding-equals-method-in-java/), then by default it uses equals(Object o) method of the closest parent class that has overridden this method. 

#### String literal and String pool

- When we create a *String* variable and assign a value to it, the JVM searches the pool for a *String* of equal value.**If found, the Java compiler will simply return a reference to its memory address, without allocating additional memory.**If not found, it’ll be added to the pool (interned) and its reference will be returned.
- When we create a *String* via the *new* operator, the Java compiler will create a new object and store it in the heap space reserved for the JVM.Every *String* created like this will point to a different memory region with its own address.

#### What are the differences between String and StringBuffer

| String | StringBuffer                                                 |
| :----- | :----------------------------------------------------------- |
| The String class is immutable.                               | The StringBuffer class is mutable.                           |
| The String is slow and consumes more memory when you concat too many strings because every time it creates a new instance. | The StringBuffer is fast and consumes less memory when you cancat strings. |
| The String class overrides the equals() method of Object class. So you can compare the contents of two strings by equals() method. | The StringBuffer class doesn't override the equals() method of Object class. |

#### What are the differences between StringBuffer and StringBuilder

| StringBuffer                                                 | StringBuilder                                                |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| StringBuffer is *synchronized*, i.e., thread safe. It means two threads can't call the methods of StringBuffer simultaneously. | StringBuilder is *non-synchronized*,i.e., not thread safe. It means two threads can call the methods of StringBuilder simultaneously. |
| StringBuffer is *less efficient* than StringBuilder.         | StringBuilder is *more efficient* than StringBuffer.         |

#### What is the purpose of `toString()` method in Java

The `toString()` method returns the string representation of an object. If you print any object, java compiler internally invokes the `toString()` method on the object. 

#### What are the advantages of Java inner classes

- Nested classes represent a special type of relationship that is it can **access all the members** (data members and methods) of the outer class including private.
- Nested classes are used to develop a more **readable and maintainable** code because it logically groups classes and interfaces in one place only.
- **Code Optimization:** It requires less code to write.

| Type                  | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| Member Inner Class    | A class created within class and outside method.             |
| Anonymous Inner Class | A class created for implementing an interface or extending class. Its name is decided by the java compiler. |
| Local Inner Class     | A class created within the method.                           |

#### What is Garbage Collection

Garbage collection is a process of **reclaiming the unused runtime objects**. It is performed for memory management. In other words, we can say that It is the process of removing unused objects from the memory to free up space and make this space available for Java Virtual Machine. 

Garbage collection is managed by JVM. It is performed when there is **not enough space in the memory** and **memory is running low**. 

`System.gc(); `

#### How can an object be unreferenced

- By nulling the reference
- By assigning a reference to another
- By anonymous object.

#### What is the purpose of the finalize() method

The finalize() method is invoked just before the object is garbage collected. It is used to perform cleanup processing. 

| final                                                        | finally                                                      | finalize                                                     |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Final is used to apply restrictions on class, method, and variable. | Finally is used to place important code, it will be executed whether an exception is handled or not. | Finalize is used to perform clean up processing just before an object is garbage collected. |
| Final is a keyword.                                          | Finally is a block.                                          | Finalize is a method.                                        |

#### What do you understand by an IO stream

The stream is a sequence of **data** that **flows from source to destination**. It is composed of bytes. In Java, three streams are created for us automatically.

- System.out: standard output stream
- System.in: standard input stream
- System.err: standard error stream

#### What is the difference between the Reader/Writer class hierarchy and the InputStream/OutputStream class hierarchy

The Reader/Writer class hierarchy is character-oriented, and the InputStream/OutputStream class hierarchy is byte-oriented. The ByteStream classes are used to perform input-output of 8-bit bytes whereas the CharacterStream classes are used to perform the input/output for the 16-bit Unicode system. 

#### What is serialization

Serialization in Java is a mechanism of **writing the state of an object into a byte stream**.

To make a class serializable in Java by implementing the Serializable interface.

#### What is Deserialization

Deserialization is the process of **reconstructing the object from the serialized state**. It is the reverse operation of serialization. 

#### What is the `transient` keyword

If you define any data member as transient, it will not be serialized. By determining transient keyword, the value of variable need not persist when it is restored.

#### What is `Externalizable`

The `Externalizable` interface is used to write the state of an object into a byte stream in a compressed format. 

#### What is Marker interface

It is an **empty** interface (no field or methods). Examples of marker interface are Serializable, Clonnable and Remote interface.

**Marker interface** is used as a tag to inform a message to the **Java** compiler so that it can add special behaviour to the class implementing it. 

#### Give a brief description of Java socket programming

Java Socket programming is used for **communication** between the applications running on **different JRE**. 

#### What is the reflection

Reflection is the process of **examining or modifying** the runtime behavior of a class at **runtime**. 

#### What is the purpose of using java.lang.Class class

- Provides methods to get the metadata of a class at runtime.
- Provides methods to examine and change the runtime behavior of a class.

#### What are wrapper classes

Wrapper classes are classes that allow primitive types to be accessed as objects.

| Primitive Type | Wrapper class |
| :------------- | :------------ |
| boolean        | Boolean       |
| char           | Character     |
| byte           | Byte          |
| short          | Short         |
| int            | Integer       |
| long           | Long          |
| float          | Float         |
| double         | Double        |

#### What are autoboxing and unboxing

The autoboxing is the process of converting primitive data type to the corresponding wrapper class object

The unboxing is the process of converting wrapper class object to primitive data type.

#### What is object cloning

The object cloning is a way to create an exact copy of an object. The clone() method of the Object class is used to clone an object. The java.lang.Cloneable interface must be implemented by the class whose object clone we want to create.

#### What is a native method

A native method is a method that is implemented in a language other than Java. Natives methods are sometimes also referred to as foreign methods

#### What is the purpose of the System class

- Standard input
- Error output streams
- Standard output
- utility method to copy the portion of an array
- utilities to load files and libraries

#### What is multithreading

- Threads share the same address space.
- The thread is lightweight.
- The cost of communication between the processes is low.

#### Differentiate between process and thread

- A Program in the execution is called the process whereas; A thread is a **subset** of the process
- Processes are independent whereas threads are the subset of process.
- Process have different address space in memory, while threads contain a shared address space.
- Context switching can be faster between the threads as compared to context switching between the threads.
- Inter-process communication is slower and expensive than inter-thread communication.
- Any change in Parent process doesn't affect the child process whereas changes in parent thread can affect the child thread.

#### What is the purpose of `wait()` method in Java

The wait() method is provided by the Object class in Java. This method is used for inter-thread communication in Java. The `java.lang.Object.wait()` is used to pause the current thread, and wait until another thread does not call the `notify()` or `notifyAll()` method. Its syntax is given below.

#### What are the advantages of multithreading

- Multithreading allows an application/program to be always **reactive for input**, even already running with some background tasks
- Multithreading allows the **faster** execution of tasks, as threads **execute independently**.
- Multithreading provides better **utilization of cache** memory as threads share the common memory resources.
- Multithreading reduces the number of the required server as one server can execute multiple threads at a time.

#### What are the states in the lifecycle of a Thread

- **New:** In this state, a Thread class object is created using a new operator, but the thread is not alive. Thread doesn't start until we call the `start()` method.

- **Runnable:** In this state, the thread is ready to run after calling the `start()` method. However, the thread is not yet selected by the thread scheduler.

- **Running:** In this state, the thread scheduler picks the thread from the ready state, and the thread is running.
- **Waiting/Blocked:** In this state, a thread is not running but still alive, or it is waiting for the other thread to finish.
- **Dead/Terminated:** A thread is in terminated or dead state when the `run()` method exits.

#### What is the difference between preemptive scheduling and time slicing

Under preemptive scheduling, the highest priority task **executes until** it enters the waiting or dead states or a higher priority task comes into existence. 

Under time slicing, a task executes for a predefined slice of time and then reenters the pool of ready tasks. The scheduler then determines which task should execute next, based on priority and other factors.

#### What does `join()` method

The` join()` method waits for a thread to die. In other words, it causes the currently running threads to stop executing until the thread it joins with completes its task. 

#### What about the daemon threads

The daemon threads are the **low priority threads** that provide the background support and services to the user threads. Daemon thread gets automatically terminated by the JVM if the program remains with the daemon thread only, and all other user threads are ended/died. 

####  What are the main differences between array and collection

- Arrays are always of fixed size, but In Collection, size can be changed dynamically as per need.
- Arrays can only store similar type objects, but in Collection, heterogeneous objects can be stored.
- Arrays cannot provide the ?ready-made? methods for user requirements as sorting, searching, etc. but Collection includes readymade methods to use.

#### What is the difference between HashSet and TreeSet

- HashSet maintains no order whereas TreeSet maintains ascending order.
- HashSet impended by hash table whereas TreeSet implemented by a Tree structure.
- HashSet performs faster than TreeSet.
- HashSet is backed by HashMap whereas TreeSet is backed by TreeMap.

#### What is the difference between HashMap and TreeMap

- HashMap maintains no order, but TreeMap maintains ascending order.
- HashMap is implemented by hash table whereas TreeMap is implemented by a Tree structure.
- HashMap can be sorted by Key or value whereas TreeMap can be sorted by Key.
- HashMap may contain a null key with multiple null values whereas TreeMap cannot hold a null key but can have multiple null values.

#### What does the hashCode() method

The hashCode() method returns a hash code value (an integer number).

The hashCode() method returns the same integer number if two keys (by calling equals() method) are identical.

However, it is possible that two hash code numbers can have different or the same keys.

If two objects do not produce an equal result by using the equals() method, then the hashcode() method will provide the different integer result for both the objects.

#### Why we override equals() method

The equals method is used to check whether two objects are the same or not. It needs to be overridden if we want to check the objects based on the property.

For example, Employee is a class that has 3 data members: id, name, and salary. However, we want to check the equality of employee object by the salary. Then, we need to override the equals() method.

#### Override `hashCode()` and `equals()`

```java
public class User {
    private String name;
    private int age;
    private String passport;

	//getters and setters, constructor

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof User)) {
            return false;
        }

        User user = (User) o;

        return user.name.equals(name) &&
                user.age == age &&
                user.passport.equals(passport);
    }

    //Idea from effective Java : Item 9
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        result = 31 * result + age;
        result = 31 * result + passport.hashCode();
        return result;
    }

}
```

