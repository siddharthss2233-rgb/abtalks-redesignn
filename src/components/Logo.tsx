import { Mic, Sparkles } from 'lucide-react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-12 h-12' };
  const iconSize = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-7 h-7' };
  const textSize = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' };

  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${dims[size]} rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30`}>
        <Mic className={`${iconSize[size]} text-white`} strokeWidth={2.5} />
        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-400 fill-amber-400" />
      </div>
      <span className={`${textSize[size]} font-bold tracking-tight`} style={{ color: 'var(--text-primary)' }}>
        AB<span className="gradient-text">Talks</span>
      </span>
    </div>
  );
}
