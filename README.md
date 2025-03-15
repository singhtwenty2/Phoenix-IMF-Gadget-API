# IMF Gadget API

![IMF Logo](https://img.shields.io/badge/IMF-Gadget%20API-blue?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Node Version](https://img.shields.io/badge/node-v16+-green.svg?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-6.5.0-lightblue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=for-the-badge)

## 🔒 Secure Field Operations Gadget Management System

The IMF Gadget API is a sophisticated, secure RESTful service designed for managing mission-critical field operation gadgets. Built with TypeScript, Express, and Prisma, this API provides comprehensive gadget lifecycle management with role-based access control.

## 🌟 Features

- **Complete Gadget Lifecycle Management**: Track gadgets from creation through deployment, decommissioning, and destruction
- **Role-Based Access Control**: Admin and agent permission levels for secure operations
- **JWT Authentication**: Secure token-based authentication system
- **Interactive API Documentation**: Explore and test the API with Swagger UI
- **Security-First Design**: Implements helmet, rate limiting, and CORS protection
- **TypeScript**: Fully typed codebase for improved developer experience and reliability
- **Prisma ORM**: Type-safe database access with migration support
- **Express Framework**: Fast, unopinionated web framework for Node.js

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Gadget Management](#gadget-management)
- [Security Features](#security-features)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/singhtwenty2/Phoenix-IMF-Gadget-API
cd imf-gadget-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/imf_gadgets?schema=public"

# JWT
JWT_SECRET="your_super_secret_key"
JWT_EXPIRATION="24h"
```

## 📚 API Documentation

### Interactive Swagger Documentation

The API includes comprehensive Swagger documentation available at:

```
https://phoenix-imf-gadget-api-hn2o.onrender.com/
```

This interactive interface allows you to:
- Explore all available endpoints
- Test API calls directly from your browser
- View request/response schemas
- Authenticate using your JWT token

### API Endpoints Overview

#### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Log in and receive JWT token | Public |

#### Gadget Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gadgets` | Get all gadgets (with optional status filter) | Authenticated |
| GET | `/api/gadgets/:id` | Get a specific gadget by ID | Authenticated |
| POST | `/api/gadgets` | Create a new gadget | Admin |
| PATCH | `/api/gadgets/:id` | Update a gadget | Admin |
| DELETE | `/api/gadgets/:id` | Decommission a gadget | Admin |
| POST | `/api/gadgets/:id/self-destruct` | Initiate gadget self-destruct sequence | Authenticated |
| GET | `/api/gadgets/status/:status` | Get gadgets filtered by status | Authenticated |

#### System Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/health` | Check API health status | Public |

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication:

1. **Registration**: Create a new account with username, password, and optional role (default: agent)
2. **Login**: Authenticate and receive a JWT token
3. **Authorization**: Include the token in subsequent requests as a Bearer token in the Authorization header

### Example Authentication Flow:

```bash
# Register a new user
curl -X POST https://phoenix-imf-gadget-api-hn2o.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "agent007", "password": "secret", "role": "agent"}'

# Login and receive token
curl -X POST https://phoenix-imf-gadget-api-hn2o.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "agent007", "password": "secret"}'

# Use token in requests
curl -X GET https://phoenix-imf-gadget-api-hn2o.onrender.com/api/gadgets \
  -H "Authorization: Bearer your_jwt_token"
```

## 🛠️ Gadget Management

The API provides comprehensive gadget lifecycle management:

### Gadget Statuses:

- **Available**: Ready for deployment
- **Deployed**: Currently in use on mission
- **Decommissioned**: Permanently retired
- **Destroyed**: Self-destructed or otherwise rendered inoperable

### Gadget Operations:

- **Create**: Add new gadgets to inventory (Admin only)
- **Update**: Modify gadget details or status (Admin only)
- **Decommission**: Retire gadgets from service (Admin only)
- **Self-Destruct**: Emergency destruction protocol (Any authenticated user with confirmation code)

## 🔒 Security Features

The API implements multiple layers of security:

- **Helmet**: Sets various HTTP headers for app security
- **Rate Limiting**: Prevents brute force and DoS attacks
- **CORS Protection**: Configurable cross-origin resource sharing
- **Password Hashing**: Secure password storage with bcrypt
- **JWT Authentication**: Stateless, secure authentication
- **Role-Based Access**: Different permission levels for different operations
- **Error Handling**: Sanitized error responses

## 💾 Database

The API uses Prisma ORM with PostgreSQL:

- **Migrations**: Version-controlled schema changes
- **Type Safety**: Fully typed database queries
- **Seeding**: Sample data for development and testing

### Database Schema:

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  password  String
  role      String   @default("agent")
  createdAt DateTime @default(now())
}

model Gadget {
  id        String       @id @default(uuid())
  name      String
  status    GadgetStatus @default(Available)
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

enum GadgetStatus {
  Available
  Deployed
  Destroyed
  Decommissioned
}
```

## 🧪 Testing

The project includes a comprehensive test suite:

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage
```

## 📦 Deployment

The API is designed for easy deployment to various environments:

```bash
# Build the application
npm run build

# Start the server
npm start
```

### Deployment Options:

- **Docker**: Containerized deployment
- **Heroku**: Simple deployment with Procfile
- **AWS/Azure/GCP**: Cloud service deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*"This message will self-destruct in five seconds."* - SINGHTWENTY2