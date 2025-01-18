import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SkillsOverview from './SkillsOverview';

import './App.css';
import MySkills from "./MySkills.tsx";
import UserSkills from "./UserSkills.tsx";
import {BACKEND_URL} from "./util"



function App() {

    return (
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

}
export default App

  /*  import {useEffect, useState} from "react";
    import Cookies from 'js-cookie';

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
                    console.log("Response:", response);
                    if (response.ok) {
                        const data = await response.json();
                        console.log("User Data:", data);
                        setUserName(data.name);
                        setIsAuthenticated(true);
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
        return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    };

    return (
        <Router>
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
                                        <span className="username">{userName}</span>
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
                        <Route path="/" element={<h1>Welcome to the Skills Website</h1>} />
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
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App

*/

