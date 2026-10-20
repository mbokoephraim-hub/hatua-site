/**
 * Immersion : animations du site, sur toutes les pages.
 * - Titres qui « plongent » mot par mot, textes qui s'encrent au fil de la lecture
 * - Escalier du hero en relief (suit la souris ; au défilement, on monte l'escalier)
 * - Étapes qui s'allument une à une (« Étape après étape », calendriers de projet)
 * - Parallaxe, cartes inclinées en 3D, images qui se dévoilent, barre de progression
 * Rien de tout cela si l'appareil demande moins de mouvements.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const root = document.documentElement;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Découpe le texte d'un élément en mots (les éléments enfants, liens, <br>… sont conservés). */
function splitWords(el: HTMLElement, cls: string): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        if (parts.every((p) => !p.trim())) continue;
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const outer = document.createElement('span');
          outer.className = cls;
          const inner = document.createElement('span');
          inner.className = cls + '-i';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
          words.push(outer);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).matches('svg, br, img')) {
        walk(child);
      }
    }
  };
  walk(el);
  words.forEach((w, i) => w.style.setProperty('--wi', String(i)));
  return words;
}

function start() {
  root.classList.add('imm');

  // Barre de progression de lecture
  const bar = document.createElement('div');
  bar.className = 'imm-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const vh = () => window.innerHeight;
  const main = document.querySelector('main') ?? document.body;

  // 1. Titres : chaque mot surgit en profondeur
  const headings = Array.from(main.querySelectorAll<HTMLElement>('h1, h2')).filter((h) => !h.closest('form, .no-imm, [data-splash], .welcome'));
  headings.forEach((h) => {
    splitWords(h, 'iw');
    h.classList.add('imm-title');
  });

  // 2. Textes d'introduction : les mots s'encrent au fil de la lecture
  const inks = Array.from(main.querySelectorAll<HTMLElement>('p.text-lg.text-muted, p.ink-scroll'))
    .filter((p) => !p.closest('form, .no-imm') && p.getBoundingClientRect().top > vh() * 0.9)
    .map((p) => {
      p.classList.add('imm-ink');
      return { el: p, words: splitWords(p, 'ik'), done: -1 };
    });

  // 3. Images : elles se dévoilent en remontant, avec un léger zoom
  main.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (img.closest('[data-founder], .no-imm, header') || img.width < 140) return;
    if (img.getBoundingClientRect().top < vh()) return;
    img.classList.add('imm-img');
  });

  // 4. Cartes : inclinaison 3D qui suit le pointeur
  if (finePointer) {
    main.querySelectorAll<HTMLElement>('.card-hover, [data-tilt], .domino .card, .engage-choices a, .news-grid article, [data-tilt-big]').forEach((card) => {
      card.classList.add('imm-tilt');
      const max = card.hasAttribute('data-tilt-big') ? 8 : 6;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
        card.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  // 5. Apparition : titres, images, cascades « domino », étapes
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  main.querySelectorAll('.imm-title, .imm-img, [data-domino], [data-founder], .big-num, [data-steps], .ph-stairs').forEach((el) => io.observe(el));

  // 6. Hero : la souris oriente l'escalier et la lumière ; le défilement fait « monter »
  const heroes = Array.from(document.querySelectorAll<HTMLElement>('[data-hero]'));
  if (finePointer) {
    heroes.forEach((hero) => {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
        hero.style.setProperty('--cx', `${e.clientX - r.left}px`);
        hero.style.setProperty('--cy', `${e.clientY - r.top}px`);
      });
    });
  }

  // 7. Étapes : elles s'allument une à une, la ligne se remplit
  const stepLists = Array.from(main.querySelectorAll<HTMLElement>('[data-steps]')).map((list) => ({
    list,
    items: Array.from(list.querySelectorAll<HTMLElement>('[data-step]')),
  }));
  stepLists.forEach(({ list, items }) => {
    if (!list.classList.contains('steps-climb')) return;
    // Un marcheur qui va de marche en marche
    const walker = document.createElement('span');
    walker.className = 'steps-walker';
    walker.setAttribute('aria-hidden', 'true');
    list.appendChild(walker);
    list.dataset.count = String(items.length);
  });

  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const founders = Array.from(main.querySelectorAll<HTMLElement>('[data-founder]'));

  let ticking = false;
  const frame = () => {
    ticking = false;
    const h = vh();
    const doc = document.documentElement;
    const max = doc.scrollHeight - h;
    bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max) : 0})`;

    heroes.forEach((hero) => {
      const r = hero.getBoundingClientRect();
      if (r.bottom < -50 || r.top > h) return;
      hero.style.setProperty('--sp', clamp(-r.top / Math.max(1, r.height)).toFixed(3));
    });

    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > h + 200) return;
      const speed = parseFloat(el.dataset.parallax || '0.2');
      const off = (r.top + r.height / 2 - h / 2) * speed * -1;
      el.style.setProperty('--py', `${off.toFixed(1)}px`);
    });

    founders.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h) return;
      el.style.setProperty('--fp', clamp((h - r.top) / (h + r.height)).toFixed(3));
    });

    const atBottom = window.scrollY >= max - 4;
    inks.forEach((ink) => {
      const r = ink.el.getBoundingClientRect();
      if (r.top > h || r.bottom < 0) return;
      // Le texte s'encre entre son entrée à l'écran et le milieu de l'écran (entièrement en bas de page)
      const p = atBottom ? 1 : clamp((h * 0.95 - r.top) / (h * 0.42));
      const n = Math.round(p * ink.words.length);
      if (n === ink.done) return;
      ink.words.forEach((w, i) => w.classList.toggle('on', i < n));
      ink.done = n;
    });

    stepLists.forEach(({ list, items }) => {
      const r = list.getBoundingClientRect();
      if (r.bottom < -100 || r.top > h + 100) return;
      const line = h * 0.62;
      let active = -1;
      items.forEach((it, i) => {
        const ir = it.getBoundingClientRect();
        const on = ir.top + Math.min(ir.height, 60) / 2 < line;
        it.classList.toggle('is-on', on);
        if (on) active = i;
      });
      list.style.setProperty('--sp', clamp((line - r.top) / Math.max(1, r.height)).toFixed(3));
      list.style.setProperty('--active', String(active));
      const walker = list.querySelector<HTMLElement>('.steps-walker');
      if (walker) {
        const target = items[Math.max(0, active)]?.querySelector<HTMLElement>('.step-dot');
        if (target) {
          const lr = list.getBoundingClientRect();
          const tr = target.getBoundingClientRect();
          walker.style.transform = `translate(${(tr.left - lr.left + tr.width / 2).toFixed(1)}px, ${(tr.top - lr.top + tr.height / 2).toFixed(1)}px)`;
          walker.classList.toggle('is-on', active >= 0);
        }
      }
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();
}

if (!reduce && 'IntersectionObserver' in window) {
  // Après le logo animé d'ouverture (s'il est affiché), pour que l'on voie tout se mettre en place
  const go = () => requestAnimationFrame(start);
  if (root.classList.contains('splash')) {
    const mo = new MutationObserver(() => {
      if (!root.classList.contains('splash')) {
        mo.disconnect();
        go();
      }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  } else {
    go();
  }
}
