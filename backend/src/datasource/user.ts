import {mapToUser, User} from "../types/user.js";
import {Column, SHEETS, SKILLS_RANGE} from "./google-sheets.js";

export function getUsers(offset: number, limit: number, includeSkills: boolean): Promise<User[]> {
    const firstRow = offset + 2;
    const lastRow = limit + offset + 1;
    const dataRange = includeSkills ?
        `${firstRow}:${lastRow}` : `${Column.A_NAME}${firstRow}:${Column.A_LAST_UPDATE}${lastRow}`;

    return new Promise<User[]>((resolve, reject) => {
        SHEETS.spreadsheets.values.batchGet({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            ranges: includeSkills ? [dataRange, SKILLS_RANGE] : [dataRange],
        }).then(response => {
            const usersValueRange = response.data.valueRanges?.at(0);
            const skills = includeSkills ?
                (response.data.valueRanges?.at(1)?.values?.at(0) ?? []) : undefined;

            resolve(usersValueRange?.values?.map(value => mapToUser(value, skills)) ?? []);
        }).catch(reject);
    });
}

export function findUsersByName(name: string, offset: number, limit: number): Promise<User[]> {
    const _name = name.toLowerCase();

    return new Promise<User[]>((resolve, reject) => {
        SHEETS.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            range: "A2:C"
        }).then(response => {
            if (response.data.values) {
                resolve(response.data.values
                    .filter(row => <string>(row[Column.N_NAME]).toLowerCase().startsWith(_name))
                    .slice(offset, offset + limit)
                    .map(row => mapToUser(row))
                );
            } else {
                resolve([]);
            }
        }).catch(reject);
    })
}

export function getUserById(discordId: string): Promise<User | undefined> {
    return new Promise<User | undefined>((resolve, reject) => {
        SHEETS.spreadsheets.values.batchGetByDataFilter({
            spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
            requestBody: {
                dataFilters: [
                    {
                        gridRange: {
                            sheetId: Number.parseInt(process.env.GOOGLE_SHEET_ID!),
                            startColumnIndex: 0,
                            startRowIndex: 1
                        }
                    },
                    {
                        a1Range: SKILLS_RANGE
                    }
                ]
            }
        }).then(response => {
            if (response.data.valueRanges) {
                // Value ranges are not returned in the right order, so we have to figure out the indices
                const skillsRangeIndex = response.data.valueRanges.findIndex(vr =>
                    vr.dataFilters?.at(0)?.a1Range === SKILLS_RANGE
                );
                const usersRangeIndex = skillsRangeIndex === 1 ? 0 : 1;

                if (skillsRangeIndex === -1) {
                    throw new Error("Invalid skills range index");
                }

                const usersValueRange = response.data.valueRanges.at(usersRangeIndex)?.valueRange?.values ?? [];
                const skills = response.data.valueRanges?.at(skillsRangeIndex)?.valueRange?.values?.at(0) ?? [];

                const userRow = usersValueRange.find(row => row[Column.N_DISCORD_ID] === discordId);
                resolve(userRow ? mapToUser(userRow, skills) : undefined);
            }
            resolve(undefined);
        }).catch(reject);
    })
}
