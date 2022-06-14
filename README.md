### Student Enrollment Restful APIs (GET, POST, PUT  & DELETE)

### How to install the package
- Git clone the project
- Go to the project root folder `/bullish-api-login` and run command ```npm install```

### Data setup before running the tests
Please run the following shell scripts to populate some student records into database before running the api tests

`/bullish-api-login/cypress/script/./data.sh`

### How to run the tests

To run the tests and generate the full mochawesome report, run the command ```npm run test``` from the project root folder

To run the tests in Headless mode (without report generation), run the command ```npm run cy:run``` from the project root folder

To run the tests using Cypress `Test Runner`, run the command ```npm run cy:open``` from the project root folder and click on the feature file to run the tests

### Reporting
Test reports can be found under `/bullish-api-login/cypress/reports/mochareports/report.html`

### API Bugs
`POST METHOD`
-  If "id" field contains alphanumeric chars (eg: abc), `JsonParseException` is thrown
- `Firstname` and `studentClass` fields cannot be left empty, otherwise a 500 internal server error exception is thrown. However student records can be successfully added if fields `Lastname` and `nationality` are left empty.

`GET METHOD`
-  Find student by Class will always return all records regardless filter by class properties
-  Find student by id and class doesn't always return the fully matched record. Only matched by id.
-  400 bad request with `java.lang.NumberFormatException` is thrown if user enters alphanumeric value (id=abc) into the id search parameter

`PUT METHOD`
-  400 bad request error with `JsonParseException` is thrown if user enters alphanumeric value for ID
- If update student record with empty field values, 200 response is returned but nothing is updated. Should return an error message to inform user a field cannot be updated with empty value.

### Login UI Bugs
1. No input validation check for username/password fields. User can enter empty value into username/password fields and an error message "Your username is invalid!" is shown eventhough the username entered is empty. No proper field validation check for both username and password fields.
