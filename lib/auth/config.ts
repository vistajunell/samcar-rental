/**
 * Auth-related constants. Edge-compatible (no Node-only imports).
 */
export const SESSION_COOKIE_NAME = "samcar-session";

/* Session TTL — 7 days in seconds */
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export const JWT_ALGORITHM = "HS256" as const;
