# Running the WebChat Navigator Project Locally

Follow these steps to get the project up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 20 or later. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm**: This is the Node.js package manager and is included with your Node.js installation.

## Step 1: Set Up Environment Variables

The project uses Genkit with Google AI, which requires an API key.

1.  Create a new file named `.env` in the root of the project directory.
2.  Add the following line to the `.env` file, replacing `<YOUR_API_KEY>` with your actual Google AI API key:

    ```
    GEMINI_API_KEY=<YOUR_API_KEY>
    ```

    You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Step 2: Install Project Dependencies

Open your terminal, navigate to the project's root directory, and run the following command to install all the necessary packages listed in `package.json`:

```bash
npm install
```

## Step 3: Run the Development Servers

This project requires two processes to be running simultaneously in separate terminal windows:

1.  **Terminal 1: Run the Next.js App**

    This command starts the main web application.

    ```bash
    npm run dev
    ```

    Your application will be available at `http://localhost:9002`.

2.  **Terminal 2: Run the Genkit AI Flows**

    This command starts the Genkit development server, which manages the AI functionality.

    ```bash
    npm run genkit:dev
    ```

    This will allow the Next.js app to communicate with your AI flows.

## Summary

-   **Terminal 1**: `npm run dev`
-   **Terminal 2**: `npm run genkit:dev`

Once both commands are running, you can open your web browser to `http://localhost:9002` to use the application.
