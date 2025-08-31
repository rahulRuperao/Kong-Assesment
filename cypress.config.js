const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8002",  // Kong Manager UI
    reporter: "mochawesome",  // Set Mochawesome as the reporter
    reporterOptions: {
      reportDir: "cypress/reports",  // Directory where reports will be saved
      overwrite: true,               // Overwrite previous reports
      html: true,                    // Generate HTML report
      json: true                     // Generate JSON report
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
