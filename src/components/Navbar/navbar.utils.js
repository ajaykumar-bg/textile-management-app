/**
 * Generate user initials from full name
 * @param {string} name - Full name of the user
 * @returns {string} - User initials (max 2 characters)
 */
export const getUserInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};
