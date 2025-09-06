const categoriesEl = document.getElementById("categories");
const treeCardsEl = document.getElementById("tree-cards");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartAlert = document.getElementById("cart-alert");
const alertMessage = document.getElementById("alert-message");

// Modal elements
const treeModal = document.getElementById("tree-modal");
const modalTreeName = document.getElementById("modal-tree-name");
const modalTreeImage = document.getElementById("modal-tree-image");
const modalTreeCategory = document.getElementById("modal-tree-category");
const modalTreePrice = document.getElementById("modal-tree-price");
const modalTreeDescription = document.getElementById("modal-tree-description");
const modalClose = document.getElementById("modal-close");
const modalLoading = document.getElementById("modal-loading");
const modalContent = document.getElementById("modal-content");

let cart = [];
let currentTree = null;


// Fetch categories
async function loadCategories() {
  try {
    //  loading spinner
    categoriesEl.innerHTML = `
      <li class="text-center py-4">
        <i class="fa-solid fa-spinner fa-spin text-green-600 text-xl"></i>
        <p class="text-sm text-gray-600 mt-2">Loading categories...</p>
      </li>
    `;
    
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const categories = data.categories;

    // All Trees
    categoriesEl.innerHTML = `
      <li><button class="category-btn w-full text-left px-3 py-2 bg-green-600 text-white rounded" data-category="all">All Trees</button></li>
    `;
    
    categories.forEach(cat => {
      categoriesEl.innerHTML += `
        <li>
          <button class="category-btn w-full text-left px-3 py-2 rounded hover:bg-green-100" data-category="${cat.category_name}">
            ${cat.category_name}
          </button>
        </li>
      `;
    });

    // event listeners
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => {
          b.classList.remove("bg-green-600", "text-white");
          b.classList.add("hover:bg-green-100");
        });
        btn.classList.add("bg-green-600", "text-white");
        btn.classList.remove("hover:bg-green-100");
        loadTrees(btn.dataset.category);
      });
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    categoriesEl.innerHTML = `
      <li class="text-center py-4 text-red-600">
        <i class="fa-solid fa-triangle-exclamation text-xl"></i>
        <p class="text-sm mt-2">Failed to load categories</p>
      </li>
    `;
  }
}

// Fetch and display trees
async function loadTrees(category = "all") {
  try {
    // loading spinner
    treeCardsEl.innerHTML = `
      <div class="col-span-full text-center py-8">
        <i class="fa-solid fa-spinner fa-spin text-green-600 text-2xl"></i>
        <p class="text-gray-600 mt-2">Loading trees...</p>
      </div>
    `;
    
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    let trees = data.plants;

    if (category !== "all") {
      trees = trees.filter(tree => tree.category === category);
    }

    if (trees.length === 0) {
      treeCardsEl.innerHTML = `
        <div class="col-span-full text-center py-8">
          <i class="fa-solid fa-tree text-green-600 text-2xl"></i>
          <p class="text-gray-600 mt-2">No trees found in this category</p>
        </div>
      `;
      return;
    }

    treeCardsEl.innerHTML = trees.map(tree => `
      <div class="bg-white shadow rounded-xl p-3">
        <img src="${tree.image}" alt="${tree.name}" class="w-full h-40 object-cover rounded-md cursor-pointer tree-image" data-tree='${JSON.stringify(tree).replace(/'/g, "&#39;")}'>
        <h4 class="font-bold mt-2">${tree.name}</h4>
        <p class="text-sm text-gray-600">${tree.description.slice(0, 70)}...</p>
        <span class="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">${tree.category}</span>
        <p class="font-bold mt-2">৳${tree.price}</p>
        <button class="mt-2 w-full bg-green-600 text-white rounded-full py-2 hover:bg-green-700 add-to-cart" 
          data-id="${tree.id}" 
          data-name="${tree.name}" 
          data-price="${tree.price}">
          Add to Cart
        </button>
      </div>
    `).join("");

    // Add to cart function
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        addToCart({ name, price });
        
        // alert notification
        alert(`${name} added to cart!`);
      });
    });

    //  click functionality for modal
    document.querySelectorAll(".tree-image").forEach(img => {
      img.addEventListener("click", () => {
        const treeData = JSON.parse(img.dataset.tree.replace(/&#39;/g, "'"));
        showTreeModal(treeData);
      });
    });
  } catch (error) {
    console.error("Error loading trees:", error);
    treeCardsEl.innerHTML = `
      <div class="col-span-full text-center py-8 text-red-600">
        <i class="fa-solid fa-triangle-exclamation text-xl"></i>
        <p class="mt-2">Failed to load trees</p>
      </div>
    `;
  }
}

// tree modal
function showTreeModal(tree) {
  currentTree = tree;
  
  //  loading state 
  modalLoading.classList.remove("hidden");
  modalContent.classList.add("hidden");
  
  treeModal.classList.remove("hidden");
  
  setTimeout(() => {
    modalTreeName.textContent = tree.name;
    modalTreeImage.src = tree.image;
    modalTreeImage.alt = tree.name;
    modalTreeCategory.textContent = tree.category;
    modalTreePrice.textContent = `৳${tree.price}`;
    modalTreeDescription.textContent = tree.description;
    
    modalLoading.classList.add("hidden");
    modalContent.classList.remove("hidden");
  }, 500);
}

// Close modal
modalClose.addEventListener("click", () => {
  treeModal.classList.add("hidden");
});

// Add to cart function
function addToCart(item) {
  cart.push(item);
  renderCart();
}

// Render cart
function renderCart() {
  cartItemsEl.innerHTML = cart.map((item, index) => `
    <li class="flex justify-between items-center">
      <span class="truncate max-w-[60%]">${item.name}</span>
      <div class="flex items-center">
        <span class="mr-2">৳${item.price}</span>
        <button class="text-red-500 text-sm" onclick="removeFromCart(${index})">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    </li>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = "৳" + total;
}

// Remove item from cart
function removeFromCart(index) {
  const removedItem = cart[index];
  cart.splice(index, 1);
  renderCart();
  
  //removal notification
  alert(`${removedItem.name} removed from cart`);
}

// Close modal 
treeModal.addEventListener("click", (e) => {
  if (e.target === treeModal) {
    treeModal.classList.add("hidden");
  }
});

// Initialize
loadCategories();
loadTrees();