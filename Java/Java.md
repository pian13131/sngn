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

### Character

```java
Character.toLowerCase();
Character.isUpperCase();
Character.isAlphabetic();
Character.isDigit();
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
Collections.swap(list, i, j);
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

### Hashmap

```java
HashMap<String, String> capitalCities = new HashMap<String, String>();
capitalCities.put("England", "London");
capitalCities.get("England");
capitalCities.remove("England");
capitalCities.clear();
capitalCities.size();
for (String i : capitalCities.keySet()) {
  System.out.println(i);
}
```

### Treemap

Sort keys by `compareTo()` using red-black tree

`put()` and `get()` are `O(log(n))`

```java
TreeMap<String, Double> tm = new TreeMap<>(new TreeCompare());
boolean containsKey(Object key)
boolean containsValue(Object value)
Object firstKey()
Object lastKey()
void putAll(Map map)
Set entrySet() // Returns a set view of the mappings contained in this map.
SortedMap headMap(Object key_value) // The method returns a view of the portion of the map strictly less than the parameter key_value.
Set keySet() // The method returns a Set view of the keys contained in the treemap.
```

### LinkedHashMap

Sort keys by `put()` order

### Hashset

```java
HashSet<String> h = new HashSet<String>(); 

Iterator<String> i = h.iterator(); 
while (i.hasNext()) 
    System.out.println(i.next());
boolean add(E e)
void clear()
boolean contains(Object o)
boolean remove(Object o)
boolean isEmpty()
int size()
Object clone()
```

### TreeSet

```java
TreeSet<String> ts1 = new TreeSet<String>();

boolean addAll(Collection c)
Object first()
Object last()
SortedSet headSet(Object toElement) // This method will return elements of TreeSet which are less than the specified element.
SortedSet tailSet(Object fromElement) // This method will return elements of TreeSet which are greater than or equal to the specified element.
SortedSet subSet(Object fromElement, Object toElement) // This method will return elements ranging from fromElement to toElement. fromElement is inclusive and toElement is exclusive.
```

### Queue

```java
Queue<String> queue = new LinkedList<>();
queue.offer(e);
queue.poll();
queue.peek();
```

```java
// Priority queue
Queue<Integer[]> queue = new PriorityQueue(n, (x, y)->y[0]-x[0]);
```



### Lambda

```java
arrayList.forEach(
	(x) -> {
    System.out.println(x);
  }
)
  
Consumer<Integer> method = (x) -> { System.out.println(x); };
arrayList.forEach(method)
  
interface StringFunction {
  String run(String str);
}
public void printFormatted(String str, StringFunction format) {
    String result = format.run(str);
    System.out.println(result);
}
StringFunction exclaim = (s) -> s + "!";
printFormatted("Hello", exclaim);
```

### Random

```java
Random rand = new Random();
rand.nextInt(upperbound); 
rand.nextDouble();
rand.nextFloat();
```

### Math

```java
Math.exp(a); // e^a
Math.log(a);
Math.sqrt();
Math.pow(x, a); // x^a
Maht.ceil();
Math.floor();
Math.rint();
Math.abs();
```



### Comparator

```java
public class CustomComparator implements Comparator<MyObject> {
    @Override
    public int compare(MyObject o1, MyObject o2) {
        return o1.getStartDate().compareTo(o2.getStartDate());
    }
}

arrayList.sort(new CustomComparator()));

Collections.sort(Database.arrayList, new Comparator<MyObject>() {
    @Override
    public int compare(MyObject o1, MyObject o2) {
        return o1.getStartDate().compareTo(o2.getStartDate());
    }
});

Database.arrayList.sort(Comparator.comparing(MyObject::getStartDate));
```

### Scope

| Modifier    | Package | Subclass | World |
| ----------- | ------- | -------- | ----- |
| `public`    | Yes     | Yes      | Yes   |
| `protected` | Yes     | Yes      | No    |
| `default`   | Yes     | No       | No    |
| `private`   | No      | No       | No    |

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
class NewThread extends Thread{
     public void run( ) {
        for(int i = 1; i <= 5; i++) {
           System.out.println("From Thread A with i = "+ -1*i);
        }
        System.out.println("Exiting from Thread A ...");
     }
}
Thread t1 = new Thread(new MyThread(), "1");
t1.start();
Thread t2 = new Thread(new MyThread(), "2");
t2.start();
NewThread t3 = new NewThread();
```

**Newborn** : When a thread is created but not yet to run. In this state, the local data members are allocated and initialized. 
**Runnable** : The Runnable state means that a thread is ready to run and is awaiting for the control of the processor.
**Running** : Running means that the thread has control of the processor.
**Blocked** : A thread is Blocked means that it is being prevented from the Runnable  or Running) state and is waiting for some event in order for it to reenter the scheduling queue.
**Dead** : A thread is Dead when it finishes its execution or is stopped (killed) by another thread.

**`start()`** : A newborn thread with this method enter into Runnable state and Java run time create a system thread context and starts it running. This method for a thread object can be called once only
**`stop()`** : This method causes a thread to stop immediately to dead.
**`suspend()`** : This method is different from stop( ) method. It takes the thread and causes it to stop running and later on can be restored by calling it again.
**`resume()`** : This method is used to revive a suspended thread. There is no gurantee that the thread will start running right way, since there might be a higher priority thread running already, but, resume()causes the thread to become eligible for running.
**`sleep(int n)`** : This method causes the run time to put the current thread to sleep for n milliseconds. After n milliseconds have expired, this thread will become elligible to run again.
**`yield()`** : The yield() method causes the run time to switch the context from the current thread to the next available runnable thread. This is one way to ensure that the threads at lower priority do not get started. 

**Communication among threads**

- commonly shared data
- `suspend()`, `resume()`, `join()`
- `wait()`, `notify()`, `notifyAll()`

```java
class Q {
    int n;
    boolean flag = false;
    synchronized void put( int n) {	// Produce a value
        if(flag) {							// Entry	      	                      
            try wait( );  catch(InterruptedException e);		// to the		      
        }							// critical section	                              

        this.n = n;
        System.out.println( "Produce :" + n);			// Critical Section           

        flag = true;						// Exit from the	                      
        notify( );							// critical section
    }
    synchronized int get( ) {		// Consume a value
        if(! flag) {						// Entry		                          
            try  wait( );  catch(InterruptedException e);		// to the		      
        }							// critical section	                             						                                   
        System.out.println( "Consume :" + n);			// Critical Section           						                                                           
        flag = false;						// Exit from the	                      
        notify( );							// critical	// section                         	
        return( n );
    }


    class Producer implement Runnable  {	// Thread for Producer process 
        Q  q;
        Producer ( Q q ) 	{  	// constructor
            this.q =q;
            new thread (this).start ( ) ;		// Producer process is started 
        }

        public void run( ) { 		// infinite running  thread for Producer 
            int i = 0;
            while (true )
                q.put ( i++ );
        }
    }

    class Consumer implement Runnable { 	// Thread for consumer process
        Q q;
        Consumer (Q q )	{ 	          // Constructor 
            this.q  = q;
            new Thread (this).start ( );
        }

        public void run( ) {		// infinite running thread for Consumer 
            while (true)
                q.get ( );
        }
    }

    class PandC  {
        public static void main( String args[ ] ) {
            Q q = new Q( );		// an instance of parallel processes  is created
            new Producer(q) ;			// Run the thread for producer 
            new Consumer (q);			// Run consumer thread 
        }
    }
}
```

### Atomic

```java
private int c = 0;
public synchronized void increment() {
    c++;
}
```

- When one thread is executing a synchronized method for an object, all other threads that invoke synchronized methods for the same object block until the first thread is done with the object.
- Second, when a synchronized method exits, it automatically establishes a happens-before relationship with *any subsequent invocation* of a synchronized method for the same object. This guarantees that changes to the state of the object are visible to all threads.

```java
private volatile int c = 0;
public void increment() {
    c++;
}
```

- `volatile` forces all accesses (read or write) to the volatile variable to occur to main memory which means all thread are accessing the same value

### Database

```java
Class.forName("com.mysql.jdbc.Driver");  
Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseName","userName","password");  
Statement statement = connection.createStatement();  
ResultSet resultSet = statement.executeQuery("select * from emp");  
while(resultSet.next())  
  System.out.println(resultSet.getInt(1)+"  "+resultSet.getString(2)+"  "+resultSet.getString(3));  
connection.close();
```



### Conversion

- `String` to `byte, int, long, float, double, boolean`

    ```java
    XXX.parseXXX(s)
    ```

- `String` to `Byte, Int, Long, Float, Double, Boolean`

    ```java
    XXX.valueOf(s)
    ```

- `byte, int, long, float, double, boolean` to `String` 

    ```java
    XXX.toString(val)
    ```

- `Byte, Int, Long, Float, Double, Boolean` to `String`

    ```java
    val.toString()
    ```

- Between `byte, int, long, float, double, boolean`

    ```java
    (XXX)val
    ```

    

- `char[]` to `String`

    ```java
    String.valueOf(charArray)
    ```

- `char` to `int`

    ```java
    char c='a';  
    char c2='1';  
    int a=c;  // 97
    int b=c2;  // 49
    int x = Character.getNumericValue(c2); // 1
    ```

- `int` to `char`

    ```java
    int a=65;  
    char c=(char)a;  // A
    int b = Character.forDigit('1', 10); // 1
    ```

- `List` to `Array`

    ```java
    list.toArray(new T[0])
    ```

- `Array` to `List`

    ```
    Arrays.asList(array)
    Collections.addAll(list, array);
    ```


### GarbageCollection

**Creating Unreachable Objects**

- Nullifying the reference variable
- Re-assigning the reference variable
- Object created inside method
- Anonymous object

```java
System.gc();
Runtime.getRuntime().gc();
protected void finalize() throws Throwable // will be ran before object got destroyed
```

### Trick

- be careful when you pass value

    ```
    fun(list) or fun(ArrayList<>(list))
    ```

- `Array` will not override `hashCode()` nor `equals`, which means values same doesn't means object same. Be careful when use `HashSet` and `HashMap`

- Always remember use `equals()` instead of `==` when you compare two Objects, especially for `Inteager`

- 