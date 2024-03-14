export function isStrongPassword(password: string) {
    // Initialize the result object
    const result = {
        success: true,
        message: "Password is strong.",
    };

    // Check if password is at least 10 characters long
    if (password.length < 10) {
        result.success = false;
        result.message = "Password must be at least 10 characters long.";
        return result;
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        result.success = false;
        result.message = "Password must contain at least one uppercase letter.";
        return result;
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        result.success = false;
        result.message = "Password must contain at least one lowercase letter.";
        return result;
    }

    // Check if password contains at least one number
    if (!/\d/.test(password)) {
        result.success = false;
        result.message = "Password must contain at least one number.";
        return result;
    }

    // Check if password contains at least one symbol
    if (!/[\W_]/.test(password)) {
        result.success = false;
        result.message = "Password must contain at least one symbol.";
        return result;
    }

    // If all checks pass, the password is strong
    return result;
}
