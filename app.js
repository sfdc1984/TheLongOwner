
document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const discoverySearch = document.querySelector('[data-discovery-search]');
  if (discoverySearch) {
    const items = document.querySelectorAll('[data-discovery-item]');
    const emptyState = document.getElementById('discovery-empty');

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    if (initialQuery) discoverySearch.value = initialQuery;

    function applyFilter() {
      const query = discoverySearch.value.trim().toLowerCase();
      let visibleCount = 0;
      items.forEach(item => {
        const haystack = (item.getAttribute('data-search-text') || '') + ' ' + item.textContent.toLowerCase();
        const matches = query === '' || haystack.toLowerCase().includes(query);
        item.classList.toggle('search-hidden', !matches);
        if (matches) visibleCount++;
      });
      if (emptyState) emptyState.classList.toggle('search-hidden', visibleCount !== 0);
    }

    discoverySearch.addEventListener('input', applyFilter);
    applyFilter();
  }

  document.querySelectorAll('.value:not([data-ownership-day])').forEach(el => {
    const target = parseInt(el.textContent.replace(/,/g,''),10);
    if (isNaN(target)) return;

    let start = null;
    function step(ts){
      if(!start) start = ts;
      const p = Math.min((ts-start)/1400,1);
      const value = Math.floor(target*(1-Math.pow(1-p,3)));
      el.textContent = value.toLocaleString();
      if(p<1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  });


  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.animate(
          [
            {opacity:0, transform:"translateY(24px)"},
            {opacity:1, transform:"translateY(0)"}
          ],
          {duration:700, easing:"ease-out", fill:"forwards"}
        );
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15});

 // First calculate ownership days
  const since = new Date("2024-01-18");
  const days = Math.floor((Date.now()-since.getTime())/86400000);
  document.querySelectorAll("[data-ownership-day]").forEach(e=>e.textContent=days);

// Then animate all counters
  document.querySelectorAll(".card").forEach(card=>{
    card.style.opacity="0";
    observer.observe(card);
  });

});
