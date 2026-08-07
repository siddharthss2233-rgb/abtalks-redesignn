import { Link } from 'react-router-dom';
import {
  Sparkles, Play, ArrowRight, Star, Users, Zap, Brain, Trophy,
  TrendingUp, Bookmark, ShieldCheck, Clock, Mic,
} from 'lucide-react';
import { courses, aiRecommendations, getCourseById, currentUser } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import SectionHeader from '@/components/SectionHeader';

export default function LandingPage() {
  const featured = courses.filter((c) => c.featured);
  const trending = courses.filter((c) => c.trending);
  const heroCourse = courses[0];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 mesh-bg">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border mb-6 animate-fade-down">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  AI-powered learning, reimagined
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-balance" style={{ color: 'var(--text-primary)' }}>
                Learn from the world's best minds,{' '}
                <span className="gradient-text">one talk at a time.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                ABTalks brings you deep, engaging conversations with industry leaders, scientists, and creators. Personalized by AI, designed for curious minds.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/explore"
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-[1.02] transition-all"
                >
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold transition-all hover:scale-[1.02]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Play className="w-4 h-4" />
                  View Dashboard
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/photo-1494790108377-be9c29b2933${i}?w=80&h=80&fit=crop&crop=face`}
                      alt=""
                      className="w-9 h-9 rounded-full ring-2 object-cover"
                      style={{ '--tw-ring-color': 'var(--bg-base)' } as React.CSSProperties}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>250k+</span> learners worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-4 gradient-brand rounded-3xl blur-2xl opacity-20 animate-pulse-slow" />
                <div
                  className="relative glass-strong rounded-3xl p-2 shadow-2xl"
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    <img src={heroCourse.image} alt={heroCourse.title} className="w-full h-72 object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${heroCourse.color} opacity-40 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 rounded-md text-xs font-medium glass text-white mb-2">
                        {heroCourse.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{heroCourse.title}</h3>
                      <p className="text-sm text-white/80 mt-1">{heroCourse.speaker.name}</p>
                    </div>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-strong flex items-center justify-center group hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </button>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>AI Match</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>96% relevant</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Certificate</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Earned & verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Mic, label: 'Expert Talks', value: '500+' },
              { icon: Users, label: 'Active Learners', value: '250k+' },
              { icon: Brain, label: 'AI Curated Paths', value: '120+' },
              { icon: Trophy, label: 'Certificates Issued', value: '80k+' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-5 text-center animate-fade-up"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl gradient-brand-soft flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Recommended by AI"
            subtitle="Personalized picks based on your learning journey"
            icon={<Sparkles className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'Explore all' }}
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
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="card-hover relative overflow-hidden rounded-2xl border h-full" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div className="relative h-32 overflow-hidden">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-50 mix-blend-multiply`} />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold gradient-brand text-white">
                        {rec.match}% match
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                        <p className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{rec.reason}</p>
                      </div>
                      <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {course.title}
                      </h3>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{course.speaker.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Talks"
            subtitle="Hand-picked conversations worth your time"
            icon={<Zap className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'See all talks' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features band */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Built for <span className="gradient-text">deep learning</span>
            </h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
              Every feature is designed to help you learn better, faster, and with more joy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Brain, title: 'AI-Powered Recommendations', desc: 'Our AI learns your interests and suggests talks you will love, with 90%+ accuracy.' },
              { icon: TrendingUp, title: 'Track Your Progress', desc: 'Beautiful dashboards show how far you have come and what to learn next.' },
              { icon: Trophy, title: 'Earn Certificates', desc: 'Complete courses and earn shareable certificates from world-class instructors.' },
              { icon: Bookmark, title: 'Save for Later', desc: 'Bookmark talks and build a personal library of knowledge.' },
              { icon: ShieldCheck, title: 'Expert-Vetted', desc: 'Every talk is curated and reviewed by domain experts for quality.' },
              { icon: Clock, title: 'Bite-Sized Learning', desc: 'Talks designed for busy schedules. Learn in 10-minute sprints.' },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="glass rounded-2xl p-6 animate-fade-up card-hover"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-4 shadow-lg shadow-brand-500/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Trending Now"
            subtitle="What the community is watching this week"
            icon={<TrendingUp className="w-6 h-6 text-brand-500" />}
            link={{ to: '/explore', label: 'Explore all' }}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trending.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-brand p-10 sm:p-16 text-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to start your learning journey?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Join 250,000+ learners growing with ABTalks. It is free to start.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/explore"
                  className="px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Explore Talks
                </Link>
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-xl glass-strong text-white font-semibold hover:scale-[1.02] transition-transform"
                >
                  Go to Dashboard
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-white/30 object-cover" />
                <p className="text-sm text-white/80">
                  <span className="font-semibold text-white">{currentUser.name}</span> and 250k+ others are learning right now
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
