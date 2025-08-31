describe("Kong Manager - Service & Route Creation", () => {

  // Before each test, visit Kong Manager's UI
  beforeEach(() => {
    cy.visit("http://localhost:8002"); // Open Kong Manager UI
  });

  // Test to ensure the Kong Manager UI loads successfully
  it("should load Kong Manager UI successfully", () => {
    // Wait for and verify the visibility of workspace overview title
    cy.get("div.workspace-overview-title", { timeout: 10000 })
      .should("contain.text", "Workspaces") // Check for text "Workspaces"
      .and("be.visible"); // Ensure the element is visible
  });

  // Test to create a new Service in Kong Manager
  it("should create a new Service", () => {
    // Navigate to the "Service" section
    cy.get('[role="link"]', { timeout: 10000 })
      .should("be.visible") // Ensure link is visible
      .click(); // Click on the Service link

    // Open the action button to create a new service
    cy.get('[data-testid="action-button"]', { timeout: 10000 })
      .should("be.visible")
      .click(); // Click on the action button to create a service

    // Fill in the form for creating a new service
    cy.get('[data-testid="gateway-service-name-input"]', { timeout: 10000 }).type("Test.Service");
    cy.get('[data-testid="gateway-service-tags-input"]', { timeout: 10000 }).type("tags123");
    cy.get('[data-testid="gateway-service-url-input"]', { timeout: 10000 }).clear().type("http://example.com");

    // Submit the service form
    cy.get('[data-testid="service-form-submit"]', { timeout: 10000 }).click();

    // Verify the error alert message for missing database configuration
    cy.get('[data-testid="form-error"]') // Target the error message based on data-testid attribute
      .should('contain', "cannot create 'services' entities when not using a database"); // Ensure the error message is as expected
  });

  // Test to create a Route for the Service
  it("should create a Route for the Service", () => {
    // Navigate to the "Service" section
    cy.get('[role="link"]', { timeout: 10000 })
      .should("be.visible")
      .click();

    // Click on the action button to add a route
    cy.get('[data-testid="action-button"]', { timeout: 10000 })
      .click();

    // Open the main sidebar menu (e.g., for mobile view)
    cy.get('a[aria-label="Open Main Menu"]')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true }); // Force click to ensure interaction even if element is not in view

    // Wait for the sidebar to expand
    cy.wait(1000); // Optional wait to ensure menu is fully loaded

    // Click on "Routes" in the sidebar
    cy.get('li.sidebar-item-secondary')
      .contains('Routes') // Targeting the Routes link inside the sidebar
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true }); // Force click if the element is not fully visible

    // Click on "Add Route" button in the toolbar
    cy.get('[data-testid="toolbar-add-route"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // Fill in the Route creation form
    cy.get('[data-testid="route-form-name"]', { timeout: 10000 }).type("Test.Route");
    cy.get('[data-testid="route-form-service-id"]', { timeout: 10000 }).click(); // Open the service dropdown
    cy.wait(1000); // Optional wait for dropdown to load
    cy.get('div.route-form-service-dropdown-item', { timeout: 10000 }).click(); // Select service from dropdown

    cy.get('[data-testid="route-form-tags"]', { timeout: 10000 }).type("route-tags123");
    cy.get('[data-testid="route-form-paths-input-1"]', { timeout: 10000 }).type("/testpath");
    cy.wait(1000); // Optional wait for form processing (e.g., for validation)

    // Submit the Route form
    cy.get('[data-testid="route-form-submit"]', { timeout: 10000 }).click();

    // Verify the error alert message for missing database configuration for Route creation
    cy.get('[data-testid="form-error"]') // Target the error message based on data-testid attribute
      .should('contain', "cannot create 'routes' entities when not using a database"); // Ensure the error message is as expected
  });
  after(() => {
    // Clean-up actions (if necessary)
    cy.clearCookies();  // Clear cookies after tests
    cy.clearLocalStorage();  // Clear local storage after tests
  
  });
});
