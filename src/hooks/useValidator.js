import { useState, useCallback } from 'react';

const useValidator = (options) => {
    const [errors, setErrors] = useState({});

    const ruleMap = options.rules.reduce((map, rule) => {
        if (!map[rule.selector]) {
            map[rule.selector] = [];
        }
        map[rule.selector].push(rule);
        return map;
    }, {});

    const validateField = useCallback((fieldName, formData) => {
        const rules = ruleMap[fieldName] || [];
        rules.some((rule) => {
            const message = rule.test(formData[fieldName], formData);
            if (message) {
                setErrors((prev) => ({
                    ...prev,
                    [fieldName]: message,
                }));
                return true;
            }
            return false;
        });
    }, [ruleMap]);

    const clearError = useCallback(fieldName => {
        setErrors((prev) => {
            const { [fieldName]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    const validateAll = useCallback((formData) => {
        const newErrors = {};
        options.rules.forEach((rule) => {
            const message = rule.test(formData[rule.selector], formData);
            if (message && !newErrors[rule.selector]) {
                newErrors[rule.selector] = message;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [options.rules]);

    return {
        errors,
        validateField,
        clearError,
        validateAll,
    };
};


useValidator.isRequired = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Trường này là bắt buộc';
        },
    };
};

useValidator.isPasswordMatch = (selector, compareSelector, message) => {
    return {
        selector,
        test: (value, formData) => {
            return value === formData[compareSelector] ? undefined : message || 'Mật khẩu không khớp'
        },
    };
};

useValidator.minLength = (selector, minLength, message) => {
    return {
        selector,
        test: (value) => {
            return value.length >= minLength ? undefined : message || `Mật khẩu phải có ít nhất ${minLength} ký tự`;
        },
    };
};

useValidator.isEmail = (selector, message) => {
    return {
        selector,
        test: (value) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(value) ? undefined : message || 'Email không hợp lệ';
        },
    };
};

export default useValidator;