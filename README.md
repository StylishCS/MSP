# MSP Tech Club API

This is the backend API for the **MSP Tech Club**, a Microsoft Student Partner (MSP) student activity club at Al Azhar University in cairo. The API provides endpoints to manage various aspects of the club, such as team members, sponsors, blogs, gallery images, and more. It is built using **Node.js**, **Express**, and **MongoDB**.

---

## Features

- **Admin Authentication**: Secure login for admins with JWT-based authentication.
- **Team Management**: Add, update, delete, and retrieve team members.
- **Sponsor Management**: Manage sponsors with image uploads.
- **Blog Management**: Create, update, delete, and retrieve blogs.
- **Gallery Management**: Upload and manage gallery images for events and sessions.
- **Team History**: Manage the history of the team with descriptions and images.
- **Form Management**: Manage a single form with an `is_open` status (open/closed).
- **Review Management**: Add, update, delete, and retrieve reviews with optional photos.
- **Pagination**: Supports pagination for endpoints that return lists of data.
- **Rate Limiting**: Protects the API from abuse with rate limiting.
- **Error Handling**: Custom error handling for better debugging and user feedback.
- **Image Upload**: Supports image uploads for blogs, team members, sponsors, and gallery items.

---

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/MohamedRamadanSaudi/MSP-API.git
   cd MSP-API
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/MSP-API
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   JWT_KEYWORD=your_jwt_keyword_like_bearer_or_anything
   ADMIN_PASSWORD=your_admin_password
   URL=http://localhost:3000/
   ```

4. **Run the Server**:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000`.

5. **Seed Admin User**:
   Send a POST request to `/admin/seed` to create the default admin user.

---

## API Endpoints

### Admin Routes

- **POST /admin/login**: Admin login.
- **POST /admin/seed**: Seed the default admin user.

### Team Routes

- **POST /dashboard/teams/add**: Add a team member.
- **GET /dashboard/teams/get**: Get all team members (paginated).
- **DELETE /dashboard/teams/delete/:id**: Delete a team member.
- **PATCH /dashboard/teams/edit/:id**: Update a team member.

### Blog Routes

- **POST /dashboard/blogs/add**: Add a blog.
- **GET /dashboard/blogs/get**: Get all blogs (paginated).
- **DELETE /dashboard/blogs/delete/:id**: Delete a blog.
- **PATCH /dashboard/blogs/edit/:id**: Update a blog.

### Sponsor Routes

- **POST /dashboard/sponsors/add**: Add a sponsor.
- **GET /dashboard/sponsors/get**: Get all sponsors (paginated).
- **DELETE /dashboard/sponsors/delete/:id**: Delete a sponsor.

### Gallery Routes

- **POST /dashboard/gallery/add**: Add a gallery item.
- **GET /dashboard/gallery/get**: Get all gallery items (paginated).
- **DELETE /dashboard/gallery/delete/:id**: Delete a gallery item.

### Form Routes

- **POST /form**: Create the form (if it doesn’t exist).
- **GET /form**: Get the form status.
- **PATCH /form**: Update the form status.

### Review Routes

- **POST /reviews**: Add a review (admin-only).
- **GET /reviews**: Get all reviews (paginated).
- **GET /reviews/:id**: Get a single review by ID.
- **PATCH /reviews**: Update a review (admin-only).
- **DELETE /dashboard/gallery/delete/:id**: Delete a review (admin-only).

---

## Deployment

The project includes a GitHub Actions workflow (`main.yml`) for automatic deployment to a VPS. To deploy:

1. Add the following secrets to your GitHub repository:

   - `VPS_IP`: Your VPS IP address.
   - `USER`: SSH username.
   - `SSH_PASSWORD`: SSH password.

2. Push changes to the `main` branch. The workflow will automatically deploy the app to your VPS.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Upload**: Multer
- **Pagination**: Custom middleware
- **Error Handling**: Custom error handler
- **Deployment**: GitHub Actions, PM2

---

## Contributors

- [Mohamed Ramadan](https://github.com/MohamedRamadanSaudi) "Backend Leader in MSP Season 2024/2025"
- [Yusuf Sherif](https://github.com/StylishCS) "Backend Leader in MSP Season 2023/2024"
