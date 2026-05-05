'use client';

import { ArrowUp, Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';

export function FloatingButton() {
    const [pos, setPos] = useState({ bottom: 44, left: 56 });
    const [dragging, setDragging] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [autoShow, setAutoShow] = useState(true);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });
    const wasDragged = useRef(false);
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
            setPos({
                left: e.clientX - offset.current.x,
                bottom: window.innerHeight - e.clientY - (40 - offset.current.y),
            });
        };
        const onMouseUp = () => setDragging(false);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragging]);

    useEffect(() => {
        const timer = setTimeout(() => setAutoShow(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        if (!wasDragged.current) {
            setOpen(true);
        }
    };

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
            <div
                ref={ref}
                onMouseDown={onMouseDown}
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{
                    position: 'fixed',
                    left: pos.left,
                    bottom: pos.bottom,
                    zIndex: 9999,
                    cursor: dragging ? 'grabbing' : 'pointer',
                    userSelect: 'none',
                }}
            >
                {Tooltip}
                <div style={{
                    width: 100,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img width={100} height={100} src="/gif/informativo2.gif" />
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-sm pt-8">
                    <DialogHeader className={"pl-5"}>
                        <DialogTitle>{t("needhelp")}</DialogTitle>
                        <DialogDescription>
                            {t("asktoai")}
                        </DialogDescription>
                    </DialogHeader>

                    {/* chat */}

                    <div className="flex flex-col gap-0">

                        {/* Textarea */}
                        <div className="px-4 py-3">
                            <Textarea placeholder="Pergunte, pesquise…" />
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-4 py-4">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-7 px-2 text-xs gap-1.5">
                                    <Paperclip className="w-3.5 h-3.5" />
                                    Anexar
                                </Button>
                            </div>
                            <Button size="icon" className="rounded-full w-8 h-8">
                                <ArrowUp className="w-4 h-4" />
                            </Button>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>
        </>
    );
}