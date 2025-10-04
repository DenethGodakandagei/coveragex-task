describe("To-Do List App (Frontend-only E2E)", () => {
  const baseUrl = "http://localhost:5173"; //frontend server

  
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.intercept("GET", "/api/tasks", { body: [] }).as("getTasksInitial");
    cy.wait("@getTasksInitial");
  });

  

  it("adds a new task", () => {
    const taskTitle = "Buy milk";
    const taskDescription = "From the supermarket";

    // Intercept POST /tasks
    cy.intercept("POST", "/api/tasks", (req) => {
      req.reply({
        statusCode: 201,
        body: { id: 1, title: req.body.title, description: req.body.description, is_completed: false },
      });
    }).as("addTask");

    //  task list re-fetch
    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: 1, title: taskTitle, description: taskDescription, is_completed: false },
      ],
    }).as("getTasksAfterAdd");


    // Fill form and submit
    cy.get("input#title").type(taskTitle);
    cy.get("textarea#description").type(taskDescription);
    cy.get("[data-cy=task-form-submit]").click();


    cy.wait("@addTask");
    cy.wait("@getTasksAfterAdd");

    cy.get("[data-cy=popup-message]").should("contain.text", "Task added successfully!");
    cy.contains(taskTitle).should("be.visible");
    cy.contains(taskDescription).should("be.visible");
  });


  it("marks a task as done", () => {
    const taskId = 2;
    const taskTitle = "Finish report";
    const taskDescription = "";

    cy.intercept("POST", "/api/tasks", {
      statusCode: 201,
      body: { id: taskId, title: taskTitle, description: taskDescription, is_completed: false },
    }).as("addTask");

    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: taskId, title: taskTitle, description: taskDescription, is_completed: false },
      ],
    }).as("getTasksAfterAdd");

    // Add Task 
    cy.get("input#title").type(taskTitle);
    cy.get("[data-cy=task-form-submit]").click();

    cy.wait("@addTask");
    cy.wait("@getTasksAfterAdd"); 

    cy.intercept("PUT", `/api/tasks/${taskId}/complete`, {
      statusCode: 200,
      body: { id: taskId, title: taskTitle, description: taskDescription, is_completed: true },
    }).as("markDone");

    // 4. Intercept GET tasks after marking done
    cy.intercept("GET", "/api/tasks", {
      body: [
        { id: taskId, title: taskTitle, description: taskDescription, is_completed: true },
      ],
    }).as("getTasksAfterDone");

    // Mark Done
    cy.contains(taskTitle)
      .closest("div.bg-white")
      .find("[data-cy=mark-done-btn]")
      .click();

    //Assertions & Waits
    cy.wait("@markDone");
    cy.wait("@getTasksAfterDone");

    // Assert Done button disappeared because task is now complete
    cy.contains(taskTitle)
      .closest("div.bg-white")
      .find("[data-cy=mark-done-btn]")
      .should("not.exist");
  });
});