# AAW-Skills

## Project structure

```text
|- backend
|  |- src              Backend source files (*.ts)
|  |  |- index.ts      Backend entry point
|  |  |  ...
|  |- build            Compiled JS files
|  |- .env             Environment variables
|- frontend            React App
|  |- src              React app source code
|  |  |- main.tsx     React Root
|  |  |  ...
|  |- public           Static files
|  |  |- index.html    Container page
|  |  |  ...
```

## Configuration

1. In `backend` and `frontend` directories, install required dependencies with `npm install`.
2. In `backend`, run `tsc` to compile TypeScript files. Then run `node --env-file .env build/index.js`.
3. In `frontend`, run `npm run dev` (for development). More information in the README.
