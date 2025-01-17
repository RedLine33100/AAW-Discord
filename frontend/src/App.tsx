import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SkillsOverview from './SkillsOverview';

import './App.css';
import MySkills from "./MySkills.tsx";
import UserSkills from "./UserSkills.tsx";
import {BACKEND_URL} from "./util"
import {useEffect, useState} from "react";
import Cookies from "js-cookie";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("access_token");
            if (token) {
                try {
                    const response = await fetch(`${BACKEND_URL}/users/me`, {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserName(data.name);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification de l'authentification :", error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="header">
                    <div className="header-left">
                        {isAuthenticated && <Link to="/my-skills" className="header-title">MySkills</Link>}
                    </div>
                    <div className="header-right">
                        <nav>
                            <ul>
                                {isAuthenticated ? (
                                    <>
                                        <li>
                                            <Link to="/skills-overview" className="skillsoverview">
                                                Skills Overview
                                            </Link>
                                        </li>
                                        <li>
                                            <span className="username">{userName}</span>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <a href={`${BACKEND_URL}/auth`} className="login">
                                            Log in
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<h1>Welcome to Skills Website</h1>} />
                        {isAuthenticated && (
                            <>
                                <Route path="/skills-overview" element={<SkillsOverview />} />
                                <Route path="/my-skills" element={<MySkills />} />
                                <Route path="/user/:userName" element={<UserSkills />} />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App
   /* return (
        <Router>
            <div className="App">
                <header className="header">
                    <div className="header-left">
                        <Link to="/my-skills" className="header-title">MySkills</Link>
                    </div>
                    <div className="header-right">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/skills-overview" className="skillsoverview">Skills Overview</Link>
                                </li>
                                <li>
                                    <a href={`${BACKEND_URL}/auth`} className="Authetification">
                                        Log in
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/skills-overview" element={<SkillsOverview/>}/>
                        <Route path="/my-skills" element={<MySkills/>}/>
                        <Route path="/user/:userName" element={<UserSkills/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}*/


