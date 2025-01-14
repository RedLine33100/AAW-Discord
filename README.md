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

### Backend environment variables

In the `backend` directory, create a `.env` file containing the following environment variables:

| Variable Name           | Description                                                                                                                                 |
|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| `PORT`                  | TCP port on which the backend application will be listening (optional, default value = 8000)                                                |
| `GOOGLE_SPREADSHEET_ID` | Google Sheets [Spreadsheet ID](https://developers.google.com/sheets/api/guides/concepts)                                                    |
| `GOOGLE_SHEET_ID`       | ID of the [sheet](https://developers.google.com/sheets/api/guides/concepts) containing users and skills data                                |
| `GOOGLE_CLIENT_EMAIL`   | [Credentials] Google service account email address (ending by `@<application name>.iam.gserviceaccount.com`)                                |
| `GOOGLE_CLIENT_ID`      | [Credentials] Google Client ID                                                                                                              |
| `GOOGLE_PRIVATE_KEY`    | [Credentials] Google service account private key, required to consume Google Sheets' API (beginning by `-----BEGIN PRIVATE KEY-----`)       |
| `DISCORD_CLIENT_ID`     | [Credentials, OAuth] Discord Client ID                                                                                                      |
| `DISCORD_CLIENT_SECRET` | [Credentials, OAuth] Discord Client Secret                                                                                                  |
| `DISCORD_REDIRECT_URI`  | [OAuth] Callback URI used to get the authorization code from Discord authorization server (e.g. `https://aawapi.ngimenez.fr/auth/callback`) |
| `FRONTEND_REDIRECT_URI` | URI on which the user has to be redirected once the authorization process is done (front-end)                                               |
| `JWT_SECRET`            | Secret for signing JSON Web Tokens                                                                                                          |

To get Google credentials: <https://console.cloud.google.com/apis/credentials>. Generate a credentials JSON file and copy the relevant values in the `.env` file.