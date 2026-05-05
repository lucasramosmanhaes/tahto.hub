'use client';

import { ArrowUp, Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// --- tipos e dados ---
type Message = { role: 'user' | 'bot'; content: string };

const QA = [
    {
        keys: ['suporte guilda', 'freshservice', 'guilda'],
        label: '📋 Suporte Guilda',
        q: 'Como abrir solicitação Suporte Guilda?',
        a: 'Desde 28/04, as demandas do Suporte Guilda devem ser feitas pelo **Freshservice**.\n\nAcesse: Solicitar um Serviço → STAFF - PERFORMANCE → Formulário Suporte Guilda.',
    },
    {
        keys: ['políticas', 'politicas', 'procedimentos'],
        label: '📄 Políticas',
        q: 'Onde ficam as políticas da empresa?',
        a: 'As políticas estão no **SharePoint**:\nhttps://oicorp.sharepoint.com/sites/0130/Governanca_de_Processo/...\n\nDúvidas: LD-ProcessosControlesAdministrativos@tahto.com.br',
    },
    {
        keys: ['dap'],
        label: '🏢 DAP',
        q: 'Como abrir solicitação para o DAP?',
        a: 'Desde 17/04/2026, pelo **Freshservice**: https://tahto.freshservice.com/support/home\n\nAtende: cadastro de terceiros, documentações, férias, pagamentos em folha, VA e VT.',
    },
    {
        keys: ['ponto', 'cartão ponto'],
        label: '⏱ Ponto',
        q: 'Onde posso ver meu ponto?',
        a: 'Acesse o **Portal de Autoatendimento**: https://gente.oi.net.br → Ponto → Cartão Ponto.\n\nSupervisores conseguem ver o ponto de toda a equipe.',
    },
    {
        keys: ['nome social', 'social'],
        label: '🏷 Nome social',
        q: 'Posso usar meu nome social?',
        a: 'Sim! A empresa reconhece o nome social de colaboradores transgêneros mediante solicitação formal ao RH.\n\n⚠️ Apelidos e nomes artísticos não são aceitos.',
    },
    {
        keys: ['poi', 'oportunidade interna', 'carreira'],
        label: '🚀 POI',
        q: 'O que é POI?',
        a: 'O **Programa de Oportunidade Interna (POI)** permite crescimento vertical e horizontal por processo seletivo ou mérito.\n\nPolítica: POL-GOG-039-REMUNERAÇÃO em tahto.com.br/regulamentações',
    },
    {
        keys: ['wellhub', 'gympass', 'academia'],
        label: '💪 Wellhub',
        q: 'O que é o Wellhub?',
        a: 'O **Wellhub** dá acesso a +24.000 academias, estúdios, terapias online e apps de saúde mental.\n\nFAQ: https://luhmus.beedoo.io/wiki/452953/wellhub-confira-o-manual-a-politica-e-a-faq',
    },
];

function findAnswer(text: string) {
    const t = text.toLowerCase();
    return QA.find(item => item.keys.some(k => t.includes(k)));
}

// --- componente principal ---
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("navSecondary");

    // drag logic
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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
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
            <svg
                viewBox="0 0 160 52"
                width="160"
                height="78"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
            >
                <path
                    d="M10,0 H150 Q160,0 160,10 V38 Q160,48 150,48 H28 L0,68 L8,48 H10 Q0,48 0,38 V10 Q0,0 10,0 Z"
                    fill="#6255f2"
                />
                <text
                    x="80"
                    y="17"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    fontWeight="600"
                    fill="#fff"
                    fontFamily="system-ui, sans-serif"
                >
                    {t("needhelp")}
                </text>
                <text
                    x="80"
                    y="32"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="#FFF9"
                    fontFamily="system-ui, sans-serif"
                >
                    {t("asktoai")}
                </text>
            </svg>
        </div>
    );

    return (
        <>
            {/* floating button */}
            <div ref={ref} onMouseDown={onMouseDown} onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}
                style={{ position: 'fixed', left: pos.left, bottom: pos.bottom, zIndex: 9999, cursor: dragging ? 'grabbing' : 'pointer', userSelect: 'none' }}>
                {Tooltip}
                <div style={{ width: 100, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img width={100} height={100} src="/gif/informativo2.gif" />
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm p-0 overflow-hidden">
                    {/* Header */}
                    <DialogHeader className="px-4 py-3 border-b bg-muted/40 flex flex-row items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#6255f2] text-white text-xs">T</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-sm font-medium leading-none">Assistente Tahto</DialogTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">Online agora</p>
                        </div>
                    </DialogHeader>

                    {/* Messages */}
                    <ScrollArea className="h-72">
                        <div ref={scrollRef} className="flex flex-col gap-3 p-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={cn('flex gap-2 items-end', msg.role === 'user' && 'flex-row-reverse')}>
                                    {msg.role === 'bot' && (
                                        <Avatar className="h-6 w-6 flex-shrink-0">
                                            <AvatarFallback className="bg-[#6255f2] text-white text-[10px]">T</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        'max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                                        msg.role === 'bot'
                                            ? 'bg-muted rounded-bl-sm'
                                            : 'bg-[#6255f2] text-white rounded-br-sm'
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {typing && (
                                <div className="flex gap-2 items-end">
                                    <Avatar className="h-6 w-6 flex-shrink-0">
                                        <AvatarFallback className="bg-[#6255f2] text-white text-[10px]">T</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">
                                        {[0, 200, 400].map(d => (
                                            <span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                                                style={{ animationDelay: `${d}ms` }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-1.5 px-4 py-2 border-t bg-muted/20">
                        {QA.map(item => (
                            <Badge key={item.label} variant="outline"
                                className="cursor-pointer hover:bg-muted text-xs font-normal"
                                onClick={() => sendMessage(item.q)}>
                                {item.label}
                            </Badge>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 px-3 py-3 border-t">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs gap-1.5 flex-shrink-0">
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
                        <Button size="icon" className="rounded-full w-8 h-8 flex-shrink-0 bg-[#6255f2] hover:bg-[#4e43d4]"
                            onClick={() => sendMessage(input)}>
                            <ArrowUp className="w-4 h-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}