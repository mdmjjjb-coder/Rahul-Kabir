/**
 * MH Rahul – Web Developer Portfolio Core Engine
 * ==========================================================
 * - Mouse Parallax & Spring Interpolation
 * - Subtle Walking / Floating Photo Movement System
 * - Mobile Touch Movement Engine
 * - Interactive Canvas Particles Network
 * - Dynamic Data Population (from window.PORTFOLIO_DATA)
 * - Number Counter Animations
 * - Category Filtering & Quick-View Modal
 * - Form Validation & Interactive Feedback
 * ==========================================================
 */

(function () {
  'use strict';

  // Check data availability
  const data = window.PORTFOLIO_DATA || {};

  // DOM Elements
  const navbar = document.getElementById('mainNavbar');
  const mouseGlow = document.getElementById('mouseCursorGlow');
  const heroPhotoWrapper = document.getElementById('heroPhotoWrapper');
  const photoContainer = document.getElementById('photoPersonContainer');
  const floatingBadges = document.querySelectorAll('.floating-badge');
  const particlesCanvas = document.getElementById('particlesCanvas');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const bgPhotoLayer = document.getElementById('bgPhotoLayer');
  const bgPhotoImg = document.getElementById('bgPhotoImg');
  const heroWatermarkPhoto = document.getElementById('heroWatermarkPhoto');
  const heroWatermarkImg = document.getElementById('heroWatermarkImg');

  // Device & Motion checks
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. DYNAMIC DATA POPULATION
     ========================================================================== */
  function populatePortfolioData() {
    if (!data.profile) return;

    // --- Hero Profile Elements ---
    const heroLabel = document.getElementById('heroSmallLabel');
    if (heroLabel) heroLabel.textContent = data.profile.shortLabel || 'MH RAHUL';

    const heroHeadingPrefix = document.getElementById('heroHeadingPrefix');
    if (heroHeadingPrefix) heroHeadingPrefix.textContent = (data.profile.heroHeading || 'I’m a') + ' ';

    const heroHighlight = document.getElementById('heroHighlightWord');
    if (heroHighlight) heroHighlight.textContent = data.profile.highlightWord || 'Web Developer';

    const heroBio = document.getElementById('heroDescription');
    if (heroBio) heroBio.textContent = data.profile.bioShort;

    // Retrieve saved custom photos or fallback to configured defaults
    const activeProfilePhoto = localStorage.getItem('mh_profile_photo') || data.profile.profilePhoto || 'assets/images/profile.png';
    const activeBgPhoto = localStorage.getItem('mh_bg_photo') || data.profile.backgroundPhoto || 'assets/images/hero_bg.jpg';
    const isBgPhotoEnabled = localStorage.getItem('mh_bg_photo_enabled') !== 'false';
    const activeBgOpacity = localStorage.getItem('mh_bg_photo_opacity') || (data.profile.backgroundPhotoOpacity || 0.38);
    const activeBgTheme = localStorage.getItem('mh_bg_photo_theme') || (data.profile.backgroundPhotoStyle || 'cyber-ambient');

    // 1. Hero Profile Photo (Walking & Floating)
    const heroPhotoImg = document.getElementById('heroProfileImg');
    if (heroPhotoImg) {
      heroPhotoImg.src = activeProfilePhoto;
      heroPhotoImg.alt = data.profile.name + ' - Web Developer';
    }

    // 2. Background Canvas Photo Layer
    if (bgPhotoImg) {
      bgPhotoImg.src = activeBgPhoto;
    }
    if (bgPhotoLayer) {
      bgPhotoLayer.style.display = isBgPhotoEnabled ? 'block' : 'none';
      bgPhotoLayer.style.opacity = activeBgOpacity;
      bgPhotoLayer.className = `bg-photo-layer theme-${activeBgTheme}`;
    }

    // 3. Hero Watermark Photo
    if (heroWatermarkImg) {
      heroWatermarkImg.src = activeProfilePhoto;
    }

    // 4. Studio Modal Previews
    const previewHero = document.getElementById('previewHeroImg');
    if (previewHero) previewHero.src = activeProfilePhoto;
    const previewBg = document.getElementById('previewBgImg');
    if (previewBg) previewBg.src = activeBgPhoto;

    // Availability & Location
    const heroLoc = document.getElementById('heroLocation');
    if (heroLoc) heroLoc.textContent = data.profile.location;

    // --- About Section ---
    const aboutIntro = document.getElementById('aboutIntro');
    if (aboutIntro && data.about) aboutIntro.textContent = data.about.introParagraph;

    const aboutDesc = document.getElementById('aboutDescription');
    if (aboutDesc && data.about) aboutDesc.textContent = data.about.descriptionParagraph;

    // Stats Counters
    const statYears = document.getElementById('statYears');
    if (statYears) statYears.dataset.target = data.profile.yearsExperience || 5;

    const statProjects = document.getElementById('statProjects');
    if (statProjects) statProjects.dataset.target = data.profile.completedProjects || 85;

    const statClients = document.getElementById('statClients');
    if (statClients) statClients.dataset.target = data.profile.happyClients || 60;

    const statTech = document.getElementById('statTech');
    if (statTech) statTech.dataset.target = data.profile.technologiesCount || 20;

    // About Highlights
    const aboutHighlightsWrap = document.getElementById('aboutHighlightsContainer');
    if (aboutHighlightsWrap && data.about && data.about.highlights) {
      aboutHighlightsWrap.innerHTML = data.about.highlights.map(item => `
        <div class="col-md-6 mb-3">
          <div class="feature-pill-item">
            <div class="feature-pill-icon">
              <i class="${item.icon}"></i>
            </div>
            <div>
              <h6 class="mb-1 fw-bold text-white">${item.title}</h6>
              <p class="mb-0 small text-muted">${item.description}</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // --- Skills Section ---
    renderSkills(data.skills || [], 'all');

    // --- Services Section ---
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid && data.services) {
      servicesGrid.innerHTML = data.services.map(svc => `
        <div class="col-lg-3 col-md-6 mb-4">
          <div class="service-card" data-tilt>
            <div class="service-card-top">
              <div class="service-icon-box">
                <i class="${svc.icon}"></i>
              </div>
              <div class="service-number">${svc.number}</div>
            </div>
            <h4 class="service-title">${svc.title}</h4>
            <p class="service-desc">${svc.description}</p>
            <ul class="service-feature-list">
              ${svc.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
            </ul>
            <a href="#contact" class="service-action-btn select-service-cta" data-service-name="${svc.title}">
              <span>Request Service</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `).join('');
    }

    // --- Projects Section ---
    renderProjects(data.projects || [], 'all');

    // --- Experience Timeline ---
    const timelineWrap = document.getElementById('experienceTimeline');
    if (timelineWrap && data.experience) {
      timelineWrap.innerHTML = `
        <div class="timeline-line"></div>
        ${data.experience.map(exp => `
          <div class="timeline-item">
            <div class="timeline-node"></div>
            <div class="timeline-content-card">
              <span class="timeline-period-badge">${exp.period}</span>
              <h4 class="timeline-role">${exp.role}</h4>
              <div class="timeline-company text-info">
                <i class="fa-solid fa-building me-1"></i> ${exp.company} · <span class="text-muted">${exp.location}</span>
              </div>
              <p class="timeline-desc">${exp.description}</p>
              <ul class="timeline-achievements">
                ${exp.achievements.map(ach => `<li><i class="fa-solid fa-circle-check"></i> <span>${ach}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      `;
    }

    // --- Contact & Socials ---
    const contactEmail = document.getElementById('contactEmailVal');
    if (contactEmail && data.contact) contactEmail.textContent = data.contact.email;

    const contactPhone = document.getElementById('contactPhoneVal');
    if (contactPhone && data.contact) contactPhone.textContent = data.contact.phone;

    const whatsappDirect = document.getElementById('contactWhatsappDirect');
    if (whatsappDirect && data.contact) whatsappDirect.href = data.contact.whatsappDirect;

    const telegramDirect = document.getElementById('contactTelegramDirect');
    if (telegramDirect && data.contact) telegramDirect.href = data.contact.telegramDirect;

    // Social Links Container
    const socialLinksWrap = document.getElementById('socialChannelsList');
    if (socialLinksWrap && data.socialLinks) {
      socialLinksWrap.innerHTML = data.socialLinks.map(s => `
        <div class="contact-direct-item">
          <div class="contact-direct-left">
            <div class="contact-icon-bubble" style="background: rgba(255,255,255,0.06); color: ${s.color};">
              <i class="${s.icon}"></i>
            </div>
            <div>
              <div class="text-white fw-bold small">${s.name}</div>
              <div class="text-muted small">${s.label}</div>
            </div>
          </div>
          <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="contact-quick-btn">
            <span>Connect</span> <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
          </a>
        </div>
      `).join('');
    }

    // Footer Socials
    const footerSocials = document.getElementById('footerSocialLinks');
    if (footerSocials && data.socialLinks) {
      footerSocials.innerHTML = data.socialLinks.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="${s.name}">
          <i class="${s.icon}"></i>
        </a>
      `).join('');
    }
  }

  // Render Skills Helper
  function renderSkills(skillsList, category) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    const filtered = category === 'all' 
      ? skillsList 
      : skillsList.filter(s => s.category === category);

    skillsGrid.innerHTML = filtered.map(skill => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="skill-card" data-tilt>
          <div class="skill-header">
            <div class="skill-icon-wrap" style="color: ${skill.iconColor};">
              <i class="${skill.icon}"></i>
            </div>
            <div class="skill-percent-badge">${skill.level}%</div>
          </div>
          <h4 class="skill-title">${skill.name}</h4>
          <p class="skill-description">${skill.description}</p>
          <div class="skill-progress-bar-bg">
            <div class="skill-progress-fill" data-level="${skill.level}"></div>
          </div>
        </div>
      </div>
    `).join('');

    // Animate skill bars
    setTimeout(animateSkillBars, 100);
  }

  // Render Projects Helper
  function renderProjects(projectsList, category) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const filtered = category === 'all'
      ? projectsList
      : projectsList.filter(p => p.category === category);

    projectsGrid.innerHTML = filtered.map(p => `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="project-card">
          <div class="project-img-wrapper">
            <img src="${p.image}" alt="${p.name}" class="project-img" loading="lazy" onerror="this.src='assets/images/project1.jpg'">
            <div class="project-overlay"></div>
            <span class="project-category-badge">${p.categoryLabel}</span>
          </div>
          <div class="project-body">
            <h4 class="project-title">${p.name}</h4>
            <p class="project-description">${p.description}</p>
            <div class="project-tech-tags">
              ${p.technologies.map(t => `<span class="project-tech-tag">${t}</span>`).join('<span class="mx-1 text-secondary">·</span>')}
            </div>
            <div class="project-footer-btns">
              <button type="button" class="btn-project-action btn-project-demo btn-quick-view" data-project-id="${p.id}">
                <i class="fa-solid fa-eye"></i> Quick View
              </button>
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-action btn-project-code">
                <i class="fa-brands fa-github"></i> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Quick View modal triggers
    attachProjectModalTriggers();
  }

  /* ==========================================================================
     2. HERO ENTRANCE SEQUENCE
     ========================================================================== */
  function initHeroEntrance() {
    const step1 = document.getElementById('heroSmallLabel');
    const step2 = document.getElementById('heroHeading');
    const step3 = document.getElementById('heroDescription');
    const step4 = document.getElementById('heroCtaGroup');
    const step5 = document.getElementById('heroMetaStrip');
    const photoWrap = document.getElementById('heroPhotoWrapper');

    setTimeout(() => step1 && step1.classList.add('revealed'), 150);
    setTimeout(() => step2 && step2.classList.add('revealed'), 350);
    setTimeout(() => step3 && step3.classList.add('revealed'), 550);
    setTimeout(() => step4 && step4.classList.add('revealed'), 750);
    setTimeout(() => step5 && step5.classList.add('revealed'), 950);
    setTimeout(() => {
      if (photoWrap) photoWrap.classList.add('revealed');
    }, 850);
  }

  /* ==========================================================================
     3. MOUSE PARALLAX & CONTINUOUS WALKING/SWAY PHYSICS
     ========================================================================== */
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    // Center-relative coordinates [-1, 1]
    mouse.targetX = (e.clientX - windowWidth / 2) / (windowWidth / 2);
    mouse.targetY = (e.clientY - windowHeight / 2) / (windowHeight / 2);

    // Mouse glow follower position
    if (mouseGlow) {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
    }
  });

  // Touch listener for mobile devices
  if (isTouchDevice && heroPhotoWrapper) {
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX - windowWidth / 2) / (windowWidth / 2);
        mouse.targetY = (touch.clientY - windowHeight / 2) / (windowHeight / 2);
      }
    }, { passive: true });
  }

  // Render loop with smooth spring lerp (linear interpolation)
  function renderParallaxLoop() {
    if (!prefersReducedMotion) {
      // Smooth lerp: current += (target - current) * factor
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Parallax on Photo Wrapper & Person Container
      if (photoContainer) {
        const rotateY = mouse.x * 12; // deg
        const rotateX = -mouse.y * 10; // deg
        const transX = mouse.x * 16; // px
        const transY = mouse.y * 12; // px

        photoContainer.style.transform = `translate3d(${transX}px, ${transY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Parallax on Background Photo Layer (Subtle Deep Plane)
      if (bgPhotoLayer) {
        const bgX = -mouse.x * 14;
        const bgY = -mouse.y * 10;
        bgPhotoLayer.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;
      }

      // Parallax on Hero Watermark Silhouette
      if (heroWatermarkPhoto) {
        const wmX = -mouse.x * 22;
        const wmY = -mouse.y * 16;
        heroWatermarkPhoto.style.transform = `translate(calc(-50% + ${wmX}px), calc(-50% + ${wmY}px))`;
      }

      // Parallax on Floating Badges at different depths
      floatingBadges.forEach((badge, idx) => {
        const factor = (idx + 1) * 15;
        const bX = -mouse.x * factor;
        const bY = -mouse.y * factor;
        badge.style.transform = `translate3d(${bX}px, ${bY}px, 0)`;
      });
    }

    requestAnimationFrame(renderParallaxLoop);
  }

  /* ==========================================================================
     4. INTERACTIVE CANVAS PARTICLES (Futuristic Constellation Network)
     ========================================================================== */
  function initParticlesNetwork() {
    if (!particlesCanvas) return;
    const ctx = particlesCanvas.getContext('2d');
    if (!ctx) return;

    let width = (particlesCanvas.width = window.innerWidth);
    let height = (particlesCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = particlesCanvas.width = window.innerWidth;
      height = particlesCanvas.height = window.innerHeight;
    });

    const particleCount = windowWidth < 768 ? 25 : 55;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        // Connect near neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - dist / 110) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  /* ==========================================================================
     5. STATS COUNTER ANIMATION
     ========================================================================== */
  function initCounterObserver() {
    const statElements = document.querySelectorAll('.stat-counter-number');
    if (!statElements.length) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statElements.forEach(el => {
            const target = parseInt(el.dataset.target, 10) || 0;
            animateValue(el, 0, target, 1800);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('aboutStatsRow');
    if (statsSection) observer.observe(statsSection);
  }

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * (end - start) + start);
      obj.textContent = current + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end + '+';
      }
    };
    window.requestAnimationFrame(step);
  }

  /* ==========================================================================
     6. SKILL BARS ANIMATION ON SCROLL
     ========================================================================== */
  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-progress-fill');
    bars.forEach(bar => {
      const level = bar.dataset.level || 0;
      bar.style.width = level + '%';
    });
  }

  function initSkillsObserver() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }

  /* ==========================================================================
     7. NAVBAR SCROLL & ACTIVE SCROLLSPY
     ========================================================================== */
  function initNavbarScroll() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Blur navbar
      if (navbar) {
        if (scrollPos > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Back to top button
      if (scrollTopBtn) {
        if (scrollPos > 450) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     8. CATEGORY FILTER TABS
     ========================================================================== */
  function initFilterTabs() {
    // Skills filter tabs
    const skillTabs = document.querySelectorAll('.skill-filter-tab');
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category || 'all';
        renderSkills(data.skills || [], category);
      });
    });

    // Projects filter tabs
    const projectTabs = document.querySelectorAll('.project-filter-tab');
    projectTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        projectTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category || 'all';
        renderProjects(data.projects || [], category);
      });
    });
  }

  /* ==========================================================================
     9. PROJECT QUICK-VIEW MODAL
     ========================================================================== */
  function attachProjectModalTriggers() {
    const modalEl = document.getElementById('projectQuickViewModal');
    if (!modalEl || !window.bootstrap) return;
    const bsModal = new window.bootstrap.Modal(modalEl);

    const buttons = document.querySelectorAll('.btn-quick-view');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.dataset.projectId;
        const project = (data.projects || []).find(p => p.id === projectId);
        if (!project) return;

        // Populate modal fields
        const modalTitle = document.getElementById('modalProjectTitle');
        const modalImg = document.getElementById('modalProjectImg');
        const modalCategory = document.getElementById('modalProjectCategory');
        const modalDesc = document.getElementById('modalProjectDesc');
        const modalTech = document.getElementById('modalProjectTech');
        const modalStats = document.getElementById('modalProjectStats');
        const modalDemoBtn = document.getElementById('modalProjectDemoBtn');
        const modalCodeBtn = document.getElementById('modalProjectCodeBtn');

        if (modalTitle) modalTitle.textContent = project.name;
        if (modalImg) modalImg.src = project.image;
        if (modalCategory) modalCategory.textContent = project.categoryLabel;
        if (modalDesc) modalDesc.textContent = project.description;
        if (modalStats) modalStats.textContent = project.stats || 'Production Ready';

        if (modalTech) {
          modalTech.innerHTML = project.technologies.map(t => 
            `<span class="badge bg-dark border border-secondary text-info px-2 py-1">${t}</span>`
          ).join(' ');
        }

        if (modalDemoBtn) modalDemoBtn.href = project.liveUrl || '#';
        if (modalCodeBtn) modalCodeBtn.href = project.githubUrl || 'https://github.com/mhrahul';

        bsModal.show();
      });
    });
  }

  /* ==========================================================================
     10. 3D CARD TILT EFFECT (Subtle & High-Performance)
     ========================================================================== */
  function init3DCardTilt() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.addEventListener('mousemove', (e) => {
      const target = e.target.closest('[data-tilt]');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const tiltX = -deltaY * 6; // max 6deg
      const tiltY = deltaX * 6;  // max 6deg

      target.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tilt]');
      if (target) {
        target.style.transform = '';
      }
    });
  }

  /* ==========================================================================
     11. INTERACTIVE CONTACT FORM & QUICK COPY
     ========================================================================== */
  function initContactInteractions() {
    // Quick Copy for Email & Phone
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn && data.contact) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data.contact.email).then(() => {
          const original = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-check text-success"></i> Copied!';
          setTimeout(() => { copyEmailBtn.innerHTML = original; }, 2000);
        });
      });
    }

    const copyPhoneBtn = document.getElementById('copyPhoneBtn');
    if (copyPhoneBtn && data.contact) {
      copyPhoneBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(data.contact.phone).then(() => {
          const original = copyPhoneBtn.innerHTML;
          copyPhoneBtn.innerHTML = '<i class="fa-solid fa-check text-success"></i> Copied!';
          setTimeout(() => { copyPhoneBtn.innerHTML = original; }, 2000);
        });
      });
    }

    // Service request auto-select in contact message
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.select-service-cta');
      if (btn) {
        const serviceName = btn.dataset.serviceName;
        const msgField = document.getElementById('contactMessage');
        if (msgField && serviceName) {
          msgField.value = `Hi MH Rahul, I am interested in your "${serviceName}" service for my project.`;
          msgField.focus();
        }
      }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('portfolioContactForm');
    const formFeedback = document.getElementById('formFeedbackAlert');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
          showFormAlert('Please fill in all required fields (Name, Email, Message).', 'danger');
          return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';

        // Simulate seamless async dispatch
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          contactForm.reset();
          showFormAlert(`Thank you, ${name}! Your message has been sent successfully. I will get back to you within 2 hours.`, 'success');
        }, 1200);
      });
    }

    function showFormAlert(msg, type) {
      if (!formFeedback) return;
      formFeedback.className = `alert alert-${type} mt-3 d-block`;
      formFeedback.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check text-success' : 'fa-triangle-exclamation text-danger'} me-2"></i> ${msg}`;
      setTimeout(() => {
        formFeedback.className = 'alert d-none';
      }, 6000);
    }
  }

  /* ==========================================================================
     11. PHOTO & BACKGROUND STUDIO CUSTOMIZER
     ========================================================================== */
  function initPhotoStudio() {
    const dropzone = document.getElementById('photoDropzone');
    const fileInput = document.getElementById('photoFileInput');
    const browseBtn = document.getElementById('btnBrowsePhoto');
    const toggleBg = document.getElementById('toggleBgPhotoCheck');
    const opacityRange = document.getElementById('bgPhotoOpacityRange');
    const opacityText = document.getElementById('bgOpacityValueText');
    const themeBtns = document.querySelectorAll('.bg-theme-btn');
    const resetBtn = document.getElementById('btnResetPhotoDefaults');
    const statusMsg = document.getElementById('photoStatusMessage');

    const previewHero = document.getElementById('previewHeroImg');
    const previewBg = document.getElementById('previewBgImg');
    const heroImg = document.getElementById('heroProfileImg');

    // Sync current values from localStorage or data
    const savedOpacity = localStorage.getItem('mh_bg_photo_opacity');
    if (savedOpacity && opacityRange && opacityText) {
      const pct = Math.round(parseFloat(savedOpacity) * 100);
      opacityRange.value = pct;
      opacityText.textContent = pct + '%';
    }

    const savedEnabled = localStorage.getItem('mh_bg_photo_enabled');
    if (savedEnabled !== null && toggleBg) {
      toggleBg.checked = savedEnabled === 'true';
    }

    const savedTheme = localStorage.getItem('mh_bg_photo_theme');
    if (savedTheme) {
      themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === savedTheme);
      });
    }

    // Browse file trigger
    if (browseBtn && fileInput) {
      browseBtn.addEventListener('click', () => fileInput.click());
    }

    // File input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processPhotoFile(e.target.files[0]);
        }
      });
    }

    // Drag and drop listeners
    if (dropzone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-active');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-active');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files[0]) {
          processPhotoFile(dt.files[0]);
        }
      });
    }

    function processPhotoFile(file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (PNG, JPG, WebP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;

        // Apply immediately to hero, background, and watermark
        if (heroImg) heroImg.src = dataUrl;
        if (bgPhotoImg) bgPhotoImg.src = dataUrl;
        if (heroWatermarkImg) heroWatermarkImg.src = dataUrl;

        // Update previews in modal
        if (previewHero) previewHero.src = dataUrl;
        if (previewBg) previewBg.src = dataUrl;

        // Save in browser localStorage for persistence across reloads
        try {
          localStorage.setItem('mh_profile_photo', dataUrl);
          localStorage.setItem('mh_bg_photo', dataUrl);
        } catch (err) {
          console.warn('Storage quota exceeded for local preview:', err);
        }

        flashStatusMessage('Photo updated in background and hero!');
      };
      reader.readAsDataURL(file);
    }

    // Background Photo Toggle switch
    if (toggleBg && bgPhotoLayer) {
      toggleBg.addEventListener('change', () => {
        const isChecked = toggleBg.checked;
        bgPhotoLayer.style.display = isChecked ? 'block' : 'none';
        localStorage.setItem('mh_bg_photo_enabled', isChecked ? 'true' : 'false');
      });
    }

    // Opacity Range Slider
    if (opacityRange && opacityText && bgPhotoLayer) {
      opacityRange.addEventListener('input', () => {
        const decimal = opacityRange.value / 100;
        bgPhotoLayer.style.opacity = decimal;
        opacityText.textContent = opacityRange.value + '%';
        localStorage.setItem('mh_bg_photo_opacity', decimal);
      });
    }

    // Background Theme Mode Selectors
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.theme;
        if (bgPhotoLayer) {
          bgPhotoLayer.className = `bg-photo-layer theme-${theme}`;
        }
        localStorage.setItem('mh_bg_photo_theme', theme);
      });
    });

    // Reset Defaults
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem('mh_profile_photo');
        localStorage.removeItem('mh_bg_photo');
        localStorage.removeItem('mh_bg_photo_opacity');
        localStorage.removeItem('mh_bg_photo_enabled');
        localStorage.removeItem('mh_bg_photo_theme');

        const defProfile = (data.profile && data.profile.profilePhoto) || 'assets/images/profile.png';
        const defBg = (data.profile && data.profile.backgroundPhoto) || 'assets/images/hero_bg.jpg';
        const defOpacity = (data.profile && data.profile.backgroundPhotoOpacity) || 0.38;

        if (heroImg) heroImg.src = defProfile;
        if (bgPhotoImg) bgPhotoImg.src = defBg;
        if (heroWatermarkImg) heroWatermarkImg.src = defProfile;
        if (previewHero) previewHero.src = defProfile;
        if (previewBg) previewBg.src = defBg;

        if (bgPhotoLayer) {
          bgPhotoLayer.style.display = 'block';
          bgPhotoLayer.style.opacity = defOpacity;
          bgPhotoLayer.className = 'bg-photo-layer theme-cyber-ambient';
        }

        if (toggleBg) toggleBg.checked = true;
        if (opacityRange && opacityText) {
          opacityRange.value = Math.round(defOpacity * 100);
          opacityText.textContent = opacityRange.value + '%';
        }

        themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === 'cyber-ambient'));

        flashStatusMessage('Reset to original photos!');
      });
    }

    function flashStatusMessage(text) {
      if (!statusMsg) return;
      statusMsg.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> ${text}`;
      statusMsg.classList.remove('d-none');
      setTimeout(() => statusMsg.classList.add('d-none'), 3500);
    }
  }

  /* ==========================================================================
     12. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    populatePortfolioData();
    initHeroEntrance();
    renderParallaxLoop();
    initParticlesNetwork();
    initCounterObserver();
    initSkillsObserver();
    initNavbarScroll();
    initFilterTabs();
    init3DCardTilt();
    initContactInteractions();
    initPhotoStudio();
  });

})();
