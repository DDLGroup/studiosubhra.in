import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks.
 * Used primarily for the contact form.
 */
export const sanitizeInput = (dirty) => {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone) => {
  const re = /^[+]?[0-9\s-]{10,15}$/;
  return re.test(phone);
};

/**
 * Encode email to prevent scraping
 */
export const encodeEmail = (email) => {
  return email
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('');
};

/**
 * Rate limiting for form submissions
 */
const submissionTimestamps = [];
export const isRateLimited = (maxSubmissions = 3, windowMs = 60000) => {
  const now = Date.now();
  const recentSubmissions = submissionTimestamps.filter(
    (ts) => now - ts < windowMs
  );
  if (recentSubmissions.length >= maxSubmissions) return true;
  submissionTimestamps.push(now);
  return false;
};
