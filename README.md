# Deno REST API

> Allow to test [Deno](https://deno.land/) with basic Rest API

> Created and maintained by veben


## I. Requirements

### 1. MongoDb configuration
Create a .env file with following content:
```
DB_NAME=<database name>
DB_HOST_URL=<connection string>
```

### 2. Deno installation
1. Install **Deno**
```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```
2. Add following lines to `~.zshrc` file
```
# For Deno
export DENO_INSTALL="/home/veben/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```
3. Check version
```sh
deno -V
```

## II. Launch server
```shell script
deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable ./main.ts
n
```

## III. Test API
### 1. Create a dinosaur
```shell script
curl -X POST --header "Content-Type: application/json" --data '{
  "name": "stegosaurus",
  "weight": 6000,
  "kingdom": "animalia",
  "phylum": "chordata",
  "clade": "dinosauria"
}' "http://localhost:5000/api/dinosaur"
```
### 2. Get all dinosaurs
```shell script
curl -X GET "http://localhost:5000/api/dinosaur"
```
