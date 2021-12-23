import React from 'react'

export default function RawField({ name, value, onChange, placeholder, type = "text", minLength = "0", required = true }) {
    return (
        <input
            type={type}
            className={"form-control"}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            minLength={minLength}
        />
    )
}
