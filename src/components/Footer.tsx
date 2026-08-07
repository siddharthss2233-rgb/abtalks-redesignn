import { Link } from 'react-router-dom';
import { Mic, Globe, Mail, Rss, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-elevated)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                AB<span className="gradient-text">Talks</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Learn from the world's best minds. Bite-sized talks, deep courses, and AI-powered recommendations.
            </p>
            <div className="flex gap-3 mt-4">
              {[Globe, Mail, Rss, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors hover:border-brand-400/50 hover:text-brand-500"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Learn', links: ['Explore', 'Categories', 'Speakers', 'Learning Paths'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
            { title: 'Support', links: ['Help Center', 'Contact', 'Privacy', 'Terms'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-brand-500" style={{ color: 'var(--text-secondary)' }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © 2026 ABTalks. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Crafted with care for lifelong learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
