// Soliton microcomb spectrum: sech^2 envelope on a dB scale, with the pump line on top.
(function () {
  var svg = document.querySelector(".comb");
  var ns = "http://www.w3.org/2000/svg";
  var N = 61, W = 740, H = 88, mid = (N - 1) / 2;
  var width = 5, range = 50; // envelope width in lines, plotted dynamic range in dB
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);
  svg.innerHTML =
    '<defs><linearGradient id="comb-fill" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + W + '" y2="0">' +
    '<stop offset="0" stop-color="#4f8df5"/><stop offset="1" stop-color="#7a5af5"/></linearGradient></defs>';
  for (var i = 0; i < N; i++) {
    var sech = 1 / Math.cosh((i - mid) / width);
    var dB = 20 * Math.log10(sech);
    var h = i === mid ? H : Math.max(3, 0.8 * H * (1 + dB / range));
    var r = document.createElementNS(ns, "rect");
    r.setAttribute("x", ((i + 0.5) * W / N - 1.25).toFixed(1));
    r.setAttribute("y", (H - h).toFixed(1));
    r.setAttribute("width", 2.5);
    r.setAttribute("height", h.toFixed(1));
    r.setAttribute("rx", 1.25);
    if (i === mid) r.setAttribute("class", "pump");
    r.style.animationDelay = Math.abs(i - mid) * 22 + "ms";
    svg.appendChild(r);
  }
})();

document.querySelectorAll("a.email").forEach(function (a) {
  a.href = "mailto:" + a.dataset.user + "@" + a.dataset.domain;
});

document.querySelector(".theme-toggle").addEventListener("click", function () {
  var root = document.documentElement;
  var current = root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  var next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

// Highlight the sidebar link for the section currently being read (wide screens only).
(function () {
  var links = document.querySelectorAll(".toc a");
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  var ticking = false;

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.35;
    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec.getBoundingClientRect().top <= line) current = i;
    });
    // Short sections at the end can never reach the line; pick the last one at the bottom.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach(function (a, i) { a.classList.toggle("active", i === current); });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
