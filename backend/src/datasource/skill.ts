import {SHEETS, SKILLS_RANGE} from "./google-sheets.js";

export function getSkills(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        SHEETS.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: SKILLS_RANGE,
        }).then(response => {
            resolve(response.data.values?.at(0) ?? []);
        }).catch(reject);
    });
}