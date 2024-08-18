# Customer CRM Integration

This project is a Customer Relationship Management (CRM) application built using React, Node.js, Express.js, and SQLite. The application allows you to manage customer data and integrate with a Zoho CRM for pushing customer details.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Features

- Add, view, and manage customer details.
- Push customer data to Zoho CRM.
- Persistent storage using SQLite.
- Responsive user interface.

## Getting Started

These instructions will guide you to set up the project on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- SQLite installed (or use the SQLite3 package via Node.js).
- A Zoho CRM account with API access.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/customer-crm-integration.git
   cd customer-crm-integration

2. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd frontend
   npm install
   cd ..

## Running the Application

1. **Start the Express server:**

   ```bash
   cd backend
   node server.js

2. **Start the React client:**

   ```bash
   cd frontend
   npm start

3. **Open your browser and navigate to:**

   ```bash
   http://localhost:3000
