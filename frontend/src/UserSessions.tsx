import { useParams } from "react-router-dom";
import "./UserSessions.css";

type Session = {
    id: string;
    name: string;
    date: string;
};

function UserSessions() {
    const { userId } = useParams<{ userId: string }>();

    const sessions: Session[] = [
        { id: "1", name: "Session 1", date: "2025-01-01" },
        { id: "2", name: "Session 2", date: "2025-01-02" },
        { id: "3", name: "Session 3", date: "2025-01-03"},
    ];

    return (
        <div className="user-sessions-container">
            <h1 className="user-sessions-title">User Sessions for {userId}</h1>
            <table className="user-sessions-table">
                <thead>
                <tr>
                    <th>Session Name</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {sessions.map((session) => (
                    <tr key={session.id}>
                        <td>{session.name}</td>
                        <td>{session.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserSessions;