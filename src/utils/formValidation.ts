export function validateSignUp(object: {
    username: string;
    email: string;
    password: string;
}) {

    const usernameValidation = validateName(object.username);
    const emailValidation = validateEmail(object.email);
    const passwordValidation = validatePassword(object.password);

    const validationArray = [usernameValidation, emailValidation, passwordValidation];

    let isValid = true;
    validationArray.map((item) => {
        if (!item.response) {
            isValid = false;
            return;
        }
    });

    const validation = {
        isValid: isValid,
        data: {
            username: usernameValidation.response,
            password:  passwordValidation.response,
            email: emailValidation.response,
        },
        errorMsg: {
            username: usernameValidation.errorMsg,
            password:  passwordValidation.errorMsg,
            email: emailValidation.errorMsg,
        }
    }
    return validation;
}

// Function to validate names
export function validateName(string: string) {
    const nameValue = string.trim();
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; // pattern
    let response: Boolean | string = false;
    let errorMsg: string | null = null;

    if (nameValue.length === 0) {
        errorMsg = "Please enter a name.";
    } else if (nameValue.length >= 255) {
        errorMsg = "The name you entered is too long.";
    } else if (
        regex.test(nameValue) &&
        !nameValue.includes(",,") &&
        !nameValue.includes("..") &&
        !nameValue.includes("''") &&
        !nameValue.includes("--") &&
        !nameValue.includes("  ")
    ) {
        response = nameValue.charAt(0).toUpperCase() + nameValue.slice(1).toLowerCase();
    } else {
        errorMsg = "The name is invalid.";
    }

    return {
        response: response,
        errorMsg: errorMsg
    };
}


// Function to validate emails
export function validateEmail(string: string) {
    const emailValue = string.trim();
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let response: Boolean | string = false;
    let errorMsg = null;

    if (emailValue.match(regex) && !emailValue.includes(' ')) {
        response = string;
    } if (!emailValue.match(regex) || emailValue.includes(' ')) {
        errorMsg = `The email address entered isn't valid.`;
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}

// Function to validate passwords
export function validatePassword(string: string) {
    const passwordValue = string.trim();
    let response: Boolean | string = false;
    let errorMsg = null;

    if (passwordValue.length >= 8) {
        response = string;
    } if (passwordValue.length < 8) {
        errorMsg = 'Your password must be at least 8 characters long.';
    }

    let validation = {
        response: response,
        errorMsg: errorMsg
    }
    return validation;
}