import { OpenAPIObject } from 'openapi3-ts/oas30';
const swaggerSpec: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Car Parking management system Application',
    version: '1.0.0',
    description: 'An API Documentation',
  },
  paths: {
    '/rest/ccpms/api/v1/register': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Create a new user with the required details',
        requestBody: {
          description: 'User object that needs to be added to the system',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '409': {
            description: 'Conflict',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/rest/ccpms/api/v1/login': {
      post: {
        tags: ['Users'],
        summary: 'Login to get a JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                  type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid username or password',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/rest/ccpms/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get a User by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the User to retrieve',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update a User by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the User to update',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          description: 'User object that needs to be updated',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete a User by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID of the User to delete',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User deleted successfully',
          },
          '404': {
            description: 'User not found',
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    
    '/rest/cpms/api/v1/send-mail': {
      post: {
        tags: ['Emails'],
        summary: 'Send Email',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          description: 'Email request',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmailInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Email sent successfully',
            content: {
              'application/json': {
              },
            },
          },
          '500': {
            description: 'Internal server error',
          },
        },
      },
    },
    '/rest/cpms/api/v1/parks': {
      get: {
        tags: ['Parks'],
        summary: 'Get all Parks',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of Parks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Park',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Parks'],
        summary: 'Create a new Park',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ParkInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Park created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Park',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/parks/{id}': {
      get: {
        tags: ['Parks'],
        summary: 'Get a Park by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Park details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Park',
                },
              },
            },
          },
          '404': {
            description: 'Park not found',
          },
        },
      },
      put: {
        tags: ['Parks'],
        summary: 'Update a Park',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ParkInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Park updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Park',
                },
              },
            },
          },
          '404': {
            description: 'Park not found',
          },
        },
      },
      delete: {
        tags: ['Parks'],
        summary: 'Delete a Park',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Park deleted successfully',
          },
          '404': {
            description: 'Park not found',
          },
        },
      },
    },
    '/rest/cpms/api/v1/vehicles': {
      get: {
        tags: ['Vehicles'],
        summary: 'Get all vehicles',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of vehicles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Vehicle',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Vehicles'],
        summary: 'Create a new vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/VehicleInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Vehicle created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Vehicle',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/vehicles/{id}': {
      get: {
        tags: ['Vehicles'],
        summary: 'Get a vehicle by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Vehicle details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Vehicle',
                },
              },
            },
          },
          '404': {
            description: 'Vehicle not found',
          },
        },
      },
      put: {
        tags: ['Vehicles'],
        summary: 'Update a vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/VehicleInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Vehicle updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Vehicle',
                },
              },
            },
          },
          '404': {
            description: 'Vehicle not found',
          },
        },
      },
      delete: {
        tags: ['Vehicles'],
        summary: 'Delete a vehicle',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Vehicle deleted successfully',
          },
          '404': {
            description: 'Vehicle not found',
          },
        },
      },
    },
    '/rest/cpms/api/v1/bookings': {
      get: {
        tags: ['Bookings'],
        summary: 'Get all bookings',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of bookings',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Booking',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Bookings'],
        summary: 'Create a new booking',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookingInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Booking created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Booking',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/bookings/{id}': {
      get: {
        tags: ['Bookings'],
        summary: 'Get a booking by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Booking details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Booking',
                },
              },
            },
          },
          '404': {
            description: 'Booking not found',
          },
        },
      },
      put: {
        tags: ['Bookings'],
        summary: 'Update a booking',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BookingInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Booking updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Booking',
                },
              },
            },
          },
          '404': {
            description: 'Booking not found',
          },
        },
      },
      delete: {
        tags: ['Bookings'],
        summary: 'Delete a booking',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Booking deleted successfully',
          },
          '404': {
            description: 'Booking not found',
          },
        },
      },
    },
    '/rest/cpms/api/v1/notifications': {
      get: {
        tags: ['Notifications'],
        summary: 'Get all notifications',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of notifications',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Notification',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Notifications'],
        summary: 'Create a new notification',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NotificationInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Notification created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Notification',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/notifications/{id}': {
      get: {
        tags: ['Notifications'],
        summary: 'Get a notification by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Notification details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Notification',
                },
              },
            },
          },
          '404': {
            description: 'Notification not found',
          },
        },
      },
      put: {
        tags: ['Notifications'],
        summary: 'Update a notification',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NotificationInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Notification updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Notification',
                },
              },
            },
          },
          '404': {
            description: 'Notification not found',
          },
        },
      },
      delete: {
        tags: ['Notifications'],
        summary: 'Delete a notification',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Notification deleted successfully',
          },
          '404': {
            description: 'Notification not found',
          },
        },
      },
    },
    '/rest/cpms/api/v1/histories': {
      get: {
        tags: ['Histories'],
        summary: 'Get all histories',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of histories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/History',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Histories'],
        summary: 'Create a new history',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HistoryInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'History created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/History',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/histories/{id}': {
      get: {
        tags: ['Histories'],
        summary: 'Get a history by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'History details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/History',
                },
              },
            },
          },
          '404': {
            description: 'History not found',
          },
        },
      },
      put: {
        tags: ['Histories'],
        summary: 'Update a history',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HistoryInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'History updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/History',
                },
              },
            },
          },
          '404': {
            description: 'History not found',
          },
        },
      },
      delete: {
        tags: ['Histories'],
        summary: 'Delete a history',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'History deleted successfully',
          },
          '404': {
            description: 'History not found',
          },
        },
      },
    },
    '/rest/cpms/api/v1/payments': {
      post: {
        tags: ['Payments'],
        summary: 'Create a new payment',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Payment created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/payments/complete': {
      post: {
        tags: ['Payments'],
        summary: 'Complete a payment',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  paymentId: { type: 'integer' },
                  transactionId: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Payment completed successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment',
                },
              },
            },
          },
        },
      },
    },
    '/rest/cpms/api/v1/payments/receipt/:paymentId': {
      get: {
        tags: ['Payments'],
        summary: 'Get a payment receipt',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'paymentId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payment receipt',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      firstName: {
        type: 'string',
        example: 'John Smith',
      },
      lastName: {
        type: 'string',
        example: 'John Smith',
      },
      email: {
        type: 'string',
        example: 'john@example.com',
      },
      role: {
        type: 'string',
        example: 'USER',
        enum: ['ATTENDANT', 'ADMIN'],
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  UserInput: {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        example: 'John Smith',
      },
      lastName: {
        type: 'string',
        example: 'John Smith',
      },
      email: {
        type: 'string',
        example: 'john@example.com',
      },
      password: {
        type: 'string',
        example: 'password123',
      },
    },
  },
  EmailInput: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        example: 'john@gmail.com',
      }
    },
  },
  Vehicle: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      plateNumber: {
        type: 'string',
        example: 'ABC123',
      },
      parkingCode: {
        type: 'string',
        example: 'randomCode123',
      },
      user: {
        $ref: '#/components/schemas/User',
      },
      entryTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      exitTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      chargedAmount: {
        type: 'number',
        format: 'float',
        example: 1000.50,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  "VehicleInput": {
  "type": "object",
  "required": ["plateNumber", "parkingCode", "userId"],
  "properties": {
    "plateNumber": {
      "type": "string",
      "example": "ABC123"
    },
    "parkingCode": {
      "type": "string",
      "example": "randomCode123"
    },
    "userId": {
      "type": "number",
      "example": 1
    },
    "entryTime": {
      "type": "string",
      "format": "date-time",
      "example": "2023-01-01T00:00:00Z"
    },
    "exitTime": {
      "type": "string",
      "format": "date-time",
      "example": "2023-01-01T00:00:00Z"
    },
    "chargedAmount": {
      "type": "number",
      "format": "float",
      "example": 1000.50
    }
  }
},
  Park: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      code: {
        type: 'string',
        example: 'ABC123',
      },
      parkingName: {
        type: 'string',
        example: 'Downtown Parking',
      },
      numberOfAvailableSpaces: {
        type: 'number',
        example: 100,
      },
      location: {
        type: 'string',
        example: '123 Main St',
      },
      chargingFeePerHr: {
        type: 'number',
        format: 'float',
        example: 15.50,
      },
      status: {
        type: 'string',
        enum: ['AVAILABLE', 'OCCUPIED'],
        example: 'AVAILABLE',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  ParkInput: {
    type: 'object',
    required: ['parkingName', 'numberOfAvailableSpaces', 'location', 'chargingFeePerHr'],
    properties: {
      code: {
        type: 'string',
        example: 'ABC123',
      },
      parkingName: {
        type: 'string',
        example: 'Downtown Parking',
      },
      numberOfAvailableSpaces: {
        type: 'number',
        example: 100,
      },
      location: {
        type: 'string',
        example: '123 Main St',
      },
      chargingFeePerHr: {
        type: 'number',
        format: 'float',
        example: 1000.50,
      },
      status: {
        type: 'string',
        enum: ['AVAILABLE', 'OCCUPIED'],
        example: 'AVAILABLE',
      },
    },
  },
  Booking: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      user: {
        $ref: '#/components/schemas/User',
      },
      vehicle: {
        $ref: '#/components/schemas/Vehicle',
      },
      Park: {
        $ref: '#/components/schemas/Park',
      },
      startTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T10:00:00Z',
      },
      endTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T12:00:00Z',
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        example: 'PENDING',
      },
      totalCost: {
        type: 'number',
        format: 'float',
        example: 30.00,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  BookingInput: {
    type: 'object',
    required: ['userId', 'vehicleId', 'ParkId', 'startTime', 'endTime'],
    properties: {
      userId: {
        type: 'number',
        example: 1,
      },
      vehicleId: {
        type: 'number',
        example: 1,
      },
      ParkId: {
        type: 'number',
        example: 1,
      },
      startTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T10:00:00Z',
      },
      endTime: {
        type: 'string',
        format: 'date-time',
        example: '2023-01-01T12:00:00Z',
      },
    },
  },
  Payment: {
    type: 'object',
    properties: {
      id: { 
        type: 'number',
        example: 1,
      },
      booking: { 
        $ref: '#/components/schemas/Booking' 
      },
      amount: { 
        type: 'number', 
        format: 'float',
        example: 30.00,
      },
      status: { 
        type: 'string', 
        enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
        example: 'COMPLETED',
      },
      receiptNumber: { 
        type: 'string',
        example: 'RCPT-12345',
      },
      paymentMethod: { 
        type: 'string',
        example: 'CREDIT_CARD',
      },
      transactionId: { 
        type: 'string',
        example: 'TXN-67890',
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: { 
        type: 'string', 
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  PaymentInput: {
    type: 'object',
    required: ['bookingId', 'paymentMethod'],
    properties: {
      bookingId: { 
        type: 'number',
        example: 1,
      },
      paymentMethod: { 
        type: 'string',
        example: 'CREDIT_CARD',
      },
    },
  },
  
  Notification: {
    type: 'object',
    properties: {
      id: { 
        type: 'number',
        example: 1,
      },
      user: { 
        $ref: '#/components/schemas/User' 
      },
      type: { 
        type: 'string', 
        enum: ['BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'Park_AVAILABLE', 'PAYMENT_DUE', 'REMINDER'],
        example: 'BOOKING_CONFIRMED',
      },
      channel: { 
        type: 'string', 
        enum: ['EMAIL', 'PUSH', 'SMS', 'IN_APP'],
        example: 'EMAIL',
      },
      status: { 
        type: 'string', 
        enum: ['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED'],
        example: 'SENT',
      },
      subject: { 
        type: 'string',
        example: 'Your booking is confirmed',
      },
      message: { 
        type: 'string',
        example: 'Your parking Park has been successfully booked.',
      },
      referenceId: { 
        type: 'number',
        example: 123,
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
      updatedAt: { 
        type: 'string', 
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  NotificationInput: {
    type: 'object',
    required: ['userId', 'type', 'channel', 'subject', 'message'],
    properties: {
      userId: { 
        type: 'number',
        example: 1,
      },
      type: { 
        type: 'string', 
        enum: ['BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'Park_AVAILABLE', 'PAYMENT_DUE', 'REMINDER'],
        example: 'BOOKING_CONFIRMED',
      },
      channel: { 
        type: 'string', 
        enum: ['EMAIL', 'PUSH', 'SMS', 'IN_APP'],
        example: 'EMAIL',
      },
      subject: { 
        type: 'string',
        example: 'Your booking is confirmed',
      },
      message: { 
        type: 'string',
        example: 'Your parking Park has been successfully booked.',
      },
      referenceId: { 
        type: 'number',
        example: 123,
      },
    },
  },
  
  History: {
    type: 'object',
    properties: {
      id: { 
        type: 'number',
        example: 1,
      },
      entityType: { 
        type: 'string',
        example: 'Booking',
      },
      entityId: { 
        type: 'string',
        example: '42',
      },
      action: { 
        type: 'string', 
        enum: ['CREATE', 'UPDATE', 'DELETE'],
        example: 'CREATE',
      },
      actorEmail: { 
        type: 'string',
        example: 'admin@example.com',
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        example: '2023-01-01T00:00:00Z',
      },
    },
  },
  HistoryInput: {
    type: 'object',
    required: ['entityType', 'entityId', 'action', 'actorEmail'],
    properties: {
      entityType: { 
        type: 'string',
        example: 'Booking',
      },
      entityId: { 
        type: 'string',
        example: '42',
      },
      action: { 
        type: 'string', 
        enum: ['CREATE', 'UPDATE', 'DELETE'],
        example: 'CREATE',
      },
      actorEmail: { 
        type: 'string',
        example: 'admin@example.com',
      },
    },
  },
    },
  },
};

export default swaggerSpec;