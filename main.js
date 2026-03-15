// Função para criar elementos flutuantes
function createFloatingElements() {
  const floatingBackground = document.getElementById("floatingBackground");
  const numElements = 15; // Número de elementos flutuantes

  for (let i = 0; i < numElements; i++) {
    const element = document.createElement("div");
    const randomShape = Math.floor(Math.random() * 6) + 1;
    element.classList.add("floating-element", `shape-${randomShape}`);

    // Posição inicial aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;

    // Tamanho aleatório
    const sizeFactor = 0.7 + Math.random() * 0.6;
    element.style.transform = `scale(${sizeFactor})`;

    floatingBackground.appendChild(element);

    // Iniciar animação para este elemento
    animateFloatingElement(element);
  }
}

// Função para animar os elementos flutuantes
function animateFloatingElement(element) {
  // Tempo aleatório para aparecer
  const initialDelay = Math.random() * 5000;

  setTimeout(() => {
    showAndMoveElement(element);
  }, initialDelay);
}

function showAndMoveElement(element) {
  element.classList.add("visible");

  // Mover o elemento
  const moveDuration = 20000 + Math.random() * 20000; // 20-40 segundos
  const newX = Math.random() * 100;
  const newY = Math.random() * 100;

  element.style.transition = `left ${moveDuration}ms linear, top ${moveDuration}ms linear, opacity 3s ease-in-out`;
  element.style.left = `${newX}%`;
  element.style.top = `${newY}%`;

  // Depois de se mover, desaparecer e reiniciar
  setTimeout(() => {
    hideElementAndReset(element);
  }, moveDuration);
}

function hideElementAndReset(element) {
  element.classList.remove("visible");

  setTimeout(() => {
    repositionAndRestart(element);
  }, 2000);
}

function repositionAndRestart(element) {
  // Reposicionar e reiniciar animação
  element.style.transition = "none";
  const newStartX = Math.random() * 100;
  const newStartY = Math.random() * 100;
  element.style.left = `${newStartX}%`;
  element.style.top = `${newStartY}%`;

  // Pequeno delay antes de reiniciar
  setTimeout(() => {
    animateFloatingElement(element);
  }, 1000);
}

// Evento que executa após o DOM carregar completamente.
document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DO CURSOR PERSONALIZADO
  const cursor = document.querySelector(".cursor");
  const interactiveElements = document.querySelectorAll(
    "a, button, .toggle-btn, .portfolio-item"
  );

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseover", () =>
      cursor.classList.add("hover-effect")
    );
    el.addEventListener("mouseout", () =>
      cursor.classList.remove("hover-effect")
    );
  });

  // 2. LÓGICA PARA TROCA DE CARDS DE SERVIÇOS
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
    }
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
            `.main-nav a[href="#${id}"]`
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
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // 5. CARROSSEL AUTOMÁTICO INFINITO NA GALERIA DE PORTFÓLIO
  // Apenas em desktop - em mobile, a galeria é vertical
  if (window.innerWidth > 768) {
    const gallery = document.querySelector(".portfolio-gallery");
    if (gallery) {
      // Já dupliquei os itens no HTML para melhor performance
    }
  }
});
