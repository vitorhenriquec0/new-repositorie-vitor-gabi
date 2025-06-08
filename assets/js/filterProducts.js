document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    searchInput.addEventListener('input', function () {
        // Atualiza a lista de produtos a cada pesquisa
        const allProducts = Array.from(document.querySelectorAll('.product-item')).map(item => ({
            nome: item.querySelector('h4')?.textContent || '',
            descricao: item.querySelector('p')?.textContent || '',
            preco: item.querySelector('.product-price')?.textContent || '',
            imagem: item.querySelector('img')?.src || '',
        }));

        const termo = this.value.trim().toLowerCase();
        if (!termo) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        const filtrados = allProducts.filter(prod =>
            prod.nome.toLowerCase().includes(termo) ||
            prod.descricao.toLowerCase().includes(termo)
        );

        if (filtrados.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
        } else {
            resultsContainer.innerHTML = filtrados.map(prod => `
        <div class="product-item">
    <div class="product-row">
      <img src="${prod.imagem}" alt="${prod.nome}">
      <div class="product-texts">
        <h4>${prod.nome}</h4>
        <p>${prod.descricao}</p>
      </div>
    </div>
    <div class="product-bottom">
      <span class="product-price">${prod.preco}</span>
      <div class="product-actions">
        <button class="add-to-cart"><span class="fa fa-shopping-cart"></span></button>
        <button class="view-details"><span class="fa fa-plus"></span></button>
      </div>
    </div>
  </div>
      `).join('');
        }
        resultsContainer.classList.add('active');
    });

    // Esconde a caixa se clicar fora
    document.addEventListener('click', (e) => {
        if (!resultsContainer.contains(e.target) && e.target !== searchInput) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
        }
    });
});