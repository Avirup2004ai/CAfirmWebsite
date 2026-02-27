/**
 * Frontend form security utilities.
 * These provide client-side protection layers; real security
 * requires server-side validation when a backend is added.
 */

// ─── Input Sanitization ───────────────────────────────────────

const DANGEROUS_PATTERNS = [
    /<script\b[^>]*>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,              // onclick=, onerror=, etc.
    /data:\s*text\/html/gi,
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
];

/** Strip HTML tags and dangerous patterns from user input */
export function sanitize(input: string): string {
    let clean = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");

    for (const pattern of DANGEROUS_PATTERNS) {
        clean = clean.replace(pattern, "");
    }

    return clean.trim();
}

/** Validate email format */
export function isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/** Validate Indian phone format (optional +91) */
export function isValidPhone(phone: string): boolean {
    if (!phone) return true; // phone is optional
    const cleaned = phone.replace(/[\s\-().]/g, "");
    return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
}

/** Check max length to prevent excessively long input */
export function checkLength(input: string, max: number): boolean {
    return input.length <= max;
}

// ─── Rate Limiting (Client-Side) ──────────────────────────────

const submissionTimestamps: Map<string, number[]> = new Map();

/** Client-side rate limit: max N submissions per window (ms) */
export function canSubmit(
    formId: string,
    maxSubmissions = 3,
    windowMs = 60_000
): boolean {
    const now = Date.now();
    const timestamps = submissionTimestamps.get(formId) || [];

    // Remove old timestamps outside the window
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= maxSubmissions) {
        return false;
    }

    recent.push(now);
    submissionTimestamps.set(formId, recent);
    return true;
}

/** Check if rate limited (without recording a submission) */
export function isRateLimited(
    formId: string,
    maxSubmissions = 3,
    windowMs = 60_000
): boolean {
    const now = Date.now();
    const timestamps = submissionTimestamps.get(formId) || [];
    const recent = timestamps.filter((t) => now - t < windowMs);
    return recent.length >= maxSubmissions;
}

// ─── Honeypot Check ───────────────────────────────────────────

/** Returns true if honeypot field is filled (indicates bot) */
export function isBot(formElement: HTMLFormElement): boolean {
    const honeypot = formElement.querySelector<HTMLInputElement>(
        'input[name="website"], input[name="_hp_field"]'
    );
    return !!honeypot?.value;
}

// ─── Validation Result Type ───────────────────────────────────

export interface ValidationError {
    field: string;
    message: string;
}

export function validateContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: "name", message: "Name must be at least 2 characters." });
    }
    if (!checkLength(data.name || "", 100)) {
        errors.push({ field: "name", message: "Name is too long (max 100 characters)." });
    }
    if (!data.email || !isValidEmail(data.email)) {
        errors.push({ field: "email", message: "Please enter a valid email address." });
    }
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push({ field: "phone", message: "Please enter a valid Indian phone number." });
    }
    if (data.message && !checkLength(data.message, 5000)) {
        errors.push({ field: "message", message: "Message is too long (max 5000 characters)." });
    }
    if (!data.message || data.message.trim().length < 10) {
        errors.push({ field: "message", message: "Message must be at least 10 characters." });
    }

    return errors;
}
