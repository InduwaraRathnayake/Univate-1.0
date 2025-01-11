# Project Collaboration Guide

This README provides a structured guide for contributors on how to create and align components within the project. Please follow the steps below to ensure consistency and maintainability in our codebase.

---

## Project Structure

- Always start editing in a new branch
  - Branch name format: "firstTwoLetters_month/day_patchNo" e.g : `"in01/11-1"`
- The project has the following main folders:

### `app/`
Contains the application pages organized by feature or module. Each folder typically includes a `page.tsx` file for the corresponding route.

```
📦app
 ┣ 📂(auth)
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📂career-guidance
 ┃ ┗ 📜page.tsx
 ┣ 📂stream-information-hub
 ┃ ┣ 📂CyS
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂DSE
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂ICE
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┗ 📜page.tsx
```

### `components/`
Contains reusable UI components and modules.

```
📦components
 ┣ 📂ui
 ┃ ┣ 📜button.tsx
 ┃ ┗ 📜text-generate-effect.tsx
 ┗ 📜Hero.tsx
```

---

## How to Create and Use a Component
Follow these steps to add a new component and integrate it into a page:

### Step 1: Create the Component
1. **Navigate to the `components/` directory.**
   - If your component is UI-related, place it in the `ui/` folder. For other components, add it to the root `components/` folder.
2. **Create a new file for your component.**
   - For example: `components/ui/button.tsx`.
3. **Define your component.**
   ```tsx
   import React from 'react';

   interface ButtonProps {
       label: string;
       onClick: () => void;
   }

   const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
       return (
           <button onClick={onClick} className="btn-class">
               {label}
           </button>
       );
   };

   export default Button;
   ```

### Step 2: Follow Acetinery UI Guidelines
1. If using Acetinery UI components, refer to the official [Acetinery UI Documentation](https://acetinery-ui-docs-link.com) for best practices and styling guidelines.
2. Ensure that your component adheres to the standards outlined in the documentation.

### Step 3: Export the Component
1. Ensure the component is exported as default.
2. If necessary, update `components/index.ts` to re-export your component (if such a file exists).

### Step 4: Import the Component into a Page
1. Navigate to the respective page file in the `app/` folder.
2. Import your component. For example:
   ```tsx
   import Button from '@/components/ui/button';
   ```
3. Use the component within the page:
   ```tsx
   export default function LoginPage() {
       return (
           <div>
               <h1>Login</h1>
               <Button label="Submit" onClick={() => console.log('Clicked!')} />
           </div>
       );
   }
   ```

### Step 5: Test the Page
Run the application to verify that the component appears and functions as expected: (in frontend/ folder)
```bash
npm run dev
```
Navigate to the page route in your browser to test it.

---

## Guidelines for Page Creation
1. **Create a New Folder for the Page**
   - In the `app/` directory, create a folder named after the route (e.g., `stream-information-hub/CyS`).
2. **Add a `page.tsx` File**
   - This file represents the route. Ensure it includes the desired layout and imported components.
3. **Use Components**
   - Import components from the `components/` folder as needed.
   - Example:
     ```tsx
     import Hero from '@/components/Hero';

     export default function CySPage() {
         return (
             <div>
                 <Hero />
                 <p>Welcome to the Cyber Security page.</p>
             </div>
         );
     }
     ```

4. **Test the Page**
   - Confirm the page renders correctly by visiting its route in the browser.

---

## CSS and Styling
- Use `globals.css` for global styles.
- Apply Tailwind CSS utility classes directly within components and pages.
- Leverage Acetinery UI components and styling utilities wherever applicable.
- Avoid inline styles unless necessary.

---

## Collaboration Best Practices
1. **Follow the Directory Structure**
   - Place files in the appropriate folder.
2. **Name Components and Files Clearly**
   - Use PascalCase for component files and camelCase for variables.
3. **Write Clean Code**
   - Follow consistent formatting and linting rules.
4. **Test Your Changes**
   - Run the app locally and verify functionality before pushing changes.
5. **Use Version Control Properly**
   - Commit changes with meaningful messages and submit pull requests for review.

---

By adhering to these guidelines, we can maintain a clean, efficient, and scalable codebase. Happy coding!