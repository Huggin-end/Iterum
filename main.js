// Evento que executa após o DOM carregar completamente.
document.addEventListener("DOMContentLoaded", () => {
  // 1. CURSOR PERSONALIZADO
  const cursor = document.querySelector(".cursor");
  const interactiveElements = document.querySelectorAll(
    "a, button, .toggle-btn",
  );

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseover", () =>
      cursor.classList.add("hover-effect"),
    );
    el.addEventListener("mouseout", () =>
      cursor.classList.remove("hover-effect"),
    );
  });

  // 2. TROCA DE CARDS DE SERVIÇOS
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const cards = document.querySelectorAll(".card");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      cards.forEach((card) => card.classList.remove("active"));

      button.classList.add("active");
      const targetCardId = button.dataset.target;
      document.getElementById(targetCardId).classList.add("active");
    });
  });

  // 3. ANIMAÇÃO DE FADE-IN AO ROLAR A PÁGINA
  const fadeInElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });

  // 4. ESTADO ATIVO NA NAVEGAÇÃO
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          const activeLink = document.querySelector(
            `.main-nav a[href="#${id}"]`,
          );
          navLinks.forEach((link) => link.classList.remove("nav-active"));
          if (activeLink) {
            activeLink.classList.add("nav-active");
          }
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  // DUPLICAR ITENS PARA LOOP INFINITO
  const tracks = document.querySelectorAll(".portfolio-track");

  function setupCarousel(track) {
    // remove clones antigos
    track.querySelectorAll(".clone").forEach((el) => el.remove());

    const items = [...track.children];

    // duplica sempre, independente do tamanho da tela
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.classList.add("clone");
      track.appendChild(clone);
    });
  }
  
  tracks.forEach((track) => {
    const itemsCount = track.children.length;
    track.style.animationDuration = `${itemsCount * 2}s`; // 2s por item
  });

  // init
  function initCarousels() {
    tracks.forEach((track) => setupCarousel(track));
  }
  initCarousels();

  // resize inteligente
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initCarousels, 200);
  });

  // pausa fora da tela
  const wrapper = document.querySelector(".portfolio-wrapper");
  const observer1 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        tracks.forEach((track) => {
          track.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused";
        });
      });
    },
    { threshold: 0.2 },
  );
  if (wrapper) observer1.observe(wrapper);

  sections.forEach((section) => {
    navObserver.observe(section);
  });
});
