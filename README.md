#  Todo Task App

A full-stack **Todo Task Web Application** built with **React, Node.js, and MySQL**, with **Docker support**, **unit tests**, and **end-to-end tests (Cypress)**.

##  Author | Contact

-   **Name:** Deneth Godakandagei
-   **GitHub:** [DenethGodakandagei](https://github.com/DenethGodakandagei)
-   **Submission Link:** `https://github.com/DenethGodakandagei/coveragex-task`


##  Features

- Create new tasks with **title** and **description**.
- Only the **most recent 5 tasks** are displayed.
- Mark tasks as **Done** → they disappear from the list.
- Fully dockerized setup for **frontend, backend, and database**.
- **Unit tests** for backend and frontend.
- **E2E tests** with Cypress simulating full user flow.

---

## 🛠️ Tech Stack

| Layer       | Technology                    |
|------------|-------------------------------|
| Database   | MySQL                          |
| Backend    | Node.js, Express, TypeScript   |
| Frontend   | React, TypeScript, Tailwind CSS|
| Testing    | Jest, React Testing Library, Cypress |
| Container  | Docker, docker-compose         |

---
### Deployment Steps

1.  **Clone the repository:**
    
    git clone https://github.com/DenethGodakandagei/coveragex-task
    
    

2.  **Build and start all containers:**
    This command builds the frontend/backend images, sets up the persistent MySQL container, and starts all services.
    
    docker-compose up --build


3.  **Access the application:**
    The frontend SPA will be available at: `http://localhost:5173`

##  Running Tests

### Backend Unit & Integration Tests

cd backend
npm test

### Frontend Unit & Integration Tests

cd frontend
npm test

## End-to-End (E2E) Tests with Cypress

cd frontend
npm run test:e2e


##  Database Schema

The task data is stored in a single table named `task`.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique identifier for the task. |
| `title` | `VARCHAR(255)` | `NOT NULL` | The main title of the task. |
| `description` | `TEXT` | `NULLABLE` | A detailed description of the task. |
| `is_completed` | `BOOLEAN` | `DEFAULT 0` | Status of the task. |
| `created_at` | `DATETIME` | `NOT NULL` | Timestamp of when the task was created . |


## Project Structure


├── backend/                  # Node.js/Express API (TypeScript)
│   ├── src/                  # Application source code (controllers, config, routes)
│   ├── tests/                # Jest unit tests
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # React SPA (TypeScript, Tailwind CSS)
│   ├── src/                  # Application source code (components )
│   ├── tests/                # Jest unit tests
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        #  db, backend, and frontend services
└── README.md


##  Backend (backend/.env)

DB_HOST =	mysql-db	
DB_USER =	root	
DB_PASSWORD =	root	
DB_NAME =	todo_app	
DB_PORT =	3307	
PORT =	5000

__________________________________________________________________________________________________________________________________