

import {Routes, Route, Link, Navigate, useSearchParams,} from 'react-router-dom';
import SkillsOverview from './SkillsOverview';

import './App.css';
import MySkills from "./MySkills.tsx";
import UserSkills from "./UserSkills.tsx";
import {BACKEND_URL} from "./util"



import AllUsers from "./AllUsers.tsx";
import UserSessions from "./UserSessions.tsx";


import {useEffect, useState} from "react";
import { useCookies } from 'react-cookie'

function App() {
    const [searchParams] = useSearchParams();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);


    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    if(!cookies['access_token']){
        const token = searchParams.get("token");
        if(token != null){
            setCookie("access_token", token, {sameSite: 'none'});
            cookies['access_token'] = token;
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            if (cookies['access_token']) {
                try {
                    const response = await fetch(`${BACKEND_URL}/users/me`, {
                        method: "GET",
                        credentials: "include",
                    });
                    console.log("Response:", response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("User Data:", data);
                        setUserName(data.name);
                        setIsAuthenticated(true);
                        setCookie('access_token', cookies['access_token']);
                    } else {
                        console.error("Failed to authenticate:", response.statusText);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Error during authentication check:", error);
                    setIsAuthenticated(false);
                }
            } else {
                console.log("No token found");
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);
    const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
    };
    const logout = () => {
        removeCookie('access_token');
        setIsAuthenticated(false)
    }

    return (
            <div className="App">
                <header className="header">
                    <div className="header-left">
                        {isAuthenticated && (
                            <Link to="/my-skills" className="header-title">MySkills</Link>
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
                                <ProtectedRoute>
                                    <AllUsers />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user-sessions/:userId"
                            element={
                                <ProtectedRoute>
                                    <UserSessions />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
    );
}
export default App



