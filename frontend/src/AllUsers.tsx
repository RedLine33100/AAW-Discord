import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllUsers.css";

type User = {
    name: string;
    discordId: string;
};

function AllUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const BACKEND_URL = import.meta.env.VITE_API_BACKEND;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BACKEND_URL}/users?limit=50`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUsers(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.toString() : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (userId: string) => {
        navigate(`/user-sessions/${userId}`);
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="all-users-container">
            <h1 className="all-users-title">All Users</h1>
            <table className="all-users-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.discordId}>
                        <td>{user.name}</td>
                        <td>
                            <button
                                className="edit-button"
                                onClick={() => handleEditClick(user.discordId)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;