import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserModel } from "@/model/user.model";

interface AuthState {
    user: UserModel | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (data: UserModel) => void;
    logoutUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setUser: (data) =>
                set({
                    user: data,
                    token: data.Token,
                    isAuthenticated: data.Autenticado,
                }),
            logoutUser: () =>
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                }),
        }),
        { name: "auth" } // salva no localStorage
    )
);