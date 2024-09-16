This project is in the experimental stage. I wanted to build a service that would hopefully be able to detect hateful reddit users attempting to spread propaganda before they achieved a critical mass. 


For this to work you are going to need to have [nodejs](https://tecadmin.net/install-latest-nodejs-on-fedora/) and [docker](https://docs.docker.com/install/linux/docker-ce/fedora/) installed. Then you can use these commands to work on the project. 

```
# Download the project from github
git clone git@github.com:bag-man/spotter.git   

# Change directory into the project
cd spotter                                     

# Install the dependencies 
npm i  

# Launch a postgres database and redis in a docker container
docker run --restart always -d -p 5432:5432 --name spotter-postgres -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=db_spotter -e POSTGRES_USER=spotter postgres:latest   
docker run --restart always -d -p 6379:6379 --name redis redis

# Copy the configuration template to the live configuration
cp .env.schema .env  

# Compile the project
npm run build

# Start the project
npm run start

# Or alternatively build & start the project and watch for changes
npm run dev

# Then open up the project and go to
http://localhost:3000/<reddit_user>

# Download bad users to the database
npm run seed
```
