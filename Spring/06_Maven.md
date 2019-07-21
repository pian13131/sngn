#### About Maven

- project management tool

- download the dependency JAR files according to a XML config file (`pom.xml`)

*just like the package.json and npm, haha*

- also help you with the standard directory structure

##### pom.xml

**project meta data:** version, output file type, project name

**dependencies:** list of dependencies

project coordinates(GAV)

```html
<groupId>com.luv2code</groupId>
<artifactId>mycoolapp</artifactId>
<version>1.0.1</version>
```

```html
<dependency>
	<groupId>com.luv2code</groupId>
	<artifactId>mycoolapp</artifactId>
	<version>1.0.1</version>
</dependency>
```

plug ins: additional tasks to run, test

*stupid part, you have to copy and paste by yourself, damn*

`search.maven.org`

#### Starter project

Archetype

```
maven-archetype-quickstart
maven-archetype-webapp
```

#### Maven repository

- check the local repository
- check the Maven Central Repository

if you delete by mistake, use update project in maven

##### Additional repository

if you want to add some package from other repository, you should add this repository to xml file

```html
<repository>
  <id>atlassian</id>
  <name>Atlassian repository</name>
  <url>https://aksdlasndlasmdlasm</url>
</repository>
```

##### private repository

