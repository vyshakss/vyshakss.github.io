import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Shirt,
  Ban,
  ShieldCheck,
  Clock,
  ShieldAlert,
  Trees,
  Users,
  ListOrdered,
  Droplets,
  ClipboardList,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
});

const RULES = [
  {
    icon: Shirt,
    title: "Dress Code",
    body: "Participants must be dressed modestly, neatly and appropriately for an academic institution. Revealing, offensive or scanty attire is not permitted.",
  },
  {
    icon: Ban,
    title: "Substance Use Policy",
    body: "Strictly no possession or consumption of alcohol, tobacco, cigarettes, vapes, drugs or any banned substances within the campus. Violation will lead to instant disqualification, removal from campus and further disciplinary/legal action.",
  },
  {
    icon: ShieldCheck,
    title: "Bag & Security Checks",
    body: "Security personnel may conduct mandatory checks of bags, kits, instruments and materials at any time. Participants are expected to fully cooperate with security and the discipline team.",
  },
  {
    icon: Clock,
    title: "Punctuality & Timelines",
    body: "Participants must report at least 30 minutes before their scheduled event. Delays, late reporting or missing rounds may lead to automatic elimination. Event schedules must be followed strictly without exceptions.",
  },
  {
    icon: ShieldAlert,
    title: "Zero Tolerance for Harassment",
    body: "Any form of harassment—verbal, physical, sexual, emotional, or online—will not be tolerated. Misconduct toward participants, volunteers, judges or staff will result in immediate removal from the fest. Respectful behaviour is expected at all times.",
  },
  {
    icon: Trees,
    title: "Damage to Property",
    body: "Littering & damaging campus property including gardens is strictly prohibited. Any damage caused will have to be compensated monetarily by the participant/college.",
  },
  {
    icon: Users,
    title: "Overcrowding",
    body: "Practice rooms and green rooms have capacity limits. Overcrowding or unauthorized gatherings in these spaces is not allowed. Only registered participants are permitted on campus.",
  },
  {
    icon: ListOrdered,
    title: "Queue Discipline",
    body: "Queue systems at food counters, registration desks, washrooms and event venues must be followed strictly. Cutting queues or causing disruptions will attract disciplinary action.",
  },
  {
    icon: Droplets,
    title: "Washroom Etiquette",
    body: "Follow basic hygiene and etiquette inside washrooms. Keep the spaces clean and tidy for the next user. Report any maintenance issues to volunteers immediately.",
  },
];

const GENERAL_CONDUCT = [
  "Participants must maintain a respectful and professional atmosphere.",
  "Vulgarity, offensive gestures, obscenity or inappropriate behaviour is strictly forbidden.",
  "Unsolicited photography and videography are not permitted without consent.",
  "Judges' decisions are final and binding.",
];

export function RulesPage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-white selection:bg-indigo-500/30">
      <SiteHeader isFixed />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ willChange: "transform" }}>
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[800px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)", transform: "translateX(-50%) translate3d(0,0,0)" }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[400px] w-[500px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(147,51,234,0.10) 0%, transparent 65%)", transform: "translate3d(0,0,0)" }}
        />
        <div
          className="absolute bottom-10 -left-40 h-[400px] w-[500px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.10) 0%, transparent 65%)", transform: "translate3d(0,0,0)" }}
        />
      </div>

      <div className="relative z-10 pt-28 pb-24">
        {/* Hero */}
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-indigo-300 uppercase">
            <Sparkles className="size-3.5" /> CHRIST (Deemed to be University), Kengeri Campus
          </div>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Rules &amp; Regulations
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Every participant is expected to read and abide by the following code of conduct
            throughout MAGNOVITE 2026, on and off the competition floor.
          </p>
        </div>

        {/* Numbered Rules Grid */}
        <div className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {RULES.map((rule, i) => (
              <div
                key={rule.title}
                className="glass-panel flex gap-4 p-6 transition-all hover:border-indigo-500/30"
              >
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="grid size-11 place-items-center rounded-full border border-indigo-500/30 bg-indigo-600/20 text-indigo-300">
                    <rule.icon className="size-5" />
                  </div>
                  <span className="font-mono text-[0.65rem] font-semibold text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{rule.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{rule.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Conduct */}
        <div className="mx-auto mt-6 max-w-5xl px-5 sm:px-8">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-full border border-violet-500/30 bg-violet-600/20 text-violet-300">
                <ClipboardList className="size-5" />
              </div>
              <div>
                <span className="font-mono text-[0.65rem] font-semibold text-white/30">10</span>
                <h3 className="font-display text-base font-bold text-white">General Conduct</h3>
              </div>
            </div>
            <ul className="mt-5 space-y-3 sm:pl-14">
              {GENERAL_CONDUCT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-400/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing Note */}
        <div className="mx-auto mt-14 max-w-3xl px-5 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-white/60">
            Non-compliance with any of the above may result in disqualification, removal from
            campus, or further disciplinary and legal action. By registering for MAGNOVITE 2026,
            participants acknowledge and agree to abide by these rules.
          </p>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/8 px-6 py-12 text-center text-xs tracking-[0.2em] text-white/40 uppercase">
        MAGNOVITE 2026 · CHRIST (Deemed to be University) Kengeri Campus
      </footer>
    </div>
  );
}
