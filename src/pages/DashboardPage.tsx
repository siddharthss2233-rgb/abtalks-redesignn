import { Link } from 'react-router-dom';
import {
  Sparkles, Flame, Clock, Trophy, TrendingUp, Play, ArrowRight,
  Bookmark, Zap, Target, Award, Calendar,
} from 'lucide-react';
import {
  courses, userProgress, getCourseById, aiRecommendations,
  certificates, currentUser,
} from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import ContinueWatchingCard from '@/components/ContinueWatchingCard';
import CertificateCard from '@/components/CertificateCard';
import SectionHeader from '@/components/SectionHeader';

export default function DashboardPage() {
  const inProgressCourses = userProgress
    .filter((p) => p.completedLessons < p.totalLessons)
    .map((p) => getCourseById(p.courseId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const totalLessons = userProgress.reduce((acc, p) => acc + p.totalLessons, 0);
  const completedLessons = userProgress.reduce((acc, p) => acc + p.completedLessons, 0);
  const overallPct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="pt-24 pb-12 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-up">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-400/30" />
            <div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Welcome back,</p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {currentUser.name} 👋
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{currentUser.streak} day streak</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock, label: 'Watch Time', value: currentUser.totalWatchTime, color: 'from-blue-500 to-indigo-600' },
            { icon: Trophy, label: 'Certificates', value: String(certificates.length), color: 'from-amber-500 to-orange-600' },
            { icon: Target, label: 'In Progress', value: String(inProgressCourses.length), color: 'from-brand-500 to-purple-600' },
            { icon: TrendingUp, label: 'Overall Progress', value: `${overallPct}%`, color: 'from-emerald-500 to-teal-600' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 animate-fade-up card-hover"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Continue Watching */}
        <section className="mb-12">
          <SectionHeader
            title="Continue Watching"
            subtitle="Pick up right where you left off"
            icon={<Play className="w-6 h-6 text-brand-500" />}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {inProgressCourses.map((course, i) => (
              <ContinueWatchingCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-12">
          <SectionHeader
            title="AI Picks for You"
            subtitle="Because you watched similar content"
            icon={<Sparkles className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'More' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiRecommendations.map((rec, i) => {
              const course = getCourseById(rec.courseId);
              if (!course) return null;
              return (
                <Link
                  key={rec.courseId}
                  to={`/talk/${course.id}`}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="card-hover relative overflow-hidden rounded-2xl border h-full" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div className="relative h-28 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-50 mix-blend-multiply`} />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold gradient-brand text-white">
                        {rec.match}%
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 text-brand-500" />
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{rec.reason}</p>
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {course.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Learning Progress + Certificates */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Progress */}
          <div className="lg:col-span-2">
            <SectionHeader
              title="Learning Progress"
              subtitle="Your journey across all courses"
              icon={<TrendingUp className="w-6 h-6 text-brand-500" />}
            />
            <div className="glass rounded-2xl p-6 space-y-4">
              {/* Overall progress ring */}
              <div className="flex items-center gap-6 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" stroke="var(--bg-sunken)" />
                    <circle
                      cx="50" cy="50" r="42" fill="none" strokeWidth="8" stroke="url(#progressGrad)"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallPct / 100)}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{overallPct}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Overall completion</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{completedLessons} / {totalLessons} lessons</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Keep going — you are doing great!</p>
                </div>
              </div>

              {/* Per-course progress */}
              <div className="space-y-3">
                {userProgress.map((p) => {
                  const course = getCourseById(p.courseId);
                  if (!course) return null;
                  const pct = Math.round((p.completedLessons / p.totalLessons) * 100);
                  return (
                    <Link key={p.courseId} to={`/talk/${course.id}`} className="block group">
                      <div className="flex items-center gap-3">
                        <img src={course.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                              {course.title}
                            </p>
                            <span className="text-xs font-semibold text-brand-500 ml-2 shrink-0">{pct}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
                            <div className="h-full gradient-brand rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div>
            <SectionHeader
              title="Certificates"
              icon={<Award className="w-6 h-6 text-brand-500" />}
              link={{ to: '/profile', label: 'All' }}
            />
            <div className="space-y-4">
              {certificates.map((cert, i) => (
                <CertificateCard key={cert.id} cert={cert} index={i} />
              ))}
              {certificates.length === 0 && (
                <div className="glass rounded-2xl p-6 text-center">
                  <Trophy className="w-10 h-10 mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Complete a course to earn your first certificate!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <section>
          <SectionHeader
            title="You Might Also Like"
            subtitle="More talks to fuel your curiosity"
            icon={<Zap className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'Browse all' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(4).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
