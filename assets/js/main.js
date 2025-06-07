document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.target === "_blank") return; // ignora links externos
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location = this.href;
    }, 400); // tempo da animação
  });
});