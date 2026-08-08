import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  Target,
  Code2,
  Brain,
  Database,
  Cloud,
} from "lucide-react";

const roadmaps = {
  "Frontend Developer": [
    { title: "HTML & CSS", desc: "Build strong web fundamentals", done: true },
    { title: "JavaScript", desc: "Master modern JavaScript", done: true },
    { title: "React", desc: "Build interactive interfaces", current: true },
    { title: "TypeScript", desc: "Write scalable React applications" },
    { title: "Next.js", desc: "Learn production-ready React" },
    { title: "Build Projects", desc: "Create 2–3 portfolio projects" },
  ],
  "AI Engineer": [
    {
      title: "Python Fundamentals",
      desc: "Build strong programming foundations",
      done: true,
    },
    {
      title: "Machine Learning",
      desc: "Understand core ML concepts",
      current: true,
    },
    { title: "Deep Learning", desc: "Learn neural networks and training" },
    { title: "Generative AI", desc: "Work with modern LLMs" },
    { title: "RAG & AI Agents", desc: "Build intelligent AI applications" },
    { title: "AI Projects", desc: "Create production-ready projects" },
  ],
  "Data Scientist": [
    { title: "Python & SQL", desc: "Master data fundamentals", done: true },
    { title: "Statistics", desc: "Learn statistical thinking", current: true },
    { title: "Data Analysis", desc: "Work with real datasets" },
    { title: "Machine Learning", desc: "Build predictive models" },
    { title: "Data Visualization", desc: "Communicate insights clearly" },
    { title: "Portfolio Projects", desc: "Showcase your data skills" },
  ],
};

const goals = [
  { name: "Frontend Developer", icon: Code2 },
  { name: "AI Engineer", icon: Brain },
  { name: "Data Scientist", icon: Database },
];

export default function AIRoadmapPage() {
  const [selectedGoal, setSelectedGoal] = useState("Frontend Developer");

  const roadmap = roadmaps[selectedGoal as keyof typeof roadmaps];

  return (
    <div className="min-h-screen pt-28 pb-16 mesh-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              AI-powered learning
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Your AI Learning Roadmap
          </h1>

          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Choose your goal and follow a personalized path designed to help you
            build the right skills.
          </p>
        </div>

        {/* Goal Selection */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const active = selectedGoal === goal.name;

            return (
              <button
                key={goal.name}
                onClick={() => setSelectedGoal(goal.name)}
                className={`glass rounded-2xl p-5 text-left transition-all hover:-translate-y-1 ${
                  active
                    ? "ring-2 ring-brand-500 shadow-lg shadow-brand-500/20"
                    : ""
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    active ? "gradient-brand" : "bg-brand-500/10"
                  }`}
                >
                  <Icon
                    className={active ? "text-white" : "text-brand-500"}
                    size={21}
                  />
                </div>

                <h3
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {goal.name}
                </h3>

                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Personalized roadmap
                </p>
              </button>
            );
          })}
        </div>

        {/* Roadmap */}
        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Current goal
              </p>

              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedGoal}
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-500/10">
              <Target className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-semibold text-brand-500">
                33% Complete
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-brand-500 via-purple-500 to-transparent" />

            <div className="space-y-7">
              {roadmap.map((step, index) => (
                <div key={step.title} className="relative flex gap-5 group">
                  {/* Icon */}
                  <div className="relative z-10 shrink-0">
                    {step.done ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="text-white" size={20} />
                      </div>
                    ) : step.current ? (
                      <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/30">
                        <ArrowRight className="text-white" size={20} />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "var(--bg-sunken)" }}
                      >
                        <Circle className="text-brand-500" size={18} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-2xl p-4 transition-all group-hover:-translate-y-0.5 ${
                      step.current
                        ? "bg-brand-500/10 border border-brand-500/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {index + 1}. {step.title}
                        </h3>

                        <p
                          className="text-sm mt-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {step.desc}
                        </p>
                      </div>

                      {step.current && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-3xl gradient-brand p-8 text-center">
          <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />

          <h2 className="text-2xl font-bold text-white">
            Ready to take the next step?
          </h2>

          <p className="mt-2 text-white/80">
            Explore talks recommended for your current learning stage.
          </p>

          <a
            href="/explore"
            className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:scale-105 transition-transform"
          >
            Explore Recommended Talks
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
