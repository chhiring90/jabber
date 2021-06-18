import validator from 'validator';

export const updateObject = (oldObject, newObject) => {
    return {
        ...oldObject,
        ...newObject
    }
};

export const checkValidation = (value, rules) => {
    let isValid = true;

    if (!rules) return true;
    if (rules.required) {
        isValid = !validator.isEmpty(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
        isValid = validator.isEmail(value) && isValid;
    }

    return isValid;
}

export const clearInputValues = (form) => {
    const formObjKey = Object.keys(form).map(key => key);
    const formData = {...form};
    formObjKey.forEach(el => formData[el].value = '');
    return formData;
}