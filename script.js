(function () {
  "use strict";

  (function initStepsCarousel() {
    var stepsGrid = document.querySelector(".steps-grid");
    if (!stepsGrid) return;
    var track = null;
    var savedConnectors = [];
    var isMobile = function () { return window.innerWidth <= 640; };

    function toCarousel() {
      if (track) return;
      var cards = stepsGrid.querySelectorAll(".step-card");
      var conns = stepsGrid.querySelectorAll(".step-connector");
      conns.forEach(function (span) {
        savedConnectors.push({ node: span, next: span.nextElementSibling });
        span.parentNode.removeChild(span);
      });
      track = document.createElement("div");
      track.className = "steps-track";
      cards.forEach(function (card) { track.appendChild(card); });
      stepsGrid.appendChild(track);
      stepsGrid.classList.add("steps-grid--carousel");
      stepsGrid.scrollLeft = 0;
    }

    function toDesktop() {
      if (!track) return;
      var cards = [].slice.call(track.querySelectorAll(".step-card"));
      stepsGrid.removeChild(track);
      track = null;
      stepsGrid.classList.remove("steps-grid--carousel");
      cards.forEach(function (card) { stepsGrid.appendChild(card); });
      while (savedConnectors.length) {
        var c = savedConnectors.pop();
        if (c.next) stepsGrid.insertBefore(c.node, c.next);
        else stepsGrid.appendChild(c.node);
      }
    }

    function sync() {
      if (isMobile()) {
        toCarousel();
        stepsGrid.scrollLeft = 0;
      } else {
        toDesktop();
      }
    }

    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("pageshow", function (e) { if (e.persisted) sync(); });
    window.addEventListener("load", function () {
      sync();
      if (stepsGrid && isMobile()) stepsGrid.scrollLeft = 0;
    });
  })();

  var heroCta = document.getElementById("hero-cta");
  var stickyCta = document.getElementById("sticky-cta");
  if (heroCta && stickyCta) {
    function initSticky() {
      if (window.innerWidth <= 640) {
        stickyCta.setAttribute("aria-hidden", "false");
        document.body.classList.add("sticky-cta-visible");
        return;
      }
      stickyCta.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sticky-cta-visible");
      var debounceTimer = null;
      var observer = new IntersectionObserver(
        function (entries) {
          var e = entries[0];
          if (!e) return;
          var showSticky = !e.isIntersecting;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(function () {
            stickyCta.classList.toggle("is-visible", showSticky);
            stickyCta.setAttribute("aria-hidden", String(!showSticky));
            document.body.classList.toggle("sticky-cta-visible", showSticky);
          }, 80);
        },
        { root: null, rootMargin: "-72px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(heroCta);
    }
    if (window.innerWidth <= 640) {
      stickyCta.setAttribute("aria-hidden", "false");
      document.body.classList.add("sticky-cta-visible");
    } else {
      initSticky();
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 640) {
        stickyCta.setAttribute("aria-hidden", "false");
        document.body.classList.add("sticky-cta-visible");
      }
    });
  }

  var reviewsTrack = document.querySelector(".reviews-track");
  var reviewsPrev = document.querySelector(".reviews-prev");
  var reviewsNext = document.querySelector(".reviews-next");

  if (reviewsTrack && reviewsPrev && reviewsNext) {
    var cards = Array.from(reviewsTrack.querySelectorAll(".review-card"));
    if (cards.length > 0) {
      function updateButtons() {
        var scrollLeft = reviewsTrack.scrollLeft;
        var maxScrollLeft = reviewsTrack.scrollWidth - reviewsTrack.clientWidth;

        // Disabled visually via opacity if at ends (optional, you can also use disabled attribute)
        reviewsPrev.style.opacity = scrollLeft <= 0 ? "0.5" : "1";
        reviewsPrev.style.pointerEvents = scrollLeft <= 0 ? "none" : "auto";

        reviewsNext.style.opacity = scrollLeft >= maxScrollLeft - 1 ? "0.5" : "1";
        reviewsNext.style.pointerEvents = scrollLeft >= maxScrollLeft - 1 ? "none" : "auto";
      }

      var gap = 24;
      var getStep = function () {
        return cards[0].offsetWidth + gap;
      };

      reviewsPrev.addEventListener("click", function () {
        reviewsTrack.scrollBy({ left: -getStep(), behavior: "smooth" });
      });

      reviewsNext.addEventListener("click", function () {
        reviewsTrack.scrollBy({ left: getStep(), behavior: "smooth" });
      });

      reviewsTrack.addEventListener("scroll", updateButtons, { passive: true });
      window.addEventListener("resize", updateButtons, { passive: true });

      // Initial button state
      updateButtons();
    }
  }


  (function initBrandMarquee() {
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    var wrap = document.querySelector(".brand-logos-wrap");
    if (!wrap) return;

    var SET_WIDTH = 14 * 96 + 13 * 28 + 28;
    var DURATION_MS = 28000;
    var pxPerMs = SET_WIDTH / DURATION_MS;
    var maxDt = 18;
    var offset = 0;
    var lastT = null;

    function tick(t) {
      if (lastT === null) lastT = t;
      var dt = Math.min(t - lastT, maxDt);
      lastT = t;
      offset -= pxPerMs * dt;
      if (offset <= -SET_WIDTH) offset += SET_WIDTH;
      wrap.style.setProperty("--marquee-offset", Math.round(offset * 100) / 100 + "px");
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var answer = item.querySelector(".faq-answer");
      var isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
  });
})();
