(function () {
  const data = window.PROGRAM_DATA;
  if (!data) return;

  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  const ICONS = {
    tailor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16"/><path d="M20 4L4 20"/><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M9 12l5 5"/></svg>',
    bolt:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',
    globe:  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 3 4 6 4 9s-1.4 6-4 9c-2.6-3-4-6-4-9s1.4-6 4-9z"/></svg>'
  };

  const trackGrid = document.getElementById("track-grid");
  const detailWrap = document.getElementById("track-detail-wrap");
  const diffGrid = document.getElementById("diff-grid");
  const caseGrid = document.getElementById("case-grid");

  trackGrid.innerHTML = data.tracks
    .map(
      (track) => `
      <a class="track-card reveal" href="#${track.id}">
        <span class="track-num">${track.number}</span>
        <div>
          <h4 class="track-name">${track.shortName}</h4>
          <p class="track-summary">${track.summary}</p>
        </div>
        <p class="track-target">대상 · <span>${track.target}</span></p>
      </a>`
    )
    .join("");

  detailWrap.innerHTML = data.tracks
    .map(
      (track, index) => `
      <article id="${track.id}" class="track-detail ${index % 2 ? "reverse" : ""} reveal">
        <div class="track-content">
          <p class="track-meta">${track.number}</p>
          <h3 class="track-detail-title">${track.shortName}</h3>
          <p class="track-detail-purpose">${track.purpose}</p>

          <div class="info-block">
            <div class="info-label">주요 교육 내용</div>
            <ul class="bullet-list">
              ${track.contents.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>

          <div class="info-block">
            <div class="info-label">활용 AI 솔루션</div>
            <div class="chips">
              ${track.solutions.map((item) => `<span class="chip">${item}</span>`).join("")}
            </div>
          </div>

          <div class="effect-card">
            <div class="info-label">기대 효과</div>
            <div class="value">${track.effect}</div>
          </div>

          <div class="meta-row">
            <span class="meta-tag"><strong>대상</strong>${track.target}</span>
            <span class="meta-tag"><strong>방식</strong>${track.method}</span>
            <span class="meta-tag"><strong>운영</strong>${track.operation}</span>
            <span class="meta-tag"><strong>최종목표</strong>${track.goal}</span>
          </div>
        </div>
        <div class="track-image">
          ${track.badge ? `<span class="track-image-badge">${track.badge}</span>` : ""}
          <img src="${track.image}" alt="${track.shortName} 대표 이미지" loading="lazy" decoding="async" />
        </div>
      </article>`
    )
    .join("");

  diffGrid.innerHTML = data.differentiators
    .map(
      (item) => `
      <article class="diff-card reveal">
        <span class="diff-icon" aria-hidden="true">${ICONS[item.icon] || ""}</span>
        <h4 class="diff-name">${item.title}</h4>
        <p class="diff-desc">${item.desc}</p>
      </article>`
    )
    .join("");

  caseGrid.innerHTML = data.cases
    .map(
      (item) => `
      <article class="case-card reveal">
        <span class="case-tag">${item.tag}</span>
        <h4 class="case-role">${item.role}</h4>
        <p class="case-text">${item.text}</p>
      </article>`
    )
    .join("");

  const revealEls = document.querySelectorAll(".reveal");
  const narrow = window.matchMedia("(max-width: 640px)");
  const revealOpts = {
    threshold: narrow.matches ? 0.08 : 0.12,
    rootMargin: narrow.matches ? "0px 0px -24px 0px" : "0px"
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, revealOpts);
  revealEls.forEach((el) => observer.observe(el));
})();
