import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
  icon?: ReactNode;
}

export default function SectionHeader({ title, subtitle, link, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          to={link.to}
          className="flex items-center gap-1 text-sm font-medium text-brand-500 hover:gap-2 transition-all whitespace-nowrap shrink-0"
        >
          {link.label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
