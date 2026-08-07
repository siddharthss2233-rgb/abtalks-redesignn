import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Bookmark, Clock, Eye, Star } from 'lucide-react';

export interface TrendingTalk {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  views: string;
  rating: number;
  color: string;
  speaker: {
    name: string;
    title: string;
    avatar: string;
  };
}

export const trendingTalks: TrendingTalk[] = [
  {
    id: 't1',
    title: 'The Future of Artificial Intelligence',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21724ecb373c?w=800&h=500&fit=crop',
    category: 'Technology',
    duration: '4h 20m',
    views: '45K',
    rating: 4.9,
    color: 'from-indigo-500 to-purple-600',
    speaker: { name: 'Dr. Maya Chen', title: 'AI Researcher, Stanford', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  },
  {
    id: 't2',
    title: 'Design Thinking Mastery',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    category: 'Design',
    duration: '3h 10m',
    views: '28K',
    rating: 4.7,
    color: 'from-purple-500 to-pink-500',
    speaker: { name: 'Sofia Rodriguez', title: 'Design Director, Figma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  },
  {
    id: 't3',
    title: 'Leadership in the Modern Era',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415ba0?w=800&h=500&fit=crop',
    category: 'Leadership',
    duration: '4h 05m',
    views: '38K',
    rating: 4.7,
    color: 'from-amber-500 to-orange-600',
    speaker: { name: 'James Okonkwo', title: 'Founder & CEO, Nimbus', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  },
  {
    id: 't4',
    title: 'The Art of Brand Storytelling',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3e1130?w=800&h=500&fit=crop',
    category: 'Marketing',
    duration: '3h 30m',
    views: '24K',
    rating: 4.8,
    color: 'from-violet-500 to-purple-600',
    speaker: { name: 'Marcus Williams', title: 'CMO, Notion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  },
  {
    id: 't5',
    title: 'Climate Tech & Sustainability',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb48192?w=800&h=500&fit=crop',
    category: 'Science',
    duration: '3h 20m',
    views: '18K',
    rating: 4.8,
    color: 'from-green-500 to-emerald-600',
    speaker: { name: 'Dr. Kenji Tanaka', title: 'Climate Scientist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face' },
  },
  {
    id: 't6',
    title: 'Scaling Startups to IPO',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    category: 'Finance',
    duration: '5h 15m',
    views: '15K',
    rating: 4.6,
    color: 'from-blue-600 to-cyan-600',
    speaker: { name: 'Elena Volkov', title: 'CFO, Stripe', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87762a8d2?w=200&h=200&fit=crop&crop=face' },
  },
];

export default function TrendingTalkCard({ talk, index }: { talk: TrendingTalk; index: number }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative glass rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-brand-500/10">
        {/* Thumbnail */}
        <div className="relative h-44 sm:h-48 overflow-hidden">
          <img
            src={talk.thumbnail}
            alt={talk.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${talk.color} opacity-30 mix-blend-multiply group-hover:opacity-50 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold glass text-white">
              {talk.category}
            </span>
          </div>

          {/* Bookmark button */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              bookmarked
                ? 'glass-strong text-brand-400'
                : 'glass text-white hover:scale-110'
            }`}
            aria-label="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Hover play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/30 animate-ping" />
              <div className="relative w-16 h-16 rounded-full glass-strong flex items-center justify-center">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </motion.div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md glass text-white text-xs font-medium">
            <Clock className="w-3 h-3" />
            {talk.duration}
          </div>

          {/* Rating + views */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 rounded-md glass text-white text-xs font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {talk.rating}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md glass text-white text-xs font-medium">
              <Eye className="w-3 h-3" />
              {talk.views}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-brand-500 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
            {talk.title}
          </h3>

          <div className="flex items-center gap-3 mt-4">
            <img src={talk.speaker.avatar} alt={talk.speaker.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{talk.speaker.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{talk.speaker.title}</p>
            </div>
          </div>

          <Link
            to={`/talk/${talk.id}`}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold gradient-brand text-white shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Now
          </Link>
        </div>

        {/* Bottom accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${talk.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
    </motion.div>
  );
}
