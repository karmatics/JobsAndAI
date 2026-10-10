class ThesisPage {
  render(app) {
    this.app = app;
    this.applyStyles();

    const container = makeElement('div', { className: 'thesis-page-container space-y-8' });
    container.appendChild(this.buildHero());
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
    `, "thesis-page-custom-styles");
  }
}

window.ThesisPage = ThesisPage;
globalThis.ThesisPage = ThesisPage;