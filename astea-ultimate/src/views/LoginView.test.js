import { getByLabelText, getBwyText, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import LoginView from './LoginView';
import { render } from './test-utils';

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
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                sessionID: "666666"
            });
        });

        const { getByTestId, getByText, getByLabelText } = render(<LoginView />);

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

    });
});