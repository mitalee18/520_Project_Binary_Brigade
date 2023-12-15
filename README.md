# 520_Project_Binary_Brigade

# Client-Server Architecture

This project follows a client-server architecture, where the frontend (client) and backend (server API) components are kept
separate for modular development and scalability. The client, generated with Angular CLI, communicates with the Flask-based
server API using HTTP requests, enabling a seamless interaction between the user interface and the backend functionality.

## Installations and Project Setup
1. Install Angular, Flask, Docker, Docker Compose
2. Clone Github repo https://github.com/mitalee18/520_Project_Binary_Brigade
3. Run "pip install -r requirements.txt" to install Detailed list of libraries present client/requirements.txt and services/requirements.txt

### Versions
1. Angular CLI: 16.2.8
2. Node: 21.1.0
3. Package Manager: npm 10.2.0
4. Python 3.8.10
5. Flask 3.0.0

## Server Setup
1. All files related to the server api are in the services/server directory
2. Docker compose file is in the root directory
3. Docker compose creates images for server-api and database
4. Run `docker-compose up -d --build` in the root directory of this repo ,i.e., where the docker-compose.yml file is located
5. Run `docker-compose exec db psql --username=hello_flask --dbname=hello_flask_dev` to enter the database
    * Run `\dt` to see the tables
    * Run `\q` to exit the database
6. Run `docker-compose down -v ` to remove the containers and volumes
   Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Client Setup
1. All files related to frontend are in client folder
2. Run `ng generate component component-name` to generate a new component.
3. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
4. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
5. Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Relevant Server Files
1. `Dockerfile` - Containerises the flask based server
2. `.env` - Contains the environment variables for the flask based server and postgres database
3. `config.py` - Contains the configuration for the postgres database
4. `run.py` - Runs the flask based server
5. `routes.py` - Contains the routes/endpoints for the flask based server. Implements the error handling using try-catch
6. `models.py` - Contains the models definitions (table schemas) for postgres database
7. `database_handler.py` - Contains the functions to interact with the postgres database
8. `api_handler.py` - Contains the functions that execute associated with the endpoints specified in `routes.py`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## Angular Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
