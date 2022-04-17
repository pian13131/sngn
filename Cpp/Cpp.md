# Cpp

# Constructor

### Member Initializer

```cpp
Rectangle(const double w, const double l) : width(w), length(l) {}
```

### Outside of class definition

```cpp
Polygon::Polygon(const int num_sides, const std::string & name) {
    this->num_sides = num_sides;	// 'this' is a pointer to the instance of the class. Members are accessed via the -> operator
    this->name = name;			// In this case you need to use 'this->...' to avoid shadowing the member variable since the argument shares the same name
}
```

### Default Constructor

```cpp
Foo ()
		{
			x = 10;
		}
```

### Copy Constructor

- compiler may generate default **shallow** copy constructor

```cpp
// copy constructor
Foo (const Foo &foo) // reference to avoid copy constructor call loop
		{
        x = foo.x;
    }
// 
```

```cpp
Foo a; // default constructor
Foo b = a; // copy constructor
```

### Explicit Constructor

```cpp
class Array {
    int size;
public:
    explicit Array(int size) {
        this->size = size;
    }
};

// now you have to 
Array array = Array(12345);
// instead of 
Array array = 12345;
```

### Move Constructor

```cpp
Movable(Movable && m) {
        // Point to the other object's data
        data_ptr = m.data_ptr;

        // Remove the other object's data pointer by
        // setting it to nullptr
        m.data_ptr = nullptr;
    }
Movable a(Bar());
```

# Destructor

- if the object is resides in the heap memory or the free store, the destructor should use delete to free the memory.
- called when
    - function ends
    - program ends
    - block ends
    - `delete` used
- default destructor works fine unless we have **dynamically allocated memory** or **pointer in class**

```cpp
class String {
private:
    char* s;
    int size;
 
public:
    String(char*); // constructor
    ~String(); // destructor
};
 
String::String(char* c)
{
    size = strlen(c);
    s = new char[size + 1];
    strcpy(s, c);
}
String::~String() { delete[] s; }
```

### Virtual Destructor

- Deleting a derived class object using a pointer of base class type that has a non-virtual destructor results in undefined behavior
- any time you have a virtual function in a class, you should immediately add a virtual destructor

```cpp
class base {
  public:
    base()    
    { cout << "Constructing base\n"; }
    virtual ~base()
    { cout << "Destructing base\n"; }    
};
 
class derived : public base {
  public:
    derived()    
    { cout << "Constructing derived\n"; }
    virtual ~derived()
    { cout << "Destructing derived\n"; }
};
int main()
{
  derived *d = new derived(); 
  base *b = d;
  delete b;
  getchar();
  return 0;
}
/*
Constructing base
Constructing derived
Destructing derived
Destructing base
*/
```

# `virtual` Function

- declared within a base class and is re-defined (overridden) by a derived class
- resolving of function call is done at runtime
- should be accessed using pointer or reference of base class type to achieve runtime polymorphism.

```cpp
class base {
public:
	virtual void print()
	{
		cout << "print base class" << endl;
	}

	void show()
	{
		cout << "show base class" << endl;
	}
};

class derived : public base {
public:
	void print()
	{
		cout << "print derived class" << endl;
	}

	void show()
	{
		cout << "show derived class" << endl;
	}
};

int main()
{
	base *bptr;
	derived d;
	bptr = &d;

	// virtual function, binded at runtime
	bptr->print(); // print derived class

	// Non-virtual function, binded at compile time
	bptr->show(); // show base class
}
```

# `friend`

- relationship is single direction and not mutable and not inherited

### Friend Class

- can access private and protected members of other class in which it is declared as friend

```cpp
class Node {
private:
    int key;
    Node* next;
    friend class LinkedList;
};
```

### Friend Function

- only that function can access private and protected members

```cpp
class Node {
private:
    int key;
    Node* next;
    friend int LinkedList::search();
};
```

# `const`

### Const variable

```cpp
// read only, compiler optimizations
const int i = 10;

// pointer is pointing to a const variable
const int* u;
```

### Const pointer

```cpp
// always point to the variable x but can change the value that it points to
int x = 1;
int* const w = &x;
```

### Const function

```cpp
int h(const int i)
{
    return ++i; // error
}

// If a function has a non-const parameter, 
// it cannot be passed a const argument while making a call
void t(int*) 
{ 
    // function logic
}
// If we pass a const int* argument to the function t, it will give error.
// but if with const type param, no error
```

### Const class member

```cpp
// const class member
// not initialized during declaration but in constructor
class Test
{
    const int i;
    public:
    Test(int x):i(x){}
};
```

### Const class object

```cpp
// const class object
// data members can never be changed
const class_name object;
```

### Const class member function

```cpp
// const class member function
// this func never modifies data members in an object
int falcon() const
    { 
        /* 
            can do anything but will not
            modify any data members
        */
    }
```

# `static`

### Static variable and object

```cpp
// keep live outside of func and end till main() finish
void counter()
{
    static int count = 0;
		static Abc obj;
}
```

### Static class member

```cpp
// shared by all the objects, not dependent on object initialization
// user cannot redefine it
class X
{
    public:
    static int i;
    X()
    {
        // construtor
    };
};
```

### Static member function

```cpp
// static member function
class X
{
    public:
    static void f()
    {
        // statement
    }
};
int main()
{
    X::f();
		X x;
		x.f();
}
```

# Inheritance

- **Public Inheritance**
    - **public/protected** members of the base class become **public/protected** members of the derived class.
    - A base class's **private** members are never accessible directly from a derived class, but can be accessed through calls to the **public** and **protected** members of the base class.
- **Protected Inheritance**
    - **public** and **protected** members of the base class become **protected** members of the derived class.
- **Private Inheritance**
    - **public** and **protected** members of the base class become **private** members of the derived class.

```cpp
class Car: public Vehicle{
 
};
```

# Assignment

<aside>
💡 Compiler will always provide a **default constructor**, a default **copy constructor**, and a default **copy assignment operator**

</aside>

### Copy Assignment

```cpp
Foo & operator=(const Foo & f) {
        data = f.data;
        return *this;
    }

Foo a(10);
Foo c;
c = a;
```

### Move Assignment

```cpp
Movable & operator=(Movable && m) {
        data_ptr = m.data_ptr;
        m.data_ptr = nullptr;
        return *this;
    }
Movable b = Bar();
```

# `new` and `delete`

```cpp
int *p = new int(25);
delete p;
```

# Operator Overloading

```cpp
Complex operator+(const Complex & a, const Complex & b) {
        return Complex(a.GetReal() + b.GetReal(), a.GetImaginary() + b.GetImaginary());
}
```

```cpp
friend Complex operator+(const Complex & a, const Complex & b);
// out of class
Complex operator+(const Complex & a, const Complex & b) {
    return Complex(a.r + b.r, a.i + b.i);
}
```

# Templates

```cpp
template <typename T>   // T becomes whatever type is used at compile-time
T Add(const T & a, const T & b) {
    return a + b;   // The type T must support the + operator
}

// Usages
int main() {
    Add<int>(3, 5);		    // int version
    Add<double>(3.2, 5.8);  // double
    Add(3.45f, 5.0f);	    // implicit float version: we leave off the <float> here, since it can deduce the type from the context

    Complex a {1, 2};	    // Custom class
    Complex b {5, 3};
    Add(a, b);	            // Works because we added support for the + operator!
}
```

# `namespace`

```cpp
#include <iostream>
using namespace std;

cout << "Hello, World" << endl;             // <--- BAD: pollutes the global namespace
```

```cpp
#include <iostream>

std::cout << "Hello, World" << std::endl;   // <--- GOOD: It's clear that you're using symbols from the standard namespace
```

# Reference

- cannot be `NULL` or `nullptr`
- cannot be reassigned

```cpp
int a = 10; // at 0x2a000084
int & ref_a = a;
std::cout << ref_a << std::endl;    // Prints: 10
std::cout << &ref_a << std::endl;   // Prints: 0x2a000084
```

### Pass by reference

- Don't need to check for `NULL` or `nullptr` since references cannot be null
- avoid large memory cost

```cpp
// Pass by reference using a const reference
void Foo(const Bar & bar) {
    int a = bar.GetValue();

    if (bar.SomeMethod()) {
        // ...
    }

    bar.SetValue(10);   // ERROR! Cannot modify a const reference!
}
```

### Rvalue Reference

- An rvalue reference is a type that behaves much like the ordinary reference `X&`, with several exceptions. The most important one is that when it comes to function overload resolution, lvalues prefer old-style lvalue references, whereas rvalues prefer the new rvalue references

```cpp
X& X::operator=(X const & rhs)
{
	// Make a clone of what rhs.m_pResource refers to.
  // Destruct the resource that m_pResource refers to. 
  // Attach the clone to m_pResource.
}
X& X::operator=(X&& rhs)
{
  // Move semantics: exchange content between this and rhs
	// temporary's destructor destruct x's original resource
  return *this;
}
```

```cpp
void foo(X& x); // lvalue reference overload
void foo(X&& x); // rvalue reference overload

X x;
X foobar();

foo(x); // argument is lvalue: calls foo(X&)
foo(foobar()); // argument is rvalue: calls foo(X&&)
```

```cpp
void foo(X&& x)
{
  X anotherX = x; // calls X(X const & rhs)
}

X&& goo();
X x = goo(); // calls X(X&& rhs) because the thing on
             // the right hand side has no name
```

### Universal Reference

- If a variable or parameter is declared to have type **`T&&`** for some **deduced type** `T`, that variable or parameter is a *universal reference*.
- no deduced type no universal reference `T&&` (no `const`)
- It can be both lvalue reference or rvalue reference and bind to anything
- If the expression initializing a universal reference is an lvalue, the universal reference becomes an lvalue reference, vice versa.

```cpp
template<typename T>
void f(T&& param); // universal reference

f(10); // rvalue refer

int x = 10;
f(x);  // lvalue refer
```

- Apply `std::move` to rvalue references and `std::forward` to universal references the last time each is used.
- Functions taking universal references are the greediest functions in C++. They instantiate to create exact matches for almost any type of argument. Hence, it may prohibit promotion overload match

# `std::move`  Semantics

- turns its argument into an rvalue

```cpp
void swap(T& a, T& b) 
{ 
  T tmp(std::move(a)); // move semantics
  a = std::move(b); 
  b = std::move(tmp);
}
```

```cpp
Base(Base const & rhs); // non-move semantics
Base(Base&& rhs); // move semantics

Derived(Derived&& rhs) 
  : Base(rhs) // wrong: rhs is an lvalue
{
  // Derived-specific stuff
}

Derived(Derived&& rhs) 
  : Base(std::move(rhs)) // good, calls Base(Base&& rhs)
{
  // Derived-specific stuff
}
```

# Perfect `std::forward`

- preserve the calling argument’s **lvalueness** or **rvalueness** when passing
- only for template function

```cpp
void g(X&& t); // A
void g(X& t);      // B

template<typename T>
void f(T&& t)
{
    g(std::forward<T>(t));
}

int main()
{
    X x;
    f(x);   // A, T: X&, forward<> lvalue reference is passed
    f(X()); // B, T: X&&, forward<> rvalue referece is passed
}
```

- Perfect-forwarding constructors are especially problematic, because they’re
typically better matches than copy constructors for non-const lvalues, and
they can hijack derived class calls to base class copy and move constructors.
- Perfect forwarding fails when template type deduction fails or when it deduces
the wrong type.
- The kinds of arguments that lead to perfect forwarding failure are braced ini‐
tializers, null pointers expressed as `0` or `NULL`, declaration-only`integral const
static` data members, `template` and `overloaded function names`, and `bitfields`.

# Pointer

```cpp
int a = 10;
int * ptr = &a
std::cout << ptr << std::endl;      // Prints: 0x2a000084
std::cout << *ptr << std::endl;     // Prints: 10
```

# **Strings**

```cpp
#include <string>

string fullName = firstName + " " + lastName;
string fullName = firstName.append(lastName);
fullName.length() // size()
myString[0];
myString[0] = 'J';
```

# Lambdas

### Capture Clause

```cpp
[&] // all variables that you refer to are captured by reference
[=] // by value
// total refer, factor value
[&total, factor]
[factor, &total]
[&, factor]
[factor, &]
[=, &total]
[&total, =]

[&, i]{};      // OK
[&, &i]{};     // ERROR: i preceded by & when & is the default
[=, this]{};   // ERROR: this when = is the default
[=, &this]{ }; // OK: captures this by value. See below.
[i, i]{};      // ERROR: i repeated
```

### Param List

```cpp
auto y = [] (int first, int second)
{
    return first + second;
};
```

### **Exception**

```cpp
int main() // C4297 expected
{
   []() noexcept { throw 5; }();
}
```

### Mutable

Typically, a lambda's function call operator is const-by-value, but use of the **`mutable`** keyword cancels this out

```cpp
[&, n] (int a) mutable { m = ++n + a; }(4);
```

# Lvalue and Rvalue

- every expression is called either an lvalue or an rvalue expression
- lvalue is an identifier, while rvalue is the value of expression
- if expression is a function, then lvalue is the result of a function returning a reference
- non-class rvalues are non-modifiable but not for user types
- no access for the rvalue address
- rvalue are those middle temporary value/object
- An rvalue cannot be used to initialise non-const reference. That is, an rvalue cannot be converted to an lvalue
- but when an lvalue is used in a context where an rvalue is expected, the lvalue is implicitly converted to an rvalue
- *if it has a name*, then it is an lvalue. Otherwise, it is an rvalue.

# `inline`

- the execution time of function is less than the switching time from the caller function to called function
- expanded in line when it is called

```cpp
inline int cube(int s)
{
    return s*s*s;
}
```

- allows you to use the `inline` keyword to define an external linkage `const` namespace scope variable, or any `static` class data member
- An inline static data member can be defined in the class definition and may s‌pecify a brace­-or­-equal­-initializer.

```cpp
struct Kath
{
    static std::string const hi;
};

inline std::string const Kath::hi = "Zzzzz...";
```

```cpp
struct Kath
{
    static inline std::string const hi = "Zzzzz...";    // Simplest!
};
```

# Exceptions

```cpp
try {
	int age = 10;
  throw (age);
}
catch (int myNum) { // ... for any type
  
}
```

# Iterators

# **Preprocessor**

- performs preliminary operations on C and C++ files before they are passed to the compiler
- text processor that manipulates the text of a source file
- compile code, insert files, specify compile-time error messages, and apply machine-specific rules to sections of code

### **Preprocessor Operators**

```cpp
// Stringizing: converts macro parameters to string literals without expanding the parameter definition
#define stringer( x ) printf_s( #x "\n" )
int main() {
   stringer( In quotes in the printf function call );
   stringer( "In quotes when printed to the screen" );
   stringer( "This: \"  prints an escaped double quote" );
}
/*
In quotes in the printf function call
"In quotes when printed to the screen"
"This: \"  prints an escaped double quote"
*/
```

```cpp
// Charizing: actual argument is enclosed in single quotation marks and treated as a character when the macro is expanded
#define makechar(x)  #@x
a = makechar(b); // a = 'b';
```

```cpp
// Token-pasting: permits separate tokens to be joined into a single token
#define paster( n ) printf_s( "token" #n " = %d", token##n )
int token9 = 9;
paster( 9 ); // printf_s( "token9 = %d", token9 );

```

### **Preprocessor Directives**

- make source programs easy to change and easy to compile in different execution environments
- can appear anywhere in a source file, but they apply only to the rest of the source file, after they appear
- (`#`) must be the first nonwhite-space character
- `#define` , `#elif` , `#else` , `#endif` , `#error` , `#if` , `#ifdef`, `#ifndef`, `#import`, `#include`

```cpp
#if !defined SIGNAL // #ifndef / #infdef
    #define SIGNAL  1
#elif __has_include <filesystem>
		#define SIGNAL  2
#else
    #undef SIGNAL
#endif
```

```cpp
#if !defined(__cplusplus)
#error C++ compiler required.
#endif
```

```cpp
/*
include standard library header files.
*/
#include <filename>

/*
include programmer-defined header files.
*/
#include "filename"
```

### Marcros

- expands macros in all lines except *preprocessor directives*
- When the name of a macro is recognized in the program source text, or in the arguments of certain other preprocessor commands, it's treated as a call to that macro
- inline function capability supplants function-type macros

# `volatile`

- tell the compiler, that the value may changed by any other places, hardware or other thread
- avoid **undesirable** compiler optimization

# `std::function`

- erases the details of how some operations happen, and provides a uniform run time interface
- can contain almost any object that acts like a function pointer in how you call it.
- `std::function< double(int) >` takes  `int` arguments and returns `double`
- can store, copy, and invoke any CopyConstructible Callable target -- functions, lambda expressions, bind expressions, or other function objects, as well as pointers to member functions and pointers to data members

# Closure

- persistent scope which holds on to local variables even after the code execution has moved out of that block

```jsx
outer = function() {
  var a = 1;
  var inner = function() {
    console.log(a);
  }
  return inner; // this returns a function
}

var fnc = outer(); // execute outer to get inner 
fnc(); // still could access 'a'
```

- In C++, lambda expression constructs a closure, an unnamed function object capable of capturing variables in scope

```cpp
std::function<void(void)> closureWrapper1()
{
    int x = 10;
    return [x](){std::cout << "Value in the closure: " << x << std::endl;};
}

std::function<void(void)> closureWrapper2()
{
    int x = 10;
    return [&x](){x += 1; std::cout << "Value in the closure: " << x << std::endl;};
}

int main()
{
    int x = 10;
    auto func0 = [&x](){x += 1; std::cout << "Value in the closure: " << x << std::endl;};
    std::function<void(void)> func1 = closureWrapper1();
    std::function<void(void)> func2 = closureWrapper2();
    func0();
    func0();
    func0(); // 11, 12, 13
    std::cout << "-------------------------" << std::endl;
    func1();
    func1();
    func1(); // 10, 10, 10
    std::cout << "-------------------------" << std::endl;
    func2();
    func2();
    func2(); // 32765, 32766, 32767
}
```

- `func1` and `func2` are not closures. Instead, they are `std::function` wrapper objects that wrapped closures. `func0` is a closure, but it should be a copy of the closure created by the lambda expression `[&x](){x += 1; std::cout << "Value in the closure: " << x << std::endl;}`.
- In the `func0`, it captured the **reference** to the variable `x` in the scope of `main`
- In the `func1`, it captured the value of the variable `x` in the scope of `closureWrapper1` by making a **copy** of it
- In the `func2`, it captured the **reference** to the variable `x` in the scope of `closureWrapper2`. The reference “remember” the address of `x`. However, after returning from the function, the local variable `x` in the ordinary function would be out of scope.
- When we talked about the closures in C++, they are basically referring to the objects that lambda expressions constructed.

# `std::bind`

- it takes a function as input and returns a new function Object as an output with with one or more of the arguments of passed function bound or rearranged.

```cpp
int add(int first, int second)
{
    return first + second;
}
```

```cpp
auto new_add_func = std::bind(&add, 12, _1);
new_add_func(5) // == add(12, 5)
```

# `thread`

- ***Hardware threads*** are the threads that actually perform computation. Contemporary machine architectures offer one or more hardware threads per CPU core.
- ***Software threads*** are the threads that the operating system manages across all processes and schedules for execution on hardware threads. It’s typically possible to create more software threads than hardware threads, because when a software thread is blocked throughput can be improved by executing other, unblocked, threads.
- *`std::threads`* are objects in a C++ process that act as handles to underlying
software threads.
- context switches increase the overall thread management overhead of the system, and they can be particularly costly when the hardware thread on which a software thread is scheduled is on a different core than was the case for the software thread during its last time-slice
    - the CPU caches are typically cold for that software thread
    - the running of the “new” software thread on that core “pollutes” the CPU caches for “old” threads that had been running on that core and are likely to be scheduled to run there again.
- Avoiding oversubscription is difficult, because the optimal ratio of software to hard‐ ware threads depends on how often the software threads are runnable, and that can change dynamically
- 

# `std::mutex`

- A calling thread owns a `mutex` from the time that it successfully calls either `lock` or `try_lock` until it calls unlock.
- When a thread owns a `mutex`, all other threads will block (for calls to `lock`) or receive a false return value (for `try_lock`) if they attempt to claim ownership of the `mutex`.
- A calling thread must not own the `mutex` prior to calling `lock` or `try_lock`.
- The class `lock_guard` is a mutex wrapper that provides a convenient RAII-style mechanism for owning a mutex for the duration of a scoped block.

```cpp
int g_i = 0;
std::mutex g_i_mutex;  // protects g_i
void safe_increment()
{
    const std::lock_guard<std::mutex> lock(g_i_mutex);
    ++g_i;
 
    std::cout << "g_i: " << g_i << "; in thread #"
              << std::this_thread::get_id() << '\n';
 
    // g_i_mutex is automatically released when lock
    // goes out of scope
}
```