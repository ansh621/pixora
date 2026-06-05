# Pixora 📸

> Pinterest-Inspired Image Sharing Platform Built with Node.js, Express.js, MongoDB, Passport.js, and EJS

Pixora is a full-stack image sharing platform that allows users to create accounts, upload images, discover content from other users, and manage their own profiles. The application focuses on user-generated content, authentication, media management, and social content discovery.

---

## 🌐 Live Demo

**Application:** https://pixora-dbiv.onrender.com/

---

# 📖 Project Overview

Pixora is inspired by modern image-sharing platforms where users can upload, organize, and discover visual content.

The project was built to gain hands-on experience in:

* Authentication & Authorization
* Session Management
* File Upload Handling
* MongoDB Relationships
* Media-Centric Applications
* Full Stack Development
* Backend Architecture

The platform enables users to share images with titles and descriptions while maintaining ownership and control over their content

---

# 🎯 Objectives

* Create a secure image-sharing platform
* Implement user authentication and session handling
* Allow users to upload and manage image content
* Build a personalized profile experience
* Enable content discovery through a shared feed
* Practice backend architecture and database design

---

# ✨ Core Features

## 🔐 Authentication System

Pixora uses Passport.js for secure user authentication.

Features include:

* User Registration
* User Login
* Password Hashing
* Session-Based Authentication
* Protected Routes
* Persistent User Sessions

---

## 🖼 Image Upload System

Users can upload images directly to the platform.

Each upload contains:

* Image
* Title
* Description
* Owner Information
* Upload Metadata

This creates a structured and organized content experience.

---

## 🌎 Public Feed

After authentication, users gain access to a shared feed displaying content uploaded by all users.

Features:

* Browse uploaded content
* Discover community posts
* Search Functionality
* View post details
* Access uploader information

The feed acts as the central content discovery mechanism.

---

## 👤 User Profiles

Each user has a dedicated profile page.

Users can:

* View personal uploads
* Manage content
* Access account information
* Track created posts

The profile section provides ownership and content organization.

---

## 🗑 Content Management

Pixora includes ownership-based access control.

Users can:

* Delete their own posts
* Manage uploaded content
* Maintain their personal gallery

Unauthorized users cannot modify content belonging to others.

---

## 📄 Post Detail View

Each image can be opened individually.

The detail page displays:

* Uploaded image
* Title
* Description
* Creator information

This improves content engagement and user experience.

---

# 🏗 System Architecture

```text
                        Client Browser
                               |
                               v
                        Express.js Server
                               |
        ------------------------------------------------
        |                      |                       |
        v                      v                       v

 Authentication        Content Management       Profile Module
  (Passport.js)           (Posts & Uploads)      (User Data)

        ------------------------------------------------
                               |
                               v
                          MongoDB Atlas
                               |
                               v
                        User & Post Data
```

# 🗄 Database Design

## User Collection

Stores:

* Username
* Name
* Email
* Password Hash
* Profile Image
* Contact Information
* Uploaded Posts

### Example Structure

```javascript
{
  username,
  name,
  email,
  profileImage,
  posts:[]
}
```

---

## Post Collection

Stores:

* Image
* Title
* Description
* Owner Reference
* Upload Information

### Example Structure

```javascript
{
  image,
  title,
  description,
  user
}
```

# 🔌 API Modules

Authentication

```http
POST /register
POST /login
POST /logout
```

Posts

```http
POST /upload
GET /feed
GET /post/:id
DELETE /post/:id
```

Users

```http
GET /profile
GET /user/:id
```

# 🛠 Technology Stack

## Frontend

* EJS
* HTML5
* CSS3
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* Passport.js
* Express Session

## File Handling

* Multer

## Deployment

* Render
* MongoDB Atlas

## Version Control

* Git
* GitHub

# 🚧 Technical Challenges Solved

### Authentication & Session Management

Implemented Passport.js authentication with session persistence and protected routes to ensure secure access to platform features.

### Media Upload Handling

Integrated Multer to manage image uploads while associating uploaded content with user accounts.

### User-Post Relationships

Designed MongoDB schemas to establish relationships between users and their uploaded content.

### Ownership-Based Authorization

Implemented access control mechanisms to ensure users can only manage content that they own.

# 📚 Key Learning Outcomes

Through this project, I gained practical experience with:

* Full Stack Web Development
* Session-Based Authentication
* Passport.js Integration
* MongoDB Schema Design
* File Upload Management
* RESTful Routing
* Authorization Logic
* Deployment & Hosting

# 🔮 Future Enhancements

Planned improvements include:

* Search Functionality
* Image Categories & Tags
* Likes and Reactions
* Comment System
* Follow/Unfollow Users
* Bookmark Collections
* Infinite Scrolling Feed
* Cloud Storage Integration
* Responsive Mobile Experience

# 👨‍💻 Author

### Ansh Verma

GitHub:
https://github.com/ansh621

LinkedIn:
https://www.linkedin.com/in/anshverma621/

Project Repository:
https://github.com/ansh621/pixora

Live Demo:
https://pixora-dbiv.onrender.com/
