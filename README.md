# Car Parking Management System (CPMS)

A modern, full-stack application for managing parking facilities efficiently. Built with TypeScript, Node.js, and React.

## 🚀 Features

- **User Management**
  - Role-based access control (Admin, Attendant)
  - User authentication and authorization
  - Profile management
  - Secure password handling

- **Vehicle Management**
  - Vehicle registration and tracking
  - Entry and exit management
  - Parking duration tracking
  - Automated fee calculation

- **Parking Facility Management**
  - Multiple parking lot support
  - Real-time space availability
  - Parking lot status monitoring
  - Facility maintenance tracking

- **Reporting & Analytics**
  - Vehicle entry/exit reports
  - Revenue tracking
  - Usage statistics
  - Custom date range reports

- **Email Notifications**
  - Automated notifications for users
  - Parking status updates
  - Payment confirmations

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: TypeORM
- **Database**: MySQL
- **Authentication**: JWT
- **Email**: Nodemailer

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Build Tool**: Vite

## 📁 Project Structure

```
cpms/
├── cpms-back/           # Backend application
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API routes
│   │   └── utils/       # Helper functions
│   └── tests/           # Backend tests
│
├── cpms-front/          # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Helper functions
│   └── tests/           # Frontend tests
│
├── Database-dump/       # Database backups
├── Architecture/        # System architecture docs
├── ERD-diagram/         # Database schema
└── UI-Design/          # UI/UX design assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cpms.git
cd cpms
```

2. Install dependencies:
```bash
# Install dependencies
npm install

3. Set up environment variables:
```bash
# In cpms-back directory
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
# Import the database schema
mysql -u your_username -p your_database < Database-dump/init.sql
```

5. Start the development servers:
```bash
# Start backend server
npm run dev:pms

# Start frontend server
npm run dev:react
```

## 📚 API Documentation

The API documentation is available at `/api-docs` when running the backend server.

### Key Endpoints

- **Authentication**
  - POST `/api/auth/login` - User login
  - POST `/api/auth/register` - User registration

- **Users**
  - GET `/api/users` - Get all users
  - GET `/api/users/:id` - Get user by ID
  - PUT `/api/users/:id` - Update user
  - DELETE `/api/users/:id` - Delete user

- **Vehicles**
  - GET `/api/vehicles` - Get all vehicles
  - POST `/api/vehicles` - Register new vehicle
  - PUT `/api/vehicles/:id` - Update vehicle
  - POST `/api/vehicles/:id/entry` - Record vehicle entry
  - POST `/api/vehicles/:id/exit` - Record vehicle exit

- **Parks**
  - GET `/api/parks` - Get all parking facilities
  - POST `/api/parks` - Create new parking facility
  - PUT `/api/parks/:id` - Update parking facility
  - DELETE `/api/parks/:id` - Delete parking facility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.