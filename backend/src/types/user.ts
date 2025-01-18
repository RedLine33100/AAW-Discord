import {Column} from "../datasource/google-sheets.js";

export type UserSkill = {
    name: string;
    grade: number;
}

export type User = {
    name: string;
    discordId: string;
    lastUpdate: string;
    skills?: UserSkill[];
    admin: boolean | unknown;
};

export function mapToUser(data: string[], skills?: string[]): User {
    return {
        name: data[Column.N_NAME],
        discordId: data[Column.N_DISCORD_ID],
        lastUpdate: data[Column.N_LAST_UPDATE],
        admin: undefined,
        skills: skills?.flatMap((value, index): UserSkill | [] => {
            let gradeString = data[Column.N_FIRST_SKILL_COLUMN + index]?.trim() ?? "";
            if (gradeString.startsWith("'")) gradeString.slice(1);
            const grade = Number.parseInt(gradeString);

            return isNaN(grade) || grade === 0 ? [] : {
                name: value,
                grade
            };
        }),
    };
}