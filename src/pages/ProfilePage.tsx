import { Link } from 'react-router-dom';
import {
    Flame,
  Clock,
  Trophy,
  TrendingUp,
  Award,
  Bookmark,
  Settings,
  Mail,
  Calendar,
  Edit3,
  Flame as FlameIcon,
  Anchor,
  Crown,
  Compass,
  Moon,
  GraduationCap,
  Code2,
  BriefcaseBusiness,
  ExternalLink,
} from 'lucide-react';
import {
  currentUser, certificates, userProgress, getCourseById, courses,
} from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import CertificateCard from '@/components/CertificateCard';
import SectionHeader from '@/components/SectionHeader';

const achievementIcons: Record<string, typeof Flame> = {
  flame: FlameIcon, anchor: Anchor, crown: Crown,
  compass: Compass, moon: Moon, graduation: GraduationCap,
};

export default function ProfilePage() {
  const bookmarkedCourses = userProgress
    .filter((p) => p.bookmarked)
    .map((p) => getCourseById(p.courseId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const completedCourses = userProgress
    .filter((p) => p.completedLessons === p.totalLessons)
    .map((p) => getCourseById(p.courseId))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const totalLessons = userProgress.reduce((acc, p) => acc + p.totalLessons, 0);
  const completedLessons = userProgress.reduce((acc, p) => acc + p.completedLessons, 0);
  const overallPct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="pt-24 pb-12 mesh-bg min-h-screen">
      {/* Cover + Avatar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden mb-6 animate-fade-up">
          <div className="h-40 sm:h-56 gradient-brand relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-4 right-4">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-white text-sm font-medium hover:scale-105 transition-transform">
                <Edit3 className="w-4 h-4" /> Edit Cover
              </button>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 -mt-12 sm:-mt-14 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 shadow-xl"
                style={{ '--tw-ring-color': 'var(--bg-base)' } as React.CSSProperties}
              />
              <div className="flex-1 sm:pb-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {currentUser.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentUser.email}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {currentUser.joinedDate}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium transition-colors hover:border-brand-400/50" style={{ color: 'var(--text-primary)' }}>
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
            <p className="mt-4 text-sm max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Flame, label: 'Day Streak', value: String(currentUser.streak), color: 'from-orange-500 to-red-600' },
            { icon: Clock, label: 'Watch Time', value: currentUser.totalWatchTime, color: 'from-blue-500 to-indigo-600' },
            { icon: Trophy, label: 'Certificates', value: String(certificates.length), color: 'from-amber-500 to-orange-600' },
            { icon: TrendingUp, label: 'Progress', value: `${overallPct}%`, color: 'from-emerald-500 to-teal-600' },
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

        {/* Achievements */}
        <section className="mb-12">
          <SectionHeader
            title="Achievements"
            subtitle="Milestones on your learning journey"
            icon={<Award className="w-6 h-6 text-brand-500" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentUser.achievements.map((ach, i) => {
              const Icon = achievementIcons[ach.icon] ?? Award;
              return (
                <div
                  key={ach.id}
                  className={`relative overflow-hidden rounded-2xl border p-4 text-center animate-fade-up card-hover ${
                    ach.earned ? 'glass' : ''
                  }`}
                  style={{
                    borderColor: 'var(--border-color)',
                    background: ach.earned ? undefined : 'var(--bg-sunken)',
                    opacity: ach.earned ? 1 : 0.5,
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                    ach.earned ? 'gradient-brand shadow-lg shadow-brand-500/30' : ''
                  }`} style={ach.earned ? {} : { background: 'var(--border-color)' }}>
                    <Icon className={`w-6 h-6 ${ach.earned ? 'text-white' : ''}`} style={ach.earned ? {} : { color: 'var(--text-tertiary)' }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{ach.title}</p>
                  <p className="text-[11px] mt-1 leading-tight" style={{ color: 'var(--text-tertiary)' }}>{ach.description}</p>
                  {ach.earned && ach.date && (
                    <p className="text-[10px] mt-2 font-medium text-brand-500">{ach.date}</p>
                  )}
                  {!ach.earned && (
                    <p className="text-[10px] mt-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>Locked</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <SectionHeader
            title="Skills"
            subtitle="Technologies and areas I work with"
            icon={<Code2 className="w-6 h-6 text-brand-500" />}
          />

          <div className="glass rounded-2xl p-5">
            <div className="flex flex-wrap gap-3">
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-elevated)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <SectionHeader
            title="Projects"
            subtitle="Things I've built and worked on"
            icon={<Code2 className="w-6 h-6 text-brand-500" />}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentUser.projects.map((project, i) => (
              <div
                key={project.id}
                className="glass rounded-2xl p-5 card-hover animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                      style={{ color: 'var(--text-secondary)' }}
                      aria-label={`Open ${project.name}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.name}
                </h3>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-sunken)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <SectionHeader
            title="Experience"
            subtitle="My professional journey"
            icon={<BriefcaseBusiness className="w-6 h-6 text-brand-500" />}
          />

          <div className="space-y-4">
            {currentUser.experience.map((item) => (
              <div
                key={item.id}
                className="glass rounded-2xl p-5 card-hover"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-brand-500">
                      {item.company}
                    </p>
                  </div>

                  <span
                    className="text-sm px-3 py-1.5 rounded-lg whitespace-nowrap"
                    style={{
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-sunken)',
                    }}
                  >
                    {item.duration}
                  </span>
                </div>

                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="mb-12">
          <SectionHeader
            title="My Certificates"
            subtitle="Your earned credentials"
            icon={<Trophy className="w-6 h-6 text-brand-500" />}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </section>

        {/* Bookmarked */}
        {bookmarkedCourses.length > 0 && (
          <section className="mb-12">
            <SectionHeader
              title="Bookmarked"
              subtitle="Saved for later"
              icon={<Bookmark className="w-6 h-6 text-brand-500" />}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bookmarkedCourses.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} showProgress />
              ))}
            </div>
          </section>
        )}

        {/* Learning Activity */}
        <section>
          <SectionHeader
            title="Learning Activity"
            subtitle="All courses you are engaged with"
            icon={<TrendingUp className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'Find more' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 3).map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} showProgress />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}