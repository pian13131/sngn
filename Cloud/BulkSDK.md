### Azure Cosmos DB bulk executor library

**To perform bulk operations in Azure Cosmos DB through bulk import and bulk update APIs**

#### Import

##### Set up the Document client

```java
ConnectionPolicy connectionPolicy = new ConnectionPolicy();
connectionPolicy.setMaxPoolSize(1000);
DocumentClient client = new DocumentClient(
   HOST,
   MASTER_KEY, 
   connectionPolicy,
   ConsistencyLevel.Session)
```

You can config more setting with client object

##### Build the bulkExecutor with bulkExecutorBuilder

```java
Builder bulkExecutorBuilder = DocumentBulkExecutor.builder().from(
  client,
  DATABASE_NAME,
  COLLECTION_NAME,
  collection.getPartitionKey(),
  offerThroughput)
  
DocumentBulkExecutor bulkExecutor = bulkExecutorBuilder.build()
```

##### import into an Azure Cosmos DB container

```java
BulkImportResponse bulkImportResponse = bulkExecutor.importAll(documents, false, true, null);
```

The response object contains many info for the imported document, such as number, time, error, etc

#### Update

##### Defines the update items

```java
SetUpdateOperation<String> nameUpdate = new SetUpdateOperation<>("Name","UpdatedDocValue");
UnsetUpdateOperation descriptionUpdate = new UnsetUpdateOperation("description");
ArrayList<UpdateOperationBase> updateOperations = new ArrayList<>();

updateOperations.add(nameUpdate);
updateOperations.add(descriptionUpdate);

List<UpdateItem> updateItems = new ArrayList<>(cfg.getNumberOfDocumentsForEachCheckpoint());

IntStream.range(0, cfg.getNumberOfDocumentsForEachCheckpoint()).mapToObj(j -> {
 return new UpdateItem(Long.toString(prefix + j), Long.toString(prefix + j), updateOperations);
}).collect(Collectors.toCollection(() -> updateItems));
```

##### Update all document

```java
BulkUpdateResponse bulkUpdateResponse = bulkExecutor.updateAll(updateItems, null)
```

Similarly, the response also contains many info for the operation

