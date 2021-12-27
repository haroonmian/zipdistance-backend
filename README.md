# zipdistance-backend

# To run this locally
Install Postgress https://www.postgresql.org/
setup user for postgres local host server (127.0.0.1) with following credentials: <br />
username: postgres <br />
password: password

# Run db migration
After server setup you need to run migration files to create tables in database. For that you will need to open this project in terminal and write following commands: <br />
npx sequelize-cli db:migrate

# Add data using Seeder
This app use zipcodes from zipcodes table, so we also need to seed the data into the table using below command: <br />
npx sequelize-cli db:seed:all

# Ready to go
Now we just need to run 'npm run dev' to start a local server on 4000
