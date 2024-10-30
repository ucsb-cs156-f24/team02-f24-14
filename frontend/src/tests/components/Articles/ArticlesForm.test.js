import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { articlesFixtures } from "fixtures/articlesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("ArticlesForm tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <ArticlesForm />
      </Router>,
    );
    await screen.findByText(/Article Title/);
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a Article", async () => {
    render(
      <Router>
        <ArticlesForm initialContents={articlesFixtures.oneArticle} />
      </Router>,
    );
    await screen.findByTestId(/ArticlesForm-id/);
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/ArticlesForm-id/)).toHaveValue("1");
  });

  test("Correct Error messsages on bad input", async () => {
    render(
      <Router>
        <ArticlesForm />
      </Router>,
    );
    await screen.findByTestId("ArticlesForm-dateAdded");
    const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
    const emailField = screen.getByTestId("ArticlesForm-email");
    const submitButton = screen.getByTestId("ArticlesForm-submit");

    fireEvent.change(dateAddedField, { target: { value: "bad-input" } });
    fireEvent.change(emailField, { target: { value: "bad-input" } });

    fireEvent.click(submitButton);

    await screen.findByText(/An article title is required./);
    expect(screen.getByText(/A valid date is required./)).toBeInTheDocument();
    expect(screen.getByText(/A valid email is required./)).toBeInTheDocument();
  });

  test("Correct Error messsages on missing input", async () => {
    render(
      <Router>
        <ArticlesForm />
      </Router>,
    );
    await screen.findByTestId("ArticlesForm-submit");
    const submitButton = screen.getByTestId("ArticlesForm-submit");

    fireEvent.click(submitButton);

    await screen.findByText(/An article title is required./);
    expect(screen.getByText(/A URL is required./)).toBeInTheDocument();
    expect(screen.getByText(/An explanation is required./)).toBeInTheDocument();
    expect(screen.getByText(/An email is required./)).toBeInTheDocument();
    expect(screen.getByText(/A valid date is required./)).toBeInTheDocument();
  });

  test("No Error messsages on good input", async () => {
    const mockSubmitAction = jest.fn();

    render(
      <Router>
        <ArticlesForm submitAction={mockSubmitAction} />
      </Router>,
    );
    await screen.findByTestId("ArticlesForm-title");

    const titleField = screen.getByTestId("ArticlesForm-title");
    const urlField = screen.getByTestId("ArticlesForm-url");
    const explanationField = screen.getByTestId("ArticlesForm-explanation");
    const emailField = screen.getByTestId("ArticlesForm-email");
    const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
    const submitButton = screen.getByTestId("ArticlesForm-submit");

    fireEvent.change(titleField, { target: { value: "Test Title" } });
    fireEvent.change(urlField, { target: { value: "test-article.com/1" } });
    fireEvent.change(explanationField, {
      target: { value: "An explanation about article 1." },
    });
    fireEvent.change(emailField, {
      target: { value: "author@test-article.com" },
    });
    fireEvent.change(dateAddedField, {
      target: { value: "2022-01-02T12:00:00" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    expect(
      screen.queryByText(/A valid email is required./),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/A valid date is required./),
    ).not.toBeInTheDocument();
  });

  test("that navigate(-1) is called when Cancel is clicked", async () => {
    render(
      <Router>
        <ArticlesForm />
      </Router>,
    );
    await screen.findByTestId("ArticlesForm-cancel");
    const cancelButton = screen.getByTestId("ArticlesForm-cancel");

    fireEvent.click(cancelButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
  });
});
