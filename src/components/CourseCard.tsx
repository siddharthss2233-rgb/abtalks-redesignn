import { Link } from 'react-router-dom';
import { Star, Clock, Users, PlayCircle, Bookmark, TrendingUp, Sparkles } from 'lucide-react';
import type { Course } from '@/data/courses';
import { getProgressForCourse } from '@/data/courses';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  index?: number;
}

export default function CourseCard({ course, showProgress = false, index = 0 }: CourseCardProps) {
  const progress = getProgressForCourse(course.id);
  const pct = progress ? Math.round((progress.completedLessons / progress.totalLessons) * 100) : 0;

  return (
    <Link
      to={`/talk/${course.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div
        className="card-hover relative overflow-hidden rounded-2xl border h-full"
        style={{
          background: 'var(--bg-elevated)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-60 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-1.5">
            {course.trending && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-orange-500/90 text-white backdrop-blur-sm">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
            {course.new && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
                <Sparkles className="w-3 h-3" /> New
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-black/40 text-white backdrop-blur-sm">
              {course.level}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-xs font-medium glass text-white">
              {course.category}
            </span>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
              {course.title}
            </h3>
            <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
              {course.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img src={course.speaker.avatar} alt={course.speaker.name} className="w-6 h-6 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{course.speaker.name}</p>
              <p className="text-[11px] truncate" style={{ color: 'var(--text-tertiary)' }}>{course.speaker.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{course.rating}</span>
              <span>({course.reviews.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {(course.students / 1000).toFixed(1)}k
            </span>
          </div>

          {showProgress && progress && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--text-tertiary)' }}>{progress.completedLessons} of {progress.totalLessons} lessons</span>
                <span className="font-semibold text-brand-500">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
                <div className="h-full gradient-brand rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
