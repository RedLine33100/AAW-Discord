import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SkillsOverview from './SkillsOverview';

import './App.css';
import MySkills from "./MySkills.tsx";
import UserSkills from "./UserSkills.tsx";
import AuthPage from "./Authentification.tsx";


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
                                    <Link to="/login" className="Authetification">
                                        Log in
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/skills-overview" element={<SkillsOverview />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/my-skills" element={<MySkills />} />
                        <Route path="/user/:userName" element={<UserSkills />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App
