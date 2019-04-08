docker run \
    --name postgres \
    -e POSTGRES_USER=raphaelpassos \
    -e POSTGRES_PASSWORD=underthebridge \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps \
docker exec -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ------ MONGODB

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'raphaelpassos', pwd: 'underthebridge', roles: [{role: 'readWrite', db: 'herois'}]})"


## ---- AULA 2 DO MÓDULO 7 

docker exec -it de8e2caa1f56 mongo -u raphaelpassos -p underthebridge --authenticationDatabase herois


## ----- CONFIGURAR MONGOCLIENT



