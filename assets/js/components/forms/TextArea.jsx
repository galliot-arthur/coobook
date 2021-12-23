import React from 'react'

export default function TextArea({ name, label, value, classDiv = 'form-group mb-2', onChange, placeholder, type = "text", error = "", minLength = "0", required = true }) {
    return (
        <div className={classDiv}>
            <label htmlFor={name}>
                {label}</label>
            <textarea
                type={type}
                className={"form-control" + (error && " is-invalid")}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                minLength={minLength}
            ></textarea>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}
