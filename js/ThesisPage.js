class ThesisPage {

  render(app) {
      this.app = app;
      this.applyStyles();

      const container = makeElement('div', { className: 'thesis-page-container space-y-8' });
      container.appendChild(this.buildHero());
      container.appendChild(this.buildGatesKleinSection());
      container.appendChild(this.buildCoreArguments());
      container.appendChild(this.buildRetrainingFailureSection());

      return container;
    }
  buildHero() {
    return makeElement('div', { className: 'cad-panel banner-glow-panel' }, [
      makeElement('div', { className: 'flex justify-between items-center flex-wrap gap-2 mb-2' }, [
        makeElement('span', { className: 'tag-pill tag-pill-purple' }, 'Universal Machine Substitution'),
        makeElement('span', { className: 'text-xs font-mono text-slate-400' }, 'Economic & Cognitive Modeling')
      ]),
      makeElement('h2', { className: 'text-2xl md:text-3xl font-black text-[var(--text-title)] mb-3 leading-tight' }, 
        'Why AI & Robotics Will Inevitably Displace All Human Professions'
      ),
      makeElement('p', { className: 'text-base text-[var(--text-primary)] leading-relaxed font-medium' }, 
        "The prevailing cultural presumption that 'AI is just another productivity tool like the spreadsheet' fundamentally misdiagnoses the nature of intelligence. Historical automation eliminated mechanical muscle power, allowing human labor to migrate upward into cognitive, organizational, and spatial coordination. AI operates across the exact opposite gradient: it automates synthesis, perception, and general dexterity at near-zero marginal cost."
      )
    ]);
  }

  buildCoreArguments() {
    const argumentsList = [
      {
        num: '01',
        title: 'The "My Job is Special" Cognitive Defense',
        body: 'The most widespread reaction among knowledge workers and tradespeople alike is to identify nuances in their specific daily tasks and declare: "A machine could never do what I do." This is an emotional coping mechanism. When you trace the rate of algorithmic improvement across protein folding, legal contract analysis, real-time computer vision, and spatial modeling, domain-specific human exceptionalism collapses.'
      },
      {
        num: '02',
        title: 'Software at Ground Zero: Recursive Feedback Loops',
        body: 'Programming is unique because code can be authored, executed, tested, and modified autonomously inside the machine. Unlike carpentry or medicine, software engineering provides continuous automated ground-truth verification. When the system that writes software recursively improves its own development environment, the improvement curve departs from linear human pacing.'
      },
      {
        num: '03',
        title: 'The Physical Embodiment Fallacy',
        body: 'Office workers commonly retreat to: "Well, machines will never take manual trades like plumbing, electrical, or repair." Classical robotics failed at messy tasks because humans wrote explicit kinematic equations for every joint. Modern Vision-Language-Action (VLA) foundation models train end-to-end neural policies in physics simulators, transferring thousands of hours of dexterous trial-and-error directly to robotic hardware.'
      }
    ];

    const cards = argumentsList.map(item => makeElement('div', { className: 'argument-card' }, [
      makeElement('span', { className: 'argument-number' }, item.num),
      makeElement('h3', { className: 'text-base font-bold text-[var(--text-title)] mb-2' }, item.title),
      makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed' }, item.body)
    ]));

    return makeElement('section', { className: 'space-y-4' }, [
      makeElement('h3', { className: 'text-lg font-bold font-mono text-[var(--text-title)] uppercase tracking-wide' }, 
        'Core Foundations of the Replacement Thesis'
      ),
      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' }, cards)
    ]);
  }

  buildRetrainingFailureSection() {
    return makeElement('section', { className: 'cad-panel space-y-4' }, [
      makeElement('h3', { className: 'text-lg font-bold font-mono text-emerald-400 uppercase tracking-wide' }, 
        'The Velocity Mismatch: Why "Just Retrain" No Longer Works'
      ),
      makeElement('p', { className: 'text-sm text-[var(--text-primary)] leading-relaxed' }, 
        'During the Industrial and Information Revolutions, displaced workers successfully shifted into new careers because technological replacement cycles were 20 to 30 years long—longer than the 2 to 4 years required for human biological education. Today, frontier neural capabilities double in capability across 12 to 18-month cycles. A human beginning a multi-year retraining degree is training for a job that will be automated before graduation.'
      ),
      makeElement('div', { className: 'p-4 rounded-lg bg-[var(--bg-panel-inner)] border border-[var(--border-color)]' }, [
        makeElement('strong', { className: 'text-sm font-mono text-purple-400 block mb-1' }, 'Conclusion: Universal Societal Restructuring'),
        makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed' }, 
          'Acknowledging that machines will eventually handle all economic labor is not fatalism; it is the essential precondition for re-architecting societal distribution, capital ownership, and post-labor economics.'
        )
      ])
    ]);
  }

  applyStyles() {
      applyCss(`
        .thesis-page-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .argument-card {
          background-color: var(--bg-panel);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        .argument-number {
          font-size: 24px;
          font-weight: 900;
          font-family: ui-monospace, monospace;
          color: #3b82f6;
          opacity: 0.5;
        }
        .gates-pillar-card {
          background-color: var(--bg-panel-inner);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 8px;
          transition: border-color 0.2s;
        }
        .gates-pillar-card:hover {
          border-color: #f59e0b;
        }
        .gates-pillar-num {
          font-size: 20px;
          font-weight: 900;
          font-family: ui-monospace, monospace;
          color: #f59e0b;
          opacity: 0.8;
        }
        .gates-quote-box {
          font-size: 12.5px;
          font-style: italic;
          line-height: 1.6;
          color: #e2e8f0;
          background: rgba(0, 0, 0, 0.35);
          border-left: 3px solid #f59e0b;
          padding: 10px 14px;
          border-radius: 0 6px 6px 0;
          margin: 6px 0;
        }
      `, "thesis-page-custom-styles");
    }
  buildGatesKleinSection() {
      const pillars = [
        {
          num: '01',
          title: 'Cognition Is No Longer the "Scarce Element"',
          quote: '“Human cognition became the scarce element. It’s always about scarce elements. Once you replace human cognition as a scarce element — in fact, you blow it away in terms of working 24 hours a day, reading more, knowing every language — there is no scarcity that you’re moving up to... Name the scarcity.”',
          timestamp: 'Ezra Klein Show (34:23 - 34:41)',
          analysis: 'In the agricultural and industrial transitions, labor shifted into service and cognitive realms because human judgment remained the irreplaceable bottleneck. When AI outstrips biological intellect across speed, memory, and comprehension, there is no higher cognitive ground to retreat to.'
        },
        {
          num: '02',
          title: 'Crossing the "Reliability Threshold"',
          quote: '“The only profession we’ve truly crossed over that threshold is coding... We will in the next few years cross over those thresholds for accounting, legal work, telesales, tele-support, where 24 hours a day and in every language with infinite trivia capability and no urgency... you cross over that quality threshold.”',
          timestamp: 'Ezra Klein Show (28:16)',
          analysis: 'Displacement is non-linear: it accelerates precipitously once an AI agent crosses an empirical quality threshold, delivering superhuman competence at near-zero marginal operational cost.'
        },
        {
          num: '03',
          title: 'Rejection of the Jevons Paradox in Labor',
          quote: '“When you replace people in Amazon warehouses with robots, people don’t buy more because of that... As soon as you complete the entire task, it doesn’t matter that there’s demand elasticity. That goes into the token budget, it doesn’t go into the human salary budget.”',
          timestamp: 'Ezra Klein Show (31:53 - 32:33)',
          analysis: 'The optimistic economic defense (Jevons paradox) asserts that cheaper intelligence merely expands overall demand and births new jobs. Gates exposes the flaw: once software executes a workflow end-to-end, all surplus demand flows into compute and token budgets—leaving zero allocation for human salaries.'
        },
        {
          num: '04',
          title: 'The "Relational Economy" Refuge Is a Myth',
          quote: '“Go to San Francisco and ask people: would you rather ride in a Waymo, or rather ride with a human driver?... The notion that just the market demand preference will favor humans — that’s a quality threshold which will be passed through.”',
          timestamp: 'Ezra Klein Show (29:06)',
          analysis: 'The belief that displaced workers will find asylum in "relational" or "empathy" jobs (coaching, driving, triage) ignores real consumer preferences: users consistently choose patient, objective, tireless AI interfaces over inconsistent human service.'
        },
        {
          num: '05',
          title: 'Policy Responses: Robot Taxes & Human-Reserved Jobs',
          quote: '“As you cross reliability thresholds, both with white-collar and humanoid robots, you destroy jobs, and you leave no high ground... People who say there’ll be net additional jobs, I don’t understand what they’re thinking.”',
          timestamp: 'Ezra Klein Show (32:10, 36:43)',
          analysis: 'Because market forces cannot preserve human jobs against zero-marginal-cost machine cognition, Gates proposes intentional structural intervention: taxing robotic and AI labor like payroll to fund social baselines, alongside legally designating specific domains as human-only.'
        }
      ];

      const cards = pillars.map(p => makeElement('div', { className: 'gates-pillar-card' }, [
        makeElement('div', { className: 'flex justify-between items-center mb-2' }, [
          makeElement('span', { className: 'gates-pillar-num' }, p.num),
          makeElement('span', { className: 'text-[11px] font-mono text-amber-400 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/20' }, p.timestamp)
        ]),
        makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-2 font-mono' }, p.title),
        makeElement('blockquote', { className: 'gates-quote-box' }, p.quote),
        makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed mt-2' }, p.analysis)
      ]));

      return makeElement('section', { className: 'cad-panel space-y-6' }, [
        makeElement('div', { className: 'section-header-block' }, [
          makeElement('div', { className: 'flex justify-between items-center flex-wrap gap-2 mb-1' }, [
            makeElement('span', { className: 'tag-pill tag-pill-blue' }, 'Empirical Macro Testimony'),
            makeElement('a', {
              href: 'https://www.youtube.com/watch?v=A_156w0aYtU',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'text-xs font-mono text-blue-400 hover:underline inline-flex items-center gap-1'
            }, 'Watch Full Interview (27:00+) ↗')
          ]),
          makeElement('h3', { className: 'section-title' }, 'Bill Gates on the Inevitable Displacement of All Labor'),
          makeElement('p', { className: 'section-subtitle' }, 
            'In dialogue with Ezra Klein, Gates systematically refutes orthodox economic optimism, demonstrating why cognition is no longer a human monopoly.'
          )
        ]),
        makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, cards)
      ]);
    }
}

window.ThesisPage = ThesisPage;
globalThis.ThesisPage = ThesisPage;