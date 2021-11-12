import React from 'react'

export default function Field({ name, label, value, onChange, placeholder, type = "text", error = "", minLength = "0" }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label}</label>
            <input
                type={type}
                className={"form-control" + (error && " is-invalid")}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                minLength={minLength}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}
