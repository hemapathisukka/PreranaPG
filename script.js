/* ==========================================================================
   Prerana PG — SHARED SCRIPT
   Loaded on index.html, boys.html and girls.html. Each block below is one
   small, independent feature — safe to delete any block without breaking
   the others.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------------------
     1. MOBILE NAV TOGGLE
     Why: nav links collapse under a hamburger button below 920px; this
     opens/closes that menu and auto-closes it after a link is tapped so
     the site feels native on phones.
     ------------------------------------------------------------------------ */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. ACTIVE NAV LINK HIGHLIGHTING
     Why: marks the current page's nav item so visitors always know where
     they are across the 3-page site (index / boys / girls).
     ------------------------------------------------------------------------ */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href").split("#")[0];
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

 /* ------------------------------------------------------------------------
     3. ENQUIRY / BOOKING FORM → WHATSAPP
     Why: the site has no backend, so instead of silently doing nothing,
     submitting a form opens WhatsApp in a new tab with the visitor's
     details pre-filled as a message to the PG's number. The visitor just
     has to tap Send in WhatsApp to complete the enquiry.
     To switch to email/SMS/a real backend later, replace the body of this
     submit handler with your own fetch() call.
     ------------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = "918884913332"; // ---- CUSTOMIZE: your WhatsApp business number (country code, no + or spaces) ----

  var FORM_FIELD_LABELS = {
    name: "Name",
    phone: "Phone",
    email: "Email",
    roomType: "Room Type",
    moveInDate: "Preferred Move-in Date",
    message: "Message"
  };

  function buildWhatsAppMessage(form) {
    var data = new FormData(form);
    var pageLabel = document.title.split("|")[0].trim();
    var lines = ["New enquiry from the " + pageLabel + " website:"];
    Object.keys(FORM_FIELD_LABELS).forEach(function (key) {
      var value = data.get(key);
      if (value) {
        lines.push(FORM_FIELD_LABELS[key] + ": " + value);
      }
    });
    return lines.join("\n");
  }

  document.querySelectorAll("form[data-enquiry-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var message = buildWhatsAppMessage(form);
      var whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      window.open(whatsappUrl, "_blank", "noopener");
						  
								   
			

      var successBox = form.parentElement.querySelector(".form-success");
      if (successBox) {
        successBox.classList.add("show");
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }
      form.reset();
    });
  });


  /* ------------------------------------------------------------------------
     4. ROOM "ENQUIRE NOW" QUICK-FILL
     Why: tapping "Enquire Now" on a specific room card jumps to the
     booking form on the same page and pre-fills the Room Type field, so
     the visitor doesn't have to re-select it.
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-enquire-room]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var roomType = btn.getAttribute("data-enquire-room");
      var select = document.querySelector("#roomType");
      if (select) {
        select.value = roomType;
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. GALLERY CAROUSEL
     Why: the Boys and Girls Gallery sections show one photo at a time,
     auto-advancing every few seconds, instead of a static grid. Skips the
     auto-advance (but still shows the first photo) if the visitor's
     system prefers reduced motion.
     ------------------------------------------------------------------------ */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var slides = carousel.querySelectorAll("img");
    if (slides.length < 2 || prefersReducedMotion) return;

    var current = 0;
    setInterval(function () {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 3500);
  });

  /* ------------------------------------------------------------------------
     6. STICKY HEADER SHADOW ON SCROLL
     Why: adds a subtle shadow once the page scrolls, so the sticky nav
     reads as "lifted" above content instead of blending into it.
     ------------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 8
        ? "0 6px 18px rgba(11,59,84,0.10)"
        : "none";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     7. CALL NUMBER PICKER
     Why: the floating phone button opens a small list so visitors can choose
     which of the two numbers to call. Closes on outside tap or Escape.
     ------------------------------------------------------------------------ */
  var callBtn = document.getElementById("callBtn");
  var callMenu = document.getElementById("callMenu");
  if (callBtn && callMenu) {
    var setMenu = function (open) {
      callMenu.hidden = !open;
      callBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    callBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(callMenu.hidden);
    });
    document.addEventListener("click", function (e) {
      if (!callMenu.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

});
