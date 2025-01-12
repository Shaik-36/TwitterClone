
# Setting Up TypeScript Project with `npm` and `tsc-watch`

This guide explains how to set up a TypeScript project using `npm` with automatic rebuilding and output display in the terminal whenever changes are made.

---

## 1. Initialize a New Project
1. Open a terminal in your project directory.
2. Run:
   ```bash
   npm init -y
   ```
   This will create a `package.json` file with default settings.

---

## 2. Install Necessary Dependencies
1. Install `typescript` and `tsc-watch` as development dependencies:
   ```bash
   npm install typescript tsc-watch --save-dev
   ```

2. If `ts-node` is needed for debugging, install it globally (optional):
   ```bash
   npm install -g ts-node
   ```

---

## 3. Set Up `tsconfig.json`
1. Create a TypeScript configuration file:
   ```bash
   npx tsc --init
   ```

2. Update the `tsconfig.json` file with the following configuration:
   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "outDir": "./build",
       "rootDir": "./src",
       "strict": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

---

## 4. Create File Structure
1. Create the necessary folder and file structure:
   - `src/index.ts` - Your main entry file.
   - `build/` - This will be automatically created by TypeScript when compiled.

2. Add the content of `src/index.ts`:
   ```typescript
   console.log("Hey there, My name is Piyush Garg");
   ```

---

## 5. Update `package.json` Scripts
1. Open the `package.json` file and modify the `scripts` section:
   ```json
   "scripts": {
     "start": "node build/index.js",
     "build": "tsc -p .",
     "dev": "tsc-watch --onSuccess \"npm start\""
   }
   ```

2. Explanation of the scripts:
   - **`start`**: Runs the compiled `build/index.js` file using Node.js.
   - **`build`**: Manually compiles TypeScript files from `src` into the `build` folder.
   - **`dev`**: Watches for changes in TypeScript files. On successful compilation, it runs `npm start` automatically.

---

## 6. Compile and Run the Project
1. To manually build the project, run:
   ```bash
   npm run build
   ```
2. To start the application, run:
   ```bash
   npm start
   ```
3. To watch for file changes and automatically recompile, use:
   ```bash
   npm run dev
   ```

---

## 7. Verify the Output
1. After running `npm start` or `npm run dev`, the terminal should display:
   ```
   Hey there, My name is Piyush Garg
   ```
2. The `build` folder will contain the compiled JavaScript version of the `index.ts` file.

---

## 8. Test Live Changes
1. Start the watcher:
   ```bash
   npm run dev
   ```
2. Modify the `src/index.ts` file, e.g., change the text:
   ```typescript
   console.log("Hello, this is an updated message!");
   ```
3. Save the file. The `tsc-watch` utility should:
   - Rebuild the project.
   - Automatically restart the application using `npm start`.
   - Display the updated output in the terminal.

---

## Troubleshooting
1. **If Changes Don’t Reflect**:
   - Ensure `tsc-watch` is installed correctly:
     ```bash
     npm install tsc-watch --save-dev
     ```
   - Verify the `outDir` path in `tsconfig.json`—compiled files must appear in the `build/` directory.
   - Run `npm run build` to confirm TypeScript compiles successfully.

2. **For Debugging**:
   Add `--clear` to the `dev` script for cleaner logs:
   ```json
   "dev": "tsc-watch --clear --onSuccess \"npm start\""
   ```

---

This setup ensures you achieve automatic rebuilding and terminal output display using `npm`.
