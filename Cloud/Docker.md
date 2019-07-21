#### Why?

easy to install and run app in every computer

#### What?

a platform or ecosystem around creating and running containers

#### Container vs Image

just like Object vs Class

**Image** has all deps and config to run a program

**Container** is an instance of an image

#### Docker Client vs Docker Server

**Docker Client** is the tool we used to send command to Docker Server

**Docker Server** is to create, run containers

#### Docker Hub

`docker run hello-world`

docker will first check if local has such image, if not, it will look up in the Docker Hub

#### Container

##### Namespacing

isolating resources per process

##### Control Groups

limit amount of resources used per process

##### Resources

RAM, Network, CPU

process + isolated resource + kernel = container

#### Virtual Machine

when you install Docker, you installed a Linux Virtual Machine. All codes running in that Virtual Machine. So you do need to worry about the different platform

#### CMD

##### `docker run <image name>`

creating and run container, = `docker create <image name>` + `docker start <image name>`

##### `docker create <image name>`

this will return a lang id, you can then run this container by `docker start -a <id>`. if there is no `-a`, there will no log in the terminal

##### `docker run <image name> command`

`command` is the override command you want to instead of run

##### `docker ps`

list all running containers

##### `docker ps --all`

list all containers created

**when you run the default command, you cannot change it**

##### `docker system prune`

remove stopped containers, networks, dangling images and build cache

##### `docker logs <id>`

to show output in some container

##### `docker stop <id>` & `docker kill <id>`

if container did not feedback with stop, docker will kill it

**when you run a database inside of the container, you cannot access to it outside of the container**

##### `docker exec -it <id> <command>`

execute an additional command to a container

`-it` means you can write the command directly. if not, the input port will run behind the sense

**each process has three port `STDIN`, `STDOUT` and `STDERR`. If you want to type in to command, you need to connect to its `STDIN`(`-i`), if you want to show the output of that process, you need to connect to its `STDOUT`**

`-t` is just to optimize the input terminal

##### `docker exec -it <id> <command> sh`

get into the container with command processors

you can also add it when you run a new container

just do not forget the `-it`

#### Create Image

##### Dockerfile

config for the container

given a computer without OS and try to install Chrome

then pass it to the docker client then the docker server

- specify base image
- commands to install additional programs
- commands to run

```dockerfile
# use existing docker image as base
FROM alpine # install OS
# download and install dependency
RUN apk add --update redis # install Chrome
# tell image what and when it starts
CMD ["redis-server"] # run Chrome
```

your new image is just like a son-class inherited from the father-class (alpine)

#### `docker build .`

after the build, there will be image in the cache. Next time if you want to create a same image, or just in the process, the cache can be used

however, when the install oder changed, the cache may not be used

after you build a image, using the id of that image, you can create the container of that image with `docker run <id>`

#### Tagging Image

to avoid using the image id

when you use the image created by community, you can just use the name of it

when you want to use the image of your own, you should use

```bash
docker build -t yourDockerId/projectName:version .
```

```bash
docker run yourDockerId/projectName
```

btw, you can also use alpine directly, and install all your app in the sh

```bash
docker run -it alpine sh
// install your stuff
docker commit -c 'CMD ["redis-server"] <id>'
```

#### NodeJS app with Docker

- you can check different base image in docker website

- you can choose a pre-installed node base

- by default, when you build your image, all your files are not available. So you need `COPY ./yourFolder ./containerFolder`

- by default, you cannot access to the localhost of container, so you need **container port mapping**. Even though in the container, it can access it `docker run -p yourPort:containerPort <image name>`
- you should set the work folder with `WORKDIR`
- when you rebuild, you only want to change the src code, instead of `npm install` all files, you should only copy `package.json` file. then `npm install`, then `COPY` again

```dockerfile
FROM node:alpine # alpine means the smallest image

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
```

```bash
docker build -t username/simpleweb .
docker run -p 8080:8080 username/simpleweb
```

#### Multiple Container

many node servers connected to one single Redis server

#### Docker Compose

- separate CLI

- used to start multiple containers at the same time

- automates some of the long-winded args we passing to `docker run`

**docker-compose.yml**

```yml
version: '3'
services:
	redis-server: # container name
		image: 'redis' # use redis as base image
	node-app:
		build: . # use the Dockerfile to build
		ports:
			- "8080:8080" # - means array; mapping ports
```

Docker Compose will connect their net automatically

in the node app, you just set the host as `redis-server`, which is defined in the yml file

when you run those cmd, you have to make sure you are in the folder with yml file

##### `docker-compose up -d`

just like `docker run myimage`

`-d` means in background

##### `docker-compose up --build`

will rebuild and run

##### `docker-compose down`

will shut and remove all container involved

##### `docker-compose ps`

status

##### auto restart

**no**: never restart

**always**: always restart

**on-failure**: restart if stops with an error code

**unless-stopped**: always restart unless we forcibly stop it

```yaml
version: '3'
services:
	redis-server:
		image: 'redis'
	node-app:
		restart: always # policy
		build: .
		ports:
			- "8080:8080"
```

#### Work Flow

feature -> master -> TravisCI -> AWS Hosting

#### Docker Volumes

set reference in the container, which refers to local folder

```bash
docker run -v /app/node_modules -v $(pwd):/app <id>
```

​           placeholder        mapping

every time container try to access the /app, it will access to the local folder, except the node_modules folder

so when you change code in local, it will affect the code in the container

we can do this in docker compose

```yaml
version: '3'
services:
	web:
		build:
			context: .
			dockerfile: Dockerfile.dev # override own dockerfile
		ports:
			- "8080:8080"
		volumes:
			- /app/node_modules # set the bookmark, not reference, cuz we already installed them with npm install
			- .:/app # reference
			
```

#### Nginx

difference between dev and production

`npm run build` -> start nginx

only during the build, should we need installing dependency

you can create separate container for nginx

```dockerfile
# build phase
FROM node:alpine as builder # label
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# run phase
FROM nginx
EXPOSE 80 # port map, can only work for beanstalk
# copy built stuff above
COPY --from=builder /app/build /usr/share/nginx/html
```

##### `default.conf`

set the routing

nginx can even check/change the http request url, so to change the requested servers

```
upstream client {
	server client:3000;
}

upstream api {
	server api:5000;
}

server {
	listen 80;
	
	location / {
		proxy_pass http://client;
	}
	
	location /sockjs-node {
		proxy_pass http://client;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "Upgrade";
	}
	
	location /api {
		rewrite /api/(.*) /$1 break;
		proxy_pass http://api;
	}
}
```



#### Continuous Integration and AWS

##### Github

set all your code in GitHub

##### Travis CI setup

- tracis-ci.org

- authorize with GitHub

- connect to your repo

- set up YML to instruct travis `.travis.yml`

- ```yaml
  sudo: required
  services:
  	- docker
  	
  before_install:    # set label, just convention     just for test&dev
  	- docker build -t yourDockerName/docker-react -f Dockerfile.dev .
  	
  script:		#                                            return to cmd
  	- docker run yourDockerName/docker-react npm run test -- --converage
  ```

- push to GitHub, Travis will run automatically

##### AWS

- elastic beanstalk

- create new application

- create new web environment

- choose Docker platform (there will be a sample app)

- ```yaml
  sudo: required
  services:
  	- docker
  	
  before_install:    # set label, just convention     just for test&dev
  	- docker build -t yourDockerName/docker-react -f Dockerfile.dev .
  	
  script:		#                                            return to cmd
  	- docker run yourDockerName/docker-react npm run test -- --converage
  	
  deploy:
  	provider: elasticbeanstalk
  	region: "us-west-2" # the region of your server
  	app: "docker-react" # app name
  	env: "Docker-env" # env you created
  	bucket_name: "bucketName" # check in the service
  	bucket_path: "docker-react"
  	on:
  		branch: master # push code to master, deploy it
  	access_key_id: $AWS_ACCESS_KEY
  	secret_access_key:
  		secure: "$AWS_SECRET_KEY"
  ```

- IAM, add User, programmatic access, attach existing policies(beanstalk)
- set env variables in Travis with your access key id and secret key, so you can access in the `.travis.yml` file
- push to GitHub 



*with this work flow, all you need do is just coding in the branch, and merge it to master, all the rest stuff was automatically*

*in fact, you do not need have to use docker, but it save much time and avoid much work*



#### CI with Docker Hub

local -> GitHub -> Travis -> DockerHub -> AWS

*you can push images to DockerHub just like GitHub*

##### `Dockerrun.aws.json`

used to connect each image to name and hostname

##### AWS Elastic Cache

Redis

##### AWS Relational Database Servise

Postgres

##### Security Group

connect each AWS component together

