# Azure Log Analytics

### Azure Monitor log queries

A Kusto query is a read-only request to process data and return results.

- starting with data source
- flowing through a set of data transformation operators that are bound together through the use of the pipe (`|`) delimiter.

```xquery
StormEvents 
| where StartTime >= datetime(2007-11-01) and StartTime < datetime(2007-12-01)
| where State == "FLORIDA"  
| count
```

The statement starts with a reference to a table called `StormEvents` (the database that host this table is implicit here, and part of the connection information). The data (**rows**) for that table are then filtered by the value of the `StartTime` column, and then filtered by the value of the `State` column. The query then returns the count of "**surviving**" rows.



Of course, you can directly use the filter provided by Azure

##### project: select a subset of columns

##### where: filtering by a Boolean expression

```xquery
StormEvents
| where StartTime > datetime(2007-02-01) and StartTime < datetime(2007-03-01)
| where EventType == 'Flood' and State == 'CALIFORNIA'
| project StartTime, EndTime , State , EventType , EpisodeNarrative
```

##### take: show me n rows

```xquery
StormEvents
| take 5
| project  StartTime, EndTime, EventType, State, EventNarrative
```

##### sort and top

```xquery
StormEvents
| top 5 by StartTime desc
| project  StartTime, EndTime, EventType, State, EventNarrative
```

##### extend: compute derived columns

Create a new column by computing a value in every row:

```xquery
StormEvents
| limit 5
| extend Duration = EndTime - StartTime 
| project StartTime, EndTime, Duration, EventType, State
```

##### summarize: aggregate groups of rows

Count how many events come from each country:

```xquery
StormEvents
| summarize event_count = count() by State
```



#### full version

https://docs.microsoft.com/en-us/azure/kusto/query/tutorial

