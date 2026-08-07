import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, X, Cpu, Briefcase, Palette, Atom, Compass, TrendingUp, Megaphone } from 'lucide-react';
import { courses, categories, type Category } from '@/data/courses';
import CourseCard from '@/components/CourseCard';

const categoryIcons: Record<string, typeof Cpu> = {
  Technology: Cpu, Business: Briefcase, Design: Palette, Science: Atom,
  'Personal Growth': Sparkles, Leadership: Compass, Finance: TrendingUp, Marketing: Megaphone,
};

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
const sorts = ['Most Popular', 'Top Rated', 'Newest', 'Shortest'] as const;

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeLevel, setActiveLevel] = useState<(typeof levels)[number]>('All');
  const [sortBy, setSortBy] = useState<(typeof sorts)[number]>('Most Popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...courses];
    const q = query.toLowerCase().trim();
    if (q) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.speaker.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'All') {
      result = result.filter((c) => c.category === activeCategory);
    }
    if (activeLevel !== 'All') {
      result = result.filter((c) => c.level === activeLevel);
    }
    switch (sortBy) {
      case 'Top Rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'Newest': result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
      case 'Shortest': result.sort((a, b) => a.duration.localeCompare(b.duration)); break;
      default: result.sort((a, b) => b.students - a.students);
    }
    return result;
  }, [query, activeCategory, activeLevel, sortBy]);

  return (
    <div className="pt-24 pb-12 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Explore <span className="gradient-text">Talks</span>
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Discover {courses.length * 60}+ expert talks across every field
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl glass-strong shadow-lg">
            <Sparkles className="w-5 h-5 text-brand-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search talks, topics, speakers, or categories..."
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--text-primary)' }}
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10" style={{ color: 'var(--text-tertiary)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                showFilters ? 'gradient-brand text-white border-transparent' : ''
              }`}
              style={showFilters ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === 'All' ? 'gradient-brand text-white shadow-lg shadow-brand-500/30' : 'glass'
            }`}
            style={activeCategory === 'All' ? {} : { color: 'var(--text-secondary)' }}
          >
            All Topics
          </button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] ?? Compass;
            const active = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  active ? 'gradient-brand text-white shadow-lg shadow-brand-500/30' : 'glass'
                }`}
                style={active ? {} : { color: 'var(--text-secondary)' }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="glass rounded-2xl p-5 mb-6 animate-fade-up flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Level:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeLevel === lvl ? 'gradient-brand text-white' : 'border'
                  }`}
                  style={activeLevel === lvl ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="w-px h-6 hidden sm:block" style={{ background: 'var(--border-color)' }} />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as (typeof sorts)[number])}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border outline-none cursor-pointer"
                style={{ borderColor: 'var(--border-color)', background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
              >
                {sorts.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{filtered.length}</span> talks found
            {query && <> for "<span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{query}</span>"</>}
          </p>
        </div>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} showProgress />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No talks found</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try a different search term or filter</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory('All'); setActiveLevel('All'); }}
              className="mt-4 px-4 py-2 rounded-lg gradient-brand text-white text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
