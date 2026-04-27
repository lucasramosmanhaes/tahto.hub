import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserModel } from "@/model/user.model";

interface AuthState {
    user: UserModel | null;
    idTahtoJwtToken: string | null;
    isAuthenticated: boolean;
    matricula: string | null;
    password: string | null;
    setUser: (data: UserModel, matricula: string, password: string) => void;
    logoutUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            idTahtoJwtToken: null,
            isAuthenticated: false,
            matricula: null,
            password: null,
            setUser: (data, matricula, password) =>
                set({
                    user: data,
                    idTahtoJwtToken: data.Token,
                    isAuthenticated: data.Autenticado,
                    matricula: matricula,
                    password: password,
                }),
            logoutUser: () =>
                set({
                    user: null,
                    idTahtoJwtToken: null,
                    isAuthenticated: false,
                    matricula: null,
                    password: null,
                }),
        }),
        { name: "auth" } // salva no localStorage
    )
);