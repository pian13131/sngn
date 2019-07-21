static  //a function belongs to a class;
import java.util.*;
import java.util.stream.IntStream;

final double SHORTPI = 3.14;    //never change val

System.out.println("hello world!"); //print

// max & min constant val
Byte.MAX_VALUE;

float f = 1.2424F;  //use float instead of double
long l = 132312L;

// castting
double b = 1.234;
int a = (int)b;
String S = Double.toString(1.618);
int n = Integer.parseInt("10");

//random
int rn = minNum + (int)(Math.randNum() * ((maxNum - minNum) + 1);

//String
String name = "Lyu";
name.charAt(0);
name.contains("y");
name.indexOf("y");
name.length();
name.equals("Lyu");
name.replace("L", "l");
name.substring(0, 1);
name.split("")

//StringBuilder(async) & StringBuffer(sync)
// both of them are muttable, while String is unmuttable
StringBuilder sb = new StringBuilder("I am a string builder");
sb.append(" yeah");
sb.insert(4, "big ");
sb.replace(6,9, "wig");
sb.delete(6, 10);

//Array  fixed size
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

//ArrayList  dynamic size

ArrayList<String> a = new ArrayList<String>(20);
a.add("Sue");
ArrayList<String> a = new ArrayList<>(Arrays.asList(1,2,3,4));
a.get(1);
a.set(1,5);
a.remove(3);

//Iterator

Iterator it = a.iterator();
it.hasNext();
it.next();

//LinkedList
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

// Scanner: user input

static Scanner sc = new Scanner(System.in);
if (sc.hasNextLine()) {
    String userName = sc.nextLine();
}

// public method, can be accessed out of the class
// private method, can be accessed only inside of class
// protected method, protected + accessed by subclass

// enum

public enum Day {
    Monday, Tuesday, Wednesday
}


// exeption handling

try {
    int badInt = 10/0;
    throw new Exception("Error");
}
catch(ArithmeticException ex) {

}
finally {

}

// Inheritance

public class Son extends Father {

}

// Polymorphism

public interface anInterface {

}

class newClass implements anInterface {

}

// abstract class: you do not need implements all methods

// Stream
// List is an interface, ArrayList implement it
List<Integer> oneTo10 = IntStream.rangeClosed(1, 10).boxed().collect(Collectors.toList())
// Map
List<Integer> squares = oneTo10.stream().map(x -> x*x).collect(Collectors.toList())

// Filter

List<Integer> evens = oneTo10.stream().filter(x -> (x%2)==0).collect(Collectors.toList())

IntStream limitTo5 = IntStream.rangeClosed(1, 10).limit(5);
// iterate
oneTo10.forEach(x -> {if (x%2==0) System.out.println(x);});


// File
File f1 = new File("f1.log");
f1.createNewFile();
f1.renameTo(new File("f1BU.log"));
f1.delete()

PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter(f2)));
pw.println("This will be writen into file");

// Generic: just like template in C++

class MyGeneric<T> {
    T obj;
    Test(T obj) {  this.obj = obj;  }  // constructor 
    public T getObject()  { return this.obj; }
}

// Thread
class MyThread implements Runnable {
    public void run() {
        System.out.println("Active Threads : " + Thread.activeCount());
        System.out.println("Start Thread : " + Thread.currentThread().getName());
    }
    try {
        Thread.sleep(3000);
    }catch(InterruptedException e){
        e.printStackTrace();
    }

}

Thread t1 = new Thread(new MyThread(), "1");
t1.start();
Thread t2 = new Thread(new MyThread(), "2");
t2.start();

// atomic

public synchronized void atomicFun() {

}

// Connect to SQL
import java.sql.Connection;
Connection con;

try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    String url = "jbdc:mysql://localhost/Students";
    String user = "sdbadmin";
    String pw = "password";
    con = DriverManager.getConnection(url, user, pw);
    Statement s = con.createStatement();
    String query = "INSERT INTO STUDENT (first_name, last_name) VALUES ('Jialun', 'Lyu')";
    s.executeUpdate(query);
    query = "SELECT first_name, last_name FROM student";
    ResultSet result = s.executeQuery(query);
    con.close()
}


