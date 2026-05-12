import React from 'react';

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

export default function TextField({ label, name, type = 'text', required = false }: TextFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} />
    </div>
  );
}
