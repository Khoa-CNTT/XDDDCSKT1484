# ReactJS Application

This is a simple ReactJS application. Follow the steps below to set up and run the project locally.

---

## Prerequisites

Before running the application, ensure that you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

You can check the versions by running the following commands in your terminal:

```bash
    node -v
    npm -v
    # or
    yarn -v
```

Step 1: Clone the Repository:
git clone https://github.com/Khoa-CNTT/XDDDCSKT1484.git
cd frontend

Step 2: Create File Environment

create '.env.local' file in frontend folder

```bash
# Port FE
PORT=1407

# Call api local with server address below
REACT_APP_API_BASE_URL=http://localhost:8080/
```

Copy the above content and paste it into the .env.local file

Step 3: Install Dependencies

```bash
    npm install --legacy-peer-deps
    # or
    yarn install --legacy-peer-deps
```

Step 3: Start the Development Server

```bash
    npm start
    # or
    yarn start
```
