"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/clientApp";

export type AuthUser = {
	uid: string; 
	username: string; 
	email: string; 
	pfp: string
}

interface AuthContextType {
  authUser: AuthUser | null;
  isLoading: boolean;
	logout: () => void;
}

const AuthUserContext = createContext<AuthContextType>({
	authUser: null,
	isLoading: true,
	logout: () => {},
});



export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const clear = () => {
		setAuthUser(null);
		setIsLoading(false);
	};

	const authStateChanged = async (user: any) => {
		setIsLoading(true);
		if (!user) {
			clear();
			return;
		}
		setAuthUser({
			uid: user.uid,
			username: user.displayName,
			email: user.email,
			pfp: user.photoURL,
		})
	};

	const logout = () => signOut(auth).then(clear);

	useEffect(() => {

		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	});

	return {
		authUser,
		isLoading,
		logout,
	};
}

interface AuthUserProviderProps {
	children: ReactNode;
}

export function AuthUserProvider({ children }: AuthUserProviderProps) {
	const firebaseAuth = useFirebaseAuth();
	return (
		<AuthUserContext.Provider value={firebaseAuth}>
			{children}
		</AuthUserContext.Provider>
	);
}

export const useAuth = () => useContext(AuthUserContext);

