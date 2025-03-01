import { createObservable } from "../src";

interface FormState {
    username: string;
    email: string;
    password: string;
    errors: {
        username?: string;
        email?: string;
        password?: string;
    };
}

const formState: FormState = {
    username: "",
    email: "",
    password: "",
    errors: {},
};

// validation functions
function validateUsername(username: string): string | undefined {
    if (username.length < 3) {
        return "Username must be at least 3 characters";
    }
    return undefined;
}

function validateEmail(email: string): string | undefined {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }
    return undefined;
}

function validatePassword(password: string): string | undefined {
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    return undefined;
}

// observer that performs validation
function formObserver(event: any) {
    if (event.type === "set") {
        const path = event.path;
        const newValue = event.newValue;

        if (path === "username") {
            formState.errors.username = validateUsername(newValue);
        } else if (path === "email") {
            formState.errors.email = validateEmail(newValue);
        } else if (path === "password") {
            formState.errors.password = validatePassword(newValue);
        }

        const pathError = formState.errors[path as keyof typeof formState.errors];
        if (pathError) {
            console.log(
                `Error: Field "${path}" not changed to "${newValue}", because ${pathError}`
            );
        } else {
            console.log(`Success: Field "${path}" changed to ${newValue}`);
        }
    }
}

const form = createObservable(formState, formObserver);

// invalid cases
form.username = "no";
form.email = "invalid-email";
form.password = "pass";

// valid cases
form.username = "Ma'ruf";
form.email = "john@example.com";
form.password = "securePassword123";
