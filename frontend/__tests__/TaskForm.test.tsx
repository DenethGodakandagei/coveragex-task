import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "../src/components/TaskForm";
import API from "../src/services/api";

jest.mock("../src/services/api");
const mockedAPI = API as jest.Mocked<typeof API>;

describe("TaskForm Component", () => {
  const onTaskAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form inputs and button", () => {
    render(<TaskForm onTaskAdded={onTaskAdded} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Task/i })).toBeInTheDocument();
  });

  it("submits form and calls onTaskAdded", async () => {
    mockedAPI.post.mockResolvedValueOnce({ data: {} });
    render(<TaskForm onTaskAdded={onTaskAdded} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Desc" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));

    expect(mockedAPI.post).toHaveBeenCalledWith("/tasks", { title: "Test Task", description: "Desc" });
    await waitFor(() => expect(onTaskAdded).toHaveBeenCalled());
  });
});
