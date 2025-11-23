# Signup-Login Project

A simple signup and login system with only backend (server-side).

## Description

This project provides a basic user registration and login system. The goal of this project is to practice implementing simple authentication and get familiar with the structure of a web application.

> **Note**: This project uses lowdb for data storage. All user data is saved in a local file called db.json inside the project directory.

> **Note**: This project is server-side only and does not have a frontend.

## How it works

1. Run npm start in the terminal.
2. Send a request using an API client to the /register route.
3. The data must follow the schema defined in the database model.
4. After signing up, the entered password is hashed.
5. After logging in with the same data, a JWT token is returned in the response.
