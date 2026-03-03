(function () {
  "use strict";

  function initCookieBanner() {
    var COOKIE_ACCEPT_KEY = "service26pro_cookie_accepted";
    var cookieBanner = document.getElementById("cookie-banner");
    var cookieAccept = document.getElementById("cookie-banner-accept");
    if (!cookieBanner || !cookieAccept) return;
    if (localStorage.getItem(COOKIE_ACCEPT_KEY)) {
      cookieBanner.classList.add("is-hidden");
      return;
    }
    cookieBanner.style.display = "flex";
    cookieBanner.classList.remove("is-hidden");
    setTimeout(function () {
      cookieBanner.classList.add("cookie-visible");
    }, 80);
    cookieAccept.addEventListener("click", function () {
      localStorage.setItem(COOKIE_ACCEPT_KEY, "1");
      cookieBanner.classList.remove("cookie-visible");
      setTimeout(function () { cookieBanner.classList.add("is-hidden"); }, 400);
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieBanner);
  } else {
    initCookieBanner();
  }

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
    document.addEventListener("DOMContentLoaded", sync);
  })();

  var heroCta = document.getElementById("hero-cta");
  var stickyCta = document.getElementById("sticky-cta");
  if (heroCta && stickyCta) {
    var observer = new IntersectionObserver(
      function (entries) {
        var e = entries[0];
        if (!e) return;
        var showSticky = !e.isIntersecting;
        stickyCta.classList.toggle("is-visible", showSticky);
        stickyCta.setAttribute("aria-hidden", String(!showSticky));
        document.body.classList.toggle("sticky-cta-visible", showSticky);
      },
      { root: null, rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(heroCta);
  }

  var reviewsTrack = document.querySelector(".reviews-track");
  var reviewsPrev = document.querySelector(".reviews-prev");
  var reviewsNext = document.querySelector(".reviews-next");
  if (reviewsTrack && reviewsPrev && reviewsNext) {
    var cards = Array.from(reviewsTrack.querySelectorAll(".review-card"));
    var count = cards.length;
    if (count > 0) {
      var gap = 24;
      cards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        reviewsTrack.appendChild(clone);
      });
      var setWidth = 0;
      for (var i = 0; i < count; i++) setWidth += cards[i].offsetWidth + gap;
      setWidth -= gap;
      var jumping = false;
      function clampScroll() {
        if (jumping) return;
        var left = reviewsTrack.scrollLeft;
        if (left >= setWidth - 1) {
          jumping = true;
          reviewsTrack.scrollLeft = left - setWidth;
          requestAnimationFrame(function () { jumping = false; });
        }
      }
      reviewsTrack.addEventListener("scroll", clampScroll);
      reviewsTrack.addEventListener("scrollend", clampScroll);
      var lastTouchX = 0;
      reviewsTrack.addEventListener("touchstart", function (e) {
        lastTouchX = e.touches[0].clientX;
      }, { passive: true });
      reviewsTrack.addEventListener("touchmove", function (e) {
        if (reviewsTrack.scrollLeft <= 0 && e.touches[0].clientX > lastTouchX) {
          reviewsTrack.scrollLeft = setWidth;
        }
        lastTouchX = e.touches[0].clientX;
      }, { passive: true });
      reviewsTrack.addEventListener("wheel", function (e) {
        if (e.deltaX > 0 && reviewsTrack.scrollLeft <= 0) {
          reviewsTrack.scrollLeft = setWidth;
        }
      }, { passive: true });
      var step = cards[0].offsetWidth + gap;
      reviewsPrev.addEventListener("click", function () {
        if (reviewsTrack.scrollLeft <= 0) reviewsTrack.scrollLeft = setWidth;
        reviewsTrack.scrollBy({ left: -step, behavior: "smooth" });
      });
      reviewsNext.addEventListener("click", function () {
        reviewsTrack.scrollBy({ left: step, behavior: "smooth" });
      });
    }
  }

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
