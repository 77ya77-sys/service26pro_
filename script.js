(function () {
  "use strict";

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
