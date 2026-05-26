import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fetchCurrentUser, logIn, logOut, signUp } from "../lib/auth";
import type { AuthUser } from "../lib/auth";

type AuthContextValue = {
	user: AuthUser | null;
	isLoading: boolean;
	login: (payload: { email: string; password: string }) => Promise<void>;
	signup: (payload: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		fetchCurrentUser()
			.then((response) => {
				if (isMounted) {
					setUser(response.user);
				}
			})
			.catch(() => {
				if (isMounted) {
					setUser(null);
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			isLoading,
			login: async (payload) => {
				const response = await logIn(payload);
				setUser(response.user);
			},
			signup: async (payload) => {
				const response = await signUp(payload);
				setUser(response.user);
			},
			logout: async () => {
				await logOut();
				setUser(null);
			},
		}),
		[isLoading, user],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used inside AuthProvider");
	}

	return context;
}
