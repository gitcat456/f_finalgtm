/**
 * Validation & Input Sanitization Utilities
 */

/**
 * Sanitize contact phone number in real-time.
 * - Allows only digits and a single leading '+' at index 0.
 * - Disallows letters, spaces, and unsupported special characters.
 * - Enforces maximum length of 13 characters (+ plus up to 12 digits).
 */
export const sanitizePhoneNumberInput = (rawVal) => {
  if (!rawVal) return '';
  let val = String(rawVal);

  const hasPlus = val.startsWith('+');
  const digitsOnly = val.replace(/[^0-9]/g, '');

  if (hasPlus) {
    return ('+' + digitsOnly).slice(0, 13);
  }
  return digitsOnly.slice(0, 12);
};

/**
 * Validate phone number format (e.g. +254712345678).
 */
export const validatePhoneNumber = (phone) => {
  if (!phone?.trim()) return { isValid: true, error: null };

  const value = phone.trim();

  if (!value.startsWith("+")) {
    return { isValid: false, error: "Phone number must start with '+'." };
  }

  if (!/^\+[\d ]+$/.test(value)) {
    return {
      isValid: false,
      error: "Only digits and spaces are allowed after '+'.",
    };
  }

  const normalized = value.replace(/\s/g, "");

  if (normalized.length !== 13) {
    return {
      isValid: false,
      error: "Phone number must be exactly 12 digits after '+'.",
    };
  }

  if ((value.match(/ /g) || []).length > 3) {
    return {
      isValid: false,
      error: "Phone number can contain at most 3 spaces.",
    };
  }

  return {
    isValid: true,
    error: null,
    normalized,
  };
};

/**
 * Sanitize Pastor Name in real-time.
 * Allows only letters, spaces, hyphens, and apostrophes.
 * Disallows numbers and special characters.
 */
export const sanitizeNameInput = (rawVal) => {
  if (!rawVal) return '';
  return String(rawVal).replace(/[^a-zA-Z\s'-]/g, '').slice(0, 80);
};

/**
 * Sanitize general text inputs.
 */
export const sanitizeInput = (val) => {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '');
};
