#### 1 Using static factory method

#### 2 Consider a builder when faced with many constructor parameters

```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8).calories(100).sodium(35).carbohydrate(27).build();
```

#### 3 Enforce the singleton property with a private constructor or an enum type

```java
public class Elvis {
  private static final Elvis INSTANCE = new Elvis(); 
  private Elvis() { ... }
  public static Elvis getInstance() { return INSTANCE; }
  public void leaveTheBuilding() { ... } 
}
```

#### 4 Enforce noninstantiability with a private constructor

- prevents the class from being subclassed.
- you’ll want to write a class that is just a grouping of static methods and static fields.

#### 5 Prefer dependency injection to hardwiring resources

- do not use a singleton or static utility class to implement a class that depends on one or more underlying resources whose behavior affects that of the class
- do not have the class create these resources directly.

#### 6 Avoid creating unnecessary objects

#### 7 Eliminate obsolete object references

```java
public Object pop() { 
  if (size == 0)
    throw new EmptyStackException();
  return elements[--size];
}
```

- Another common source of memory leaks is caches.
- A third common source of memory leaks is listeners and other callbacks.

#### 8 Avoid finalizers and cleaners

#### 9 Prefer try-with-resources to try-finally

```java
try (InputStream in = new FileInputStream(src);
     OutputStream out = new FileOutputStream(dst)) { 
  byte[] buf = new byte[BUFFER_SIZE];
  int n;
  while ((n = in.read(buf)) >= 0)
    out.write(buf, 0, n);
}
```

#### 10 Obey the general contract when overriding equals

- It is when a class has a notion of *logical equality* that differs from mere object identity and a superclass has not already overridden equals. 
- Use the **==** operator to check if the argument is a reference to this object.
- Use the instanceof operator to check if the argument has the correct type.
- Cast the argument to the correct type.
- For each “significant” field in the class, check if that field of the argument matches the corresponding field of this object.
    - For primitive fields whose type is not float or double, use the == operator for comparisons; for object reference fields, call the equals method recursively; for float fields, use the static Float.compare(float, float) method; and for double fields, use Double.compare(double, double).

```java
@Override
public boolean equals(Object o) {
  if (o == this)
    return true;
  if (!(o instanceof PhoneNumber))
    return false;
  PhoneNumber pn = (PhoneNumber)o;
  return pn.lineNum == lineNum && pn.prefix == prefix && pn.areaCode == areaCode;
}
```

#### 11 Always override hashCode when you override equals

- If the field is of a primitive type, compute `Type.hashCode(f)`, where Type is the boxed primitive class corresponding to f’ s type.
- If the field is an object reference and this class’s equals method compares the field by recursively invoking equals, recursively invoke hashCode on the field. If a more complex comparison is required, compute a “canonical representation” for this field and invoke hashCode on the canonical representation. If the value of the field is null, use 0 (or some other constant, but 0 is traditional).
- If the field is an array, treat it as if each significant element were a separate field. That is, compute a hash code for each significant element by applying these rules recursively, and combine the values per step 2.b. If the array has no significant elements, use a constant, preferably not 0. If all elements are significant, use Arrays.hashCode.

```java
@Override public int hashCode() {
  int result = Short.hashCode(areaCode);
  result = 31 * result + Short.hashCode(prefix);
  result = 31 * result + Short.hashCode(lineNum);
  return result;
}
```

#### 12 Always override toString

#### 13 Override clone judiciously

```java
@Override public HashTable clone() {
  try {
    HashTable result = (HashTable) super.clone();
    result.buckets = buckets.clone();
    return result;
  } catch (CloneNotSupportedException e) {
    throw new AssertionError();
}
}
```

```java
// Copy constructor
public Yum(Yum yum) { ... };
// Copy factory
public static Yum newInstance(Yum yum) { ... };
```

#### 14 Consider implementing Comparable

```java
// Multiple-field Comparable with primitive fields
public int compareTo(PhoneNumber pn) {
  int result = Short.compare(areaCode, pn.areaCode);
  if (result == 0) {
    result = Short.compare(prefix, pn.prefix);
    if (result == 0)
      result = Short.compare(lineNum, pn.lineNum);
  }
  return result;
}
```

```java
// Comparable with comparator construction methods
private static final Comparator<PhoneNumber> COMPARATOR = comparingInt((PhoneNumber pn) -> pn.areaCode)
.thenComparingInt(pn -> pn.prefix).thenComparingInt(pn -> pn.lineNum);
public int compareTo(PhoneNumber pn) { 
  return COMPARATOR.compare(this, pn);
}

```

#### 15 Minimize the accessibility of classes and members

- **private**—The member is accessible only from the top-level class where it is declared.
- **package-private**—The member is accessible from any class in the package where it is declared. Technically known as *default* access, this is the access level you get if no access modifier is specified (except for interface members, which are public by default).
- **protected**—The member is accessible from subclasses of the class where it is declared (subject to a few restrictions [JLS, 6.6.2]) and from any class in the package where it is declared.
- **public**—The member is accessible from anywhere.

#### 16 In public classes, use accessor methods, not public fields

#### 17 Minimize mutability

- Don’t provide methods that modify the object’s state.
- Ensure that the class can’t be extended
- Make all fields final
- Make all fields private.
- Ensure exclusive access to any mutable components.

#### 18 Favor composition over inheritance

- a class *B* should extend a class *A* only if an “is-a” relationship exists between the two classes. 
- If the answer is no, it is often the case that *B* should contain a private instance of *A* and expose a different API: *A* is not an essential part of *B*, merely a detail of its implementation.

#### 19 Design and document for inheritance or else prohibit it

- Constructors must not invoke overridable methods
- When call the father's method, if this method will call another overrided method, it has already been overrided .

#### 20 Prefer interfaces to abstract classes

- Existing classes can easily be retrofitted to implement a new interface.
- Interfaces are ideal for defining mixins.
- Interfaces allow for the construction of nonhierarchical type frameworks.
- Interfaces enable safe, powerful functionality enhancements via the wrapper class idiom
- The interface defines the type, perhaps providing some default methods, while the skeletal implementation class implements the remaining non-primitive interface methods atop the primitive interface methods. Extending a skeletal implementa- tion takes most of the work out of implementing an interface. 

#### 21 Design interfaces for posterity

#### 22: Use interfaces only to define types

- The constant interface pattern is a poor use of interfaces
- If the constants are strongly tied to an existing class or interface, you should add them to the class or interface.

#### 23 Prefer class hierarchies to tagged classes

#### 24 Favor static member classes over nonstatic

* If you declare a member class that does not require access to an enclosing instance, always put the static modifier in its declaration
* If a nested class needs to be visible outside of a single method or is too long to fit comfortably inside a method, use a member class.
* If each instance of a member class needs a reference to its enclosing instance, make it nonstatic; otherwise, make it static.
* Assuming the class belongs inside a method, if you need to create instances from only one location and there is a preexisting type that characterizes the class, make it an anonymous class; otherwise, make it a local class.

#### 25 Limit source files to a singletop-level class

* Never put multiple top-level classes or interfaces in a single source file. 
* Following this rule guarantees that you can’t have multiple definitions for a single class at compile time. 

#### 26 Don’t use raw types

* The compiler inserts invisible casts for you when retrieving elements from collections and guarantees that they won’t fail
* you lose type safety if you use a raw type such as List, but not if you use a parameterized type such as `List<Object>`  or `List<?>`

#### 27 Eliminate unchecked warnings

#### 28 Prefer lists to arrays with generic

* Either way you can’t put a String into a Long container, but with an array you find out that you’ve made a mistake at runtime; with a list, you find out at compile time. 

```java
// Fails at runtime!
Object[] objectArray = new Long[1];
objectArray[0] = "I don't fit in"; // Throws ArrayStoreException
```

```java
// Won't compile!
List<Object> ol = new ArrayList<Long>(); // Incompatible types ol.add("I don't fit in");
```

#### 29 Favor generic types

* When you design new types, make sure that they can be used without such casts. 
* This will often mean making the types generic. If you have any existing types that should be generic but aren’t, generify them. This will make life easier for new users of these types without breaking existing clients 

#### 30 Favor generic methods

```java
public static <E> Set<E> union(Set<E> s1, Set<E> s2) {
Set<E> result = new HashSet<>(s1); result.addAll(s2);
return result;
}
```

#### 31 Use bounded wildcards to increase API flexibility

* For maximum flexibility, use wildcard types on input parameters that represent producers or consumers. 

```java
// Wildcard type for a parameter that serves as an E producer
public void pushAll(Iterable<? extends E> src) {
       for (E e : src)
           push(e);
}
```

```java
// Wildcard type for parameter that serves as an E consumer
public void popAll(Collection<? super E> dst) {
       while (!isEmpty())
           dst.add(pop());
}
```

* If an input parameter is both a producer and a consumer, then wildcard types will do you no good: you

    need an exact type match, which is what you get without any wildcards.

* producer-extends, consumer-super
* if a type parameter appears only once in a method declaration, replace it with a wildcard.
* If it’s an unbounded type parameter, replace it with an unbounded wildcard; if it’s a bounded type parameter, replace it with a bounded wildcard.

#### 32 Combine generics and varargs judiciously

* It is unsafe to store a value in a generic varargs array parameter.
* The `SafeVarargs` annotation constitutes a promise by the author of a method that it is typesafe
* it is unsafe to give another method access to a generic varargs parameter array
* a generic varargs methods is safe if:  it doesn’t store anything in the varargs parameter array, and it doesn’t make the array (or a clone) visible to untrusted code.

33 Consider type safe heterogeneous containers

