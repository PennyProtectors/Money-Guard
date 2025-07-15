# Money Guard

Money Guard is a modern React application built with [Vite](https://vitejs.dev/) for fast development and optimal performance. This project aims to help users manage their finances efficiently with an intuitive interface and robust features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Getting Started](#getting-started)
- [Development](#development)
- [License](#license)

## Overview

Money Guard provides tools for tracking expenses, setting budgets, and visualizing financial data. The project leverages React's component-based architecture and Vite's lightning-fast build system.

## Features

- Expense tracking and categorization
- Budget management
- Interactive charts and analytics
- Responsive design
- Fast Refresh for instant feedback during development
- ESLint integration for code quality

## Tech Stack

- **Frontend:** React, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **HTTP Client:** Axios
- **Form Handling:** Formik, React Hook Form
- **Data Visualization:** Chart.js
- **Styling:** CSS Modules
- **Linting:** ESLint

## Project Structure

```
Money-Guard/
├── src/
│   ├── assets/          # Images and other static assets
│   ├── components/      # Reusable UI components (e.g., LoginForm, Chart)
│   ├── config/          # Configuration files (e.g., API setup)
│   ├── helpers/         # Helper functions
│   ├── pages/           # Application pages (e.g., Dashboard, Login)
│   ├── redux/           # Redux store, slices, and actions
│   │   ├── auth/
│   │   ├── statics/
│   │   └── transactions/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Public assets
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## Contributors

| Name              | Role         |
| ----------------- | ------------ |
| Merve Delibaşoğlu | Scrum Master |
| Özge Sevim        | Team Lead    |
| Mürsel Şen        | Developer    |
| Burak Altun       | Developer    |
| Beyza Nur Minteş  | Developer    |
| Okan Özdemir      | Developer    |
| Emre Soyaltın     | Developer    |
| Özkan Bırak       | Developer    |

_Please update the table with all contributors and their roles._

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PennyProtectors/Money-Guard.git
   cd Money-Guard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Development

- **ESLint:** The project uses ESLint for code quality. You can expand the configuration for production use and TypeScript integration. See the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for more info.
- **Fast Refresh:** Enabled via Vite plugins for instant feedback.

## License

This project is licensed under the MIT License.

---

For questions or suggestions, please open an issue or contact the maintainers.
