#### Dev process

1. **Customer.java** : data class (entity)
1. **CustomerDAO.java** : interface with database
1. **CustomerController.java** : communicate between Web server, DAO and JSAP page (use `@Autowired` to connect each-other, `@RequestMapping` to receive the http request, input is the model and return with the jsp file)
1. **list-customer.jsp** : the view

#### Data Access Object

for interfacing with the database

and we use hibernate

```java
saveCustomer()
getCustomer()
getCustomers()
updateCustomer()
deleteCustomer()
```

CustomerDAO —— SessionFactory —— DataSource —— Database

all these are dependency, so we use DI

##### @Transactional

You do not need care about the `session.beginTransaction()`, `session.getTransaction().commit()`. Spring will do this for you

```java
@Transactional
public List<Customer> getCustomers() {
  Session currentSession = sessionFactory.getCurrentSession();
  Query<Customer> theQuery = currentSession.createQuery("from Customer", Customer.class);
  List<Customer> customers = theQuery.getResultList();
  return customers;
}
```

##### @Repository

for DAO implementations

```java
@Repository
public class CustomerDAOImpl implements CustomerDAO {
  @Autowired
  private SessionFactory sessionFactory;
  @Transactional
	public List<Customer> getCustomers();
}
```

#### loop to print

```html
<c:forEach var="tempCustomer" items="${customers}">
  <tr>
  <td>${tempCustomer.firstName}</td>
  <td>${tempCustomer.lastName}</td>
  </tr>
</c:forEach>
```

#### put the CSS

1. put the css in the resources file `WebContent/resources/css/`
1. `<mvc:resources location="/resources/" mapping="/resources/**">`
1. reference in the html file

you can do this with images, javascript and pdf

#### welcome page

config it in the `web.xml`

it will search in `index.jsp`, `index.html`

you just create either one of the file above

#### @GetMapping & @PostMapping

before we use `@RequestMapping`, in fact it will handle all the request. you can set the limit by `method=RequestMethod.GET`

you can also use `@GetMapping("/api")`

similarly, you should also use `@PostMapping`

*otwm:* you can submit data by both of GET and POST in the client. GET can use query(append to the url). if you want to submit large file(binary data) or large form, you should use POST.

#### @Service

add a CustomerService layer between CustomerController and CustomerDAO

it is the **Service Facade** design pattern

it may handle the different objects from different DAOs and databases (SalesDAO, LicenseDAO)

apply to Service implementation, so you can inject DAO with `@Autowired`

So, for now, you should move the `@Transactional` from CustomerDAO to this CustomerService

#### Create

##### Add button

```html
<input type="button" value="Add Customer" onclick="window.location.href='showFormForAdd'; return false;"/>
```

this will append showFormForAdd to the url, you should handle it in the Controller by return a jsp page

```java
@GetMapping("/showFormForAdd")
public String showFormForAdd(Model aModel) {
  Customer theCustomer = new Customer();
  aModel.addAttribute("customer", theCustomer); // so client can access
  return "customer-form";
}
```

```html
<form:form modelAttribute="customer">
```

##### Save button

```java
@PostMapping("/saveCustomer")//      auto passed in
public String saveCustomer(@ModelAttribute("customer") Customer aCustomer) {
  customerService.saveCustomer(aCustomer);
  return "redirect:/customer/list";
}
```

##### Sort

update in the DAO

you just change the query code as `"from Customer order by lastName"`

#### Update

click link, in the forEach loop

```html

<c:forEach var="tempCustomer" items="${customers}">
  <c:url var="updateLink" value="/customer/showFormForUpdate">
	<c:param name="customerId" value="${tempCustomer.id}"/>
	</c:url>
  <tr>
  <td>${tempCustomer.firstName}</td>
  <td>${tempCustomer.lastName}</td>
  <td><a href="${updateLink}">Update</a></td>
  </tr>
</c:forEach>

```

so each update link will send different link to the back end. it will be like `/customer/showFormForUpdate?customerId=1`

##### pre-populate form

show the old info

```java
@GetMapping("/showFormForUpdate")
public String showFormForUpdate(@RequestParam("customerId") int theId, Model aModel) {
  Customer theCustomer = customerService.getCustomer(theId);
  aModel.addAttribute("customer", theCustomer);
  return "customer-form";
}
```

##### hidden info

in the submit form

```html
<form:hidden path="id"/>
```

so backend know it is which customer

##### saveOrUpdate()

there are `save()` and `update()` in the hibernate, but you can also use `saveOrUpdate()`

update if there is a id input

#### Delete

just like the update, you should add the unique link for each row

##### add the alert

in the link

```html
<a href="${deleteLink}" onclick="if (!(confirm('r u sure?'))) return false">Delete</a>
```

##### inject data into query

```java
Query theQuery = currentSession.createQuery("delete from Customer where id=:customerId");
theQuery.setParameter("customerId", theId);
theQuery.executeUpdate();
```

