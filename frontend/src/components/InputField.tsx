import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, placeholder, onChange, icon }) => {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <div className="input-wrapper">
                <input type={type} id={id} value = {value} placeholder={placeholder} required onChange={onChange} />
                <span className="icon">{icon}</span>
            </div>
        </div>
    );
};

export default InputField;