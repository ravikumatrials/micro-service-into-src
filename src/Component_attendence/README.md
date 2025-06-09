
# Attendance Management Component

A standalone React component for managing employee attendance with manual check-in/check-out functionality.

## Features

- Manual attendance recording
- Check-in/Check-out tracking
- Exception handling
- Date-based filtering
- Employee search and filtering
- Project and location management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the component directory:
```bash
cd src/Component_attendence
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   ├── dialogs/        # Modal dialogs
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── data/               # Mock data
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React (icons)
- Date-fns
- Sonner (notifications)
- Vite (build tool)
