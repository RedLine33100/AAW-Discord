/*import { useState } from "react";
import "./Add_pop-up.css";

type Skill = {
    name: string;
    grade: number;
};

const availableSkills = ["React", "JavaScript", "CSS", "TypeScript"]; // Compétences disponibles
type PopupProps = {
    skill: Skill | null; // Null si ajout, sinon la compétence à modifier
    existingSkills: Skill[]; // Liste des compétences déjà ajoutées
    onSave: (skill: Skill) => void; // Fonction pour sauvegarder
    onClose: () => void; // Fonction pour fermer la pop-up
};

const Popup = ({ skill, existingSkills, onSave, onClose }: PopupProps) => {
    const [selectedSkill, setSelectedSkill] = useState(skill?.name || ""); // Nom initial
    const [grade, setGrade] = useState(skill?.grade || 5); // Grade initial
    const isEditMode = !!skill; // Mode édition ou ajout

    const handleSave = async () => {
        // Vérifie si la compétence existe déjà dans les compétences existantes
        if (!isEditMode && existingSkills.some((s) => s.name === selectedSkill)) {
            alert(`"${selectedSkill}" is already added.`);
            return;
        }

        // Vérifie si la compétence est valide uniquement en mode ajout
        if (!isEditMode && !availableSkills.includes(selectedSkill)) {
            alert(`"${selectedSkill}" is not a valid skill.`);
            return;
        }

        // Appelle la fonction onSave pour envoyer la compétence au parent
        onSave({ name: selectedSkill, grade });
        onClose();
    };

    const getSliderColor = (grade: number) => {
        if (grade < 4) return "red";
        if (grade >= 4 && grade <= 7) return "orange";
        return "green";
    };

    return (
        <div className="popup-backdrop">
            <div className="popup">
                <h2 className="popup-title">
                    {isEditMode ? "Edit Skill" : "Add Skill"}
                </h2>

                {!isEditMode && (
                    <>
                        <label className="popup-label">Skill Name</label>
                        <input
                            type="text"
                            className="popup-input"
                            placeholder="Select a skill"
                            list="skills-list"
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                        />
                        <datalist id="skills-list">
                            {availableSkills.map((skill, index) => (
                                <option key={index} value={skill} />
                            ))}
                        </datalist>
                    </>
                )}

                <label className="popup-label">Grade</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={grade}
                    className="popup-slider"
                    onChange={(e) => setGrade(Number(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, ${getSliderColor(grade)} 0%, ${getSliderColor(
                            grade
                        )} ${(grade - 1) * 11.1}%, #ccc ${(grade - 1) * 11.1}%, #ccc 100%)`,
                    }}
                />
                <div className="popup-grade">{grade}</div>

                <div className="popup-actions">
                    <button className="popup-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="popup-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;*/
import { useState } from "react";
import "./Add_pop-up.css";

type Skill = {
    name: string;
    grade: number;
};
const availableSkills = ["React", "JavaScript", "CSS", "TypeScript"];
type PopupProps = {
    skill: Skill | null; // Null si ajout, sinon le skill à modifier
    onSave: (skill: Skill) => void;
    onClose: () => void;
};

const Popup = ({ skill, onSave, onClose }: PopupProps) => {
    const [selectedSkill, setSelectedSkill] = useState(skill?.name || ""); // Nom par défaut
    const [grade, setGrade] = useState(skill?.grade || 5); // Grade par défaut (5)

    // Désactiver le champ de nom en mode édition
    const isEditMode = !!skill;

    const handleSave = () => {
        if (!isEditMode && !availableSkills.includes(selectedSkill)) {
            alert(`"${selectedSkill}" is not a valid skill.`);
            return;
        }

        onSave({ name: selectedSkill, grade });
        onClose();
    };
    const getSliderColor = (grade: number) => {
        if (grade < 4) return "red";
        if (grade >= 4 && grade <= 7) return "orange";
        return "green";
    };

    return (
        <div className="popup-backdrop">
            <div className="popup">
                <h2 className="popup-title">
                    {isEditMode ? "Edit Skill" : "Add Skill"}
                </h2>

                {!isEditMode && (
                    <>
                        <label className="popup-label">Skill Name</label>
                        <input
                            type="text"
                            className="popup-input"
                            placeholder="Select a skill"
                            list="skills-list"
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                        />
                        <datalist id="skills-list">
                            {availableSkills.map((skill, index) => (
                                <option key={index} value={skill} />
                            ))}
                        </datalist>
                    </>
                )}

                <label className="popup-label">Grade</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={grade}
                    className="popup-slider"
                    onChange={(e) => setGrade(Number(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, ${getSliderColor} 0%, ${getSliderColor} ${
                            (grade - 1) * 11.1
                        }%, #ccc ${(grade - 1) * 11.1}%, #ccc 100%)`,
                    }}
                />
                <div className="popup-grade">{grade}</div>

                <div className="popup-actions">
                    <button className="popup-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="popup-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;