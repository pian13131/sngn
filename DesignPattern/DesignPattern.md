# Design Pattern

### Builder

To create objects made from other objects.

Hide the creation process from client.

### Memento

A way to store previous states of an Object easily

**Memento:** The basic object that is stored in different states

**Originator:** Sets and Gets values from the currently targeted Memento. Creates new Mementos and assigns current values to them

**Caretaker:** Holds an ArrayList that contains all previous versions of the Memento. It can store and retrieve stored Mementos

### Chain-of-responsibility

Pattern sends data to an object and if that object can’t use it, it sends it to any number of other objects that may be able to use it

### Command

The command pattern is a behavioral design pattern in which an object is used to represent and encapsulate all the information needed to call a method at a later time

This information includes the method name, the object that owns the method and values for the method parameters.

Allows you to store lists of code that is executed at a later time or many times.

### Singleton

It is used when you want to eliminate the option of instantiating more than one object

### Strategy

When you want to define a class that will have one behavior that is similar to other behaviors in a list

When you need to use one of several behaviors dynamically

### Facade

When you create a simplified interface that performs many other actions behind the scenes

### Mediator

It is used to handle communication between related objects (Colleagues)

All communication is handled by the Mediator and the Colleagues don’t need to know anything about each other

### State

Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

**Context (Account):** Maintains an instance of a ConcreteState subclass that defines the current state.

**State :** Defines an interface for encapsulating the behavior associated with a particular state of the Context.

**Concrete State :** Each subclass implements a behavior associated with a state of Context

### Visitor

Allows you to add methods to classes of different types without much altering to those classes

You can make completely different methods depending on the class used

Allows you to define external classes that can extend other classes without majorly editing them

### Composite

Allows you to treat individual objects and compositions of objects uniformly

They allow you to represent part-whole hierarchies

Components can be further divided into smaller components

You can structure data, or represent the inner working of every part of a whole object individually

### Factory

factory method is just a method, it can be overridden in a subclass

When a method returns one of several possible classes that share a common super class

### Abstract Factory

abstract factory is an object that has multiple factory methods on it

It is like a factory, but everything is encapsulated

Allows you to create families of related objects without specifying a concrete class

### Prototype

Creating new objects (instances) by cloning (copying) other objects

Allows for adding of any subclass instance of a known super class at run time

When there are numerous potential classes that you want to only use if needed at runtime

Reduces the need for creating subclasses

### Adapter

Allows 2 incompatible interfaces to work together

Used when the client expects a (target) interface

The Adapter class allows the use of the available interface and the the Target interface

Any class can work together as long as the Adapter solves the issue that all classes must implement every method defined by the shared interface

### Bridge

Connect button to different function depends on different objects

Decouple an abstraction from its implementation so that the two can vary independently

Progressively adding functionality while separating out major differences using abstract classes

### Decorator

The Decorator allows you to modify an object dynamically

You would use it when you want the capabilities of inheritance with subclasses, but you need to add functionality at run time

It is more flexible than inheritance

Simplifies code because you add functionality using many simple classes

Rather than rewrite old code you can extend with new code

### Flyweight

Used when you need to create a large number of similar objects

To reduce memory usage you share Objects that are similar in some way rather than creating new ones

### Proxy

Provide a class which will limit access to another class

You may do this for security reasons, because an Object is intensive to create, or is accessed from a remote location

### Interpreter

It is used to convert one representation of data into another

Context contains the information that will be interpreted

Expression is an abstract class that defines all the methods needed to perform the different conversions

Terminal or Concrete Expressions provide specific conversions on different types of data

### Iterator

The Iterator pattern provides you with a uniform way to access different collections of Objects

If you get an Array, ArrayList and Hash table of Objects, you pop out an iterator for each and treat them the same

This provides a uniform way to cycle through different collections

You can also write polymorphic code because you can refer to each collection of objects because they'll implement the same interface

### Observer

When you need many other objects to receive an update when another object changes

Stock market with thousands of stocks needs to send updates to objects representing individual stocks

The Subject (publisher) sends many stocks to the Observers

The Observers (subscribers) takes the ones they want and use them

### Template

Used to create a group of subclasses that have to execute a similar group of methods

You create an abstract class that contains a method called the Template Method

The Template Method contains a series of method calls that every subclass object will call

The subclass objects can override some of the method calls