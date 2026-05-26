export type AuthUser = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	name: string;
};

type AuthResponse = {
	user: AuthUser | null;
	error?: string;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";
const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL ?? `${apiBaseUrl}/api/auth/google/`;

async function parseAuthResponse(response: Response): Promise<AuthResponse> {
	const payload = (await response.json()) as AuthResponse;

	if (!response.ok) {
		throw new Error(payload.error || "Authentication request failed.");
	}

	return payload;
}

export async function fetchCurrentUser() {
	const response = await fetch(`${apiBaseUrl}/api/auth/me/`, {
		credentials: "include",
	});

	return parseAuthResponse(response);
}

export async function signUp(payload: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) {
	const response = await fetch(`${apiBaseUrl}/api/auth/signup/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(payload),
	});

	return parseAuthResponse(response);
}

export async function logIn(payload: { email: string; password: string }) {
	const response = await fetch(`${apiBaseUrl}/api/auth/login/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(payload),
	});

	return parseAuthResponse(response);
}

export async function logOut() {
	const response = await fetch(`${apiBaseUrl}/api/auth/logout/`, {
		method: "POST",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Could not sign out.");
	}
}

export function continueWithGoogle(redirectTo = "/profile") {
	const url = new URL(googleAuthUrl, window.location.origin);
	url.searchParams.set("next", redirectTo);
	window.location.assign(url.toString());
}
