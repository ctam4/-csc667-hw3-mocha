# HW3 by mocha team

## step 1: install all dependencies

```sh
$ cd frontend/ && npm install
$ cd backend/api/ && npm install
$ cd backend/fileServer/ && npm install
$ cd backend/gateway/ && npm install
```

## step 2: generate self-signed certs

```sh
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert -subj '/'
```

## step 3: start all servers in parallel

```sh
$ docker-compose up
```

If `docker-compose` fails to connect to the Docker daemon, ensure the Docker daemon is up (`sudo dockerd`). Althernatively, you can use npm / pm2.

- API HTTP: `http://localhost:6000/`
- API HTTP: `https://localhost:6443/`
- FileServer HTTP: `http://localhost:4000/`
- FileServer HTTP: `https://localhost:4443/`
- Gateway HTTP: `http://localhost:5000/`
- Gateway HTTP: `https://localhost:5443/`
