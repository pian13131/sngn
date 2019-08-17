### Create Database

- `create database <database-name>;`

### Create Table

##### Data type

- INT
- DECIMAL(M, N)
- VARCHAR(l)
- BLOB
- DATE
- TIMESTAMP

##### Create table

```mysql
CREATE TABLE student (
	student_id INT PRIMARY KEY, # can be generated
    name VARCHAR(20) NOT NULL,
    major VARCHAR(20) UNIQUE
);
```

```mysql
CREATE TABLE student (
	...
    major VARCHAR(20) DEFAULT 'undecided'
);
```

```mysql
CREATE TABLE student (
	...
    mgr_id INT,
    FOREIGN KEY(mgr_id) REFERENCES employee(emp_id) ON DELETE SET NULL   
);
```

```mysql
# multiple primary keys
CREATE TABLE works_with (
    emp_id INT,
    client_id INT,
    PRIMARY KEY (emp_id, client_id),
    FOREIGN KEY(emp_id) REFERENCES employee(emp_id) ON DELETE SET CASCADE,
    FOREIGN KEY(client_id) REFERENCES client(client_id) ON DELETE SET CASCADE
);
```

##### Modify table

```mysql
DESCRIBE student;
DROP TABLE student;
ALTER TABLE student ADD gpa DECIMAL(3, 2); # add column
ALTER TABLE student DROP COLUMN gpa; # delete column
```

``` mysql
# add foreign key
ALTER TABLE employee
ADD FOREIGN KEY(branch_id) # name inner
REFERENCES branch(branch_id) # name outside
ON DELETE SET NULL;
```

### Operations

##### Insert

```mysql
INSERT INTO student VALUES(1, 'Jack', 'Biology');
INSERT INTO student(student_id, name) VALUES(2, 'Kate');
```

##### Select

```mysql
SELECT *
FROM student;
```

```mysql
SELECT name, major
FROM student
ORDER BY name DESC; # ... ASC
```

```mysql
...
ORDER BY name, major
LIMIT 2
WHERE name IN ('Claire', 'Kate', 'Mike');
```

```mysql
SELECT DISTINCT branch_id
...
```

##### Update

```mysql
UPDATE student
SET major = 'Bio'
WHERE major = 'Biology'; # match rule, you can use <,>,<=,>=,<>,AND,OR,IN
```

##### Delete

```mysql
DELETE FROM student
WHERE student_id = 5;
```

### Function

```mysql
# count
SELECT COUNT(emp_id)
FROM empolyee;
```

```mysql
# average
SELECT AVG(salary)
FROM employee;
```

```mysql
# sum
SELECT SUM(salary)
...
```

```mysql
# group
SELECT COUNT(sex), sex
FROM employee
GROUP BY sex;

SELECT SUM(total_sales), emp_id # how much sales for each emp
FROM work_with
GROUP BY emp_id;
```

```mysql
# wild card
# % any number of chars
# _ one char
SELECT *
FROM client
WHERE client_name LIKE '%LLC';
```

### Union

```mysql
# union same number and same type of cols
SELECT first_name AS Company_Names # change name
FROM employee
UNION
SELECT branch_name
FROM branch;
```

### Join

```mysql
# find all branches and names of their managers
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
JOIN branch
ON employee.emp_id = branch.mgr_id;
```

```mysql
# Left join
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
LEFT JOIN branch
ON employee.emp_id = branch.mgr_id;
# all employees will be included
```

```mysql
# Right join
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
RIGHT JOIN branch
ON employee.emp_id = branch.mgr_id;
# all branches will be included
```

```mysql
# Full join
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
FULL JOIN branch
ON employee.emp_id = branch.mgr_id;
# all branches and employees will be included
```

### Nested Query

```mysql
# find names of all employees who have sold over 30000 to a single client
SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN ( # you can use other comparing sign as well
	SELECT works_with.emp_id
	FROM works_with
	WHERE works_with.total_sales > 30000;
);
```

### On Delete

To handle issue when delete happen related with FK.

```mysql
# when you delete some employee, the related id in other table set to NULL
ON DELETE SET NULL
```

```mysql
# ..., delete the entire row in other tables
ON DELETE SET CASCADE
# most of time, this happen when this FK is part of PK
```

### Trigger

```mysql
DELIMITER $$
CREATE
	TRIGGER my_trigger BEFORE INSERT
	ON employee
	FOR EACH ROW BEGIN
		INSERT INTO trigger_test VALUES(NEW.first_name);
	END$$
DELIMITER ;
```

```mysql
...
IF NEW.sex = 'M' THEN
	...
ELSEIF ... THEN
	...
ELSE
	...
END IF;
...
```

