# Effective Cpp

# `T` deduction

```cpp
template<typename T>
void f(ParamType param);
```

### Non-Universal Reference /Pointer

- the **`const`** of the object becomes part of the type deduced for `T`.

```cpp
template<typename T>
void f(T& param);

int x = 27; //     T: int, param: int&
const int cx = x; // T: const int, param: const int&
const int& rx = x;// T: const int, param: const int&
```

- `rx` reference-ness is ignored during type deduction (this also happen for `auto`)

```cpp
template<typename T>
void f(const T& param);

int x = 27; // T: int, param: const int&
const int cx = x; // T: int, param: const int&
const int& rx = x; // T: int, param: const int&
```

```cpp
template<typename T>
void f(T* param);

int x = 27;
const int *px = &x;

f(&x); // T: int, param: int*
f(px); // T: const int, param: const int*
```

### Universal Reference

```cpp
template<typename T>
void f(T&& param); // param is now a universal reference
int x = 27; // as before
const int cx = x; // as before
const int& rx = x; // as before
f(x); // T: int&, param: int&
f(cx); // T: const int&, param: const int&
f(rx); // T: const int&, param: const int&
f(27); // T: int, param: int&&
```

### Non-Pointer and Non-Reference

- param will be a copy of whatever is passed in—a completely new object

```cpp
template<typename T>
void f(T param); // param is now passed by value
int x = 27; // as before
const int cx = x; // as before
const int& rx = x; // as before
f(x); // T's and param's types are both int
f(cx); // T's and param's types are again both int
f(rx); // T's and param's types are still both int
```

- even though `cx` and `rx` represent `const` values, param isn’t `const`. param is an object that’s completely independent of `cx` and `rx`— a copy of `cx` or `rx`

### Deduced to Pointer

```cpp
const char name[] = "J. P. Briggs"; // name's type is
 // const char[13]

template<typename T>
void f(T param); // template with by-value parameter
f(name); // void f(int* param)

template<typename T>
void f(T& param);
f(name); // pass array to f
```

```cpp
void someFunc(int, double); // someFunc is a function;
 // type is void(int, double)
template<typename T>
void f1(T param); // in f1, param passed by value
template<typename T>
void f2(T& param); // in f2, param passed by ref
f1(someFunc); // param deduced as ptr-to-func;
 // type is void (*)(int, double)
f2(someFunc); // param deduced as ref-to-func;
 // type is void (&)(int, double)
```

### Summary

- **During template type deduction, arguments that are references are treated as non-references**
- **When deducing types for universal reference parameters, lvalue arguments get special treatment.**
- **When deducing types for by-value parameters, `const` and/or `volatile` arguments are treated as non-`const` and non-`volatile`.**
- **During template type deduction, arguments that are array or function names decay to pointers, unless they’re used to initialize references.**

# `auto` deduction

- with only one curious exception, `auto` type deduction *is* `template` type deduction
- When a variable is declared using auto, auto plays the role of T in the template, and the type specifier for the variable acts as *ParamType*

```cpp
auto x = 27; // x is neither ptr nor reference
const auto cx = x; // cx isn't either
const auto& rx = x; // rx is a non-universal ref.

auto&& uref1 = x; // x is int and lvalue, so uref1's type is int&
auto&& uref2 = cx; // cx is const int and lvalue, so uref2's type is const int&
auto&& uref3 = 27; // // 27 is int and rvalue, so uref3's type is int&&
```

```cpp
const char name[] = "R. N. Briggs"; // name's type is const char[13]
auto arr1 = name; // arr1's type is const char*
auto& arr2 = name; // arr2's type is const char (&)[13]

void someFunc(int, double); // someFunc is a function, type is void(int, double)
auto func1 = someFunc; // void (*)(int, double)
auto& func2 = someFunc; // void (&)(int, double)
```

### Exception

```cpp
auto x1 = 27; // type is int, value is 27
auto x2(27); // ditto
auto x3 = { 27 }; // type is std::initializer_list<int>, value is { 27 }
auto x4{ 27 }; // ditto
```

- When the initializer for an `auto`-declared variable is enclosed in braces, the deduced type is a `std::initializer_list`.

# **`decltype`**

```cpp
const int i = 0; // decltype(i) is const int
bool f(const Widget& w); // decltype(w) is const Widget&, decltype(f) is bool(const Widget&)
```

```cpp
template<typename Container, typename Index> 
auto authAndAccess(Container& c, Index i)
{
  authenticateUser();
  return c[i]; // int[i] -> int&, because of refer ignorce, -> int: rvalue
}

authAndAccess(d, 5) = 10; // error rvalue = int
```

- use `decltype` type deduction rules in some cases where types are inferred and avoid refer ignorce

```cpp
template<typename Container, typename Index>
decltype(auto) // make sure return what ever c[i] should return: T&
authAndAccess(Container& c, Index i)
{
  authenticateUser();
  return c[i];
}
```

```cpp
Widget w;
const Widget& cw = w;
auto myWidget1 = cw; // type is Widget
decltype(auto) myWidget2 = cw; // const Widget&
```

- `Container& c` is lvalue-refer-non-const which means input cannot be rvalue

```cpp
template<typename Container, typename Index>
decltype(auto)
authAndAccess(Container&& c, Index i)
{
  authenticateUser();
return std::forward<Container>(c)[i]; }
```

- `decltype` almost always yields the type of a variable or expression without
any modifications.
- For lvalue expressions of type `T` other than names, `decltype` always reports a
type of `T&`.
- C++14 supports `decltype(auto)`, which, like `auto`, deduces a type from its
initializer, but it performs the type deduction using the `decltype` rules.

# `auto`

```cpp
int x1; // potentially uninitialized
auto x2; // error! initializer required
```

```cpp
// holding closure
// C++14 comparison func for values pointed by anything pointer-like
// less verbose and save mem and faster compared with std:function
auto derefLess =
	[](const auto& p1, const auto& p2)
	{ return *p1 < *p2; }
```

- An `auto`-declared variable holding a closure has the same type as the closure, and as such it uses only as much memory as the closure requires
- The type of a `std::function` - declared variable holding a closure is an **instantiation** of the `std::function` template, and that has a fixed size for any given signature. `std::function` object typically uses more memory than the `auto`-declared object.

```cpp
// avoid unpurposed miss match type issue
unsigned sz = v.size();
auto sz = v.size(); // sz's type is std::vector<int>::size_type

std::unordered_map<std::string, int> m;
for (const std::pair<std::string, int>& p : m)
// in fact, type of key in m is <const std::string, int>
```

- explicitly specifying types can lead to implicit **conversions** that you neither want nor expect.

### Proxy Class

- “Invisible” proxy types can cause `auto` to deduce the “wrong” type for an initializing expression.
- The explicitly typed initializer idiom forces auto to deduce the type you want it to have.

```tsx
std::vector<bool> features(const Widget& w);
auto highPriority = features(w)[5]; // highPriority will be std::vector<bool>::reference
// std::vector<bool>::reference emulate the behavior of a bool&
```

# `()` vs `{}`

```jsx
// all same init for int
int x(0);
int y = 0;
int z{ 0 };
```

```jsx
Widget w1; // call default constructor
Widget w2 = w1; // not an assignment; calls **copy ctor**
w1 = w2; // an assignment; calls **copy operator=**
```

### Uniform Initialization `{}`

- a single initialization syntax that can be used anywhere and express everything
- Braces can also be used to specify default initialization values for non-`static` data members.
- only braces can be used everywhere
- prohibits implicit *narrowing conversions* among built-in types

```cpp
std::atomic<int> ai1{ 0 }; // default
double x, y, z;
int sum1{ x + y + z }; // error

// differ claim function 
Widget w3{}; // calls Widget ctor with no args
```

- an `auto`-declared variable has a braced initializer, the type deduced is `std::initializer_list`

```cpp
Widget(int i, bool b);
Widget(std::initializer_list<long double> il);

Widget w1(10, true); // calls first ctor
Widget w2{10, true}; // uses braces, but now calls std::initializer_list ctor
// 10 and true convert to long double

```

- Compilers’ determination to match braced initializers with constructors taking `std::initializer_lists` is so strong, it prevails even if the best-match `std::initializer_list` constructor can’t be called
- only when `std::initializer_list` cannot convert to correct type, will compiler use the non-`std::initializer_list` function

```cpp
Widget();
Widget(std::initializer_list<int> il);

Widget w1; // calls default ctor
Widget w2{}; // also calls default ctor
Widget w3(); // **declares a function**!

Widget w4({}); // calls std::initializer_list ctor, with empty list
Widget w5{{}}; // ditto
```

# `nullptr` vs `0` and `NULL`

- `0` and `NULL` will be regarded as `int`
- `nullptr` is a pointer of *all* types `std::nullptr_t`

```cpp
f(0); // calls f(int), not f(void*)
f(NULL); // f(int). Never calls f(void*)

f(nullptr); // calls f(void*) overload
```

# **`alias` vs `typedefs`**

```cpp
typedef
     std::unique_ptr<std::unordered_map<std::string, std::string>>
     UPtrMapSS;
using UPtrMapSS =
     std::unique_ptr<std::unordered_map<std::string, std::string>>;

typedef void (*FP)(int, const std::string&);
using FP = void (*)(int, const std::string&); // more clear
```

- `alias` declarations may be `template`

```cpp
template<typename T> // MyAllocList<T>::type struct MyAllocList { // is synonym for
typedef std::list<T, MyAlloc<T>> type; // std::list<T, }; // MyAlloc<T>>

MyAllocList<Widget>::type lw;            // client code

template<typename T>
using MyAllocList = std::list<T, MyAlloc<T>>; // much simple
```

- `alias` templates avoid the `::type` suffix and, in templates, the `typename` prefix often required to refer to `typedefs`

# `enum`

```cpp
enum class Color { black, white, red }; // scoped
auto white = false; // fine, no other
Color c = white; // error
Color c = Color::white; // correct
auto c = Color::white; // correct
```

- Enumerators for `unscoped` `enums` **implicitly** convert to **integral types**

```cpp
enum Color { black, white, red }; // unscoped
Color c = red;
if (c < 14.5) {...} // no error

enum class Color { black, white, red }; // unscoped
Color c = Color::red;
if (c < 14.5) {...} // error!
```

- scoped enums may be forward-declared, unscoped enums may be forward-declared only if their declaration specifies an underlying type.

```cpp
enum Color;               // error!
enum class Color;         // fine
```

- Both scoped and unscoped enums support specification of the underlying type. The default underlying type for scoped enums is int. Unscoped enums have no default underlying type.

```cpp
enum class Status: std::uint32_t; // set underlying type, default is int for scoped type
```

- scoped enums avoid namespace pollution and aren’t susceptible to nonsensical implicit type conversions

# **`delete` vs `private`**

```cpp
public:
	basic_ios(const basic_ios& ) = delete;
```

- Any function may be deleted, while only member functions may be `private`

# **`override`**

- overriding requirements:
    - base class function must be `virtual`
    - base and derived **function names** must be identical
    - **parameter types** of the base and derived functions must be identical
    - `const`ness of the base and derived functions must be identical
    - **return types** and **exception specifications** of the base and derived functions must be compatible
    - The functions’ ***reference qualifiers*** must be identical
      
        ```cpp
        void doWork() &; // this version of doWork applies, only when *this is an lvalue
        void doWork() &&; // ... rvalue
        
        w.doWork();
        makeWidget().doWork();
        ```
        

```cpp
class Derived: public Base {
   public:
virtual void mf1() override; // force override
};
```

# **`const_iterator`**

- `const_iterator`s are the STL equivalent of pointers-to-`const`. They point to values that may not be modified.
- The standard practice of using `const` whenever possible dictates that you should use `const_iterator`s any time you need an iterator, yet have no need to modify what the iterator points to.

```cpp
std::vector<int> values; // as before ...
auto it = std::find(values.**c**begin(),values.**c**end(), 1983); // const_iterator
values.insert(it, 1998);
```

# **`noexcept`**

- Declare functions `noexcept` if they won’t emit exceptions.
- The stack is only *possibly* unwound before program execution is terminated.
- Optimizers need not keep the runtime stack in an unwindable state if an exception would propagate out of the function, nor must they ensure that objects in a noexcept function are destroyed in the inverse order of construction should an exception leave the function.
- In C++98, the transfer was accomplished by copying each element from the old memory to the new memory, then destroying the objects in the old memory. This approach enabled `push_back` to offer the strong exception safety guarantee: if an exception was thrown during the copying of the elements, the state of the `std::vector` remained unchanged, because none of the elements in the old memory were destroyed until all elements had been successfully copied into the new memory.
- In C++11, a natural optimization would be to replace the copying of std::vector elements with moves. Therefore, C++11 implementations can’t silently replace copy operations inside push_back with moves unless it’s known that the move operations won’t emit exceptions.
- `std::vector::push_back` takes advantage of this “move if you can, but copy if you must” strategy. Replace calls to copy operations in C++98 with calls to move operations in C++11 only if the move operations are known to not emit exceptions.
- most functions are *exception-neutral*. Such functions throw no exceptions themselves, but functions they call might emit one. Exception-neutral functions are never noexcept, because they may emit such “just passing through” exceptions.
- By default, all memory deallocation functions and all destructors—both user-defined and compiler- generated—are implicitly noexcept.

# **`constexpr`**

- indicates a value that’s not only constant, it’s known during compilation
- functions produce compile-time constants *when they are called with compile-time constants*
- It means that the traditionally fairly strict line between work done during compilation and work done at runtime begins to blur, and some computations traditionally done at runtime can migrate to compile time.
- The more code taking part in the migration, the faster your software will run

# **`const` member function**

- In the `const` member function there might be high cost modification or calculation to member variable

```cpp
class Polynomial {
   public:
     using RootsType = std::vector<double>;
  RootsType roots() const
  {
    if (!rootsAreValid) {
      ... // cost a lot
      rootsAreValid = true;
    }
    return rootVals;
  }
private:
  mutable bool rootsAreValid{ false };
  mutable RootsType rootVals{};
};
```

```cpp
/*-----  Thread 1  ----- */     /*-------  Thread 2  ------- */
auto rootsOfP = p.roots(); auto valsGivingZero = p.roots();
```

- inside roots, one or both of these threads might try to modify the data members `rootsAreValid` and `rootVals`.
- `std::lock_guard<std::mutex> guard(m);`
- `std::atomic<bool> cacheValid`

```cpp
class Widget {
public:
...
  int magicValue() const
  {
} ...
std::lock_guard<std::mutex> guard(m);
if (cacheValid) return cachedValue;
else {
  auto val1 = expensiveComputation1();
  auto val2 = expensiveComputation2();
  cachedValue = val1 + val2;
  cacheValid = true;
  return cachedValue;
}
// lock m
private:
  mutable std::mutex m;
  mutable int cachedValue;
  mutable bool cacheValid{ false };
};
```

- For a **single** variable or memory location requiring synchronization, use of a `std::atomic` is adequate, but once you get to two or more variables or memory locations that require manipulation as a unit, you should reach for a `mutex`.

# s**pecial member functions**

- C++ is willing to generate on its own
- the **default constructor**, the **destructor**, the **copy operations(Copy constructor, copy assignment operator)**, and **move operations(move constructor, move assignment operator).**

```cpp
class Widget {
public:
...
  Widget(Widget&& rhs); // move constructor
  Widget& operator=(Widget&& rhs); // move assignment operator
... };
```

- The two move operations are not independent. If you declare either, that prevents compilers from generating the other
- move operations won’t be generated for any class that explicitly declares a **copy operation**
- Declaring a move operation (construction or assignment) in a class causes compilers to disable the **copy operations**.
- move or copy

# **`std::unique_ptr`**

- `std::unique_ptr` is thus a **non-null *move-only** type*
- resource destruction is accomplished by applying `delete` to the raw pointer inside the `std::unique_ptr`.
- `std::unique_ptr` is a small, fast, **move-only** smart pointer for managing resources with exclusive-ownership semantics.
- By default, resource destruction takes place via `delete`, but custom deleters can be specified

# **`std::shared_ptr`**

- A `std::shared_ptr` can tell whether it’s the last one pointing to a resource by consulting the resource’s *reference count*
- An object accessed via `std::shared_ptr`s has its lifetime managed by those pointers through *shared ownership*
- `std::shared_ptrs` ****are twice the size of a raw pointer, because they internally contain a raw pointer to the **resource** as well as a raw pointer to the **resource’s reference count**
- Increments and decrements of the reference count must be atomic
- Moving `std::shared_ptrs` is therefore faster than copying them: copying requires incrementing the reference count, but moving doesn’t
- Control Block
    - reference count
    - weak count
    - other data(custom deleter, allocator)
- `std::enable_shared_from_this` defines a member function that creates a `std::shared_ptr` to the current object, but it does it without duplicating control blocks.

# **`std::weak_ptr`**

- point to the same place as the `std::shared_ptrs` initializing them, but they **don’t affect the reference count** of the object they point to
- `std::weak_ptrs` **lack** dereferencing operations

```cpp
auto spw =                       // after spw is constructed, RC is 1
     std::make_shared<Widget>()
std::weak_ptr<Widget> wpw(spw); // wpw points to same Widget
                                    // as spw. RC remains 1
spw = nullptr;                   // RC goes to 0, and the
                                    // Widget is destroyed.
                                    // wpw **now dangles**
if (**wpw.expired()**) ... // if wpw doesn't point
                                    // to an object...
```

```cpp
std::shared_ptr<Widget> spw1 = wpw.lock(); // if wpw's expired, spw1 is null
auto spw2 = wpw.lock(); // same as above, but uses auto
std::shared_ptr<Widget> spw3(wpw); // if wpw's expired, throw std::bad_weak_ptr
```

- avoid cycle depend

```cpp
A --- shared_ptr ---> B
B --- weak_prr ---> A
// If A is destroyed, B’s pointer back to it will dangle
// but B will be able to detect that
```

# **`std::make_unique` & `std::make_shared`**

- `std::make_unique` and `std::make_shared` are two of the three *make functions*: functions that take an arbitrary set of arguments, perfect-forward them to the contructor for a dynamically allocated object
- Situations where use of make functions is inappropriate include the need to specify custom deleters and a desire to pass braced initializers.
- prefer make functions has to do with exception safety.

```cpp
auto upw(std::make_unique<Widget>());
auto upw(std::make_shared<Widget>());
```

# Pointer to implementation

- That’s the technique whereby you replace the data members of a class with a pointer to an implementation class (or struct), put the data members that used to be in the primary class into the implementation class, and access those data members indirectly through the pointer.

```cpp
class Widget {
   public:
Widget();
... private:
     std::string name;
     std::vector<double> data;
     Gadget g1, g2, g3;
};
```

```cpp
class Widget {
public:
  Widget();
  ~Widget();
  ...
private:
struct Impl;
std::unique_ptr<Impl> pImpl; // declare implementation struct
// and pointer to it
};
// Because Widget no longer mentions the types std::string, 
// std::vector, and Gadget, Widget clients no longer need to 
// #include the headers for these types.

#include "widget.h"
#include "gadget.h"
#include <string>
#include <vector>
struct Widget::Impl {
  std::string name;
  std::vector<double> data;
  Gadget g1, g2, g3;
};
Widget::Widget() : pImpl(std::make_unique<Impl>()) {}
Widget::~Widget(){}
```

- The **Pimpl Idiom** decreases build times by reducing compilation dependencies between class clients and class implementations
- For `std::unique_ptr` pImpl pointers, declare special member functions in the class header, but implement them in the implementation file. Do this even if the default function implementations are acceptable
- The above advice applies to `std::unique_ptr`, but not to `std::shared_ptr`.
- The difference in behavior between `std::unique_ptr` and `std::shared_ptr` for pImpl pointers stems from the differing ways these smart pointers support custom deleters. For `std::unique_ptr`, the type of the deleter is part of the type of the smart pointer, and this makes it possible for compilers to generate smaller runtime data structures and faster runtime code.

# R**eference collapsing**

- *you* are forbidden from declaring references to references, but *compilers* may produce them in particular contexts
- There are two kinds of references (lvalue and rvalue), so there are four possible reference-reference combinations (lvalue to lvalue, lvalue to rvalue, rvalue to lvalue, and rvalue to rvalue).
- If either reference is an lvalue reference, the result is an lvalue reference. Otherwise (i.e., if both are rvalue references) the result is an rvalue reference.
- Universal references are rvalue references in contexts where type deduction distinguishes lvalues from rvalues and where reference collapsing occurs.
- When compilers generate a reference to a reference in a reference collapsing context, the result becomes a single reference.

# Reference c**apture**

- A by-reference capture causes a closure to contain a **reference** to a local variable or to a parameter that’s available in the scope where the lambda is defined.
- If the lifetime of a **closure** created from that lambda exceeds the lifetime of the **local variable or parameter**, the reference in the closure will **dangle**.

```cpp
void addDivisorFilter() {
	auto calc1 = computeSomeValue1();
	auto calc2 = computeSomeValue2();
	auto divisor = computeDivisor(calc1, calc2);
	filters.emplace_back(
	[&](int value) { return value % divisor == 0; } // danger ref to divisor
 );
}                                          
```

- if you capture a pointer by value, you copy the pointer into the closures arising from the lambda, but you don’t prevent code outside the lambda from deleting the pointer and causing your copies to dangle.
- Captures apply only to non-`static` local variables (including parameters) visible in the scope where the lambda is created. Not even for class data member

```cpp
void Widget::addFilter() const
{
	filters.emplace_back(
	[divisor = divisor](int value) // better way
	); 
}
```

- `static` objects can be used inside lambdas, but they can’t be captured.

# **`move` capture**

- Sometimes neither by-value capture nor by-reference capture is what you want, but by- `move`
- **the name of a data member** in the closure class generated from the lambda and **an expression** initializing that data member.

```cpp
auto func = [pw = std::move(pw)]
						{ return pw->isValidated()
                     && pw->isArchived(); };
```

- To the left of the “=” is the name of the data member in the closure class you’re specifying, and to the right is the **initializing expression.**
- The scope on the left is that of the closure class. The scope on the right is the same as where the lambda is being defined.

```cpp
auto func =
  std::bind([](const std::vector<double>& data) { /* uses of data */ }, 
	std::move(data) // C++11 way of init cap
);
```

- Otherwise, always Prefer lambdas to `std::bind`

# **Use `decltype` on `auto&&` parameters**

```cpp
template<typename T>
auto operator()(T&& x) const
{ return func(std::forward<T>(normalize(x))); }
```

- The correct way to write the lambda is to have it perfect-forward x to normalize.
- `decltype(x)` will produce a type that’s an lvalue reference. If an rvalue was passed, `decltype(x)` will produce an rvalue reference type.

```cpp
auto f = [](auto x){ return func(normalize(x)); };
auto f = [](auto&& x){ return func(normalize(std::forward<decltype(x)>(x))); };
auto f = [](auto&&... x){ return func(normalize(std::forward<decltype(x)>(x)...)); };
```

# `std::async`

- The `std::thread` API offers no direct way to get return values from asynchronously run functions, and if those functions throw, the program is terminated.
- Thread-based programming calls for manual management of thread exhaustion, oversubscription, load balancing, and adaptation to new platforms.

```cpp
// thread-based
int doAsyncWork();
std::thread t(doAsyncWork);

// task-based
auto future = std::async(doAsyncWork);
```

- doesn’t guarantee that it will create a new software thread. Rather, it permits the scheduler to arrange for the specified function to be run on the thread requesting `doAsyncWork`’s result when more software threads than the system can provide

# **`std::launch::async`**

- **The `std::launch::async` launch policy** means that `f` must be run asynchronously, i.e., on a different thread.
- **The `std::launch::deferred` launch policy** means that `f` may run only when `get` or `wait` is called on the future returned by `std::async` . If neither `get` nor `wait` is called, `f` will never run.
- `std::async`’s default launch policy is neither of these
- Calling `wait_for` or `wait_until` on a task that’s deferred yields the value `std::launch::deferred`, which may cause the coding running forever
- using `std::async` with the default launch policy for a task conditions
    - The task need not run concurrently with the thread calling `get` or `wait`.
    - It doesn’t matter which thread’s `thread_local` variables are read or written.
    - Either there’s a guarantee that `get` or `wait` will be called on the future returned by `std::async` or it’s acceptable that the task may never execute.
    - Code using `wait_for` or `wait_until` takes the possibility of deferred status into account.

# **`std::thread::joinable`**

- Every `std::thread` object is in one of two states: *joinable* or *un-joinable*
- Joinable
    - A joinable `std::thread` corresponds to an underlying asynchronous thread of execution that is or could be running.
    - A `std::thread` corresponding to an underlying thread that’s blocked or waiting to be scheduled is joinable
    - `std::thread` objects corresponding to underlying threads that have run to completion are also considered joinable.
- Un-joinable
    - **Default-constructed `std::thread`s**. Such `std::thread`s have no function to execute, hence don’t correspond to an underlying thread of execution.
    - **`std::thread` objects that have been moved from**. The result of a move is that the underlying thread of execution a `std::thread` used to correspond to (if any) now corresponds to a different `std::thread`.
    - **`std::threads` that have been joined**. After a join, the `std::thread` object no longer corresponds to the underlying thread of execution that has finished running.
    - **`std::threads` that have been detached**. A detach severs the connection between a `std::thread` object and the underlying thread of execution it corresponds to.
- if the destructor for a joinable thread is invoked, execution of the program is terminated. Hence we need to know the thread’s joinability.
- if you use a `std::thread` object, **it’s made un-joinable on every path out of the scope in which it’s defined**. The normal approach is to put that action in the destructor of a local object. ***RAII objects** (Resource Acquisition Is Initialization)*

```cpp
class ThreadRAII {
   public:
     enum class DtorAction { join, detach }; 
     ThreadRAII(std::thread&& t, DtorAction a): action(a), t(std::move(t)) {}
~ThreadRAII()
{
  if (t.joinable()) {
    if (action == DtorAction::join) {
      t.join();
    } else {
      t.detach();
		}
	} 
}
  std::thread& get() { return t; }
private:
  DtorAction action;
  std::thread t;
};
```

- Declare `std::thread` objects last in lists of data members.
- join-on-destruction can lead to difficult-to-debug performance anomalies.
- detach-on-destruction can lead to difficult-to-debug undefined behavior.

# T**hread handle destructor**

- both `std::thread` objects and future objects can be thought of as *handles* to system threads
- **destruction** of a joinable `std::thread` **terminates** your program, because the two obvious alternatives—an implicit join and an implicit detach—were considered worse choices.
- The callee (usually running asynchronously) writes the result of its computation into the **communications channel**, and the caller reads that result using a **future**.
- The shared state is typically represented by a heap-based object, but its type, interface, and implementation are not specified by the Standard.
- The destructor for the **last** future referring to a shared state for a non-deferred task launched via `std::async` blocks until the task completes. In essence, the destructor for such a future does an implicit **join** on the thread on which the asynchronously executing task is running.
- The destructor for all other futures simply destroys the future object. For asynchronously running tasks, this is akin to an implicit **detach** on the underlying thread. For deferred tasks for which this is the final future, it means that the deferred task will never run.
- Future destructors normally just destroy the future’s data members.

# **`void` futures**

- the **reacting** task waits on a condition variable, and the **detecting** thread notifies that `condvar` when the event occurs.
- If the detecting task notifies the `condvar` before the reacting task `wait`s, the reacting task will **hang**.
- The `wait` statement fails to account for spurious wake ups.
- code waiting on a condition variable may be awakened even if the `condvar` wasn’t notified.

```cpp
std::promise<void> p;
void react(); // func for reacting task
void detect() // func for detecting task
{
  std::thread t([] // create thread
                {
									p.get_future().wait(); // suspend t until
									react(); // future is set
						});
        // unsuspend t (and thus
			  // call react)
}
... // here, t is suspended
		// prior to call to react
p.set_value(); 
... // do additional work
t.join(); // make t unjoinable
```

- this design requires no mutex, works regardless of whether the detecting task sets its `std::promise` before the reacting task waits, and
is immune to spurious wake ups.
- the reacting task is truly blocked after making the wait call, so it consumes no system resources while waiting

# **`std::atomic` vs `volatile`**

- Instantiations of this template (`std::atomic<T>`) offer operations that are guaranteed to be seen as atomic by other threads.
- `volatile` is the way we tell compilers that we’re dealing with special memory.

```cpp
volatile int x;
x = 10; 
x = 20;
```

- Compilers are permitted to eliminate such redundant operations on `std::atomics`.

```cpp
std::atomic<int> y(x.load()); // read x 
y.store(x.load()); // read x again
```

- `std::atomic` is useful for concurrent programming, but not for accessing special memory.
- `volatile` is useful for accessing special memory, but not for concurrent programming.

# **Pass by value**

- a member function `addName` might copy its parameter into a private container. For efficiency, such a function should copy lvalue arguments, but move rvalue arguments

```cpp
// two methods, one for l one for r
void addName(const std::string& newName) 
{ names.push_back(newName); }

void addName(std::string&& newName)
{ names.push_back(std::move(newName)); }
```

```cpp
class Widget {
public:
template<typename T>
void addName(T&& newName)
{ names.push_back(std::forward<T>(newName)); } ...
};
```

```cpp
// one method for both l/rvalue
class Widget {
public:
void addName(std::string newName)
{ names.push_back(std::move(newName)); }
... };
```

```cpp
std::string name("Bart");
w.addName(name);
...
w.addName(name + "Jenne");
// 1: one copy for lvalues, one move for rvalues.
// 2: one copy for lvalues, one move for rvalues.
// 3: one copy plus one move for lvalues, and two moves for rvalues.
```

- Consider pass by value only for ***copyable** parameters*.
- Pass by value is worth considering only for parameters that are ***cheap to move***
- You should consider pass by value only for parameters that are ***always copied*.**
- For functions that use construction to copy their parameter(`vector::push_back`), the analysis we saw earlier is complete: using pass by value incurs the cost of an extra move for both lvalue and rvalue arguments.

```cpp
explicit Password(std::string pwd) : text(std::move(pwd)) {}
void changeTo(std::string newPwd) { text = std::move(newPwd); }
// The argument passed to changeTo is an lvalue (newPassword), 
// so when the parameter newPwd is constructed, 
// it’s the std::string copy constructor that’s called. 
// That constructor allocates memory to hold the new password. 
// newPwd is then move-assigned to text, 
// which causes the memory already held by text to be deallocated.
```

```cpp
// better
void changeTo(const std::string& newPwd) {
text = newPwd;
}
```

- Copying parameters via construction may be significantly more expensive than copying them via assignment.

# **`emplace`**

```cpp
vs.push_back(std::string("xyzzy"));

```

- A temporary `std::string` object is created from the string literal `"xyzzy"` as `temp`.
- *`temp`* is passed to the rvalue overload for `push_back`, where it’s bound to the rvalue reference parameter `x`
- A copy of x is then constructed in the memory for the `std::vector`.
- Immediately after `push_back` returns, *temp* is destroyed, thus calling the `std::string` destructor.

```cpp
vs.emplace_back("xyzzy");
vs.emplace_back(50, 'x');
```

- `emplace_back` does exactly what we desire: it uses whatever arguments are passed to it to construct a `std::string` directly inside the `std::vector`. No temporaries are involved
- conditions:
    - The value being added is constructed into the container, not assigned
    - The argument type(s) being passed differ from the type held by the container
    - The container is unlikely to reject the new value as a duplicate
- In the emplacement functions, perfect-forwarding defers the creation of the resource-managing objects until they can be constructed in the container’s memory, and that opens a window during which exceptions can lead to resource leaks.
- you shouldn’t be passing expressions like “new Widget” to `emplace_back` or `push_back` or most any other function
- Emplacement functions may perform type conversions that would be rejected by insertion functions.