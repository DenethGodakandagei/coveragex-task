import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import API from "../src/services/api";

// Mock API
jest.mock("../src/services/api");

const mockedAPI = API as jest.Mocked<typeof API>;

describe("App Component", () => {
  it("renders heading and fetches tasks", async () => {
    // Mock the GET /tasks API response
    mockedAPI.get.mockResolvedValueOnce({
      data: [{ id: 1, title: "Test task", description: "Test desc", is_completed: false }],
    });

    render(<App />);

    // Check heading
    expect(screen.getByText(/To-Do List App/i)).toBeInTheDocument();

    // Wait for tasks to be rendered
    await waitFor(() => {
      expect(screen.getByText("Test task")).toBeInTheDocument();
      expect(screen.getByText("Test desc")).toBeInTheDocument();
    });
  });

  it("renders no tasks message when empty", async () => {
    mockedAPI.get.mockResolvedValueOnce({ data: [] });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
    });
  });
});
