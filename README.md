# 520_Project_Binary_Brigade
CS520 project repo

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
