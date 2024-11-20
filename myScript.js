let webstore = new Vue({
    el: '#app',
    data: {
      sitename: 'BlackWatch',
      products: [
        {
          id: 100,
          title: 'BlackWatch',
          price: 199.99,
          description: 'A stylish and comfortable watch',
          image: '124.png',
          inventory: 10,
          rating: 5
        },
        {
          id: 101,
          title: "Fish Sticks",
          price: 99.99,
          description: "A delicious treat for you and all your lovely pets",
          image: '12.png',
          inventory: 5,
          rating: 4
        },
        {id:102,
          title: "Baby Oil",
          price: 1.50,
          description: 'Its Baby Oil',
          image: 'johnsons-baby-oil-200ml.jpg',
          inventory: 1000,
          rating: 5
        },
      ],
      cart: [],
      showProduct: true,
      dropdownVisible: false,
      order:[
          {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    }
  ]

    },
    computed: {
      cartItemCount: function() {
        const uniqueItemIds = new Set(this.cart);
        return uniqueItemIds.size;
      },
      canAddToCart: function(product) {
        return product.inventory > 0;
      },
      totalPrice: function() {
        let total = 0;
        for (let index = 0; index < this.cart.length; index++) {
          const element = this.cart[index];
          total += element;
        }
        return total;
      },
      sortProductPrice() {// the comparison function that defines the order
          function compare(a, b) {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
                  }   
              // sort the 'products' array and return it
              return this.products.sort(compare);
              }
    },
    methods: {
      addToCart: function(product) {
        if (product.inventory > 0) {
          //const cartSet = new Set(this.cart);
          //cartSet.add(product.id);
          this.cart.push((product.id)&&(product.price)) ;
          product.inventory--;
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
          this.products.sort((a, b) => a.price - b.price);} 
       else if (criteria === 'alpha') {
          this.products.sort((a, b) => a.title.localeCompare(b.title));}
          this.dropdownVisible = false; // Hide dropdown after sortinG
          }
    }
  });     