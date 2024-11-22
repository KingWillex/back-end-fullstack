let webstore = new Vue({
  el: '#app',
  data: {
    sitename: 'BlackWatch',
    products: [], // Start with an empty array
    searchQuery:'',
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
  watch:{
    searchQuery(newQuery){
      this.fetchProducts(newQuery);
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
    },
    isOrderValid() {
      // Check that all fields are filled
      const isValidPhone = this.order.phone.length === 11; // Validates if the phone number has 10 digits
      const isValidEmail = this.order.email.includes('@'); // Checks if email contains '@'
  
      return this.order.firstName &&
        this.order.lastName &&
        this.order.email &&
        isValidEmail && // Ensure valid email
        this.order.phone &&
        isValidPhone && // Ensure valid phone
        this.order.address &&
        this.order.city &&
        this.order.state &&
        this.order.zip;
    }
  },
  methods: {

    fetchProducts(query = '') {
      // Construct the URL with a search query if provided
      const url = query ? `http://localhost:3000/search?q=${encodeURIComponent(query)}` : 'http://localhost:3000/products';
    
      fetch(url) // Fetch data from the appropriate endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data); // Log for debugging
          if (Array.isArray(data)) {
            this.products = data; // Assign the fetched data to `products`
            console.log('Fetched products:', this.products);
          } else {
            console.error('Invalid data received/format:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
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
    removeFromCart(item){
      const cartIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);

      if (cartIndex !== -1) {
        // Restore the product inventory
        const product = this.products.find(product => product.id === item.id);
        if (product) {
          product.inventory += this.cart[cartIndex].quantity;
        }
  
        // Remove the item from the cart
        this.cart.splice(cartIndex, 1);
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
      if (!this.isOrderValid) {

    if (!this.order.firstName) console.log("First Name is required.");
    if (!this.order.lastName) console.log("Last Name is required.");
    if (!this.order.email) console.log("Email is required.");
   
    if (!this.order.phone) console.log("Phone number is required.");
   
    if (!this.order.address) console.log("Address is required.");
    if (!this.order.city) console.log("City is required.");
    if (!this.order.state) console.log("State is required.");
    if (!this.order.zip) console.log("Zip code is required.");
        alert('Please fill in all fields correctly.');
        return; // Stop the purchase process if the form is invalid
      }


      // Prepare the order data
      const orderData = {
        customerDetails:{
          firstName: this.order.firstName,
          lastName: this.order.lastName,
          email: this.order.email,
          phone: this.order.phone,
          address: this.order.address,
          city: this.order.city,
          state: this.order.state,
          zip: this.order.zip
        },
        items: this.cart.map(item => ({
          productId: item.id,
          title: item.name,
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
         this.updateInventory();
      })
      .catch(error => console.error('Error creating order:', error));
    },

    updateInventory() {
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
  },
  },

  created() {
    this.fetchProducts(); // Fetch products when the Vue instance is created
  }
});
