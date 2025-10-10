document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     🔹 1️⃣ FUNCIONES GLOBALES (válidas para todo el sitio)
  =================================================== */

  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // === Activar modo oscuro ===
  function activarModoOscuro() {
    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "enabled") {
      body.classList.add("dark-mode");
      updateIcons(true);
      toggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", isDark ? "enabled" : "disabled");
        toggle.innerHTML = isDark
          ? '<i class="fas fa-moon"></i>'
          : '<i class="fas fa-sun"></i>';
        updateIcons(isDark);
      });
    }
  }

  // === Cambiar iconos de redes (GitHub y TikTok) ===
  function updateIcons(isDark) {
    const githubLogo = document.querySelector(".github-icon");
    const tiktokLogo = document.querySelector(".tiktok-icon");

    if (githubLogo) {
      githubLogo.src = isDark
        ? githubLogo.getAttribute("data-dark")
        : githubLogo.getAttribute("data-light");
    }

    if (tiktokLogo) {
      tiktokLogo.src = isDark
        ? tiktokLogo.getAttribute("data-dark")
        : tiktokLogo.getAttribute("data-light");
    }
  }

  // 🔹 Ejecutar funciones globales
  activarModoOscuro();

  /* ===================================================
     🔹 2️⃣ CÓDIGO POR PÁGINA (se ejecuta según la URL)
  =================================================== */

  const path = window.location.pathname;

  if (path.includes("index.html") || path.endsWith("/")) {
    console.log("🏠 Página principal");
    // Aquí puedes poner animaciones o interacciones solo para el index
  }

  if (path.includes("sobre-mi.html")) {
  console.log("👤 Página: Sobre mí");

  // Animar barras de habilidades
  const skills = document.querySelectorAll(".progress");
  skills.forEach((bar) => {
    const value = bar.getAttribute("style");
    bar.style.width = "0";
    setTimeout(() => {
      bar.setAttribute("style", value);
    }, 400);
  });
}

  if (path.includes("proyectos.html")) {
    console.log("💻 Página: Proyectos");

    // --- Animación al cargar los proyectos ---
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100 * i);
    });

    // --- Hover con sombra más intensa ---
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.25)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "";
      });
    });

   // --- Aparición suave al hacer scroll ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

  }

if (path.includes("cuaderno.html")) {
  console.log("📘 Página: Cuaderno");

  // === Función para cerrar todo ===
  function cerrarTodo(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
    });
  }

  // === Abrir/cerrar semanas ===
  const semanaHeaders = document.querySelectorAll(".semana-header");

  semanaHeaders.forEach((header) => {
    header.addEventListener("click", (e) => {
      e.stopPropagation();

      const content = header.nextElementSibling;
      const isOpen = content.style.display === "block";

      // Cierra todo primero
      cerrarTodo(".semana-content");
      document.querySelectorAll(".semana-header").forEach((h) =>
        h.classList.remove("active")
      );

      // Abre la seleccionada
      if (!isOpen) {
        content.style.display = "block";
        content.style.maxHeight = "unset"; // 🔹 Evita que se corte
        content.style.overflow = "visible";
        header.classList.add("active");
      }
    });
  });

  // === Subacordeones (Definiciones, Ejercicios, Reflexión, Bibliografía) ===
  const subHeaders = document.querySelectorAll(".sub-header");

  subHeaders.forEach((sub) => {
    sub.addEventListener("click", (e) => {
      e.stopPropagation();

      const subContent = sub.nextElementSibling;
      const isVisible = subContent.style.display === "block";

      // Cierra solo los subacordeones de la misma semana
      const parent = sub.closest(".semana-content");
      parent.querySelectorAll(".sub-content").forEach((c) => {
        c.style.display = "none";
      });
      parent.querySelectorAll(".sub-header").forEach((h) =>
        h.classList.remove("active")
      );

      // Abre el actual
      if (!isVisible) {
        subContent.style.display = "block";
        subContent.style.maxHeight = "unset"; // 🔹 Permite contenido largo
        subContent.style.overflow = "visible";
        sub.classList.add("active");
      }
    });
  });

  // === Efecto visual en editables ===
  document.querySelectorAll(".editable").forEach((el) => {
    el.addEventListener("focus", () => (el.style.background = "#eef7ff"));
    el.addEventListener("blur", () => (el.style.background = "transparent"));
  });
}


});
