import "./SkillsOverview.css";
import { useNavigate } from "react-router-dom";

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

export default SkillsOverview;