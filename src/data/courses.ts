export type Category =
  | 'Technology'
  | 'Business'
  | 'Design'
  | 'Science'
  | 'Personal Growth'
  | 'Leadership'
  | 'Finance'
  | 'Marketing';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: Category;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  image: string;
  color: string;
  tags: string[];
  speaker: Speaker;
  lessons: Lesson[];
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
}

export interface UserProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  lastWatched: string;
  bookmarked: boolean;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  speakerName: string;
  completedDate: string;
  certificateId: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  bio: string;
  streak: number;
  totalWatchTime: string;
  coursesCompleted: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

const speakers: Speaker[] = [
  { id: 's1', name: 'Dr. Maya Chen', title: 'AI Researcher, Stanford', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', bio: 'Leading researcher in machine learning and human-AI interaction.' },
  { id: 's2', name: 'James Okonkwo', title: 'Founder & CEO, Nimbus', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', bio: 'Serial entrepreneur building the future of cloud infrastructure.' },
  { id: 's3', name: 'Sofia Rodriguez', title: 'Design Director, Figma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', bio: 'Design leader shaping modern product experiences.' },
  { id: 's4', name: 'Dr. Arjun Patel', title: 'Neuroscientist, MIT', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face', bio: 'Exploring the brain science behind learning and creativity.' },
  { id: 's5', name: 'Elena Volkov', title: 'CFO, Stripe', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87762a8d2?w=200&h=200&fit=crop&crop=face', bio: 'Financial strategist scaling companies from startup to IPO.' },
  { id: 's6', name: 'Marcus Williams', title: 'CMO, Notion', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', bio: 'Marketing innovator behind some of the most loved brands in tech.' },
  { id: 's7', name: 'Aisha Bello', title: 'Product VP, Linear', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face', bio: 'Product leader obsessed with craft and velocity.' },
  { id: 's8', name: 'Dr. Kenji Tanaka', title: 'Climate Scientist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face', bio: 'Pioneering research on sustainable technology and climate solutions.' },
];

const makeLessons = (count: number, completedCount: number): Lesson[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `l${i + 1}`,
    title: [
      'Introduction & Overview',
      'The Core Framework',
      'Real-World Applications',
      'Deep Dive: Case Studies',
      'Hands-On Workshop',
      'Advanced Techniques',
      'Industry Insights',
      'Q&A and Wrap-up',
    ][i % 8],
    duration: 12 + ((i * 7) % 20),
    completed: i < completedCount,
  }));

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'The Future of Artificial Intelligence',
    subtitle: 'From neural networks to AGI — understanding the next frontier',
    description: 'A comprehensive journey through modern AI, from the fundamentals of machine learning to the cutting edge of large language models and artificial general intelligence. Learn how AI is reshaping every industry and what it means for your career.',
    category: 'Technology',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 2847,
    students: 45200,
    duration: '4h 20m',
    image: 'https://images.unsplash.com/photo-1677442136019-21724ecb373c?w=800&h=500&fit=crop',
    color: 'from-indigo-500 to-purple-600',
    tags: ['AI', 'Machine Learning', 'Future Tech'],
    speaker: speakers[0],
    lessons: makeLessons(8, 5),
    featured: true,
    trending: true,
  },
  {
    id: 'c2',
    title: 'Building Products People Love',
    subtitle: 'The product playbook from inside the best companies in the world',
    description: 'Learn the frameworks, rituals, and decision-making processes used by top product teams at companies like Linear, Figma, and Notion. From discovery to delivery, master the art of building software that users cannot live without.',
    category: 'Business',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 1923,
    students: 32100,
    duration: '3h 45m',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4b0f72?w=800&h=500&fit=crop',
    color: 'from-blue-500 to-indigo-600',
    tags: ['Product', 'Strategy', 'Startups'],
    speaker: speakers[6],
    lessons: makeLessons(6, 2),
    featured: true,
  },
  {
    id: 'c3',
    title: 'Design Thinking Mastery',
    subtitle: 'Create interfaces that feel inevitable',
    description: 'A deep dive into the design principles that power the most beautiful and intuitive products in the world. From typography to motion design, learn how to craft experiences that feel effortless and premium.',
    category: 'Design',
    level: 'Beginner',
    rating: 4.7,
    reviews: 1456,
    students: 28900,
    duration: '3h 10m',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    color: 'from-purple-500 to-pink-500',
    tags: ['Design', 'UX/UI', 'Creativity'],
    speaker: speakers[2],
    lessons: makeLessons(7, 0),
    trending: true,
  },
  {
    id: 'c4',
    title: 'The Science of Learning',
    subtitle: 'How your brain absorbs, stores, and retrieves knowledge',
    description: 'Discover the neuroscience behind effective learning. Understand spaced repetition, active recall, and the cognitive science of expertise. Apply these principles to learn anything faster and retain it longer.',
    category: 'Personal Growth',
    level: 'Beginner',
    rating: 4.9,
    reviews: 3201,
    students: 51800,
    duration: '2h 50m',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0ea6545532?w=800&h=500&fit=crop',
    color: 'from-emerald-500 to-teal-600',
    tags: ['Learning', 'Neuroscience', 'Productivity'],
    speaker: speakers[3],
    lessons: makeLessons(6, 6),
    featured: true,
  },
  {
    id: 'c5',
    title: 'Scaling Startups to IPO',
    subtitle: 'The financial playbook for hypergrowth',
    description: 'From Series A to the public markets — learn the financial strategies, metrics, and frameworks that separate companies that scale from those that stall. Real case studies from Stripe, Snowflake, and more.',
    category: 'Finance',
    level: 'Advanced',
    rating: 4.6,
    reviews: 892,
    students: 15600,
    duration: '5h 15m',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    color: 'from-blue-600 to-cyan-600',
    tags: ['Finance', 'Startups', 'Growth'],
    speaker: speakers[4],
    lessons: makeLessons(8, 0),
  },
  {
    id: 'c6',
    title: 'The Art of Brand Storytelling',
    subtitle: 'Marketing that feels like a conversation, not a campaign',
    description: 'Master the craft of brand narrative. Learn how companies like Notion, Apple, and Linear build marketing that feels authentic and drives real engagement. From positioning to content strategy.',
    category: 'Marketing',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 1678,
    students: 24300,
    duration: '3h 30m',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3e1130?w=800&h=500&fit=crop',
    color: 'from-violet-500 to-purple-600',
    tags: ['Marketing', 'Branding', 'Storytelling'],
    speaker: speakers[5],
    lessons: makeLessons(7, 1),
    new: true,
  },
  {
    id: 'c7',
    title: 'Leadership in the Modern Era',
    subtitle: 'Leading distributed teams with empathy and clarity',
    description: 'The leadership playbook for the post-pandemic world. Learn how to build culture, drive alignment, and lead high-performing remote and hybrid teams. Practical frameworks from experienced operators.',
    category: 'Leadership',
    level: 'Intermediate',
    rating: 4.7,
    reviews: 2103,
    students: 38700,
    duration: '4h 05m',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415ba0?w=800&h=500&fit=crop',
    color: 'from-amber-500 to-orange-600',
    tags: ['Leadership', 'Management', 'Culture'],
    speaker: speakers[1],
    lessons: makeLessons(8, 3),
    trending: true,
  },
  {
    id: 'c8',
    title: 'Climate Tech & Sustainability',
    subtitle: 'Building the tools for a greener future',
    description: 'Explore the technologies and innovations driving the transition to sustainable energy and a circular economy. From carbon capture to green software engineering, understand how tech can solve our biggest challenge.',
    category: 'Science',
    level: 'Beginner',
    rating: 4.8,
    reviews: 967,
    students: 18200,
    duration: '3h 20m',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb48192?w=800&h=500&fit=crop',
    color: 'from-green-500 to-emerald-600',
    tags: ['Climate', 'Sustainability', 'Tech'],
    speaker: speakers[7],
    lessons: makeLessons(6, 0),
    new: true,
  },
];

export const userProgress: UserProgress[] = [
  { courseId: 'c1', completedLessons: 5, totalLessons: 8, lastWatched: '2 hours ago', bookmarked: true },
  { courseId: 'c2', completedLessons: 2, totalLessons: 6, lastWatched: 'Yesterday', bookmarked: false },
  { courseId: 'c7', completedLessons: 3, totalLessons: 8, lastWatched: '3 days ago', bookmarked: true },
  { courseId: 'c6', completedLessons: 1, totalLessons: 7, lastWatched: '5 days ago', bookmarked: false },
];

export const certificates: Certificate[] = [
  {
    id: 'cert1',
    courseId: 'c4',
    courseTitle: 'The Science of Learning',
    speakerName: 'Dr. Arjun Patel',
    completedDate: 'Aug 2, 2026',
    certificateId: 'ABT-2026-08432',
  },
  {
    id: 'cert2',
    courseId: 'c3',
    courseTitle: 'Design Thinking Mastery',
    speakerName: 'Sofia Rodriguez',
    completedDate: 'Jul 15, 2026',
    certificateId: 'ABT-2026-07189',
  },
];

export const currentUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
  joinedDate: 'January 2026',
  bio: 'Product designer turned founder. Learning every day to build things people love.',
  streak: 23,
  totalWatchTime: '47h 30m',
  coursesCompleted: 2,
  achievements: [
    { id: 'a1', title: 'Weekend Warrior', description: 'Completed 5 lessons in a single weekend', icon: 'flame', earned: true, date: 'Jul 28, 2026' },
    { id: 'a2', title: 'Deep Diver', description: 'Finished a course rated Advanced', icon: 'anchor', earned: true, date: 'Jul 15, 2026' },
    { id: 'a3', title: 'Consistency King', description: 'Maintained a 20-day learning streak', icon: 'crown', earned: true, date: 'Aug 5, 2026' },
    { id: 'a4', title: 'Polymath', description: 'Completed courses in 5 different categories', icon: 'compass', earned: false },
    { id: 'a5', title: 'Night Owl', description: 'Completed a lesson after midnight', icon: 'moon', earned: true, date: 'Aug 3, 2026' },
    { id: 'a6', title: 'Scholar', description: 'Earned 5 certificates', icon: 'graduation', earned: false },
  ],
};

export const categories: { name: Category; icon: string; count: number }[] = [
  { name: 'Technology', icon: 'cpu', count: 142 },
  { name: 'Business', icon: 'briefcase', count: 98 },
  { name: 'Design', icon: 'palette', count: 76 },
  { name: 'Science', icon: 'atom', count: 54 },
  { name: 'Personal Growth', icon: 'sparkles', count: 89 },
  { name: 'Leadership', icon: 'compass', count: 43 },
  { name: 'Finance', icon: 'trending', count: 61 },
  { name: 'Marketing', icon: 'megaphone', count: 52 },
];

export const aiRecommendations = [
  { courseId: 'c2', reason: 'Because you enjoyed "The Future of AI"', match: 96 },
  { courseId: 'c6', reason: 'Matches your interest in Design and Marketing', match: 91 },
  { courseId: 'c7', reason: 'Trending in your most-watched category', match: 88 },
  { courseId: 'c5', reason: 'Recommended for your career path in Business', match: 84 },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getProgressForCourse(courseId: string): UserProgress | undefined {
  return userProgress.find((p) => p.courseId === courseId);
}
