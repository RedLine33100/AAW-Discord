
import { useState } from "react";
import "./Add_pop-up.css";

type Skill = {
    name: string;
    grade: number;
};

type PopupProps = {
    allSkills: string[];
    allUserSkills: Skill[];
    addSkill: (skill: Skill) => Promise<void>;
    onClose: () => void;
};

const Popup = ({ allSkills, allUserSkills, addSkill, onClose }: PopupProps) => {
    const [grade, setGrade] = useState(5);
    const [selectedName, setSelectedName] = useState<string | null>(null);

    const getSliderColor = (grade: number) => {
        if (grade < 4) return "red";
        if (grade >= 4 && grade <= 7) return "orange";
        return "green";
    };

    const skills : string[] = [];

    for(const i of allSkills){
        let cnt : boolean = false;
        for(const j of allUserSkills){
            if(i === j.name){
                cnt = true;
            }
        }
        if(!cnt)
            skills.push(i);
    }

    return (
        <div className="popup-backdrop">
            <div className="popup">
                <h2 className="popup-title">
                </h2>
                <label className="skill-label">Select a Skill:</label>
                <input list="skillsList" onChange={(e) => setSelectedName(e.target.value)}/>
                <datalist id="skillsList">
                    {
                        skills.map((skill) => (
                            <option key={skill} value={skill}/>
                        ))
                    }
                </datalist>

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
                        if (selectedName !== null) {
                            addSkill({
                                name: selectedName,
                                grade: grade,
                            });
                            onClose();
                        }
                    }
                    } className="popup-button">
                        Ajouter
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