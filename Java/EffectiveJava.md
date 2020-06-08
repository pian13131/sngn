#### 1 Using static factory method

2 Consider a builder when faced with many constructor parameters

```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8) .calories(100).sodium(35).carbohydrate(27).build();
```

3 Enforce the singleton property with a private constructor or an enum type

```java
public class Elvis {
  private static final Elvis INSTANCE = new Elvis(); 
  private Elvis() { ... }
  public static Elvis getInstance() { return INSTANCE; }
  public void leaveTheBuilding() { ... } 
}
```

4 Enforce noninstantiability with a private constructor

- prevents the class from being subclassed.
- you’ll want to write a class that is just a grouping of static methods and static fields.

5 Prefer dependency injection to hardwiring resources

- do not use a singleton or static utility class to implement a class that depends on one or more underlying resources whose behavior affects that of the class
- do not have the class create these resources directly.

6 Avoid creating unnecessary objects

7 Eliminate obsolete object references

```java
public Object pop() { 
  if (size == 0)
    throw new EmptyStackException();
  return elements[--size];
}
```

- Another common source of memory leaks is caches.
- A third common source of memory leaks is listeners and other callbacks.

8 Avoid finalizers and cleaners

9 Prefer try-with-resources to try-finally

```java
try (InputStream in = new FileInputStream(src);
     OutputStream out = new FileOutputStream(dst)) { 
  byte[] buf = new byte[BUFFER_SIZE];
  int n;
  while ((n = in.read(buf)) >= 0)
    out.write(buf, 0, n);
}
```

10 Obey the general contract when overriding equals

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

11 Always override hashCode when you override equals

- If the field is of a primitive type, compute Type.hashCode(f), where Type is the boxed primitive class corresponding to f’ s type.
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

12 Always override toString

13 Override clone judiciously

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

14 Consider implementing Comparable

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
.thenComparingInt(pn -> pn.prefix) .thenComparingInt(pn -> pn.lineNum);
public int compareTo(PhoneNumber pn) { 
  return COMPARATOR.compare(this, pn);
}

```

15 Minimize the accessibility of classes and members

- **private**—The member is accessible only from the top-level class where it is declared.
- **package-private**—The member is accessible from any class in the package where it is declared. Technically known as *default* access, this is the access level you get if no access modifier is specified (except for interface members, which are public by default).
- **protected**—The member is accessible from subclasses of the class where it is declared (subject to a few restrictions [JLS, 6.6.2]) and from any class in the package where it is declared.
- **public**—The member is accessible from anywhere.

16 In publicclasses, use accessor methods, not public fields

17 Minimize mutability

- Don’t provide methods that modify the object’s state.
- Ensure that the class can’t be extended
- Make all fields final
- Make all fields private.
- Ensure exclusive access to any mutable components.

18 Favor composition over inheritance

- a class *B* should extend a class *A* only if an “is-a” relationship exists between the two classes. 
- If the answer is no, it is often the case that *B* should contain a private instance of *A* and expose a different API: *A* is not an essential part of *B*, merely a detail of its implementation.

19 Design and document for inheritance or else prohibit it

- Constructors must not invoke overridable methods
- When call the father's method, if this method will call another overrided method, it has already been overrided .

20: Prefer interfaces to abstract classes

- Existing classes can easily be retrofitted to implement a new interface.
- Interfaces are ideal for defining mixins.
- Interfaces allow for the construction of nonhierarchical type frameworks.
- Interfaces enable safe, powerful functionality enhancements via the wrapper class idiom
- The interface defines the type, perhaps providing some default methods, while the skeletal implementation class implements the remaining non-primitive interface methods atop the primitive interface methods. Extending a skeletal implementa- tion takes most of the work out of implementing an interface. 