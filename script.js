let webstore = new Vue({
  el: '#app',
  data: {
    sitename: 'BlackWatch',
    products: [], // Start with an empty array
    cart: [],
    showProduct: true,
    dropdownVisible: false,
    order: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    canAddToCart() {
      return product => product.inventory > 0;
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    sortProductPrice() {
      return this.products.sort((a, b) => a.price - b.price);
    }
  },
  methods: {

    fetchProducts() {
      fetch('http://localhost:3000/products') // API endpoint to fetch products
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data); // Log for debugging
          // if (Array.isArray(data) && data.length > 0) {
            webstore.products = data; // Assign the fetched data to `products`
            console.log('Fetched products:', webstore.products);
          // } 
          // else {
            // console.error('Invalid data received/format:', data);
          // }
        })
        .catch(error => console.error('Error fetching products:', error));
    },


    addToCart: function(product) {
      const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        // If the product is already in the cart, increase the quantity
        cartItem.quantity++;
        product.inventory--; // Visually decrease the inventory
      } else {
        // If it's a new product, add it to the cart
        this.cart.push({
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1 // Start with a quantity of 1
        });
        product.inventory--; // Visually decrease the inventory
      }
    },
    showCheckout() {
      this.showProduct = false;
    },
    showProductPage() {
      this.showProduct = true;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
    },
    sortProducts(criteria) {
      if (criteria === 'price') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (criteria === 'alpha') {
        this.products.sort((a, b) => a.title.localeCompare(b.title));
      }
      this.dropdownVisible = false; // Hide dropdown after sorting
    },
    purchase() {
      // Prepare the order data
      const orderData = {
        customerDetails:{
          firstName: this.order.firstName,
          lastName: this.order.lastName,
          email: this.order.email,
          address: this.order.address,
          city: this.order.city,
          state: this.order.state,
          zip: this.order.zip
        },
        items: this.cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: this.totalPrice,
      };

      // Send a POST request to the server to save the order
      fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Order successfully created:', data);
        alert("Thank for Shopping!");
         // After order is created, update inventory for each product in the cart
    this.cart.forEach(item => {
      fetch(`http://localhost:3000/products/${item.id}/purchase`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: item.quantity })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update inventory');
        }
        return response.json();
      })
      .then(data => {
        console.log('Inventory updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating inventory:', error);
      });
    });
        // Optionally clear the cart after successful purchase
        this.cart = [];
      })
      .catch(error => console.error('Error creating order:', error));
    }
  },
  
  created() {
    this.fetchProducts(); // Fetch products when the Vue instance is created
  }
});
