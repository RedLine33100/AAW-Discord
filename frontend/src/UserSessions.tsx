import { useParams } from "react-router-dom";
import "./UserSessions.css";
import {useEffect, useState} from "react";

type Session = {
    _id: string;
    discordUSERID: string;
    expireDate: number;
    valid: boolean;
};

function UserSessions() {
    const { userId } = useParams<{ userId: string }>();
    const [sessions, setSessions] = useState<Session[]>([]);

    const BACKEND_URL = import.meta.env.VITE_API_BACKEND;

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/users`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setSessions(data);
            }catch (e) {
                console.error(e);
            }
        }

        fetchSessions();
    })

    const updateSessionValidity = async (id: string, valid: boolean) => {
        try {
            const response = await fetch(`${BACKEND_URL}/sessions`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({ id, valid }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }catch (e) {
            console.error(e);
        }
    }

    const deleteSession = async (id: string) => {
        try {
            const response = await fetch(`${BACKEND_URL}/sessions/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            setSessions((session) => session.filter((s) => s._id !== id));
        }catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="user-sessions-container">
            <h1 className="user-sessions-title">User Sessions for {userId}</h1>
            <table className="user-sessions-table">
                <thead>
                <tr>
                    <th>Expire</th>
                    <th>Valid</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {sessions.map((session) => (
                    <tr key={session._id}>
                        <td>{new Date(session.expireDate).toISOString()}</td>
                        <td><input type="checkbox" id="exampleCheckbox" name="exampleCheckbox" checked={session.valid} onChange={event => updateSessionValidity(session._id, event.target.checked)}/></td>
                        <td><button type="button" id="exampleCheckbox" name="exampleCheckbox" onClick={() => deleteSession(session._id)}>Supprimer</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserSessions;