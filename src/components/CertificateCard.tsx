import { Link } from 'react-router-dom';
import { Award, Download, Share2 } from 'lucide-react';
import type { Certificate } from '@/data/courses';

export default function CertificateCard({ cert, index = 0 }: { cert: Certificate; index?: number }) {
  return (
    <div
      className="card-hover relative overflow-hidden rounded-2xl border animate-fade-up group"
      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', animationDelay: `${index * 0.08}s` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-full blur-2xl" />
      <div className="relative p-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/30">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-brand-500 mb-1">Certificate of Completion</p>
            <h3 className="font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              {cert.courseTitle}
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              by {cert.speakerName}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Completed</p>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{cert.completedDate}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>ID</p>
            <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-secondary)' }}>{cert.certificateId}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/talk/${cert.courseId}`}
            className="flex-1 text-center text-sm font-medium py-2 rounded-lg border transition-colors hover:border-brand-400/50 hover:text-brand-500"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            View Course
          </Link>
          <button className="p-2 rounded-lg border transition-colors hover:border-brand-400/50 hover:text-brand-500" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border transition-colors hover:border-brand-400/50 hover:text-brand-500" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
