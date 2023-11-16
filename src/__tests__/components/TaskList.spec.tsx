import { render, fireEvent } from "@testing-library/react";
import { TaskList } from "../../components/TaskList";

describe("Given <TaskList /> component", () => {
  describe("When render the component is rendered", () => {
    it("Should be able to add a task", async () => {
      const { getByTestId, getByPlaceholderText, getByText } = render(
        <TaskList />
      );

      const TaskInput = getByPlaceholderText("Adicionar novo todo");
      const AddTaskButton = getByTestId("add-task-button");

      fireEvent.change(TaskInput, {
        target: {
          value: "Desafio ReactJS Ignite",
        },
      });
      fireEvent.click(AddTaskButton);

      const AddedFirstTaskTitle = getByText("Desafio ReactJS Ignite");

      expect(AddedFirstTaskTitle).toHaveTextContent("Desafio ReactJS Ignite");
      expect(AddedFirstTaskTitle.parentElement).not.toHaveClass("completed");

      fireEvent.change(TaskInput, {
        target: {
          value: "Beber água",
        },
      });
      fireEvent.click(AddTaskButton);

      const addedSecondTaskTitle = getByText("Beber água");

      expect(AddedFirstTaskTitle).toBeInTheDocument();
      expect(AddedFirstTaskTitle).toHaveTextContent("Desafio ReactJS Ignite");
      expect(AddedFirstTaskTitle.parentElement).not.toHaveClass("completed");

      expect(addedSecondTaskTitle).toHaveTextContent("Beber água");
      expect(addedSecondTaskTitle.parentElement).not.toHaveClass("completed");
    });

    it("Should not be able to add a task with a empty title", () => {
      const { getByTestId, getByText, queryByTestId, getByPlaceholderText } =
        render(<TaskList />);

      const AddTaskButton = getByTestId("add-task-button");

      fireEvent.click(AddTaskButton);

      expect(queryByTestId("task")).not.toBeInTheDocument();

      const TaskInput = getByPlaceholderText("Adicionar novo todo");

      fireEvent.change(TaskInput, {
        target: {
          value: "Desafio ReactJS Ignite",
        },
      });

      fireEvent.click(AddTaskButton);

      const AddedFirstTaskTitle = getByText("Desafio ReactJS Ignite");

      expect(AddedFirstTaskTitle).toHaveTextContent("Desafio ReactJS Ignite");
    });

    it("Should be able to remove a task", async () => {
      const { getByTestId, getByPlaceholderText, getAllByTestId, getByText } =
        render(<TaskList />);

      const TaskInput = getByPlaceholderText("Adicionar novo todo");
      const AddTaskButton = getByTestId("add-task-button");

      fireEvent.change(TaskInput, {
        target: {
          value: "Desafio ReactJS Ignite",
        },
      });
      fireEvent.click(AddTaskButton);

      fireEvent.change(TaskInput, {
        target: {
          value: "Beber água",
        },
      });
      fireEvent.click(AddTaskButton);

      const AddedFirstTaskTitle = getByText("Desafio ReactJS Ignite");
      const addedSecondTaskTitle = getByText("Beber água");

      expect(AddedFirstTaskTitle).toBeInTheDocument();
      expect(addedSecondTaskTitle).toBeInTheDocument();

      const [addedFirstTaskRemoveButton] = getAllByTestId("remove-task-button");

      fireEvent.click(addedFirstTaskRemoveButton);

      expect(AddedFirstTaskTitle).not.toBeInTheDocument();
      expect(addedSecondTaskTitle).toBeInTheDocument();
    });

    it("Should be able to check a task", () => {
      const { getByTestId, getByPlaceholderText, getAllByTestId } = render(
        <TaskList />
      );

      const TaskInput = getByPlaceholderText("Adicionar novo todo");
      const AddTaskButton = getByTestId("add-task-button");

      fireEvent.change(TaskInput, {
        target: {
          value: "Desafio ReactJS Ignite",
        },
      });
      fireEvent.click(AddTaskButton);

      fireEvent.change(TaskInput, {
        target: {
          value: "Beber água",
        },
      });
      fireEvent.click(AddTaskButton);

      const [addedFirstTask, addedSecondTask] = getAllByTestId("task");

      if (addedFirstTask.firstChild) {
        fireEvent.click(addedFirstTask.firstChild);
      }

      expect(addedFirstTask).toBeInTheDocument();
      expect(addedFirstTask).toHaveClass("completed");

      expect(addedSecondTask).toBeInTheDocument();
      expect(addedSecondTask).not.toHaveClass("completed");
    });
  });
});
