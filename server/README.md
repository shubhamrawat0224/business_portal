# RESTful API Backend

A Node.js and PostgreSQL-based RESTful API backend for a ride/order management dashboard with user authentication, role management, and analytics.

## Features

- User authentication (registration, login, OTP verification)
- Country-based registration restrictions
- JWT-based authentication
- Role-based user management (admin, driver, client, moderator)
- Product CRUD operations
- Orders, Shifts, Branches, Car Classes, Moderators, Messages APIs
- Dashboard statistics and analytics endpoints
- Pagination, sorting, and filtering for listings
- Secure password hashing
- Input validation
- Error handling
- Database triggers for timestamps

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restful_api
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

4. Initialize the database:

```bash
psql -U postgres -d restful_api -f src/database/init.sql
```

## Database Structure

- **users**: All users (admin, driver, client, moderator)
- **drivers**: Driver-specific info
- **clients**: Client-specific info
- **orders**: Ride/order records
- **products**: Product management
- **shifts**: Driver shifts
- **branches**: Branches/locations
- **car_classes**: Car class info
- **moderators**: Moderator assignments
- **messages**: User messages/notifications

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders

- `GET /api/orders` - List orders (filterable)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Shifts

- `GET /api/shifts` - List shifts (filterable)
- `GET /api/shifts/:id` - Get shift details
- `POST /api/shifts` - Start shift
- `PATCH /api/shifts/:id/end` - End shift
- `DELETE /api/shifts/:id` - Delete shift

### Branches

- `GET /api/branches` - List branches
- `GET /api/branches/:id` - Get branch details
- `POST /api/branches` - Create branch
- `PUT /api/branches/:id` - Update branch
- `DELETE /api/branches/:id` - Delete branch

### Car Classes

- `GET /api/car-classes` - List car classes
- `GET /api/car-classes/:id` - Get car class details
- `POST /api/car-classes` - Create car class
- `PUT /api/car-classes/:id` - Update car class
- `DELETE /api/car-classes/:id` - Delete car class

### Moderators

- `GET /api/moderators` - List moderators
- `GET /api/moderators/:id` - Get moderator details
- `POST /api/moderators` - Create moderator
- `PUT /api/moderators/:id` - Update moderator
- `DELETE /api/moderators/:id` - Delete moderator

### Messages/Notifications

- `GET /api/messages?user_id=...` - List messages for a user
- `GET /api/messages/:id` - Get message details
- `POST /api/messages` - Send message
- `PATCH /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message

### Dashboard/Statistics

- `GET /api/dashboard/statistics` - Get dashboard analytics (total orders, earnings, top drivers, progress, etc.)

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Testing

Run tests:

```bash
npm test
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation
- SQL injection prevention
- Country-based access restrictions
- Secure headers with helmet
- CORS protection

## Error Handling

The API includes comprehensive error handling for:

- Invalid input data
- Authentication failures
- Database errors
- Resource not found
- Unauthorized access

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
