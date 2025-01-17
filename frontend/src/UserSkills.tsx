import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MySkills.css";

type Skill = {
    name: string;
    grade: number;
};

function UserSkills() {
    const { userName } = useParams<{ userName: string }>();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://aaw.ngimenez.fr:8000/api/v1/users/search/${userName}?skills=true`;
    const AUTH_TOKEN = "YOUR_ACCESS_TOKEN";

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${AUTH_TOKEN}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setSkills(data.skills || []);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error fetching user skills:", error);
                    setError(error.message);
                } else {
                    console.error("Unknown error:", error);
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, [userName]);

    if (loading) return <p>Loading skills...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="my-skills">
            <h1 className="title">{userName}'s Skills</h1>
            <ul className="skills-list">
                {skills.map((skill, index) => (
                    <li key={index} className="skill-item">
                        <span className="skill-name">{skill.name}</span>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${skill.grade * 10}%`,
                                    backgroundColor:
                                        skill.grade < 4 ? "red" : skill.grade <= 7 ? "orange" : "green",
                                }}
                            ></div>
                        </div>
                        <span className="skill-grade">{skill.grade}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserSkills;