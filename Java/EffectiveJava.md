#### 1 Using static factory method

2 Consider a builder when faced with many constructor parameters

```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8) .calories(100).sodium(35).carbohydrate(27).build();
```

3 Enforce the singleton property with a private constructor or an enum type

```java
public class Elvis {
  private static final Elvis INSTANCE = new Elvis(); 
  private Elvis() { ... }
  public static Elvis getInstance() { return INSTANCE; }
  public void leaveTheBuilding() { ... } 
}
```

4 Enforce noninstantiability with a private constructor

- prevents the class from being subclassed.
- you’ll want to write a class that is just a grouping of static methods and static fields.

5 Prefer dependency injection to hardwiring resources

- do not use a singleton or static utility class to implement a class that depends on one or more underlying resources whose behavior affects that of the class
- do not have the class create these resources directly.

6 Avoid creating unnecessary objects

