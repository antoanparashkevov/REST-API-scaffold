# Nodejs Expressjs MongoDB Ready-to-use API Project Structure

[![Author](https://img.shields.io/badge/author-%40antoanparashkevov-green)](https://www.linkedin.com/in/antoanp/) [![GitHub license](https://img.shields.io/badge/licence-MIT-yellow)](https://github.com/antoanparashkevov/REST-API-scaffold/blob/main/LICENSE) ![GitHub repo size](https://img.shields.io/github/repo-size/antoanparashkevov/REST-API-scaffold)

A ready-to-use boilerplate for REST API Development with Node.js, Express, and MongoDB and mongoose

## Getting started

This is a basic API skeleton written in JavaScript ES2016. Very useful to building a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, Vue, etc).

This project will run on **NodeJs** using **MongoDB** as database. I had tried to maintain the code structure easy as any beginner can also adopt the flow and start building an API.

## Features

- Basic Authentication (Register/Login with hashed password) including JWT.
- Account confirmation with 4 (Changeable) digit OTP.
- Pre-defined response structures with proper status codes.
- Included CORS.
- Validations added.
- Light-weight project.
- Linting with [Eslint](https://eslint.org/).

## Software Requirements

- Node.js **18+**
- MongoDB **3.6+** (Recommended **4+**)

## How to install

### Using Git (recommended)

1.  Clone the project from GitHub. Change "myproject" to your project name.
```bash
git clone https://github.com/antoanparashkevov/REST-API-scaffold.git ./myproject
```

### Using manual download ZIP

1.  Download the repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
```bash
cp .env.example .env
```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.

## How to run

### Running API server locally

```bash
npm run start:development
```

You will know server is running by checking the output of the command `npm run start:development`

```bash
Server listening on port YOUR PORT

Press CTRL + C to stop the process.
```

**Note:** `DATABASE_CONNECTION_URL` will be your MongoDB connection string.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

## ESLint

### Running Eslint

```bash
npm run lint
```

You can set custom rules for eslint in `.eslintrc.json` file, Added at project root.


## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.