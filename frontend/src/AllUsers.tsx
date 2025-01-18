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
    const [admins, setAdmins] = useState<string[]>([]);

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

        const fetchAdmin = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BACKEND_URL}/admins`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setAdmins(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.toString() : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
        fetchUsers();
    }, []);

    const handleEditClick = (userId: string) => {
        navigate(`/user-sessions/${userId}`);
    };

    const isAdmin = (user: User) => {
        for(const id of admins){
            if(id===user.discordId)
                return true;
        }
        return false;
    }

    const updateAdmins = async (user:User, validValue: boolean) => {
        try {

            const response = await fetch(`${BACKEND_URL}/admins/${user.discordId}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({valid: validValue}),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }catch (e) {
            console.error(e);
        }
    }

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
                    <th>Admins</th>
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
                        <td><input type="checkbox" id="exampleCheckbox" name="exampleCheckbox" checked={isAdmin(user)} onChange={() => updateAdmins(user, !isAdmin(user))}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;