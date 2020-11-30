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

- 1-Tier: user --- database

- 2-Tier: User --- UI(client) --- Server(database)

- 3-Tier Architecture: user --- UI --- Application --- database

### Data model Schema

- The overall design of a database is called schema.
- A database schema is the skeleton structure of the database. It represents the logical view of the entire database. 
- A schema contains schema objects like table, foreign key, primary key, views, columns, data types, stored procedure, etc.

### Types of Database Language

##### Data Definition Language

- **DDL** stands for **D**ata **D**efinition **L**anguage. It is used to define database structure or pattern. 
- It is used to create **schema**, **tables**, **indexes**, **constraints**, etc. in the database.

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

- Super key is a set of an attribute which can uniquely identify a tuple. **Super key is a superset of a candidate key**. Super key can contains some **useless** attributes but candidate key cannot

##### Foreign key

- Foreign keys are the column of the table which is used to point to the primary key of another table.

### Constraint

- NOT NULL
- UNIQUE
- PRIMARY KEY
- FOREIGHN KEY
- CHECK

### Join

- 交叉连接(CROSS JOIN) 
- 内连接(INNER JOIN) 
- 外连接(LEFT JOIN/RIGHT JOIN) 
- 联合查询(UNION与UNION ALL) 
- 全连接(FULL JOIN)

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

- **1NF**: Column cannot be devided

- **2NF**: all non-key attributes are fully functional dependent on the primary key **not a part** of PK

- **3NF**: all non-key attributes are only functional dependent on the primary key **not any other** non-PK

### Indexing

- Indexing is used to optimize the performance of a database by minimizing the number of disk accesses required when a query is processed. 
- primary key/candidate key --- data reference
- sorted at PK/CK
- creating cost time
- Covering Index: one single non index column will force a serach in whole table

##### Ordered indices

The indices are usually sorted to make searching faster.

##### Primary Index

- If the index is created on the basis of the primary key of the table, then it is known as primary indexing. These primary keys are unique to each record and contain 1:1 relation between the records.

##### Clustering Index

- In this case, to identify the record faster, we will **group two or more columns to get the unique value** and create index out of them. This method is called a clustering index.

##### Unique index

##### Common index

##### Fulltext index

##### B+Tree Index

- Leaf : pointer to the data
- inner nodes: index
- support =, >, >=, <, <= and like

##### Hash Index

- only support = or <=>

#### Principle of Indexing

`ALTER TABLE <tableName> ADD INDEX <indexName> (<columnList>)`

`ALTER TABLE <tableName> DROP KEY <indexName`

- match from left to right till the range search
- only data with frequence search need index
- high frequence at update should not at index
- the column with little diversity should not add index
- try to expand index instead of add new index
- FK should have index
- Text, image and bit should not add index

#### Left-Prefix Index Rule

- a query can search an **index** efficiently if it provides search terms that match the leading columns of the **index**, in **left**-to-right order
- Up to and including the first inequality or range search condition
- Without any gaps in the column prefix

### B+ Tree

- The B+ tree is a balanced binary search tree. It follows a multi-level index format.
- In the B+ tree, leaf nodes denote actual data pointers. B+ tree ensures that all leaf nodes remain at the same height.
- In the B+ tree, the leaf nodes are linked using a link list. Therefore, a B+ tree can support random access as well as sequential access.
- Get more index in one read from block

##### Internal node

- An internal node of the B+ tree can contain at least n/2 record pointers except the root node.
- At most, an internal node of the tree contains n pointers.

##### Leaf node

- The leaf node of the B+ tree can contain at least n/2 record pointers and n/2 key values.
- At most, a leaf node contains n record pointer and n key values.
- Every leaf node of the B+ tree contains one block pointer P to point to next leaf node.

### B Tree

- every node store data and pointer
- could put the high frequence searched data put at node that close to root

### BinLog

- statement 
- row
- mixed

### Permission table

- user: account - server
- db: account - db
- table
- columns
- host

### MyISAM vs InnoDB

#### Innodb

- ACID
- row lock
- Foreign key
- stored in one single file
- better at IUD operation
- Clustered index, data in leaf

#### MyISAM

- Default 
- table lock

- definition file + datafile + index file
- better at SELECT
- non Clustered index, address in leaf

### Binlog

- statement
- row
- mixed

### Transaction

All ot None

- **A**tomic: cannot be devided
- **C**onsistency: always the same
- **I**solation: should not be affected by other transaction
- **D**urability: changes should be saved

#### Read

- Dirty read: one update, other read, one rollback
- Non-repeatable read: one read, other update, one read
- Phantom read: one read, other update **column**, one read

#### Isolation level

| Level            | Dirty read | Non-repeatable read | Phantom read |
| ---------------- | ---------- | ------------------- | ------------ |
| READ-UNCOMMITTED | √          | √                   | √            |
| READ-COMMITTED   | ×          | √                   | √            |
| REPEATABLE-READ  | ×          | ×                   | √            |
| SERIALIZABLE     | ×          | ×                   | ×            |

### Lock

- Row-level locking
- Table-level locking
- Page-lovel locking



- read lock
- wrtie lock



- optimistic lock 
- pessimistic lock

#### Deadlock

Two or more trasactions hold same resource and requesy to lock others resource

- search tables in same order
- try to lock all need resource
- increase the level of lock

### View

- from different tables
- virtual table
- **create** and delete would not affect original table
- **update** would affect
- should not add or delete data when view are multiple tables



- simple
- safe



### Stored procedure

A **stored procedure** is a group of one or more database statements **stored** in the database's data dictionary and called from either a remote program, another **stored procedure**, or the command line

### Trigger

A database trigger is procedural code that is automatically executed in response to certain events on a particular table or view in a database. 

- Before Insert 
- After Insert 
- Before Update 
- After Update 
- Before Delete 
- After Delete

### Explain

| Select type  | Description                              |
| ------------ | ---------------------------------------- |
| SIMPLE       | 不包含任何子查询或union等查询            |
| PRIMARY      | 包含子查询**最外层**查询就显示为 PRIMARY |
| SUBQUERY     | 在select或 where字句中包含的查询         |
| DERIVED      | from字句中包含的查询                     |
| UNION        | 出现在union后的查询语句中                |
| UNION RESULT | 从UNION中获取结果集                      |

##### index type

- ALL 扫描全表数据
- index 遍历索引
- range 索引范围查找
- index_subquery 在子查询中使用 ref 
- unique_subquery 在子查询中使用 eq_ref
-  ref_or_null 对Null进行索引的优化的 ref
- fulltext 使用全文索引

- ref 使用非唯一索引查找数据

- eq_ref 在join查询中使用PRIMARY KEYorUNIQUE NOT NULL索引关联



### SQL life circle

- server create connection to database
- database get sql
- Interpret sql and execute
- read data to memory and do logic process
- send back to server
- close connection



