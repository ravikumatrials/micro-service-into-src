
# Attendance Management System

A standalone React application for managing employee attendance with manual check-in/check-out functionality and attendance history.

## Features

- **Manual Attendance Management**: Mark employee check-ins and check-outs manually
- **Date-based Filtering**: View attendance for specific dates
- **Exception Handling**: Manage attendance exceptions and anomalies
- **Attendance History**: View and filter historical attendance records
- **Project & Entity Management**: Organize attendance by projects and entities
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Lucide React Icons
- Date-fns for date handling
- React Router for navigation
- Sonner for notifications

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Copy this Component_attendence folder to your desired location
2. Navigate to the folder:
   ```bash
   cd Component_attendence
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/           # UI Components
│   ├── ui/              # Base UI components (Button, Input, etc.)
│   ├── dialogs/         # Modal dialogs
│   ├── form-fields/     # Form field components
│   └── ...              # Feature components
├── pages/               # Main pages
├── types/               # TypeScript type definitions
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── styles/              # CSS styles
```

## Features Overview

### Manual Attendance
- Check-in employees with project selection and location verification
- Check-out employees with time tracking
- Handle attendance exceptions

### Attendance History
- View historical attendance records
- Filter by date range, employee, project, category, etc.
- Export attendance data

### Data Management
- Mock data included for development and testing
- Easy integration with real APIs
- Type-safe data handling with TypeScript

## Customization

### Adding New Projects
Edit `src/data/attendanceData.ts` to add new projects:

```typescript
export const attendanceMockProjects: AttendanceProject[] = [
  {
    id: 6,
    name: "Your New Project",
    location: "Project Location",
    coordinates: { geofenceData: "lat,lng,radius" }
  }
];
```

### Styling
The application uses Tailwind CSS. Customize colors and themes in:
- `tailwind.config.ts` - Theme configuration
- `src/styles/globals.css` - CSS variables and global styles

### API Integration
Replace mock data calls in components with real API calls. The components are designed to work with any backend that provides the expected data structure.

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Keep components small and focused
4. Use the existing UI component library
5. Add error handling and loading states

## License

This is a standalone component that can be used in any project.
