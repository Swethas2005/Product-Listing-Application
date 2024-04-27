document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');

    // fetch and display products
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        });

    
    function fetchAndDisplayProducts() {
        const category = categorySelect.value;
        const search = searchInput.value.trim().toLowerCase();
        const sort = sortSelect.value;

        let url = 'https://fakestoreapi.com/products';
        if (category) {
            url += `/category/${category}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(products => {
                if (search) {
                    products = products.filter(product =>
                        product.title.toLowerCase().includes(search)
                    );
                }
                if (sort === 'asc') {
                    products.sort((Low,High) => Low.price -     High.price);
                } else if (sort === 'desc') {
                    products.sort((Low,High) => High.price -     Low.price);
                }
                displayProducts(products);
            });
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">   
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productsContainer.appendChild(productItem);
        });
    }

    
    categorySelect.addEventListener('change', fetchAndDisplayProducts);
    searchInput.addEventListener('input', fetchAndDisplayProducts);
    sortSelect.addEventListener('change', fetchAndDisplayProducts);

    
    fetchAndDisplayProducts();
});
