import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText("Contact Form");
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "joe");
  const error = screen.findByText("firstName must have at least 5 characters.");
  error.then((error) => expect(error).toBeInTheDocument());
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submit = screen.getByRole("button");
  userEvent.click(submit);
  waitFor(async () => {
    const error1 = screen.findByText(
      "firstName must have at least 5 characters."
    );
    const error2 = screen.findByText("lastName is a required field.");
    const error3 = screen.findByText("email must be a valid email address.");
    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    expect(error3).toBeInTheDocument();
  });
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstName = screen.getByLabelText(/first name/i);
  userEvent.type(firstName, "Jerry");
  const lastName = screen.getByLabelText(/last name/i);
  userEvent.type(lastName, "Johnson");
  const email = screen.getByLabelText(/email/i);
  userEvent.type(email, "jerry@gmail");
  const error = screen.findByText(
    "Error: email must be a valid email address."
  );
  error.then((error) => expect(error).toBeInTheDocument());
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
});
