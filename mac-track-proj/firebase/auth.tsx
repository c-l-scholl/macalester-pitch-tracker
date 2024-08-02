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
  isAuthLoading: boolean;
	logout: () => void;
}

const AuthUserContext = createContext<AuthContextType>({
	authUser: null,
	isAuthLoading: true,
	logout: () => {},
});



export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

	const clear = () => {
		setAuthUser(null);
		setIsAuthLoading(false);
	};

	const authStateChanged = async (user: any) => {
		setIsAuthLoading(true);
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
		setIsAuthLoading(false);
	};

	const logout = () => signOut(auth).then(clear);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, authStateChanged);
		return () => unsubscribe();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		authUser,
		isAuthLoading,
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

