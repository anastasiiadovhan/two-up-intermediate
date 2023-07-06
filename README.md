# two-up-intermediate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Install dependencies

Run `npm intall`

## Setting up the database 
This application utilizes MySQL for its database. To set up the database:

1. Install MySQL on your local machine and start the MySQL service.
2. Configure your localhost connection in MySQLWorkbench and import the provided database.sql file.
   
Follow these steps to import the database using MySQL Workbench:

1. Launch MySQL Workbench.
2. Open the SQL editor by clicking on your localhost connection.
3. Navigate to the 'Server' menu, and select 'Data Import'.
4. Opt for 'Import from Self-Contained File'.
5. Click the '...' button to navigate through your system and select the database.sql file.
6. Under 'Default Schema to be Imported To', click the 'New...' button and assign a name to your schema (this will be the name of your new database).
7. To initiate the import process, choose the 'Start Import' button situated at the bottom right.
8. Upon completion of the import process, your database, complete with its tables and data, will be ready on your local MySQL server.

Following the database import, you will need to configure the MySQL connection in the backend/db/index.js file according to your localhost setup.

## Development server

To start the application, navigate to the frontend directory and run ng serve. This will launch a development server. You can view the application by navigating to http://localhost:4200/ on your browser. The application is designed to automatically reload upon detecting changes in any of the source files. Please repeat the same steps for the backend.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
