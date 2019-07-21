### 1. Prepare app

### 2. Create Azure container registry (ACR)

- #### Create

- ```shell
  az acr create --resource-group <myResourceGroup> --name <acrName> --sku Basic
  ```

- #### Login

- ```shell
  az acr login --name <acrName>
  ```

- #### Tag app image

  - ##### get login server address

  - ```shell
    az acr list --resource-group <myResourceGroup> --query "[].{acrLoginServer:loginServer}" --output table
    ```

  - ##### Tag

  - ```shell
    docker tag <appName> <acrLoginServer>/<appName>:v1
    ```

  - ##### Push

  - ```shell
    docker push <acrLoginServer>/<appName>:v1
    ```

  - ##### Show images in acr

  - ```shell
    az acr repository list --name <acrName> --output table
    ```

### 3. Create K8s cluster

- #### Create service principle

- ```shell
  az ad sp create-for-rbac --skip-assignment
  ```

  To give permission for k8s to access to other Azure resource

  Make a note of the **\<appId\>** and **\<password\>**

- #### Configure ACR authentication

  - ##### Get the \<acrId\>

  - ```shell
    az acr show --resource-group <myResourceGroup> --name <acrName> --query "id" --output tsv
    ```

  - ##### Assign role

  - ```shell
    az role assignment create --assignee <appId> --scope <acrId> --role acrpull
    ```

- #### Create K8s cluster

- ```shell
  az aks create \
      --resource-group <myResourceGroup> \
      --name <myAKSCluster> \
      --node-count 1 \
      --service-principal <appId> \
      --client-secret <password> \
      --generate-ssh-keys
  ```

- #### Connect to cluster

- ```shell
  az aks get-credentials --resource-group <myResourceGroup> --name <myAKSCluster>
  ```

### 4. Deploy app

- #### Update deployment yaml file

  Make sure the images reference name in the yaml file maches with the images in ACR

- #### Deploy

- ```shell
  kubectl apply -f <deployment>.yaml
  ```

### 5. Update app

- Update and rebuild in local
- Push to ACR
- Update with `kubectl set`

