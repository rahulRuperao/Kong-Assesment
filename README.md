# Kong-Assesment
Cypress E2E Test for Kong gateway Assignment 
Steps for Test execution on Local Machine 
Step 1: Go to the Project Root Folder and open CMD. 
Step 2: Run the following below Command- 
“docker compose up” 
Step 3: Go to the Visual studio Code and open Terminal and run following below Command- 
npx cypress run --spec "cypress/e2e/kong-service.cy.js" 
Step 4: Run the below given generate-report Script- 
“npm run generate-report” 
Step 5: Run the below Command for Closing the Docker Container- 
“docker compose down” 
KONG-CYPRESS-TESTS/ 
├── cypress/ 
│ ├── e2e/ 
│ │ ├── kong-service.cy.js 
Project Structure 
│ ├── reports/ // Directory for reports 
│ │ ├── mochawesome.json // The JSON report file 
│ │ ├── mochawesome.html // The generated HTML report 
├── generate-report.js 
├── package.json 
├── cypress.config.js 
└── README.md 
