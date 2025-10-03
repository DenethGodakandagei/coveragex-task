import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import TaskList from "../src/components/TaskList";
import API from "../src/services/api";

jest.mock("../src/services/api");
const mockedAPI = API as jest.Mocked<typeof API>;

describe("TaskList Component", () => {
  const onTaskUpdated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks", () => {
    const tasks = [{ id: 1, title: "Task 1", description: "Desc 1", is_completed: false }];
    render(<TaskList tasks={tasks} onTaskUpdated={onTaskUpdated} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Done/i })).toBeInTheDocument();
  });

  it("calls API when Done button is clicked", async () => {
    const tasks = [{ id: 1, title: "Task 1", is_completed: false }];
    mockedAPI.put.mockResolvedValueOnce({});

    render(<TaskList tasks={tasks} onTaskUpdated={onTaskUpdated} />);

    fireEvent.click(screen.getByRole("button", { name: /Done/i }));
    expect(mockedAPI.put).toHaveBeenCalledWith("/tasks/1/complete");
    await waitFor(() => expect(onTaskUpdated).toHaveBeenCalled());
  });

  it("renders no tasks message", () => {
    render(<TaskList tasks={[]} onTaskUpdated={onTaskUpdated} />);
    expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
  });
});
