import React from 'react'

export default function Field({ name, label = false, value, onChange, placeholder, type = "text", error = "", minLength = "2", required = true, maxLength = 255 }) {
    return (
        <div className="form-group mb-2">
            {
                label &&
                <label htmlFor={name}>
                    {label}</label>
            }
            <input
                type={type}
                className={"form-control" + (error && " is-invalid")}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}
