import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, Play, Star, Clock, Users, Bookmark, Share2,
  CheckCircle2, Circle, ChevronDown, Award, Sparkles, TrendingUp,
  Calendar, Globe,
} from 'lucide-react';
import { getCourseById, getProgressForCourse, courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';

export default function TalkDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Talk not found</h1>
        <Link to="/explore" className="text-brand-500 font-medium">Back to Explore</Link>
      </div>
    );
  }

  const progress = getProgressForCourse(course.id);
  const pct = progress ? Math.round((progress.completedLessons / progress.totalLessons) * 100) : 0;
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);

  return (
    <div className="pt-20 pb-12 min-h-screen">
      {/* Hero / Player */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-50 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-white text-sm font-medium hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex items-center gap-2 mb-3 animate-fade-up">
              <span className="px-2.5 py-1 rounded-md text-xs font-medium glass text-white">{course.category}</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium glass text-white">{course.level}</span>
              {course.trending && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/90 text-white">
                  <TrendingUp className="w-3 h-3" /> Trending
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {course.title}
            </h1>
            <p className="mt-2 text-white/80 text-lg max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {course.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action bar */}
            <div className="glass rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 animate-fade-up">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white font-semibold shadow-lg shadow-brand-500/30 hover:scale-[1.02] transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                  {progress && progress.completedLessons > 0 ? 'Continue' : 'Start Watching'}
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2.5 rounded-xl border transition-all ${bookmarked ? 'gradient-brand text-white border-transparent' : ''}`}
                  style={bookmarked ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-white' : ''}`} />
                </button>
                <button className="p-2.5 rounded-xl border transition-colors hover:border-brand-400/50" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{course.rating}</span>
                  ({course.reviews.toLocaleString()})
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {(course.students / 1000).toFixed(1)}k students
                </span>
              </div>
            </div>

            {/* About */}
            <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>About this talk</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{course.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {course.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg text-xs font-medium border" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Duration</p>
                  <p className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Clock className="w-4 h-4 text-brand-500" /> {course.duration}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Level</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{course.level}</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Lessons</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{course.lessons.length} lessons</p>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Curriculum</h2>
                {progress && (
                  <span className="text-sm font-semibold text-brand-500">{progress.completedLessons}/{progress.totalLessons} completed</span>
                )}
              </div>

              {progress && (
                <div className="mb-4 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-sunken)' }}>
                  <div className="h-full gradient-brand rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
              )}

              <div className="space-y-2">
                {course.lessons.map((lesson, i) => {
                  const isOpen = openLesson === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      className="rounded-xl border overflow-hidden transition-colors"
                      style={{ borderColor: 'var(--border-color)', background: 'var(--bg-elevated)' }}
                    >
                      <button
                        onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                        className="w-full flex items-center gap-3 p-4 text-left hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
                        )}
                        <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {i + 1}. {lesson.title}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{lesson.duration} min</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-tertiary)' }} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pl-12 text-sm animate-fade-in" style={{ color: 'var(--text-secondary)' }}>
                          In this lesson, {course.speaker.name} explores {lesson.title.toLowerCase()} with practical examples and real-world insights. You will gain actionable knowledge you can apply immediately.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speaker */}
            <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-tertiary)' }}>SPEAKER</h3>
              <div className="flex items-start gap-4">
                <img src={course.speaker.avatar} alt={course.speaker.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>{course.speaker.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{course.speaker.title}</p>
                </div>
              </div>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {course.speaker.bio}
              </p>
            </div>

            {/* Certificate */}
            <div className="relative overflow-hidden rounded-2xl gradient-brand p-6 text-white animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <Award className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg">Earn a Certificate</h3>
              <p className="text-sm text-white/80 mt-1">Complete all lessons to earn a verified certificate of completion.</p>
            </div>

            {/* AI insight */}
            <div className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-brand-500" />
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>AI Insight</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                This talk has a <span className="font-semibold text-brand-500">96% relevance score</span> to your learning history. Learners with similar interests completed it in an average of <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>3.5 hours</span>.
              </p>
              <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-4 h-4" /> Updated August 2026
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Globe className="w-4 h-4" /> English + 12 subtitles
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              More in <span className="gradient-text">{course.category}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((c, i) => (
                <CourseCard key={c.id} course={c} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
