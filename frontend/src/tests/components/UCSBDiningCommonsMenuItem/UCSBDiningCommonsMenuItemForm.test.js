import { render, waitFor, fireEvent, screen, act } from "@testing-library/react";
import UCSBDiningCommonsMenuItemForm from "main/components/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemForm";
import { ucsbDiningCommonsMenuItemFixtures } from "fixtures/ucsbDiningCommonsMenuItemFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("UCSBDiningCommonsMenuItemForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a UCSBDiningCommonsMenuItem", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm
          initialContents={ucsbDiningCommonsMenuItemFixtures.oneDate}
        />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-id");
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId("UCSBDiningCommonsMenuItemForm-id")).toHaveValue(
      "1",
    );
  });

  test("Correct Error messages on bad input", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );

    const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-submit");

    await act(async () => {
      fireEvent.click(submitButton);
    });
  });

  test("Correct Error messages on missing input", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-submit");
    const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-submit");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await screen.findByText(/Name is required./);
    expect(screen.getByText(/Dining Commons Code is required./)).toBeInTheDocument();
    expect(screen.getByText(/Station is required./)).toBeInTheDocument();
  });

  test("No Error messages on good input", async () => {
    const mockSubmitAction = jest.fn();
  
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm submitAction={mockSubmitAction} />
      </Router>,
    );
  
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");
  
    const diningCommonsCodeField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-diningCommonsCode");
    const nameField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-name");
    const stationField = screen.getByTestId("UCSBDiningCommonsMenuItemForm-station");
    const submitButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-submit");
  
    // Use act for each interaction to ensure state updates are flushed
    await act(async () => {
      fireEvent.change(diningCommonsCodeField, { target: { value: "ortega" } });
      fireEvent.change(nameField, { target: { value: "Baked Pesto Pasta with Chicken" } });
      fireEvent.change(stationField, { target: { value: "Entree Specials" } });
    });
  
    // Click submit and confirm mockSubmitAction is called
    await act(async () => {
      fireEvent.click(submitButton);
    });
  
    // Explicitly check that mockSubmitAction has been called
    expect(mockSubmitAction).toHaveBeenCalled();
    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalledTimes(1));
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <UCSBDiningCommonsMenuItemForm />
      </Router>,
    );
    await screen.findByTestId("UCSBDiningCommonsMenuItemForm-cancel");
    const cancelButton = screen.getByTestId("UCSBDiningCommonsMenuItemForm-cancel");

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
