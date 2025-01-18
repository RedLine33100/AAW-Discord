

import {Routes, Route, Link, Navigate,} from 'react-router-dom';
import SkillsOverview from './SkillsOverview';

import './App.css';
import MySkills from "./MySkills.tsx";
import UserSkills from "./UserSkills.tsx";



import AllUsers from "./AllUsers.tsx";
import UserSessions from "./UserSessions.tsx";


import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

function App() {
    const [cookies, setCookies] = useCookies(["auth", "username", "admin"]);
    const [isAuthenticated, setIsAuthenticated] = useState(cookies["auth"] || false);
    const [isAdmin, setIsAdmin] = useState(cookies["admin"] || false);
    const [userName, setUserName] = useState<string | null>(cookies["username"]);

    const BACKEND_URL = import.meta.env.VITE_API_BACKEND;

    useEffect(() => {
        const checkAuth = async () => {
                try {
                    const response = await fetch(`${BACKEND_URL}/users/me`, {
                        method: "GET",
                        credentials: "include",
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUserName(data.name);
                        setIsAuthenticated(true);
                        if(data.admin)
                            setIsAdmin(true);
                        else setIsAdmin(false);
                        setCookies("username", data.name);
                    } else {
                        setIsAuthenticated(false);
                        setCookies("username", null);
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error(error);
                    setIsAuthenticated(false);
                    setCookies("username", null);
                    setIsAdmin(false);
                }
        };

        checkAuth();
    }, []);
    const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
    };
    const AdminProtected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
    };
    const logout = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/auth/logout`, {
                method: "PUT",
                credentials: "include",
            });
            if (!response.ok) {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
        localStorage.clear();
        setCookies("username", null);
        setUserName(null)
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

    return (
            <div className="App">
                <header className="header">
                    <div className="header-left">
                        {isAuthenticated && (
                            <Link to="/my-skills" className="header-title">MySkills</Link>
                        )}
                        {isAuthenticated && isAdmin && (
                            <Link to="/all-users" className="header-title">Manage Sessions</Link>
                        )}
                    </div>
                    <div className="header-right">
                        <nav>
                            <ul>
                                {isAuthenticated && (
                                    <li>
                                        <Link to="/skills-overview" className="skills-overview">Skills Overview</Link>
                                    </li>
                                )}
                                <li>
                                    {isAuthenticated ? (
                                        <div>
                                        <span className="username">{userName}</span>
                                        <button onClick={logout}>
                                            Log Out
                                        </button>
                                        </div>
                                    ) : (
                                        <a href={`${BACKEND_URL}/auth`} className="login">Log in</a>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<h1 className={"welcome"}>Welcome to the Skills Website</h1>} />
                        <Route
                            path="/skills-overview"
                            element={
                                <ProtectedRoute>
                                    <SkillsOverview />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-skills"
                            element={
                                <ProtectedRoute>
                                    <MySkills />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user/:userName"
                            element={
                                <ProtectedRoute>
                                    <UserSkills />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/all-users"
                            element={
                                <AdminProtected>
                                    <AllUsers />
                                </AdminProtected>
                            }
                        />
                        <Route
                            path="/user-sessions/:userId"
                            element={
                                <AdminProtected>
                                    <UserSessions />
                                </AdminProtected>
                            }
                        />
                    </Routes>
                </main>
            </div>
    );
}
export default App



