// Утилиты для валидации на фронтенде

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 8) {
    return { valid: false, error: 'Пароль должен содержать минимум 8 символов' };
  }

  if (password.length > 128) {
    return { valid: false, error: 'Пароль слишком длинный (максимум 128 символов)' };
  }

  const hasUpper = /[A-ZА-Я]/.test(password);
  const hasLower = /[a-zа-я]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpper) {
    return { valid: false, error: 'Пароль должен содержать хотя бы одну заглавную букву' };
  }
  if (!hasLower) {
    return { valid: false, error: 'Пароль должен содержать хотя бы одну строчную букву' };
  }
  if (!hasNumber) {
    return { valid: false, error: 'Пароль должен содержать хотя бы одну цифру' };
  }
  if (!hasSpecial) {
    return { valid: false, error: 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&* и т.д.)' };
  }

  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; error?: string } => {
  const trimmed = username.trim();
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'Имя пользователя должно содержать минимум 3 символа' };
  }

  if (trimmed.length > 30) {
    return { valid: false, error: 'Имя пользователя слишком длинное (максимум 30 символов)' };
  }

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(trimmed)) {
    return { valid: false, error: 'Имя пользователя может содержать только буквы, цифры, подчеркивания и дефисы' };
  }

  return { valid: true };
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (email === '') {
    return { valid: true }; // Email опционален
  }

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Неверный формат email' };
  }

  return { valid: true };
};

