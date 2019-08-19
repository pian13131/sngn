### Primitive data types

| Type    | Description             | Default  | Size    | Example Literals                                           |
| ------- | ----------------------- | -------- | ------- | ---------------------------------------------------------- |
| boolean | true or false           | false    | 1 bit   | `true`, `false`                                            |
| byte    | twos complement integer | 0        | 8 bits  | (none)                                                     |
| char    | Unicode character       | `\u0000` | 16 bits | `'a'`, `'\u0041'`, `'\101'`, `'\\'`, `'\''`, `'\n'`, `'ß'` |
| short   | twos complement integer | 0        | 16 bits | (none)                                                     |
| int     | twos complement integer | 0        | 32 bits | `-2`, `-1`, `0`, `1`, `2`                                  |
| long    | twos complement integer | 0        | 64 bits | `-2L`, `-1L`, `0L`, `1L`, `2L`                             |
| float   | IEEE 754 floating point | 0.0      | 32 bits | `1.23e100f`, `-1.23e-100f`, `.3f`, `3.14F`                 |
| double  | IEEE 754 floating point | 0.0      | 64 bits | `1.23456e300d`, `-1.23456e-300d`, `1e1d`                   |

### String

- immutable

```java
String name = 'Lyu';
name.charAt(0);
name.contains("y");
name.indexOf("y");
name.length();
name.equals("Lyu");
name.replace("L", "l");
name.substring(0, 1);
name.split("")
```

### StringBuilder & StringBuffer

- StringBuilder is async
- StringBuffer is sync
- Both of them are mutable

```java
StringBuilder sb = new StringBuilder("I am a string builder");
sb.append(" yeah");
sb.insert(4, "big ");
sb.replace(6,9, "wig");
sb.delete(6, 10);
```

### Array

- fixed size

```java
int[] a1 = new int[10];
Arrays.fill(a1, 2);
a1.length;  // no ()
String[] a2 = {"one", "two"};
int[] one2ten = IntStream.rangeClosed(1, 10).toArray();
Arrays.binarySearch(one2ten, 9);
int a3[][] = new int[2][2];
String[][] a4 = {{"a", "b"}, {"c", "d"}};
int a6[] = {1,2,3};
int a7[] = Arrays.copyOf(a6, 3);
Arrays.sort(a7);
Arrays.toString(a7);
```

### ArrayList

- dynamic size

```java
ArrayList<String> a = new ArrayList<String>(20);
a.add("Sue");
ArrayList<String> a = new ArrayList<>(Arrays.asList(1,2,3,4));
a.get(1);
a.set(1,5);
a.remove(3);
```

### Iterator

```java
Iterator it = a.iterator();
it.hasNext();
it.next();
```

### LinkedList

```java
LinkedList<Integer> L = new LinkedList<Integer>();
L.add(1);
L.addAll(Arrays.asList(1,2,3,4));
L.addFirst(0);
L.indexOf(4);
L.replace(0, 3);
L.get(0);
L.getLast();
L.remove(1);
L.size();
L.toArray();
L.size();
```

### Scanner

- user input

```java
static Scanner sc = new Scanner(System.in);
if (sc.hasNextLine()) {
    String userName = sc.nextLine();
}
```

### Enum

```java
public enum Day {
    Monday, Tuesday, Wednesday
}
```

### Exeption handling

```java
try {
    int badInt = 10/0;
    throw new Exception("Error");
}
catch(ArithmeticException ex) {

}
finally {

}
```

### Inheritance

```java
public class Son extends Father {

}
```

### Interface

- All methods are not defined

```java
public interface anInterface {

}

class newClass implements anInterface {

}
```

### Abstract class

- Some methods are not defined

```java
abstract class Base { 
    abstract void fun(); 
} 
class Derived extends Base { 
    void fun() { System.out.println("Derived fun() called"); } 
} 
```

### Generic

- just like template in C++

```java
class MyGeneric<T> {
    T obj;
    Test(T obj) {  this.obj = obj;  }  // constructor 
    public T getObject()  { return this.obj; }
}
```

### Thread

```java
class MyThread implements Runnable {
    public void run() {
        System.out.println("Active Threads : " + Thread.activeCount());
        System.out.println("Start Thread : " + Thread.currentThread().getName());
        try {
            Thread.sleep(3000);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
    }

}

Thread t1 = new Thread(new MyThread(), "1");
t1.start();
Thread t2 = new Thread(new MyThread(), "2");
t2.start();
```

### Atomic

```java
public class SynchronizedCounter {
    private int c = 0;

    public synchronized void increment() {
        c++;
    }

    public synchronized void decrement() {
        c--;
    }

    public synchronized int value() {
        return c;
    }
}
```

- First, it is not possible for two invocations of synchronized methods on the same object to interleave. When one thread is executing a synchronized method for an object, all other threads that invoke synchronized methods for the same object block (suspend execution) until the first thread is done with the object.
- Second, when a synchronized method exits, it automatically establishes a happens-before relationship with *any subsequent invocation* of a synchronized method for the same object. This guarantees that changes to the state of the object are visible to all threads.