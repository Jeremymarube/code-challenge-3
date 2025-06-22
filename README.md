# Code challenge 3: Blog Post Manager

A simple web application for managing blog posts with full CRUD (Create, Read, Update, Delete) functionality. Built with vanilla JavaScript and a JSON Server backend.

---

## Demo
🗓️ **Date:** June 22, 2025
![2025-06-22](https://github.com/user-attachments/assets/63ea5559-9728-49bf-a1c4-c4b6b163baf2)


## ✨ Features

- **View Posts**: Display all blog posts in a list format
- **Post Details**: Click on any post title to view full details
- **Add Posts**: Create new blog posts using a form
- **Edit Posts**: Update existing post titles and content
- **Delete Posts**: Remove posts from the system
- **Persistent Storage**: All changes are saved to the backend API

## 🎯 Learning Objectives

This project demonstrates:
- Making API requests (GET, POST, PATCH, DELETE)
- DOM manipulation and event handling
- Form submission and validation
- Asynchronous JavaScript programming
- RESTful API interaction patterns

## Setup Instructions

### Prerequisites
- Node.js installed on your system
- A modern web browser

### Installation

1. **Create Project Structure**
   ```
   code-challenge-3/
   ├──Readme.md #This file
   ├── index.html
   ├── src/
   │   └── index.js
   ├── css/
   │   └── styles.css
   └── db.json
   ```

2. **Install JSON Server**
   ```bash
   npm install -g json-server@0.17.4
   ```

3. **Install Live Server** (optional, for development)
   ```bash
   npm install -g live-server
   ```

4. **Create Sample Data**
   
   Add sample blog posts to your `db.json` file:
   ```json
   {
     "posts": [
       {
         "id": 1,
         "title": "Getting Started with JavaScript",
         "content": "JavaScript is a versatile programming language that powers the web. In this post, we'll explore the basics of JavaScript and how to get started with your first program.",
         "author": "Jane Developer",
         "image": "https://via.placeholder.com/300x200?text=JavaScript"
       },
       {
         "id": 2,
         "title": "Understanding APIs",
         "content": "APIs (Application Programming Interfaces) are the backbone of modern web development. They allow different applications to communicate with each other seamlessly.",
         "author": "John Coder",
         "image": "https://via.placeholder.com/300x200?text=APIs"
       },
       {
         "id": 3,
         "title": "DOM Manipulation Techniques",
         "content": "The Document Object Model (DOM) is a programming interface for web documents. Learning to manipulate the DOM is essential for creating dynamic web applications.",
         "author": "Sarah Frontend",
         "image": "https://via.placeholder.com/300x200?text=DOM"
       }
     ]
   }
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   json-server db.json
   ```
   This will start the API server at `http://localhost:3000`

2. **Start the Frontend**
   ```bash
   live-server
   ```
   Or simply open `index.html` in your browser

3. **Access the Application**
   Open your browser and navigate to `http://localhost:8080` (or the port shown by live-server)

## API Endpoints

The application uses the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Retrieve all blog posts |
| GET | `/posts/:id` | Retrieve a single post by ID |
| POST | `/posts` | Create a new blog post |
| PATCH | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post |

## Project Structure

```
blog-post-manager/
├──readme.md            # This file
├── index.html          # Main HTML file
├── src/
│   └── index.js        # Main JavaScript logic
├── css/
│   └── styles.css      # Styling
└── db.json            # Mock database
```

## Core Functionality

### Core Deliverables
- ✅ Display all blog post titles and images on page load
- ✅ Show post details when clicking on a title
- ✅ Add new blog posts via form submission

### Advanced Deliverables
- ✅ Display first post details on page load
- ✅ Edit existing posts with inline form
- ✅ Delete posts with confirmation
- ✅ Persist all changes to backend API

## Key Functions

### Main Functions
- `main()` - Initialize the application
- `displayPosts()` - Fetch and display all posts
- `handlePostClick()` - Handle post selection
- `addNewPostListener()` - Handle new post creation

### Advanced Functions
- `editPost()` - Handle post editing
- `deletePost()` - Handle post deletion
- `updatePostInAPI()` - Send PATCH requests
- `createPostInAPI()` - Send POST requests
- `deletePostFromAPI()` - Send DELETE requests

## HTML Structure

The application expects the following HTML elements:
- `#post-list` - Container for the list of posts
- `#post-detail` - Container for displaying post details
- `#new-post-form` - Form for creating new posts
- `#edit-post-form` - Form for editing posts (advanced)

## Development Notes

- All API requests use `fetch()` with proper error handling
- DOM manipulation follows modern JavaScript best practices
- Event listeners are properly attached and managed
- Form submissions prevent default behavior and handle validation
- The application gracefully handles loading states and errors

## Browser Compatibility

This application uses modern JavaScript features including:
- Fetch API
- Arrow functions
- Template literals
- Async/await (if implemented)

Supported browsers: Chrome 60+, Firefox 55+, Safari 11+, Edge 79+

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure json-server is running on port 3000
2. **Posts Not Loading**: Check that `db.json` has valid JSON structure
3. **Forms Not Working**: Ensure form IDs match the JavaScript selectors
4. **Images Not Displaying**: Verify image URLs in your sample data

### Debug Tips

- Open browser DevTools to check for console errors
- Verify API responses in the Network tab
- Use `console.log()` statements to debug function execution
- Check that all required HTML elements have proper IDs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Aurthor

**Jeremy Marube**

---
