# Jarurat Care API

## Project Overview

The Jarurat Care API is a backend solution designed for managing resources and users with robust security and efficiency. Developed using **Node.js**, **Express**, and **MongoDB**, this API supports CRUD operations, role-based access control, data validation, and JWT-based authentication. It is tailored for use by NGOs like Jarurat Care to streamline resource management while ensuring secure access control.

### Key Features

- **CRUD Operations**:
  - Create, Read, Update, and Delete operations on resources.
- **Role-Based Access Control (RBAC)**:
  - Admin: Full access to all routes.
  - User: Restricted access to GET routes only.
- **Authentication**:
  - Secure JWT-based authentication for protected routes.
- **Validation**:
  - Ensures data integrity using Joi for input validation.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Joi for input validation
- Postman for API testing

---

## Screenshots

### Project Structure

Below is an example project structure for the API:

```
project/
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
├── models/
│   ├── userModel.js
│   ├── resourceModel.js
├── routes/
│   ├── userRoutes.js
│   ├── resourceRoutes.js
├── controllers/
│   ├── userController.js
│   ├── resourceController.js
├── config/
│   ├── db.js
├── .env
├── server.js
```

### API Testing with Postman

- **User Registration:**

- **Resource Creation (Admin Only):**

- **Error Handling:**

---

## Key Code Snippets

### 1. Authentication Middleware (`authMiddleware.js`)

```javascript
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
```

### 2. Resource Routes (`resourceRoutes.js`)

```javascript
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createResource, getAllResources } from "../controllers/resourceController.js";

const router = express.Router();

router.post("/create", authenticateToken, createResource);
router.get("/all", authenticateToken, getAllResources);

export default router;
```

### 3. User Controller (`userController.js`)

```javascript
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
```

### 4. Password Reset (`userController.js`)

```javascript
export const forgotPassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## API Endpoints

### Public Endpoints

- **POST /register**: Register a new user.
- **POST /login**: Log in to receive a JWT token.

### Protected Endpoints

- **POST /create**: Create a new resource (Admin only).
- **GET /all**: Retrieve all resources (Admin and User).
- **GET /byId/:id**: Retrieve a resource by ID (Admin and User).
- **PUT /update/:id**: Update a resource by ID (Admin only).
- **DELETE /delete/:id**: Delete a resource by ID (Admin only).

---

## Deployment Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file with:

   ```env
   gor any HTTP clientMONGO_URI=<your-monngodb-uri>
   JW_SECRET=<your-secret-keny>
   PORT=5000
   ```

4. Sart the server:

   ```bash
   np start
   ```

5. Test the API u sing Postman.

---

## Conclusion

The Jarurat Care API is a secure and scalable backend solution. It demonstrates best practices in backend development using modern technologies, ensuring data security, validation, and role-based access control. This project can be easily extended or integrated with frontend systems for real-world use cases.

