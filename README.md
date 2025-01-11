# Project Setup Guide 🚀

Follow these steps to clone and set up the project for local development:

---

## Step 1: Clone the Repository 💻
```bash
git clone https://github.com/InduwaraRathnayake/Univate-1.0.git
```
- Open the project in `vscode`
---

## Step 2: Navigate to the Frontend Directory 📂
```bash
cd frontend
```

---

## Step 3: Install Dependencies ⚙️
```bash
npm install
```
This will install all required Node.js packages.

---

## Step 4: Run the Development Server 🚀
```bash
npm run dev
```
The development server will start, and you can access the application at:
```
http://localhost:3000
```

---

## Additional Steps (if applicable) 📋
1. **Environment Variables:**
   - Ensure you have a `.env.local` file in the `frontend` directory.
   - Add all required environment variables as per the project documentation.

2. **Backend Server:**
   - If the project requires a backend, make sure it is set up and running before accessing the frontend.
   - Check the backend README for instructions.

---

## Troubleshooting ⚠️
- If you encounter issues, try the following:
  - Delete `node_modules` and `package-lock.json`, then run `npm install` again.
  - Check for any missing environment variables.
  - Verify that the backend server is running if the frontend depends on it.
- Refer to the project documentation or ask for help from collaborators if issues persist.

---

Happy coding! 🎉
