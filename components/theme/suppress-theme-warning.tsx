'use client';

import { useEffect } from 'react';

export function SuppressThemeWarning() {
    useEffect(() => {
        const original = console.error;
        console.error = (...args: unknown[]) => {
            if (typeof args[0] === 'string' && args[0].includes('script tag')) return;
            original(...args);
        };
        return () => { console.error = original; };
    }, []);
    return null;
}