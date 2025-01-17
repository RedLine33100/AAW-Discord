
import { useState } from "react";
import "./Add_pop-up.css";

type Skill = {
    name: string;
    grade: number;
};

type PopupProps = {
    skill: Skill;
    updateSkill: (skill: Skill) => Promise<void>;
    onClose: () => void;
};

const EditPopup = ({ skill, updateSkill, onClose }: PopupProps) => {
    const [grade, setGrade] = useState(skill?.grade || 5);

    const isEditMode = !!skill;

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

                <label className="popup-label">Grade</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={grade}
                    className="popup-slider"
                    onChange={(e) => {
                        setGrade(Number(e.target.value));
                    }}
                    style={{
                        background: `linear-gradient(to right, ${getSliderColor(grade)} 0%, ${getSliderColor(
                            grade
                        )} ${(grade - 1) * 11.1}%, #ccc ${(grade - 1) * 11.1}%, #ccc 100%)`,
                    }}
                />
                <div className="popup-grade">{grade}</div>

                <div className="popup-actions">
                    <button onClick={() => {
                        skill.grade = grade;
                        updateSkill(skill);
                        onClose()}
                    } className="popup-button" >
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

export default EditPopup;
