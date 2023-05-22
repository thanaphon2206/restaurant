# Reservation-api

# How to Run
#### For Manual Input Mode

Open terminal and navigate (`cd`) to this folder and type commands:

```bash
1. npm install
2. npm install yarn
3. yarn dev or npm start
```

#### For run Docker Mode

Please install Docker service first and Open terminal and navigate (`cd`) to this folder and type commands:

```bash
1. docker pull node:18-alpine
2. docker-compose up -d // start service
3. docker-compose down // for stop service
```

## Reservation Project Structure

```
Reserve\         
 |--logs\                       # Log files             
 |--src\
    |--config\                  # module
    |--controllers\             # Route Handlers/Controllers for API endpoints
       |--booking\              # Controller management
    |--middleware\              # Custom express middlewares
    |--routes\                  # Definition of API endpoints
    |--services\                # Core logic reservation
    |--utils\                   # Helpers/Utility classes and functions
    |--index.js                 # App entry point
 |--.env                        # Environment variables
 |--.gitignore                  # Tooling config file
 |--package-lock.json           # Dependency managment
 |--package.json                # Dependency managment
 |--.env                        # Config environment
 |--.env.example                # Config environment
 |--.ecoststem.config.json      # production mode
 |--README.md                   # About
 ```

 ## API Documentation

#### Entry Endpoint

<details>
<summary><code>GET</code> <code>http://localhost:6699/<b></b></code> <code>(Displays introduction about the API)</code></summary>

##### Responses
> | http code     | content-type          | response                                   |
> |---------------|-----------------------|-------------------------------------------               |
> | `200`         | `text/html`           |`Welcome to Restaurant Table Reservation System's API! 🎉`|

#### Intitialze Restaurant

<details>
<summary><code>POST</code> <code>http://localhost:6699/api/restaurant/initialize/</code> <code>(Displays all restaurant tables)</code></summary>

##### Responses
> | http code     | content-type          | response                                   |
> |---------------|-----------------------|-------------------------------------------               |
> | `201`         | `application/json`           |`"status": { "code": 0,"message": "Success"}, "data": {"restaurant": "b","tables": 5}`|
> | `400`         | `application/json`           |`"status": { "code": 0,"message": "Success"}, "data": not found`|
> | `999`         | `application/json`           |`"status": { "code": 0,"message": "Success"}, "data": ServiceNotAvailable`|

##### Example cURL
> ```javascript
>  curl -i -H 'Accept: application/json' http://localhost:6699/booking/initialize/ req.body { restaurant: "example b, table: 5" }
> ```
</details>
