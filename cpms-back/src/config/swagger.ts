import { OpenAPIObject } from 'openapi3-ts/oas30';
const swaggerSpec: OpenAPIObject = {
  openapi: '3.0.0',
  info: {
    title: 'Car Parking management system Application',
    version: '1.0.0',
    description: 'An API Documentation',
  },
  paths: {
    '/rest/cpms/api/v1/register': {
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
    '/rest/cpms/api/v1/login': {
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
    '/rest/cpms/api/v1/users': {
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
'/rest/cpms/api/v1/vehicles/entry': {
  post: {
    tags: ['Vehicles'],
    summary: 'Register vehicle entry and generate ticket',
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/VehicleEntryInput'
          }
        }
      }
    },
    responses: {
      '201': {
        description: 'Vehicle entry recorded and ticket generated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EntryTicket'
            }
          }
        }
      },
      '400': {
        description: 'Parking full or invalid input'
      }
    }
  }
},
'/rest/cpms/api/v1/vehicles/exit/{id}': {
  post: {
    tags: ['Vehicles'],
    summary: 'Register vehicle exit and generate bill',
    security: [
      {
        bearerAuth: []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'integer'
        }
      }
    ],
    responses: {
      '200': {
        description: 'Vehicle exited and bill generated',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ExitBill'
            }
          }
        }
      },
      '404': {
        description: 'Vehicle not found'
      }
    }
  }
},
  "/rest/cpms/api/v1/vehicles/entries": {
    "get": {
      "tags": ['Vehicles'],
      "summary": "Get entered vehicles between two dates",
      "parameters": [
        {
          "in": "query",
          "name": "start",
          "required": true,
          "schema": {
            "type": "string",
            "format": "date-time"
          },
          "description": "Start date/time (ISO 8601 format)",
          "example": "2025-05-01T00:00:00Z"
        },
        {
          "in": "query",
          "name": "end",
          "required": true,
          "schema": {
            "type": "string",
            "format": "date-time"
          },
          "description": "End date/time (ISO 8601 format)",
          "example": "2025-05-20T23:59:59Z"
        }
      ],
      "responses": {
        "200": {
          "description": "List of entered vehicles between the two dates",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "vehicles": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Vehicle"
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Missing or invalid date parameters"
        }
      }
    }
  },
  "/vehicles/exits": {
    "get": {
      "tags": ['Vehicles'],
      "summary": "Get exited vehicles between two dates with total charged amount",
      "parameters": [
        {
          "in": "query",
          "name": "start",
          "required": true,
          "schema": {
            "type": "string",
            "format": "date-time"
          },
          "description": "Start date/time (ISO 8601 format)",
          "example": "2025-05-01T00:00:00Z"
        },
        {
          "in": "query",
          "name": "end",
          "required": true,
          "schema": {
            "type": "string",
            "format": "date-time"
          },
          "description": "End date/time (ISO 8601 format)",
          "example": "2025-05-20T23:59:59Z"
        }
      ],
      "responses": {
        "200": {
          "description": "List of exited vehicles and total amount charged between the two dates",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "totalCharged": {
                    "type": "number",
                    "format": "float",
                    "example": 145.75
                  },
                  "vehicles": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Vehicle"
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Missing or invalid date parameters"
        }
      }
    }
  }
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
"VehicleEntryInput": {
  "type": "object",
  "properties": {
    "plateNumber": {
      "type": "string"
    },
    "parkingCode": {
      "type": "string"
    }
  },
  "required": ["plateNumber", "parkingCode"]
},
"EntryTicket": {
  "type": "object",
  "properties": {
    "ticketId": {
      "type": "string"
    },
    "entryTime": {
      "type": "string",
      "format": "date-time"
    },
    "vehicle": {
      "$ref": "#/components/schemas/Vehicle"
    }
  }
},
"ExitBill": {
  "type": "object",
  "properties": {
    "ticketId": {
      "type": "string"
    },
    "exitTime": {
      "type": "string",
      "format": "date-time"
    },
    "durationMinutes": {
      "type": "number"
    },
    "totalAmount": {
      "type": "number"
    }
  }
}
    },
  },
};

export default swaggerSpec;