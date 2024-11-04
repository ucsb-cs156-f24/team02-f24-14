import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import RecommendationRequestForm from "main/components/RecommendationRequests/RecommendationRequestForm";
import { recommendationRequestsFixtures } from "fixtures/recommendationRequestsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("RecommendationRequestForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    await screen.findByText(/Requester Email/);
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a RecommendationRequest", async () => {
    render(
      <Router>
        <RecommendationRequestForm initialContents={{ id: 1, requesterEmail: "student@ucsb.edu", professorEmail: "professor@ucsb.edu", explanation: "Request for letter", dateRequested: "2023-10-01T10:00", dateNeeded: "2023-12-01T10:00", done: false }} />
      </Router>,
    );
  
    await screen.findByTestId("RecommendationRequestForm-id");
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId("RecommendationRequestForm-id")).toHaveValue("1");
  });

  test("Correct Error messages on bad input", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    await screen.findByTestId("RecommendationRequestForm-requesterEmail");
    const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
    const dateRequestedField = screen.getByTestId("RecommendationRequestForm-dateRequested");
    const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

    fireEvent.change(requesterEmailField, { target: { value: "bad-email" } });
    fireEvent.change(dateRequestedField, { target: { value: "bad-date" } });
    fireEvent.click(submitButton);

    await screen.findByText(/RequesterEmail must be a valid email address/);
  });

  test("Correct Error messages on missing input", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    await screen.findByTestId("RecommendationRequestForm-submit");
    const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

    fireEvent.click(submitButton);

    await screen.findByText(/RequesterEmail is required./);
    expect(screen.getByText(/ProfessorEmail is required./)).toBeInTheDocument();
    expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
    expect(screen.getByText(/DateRequested is required./)).toBeInTheDocument();
  });

  test("No Error messages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <RecommendationRequestForm submitAction={mockSubmitAction} />
      </Router>,
    );
    await screen.findByTestId("RecommendationRequestForm-requesterEmail");

    const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
    const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
    const explanationField = screen.getByTestId("RecommendationRequestForm-explanation");
    const dateRequestedField = screen.getByTestId("RecommendationRequestForm-dateRequested");
    const dateNeededField = screen.getByTestId("RecommendationRequestForm-dateNeeded");
    const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

    fireEvent.change(requesterEmailField, { target: { value: "student@ucsb.edu" } });
    fireEvent.change(professorEmailField, { target: { value: "professor@ucsb.edu" } });
    fireEvent.change(explanationField, { target: { value: "Requesting a recommendation letter for internship." } });
    fireEvent.change(dateRequestedField, { target: { value: "2024-11-01T09:00" } });
    fireEvent.change(dateNeededField, { target: { value: "2024-12-01T17:00" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/RequesterEmail must be a valid email address/),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/DateRequested must be in ISO format/),
    ).not.toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <RecommendationRequestForm />
      </Router>,
    );
    await screen.findByTestId("RecommendationRequestForm-cancel");
    const cancelButton = screen.getByTestId("RecommendationRequestForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
