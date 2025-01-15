import {Column} from "./columns.js";

export type UserSkill = {
    name: string;
    grade: number;
}

export type User = {
    name: string;
    discordId: string;
    lastUpdate: string;
    skills?: UserSkill[];
};

export function mapToUser(data: string[], skills?: string[]): User {
    return {
        name: data[Column.N_NAME],
        discordId: data[Column.N_DISCORD_ID],
        lastUpdate: data[Column.N_LAST_UPDATE],
        skills: skills?.flatMap((value, index): UserSkill | [] => {
            const grade = Number.parseInt(data[Column.N_FIRST_SKILL_COLUMN + index]);
            return isNaN(grade) || grade === 0 ? [] : {
                name: value,
                grade
            };
        })
    };
}

// Extensions to Request objects
declare global {
    namespace Express {
        export interface Request {
            authorization?: any;
        }
    }
}