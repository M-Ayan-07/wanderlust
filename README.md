<h1 align="center"> Wanderlust </h1>
<p align="center"> The Ultimate Platform for Curated Global Listings and Authentic Experiences </p>


<!-- 
  **Note:** These are static placeholder badges. Replace them with your project's actual badges.
  You can generate your own at https://shields.io
-->

## 📋 Table of Contents

- [⭐ Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack & Architecture](#-tech-stack--architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ⭐ Overview

Wanderlust is a modern, full-stack travel platform designed to connect users with unique global accommodations and share genuine travel experiences through integrated, comprehensive user reviews. Built on a robust RESTful architecture, this application provides a secure and dynamic environment for both listing hosts and travelers.

### The Problem

> The modern travel landscape often requires navigating multiple, fragmented booking platforms, leading to inconsistent user experiences and a lack of reliable, community-driven feedback. Hosts struggle to showcase their unique properties effectively, and travelers find it difficult to discern truly authentic listings from mass-market options. The technical challenge lies in building a unified, secure, and media-rich platform that scales with global listing demand while ensuring high data integrity.

### The Solution

Wanderlust provides a cohesive solution by delivering a single platform that handles everything from secure user authentication and listing creation to media storage and integrated review mechanisms. Utilizing the efficiency of **express** and the flexibility of **mongodb**, the platform delivers dynamic content fast. By incorporating dedicated routing for users, listings, and reviews, Wanderlust ensures a scalable and organized backend structure capable of supporting high traffic and complex interactions.

### Architecture Overview

Wanderlust is architected as a standard **REST API** application, primarily utilizing the **express** framework. It follows a Model-View-Controller (MVC)-like structure, dividing logic between dedicated `routes`, `controller`, and `models` directories. Data persistence is managed by **mongodb**, leveraging **mongoose** for schema validation and object modeling. This decoupled approach ensures maintainability and allows for clean separation between application logic and data handling.

---

## ✨ Key Features

Wanderlust is designed to provide a rich, secure, and user-friendly experience for managing global accommodation listings. The features focus on creating a trusted environment for hosts and travelers alike.

### 🔑 Secure User & Session Management
Leveraging industry-standard tools, Wanderlust ensures that all user data and sessions are handled securely and efficiently.
*   **Authentication & Authorization:** Implements robust sign-up, login, and authorization logic using **Passport.js** and **passport-local-mongoose** to protect routes and ensure only authorized users can perform actions like creating or editing listings.
*   **Persistent Sessions:** Utilizes **connect-mongo** and **express-session** to manage durable, secure sessions, allowing users to maintain their logged-in state across multiple visits without compromising security.

### 🏠 Comprehensive Listing Management
Hosts have complete control over their property listings, ensuring accurate representation and easy management.
*   **CRUD Operations for Listings:** Full capabilities to **C**reate, **R**ead, **U**pdate, and **D**elete accommodation listings through dedicated routes (`routes/listing.js`).
*   **Media Integration:** Supports seamless image uploading via **multer** integrated with a dedicated Cloud storage solution (verified dependency on `cloudinary` and `multer-storage-cloudinary`), ensuring fast, reliable media delivery for all properties.

### ⭐ Integrated Review System
Community feedback is vital. Wanderlust features a dedicated system for travelers to share their experiences.
*   **Review Submission & Management:** Users can post reviews, ratings, and feedback directly onto listings via dedicated review routes (`routes/review.js`).
*   **Data Validation:** Ensures data integrity for all incoming reviews using structured schemas and validation utilities (`schema.js`, `models/review.js`).

### 🚦 Robust Error Handling & Utilities
The platform is built with developer experience and reliability in mind, utilizing custom utilities to manage asynchronous operations and centralize error reporting.
*   **Asynchronous Utility Wrapper:** Employs `utils/wrapAsync.js` to simplify error handling for asynchronous functions across controllers, promoting cleaner, more readable code.
*   **Custom Error Class:** Utilizes `utils/ExpressError.js` to standardize custom error responses, ensuring predictable API behavior and better diagnostics.

### 🤖 Development Test Endpoint
A dedicated endpoint is provided for developers and testers to rapidly check data structures or authenticate test users without complex setup.
*   **Quick Data Access:** Provides access to the verified API endpoint: `GET /fakeuser` for initial testing or status checks.

---

## 🛠️ Tech Stack & Architecture

Wanderlust is built using a modern JavaScript ecosystem, focusing on security, scalability, and developer velocity. The platform's components are carefully selected to provide a highly performant and maintainable REST API.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **Backend Framework** | **express** | Provides a minimal, flexible, and robust layer for defining routes, handling middleware (like `method-override` and `flash`), and serving the RESTful API structure efficiently. |
| **Database** | **mongodb** | Chosen for its flexible, document-based NoSQL structure, which is ideal for rapidly evolving data models like listings and reviews. It provides high scalability and performance. |
| **Database ODM** | **mongoose** | Acts as the Object Data Modeling layer for MongoDB. It enforces schemas (`models/listing.js`, `models/review.js`) and provides powerful validation and query construction tools. |
| **Templating Engine** | **ejs** & **ejs-mate** | Provides dynamic rendering capabilities for the view layer. **ejs-mate** is used specifically to simplify the creation of complex layouts (e.g., `views/layouts/boilerplate.ejs`) and partials. |
| **Authentication** | **passport** | The de-facto standard for Node.js authentication. It handles local strategy logins (`passport-local`) and manages session state securely. |
| **Build Tooling** | **vite** | Included as a lightweight and fast development server and module bundler, although the primary focus is on the backend API. |
| **Data Validation** | **joi** | Used for robust server-side schema validation of incoming requests (user data, listing data, etc.) before data hits the database. |
| **File Handling** | **multer** & **cloudinary** | Essential for handling multi-part form data (file uploads). Integrated with Cloudinary storage to ensure scalable and reliable image hosting outside the main application server. |

---

## 📁 Project Structure

The project is structured logically following a modular approach, separating configuration, routing, models, controllers, and utilities into distinct directories. This organization enhances clarity, simplifies debugging, and supports large-scale contributions.

```
📂 M-Ayan-07-wanderlust-b53fe68/     # Root directory
├── 📄 .gitignore                   # Specifies untracked files to ignore
├── 📄 package-lock.json            # Exact dependency tree lockfile
├── 📄 cloudConfig.js               # Configuration for Cloudinary service
├── 📄 package.json                 # Project metadata and dependency definitions
├── 📄 schema.js                    # Joi validation schemas for data integrity
├── 📄 app.js                       # Main Express application initialization and configuration
├── 📄 middleware.js                # Custom middleware functions (e.g., authentication checks)
├── 📂 public/                      # Static assets served directly to the client
│   ├── 📂 css/                     # Stylesheets for the application views
│   │   ├── 📄 rating.css           # Custom styles for the review/rating component
│   │   └── 📄 style.css            # Global application styles
│   └── 📂 js/                      # Client-side JavaScript
│       └── 📄 script.js            # General client-side scripting
├── 📂 routes/                      # Route definitions for API endpoints
│   ├── 📄 user.js                  # Routes for user authentication and profile management
│   ├── 📄 listing.js               # Routes for Listing CRUD operations
│   └── 📄 review.js                # Routes for Review creation and deletion
├── 📂 models/                      # Mongoose data models (Schemas)
│   ├── 📄 user.js                  # User model schema (integrated with passport-local-mongoose)
│   ├── 📄 listing.js               # Listing model schema (contains property details)
│   └── 📄 review.js                # Review model schema (linked to listings and users)
├── 📂 init/                        # Initialization scripts and seed data
│   ├── 📄 index.js                 # Database seeding script entry point
│   └── 📄 data.js                  # Seed data used for initial database population
├── 📂 views/                       # EJS templates for server-side rendering
│   ├── 📄 error.ejs                # Custom error page template
│   ├── 📂 includes/                # Reusable partial views
│   │   ├── 📄 flash.ejs            # Template for displaying flash messages
│   │   ├── 📄 navbar.ejs           # Application navigation bar
│   │   └── 📄 footer.ejs           # Application footer
│   ├── 📂 listings/                # Listing-specific views
│   │   ├── 📄 show.ejs             # Single listing detail page
│   │   ├── 📄 index.ejs            # All listings index page
│   │   ├── 📄 new.ejs              # Form for creating a new listing
│   │   └── 📄 edit.ejs             # Form for editing an existing listing
│   ├── 📂 layouts/                 # Base layout templates
│   │   └── 📄 boilerplate.ejs      # Standard HTML structure wrapper (uses ejs-mate)
│   └── 📂 users/                   # User authentication views
│       ├── 📄 login.ejs            # Login form template
│       └── 📄 signup.ejs           # Registration form template
├── 📂 controller/                  # Business logic handlers for routes
│   ├── 📄 user.js                  # Controller functions for user authentication
│   ├── 📄 listing.js               # Controller functions for listing logic
│   └── 📄 review.js                # Controller functions for review logic
└── 📂 utils/                       # Reusable utility functions
    ├── 📄 ExpressError.js          # Custom error class for streamlined error handling
    └── 📄 wrapAsync.js             # Utility to simplify try/catch blocks for async route handlers
```

---

## 🚀 Getting Started

To set up and run Wanderlust locally, you will need to ensure your environment meets the necessary prerequisites.

### Prerequisites

Wanderlust requires the following software installed on your system:

| Prerequisite | Verified Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | `20.18.0` (as per `package.json`) | Essential runtime environment. |
| **npm** | Latest Stable | Package manager required for installing dependencies. |
| **MongoDB** | N/A | A running instance of MongoDB is required for data storage, accessed via `mongoose`. |

### Installation Steps

Follow these steps to clone the repository and install the required packages.

1.  **Clone the Repository**

    ```bash
    git clone [YOUR_REPOSITORY_URL] M-Ayan-07-wanderlust-b53fe68
    cd M-Ayan-07-wanderlust-b53fe68
    ```

2.  **Install Dependencies**

    Use npm to install all project dependencies defined in `package.json`:

    ```bash
    npm install
    ```

3.  **Database Connection & Setup**

    *   Ensure your MongoDB instance is running.
    *   Although no `.env` file was detected, you must ensure your database connection string and any necessary API keys (like Cloudinary credentials, referenced in `cloudConfig.js`) are configured within the application environment, typically in `app.js` or `cloudConfig.js`.

4.  **Seed the Database (Optional but Recommended)**

    If you wish to populate the database with initial test data defined in `init/data.js`:

    ```bash
    node init/index.js
    ```

5.  **Start the Application**

    The verified entry point for the application is `index.js`. Start the application server using Node:

    ```bash
    node index.js
    # The application will typically run on localhost:8080 (or as configured in app.js)
    ```

---

## 🔧 Usage

Wanderlust is a **REST API** platform built for dynamic content delivery. Once the server is running, the application serves both the EJS-rendered frontend and provides dedicated API routes for data interaction.

### API Interaction

The API exposes endpoints for creating, retrieving, updating, and deleting listings and reviews.

#### Test Data Endpoint

A specific, verified API endpoint is available for quick development testing and integration checks:

**Endpoint:** `GET /fakeuser`
**Purpose:** Retrieves a set of temporary or test user data. This is useful for verifying server connectivity and basic route functionality without complex authentication headers.

**Example Request (using a tool like cURL or Postman):**

```bash
# Assuming the server is running on port 8080
curl -X GET http://localhost:8080/fakeuser
```

**Expected Response:**

*(The specific JSON structure is not verified, but the endpoint serves as a health check or data retrieval utility)*

```json
{
  "status": "success",
  "data": {
    "message": "Fake user endpoint accessed successfully."
    // ... potentially returns mock user data ...
  }
}
```

### Development and Testing

The `package.json` includes a script dedicated for testing purposes.

**Running Verified Scripts:**

To execute the defined test script:

```bash
npm run test
```

This command executes the script `"echo \"Error: no test specified\" && exit 1"`, confirming the current state of test script implementation.

---

## 🤝 Contributing

We welcome contributions to improve Wanderlust! Your input helps make this project better for everyone, ensuring the platform remains robust, secure, and feature-rich.

### How to Contribute

To contribute, please follow the standard GitHub workflow:

1.  **Fork the repository** - Click the 'Fork' button at the top right of this page
2.  **Create a feature branch** 
    ```bash
    git checkout -b feature/amazing-feature
    ```
3.  **Make your changes** - Improve code, documentation, or features across models, controllers, or views.
4.  **Test thoroughly** - Ensure all functionality works as expected, especially in the context of authentication and data persistence.
    ```bash
    # Run the verified test script (or implement proper tests if none exist)
    npm test
    ```
5.  **Commit your changes** - Write clear, descriptive commit messages following the Conventional Commits specification.
    ```bash
    git commit -m 'feat: Implement user profile view page'
    ```
6.  **Push to your branch**
    ```bash
    git push origin feature/amazing-feature
    ```
7.  **Open a Pull Request** - Submit your changes to the main repository for review. Please provide a detailed description of your changes and why they are necessary.

### Development Guidelines

-   ✅ **Code Consistency:** Follow the existing code style and naming conventions established in the `controller`, `model`, and `route` directories.
-   📝 **Clarity:** Add comments for complex logic, particularly in middleware (`middleware.js`) and asynchronous utility functions (`utils/wrapAsync.js`).
-   📚 **Documentation:** Update relevant documentation (including the README) for any new features or substantial changes to existing functionality.
-   🔄 **Middleware Checks:** Ensure that authentication and authorization checks are properly applied to all sensitive routes using the custom middleware.
-   🎯 **Focused Commits:** Keep commits atomic and focused on a single logical change.

### Ideas for Contributions

We're looking for help across all layers of the application:

-   🐛 **Bug Fixes:** Report and resolve issues related to session management, data validation, or rendering errors (`views/error.ejs`).
-   ✨ **New Features:** Implementing pagination, search functionality, or advanced filtering for listings (requires modifications to `controller/listing.js`).
-   📖 **Documentation:** Improve setup instructions, add API usage examples, or detail the architecture of the EJS templating system.
-   ⚡ **Performance:** Optimize database queries or client-side script loading (`public/js/script.js`).
-   🧪 **Testing:** Implement comprehensive unit and integration tests for the controllers and middleware logic.

### Code Review Process

-   All submissions require review by a maintainer before merging.
-   Maintainers strive to provide constructive, actionable feedback quickly.
-   Changes may be requested if tests fail, code quality is low, or security issues are identified.
-   Once approved, your Pull Request will be merged, and you will be credited as a contributor!

### Questions?

Feel free to open an issue for any questions or concerns regarding development, feature requests, or bug reports. We're here to help you get started!

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:

-   ✅ **Commercial use:** You can use this project commercially.
-   ✅ **Modification:** You can modify the code to fit your needs.
-   ✅ **Distribution:** You can freely distribute this software.
-   ✅ **Private use:** You can use this project privately for any purpose.
-   ⚠️ **Liability:** The software is provided "as is", without warranty of any kind. The authors and copyright holders are not liable for any damages or other claims arising from the use of the software.
-   ⚠️ **Trademark:** This license does not grant rights to use the project's name or logos.

---

<p align="center">Made with ❤️ by the Wanderlust Team</p>
<p align="center">
  <a href="#-table-of-contents">⬆️ Back to Top</a>
</p>
