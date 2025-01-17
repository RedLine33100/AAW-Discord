import {Column, DISCORD_ID_RANGE, SHEETS, SKILLS_RANGE} from "./google-sheets.js";

export enum SetSkillResult {
    SUCCESS = "success",
    UNKNOWN_SKILL = "unknown_skill",
    UNKOWN_USER = "unknown_user",
}

/**
 * **Read-Only**.
 * Returns a `Promise` wrapping the list of existing skills.
 */
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

/**
 * **Read-Write**.
 * Updates the grade (between 0 and 10 inclusive) for the given skill name and for the given user (`discordId`).
 * Returns a `Promise` indicating if the update was successful, or if the given skill or user was not found.
 */
export function setSkill(discordId: string, skillName: string, grade: number): Promise<SetSkillResult> {
    return new Promise<SetSkillResult>((resolve, reject) => {
        // Find the index of the skill and the index of the user
        SHEETS.spreadsheets.values.batchGet({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            ranges: [
                SKILLS_RANGE,
                DISCORD_ID_RANGE
            ]
        }).then(response => {
            const skills = response.data.valueRanges?.at(0)?.values?.at(0) ?? [];
            const users = response.data.valueRanges?.at(1)?.values?.flat() ?? [];

            const skillIndex = skills.indexOf(skillName);
            if (skillIndex === -1) {
                resolve(SetSkillResult.UNKNOWN_SKILL);
                return;
            }

            const userIndex = users.indexOf(discordId);
            if (userIndex === -1) {
                resolve(SetSkillResult.UNKOWN_USER);
                return;
            }

            SHEETS.spreadsheets.values.batchUpdateByDataFilter({
                spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
                requestBody: {
                    valueInputOption: "USER_ENTERED",
                    data: [
                        {
                            dataFilter: {
                                gridRange: {
                                    sheetId: Number.parseInt(process.env.GOOGLE_SHEET_ID!),
                                    startRowIndex: userIndex + 1,
                                    startColumnIndex: skillIndex + Column.N_FIRST_SKILL_COLUMN
                                }
                            },
                            values: [
                                [grade]
                            ]
                        },
                        {
                            dataFilter: {
                                gridRange: {
                                    sheetId: Number.parseInt(process.env.GOOGLE_SHEET_ID!),
                                    startRowIndex: userIndex + 1,
                                    startColumnIndex: Column.N_LAST_UPDATE
                                }
                            },
                            values: [
                                [new Date().toLocaleString("fr-FR")]
                            ]
                        }
                    ]
                }
            });
        }).then(_ => resolve(SetSkillResult.SUCCESS)).catch(reject);
    })
}