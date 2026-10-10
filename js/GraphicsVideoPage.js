class GraphicsVideoPage {
  render(app) {
    this.app = app;
    this.applyStyles();

    const container = makeElement('div', { className: 'graphics-page-container space-y-8' });
    container.appendChild(this.buildIntroBanner());
    container.appendChild(this.buildStarWarsVFXSection());
    container.appendChild(this.buildDallESection());
    container.appendChild(this.buildSpatialPhysicsSection());
    container.appendChild(this.buildPerspectiveProjectionSection());
    container.appendChild(this.buildVideoShowcaseSection());

    return container;
  }

  buildIntroBanner() {
    return makeElement('div', { className: 'cad-panel banner-glow-panel' }, [
      makeElement('div', { className: 'flex justify-between items-center flex-wrap gap-2 mb-2' }, [
        makeElement('span', { className: 'tag-pill tag-pill-blue' }, 'Diffusion, Generative Media & Visual Physics'),
        makeElement('span', { className: 'text-xs font-mono text-slate-400' }, 'Interactive High-Res View: Click Any Image')
      ]),
      makeElement('h2', { className: 'text-xl md:text-2xl font-bold text-[var(--text-title)] mb-2' }, 
        'The Visual Synthesis Benchmark: Dissolving 3D Pipelines'
      ),
      makeElement('p', { className: 'text-sm text-[var(--text-primary)] leading-relaxed' }, 
        'Generative diffusion architectures and flow-matching models are doing far more than generating static concept art: they are systematically dismantling entire multi-million-dollar CGI, polygon modeling, and visual effects pipelines. Below are empirical demonstrations of cinematic character synthesis, spatial light transport, and perspective extrapolation—accompanied by technical video analyses.'
      )
    ]);
  }

  buildStarWarsVFXSection() {
    const starWarsGallery = [
      {
        src: 'images/starWarsDeAging.webp',
        title: 'Star Wars Synthetic Era Recreations (Luke, Leia, Lando)',
        caption: 'Pure neural synthesis of classic characters as they appeared in earlier films. Rather than relying on multi-million dollar 3D geometry rigs, manual blend shapes, or traditional CGI facial tracking pipelines, AI recreates full cinematic performance, skin translucency, and scene lighting directly via generative inference.'
      }
    ];

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'section-header-block' }, [
        makeElement('h3', { className: 'section-title' }, '1. Synthetic Cinema: Beyond Traditional 3D CGI & De-Aging'),
        makeElement('p', { className: 'section-subtitle' }, 
          'How generative models bypass polygon meshes, texture maps, and render farms entirely to recreate actors across eras and produce complete visual effects.'
        )
      ]),

      makeElement('div', { className: 'grid grid-cols-1 gap-4' }, [
        this.buildClickableImageCard(starWarsGallery, 0, 'starWarsDeAging.webp')
      ]),

      makeElement('div', { className: 'analysis-quote-box' }, [
        makeElement('h4', { className: 'font-bold text-sm text-blue-400 mb-1' }, 'Key Architectural Takeaway:'),
        makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed' }, 
          'De-aging an actor using traditional 3D pipelines requires hundreds of human specialists: rotoscoping artists, match-move trackers, digital sculptors, and lighting TDs. Even with immense budgets, the results frequently linger in the uncanny valley. Generative models bypass the entire intermediate layer of geometric representation: they learn continuous manifolds of appearance, rendering temporal likeness and photorealistic VFX without a single polygonal vertex.'
        )
      ])
    ]);
  }

  buildDallESection() {
    const dalleGallery = [
      {
        src: 'images/compareDallE_1.webp',
        title: 'Prompt Benchmark Comparison: Group A',
        caption: 'Identical prompt tests (glass dog, winged unicorn dog, robot hand). Left column shows mid-2022 diffusion outputs; right column shows late-2023 outputs. In fifteen months, the model resolved specular refraction, anatomy, and complex material interaction.'
      },
      {
        src: 'images/compareDallE_2.webp',
        title: 'Prompt Benchmark Comparison: Group B',
        caption: 'Complex scene benchmarks (cyborg pianist, ceramic elephant). Left column shows fragmented geometric artifacts; right column achieves consistent illumination, volumetric depth, and compositional mastery.'
      }
    ];

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'section-header-block' }, [
        makeElement('h3', { className: 'section-title' }, '2. Measuring the Exponential Curve: 2022 vs. 2023'),
        makeElement('p', { className: 'section-subtitle' }, 
          'Demonstrating the velocity of improvement across identical prompts over an 18-month window.'
        )
      ]),

      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [
        this.buildClickableImageCard(dalleGallery, 0, 'compareDallE_1.webp'),
        this.buildClickableImageCard(dalleGallery, 1, 'compareDallE_2.webp')
      ]),

      makeElement('p', { className: 'text-sm text-[var(--text-secondary)] leading-relaxed italic' }, 
        'Notice how critics in early 2022 claimed neural networks could never master hands, optical glass refraction, or structural instruments. Within months, scaling laws rendered those claims obsolete.'
      )
    ]);
  }

  buildSpatialPhysicsSection() {
    const carGallery = [
      {
        src: 'images/carOriginal.webp',
        title: 'Input: Reference Classic Car',
        caption: 'Original photograph of red vehicle under natural daylight.'
      },
      {
        src: 'images/carStreetArt.png',
        title: 'Environmental Re-Lighting: Street Graffiti',
        caption: 'The model recalculates Fresnel light reflections, ambient occlusion, and paint gloss matching the newly introduced neon environment.'
      },
      {
        src: 'images/carMossy.png',
        title: 'Material Weathering: Deep Forest Moss',
        caption: 'Complex organic transformation: specular reflections adapt to dark forest canopy, with moss adhering plausibly across moisture-prone surfaces.'
      }
    ];

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'section-header-block' }, [
        makeElement('h3', { className: 'section-title' }, '3. Emergent Light Transport & Material Physics'),
        makeElement('p', { className: 'section-subtitle' }, 
          'Proving that modern diffusion models develop latent world models rather than statistical 2D pixel copy-pasting.'
        )
      ]),

      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' }, [
        this.buildClickableImageCard(carGallery, 0, 'carOriginal.webp'),
        this.buildClickableImageCard(carGallery, 1, 'carStreetArt.png'),
        this.buildClickableImageCard(carGallery, 2, 'carMossy.png')
      ]),

      makeElement('div', { className: 'p-4 rounded-lg bg-[var(--bg-panel-inner)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] leading-relaxed' }, 
        'When the vehicle is transposed into an entirely novel background, the model demonstrates intrinsic comprehension of bidirectional reflectance distribution functions (BRDF). The reflections on curved metallic panels are optically coherent with light sources from the surrounding graffiti alley and forest floor.'
      )
    ]);
  }

  buildPerspectiveProjectionSection() {
    const houseGallery = [
      {
        src: 'images/housePhotoAndIllustration.webp',
        title: 'Perspective Re-Projection & 3D Spatial Geometry',
        caption: 'From a single arbitrary perspective photograph, the model reconstructs rooflines, hidden structural planes, and extracts an isometric architectural line illustration from an unobserved virtual camera coordinate.'
      }
    ];

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'section-header-block' }, [
        makeElement('h3', { className: 'section-title' }, '4. True Spatial Coherence & Coordinate Projection'),
        makeElement('p', { className: 'section-subtitle' }, 
          'Demonstrating understanding of Euclidean geometry and occluded structural planes.'
        )
      ]),

      makeElement('div', { className: 'grid grid-cols-1 gap-4' }, [
        this.buildClickableImageCard(houseGallery, 0, 'housePhotoAndIllustration.webp')
      ])
    ]);
  }

  buildVideoShowcaseSection() {
    const videoDemos = [
      {
        title: 'Generative AI in High-End VFX & Cinematic Video',
        desc: 'Analyzing how neural video generation replaces traditional multi-stage composting and 3D modeling pipelines.',
        videoId: 'sDSFBj6MuzY'
      },
      {
        title: 'Real-Time Interface & Visual Computing Foundations',
        desc: 'Demonstrating sub-millisecond interaction design, coordinate guidance, and algorithmic drafting speed.',
        videoId: 'ply26G4DdcM'
      }
    ];

    const cards = videoDemos.map(demo => {
      const card = makeElement('div', { className: 'video-showcase-card' }, [
        makeElement('h4', { className: 'text-base font-bold text-[var(--text-title)] mb-1 font-mono' }, demo.title),
        makeElement('p', { className: 'text-xs text-[var(--text-secondary)] mb-3 leading-relaxed' }, demo.desc)
      ]);

      const playerContainer = makeElement('div', { className: 'video-player-frame' });
      card.appendChild(playerContainer);

      // Initialize YouTube VideoPlayer directly after attachment
      setTimeout(() => {
        this.app.createInlineVideoPlayer(playerContainer, demo.videoId);
      }, 50);

      return card;
    });

    return makeElement('section', { className: 'cad-panel space-y-6' }, [
      makeElement('div', { className: 'section-header-block' }, [
        makeElement('h3', { className: 'section-title' }, '5. Technical Video Showcase & Walkthroughs'),
        makeElement('p', { className: 'section-subtitle' }, 
          'Interactive video player integration showcasing state-of-the-art generative video pipelines and visual engine architectures.'
        )
      ]),
      makeElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, cards)
    ]);
  }

  buildClickableImageCard(imageGroup, index, filename) {
    const item = imageGroup[index];
    const card = makeElement('div', { className: 'interactive-image-card' });

    const imgWrapper = makeElement('div', {
      className: 'image-hover-wrapper',
      title: 'Click to open in full screen-filling viewer',
      onclick: () => this.app.openImageViewer(imageGroup, index)
    }, [
      makeElement('img', {
        src: item.src,
        alt: item.title,
        className: 'card-preview-image',
        onerror: (e) => {
          // If local images folder isn't populated, maintain sleek placeholder
          e.target.style.minHeight = '180px';
          e.target.style.backgroundColor = '#0a0f1d';
        }
      }),
      makeElement('div', { className: 'image-click-hint' }, [
        makeElement('span', {}, '🔍 View Full Screen')
      ])
    ]);

    const infoBox = makeElement('div', { className: 'card-info-box' }, [
      makeElement('strong', { className: 'block text-xs font-mono text-[var(--text-title)] mb-1' }, item.title),
      makeElement('p', { className: 'text-xs text-[var(--text-secondary)] leading-relaxed' }, item.caption)
    ]);

    card.appendChild(imgWrapper);
    card.appendChild(infoBox);
    return card;
  }

  applyStyles() {
    applyCss(`
      .graphics-page-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .banner-glow-panel {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
        border: 1px solid var(--border-hover);
      }
      .section-header-block {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 14px;
        margin-bottom: 16px;
      }
      .section-title {
        font-size: 18px;
        font-weight: 800;
        color: var(--text-title);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-family: ui-monospace, monospace;
      }
      .section-subtitle {
        font-size: 13.5px;
        color: var(--text-secondary);
        margin-top: 4px;
      }
      .interactive-image-card {
        background-color: var(--bg-panel-inner);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: border-color 0.2s ease, transform 0.2s ease;
      }
      .interactive-image-card:hover {
        border-color: #3b82f6;
        transform: translateY(-2px);
      }
      .image-hover-wrapper {
        position: relative;
        cursor: pointer;
        background-color: #030508;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .card-preview-image {
        width: 100%;
        height: auto;
        max-height: 440px;
        object-fit: contain;
        display: block;
      }
      .image-click-hint {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(12, 17, 29, 0.85);
        border: 1px solid var(--border-color);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-family: ui-monospace, monospace;
        color: #60a5fa;
        pointer-events: none;
      }
      .card-info-box {
        padding: 14px;
        border-top: 1px solid var(--border-color);
      }
      .analysis-quote-box {
        background-color: var(--bg-panel-inner);
        border-left: 3px solid #3b82f6;
        padding: 14px 18px;
        border-radius: 0 8px 8px 0;
      }
      .video-showcase-card {
        background: var(--bg-panel-inner);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 16px;
      }
      .video-player-frame {
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: #000000;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border-color);
      }
    `, "graphics-video-page-styles");
  }
}

window.GraphicsVideoPage = GraphicsVideoPage;
globalThis.GraphicsVideoPage = GraphicsVideoPage;