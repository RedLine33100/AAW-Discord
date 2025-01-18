/*import "./SkillsOverview.css";
import { useNavigate } from "react-router-dom";*/

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SkillsOverview.css";

type Skill = {
    name: string;
    grade: number;
};

type User = {
    name: string;
    skills: Skill[];
    discordId: string;
};

function SkillsOverview() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const BACKEND_URL = import.meta.env.VITE_API_BACKEND;
    const [skillNames, setSkillNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${BACKEND_URL}/users?skills=true&limit=80`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUsers(data);

                const skillResponse = await fetch(
                    `${BACKEND_URL}/skills`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
                        },
                    }
                );

                if (!skillResponse.ok) {
                    throw new Error(`Error: ${skillResponse.statusText}`);
                }

                const allSkills = await skillResponse.json();
                setSkillNames(allSkills);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.toString() : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (userName: string | undefined) => {
        if(userName)
            navigate(`/user/${userName}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="overview-container">
            <h1 className="overview-title">Overview</h1>
            <table className="overview-table">
                <thead>
                    <tr>
                        <th>User</th>
                        {skillNames.map((name) => (
                            <th key={name}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td
                                className="user-name clickable"
                                onClick={() => handleUserClick(user.discordId)}
                            >
                                <span className="user-icon">👤</span>
                                {user.name}
                            </td>
                            {skillNames.map((name) => {
                                const skill = user.skills.find(
                                    (s) => s.name === name
                                );
                                return (
                                    <td key={name} className="skill-cell">
                                        {skill ? (
                                            <div className="progress-container">
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${skill.grade * 10}%`,
                                                        backgroundColor:
                                                            skill.grade < 4
                                                                ? "red"
                                                                : skill.grade <= 7
                                                                ? "orange"
                                                                : "green",
                                                    }}
                                                ></div>
                                                <span className="skill-grade">
                                                    {skill.grade}
                                                </span>
                                            </div>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SkillsOverview;
/*

type Skill = {
    name: string;
    grade: number;
};

type User = {
    name: string;
    skills: Skill[];
};

function SkillsOverview() {
    const navigate = useNavigate();

    const users: User[] = [
        {
            name: "User1",
            skills: [
                { name: "AAW", grade: 10 },
                { name: "COO", grade: 10 },
                { name: "Web", grade: 10 },
                { name: "Java", grade: 10 },
            ],
        },
        {
            name: "User2",
            skills: [
                { name: "AAW", grade: 7 },
                { name: "COO", grade: 8 },
                { name: "Web", grade: 6 },
                { name: "Java", grade: 9 },
            ],
        },
    ];

    const skillNames = ["AAW", "COO", "Web", "Java"];

    const handleUserClick = (userName: string) => {
        navigate(`/user/${userName}`);
    };

    return (
        <div className="overview-container">
            <h1 className="overview-title">Overview</h1>
            <table className="overview-table">
                <thead>
                <tr>
                    <th>User</th>
                    {skillNames.map((skillName) => (
                        <th key={skillName}>{skillName}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td
                            className="user-name clickable"
                            onClick={() => handleUserClick(user.name)} // Attach onClick
                        >
                            <span className="user-icon">👤</span>
                            {user.name}
                        </td>
                        {skillNames.map((skillName) => {
                            const skill = user.skills.find((s) => s.name === skillName);
                            return (
                                <td key={skillName} className="skill-cell">
                                    {skill ? (
                                        <div className="progress-container">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${skill.grade * 10}%`,
                                                    backgroundColor:
                                                        skill.grade < 4
                                                            ? "red"
                                                            : skill.grade <= 7
                                                                ? "orange"
                                                                : "green",
                                                }}
                                            ></div>
                                            <span className="skill-grade">{skill.grade}</span>
                                        </div>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SkillsOverview;*/