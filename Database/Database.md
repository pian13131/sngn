### DBMS

Database management system is software that is used to manage the database.

### Advantages of DBMS

- **Controls database redundancy:** It can control data redundancy because it stores all the data in one single database file and that recorded data is placed in the database. 
- **Data sharing:** In DBMS, the authorized users of an organization can share the data among multiple users.
- **Easily Maintenance:** It can be easily maintainable due to the centralized nature of the database system.
- **Reduce time:** It reduces development time and maintenance need.
- **Backup:** It provides backup and recovery subsystems which create automatic backup of data from hardware and software failures and restores the data if required.
- **multiple user interface:** It provides different types of user interfaces like graphical user interfaces, application program interfaces

### Disadvantages of DBMS

- **Cost of Hardware and Software:** It requires a high speed of data processor and large memory size to run DBMS software. 
- **Size:** It occupies a large space of disks and large memory to run them efficiently.
- **Complexity:** Database system creates additional complexity and requirements. 
- **Higher impact of failure:** Failure is highly impacted the database because in most of the organization, all the data stored in a single database and if the database is damaged due to electric failure or database corruption then the data may be lost forever.

### Architecture

##### 1-Tier

- database is directly available to the user.

##### 2-Tier

- The 2-Tier architecture is same as basic client-server. In the two-tier architecture, applications on the client end can directly communicate with the database at the server side. The user interfaces and application programs are run on the client-side.

##### 3-Tier Architecture

- The application on the client-end interacts with an application server which further communicates with the database system.
- End user has no idea about the existence of the database beyond the application server. The database also has no idea about any other user beyond the application.

### Three schema Architecture

##### Internal Level

- The internal level has an internal schema which describes the physical storage structure of the database. 

##### Conceptual Level

- The conceptual schema describes the structure of the whole database. 
- The conceptual level describes what data are to be stored in the database and also describes what relationship exists among those data.

##### External Level

- An external schema is also known as view schema.
- Each view schema describes the database part that a particular user group is interested and hides the remaining database from that user group.
- The view schema describes the end user interaction with database systems.

### Data model Schema

- The overall design of a database is called schema.
- A database schema is the skeleton structure of the database. It represents the logical view of the entire database. 
- A schema contains schema objects like table, foreign key, primary key, views, columns, data types, stored procedure, etc.

### Types of Database Language

##### Data Definition Language

- **DDL** stands for **D**ata **D**efinition **L**anguage. It is used to define database structure or pattern. 
- It is used to create schema, tables, indexes, constraints, etc. in the database.

##### Data Manipulation Language

- It is used for accessing and manipulating data in a database. It handles user requests.
- CRUD

##### Data Control Language

- It is used to retrieve the stored or saved data.

- **Grant:** It is used to give user access privileges to a database.
- **Revoke:** It is used to take back permissions from the user.

##### Transaction Control Language

- TCL is used to run the changes made by the DML statement. 

- **Commit:** It is used to save the transaction on the database.
- **Rollback:** It is used to restore the database to original since the last Commit.

### ER Model

##### Entity

An entity may be any object, class, person or place. 

- Weak Entity : An entity that depends on another entity called a weak entity. The weak entity doesn't contain any key attribute of its own. The weak entity is represented by a double rectangle.

##### Attribute

The attribute is used to describe the property of an entity. 

- Key Attribute : The key attribute is used to represent the main characteristics of an entity. It represents a primary key. 
- Composite Attribute : An attribute that composed of many other attributes is known as a composite attribute. 
- Multivalued Attribute : An attribute can have more than one value.
- Derived Attribute : An attribute that can be derived from other attribute is known as a derived attribute. 

##### Relationship

- One-to-One
- One-to-many
- Many-to-one
- Many-to-many

### Keys

##### Primary key

- It is the first key which is used to identify one and only one instance of an entity uniquely. 

##### Candidate key

- A candidate key is an attribute or set of an attribute which can uniquely identify a tuple.
- The remaining attributes except for primary key are considered as a candidate key. The candidate keys are as strong as the primary key.

##### Super Key

- Super key is a set of an attribute which can uniquely identify a tuple. Super key is a superset of a candidate key.

##### Foreign key

- Foreign keys are the column of the table which is used to point to the primary key of another table.

### Generalization

- Generalization is like a bottom-up approach in which two or more entities of lower level combine to form a higher level entity if they have some attributes in common. 

### Specialization

- Specialization is a top-down approach, and it is opposite to Generalization. In specialization, one higher level entity can be broken down into two lower level entities. 

### Aggregation

- In aggregation, the relation between two entities is treated as a single entity. In aggregation, relationship with its corresponding entities is aggregated into a higher level entity.

### Functional Dependency

The functional dependency is a relationship that exists between two attributes. It typically exists between the primary key and non-key attribute within a table.

- `Emp_Id → Emp_Name`
- Trivial functional dependency :  A → B has trivial functional dependency if B is a subset of A.
- Non-trivial functional dependency : A → B has a non-trivial functional dependency if B is not a subset of A.

### Normalization

- Normalization is the process of organizing the data in the database.
- Normalization divides the larger table into the smaller table and links them using relationship.
- The normal form is used to reduce redundancy from the database table.

##### 1NF

- A relation will be 1NF if it contains an atomic value.

##### 2NF

- all non-key attributes are fully functional dependent on the primary key

##### 3NF

atleast one of the following conditions for every non-trivial function dependency X → Y.

- X is a super key.

- Y is a prime attribute, i.e., each element of Y is part of some candidate key.

##### Boyce Codd normal form

- BCNF is the advance version of 3NF. It is stricter than 3NF. 
- A table is in BCNF if every functional dependency X → Y, X is the super key of the table. 
- For BCNF, the table should be in 3NF, and for every FD, LHS is super key.

##### 4NF

- A relation will be in 4NF if it is in Boyce Codd normal form and has no multi-valued dependency.
- For a dependency A → B, if for a single value of A, multiple values of B exists, then the relation will be a multi-valued dependency.

##### 5NF

- A relation is in 5NF if it is in 4NF and not contains any join dependency and joining should be lossless. 
- 5NF is satisfied when all the tables are broken into as many tables as possible in order to avoid redundancy. 
- 5NF is also known as Project-join normal form (PJ/NF).