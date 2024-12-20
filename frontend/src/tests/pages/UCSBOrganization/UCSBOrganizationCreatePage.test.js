import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UCSBOrganizationCreatePage from "main/pages/UCSBOrganization/UCSBOrganizationCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("UCSBOrganizationCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    jest.clearAllMocks();
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  const queryClient = new QueryClient();
  test("renders without crashing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("OrgTranslationShort")).toBeInTheDocument();
    });
  });

  test("on submit, makes request to backend, and redirects to /ucsborganization", async () => {
    const queryClient = new QueryClient();
    const organization = {
      orgCode: "BAL",
      orgTranslationShort: "Basketball Club",
      orgTranslation: "UCSB Basketball Club",
      inactive: false,
    };

    axiosMock.onPost("/api/ucsborganization/post").reply(202, organization);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBOrganizationCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("OrgTranslationShort")).toBeInTheDocument();
    });

    //doesn't work because backend requires orgcode to create organization <----------- !!!!!!!!
    const codeInput = screen.getByLabelText("OrgCode"); //This should not be here but I don't know what the createPage
    expect(codeInput).toBeInTheDocument(); //tests should look like without the ability to
    //create your own orgCode since it can't leave orgCode blank

    const nameInput = screen.getByLabelText("OrgTranslationShort");
    expect(nameInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText("OrgTranslation");
    expect(descriptionInput).toBeInTheDocument();

    const inactiveInput = screen.getByLabelText("Inactive");
    expect(inactiveInput).toBeInTheDocument();

    const createButton = screen.getByText("Create");
    expect(createButton).toBeInTheDocument();

    fireEvent.change(codeInput, { target: { value: "BAL" } });
    fireEvent.change(nameInput, { target: { value: "Basketball Club" } });
    fireEvent.change(descriptionInput, {
      target: { value: "UCSB Basketball Club" },
    });
    fireEvent.change(inactiveInput, { target: { value: false } });
    fireEvent.click(createButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    expect(axiosMock.history.post[0].params).toEqual({
      orgCode: "BAL",
      orgTranslationShort: "Basketball Club",
      orgTranslation: "UCSB Basketball Club",
      inactive: "false",
    });

    // assert - check that the toast was called with the expected message
    expect(mockToast).toBeCalledWith(
      "New organization Created - orgCode: BAL orgTranslationShort: Basketball Club",
    );
    expect(mockNavigate).toBeCalledWith({ to: "/ucsborganization" });
  });
});
