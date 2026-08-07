import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Play, ArrowRight, Star, Users, Zap, Brain, Trophy,
  TrendingUp, Bookmark, ShieldCheck, Clock, Mic, Quote,
  PlayCircle, Award, BookOpen, Target, Moon, Video, Route,
} from 'lucide-react';
import { courses, aiRecommendations, getCourseById, currentUser } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import SectionHeader from '@/components/SectionHeader';

const stats = [
  { icon: Mic, label: 'Talks', value: '500+', color: 'from-blue-500 to-indigo-600' },
  { icon: Users, label: 'Speakers', value: '120+', color: 'from-purple-500 to-pink-500' },
  { icon: Brain, label: 'Learners', value: '50K+', color: 'from-emerald-500 to-teal-600' },
  { icon: Star, label: 'Satisfaction', value: '98%', color: 'from-amber-500 to-orange-600' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const } }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  const featured = courses.filter((c) => c.featured);
  const trending = courses.filter((c) => c.trending);
  const heroCourse = courses[0];

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 min-h-screen flex items-center">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 mesh-bg" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-40 right-[5%] w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[140px]"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-0 left-[30%] w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Copy */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border mb-6">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  AI-powered learning, reimagined
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.02] text-balance"
                style={{ color: 'var(--text-primary)' }}
              >
                The conversations that{' '}
                <span className="gradient-text">shape your future.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                Discover inspiring talks, learn from industry experts, and receive AI-powered personalized recommendations.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/explore"
                    className="group flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-brand text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all"
                  >
                    Explore Talks
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/talk/c1"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-semibold transition-all"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Demo
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6">
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
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>50K+</span> learners worldwide
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Animated illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[420px] sm:h-[500px] lg:h-[540px]"
            >
              {/* Main video card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-4 top-8 bottom-8 glass-strong rounded-3xl p-3 shadow-2xl"
              >
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <img src={heroCourse.image} alt={heroCourse.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${heroCourse.color} opacity-40 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Play button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 w-16 h-16 rounded-full bg-white/30"
                      />
                      <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center relative">
                        <Play className="w-7 h-7 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Video info bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-1 rounded-md text-xs font-medium glass text-white mb-2">
                      {heroCourse.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">{heroCourse.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <img src={heroCourse.speaker.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-sm text-white/80">{heroCourse.speaker.name}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '62%' }}
                      transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                      className="h-full gradient-brand"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating AI card - top right */}
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-2 -right-2 sm:right-0 glass rounded-2xl p-3.5 shadow-xl z-10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>AI Match</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>96% relevant</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - bottom left */}
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-2 -left-2 sm:left-0 glass rounded-2xl p-3.5 shadow-xl z-10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Certificate Earned</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Verified & shareable</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - right middle */}
              <motion.div
                animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-4 sm:right-2 glass rounded-2xl p-3 shadow-xl z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>8 lessons</p>
                    <p className="text-[9px]" style={{ color: 'var(--text-tertiary)' }}>4h 20m</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating mini avatars - students learning */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-1/4 -left-4 sm:left-0 flex -space-x-2 z-10"
              >
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-7 h-7 rounded-full ring-2 object-cover" style={{ '--tw-ring-color': 'var(--bg-base)' } as React.CSSProperties} />
                ))}
                <div className="w-7 h-7 rounded-full ring-2 flex items-center justify-center text-[9px] font-bold text-white gradient-brand" style={{ '--tw-ring-color': 'var(--bg-base)' } as React.CSSProperties}>
                  +12
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ STATISTICS CARDS ============ */}
      <section className="relative -mt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden group"
                >
                  <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============ AI RECOMMENDATIONS ============ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              title="Recommended by AI"
              subtitle="Personalized picks based on your learning journey"
              icon={<Sparkles className="w-6 h-6 text-brand-500" />}
              link={{ to: '/explore', label: 'Explore all' }}
            />
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {aiRecommendations.map((rec, i) => {
              const course = getCourseById(rec.courseId);
              if (!course) return null;
              return (
                <motion.div key={rec.courseId} variants={fadeUp} custom={i}>
                  <Link to={`/talk/${course.id}`} className="group block">
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              title="Featured Talks"
              subtitle="Hand-picked conversations worth your time"
              icon={<Zap className="w-6 h-6 text-brand-500" />}
              link={{ to: '/explore', label: 'See all talks' }}
            />
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featured.map((course, i) => (
              <motion.div key={course.id} variants={fadeUp} custom={i}>
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES BAND ============ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border mb-4">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Everything you need to grow
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Built for <span className="gradient-text">deep learning</span>
            </h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
              Every feature is designed to help you learn better, faster, and with more joy.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: Brain, title: 'AI Recommendations', desc: 'Our AI learns your interests and suggests talks you will love with 90%+ accuracy — no manual searching required.', gradient: 'from-blue-500 to-indigo-600', glow: 'bg-brand-500/20' },
              { icon: Route, title: 'Personalized Learning Paths', desc: 'Follow curated paths tailored to your goals, skill level, and career aspirations — step by step.', gradient: 'from-purple-500 to-pink-500', glow: 'bg-purple-500/20' },
              { icon: Video, title: 'High Quality Talks', desc: 'Crisp HD video and studio-grade audio from the world most inspiring thinkers, streamed seamlessly.', gradient: 'from-cyan-500 to-blue-600', glow: 'bg-cyan-500/20' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Beautiful dashboards visualize how far you have come and what to learn next — stay motivated every day.', gradient: 'from-emerald-500 to-teal-600', glow: 'bg-emerald-500/20' },
              { icon: Trophy, title: 'Certificates', desc: 'Earn shareable, verified certificates for every course you complete — boost your resume and LinkedIn.', gradient: 'from-amber-500 to-orange-600', glow: 'bg-amber-500/20' },
              { icon: Moon, title: 'Dark Mode', desc: 'A gorgeous dark theme that is easy on the eyes for late-night learning sessions. Switch anytime.', gradient: 'from-violet-500 to-purple-600', glow: 'bg-violet-500/20' },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative glass rounded-3xl p-7 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className={`absolute -top-12 -right-12 w-40 h-40 ${feat.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className="relative mb-5">
                    <div className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{feat.title}</h3>
                  <p className="relative text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feat.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-500/10 rounded-full blur-3xl" />
            <Quote className="w-10 h-10 mx-auto mb-4 text-brand-500/40" />
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-balance" style={{ color: 'var(--text-primary)' }}>
              "ABTalks completely changed how I learn. The AI recommendations are scary good — it knows what I want to learn before I do."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{currentUser.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Product Designer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TRENDING ============ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              title="Trending Now"
              subtitle="What the community is watching this week"
              icon={<TrendingUp className="w-6 h-6 text-brand-500" />}
              link={{ to: '/explore', label: 'Explore all' }}
            />
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {trending.map((course, i) => (
              <motion.div key={course.id} variants={fadeUp} custom={i}>
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl gradient-brand p-10 sm:p-16 text-center"
          >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to start your learning journey?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Join 50,000+ learners growing with ABTalks. It is free to start.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/explore"
                    className="inline-flex px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold shadow-lg"
                  >
                    Explore Talks
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/dashboard"
                    className="inline-flex px-6 py-3 rounded-xl glass-strong text-white font-semibold"
                  >
                    Go to Dashboard
                  </Link>
                </motion.div>
              </div>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-white/30 object-cover" />
                <p className="text-sm text-white/80">
                  <span className="font-semibold text-white">{currentUser.name}</span> and 50K+ others are learning right now
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
