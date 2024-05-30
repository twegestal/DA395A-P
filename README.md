# Polyglot Lingo Venture

Polyglot Lingo Venture is a language quiz web app where you can learn new languages.

## Features

- **Create quiz**: The system generates a quiz for you based of your preferred language.
- **Play quiz**: The system provides a plethora of premade quizzes.
- **Stats**: The system saves your progress and you can monitor your stats.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine. These will be used to run the application and manage its dependencies.

```bash
# Check Node.js installation
node --version

# Check npm installation
npm --version
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/twegestal/DA395A-P.git
cd DA395A-P
```

2. Install dependencies:

```bash
npm install
```

3. Api access:

Create an API key on [OpenAI's webpage](https://platform.openai.com/account/api-keys). Then, create a `.env` file and paste your API key as described in the `.env.example`.

If you are a teacher reviewing this project - an api key is added as a comment on the inlämningssida i Canvas

4. Run the development server:

```bash
npm run dev
```

### Why we chose React

React is more widely used (42%) according to [StackOverflow](https://survey.stackoverflow.co/2022/#most-popular-technologies-webframe). We appreciate the use of JSX and hooks in React for several reasons:

- **JSX**: Allows for HTML to be written directly within JavaScript, making the code easier to understand.
- **Hooks**: Hooks like `useState` and `useEffect` enable functional components to manage state and lifecycle events. This simplifies the code and promotes the use of functional programming.

#### Comparison with Angular and Vue

- **Angular**: Provides a lot of functionality out of the box. However, we view Angular as having a higher learning curve than React, and the extended functionality was not needed for this small project.
- **Vue**: Seems quite easy to learn, has a quick setup, and would probably provide enough functionality for this project out of the box. However, Vue is not used as much in the industry as React and Angular.

Based on these observations and the fact that we had some previous experience working with React, Vue and Angular fell short.
