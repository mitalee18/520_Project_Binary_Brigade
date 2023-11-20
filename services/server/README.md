### Relevant Files
1. `Dockerfile` - Containerises the flask based server
2. `.env` - Contains the environment variables for the flask based server and postgres database
3. `config.py` - Contains the configuration for the postgres database
3. `run.py` - Runs the flask based server
4. `routes.py` - Contains the routes/endpoints for the flask based server. Implements the error handling using try-catch
5. `models.py` - Contains the models definitions (table schemas) for postgres database
6. `database_handler.py` - Contains the functions to interact with the postgres database
7. `api_handler.py` - Contains the functions that execute associated with the endpoints specified in `routes.py`

### Setup
1. Install Docker
2. Install Docker Compose
3. Clone this repo
4. Run `docker-compose up -d --build` in the root directory of this repo ,i.e., where the docker-compose.yml file is located
5. Run `docker-compose exec db psql --username=hello_flask --dbname=hello_flask_dev` to enter the database 
   * Run `\dt` to see the tables
   * Run `\q` to exit the database
6. Run `docker-compose down -v ` to remove the containers and volumes
7. Navigate to http://localhost:8000/fetch to fetch the data from the database
8. Send post requests to http://localhost:8000/add to add entries to the database
9. Test