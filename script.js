/* ==========================================================================
   NESTPOINT PG — SHARED SCRIPT
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
     3. ENQUIRY / BOOKING FORM HANDLING
     Why: the site has no backend yet, so form submissions are intercepted
     here and shown as a friendly on-page confirmation instead of a real
     network call. Replace the marked section with a fetch() to your
     booking API or a service like Formspree when one is ready.
     ------------------------------------------------------------------------ */
  document.querySelectorAll("form[data-enquiry-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // ---- CUSTOMIZE: send form data to your backend / email service here ----
      // Example:
      // fetch("https://your-api.example.com/enquiries", {
      //   method: "POST",
      //   body: new FormData(form)
      // });

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
     5. STICKY HEADER SHADOW ON SCROLL
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

});
