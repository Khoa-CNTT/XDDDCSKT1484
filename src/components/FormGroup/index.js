function FormGroup({
    name,
    type = 'text',
    text,
    placeholder,
    classNameFormGroup,
    classNameLabel,
    classNameInput,
    classNameError,
    classNameInvalid,
    value,
    valid,
    error,
    handleBlur,
    handleChange,
    handleKeyUp,
}) {
    return (
        <div className={`${classNameFormGroup} ${valid || error ? classNameInvalid : ''}`}>
            <label htmlFor={name} className={classNameLabel}>{text}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={classNameInput}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
            />
            {valid && <span className={classNameError}>{valid}</span>}
            {error && <span className={classNameError}>{error}</span>}
        </div>
    );
}

export default FormGroup;