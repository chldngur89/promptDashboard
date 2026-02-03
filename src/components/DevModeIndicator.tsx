import React from 'react';

export function DevModeIndicator() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const hasSupabase = !!import.meta.env?.VITE_SUPABASE_URL;
  
  return (
    <div className="fixed bottom-2 right-2 z-50 px-3 py-1.5 rounded-full text-xs font-mono bg-sidebar border border-border shadow-sm">
      <span className={isLocal ? 'text-green-600' : 'text-blue-600'}>
        {isLocal ? '📍 LOCAL' : '🌐 PROD'}
      </span>
      <span className="mx-2 text-muted-foreground">|</span>
      <span className={hasSupabase ? 'text-green-600' : 'text-orange-500'}>
        {hasSupabase ? 'SUPABASE' : 'LOCALSTORAGE'}
      </span>
    </div>
  );
}
