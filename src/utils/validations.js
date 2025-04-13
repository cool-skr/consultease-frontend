export const validatePassword = (password, setPasswordError) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!minLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character');
      return false;
    }
    setPasswordError('');
    return true;
};

export const validateConfirmPassword = (confirmPassword, password, setConfirmPasswordError) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
};