import {google} from "googleapis";

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: process.env.PRIVATE_KEY,
    },
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ]
});

const sheets = google.sheets({
    auth,
    version: "v4",
});

export default sheets;
