const categoriesEl = document.getElementById("categories");
const treeCardsEl = document.getElementById("tree-cards");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

let cart = [];

// Fetch categories
async function loadCategories() {
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  const categories = data.data;

  // Add "All Trees" manually
  categoriesEl.innerHTML = `
    <li><button class="category-btn w-full text-left px-3 py-2 bg-green-600 text-white rounded" data-category="all">All Trees</button></li>
  `;
  categories.forEach(cat => {
    categoriesEl.innerHTML += `
      <li>
        <button class="category-btn w-full text-left px-3 py-2 rounded hover:bg-green-100" data-category="${cat.category}">
          ${cat.category}
        </button>
      </li>
    `;
  });

  // Add event listeners
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("bg-green-600", "text-white"));
      btn.classList.add("bg-green-600", "text-white");
      loadTrees(btn.dataset.category);
    });
  });
}

// Fetch and display trees
async function loadTrees(category = "all") {
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  let trees = data.data;

  if (category !== "all") {
    trees = trees.filter(tree => tree.category === category);
  }

  treeCardsEl.innerHTML = trees.map(tree => `
    <div class="bg-white shadow rounded-xl p-3">
      <div class="bg-gray-200 h-40 rounded-md"></div>
      <h4 class="font-bold mt-2">${tree.plant_name}</h4>
      <p class="text-sm text-gray-600">${tree.description.slice(0, 70)}...</p>
      <span class="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">${tree.category}</span>
      <p class="font-bold mt-2">৳${tree.price}</p>
      <button class="mt-2 w-full bg-green-600 text-white rounded-full py-2 hover:bg-green-700 add-to-cart" 
        data-id="${tree.plant_id}" 
        data-name="${tree.plant_name}" 
        data-price="${tree.price}">
        Add to Cart
      </button>
    </div>
  `).join("");

  // Add to cart functionality
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      cart.push({ name, price });
      renderCart();
    });
  });
}

// Render cart
function renderCart() {
  cartItemsEl.innerHTML = cart.map((item, index) => `
    <li class="flex justify-between items-center">
      <span>${item.name}</span>
      <span>৳${item.price}</span>
      <button class="text-red-500 text-sm" onclick="removeFromCart(${index})">x</button>
    </li>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = "৳" + total;
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Initialize
loadCategories();
loadTrees();
