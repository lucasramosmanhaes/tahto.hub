import { toast } from "sonner";

export class GuildaGameLoginUseCase {
    async handle(username: string, password: string) {

        const guildaUrl = process.env.NEXT_PUBLIC_GUILDA_BACK_URL;

        if(!guildaUrl){
            console.log("[error] - inicializar variável de ambiente: NEXT_PUBLIC_GUILDAURL")
            return
        }

        const response = await fetch(`${guildaUrl}/Authentication`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            Username: username.toUpperCase(),
            Password: password,
            }),
        });
    
        if (!response.ok) {
            toast.error("Erro ao autenticar na Guilda");
        }
    
        const data = await response.json();
    
        if (data?.token) {
            // salva token (mesmo domínio)
            document.cookie = `jwtToken=${data.token}; path=/`;
    
            // opcional Guilda
            document.cookie = `firstLogin=${JSON.stringify(
            data.fisrtLogin || ""
            )}; path=/;`;
        }
    
        return data;
    }
}