#### Preparing

##### install Docker

##### clone your app src

##### create image for your app

##### install Azure CLI and login

```
brew update && brew install azure-cli
az login
```

#### Create container registry

Azure Container Registry (ACR) is a private registry for container images

##### Create resource group

```bash
az group create --name <myResourceGroup> --location <eastus>
```

##### Create an Azure Container Registry instance

```bash
az acr create --resource-group <myResourceGroup> --name <acrName> --sku Basic
```

registry name must be unique within Azure

`-sku` is the is for storage setting

##### Log in to the container registry

```bash
az acr login --name <acrName>
```

##### Tag a container image

To use the local image with ACR, the image needs to be tagged with the login server address of your registry. This tag is used for routing when pushing container images to an image registry.

To get the address

```bash
az acr list --resource-group <myResourceGroup> --query "[].{acrLoginServer:loginServer}" --output table
```

To tag

```bash
docker tag <appName> <acrLoginServer>/azure-vote-front:v1
```

##### Push images to registry

With your image built and tagged, push the app image to your ACR instance.

```bash
docker push <acrLoginServer>/azure-vote-front:v1
```

##### List images in registry

```bash
az acr repository list --name <acrName> --output table
```

#### Deploy an AKS cluster

##### Create a service principal

To allow an AKS cluster to interact with other Azure resources, an Azure Active Directory service principal is used

```bash
az ad sp create-for-rbac --skip-assignment
```

mark the *appId* and *password*.

##### Configure ACR authentication

To access images stored in ACR, you must grant the AKS service principal the correct rights to pull images from ACR.

To get the ACR resource ID

```bash
az acr show --resource-group <myResourceGroup> --name <acrName> --query "id" --output tsv
```

To grant the correct access for the AKS cluster to pull images stored in ACR

```bash
az role assignment create --assignee <appId> --scope <acrId> --role acrpull
```

##### Create a Kubernetes cluster

```bash
az aks create \
    --resource-group <myResourceGroup> \
    --name <myAKSCluster> \
    --node-count 1 \
    --service-principal <appId> \
    --client-secret <password> \
    --generate-ssh-keys
```

##### Install the Kubernetes CLI

```bash
az aks install-cli
```

##### Connect to cluster using kubectl

```shell
az aks get-credentials --resource-group <myResourceGroup> --name <myAKSCluster>
```

####  Run applications in AKS

```shell
kubectl apply -f <yamlFileName>
```

##### Test the application

to get the IP

```shell
kubectl get service <appName> --watch
```