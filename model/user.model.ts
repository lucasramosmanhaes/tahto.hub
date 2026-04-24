export interface UserClaims {
    iss: string;
    aud: string[];
    jti: string;
    iat: { date: string; timezone_type: number; timezone: string };
    nbf: { date: string; timezone_type: number; timezone: string };
    exp: { date: string; timezone_type: number; timezone: string };
    uid: string;
    roles: {
        admin: number;
        suporte: number;
        cargo: string;
    };
}

export interface UserModel {
    Autenticado: boolean;
    Resultado: string;
    Erro: string;
    Token: string;
    Claims: UserClaims;
    alerta: string;
    senha_expira_em: number;
}