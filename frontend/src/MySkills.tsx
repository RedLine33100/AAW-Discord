
import './MySkills.css';
import {useEffect, useState} from "react";
import Popup from "./Add_pop-up.tsx";

type Skill = {
    name: string;
    grade: number;
};
function MySkills() {
    /*const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({ name: '', grade: 0 }); // State for the new skill

    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
                const response = await fetch('http://aaw.ngimenez.fr:8000/api/v1/skills/my', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ACCESS_TOKEN`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur : ${response.statusText}`);
                }

                const data = await response.json();
                setSkills(data);
        };

        fetchSkills();
    }, []);
    const addSkill = async () => {
            const response = await fetch('http://aaw.ngimenez.fr:8000/api/v1/skills/my', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with a valid token
                },
                body: JSON.stringify(newSkill),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedSkill = await response.json();
            setSkills([...skills, updatedSkill]);
            setNewSkill({ name: '', grade: 0 });

    };

        const deleteSkill = async (skillName: string) => {
        try {
            const response = await fetch('http://aaw.ngimenez.fr:8000/api/v1/skills/my', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plain',
                    Authorization: `Bearer YOUR_ACCESS_TOKEN`,
                },
                body: skillName, // Nom de la compétence à supprimer
            });

            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
            }

            setSkills((prevSkills) => prevSkills.filter((s) => s.name !== skillName));
        } catch (error) {
            console.error("Erreur lors de la suppression de la compétence :", error);
        }
    };
    const updateSkill = async (updatedSkill: Skill) => {
    try {
        const response = await fetch('http://aaw.ngimenez.fr:8000/api/v1/skills/my', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer YOUR_ACCESS_TOKEN`,
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
*/
    const mockSkills: Skill[] = [
        { name: 'React', grade: 8 },
        { name: 'JavaScript', grade: 7 },
        { name: 'CSS', grade: 6 },
    ];

    const [skills, setSkills] = useState<Skill[]>([]);
   // const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);



    useEffect(() => {
        const fetchSkills = async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSkills(mockSkills);

        };

        fetchSkills();
    }, []);


    const handleAdd = () => {
        setCurrentSkill(null);
        setIsPopupOpen(true);
    };


    const handleEdit = (skill: Skill) => {
        setCurrentSkill(skill); // Skill à modifier
        setIsPopupOpen(true);
    };
    const handleSave = (skill: Skill) => {
        if (currentSkill) {
            setSkills((prevSkills) =>
                prevSkills.map((s) =>
                    s.name === currentSkill.name ? { ...s, grade: skill.grade } : s
                )
            );
        } else {

            setSkills([...skills, skill]);
        }
        setIsPopupOpen(false);
    };
const handleDelete = (skill: Skill) => {
    setSkills((prevSkills) =>
        prevSkills.filter((s) => s.name !== skill.name)
    )
}
    return (
        <div className="my-skills">
            <header className="my-skills-header">
                <h1 className="title">My Skills</h1>
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
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
                                onClick={() => handleEdit(skill)}
                            >
                                ✏️
                            </button>
                            <button
                                className="action-button delete"
                                onClick={() => handleDelete(skill)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Affichage de la pop-up */}
            {isPopupOpen && (
                <Popup
                    skill={currentSkill}
                    onSave={handleSave}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
};

export default MySkills;