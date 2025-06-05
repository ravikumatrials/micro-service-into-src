
# Master Service - Microservice

This is the Master Management Service, extracted from the monolithic application. It handles:

- **Projects Management**: Create, update, delete, and assign locations to projects
- **Employee Management**: Manage employee records, roles, and assignments
- **Role Management**: Define and configure user roles and permissions
- **Attendance Types**: Configure different types of attendance rules
- **Role-Attendance Logic**: Set up business logic for attendance based on roles

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The service will run on http://localhost:3003

### Build
```bash
npm run build
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Roles
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create new role
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

## Microservice Communication

This service communicates with other microservices via REST APIs:

- **Attendance Service** (Port 3001): Receives employee updates for attendance tracking
- **Dashboard Service** (Port 3002): Sends aggregated data for dashboard displays
- **Reports Service** (Port 3004): Provides employee and project data for reporting

## Environment Variables

Create a `.env` file:
```
NODE_ENV=development
API_GATEWAY_URL=http://localhost:8000
DATABASE_URL=your_database_url
SERVICE_PORT=3003
```

## Architecture

This service follows microservice principles:
- Independent deployment
- Own database schema
- API-first communication
- Service discovery ready
- Health check endpoints
