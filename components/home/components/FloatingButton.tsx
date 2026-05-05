'use client';

import { ArrowUp, Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Message = { role: 'user' | 'bot'; content: string };

const QA = [
    {
        keys: ['suporte guilda', 'freshservice', 'guilda'],
        label: '📋 Suporte Guilda',
        q: 'Como abrir solicitação Suporte Guilda?',
        a: 'Desde o dia 28/04, as demandas relacionadas ao Suporte Guilda devem ser realizadas pela ferramenta Freshservice. \n\nPara abrir uma solicitação, acesse a Página Inicial no Freshservice e siga o caminho: \nSolicitar um Serviço > STAFF - PERFORMANCE > Formulário Suporte Guilda.',
    },
    {
        keys: ['políticas', 'politicas', 'procedimentos'],
        label: '📄 Políticas',
        q: 'Onde ficam as políticas da empresa?',
        a: 'As políticas e procedimentos estão disponíveis no SharePoint pelo link: \nhttps://oicorp.sharepoint.com/sites/0130/Governanca_de_Processo/11%20Polticas%20da%20CIA/Forms/AllItems.aspx \n\nEm caso de dúvida, entre em contato pelo e-mail: \nLD-ProcessosControlesAdministrativos@tahto.com.br.',
    },
    {
        keys: ['dap'],
        label: '🏢 DAP',
        q: 'Como abrir solicitação para o DAP?',
        a: 'Desde 17/04/2026, todas as novas solicitações ao DAP devem ser abertas exclusivamente pelo portal Freshservice: \nhttps://tahto.freshservice.com/support/home \n\nAs solicitações incluem temas como cadastro ou migração de terceiros, documentações jurídicas e medidas disciplinares, processos trabalhistas, férias (exceções e informações), pagamentos ou descontos em folha e pagamento de benefícios como VA e VT.',
    },
    {
        keys: ['ponto', 'cartão ponto'],
        label: '⏱ Ponto',
        q: 'Onde posso ver meu ponto?',
        a: 'Acesse o Portal de Autoatendimento: \nhttps://gente.oi.net.br → Ponto → Cartão Ponto.\n\nSupervisores conseguem ver o ponto de toda a equipe.',
    },
    {
        keys: ['nome social', 'social'],
        label: '🏷 Nome social',
        q: 'Posso usar meu nome social?',
        a: 'A empresa reconhecerá para fins de identificação (crachá), no e-mail, sistemas internos, cartões de visita etc., o nome social das pessoas empregadas transgêneros que solicitarem formalmente ao RH a sua preferência pela identificação; \n\n⚠️Não será aceita a utilização de apelidos, nomes artísticos, abreviações etc. \n\n⚠️As alterações relativas ao cadastro do colaborador na empresa serão realizadas mediante a apresentação de documento oficial realizada nos principais órgãos públicos.',
    },
    {
        keys: ['poi', 'oportunidade interna', 'carreira'],
        label: '🚀 POI',
        q: 'O que é POI?',
        a: 'A Tahto acredita que a valorização do capital humano está diretamente ligada na criação de oportunidades aos seus colaboradores. Para isso, temos o Programa de Oportunidade Interna (POI), que possibilita ao colaborador, desde que atenda as primícias necessárias a oportunidade de crescimento em sua carreira, e a Tahto pode em conjunto descobrir e desenvolver grandes talentos; \n\nAqui, é possível o crescimento de forma vertical, horizontal, e as promoções acontecem por meio de processo seletivo e também, por mérito; \n\nPara mais informações, consulte a política de regulamentação, POL-GOG-039-REMUNERAÇÃO disponível em: \nhttps://tahto.com.br/regulamentacoes',
    },
    {
        keys: ['wellhub', 'gympass', 'academia'],
        label: '💪 Wellhub',
        q: 'O que é o Wellhub?',
        a: 'Wellhub é uma plataforma de bem-estar que oferece acesso a uma rede de academias, estúdios e outros locais de atividade física a partir de um único plano mensal. Atualmente, a rede Wellhub (Gympass) possui mais de 24.000 locais de atividade física no Brasil e em outros países. A assinatura do Wellhub permite aos usuários frequentar diversos locais conforme o seu plano, sem a necessidade de mensalidades individuais para cada local. Além disso, conta com terapias online e aplicativos de saúde mental. \n\nPara adesão, leia a política e FAQ disponibilizadas na Luhmus através do link: Wellhub: \nhttps://luhmus.beedoo.io/wiki/452953/wellhub-confira-o-manual-a-politica-e-a-faq',
    },
];

function findAnswer(text: string) {
    const t = text.toLowerCase();
    return QA.find(item => item.keys.some(k => t.includes(k)));
}

function renderWithLinks(text: string, isUser: boolean) {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);

    return parts.map((part, i) =>
        /^https?:\/\//.test(part)
            ? React.createElement('a', {
                key: i,
                href: part,
                target: '_blank',
                rel: 'noopener noreferrer',
                style: {
                    color: isUser ? '#c4beff' : '#6255f2',
                    textDecoration: 'underline',
                    wordBreak: 'break-all',
                },
            }, part)
            : React.createElement('span', { key: i }, part)
    );
}

function BotAvatar({ size = 40, gif }: { size?: number; gif: number }) {
    const [error, setError] = useState(false);

    const cls = `rounded-full bg-[#6255f2] flex items-center justify-center text-white font-medium`;

    if (error) {
        return (
            <div
                className={cls}
                style={{ width: size, height: size, fontSize: size * 0.3 }}
            >
                T
            </div>
        );
    }

    return (
        <img
            src={gif === 1 ? "/gif/informativo.gif" : "/gif/maroto.gif"}
            alt="Assistente Tahto"
            width={size}
            height={size}
            onError={() => setError(true)}
        />
    );
}

export function FloatingButton() {
    const [pos, setPos] = useState({ bottom: 44, left: 56 });
    const [dragging, setDragging] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [autoShow, setAutoShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Olá! Sou o assistente da Tahto. Selecione uma dúvida ou escreva sua pergunta.' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });
    const wasDragged = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("navSecondary");

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        wasDragged.current = false;
        setDragging(true);
        const rect = ref.current.getBoundingClientRect();
        offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        e.preventDefault();
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!dragging) return;
            wasDragged.current = true;
            setPos({ left: e.clientX - offset.current.x, bottom: window.innerHeight - e.clientY - (40 - offset.current.y) });
        };
        const onMouseUp = () => setDragging(false);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
    }, [dragging]);

    useEffect(() => {
        const timer = setTimeout(() => setAutoShow(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // auto-scroll correto: rola até o elemento sentinela no final
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setInput('');
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            const found = findAnswer(text);
            const answer = found?.a ?? 'Não encontrei uma resposta. Tente reformular ou consulte o RH.';
            setMessages(prev => [...prev, { role: 'bot', content: answer }]);
        }, 900);
    };

    const handleClick = () => { if (!wasDragged.current) setOpen(true); };
    const tooltipVisible = (autoShow || showTooltip) && !dragging;

    const Tooltip = (
        <div style={{
            position: 'absolute',
            bottom: 58,
            left: 70,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
            transition: 'opacity 0.2s ease',
            opacity: tooltipVisible ? 1 : 0,
        }}>
            <svg viewBox="0 0 160 52" width="160" height="78" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <path d="M10,0 H150 Q160,0 160,10 V38 Q160,48 150,48 H28 L0,68 L8,48 H10 Q0,48 0,38 V10 Q0,0 10,0 Z" fill="#6255f2" />
                <text x="80" y="17" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="600" fill="#fff" fontFamily="system-ui, sans-serif">{t("needhelp")}</text>
                <text x="80" y="32" textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#FFF9" fontFamily="system-ui, sans-serif">{t("asktoai")}</text>
            </svg>
        </div>
    );

    return (
        <>
            <div ref={ref} onMouseDown={onMouseDown} onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}
                style={{ position: 'fixed', left: pos.left, bottom: pos.bottom, zIndex: 9999, cursor: dragging ? 'grabbing' : 'pointer', userSelect: 'none' }}>
                {Tooltip}
                <div style={{ width: 100, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={100} height={100} src="/gif/informativo2.gif" />
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">

                    {/* Header */}
                    <DialogHeader className="px-4 py-3 border-b bg-muted/40 !flex !flex-row !items-center gap-3">
                        <div className="shrink-0">
                            <BotAvatar size={56} gif={1}/>
                        </div>
                        <div>
                            <DialogTitle className="text-sm font-medium leading-none">Tahto AI</DialogTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">Online agora</p>
                        </div>
                    </DialogHeader>

                    {/* Messages */}
                    <div className="h-72 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn('flex gap-2 items-end', msg.role === 'user' && 'flex-row-reverse')}>
                                {msg.role === 'bot' && (
                                    <div className="shrink-0">
                                        <BotAvatar size={50} gif={2} />
                                    </div>
                                )}
                            <div className={cn(
                                'max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line',
                                msg.role === 'bot' ? 'bg-muted rounded-bl-sm' : 'bg-[#6255f2] text-white rounded-br-sm'
                            )}>
                                {renderWithLinks(msg.content, msg.role === 'user')}
                            </div>
                                </div>
                            ))}

                        {typing && (
                            <div className="flex gap-2 items-end">
                                <div className="shrink-0">
                                    <BotAvatar size={40} gif={2} />
                                </div>
                                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
                                    {[0, 200, 400].map(d => (
                                        <span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                                            style={{ animationDelay: `${d}ms` }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* sentinela para o auto-scroll */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-1.5 px-4 pt-4 border-t bg-muted/20">
                        {QA.map(item => (
                            <Badge key={item.label} variant="outline"
                                className="cursor-pointer hover:bg-muted text-xs font-normal px-3 py-4"
                                onClick={() => sendMessage(item.q)}>
                                {item.label}
                            </Badge>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-3 py-3 border-t">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-3 text-xs gap-1.5 shrink-0"
                        >
                            <Paperclip className="w-3.5 h-3.5" />
                            Anexar
                        </Button>
                        <Textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                            placeholder="Pergunte, pesquise…"
                            className="min-h-[36px] max-h-20 text-sm resize-none flex-1"
                            rows={1}
                        />
                        <Button
                            size="icon"
                            className="h-9 w-9 shrink-0 rounded-full bg-[#6255f2] hover:bg-[#4e43d4]"
                            onClick={() => sendMessage(input)}
                        >
                            <ArrowUp className="w-4 h-4" />
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}