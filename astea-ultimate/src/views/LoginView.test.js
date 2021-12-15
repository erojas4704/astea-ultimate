import { getByLabelText, getBwyText, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import LoginView from './LoginView';
import { render } from './test-utils';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

describe("login page rendering", () => {
    it("renders properly", () => {
        render(<LoginView />);
    });

    it("displays the login fields", () => {
        const { getByLabelText } = render(<LoginView />);
        expect(getByLabelText(/username:/i)).toBeInTheDocument();
        expect(getByLabelText(/password:/i)).toBeInTheDocument();
    });

    it("displays the submit button", () => {
        const { getByText } = render(<LoginView />);
        expect(getByText(/log in/i)).toBeInTheDocument();
    });
});

describe("login page behavior", () => {
    it("should allow the user to log in successfully.", async () => {
        jest.spyOn(axios, 'post').mockImplementationOnce(() => {
            return Promise.resolve({
                data: {
                    sessionID: "666666",
                    success: true
                }
            });
        });

        const { getByTestId, getByText, getByLabelText } = render(<LoginView />, { includeRouter: true });

        await act(async () => {
            fireEvent.change(getByLabelText(/username/i), {
                target: { value: "bert" }
            });

            fireEvent.change(getByLabelText(/password/i), {
                target: { value: "123456" }
            });

        });

        await act(async () => {
            fireEvent.submit(getByTestId("login-form"));
        });

        expect(getByText(/locator/i)).toBeInTheDocument();
    });
});