import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";

import { faker } from "@faker-js/faker";
import userFixtures from "../../../helpers/fixtures/user";

import { MemoryRouter } from "react-router-dom";

const userData = userFixtures();

test("Renders Login form",async ()=>{
    const user = userEvent;
    render(
        // Wrap your component with MemoryRouter in your test
        <MemoryRouter>
            <LoginForm/>
        </MemoryRouter>
    );

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    const usernameField =screen.getByTestId("username-field");
    expect(usernameField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const password =faker.lorem.slug(2);
    user.type(usernameField, userData.username);
    user.type(passwordField, password);

    expect(usernameField.value).toBe(userData.username);
    expect(passwordField.value).toBe(password);

    
    
});