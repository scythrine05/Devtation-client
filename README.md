# Devtation - Developer Project Showcase Platform

Devtation is a platform where developers can showcase their development projects, connect with others, and gain visibility for their work. This repository contains the **Devtation Client**, a React-based frontend application that provides a seamless and interactive experience for users to explore, create, and manage projects.

---

## Live Demo

Check out the live version of Devtation here:  
👉 [https://devtation.rohanworks.com](https://devtation.rohanworks.com)

---

## Features

1. **Project Showcase**:

   - View and explore projects created by other developers.
   - Search and filter projects based on categories, tags, or technologies.

2. **Account Management**:

   - User authentication and profile management.
   - Secure login and registration with Firebase.

3. **Interactive Project Creation**:

   - Create projects using a rich text editor powered by **React Quill**.
   - Upload and manage project assets (e.g., images, videos) with **AWS S3** integration.

4. **Community Interaction**:

   - "Hype" (like/support) other developers' projects.
   - Comment on and discuss projects.

5. **Profile Management**:
   - Edit and customize your developer profile.
   - Showcase your skills, projects, and contributions.

---

## Technologies Used

- **Frontend**: React, Flowbite UI (for styling), Axios (for API calls), Firebase (authentication).
- **Rich Text Editor**: React Quill.
- **Image Cropping**: React Easy Crop.
- **Deployment**: Docker, Nginx as reverse proxy, AWS EC2.
- **CI/CD**: Automated deployment pipeline for streamlined updates using **Github Actions**.

---

## How to Run Locally

1. **Prerequisites**:

   - Ensure Node.js and npm are installed on your system.
   - Clone the repository:
     ```bash
     git clone https://github.com/scythrine05/Devtation-client.git
     cd Devtation-client
     ```

2. **Install Dependencies**:

   - Run the following command to install all dependencies:
     ```bash
     npm install
     ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory and add the following variables (Since its bundled with **Vite**, we use VITE keyword):
     ```env
     VITE_API_URL=devtation-server-url(http://localhost:5000/api)
     VITE_REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
     VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
     VITE_REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
     VITE_REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
     VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
     VITE_REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
     VITE_RECAPTCHA_SITE_KEY=your-google-recaptcha-site-key
     ```

4. **Start the Application**:
   - Run the development server:
     ```bash
     npm run dev
     ```
   - The application will be available at `http://localhost:5173`.

---

## Contributing

Feel free to open issues or submit pull requests for improvements. Happy coding!
