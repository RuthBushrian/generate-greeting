## Project Overview

This project utilizes the OpenAI GPT-3 API to generate personalized greetings. The server and client components work together to provide a seamless experience for users.

## Getting Started

### Prerequisites

- Node.js installed (https://nodejs.org/)
- npm (Node Package Manager) installed
- Angular CLI installed (`npm install -g @angular/cli`)
- OpenAI API key

### Server Setup

1. Create a file named `.env` in the `server` directory.

2. Set the OpenAI API key in the `.env` file:

   ```
   OPENAI_API_KEY=your_api_key
   ```

   Replace `your_api_key` with your actual OpenAI API key.

3. Open a terminal and navigate to the `server` directory:

   ```bash
   cd server
   ```

4. Install the required dependencies:

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will now be running, ready to handle requests.

### Client Setup

1. Open a new terminal window.

2. Navigate to the `client` directory:

   ```bash
   cd client
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the Angular development server:

   ```bash
   ng s -o
   ```

   The client application will open in your default web browser.

## Usage

1. With both the server and client running, visit the client application in your web browser.

2. Interact with the application to generate personalized greetings using the OpenAI GPT-3 API.

## Important Note

Ensure that you handle your API keys securely and do not expose them publicly. The `.env` file containing your API key should never be shared or committed to version control.

Enjoy generating personalized greetings with the OpenAI-powered project!