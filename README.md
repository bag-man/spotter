```
git clone git@github.com:bag-man/spotter.git
cd spotter
npm i

docker run -d -p 5432:5432 --name spotter-postgres -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=db_spotter -e POSTGRES_USER=spotter postgres:latest
cp .env.schema .env 

npm run build
npm run start

npm run dev
```
