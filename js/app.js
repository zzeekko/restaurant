class Store {
    constructor() {

        // track how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0,
            price: 0,
            subTimesQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0,
        }

        this.menu ={

            item1: {
                id: 1,
                dish: 'chicken & waffles',
                imgUrl: 'chicken_and_waffles',
                alt: 'chicken and waffles',
                desc: 'Seasoned fried chicken',
                price: 9.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'cheeseburger',
                imgUrl: 'cheeseburger',
                alt: 'cheeseburger with fries',
                desc: 'Quarter pound burger with your choice of cheese. Comes with lettuce, pickles, tomato, and onion. Also comes with fries on the side',
                price: 14.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish: 'the satchel',
                imgUrl:'grilled_cheese',
                alt: 'grilled cheese sandwich with tomato soup',
                desc: 'Our specialty item. Pepper jack and gouda cheese, bacon, and pickles on our specialty bread. Comes with a bowl of tomato soup.',
                price: 10.99,
                qty: 0
            },
            item4: {
                id: 4,
                dish: 'house salad',
                imgUrl: 'salad',
                alt: 'house salad',
                desc: 'Fresh and crips mixed greens topped with tomatoes, onions, peppers, and tortilla strips',
                price: 8.99,
                qty: 0
            },
            item5: {
                id: 5,
                dish: 'chili',
                imgUrl: 'chili',
                alt: 'chili',
                desc: 'A bowl of turkey chili, made daily',
                price: 7.99,
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'fish and chips',
                imgUrl: 'fish_and_chips',
                alt: 'fish and chips',
                desc: 'Beer battered cod fish served with either fries or potato chips',
                price: 8.99,
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'soul food special',
                imgUrl: 'soul_food_special',
                alt: 'soul food special',
                desc: 'Choose between sliced ham, turkey wing, pot roast, or baked chicken; up to 3 sides',
                price: 14.99,
                qty: 0
            },
            item8: {
                id: 8,
                dish: 'shrimp and grits',
                imgUrl: 'shrimp_and_grits',
                alt: 'shrimp and grits',
                desc: 'Creamy grits and blackened shrimp',
                price: 9.99,
                qty: 0
            }
        }
    }

    init() {
        this.loadItems()
        this.addToCart()
        this.checkout()
        this.homeSwitch()
        this.confirmOrder()
    }

    loadItems() {
        const itemDiv = document.getElementById('itemDiv')
        
        /**
         * for in loop
         * 
         * for in loop loops through properties of an object
         */
        for (const key in this.menu) {
            const item = this.menu[key]
            
            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)

            product.innerHTML = `
                <figure class="figure item-figure">
                    <img src="${item.imgUrl}" alt="${item.alt}" class="img-fluid image item-image figure-img" />
                    <figcaption class="figure-caption item-caption">${item.dish}
                        <span class="item-price" id="itemPrice">${item.price}</span>
                    </figcaption>
                    <p class="item-desc" id="itemDesc">${item.desc}</p>
                    <button class="btn menu-btn text-capitalize" id="menuBtn" data-id="${item.id}">add to cart</button>
                </figure>
            `

            itemDiv.appendChild(product)
        }
    }

    addToCart() {
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        // let price = 0

        // let subTimesQty = 0
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        // let tax = 0
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        // let deliveryFee = 6
        // let total = 0
        let taxRate = .07
        const totalValue = document.getElementById('totalValue')

        // loop through this.menu
        for (const key in this.menu) {
            const item = this.menu[key]
            
            // loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        this.itemsInCart.itemCount++
                        this.itemsInCart.price+= item.price
                        this.itemsInCart.subtotal = this.itemsInCart.price
    
                        item.qty++
    
                        this.itemsInCart.subTimesQty = (item.price * item.qty).toFixed(2)
                        this.itemsInCart.tax = this.itemsInCart.subtotal * taxRate
                        this.itemsInCart.total = (this.itemsInCart.subtotal + this.itemsInCart.tax + this.itemsInCart.deliveryFee).toFixed(2)
                    }

                    // send to DOM
                    cartItems.innerText = this.itemsInCart.itemCount
                    cartSubtotal.innerText = this.itemsInCart.price.toFixed(2)
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = this.itemsInCart.deliveryFee.toFixed(2)
                    taxValue.innerText = this.itemsInCart.tax.toFixed(2)
                    totalValue.innerText = this.itemsInCart.total

                    // if (this.itemsInCart.itemCount == 1) 
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    // } else {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    // }

                    checkoutItemCount.innerText = this.itemsInCart.itemCount == 1 ? `${this.itemsInCart.itemCount} item` : `${this.itemsInCart.itemCount} items`
                })
            })
        }
    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')
        const tableBody = document.getElementById('tbody')

        let subTimesQty = 0

        cartBtn.addEventListener('click', ()=> {
            if (menuSection.classList.contains('d-none')) return

            checkoutPage.classList.remove('d-none')
            menuSection.classList.add('d-none')

            for (const key in this.menu) {
                const item = this.menu[key]

                if (item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2)

                    const tableRow = document.createElement('tr')
                    tableRow.className = 'item-checkout'

                    tableRow.innerHTML+= `
                    <td id="itemImg">
                        <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img" />
                    </td>
                    <td class="unit-price">${item.price.toFixed(2)}</td>
                    <td class="item-quantity">${item.qty}</td>
                    <td class="item-subtotal">${subTimesQty}</td>
                    `

                    tableBody.appendChild(tableRow)
                }
            }
            
        })
    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')

        homeSwitch.style.cursor = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked')
            menuSection.classList.remove('d-none')
            checkoutPage.classList.add('d-none')

            const tableBody = document.getElementById('tbody')
            tableBody.innerHTML = ''
        })
    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmBtn')
        const tableBody = document.getElementById('tbody')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const totalValue = document.getElementById('totalValue')

        confirmBtn.addEventListener('click', ()=> {
            // this.itemsInCart.itemCount = 0
            // this.itemsInCart.subtotal = 0
            for (const key in this.itemsInCart) {
                if (key != 'deliveryFee') {
                    this.itemsInCart[key] = 0
                }
            }
            console.log(this.itemsInCart)

            tableBody.innerHTML = '<h2>Your order is confirmed.</h2>'

            cartItems.innerText = this.itemsInCart.itemCount
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2)
            subtotalValue.innerText = 0
            taxValue.innerText = 0
            totalValue.innerText = 0

            for (const key in this.menu) {
                const item = this.menu[key]

                item.qty = 0
            }
        })
    }
}

const restaurant = new Store()

restaurant.init()

