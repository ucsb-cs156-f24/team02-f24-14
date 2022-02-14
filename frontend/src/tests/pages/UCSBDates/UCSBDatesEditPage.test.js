import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBDatesCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/ucsbdates?id=17").reply(200, {
            id: 17,
            quarterYYYYQ: '20221',
            name: "Pi Day",
            localDateTime: "2022-03-14T15:00"
        });
        axiosMock.onPut('/api/ucsbdates').reply(200, {
            id: "17",
            quarterYYYYQ: '20224',
            name: "Christmas Morning",
            localDateTime: "2022-12-25T08:00"
        });
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("Is populated with the data provided", async () => {

        const {getByTestId} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());

        const idField = getByTestId("UCSBDateForm-id");
        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const nameField = getByTestId("UCSBDateForm-name");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        expect(idField).toHaveValue("17");
        expect(quarterYYYYQField).toHaveValue("20221");
        expect(nameField).toHaveValue("Pi Day");
        expect(localDateTimeField).toHaveValue("2022-03-14T15:00");
    });

    test("Changes when you click Update", async () => {

       

        const {getByTestId} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDatesEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());

        const idField = getByTestId("UCSBDateForm-id");
        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const nameField = getByTestId("UCSBDateForm-name");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        expect(idField).toHaveValue("17");
        expect(quarterYYYYQField).toHaveValue("20221");
        expect(nameField).toHaveValue("Pi Day");
        expect(localDateTimeField).toHaveValue("2022-03-14T15:00");

        expect(submitButton).toBeInTheDocument();

        fireEvent.change(quarterYYYYQField, {target: {value: '20224'}})
        fireEvent.change(nameField, {target: {value: 'Christmas Morning'}})
        fireEvent.change(localDateTimeField, {target: {value: "2022-12-25T08:00"}})

        fireEvent.click(submitButton);

        await waitFor(()=> expect(mockToast).toBeCalled);
        expect(mockToast).toBeCalledWith("UCSBDate Updated - id: 17 name: Christmas Morning");
        expect(mockNavigate).toBeCalledWith({ "to": "/ucsbdates/list" });
    });

});

