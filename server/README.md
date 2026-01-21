# rod-proposal Server (Node.js + Express)

This is the backend for the Digital Management Suite.

## Setup
1. Run `npm install` to install dependencies.
2. Copy `.env.example` to `.env` and fill in your Supabase and database keys.
3. Run `npm run dev` to start the development server.

## Security
- Never commit secrets to Git.
- All business logic (e.g., posting specials, event toggles) lives here.

## Real World Context
Professional backends separate business logic from UI, use environment variables, and document setup for new developers.

---

## Draft Database Schema (2026)

### 1. users
* id (uuid, PK)
* email (string, unique)
* password_hash (string)
* name (string)
* role_id (FK to roles)
* created_at, updated_at (timestamp)

### 2. roles
* id (serial, PK)
* name (string, e.g., 'owner', 'manager', 'chef', 'barback', 'staff')

### 3. restaurants
* id (uuid, PK)
* name (string)
* location (string)
* aloha_pos_id (string, nullable)

### 4. specials
* id (uuid, PK)
* restaurant_id (FK to restaurants)
* name (string)
* description (text)
* price (numeric)
* photo_urls (text[])
* created_by (FK to users)
* approved_by (FK to users, nullable)
* approved_at (timestamp, nullable)
* status (enum: 'pending', 'approved', 'rejected')
* sales_count (int, default 0)
* created_at, updated_at (timestamp)

### 5. events
* id (uuid, PK)
* restaurant_id (FK to restaurants)
* title (string)
* description (text)
* event_type (enum: 'public', 'private', 'featured')
* start_time, end_time (timestamp)
* created_by (FK to users)
* approved_by (FK to users, nullable)
* approved_at (timestamp, nullable)
* status (enum: 'pending', 'approved', 'rejected')
* created_at, updated_at (timestamp)

### 6. sports_schedules
* id (uuid, PK)
* restaurant_id (FK to restaurants)
* game_id (string, from sports API)
* game_title (string)
* league (string)
* start_time (timestamp)
* is_featured (boolean)
* is_on_tv (boolean)
* created_by (FK to users)
* created_at, updated_at (timestamp)

### 7. notifications
* id (uuid, PK)
* user_id (FK to users)
* type (string, e.g., 'approval_request', 'event_update')
* message (text)
* read (boolean, default false)
* created_at (timestamp)

### 8. audit_logs
* id (uuid, PK)
* table_name (string)
* record_id (uuid)
* action (string, e.g., 'create', 'update', 'delete', 'approve')
* performed_by (FK to users)
* performed_at (timestamp)

---
### Real World Context
This schema supports all current features and is designed for future growth (e.g., POS integration, advanced notifications, more roles). Each table is normalized for clean data and easy reporting. Audit logs and notifications are included for accountability and automation. Arrays and enums are used for flexibility (e.g., multiple photos, event types). Foreign keys ensure data integrity and make it easy to join data for dashboards and analytics.

---

## API Endpoints (2026)

### Authentication

#### POST /auth/register
Registers a new user.

**Request Body (JSON):**
```
{
	"email": "user@example.com",
	"password": "YourPassword123!",
	"name": "User Name",
	"role_id": 1
}
```
**Response:**
- 201 Created, user object on success
- 400 Bad Request, error message on failure

#### POST /auth/login
Logs in a user and returns a session token.

**Request Body (JSON):**
```
{
	"email": "user@example.com",
	"password": "YourPassword123!"
}
```
**Response:**
- 200 OK, session and user object on success
- 401 Unauthorized, error message on failure

### Health Check

#### GET /health
Returns server and Supabase status.

**Response:**
- 200 OK, status message

---

## Authentication Flow (How it Works)

1. **Register:** User sends email, password, name, and role_id to /auth/register. Supabase securely stores credentials and returns a user object.
2. **Login:** User sends email and password to /auth/login. On success, receives a session token (JWT) to use for future requests.
3. **Protecting Routes:** (To be implemented) API endpoints will require a valid session token in the Authorization header. Role checks will restrict access to sensitive actions (e.g., only Rod can approve specials).

---

## Code Quality & Documentation
- All business logic is separated from UI for maintainability.
- Environment variables are loaded securely with dotenv.
- API endpoints are modular and return clear, consistent responses.
- Comments in code explain complex logic and real-world context.

---

## Portfolio Context
This backend demonstrates professional standards: secure authentication, modular code, clear API documentation, and a scalable database schema. It’s ready for real-world use and easy for other developers to understand and extend.