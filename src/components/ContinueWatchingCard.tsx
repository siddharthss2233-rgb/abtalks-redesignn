import { Link } from 'react-router-dom';
import { PlayCircle, Clock } from 'lucide-react';
import type { Course } from '@/data/courses';
import { getProgressForCourse } from '@/data/courses';

export default function ContinueWatchingCard({ course }: { course: Course }) {
  const progress = getProgressForCourse(course.id);
  if (!progress) return null;
  const pct = Math.round((progress.completedLessons / progress.totalLessons) * 100);
  const nextLesson = course.lessons[progress.completedLessons] ?? course.lessons[0];

  return (
    <Link to={`/talk/${course.id}`} className="group block animate-fade-up">
      <div
        className="card-hover relative overflow-hidden rounded-2xl border flex flex-col sm:flex-row"
        style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}
      >
        <div className="relative sm:w-48 h-36 sm:h-auto shrink-0 overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-50 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 sm:to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlayCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 min-w-0">
          <span className="text-xs font-medium text-brand-500">{course.category}</span>
          <h3 className="font-semibold mt-1 line-clamp-1 group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
            {course.title}
          </h3>
          <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
            Up next: {nextLesson?.title}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {nextLesson?.duration} min
            </span>
            <span>•</span>
            <span>{progress.lastWatched}</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: 'var(--text-tertiary)' }}>{progress.completedLessons}/{progress.totalLessons} lessons</span>
              <span className="font-semibold text-brand-500">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
              <div className="h-full gradient-brand rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
