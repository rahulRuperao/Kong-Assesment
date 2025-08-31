### Prerequisites
- Docker Desktop installed and running
- Node.js **v20.0.2 (LTS)**
- A code editor (e.g., VS Code)

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

##  Suggested Scripts (package.json)

```jsonc
{
  "scripts": {
    "start": "docker compose up -d",
    "stop": "docker compose down",
    "test": "cypress run --spec "cypress/e2e/kong-service.cy.js"",
    "generate-report": "node generate-report.js"
  },
  "devDependencies": {
    "cypress": "^13.0.0",
    "cypress-mochawesome-reporter": "^3.8.0"
  }
}
```

 #Note - If you prefer automatic report generation without a custom script, wire the reporter in `cypress.config.js` and use its post-run hooks. Otherwise, add `mochawesome-merge` and `mochawesome-report-generator` and implement them in `generate-report.js`.


KONG-CYPRESS-TESTS/
│
├── cypress/
│   ├── downloads/                # Default Cypress downloads folder
│   ├── e2e/                      # End-to-end test specs
│   │   └── kong-service.cy.js    # Test for Service + Route creation and validation
│   ├── reports/                  # Test reports output
│   │   ├── assets/               # Static assets for reports
│   │   ├── mochawesome.html      # Generated HTML report
│   │   └── mochawesome.json      # Raw JSON test results
│   └── support/                  # Cypress support files
│       ├── commands.js           # Custom Cypress commands (if any)
│       └── e2e.js                # Global test setup
│
├── node_modules/                 # Installed dependencies
│
├── cypress.config.js             # Cypress configuration
├── docker-compose.yml            # Docker Compose setup for Kong
├── generate-report.js            # Script to merge & generate Mochawesome reports
├── kong.yml                      # Kong declarative config
├── package.json                  # Project metadata & npm scripts
├── package-lock.json             # Locked dependency versions
└── README.md                     # Project documentation


-------------------------
##  Design Considerations

**Reproducibility:** Everything runs via Docker + Node toolchain; versions pinned in `package.json` and Compose files.
**Test Isolation:** Each test creates and cleans up its own data (service/route) to avoid cross-test flakiness.
**Maintainability:** One spec per feature area (e.g., Services, Routes) with clear test names and minimal custom commands.
**Reporting:** Use Mochawesome for shareable HTML output stored in `cypress/reports`.
**Scalability:** Project structure leaves room to add specs for Consumers, Plugins, Upstreams, etc.
**Portability:** Commands are OS-agnostic (`docker compose`, `npx cypress`), and CI-ready scripts are kept in `package.json`.

---------------

##  Assumptions

- Docker Desktop is available and running before tests start.
- Node.js **20.19.4 LTS** is installed and available on `PATH`.
- Kong Manager (UI) and Admin API are reachable locally according to your Compose setup.
- The test focus is **basic Kong Gateway UI flows** (e.g., create Service, add Route).
- Mochawesome is the primary reporting mechanism.
- Execution target is **local development** first; CI/CD is optional.

--------------

##  Trade-offs

 **Docker dependency:** Greatly simplifies setup but uses more CPU/RAM than native installs.
 **Cypress choice:** Excellent DX and fast feedback for UI tests, but limited for multi-tab flows or some low-level network use cases vs. Playwright/Selenium.
 **Extra reporting step:** Mochawesome yields clean, shareable HTML but requires a post-run generation step.
 **Local-first design:** Keeps onboarding simple; CI requires additional workflow configuration.
 **Static configs:** Current `docker-compose.yaml` and `kong.yml` assume a fixed local topology; dynamic/scale-out scenarios are out of scope for this phase.


##  Troubleshooting

**Docker up but UI not reachable?** Check ports in `docker-compose.yaml` and Kong logs.
**Node version mismatch?** Verify `node -v` is `v20.x` and reinstall dependencies.
**Report not generated?** Ensure reporter is configured in `cypress.config.js` and `generate-report.js` has its required dev deps.

---

##  References

- Cypress docs: https://docs.cypress.io/
- Kong Gateway docs: https://docs.konghq.com/gateway/
- cypress-mochawesome-reporter: https://github.com/LironEr/cypress-mochawesome-reporter

