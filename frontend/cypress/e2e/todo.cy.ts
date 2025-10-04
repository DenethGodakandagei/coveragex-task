// cypress/e2e/todo.cy.ts

describe("To-Do List App (Frontend-only E2E)", () => {
  const baseUrl = "http://localhost:5173";

  // --- Setup for every test ---
  beforeEach(() => {
    cy.visit(baseUrl);

    // Intercept initial GET /tasks (empty list)
    // This handles the useEffect in App.tsx on initial load
    cy.intercept("GET", "/api/tasks", { body: [] }).as("getTasksInitial");
    cy.wait("@getTasksInitial");
  });

  // -------------------------------------------------------------------

  it("adds a new task", () => {
    const taskTitle = "Buy milk";
    const taskDescription = "From the supermarket";

    // 1. Intercept POST /tasks
    cy.intercept("POST", "/api/tasks", (req) => {
      req.reply({
        statusCode: 201,
        body: { id: 1, title: req.body.title, description: req.body.description, is_completed: false },
      });
    }).as("addTask");

    // 2. Intercept GET /tasks after adding (The task list re-fetch)
    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: 1, title: taskTitle, description: taskDescription, is_completed: false },
      ],
    }).as("getTasksAfterAdd");

    // --- Action ---
    // Fill form and submit
    cy.get("input#title").type(taskTitle);
    cy.get("textarea#description").type(taskDescription);
    cy.get("[data-cy=task-form-submit]").click();

    // --- Assertions & Waits ---
    // Wait for POST
    cy.wait("@addTask");

    // Wait for the re-fetch (The request that failed in the original problem)
    cy.wait("@getTasksAfterAdd");

    // Assert task appears in DOM and popup shows
    cy.get("[data-cy=popup-message]").should("contain.text", "Task added successfully!");
    cy.contains(taskTitle).should("be.visible");
    cy.contains(taskDescription).should("be.visible");
  });

  // -------------------------------------------------------------------

  it("marks a task as done", () => {
    const taskId = 2;
    const taskTitle = "Finish report";
    const taskDescription = "";

    // 1. Intercept POST /tasks (for adding the task first)
    cy.intercept("POST", "/api/tasks", {
      statusCode: 201,
      body: { id: taskId, title: taskTitle, description: taskDescription, is_completed: false },
    }).as("addTask");

    // 2. Intercept GET /tasks after POST (Initial display of the task)
    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: taskId, title: taskTitle, description: taskDescription, is_completed: false },
      ],
    }).as("getTasksAfterAdd");

    // --- Action: Add Task ---
    cy.get("input#title").type(taskTitle);
    cy.get("[data-cy=task-form-submit]").click();

    cy.wait("@addTask");
    cy.wait("@getTasksAfterAdd"); // Task is now visible in the list

    // 3. Intercept PUT /tasks/{id}/complete
    cy.intercept("PUT", `/api/tasks/${taskId}/complete`, {
      statusCode: 200,
      body: { id: taskId, title: taskTitle, description: taskDescription, is_completed: true },
    }).as("markDone");

    // 4. Intercept GET /tasks after marking done (Task list re-fetch)
    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: taskId, title: taskTitle, description: taskDescription, is_completed: true },
      ],
    }).as("getTasksAfterDone");

    // --- Action: Mark Done ---
    cy.contains(taskTitle)
      .closest("div.bg-white")
      .find("[data-cy=mark-done-btn]")
      .click();

    // --- Assertions & Waits ---
    cy.wait("@markDone");
    cy.wait("@getTasksAfterDone");

    // Assert Done button disappeared because task is now complete
    cy.contains(taskTitle)
      .closest("div.bg-white")
      .find("[data-cy=mark-done-btn]")
      .should("not.exist");
  });
});