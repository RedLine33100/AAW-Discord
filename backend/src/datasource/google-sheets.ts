import {google} from "googleapis";

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ]
});

export const SHEETS = google.sheets({
    auth,
    version: "v4",
});

export namespace Column {
    export const A_NAME = 'A';
    export const N_NAME = 0;
    export const A_DISCORD_ID = 'B';
    export const N_DISCORD_ID = 1;
    export const A_LAST_UPDATE = 'C';
    export const N_LAST_UPDATE = 2;
    export const A_FIRST_SKILL_COLUMN = 'D';
    export const N_FIRST_SKILL_COLUMN = 3;
}

export const SKILLS_RANGE = `${Column.A_FIRST_SKILL_COLUMN}1:1`;