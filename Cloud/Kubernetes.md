#### **What**

System for running many different containers over different machines

#### Why

To run different containers with different images

#### minikube

create little cluster for dev

for managing VM

local ONLY

#### kubectl

for managing containers in the node

#### virtualbox

To make a VM that will be your single node



*kubernetes appears after you put all your images on the hub*

#### apiVersion

An object definition in Kubernetes requires an `apiVersion` field. When Kubernetes has a release that updates what is available for you to use—changes something in its API—a new `apiVersion` is created.



#### config

##### `client-pod.yaml`

```yaml
apiVersion: v1 # define different set of 'objects' we can use
kind: Pod # the type of object, for run a container
metadata:
	name: client-pod
	labels:
		component: web
	spec:
		containers:
			-	name: client
				image: yourId/imageName
				ports:
					-	containerPort: 3000
			
```

##### `client-node-port.yaml`

```yaml
apiVersion: v1
kind: Service # to set up networking for container
metadata:
	name: client-node-port
	spec:
		type: NodePort # sub type for service, exposes a container to outside world
		ports:
			- port: 3030 # for another pod to access
				targetPort: 3000 # send all trafic into selected pod's port
				nodePort: 31515 # for browser
		selector:
			component: web # the label of client pod
```

pass this two config file into kubectl

it will create two objects

##### Object

it is not just a simple container, but also include other config for this container

**Node(VM)** { **Pod** { **Container**

##### Pods

runs one or more closely related containers

##### Services

sets up networking in a cluster

#### CMD

##### `kubectl apply -f <filename>`

apply config

you also apply a whole folder

##### `kubectl get pods`

show pods

##### `kubectl get services`

show services

##### How to access the final app?

##### `minikube ip`

kubeproxy —> service-nodeport —> pod

to get the address

do not forget the port number



*pretty magical, when you already have the images on the Docker hub, you only need the two simple config file, then you build a web app*



Master will always handle different computers of VM, to make sure there are required number of Nodes running. Even you kill one of them manually.

the requirement provided by the deployment file, which we create above.

you can add, remove and update as you want

*it is just like we go to another more abstract and higher level in the while process. You just tell kubernetes what and how many you want, it will handle the rest part*

*you do not even need care about the languages of src, really magical*

##### Declarative Deployment VS Imperative Deployment

kubernetes can do both ways

#### Update

update the original config file, kbnt will update the related nodes as well

- name
- kind
- image

`kubectl describe <object type> <object type>`

you can only update 4 specs

#### Deployment Object

new Object

maintains a set of **identical** pods, ensuring that they have the correct config and right number exists

easy change

provides a Pod template

```yaml
apiVersion: apps/v1
kind: Deplyment
metadata:
	name: client-deployment
spec:
	replicas: 1 # numbers
	selector: # 
		matchLabels:
			component: web
		template:	# set the template for pod
			metadata:
				labels:
					component: web
			spec:
				containers:
					- name: client
						image: appname
						prots:		
```



`kubectl delete -f <file namme>`

delete the object created by the such config file

thanks for the service, each pod has different ip. It also help to make sure after we changed the pod, its IP still remain the same

for now, you can change other params

when you update your images on the DockerHub, you should also update those pods used it. At this time, config file did not changed. At this time, you should use imperative deployment. Attach the version number

```bash
kubectl set image <object_type>/<object_name> <container_name> = <new image>
```

#### Multiple Dockers

change Docker CLI to non-default docker, created by Node

```bash
eval $(minikube docker-env)
```

it only works for current terminal windows

##### why?

- use all debugging in Docker CLI
- kill containers to test kubernetes
- delete cached images in the node

#### Production

##### NodePort Service

exposes a set of pods to outside world

most of the time used only for dev

##### ClusterIP Service

exposes a set of pods to objects in same node(cluster)

##### Ingress Service

the only entry for the whole node for outside of the node

it may be more like a smart router, instead of service



you can put service and pod config into one single file with `---`

but not recommend

#### Access Service

Kubernetes supports 2 primary modes of finding a Service - environment variables and DNS. The former works out of the box while the latter requires the [CoreDNS cluster addon](http://releases.k8s.io/master/cluster/addons/dns/coredns).

##### Environment Variables

```shell
kubectl exec my-nginx-3800858182-jr4a2 -- printenv | grep SERVICE
```

##### DNS



##### Volumes for database

Volumes: container can access filesystem outside of itself, that is the Volumes in Docker

to make sure when one container of database crashed, make sure another new created container access to the same volume in the same pod

##### Volumes Object in kubernetes (Persistent Volumes)

the Volumes is outside of the pod, not only the container. That is what we really want

##### Persistent Volumes Claim vs Persistent Volumes

Claim provides the option you can choose

it is not the storage

```yaml
apiversion: v1
kind: PersistentVolumeClaim
metadata:
	name: database-persistent-volume-claim
spec:
	accessModes:
		- ReadWriteOnce # can only be used by a single node
	resources:
		requests:
		storage: 2Gi
```

With this claim, kubernetes will reserve a block of storage on your disk

If you run this on cloud, kubernetes can even figure out which cloud storage provider should be used.

you should add this into the deployment of database config file

```yaml
volumes:
	- name: postgres-storage
		persistentVolumeClaim:
			claimName: database-persistent-volume-claim
```

with this, all different database pods will access to the same volume

##### env variables

```yaml
env:
	- name: REDIS_HOST
		value: redis-cluster-ip-service
		.
		.
		.
```

set this in the template of deployment

##### encoded

##### secrets object

used for secret password

```bash
kubectl create secret generic <secret_name> --from-literal key=value
```

```yaml
 - name: PGPASSWORD
 	valueFrom:
 		secretKeyRef:
 			name: secretName
 			key: keyName
```

##### LoadBalancer Service

Legacy way of getting network traffic into a cluster

#### Ingress-Nginx

ingress config -> ingress controller + routes traffic -> service

```yaml
apiversion: extensions/vibeta1
kind: Ingress
metadata:
	name: ingress-service
	annotations:
		kubernetes.io/ingress.class: nginx
		nignx.ingress.kubernetes.io/rewrite-target: /$1 # change the url request
spec:
	rules:
		- http:
				paths: # route to client or server
					- path: /?(.*)
						backend:
							serviceName: client-cluster-ip-service
							servicePort: 3000
					- path: /api/?(.*)
						backend:
							serviceName: server-cluster-ip-service
							servicePort: 5000
		
```

#### Helm

Helm helps you manage Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.

**Tiller** is the service that actually communicates with the Kubernetes API to manage our Helm packages.

CMD we issue -> Helm Client -> Tiller server

just like the home-brew in your kubernetes cluster

you should use it to install ingress-Nginx

#### Role Based Access Control

Resources + verbs

limits who can access and modify objects in our cluster

we should give till such permission

##### User Accounts

as a person

##### Service Accounts

as a pod

Like the monitor app

tiller

##### ClusterRoleBinding

authorize an account to do a set of actions in **whole cluster**

##### RoleBinding

authorize an account to do a set of actions in **single namespace**

#### ConfigMap Object

A ConfigMap is a dictionary of key-value pairs that store configuration settings for your applications.

#### Probes

##### Liveness

when should k8s restart this pod

##### Readiness

when should k8s allow this pod receive traffic