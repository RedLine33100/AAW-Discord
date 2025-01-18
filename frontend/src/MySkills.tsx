import './MySkills.css';
import {useEffect, useState} from "react";

import {BACKEND_URL} from "./util.ts";
import EditPopup from "./Edit_pop-up.tsx";
import Popup from "./Add_pop-up.tsx";

type Skill = {
    name: string;
    grade: number;
};
function MySkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [allSkills, setAllSkills] = useState<string[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

    useEffect(() => {
        const fetchExisting = async () => {
            const response = await fetch(`${BACKEND_URL}/skills`, {
                method: 'GET',
                credentials: "include",
            });

            console.log(response)

            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
            }

            const data = await response.json();
            setAllSkills(data);
        };
        const fetchSkills = async () => {
            const response = await fetch(`${BACKEND_URL}/skills/my`, {
                method: 'GET',
                credentials: "include",
            });

            console.log(response)

            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
            }

            const data = await response.json();
            setSkills(data);
        };
        fetchExisting();
        fetchSkills();
    }, []);

    const addSkill = async (skill : Skill) => {
        for(const j in skills){
            if(skills[j].name === skill.name){
                return;
            }
        }
        const response = await fetch(`${BACKEND_URL}/skills/my`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skill),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        setSkills([...skills, skill]);


    };

        const deleteSkill = async (deleteSkill: Skill) => {
        try {
            const response = await fetch(`${BACKEND_URL}/skills/my`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: deleteSkill.name,
            });

            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
            }

            setSkills((prevSkills) => prevSkills.filter((s) => s.name !== deleteSkill.name));
        } catch (error) {
            console.error("Erreur lors de la suppression de la compétence :", error);
        }
    };
    const updateSkill = async (updatedSkill: Skill) => {
    try {
        const response = await fetch(`${BACKEND_URL}/skills/my`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSkill),
        });

        if (!response.ok) {
            throw new Error(`Erreur : ${response.statusText}`);
        }

        setSkills((prevSkills) =>
            prevSkills.map((s) => (s.name === updatedSkill.name ? updatedSkill : s))
        );
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la compétence :", error);
    }
};

    return (
        <div className="my-skills">
            <header className="my-skills-header">
                <h1 className="title">My Skills</h1>
            </header>
            <section className="skills-list">
                {skills.map((skill, index) => (
                    <div className="skill-item" key={index}>
                        <span className="skill-name">{skill.name}</span>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${skill.grade * 10}%`,
                                    backgroundColor:
                                        skill.grade < 4 ? "red" : skill.grade <= 7 ? "orange" : "green",
                                }}
                            ></div>
                        </div>
                        <span className="skill-level">{skill.grade}</span>
                        <div className="action-buttons">
                            <button
                                className="action-button edit"
                                onClick={() => {
                                    setCurrentSkill(skill)
                                    setIsPopupOpen(true)
                                }}
                            >
                                ✏️
                            </button>
                            <button
                                className="action-button delete"
                                onClick={() => deleteSkill(skill)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <button
                className="action-button edit"
                onClick={() => {
                    setIsAddPopupOpen(true)
                }}
            >
                Add Skill
            </button>
            {isPopupOpen && currentSkill && (
                <EditPopup
                    skill={currentSkill}
                    onClose={() => setIsPopupOpen(false)}
                    updateSkill={updateSkill}
                />
            )}
            {isAddPopupOpen && (
                <Popup allSkills={allSkills} allUserSkills={skills} addSkill={addSkill} onClose={() => setIsAddPopupOpen(false)}/>
            )}

        </div>
    );
};

export default MySkills;

