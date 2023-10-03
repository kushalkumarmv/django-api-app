import React from 'react';
import { render,screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import RegistrationForm from "../RegistrationForm";
import userFixtures from "../../../helpers/fixtures/user";

//By wrapping your RegistrationForm component with the MemoryRouter, 
// we provide the necessary routing context for the component and its use of useNavigate to work correctly during testing. 
import { MemoryRouter } from 'react-router-dom';
//This should resolve the error related to useNavigate, allowing you to test your RegistrationForm component without issues.

const userData = userFixtures();

test("Renders Registration form", async()=>{
    
    render(
        
    <MemoryRouter>
        <RegistrationForm/>
    </MemoryRouter> 
    );
    const user = userEvent; 

    const registerForm = screen.getByTestId("register-form");
    expect(registerForm).toBeInTheDocument();

    const firstNameField = screen.getByTestId("first-name-field");
    expect(firstNameField).toBeInTheDocument();

    const lastNameField = screen.getByTestId("last-name-field");
    expect(lastNameField).toBeInTheDocument();

    const emailAddressField = screen.getByTestId("email-field");
    expect(emailAddressField).toBeInTheDocument();

    const usernameField =screen.getByTestId("username-field");
    expect(usernameField).toBeInTheDocument();

    const passwordField =screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const bioField = screen.getByTestId("bio-field");
    expect(bioField).toBeInTheDocument();

    const password =faker.lorem.slug(2);
    user.type(usernameField, userData.username);
    user.type(firstNameField, userData.first_name);
    user.type(lastNameField, userData.last_name);
    user.type(emailAddressField, userData.email);
    user.type(bioField, userData.bio);
    user.type(passwordField, password);

    expect(usernameField.value).toBe(userData.username);
    expect(passwordField.value).toBe(password);
    expect(firstNameField.value).toBe(userData.first_name);
    expect(lastNameField.value).toBe(userData.last_name);
    expect(emailAddressField.value).toBe(userData.email);
    expect(bioField.value).toBe(userData.bio);   
});