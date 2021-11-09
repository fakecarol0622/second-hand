const Mock = require('mockjs') 

// Set a delayed response to simulate requesting data from the backend
Mock.setup({
    timeout: 100, 
});

// Simulate the interface for login
Mock.mock('/user/login','post', (params)=>{
    console.log(params)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for register
Mock.mock('/user/register','post', (params)=>{
    console.log(params)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for register
Mock.mock('/seller/upShelf','post', (params)=>{
    console.log(params)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for returning good list by book category
Mock.mock('/buyer/filterGoods','post', ()=>{
    let goods = []
    for(let i=0;i<10;i++){
        const good = Mock.mock({
            'goodId':/\d{8}/,
            'goodName':'@word',
            'price|1-100':1,
            'originPrice|1-200':1,
            'classification':'book',
            'stock|1-10':1,
            'picture':'http://www.123.com/a.jpg',
            'description':'@paragraph(3)',
            'status|1-100':1,
            'publishTime':'@datetime'
        })
        goods.push(good)
    }
    return goods;
})

// Simulate the interface for returning good list by cosmetic category
Mock.mock('/buyer/checkAllGoods','post', ()=>{
    let devices = []
    for(let i=0;i<20;i++){
        const device = Mock.mock({
            'goodId':/\d{8}/,
            'goodName':'@word',
            'price|1-100':1,
            'originPrice|1-200':1,
            'classification':'cosmetic',
            'stock|1-10':1,
            'picture':'http://www.123.com/a.jpg',
            'description':'@paragraph(3)',
            'status|1-3':1,
            'publishTime':'@datetime'
        })
        devices.push(device)
    }
    return devices;
})

// Simulate the interface for returning good list of seller
Mock.mock('/seller/checkMyGoods','post', ()=>{
    let devices = []
    for(let i=0;i<10;i++){
        const device = Mock.mock({
            'goodId':/\d{8}/,
            'goodName':'@word',
            'price|1-100':1,
            'originPrice|1-200':1,
            'classification':'cosmetic',
            'stock|1-10':1,
            'picture':'http://www.123.com/a.jpg',
            'description':'@paragraph(3)',
            'status|1-3':1,
            'publishTime':'@datetime',
            'sellerId':/\d{8}/,
            'sellerName':'@name',
            'newness|1-100':1
        })
        devices.push(device)
    }
    return devices;
})

// Simulate the interface for returning good detail by good id
Mock.mock('/manager/checkGoodById','get', ()=>{
    const device = Mock.mock({
        'goodId':/\d{8}/,
        'goodName':'@word',
        'price|1-100':1,
        'originPrice|1-200':1,
        'classification':'cosmetic',
        'stock|1-10':1,
        'picture':'http://www.123.com/a.jpg',
        'description':'@paragraph(3)',
        'status|1-3':1,
        'publishTime':'@datetime',
        'sellerId':/\d{8}/,
        'sellerName':'@name',
        'newness|1-100':1
    })
    return device;
})

// Simulate the interface for returning order list by userId
Mock.mock('/buyer/checkBuyerOrders','post', ()=>{
    let orders = []
    for(let i=0;i<10;i++){
        const order = Mock.mock({
            'orderId':/\d{8}/,
            'buyerId':/\d{8}/,
            'buyerName':'@name',
            'sellerId':/\d{8}/,
            'sellerName':'@name',
            'goodId':/\d{8}/,
            'goodName':'@word',
            'totalPrice|1-10000':1,
            'date':'@datetime',
            'orderCondition|0-3':1
        })
        orders.push(order)
    }
    return orders;
})

// Simulate the interface for returning seller order list
Mock.mock('/seller/checkSellerOrders','post', ()=>{
    let orders = []
    for(let i=0;i<10;i++){
        const order = Mock.mock({
            'orderId':/\d{8}/,
            'buyerId':/\d{8}/,
            'buyerName':'@name',
            'sellerId':/\d{8}/,
            'sellerName':'@name',
            'goodId':/\d{8}/,
            'goodName':'@word',
            'totalPrice|1-10000':1,
            'date':'@datetime',
            'orderCondition|0-3':1
        })
        orders.push(order)
    }
    return orders;
})

// Simulate the interface for returning order detail
Mock.mock('/manager/checkOrderById','post', ()=>{
    const order = Mock.mock({
        'orderId':/\d{8}/,
        'buyerId':/\d{8}/,
        'buyerName':'@name',
        'sellerId':/\d{8}/,
        'sellerName':'@name',
        'goodId':/\d{8}/,
        'goodName':'@word',
        'totalPrice|1-10000':1,
        'date':'@datetime',
        'orderCondition|0-3':1
    })
    return order;
})

// Simulate the interface for returning user information by userId
Mock.mock('/v2/account','get', ()=>{
    const account = Mock.mock({
        'userId':/\d{8}/,
        'password':'@word(8,20)',
        'userName':'@name',
        'address':'@sentence',
        'phone':/\d{11}/,
        'status|0-1':0,
    })
    return account;
})

// Simulate the interface for creating an order
Mock.mock('/v2/neworder','post', (param) => {
    console.log(param)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for registering a new account
Mock.mock('/v2/register','post', (param) => {
    console.log(param)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for modifying the account information
Mock.mock('/user/editStudent','post', (param) => {
    console.log(param)
    return Mock.mock({
        status:200
    })
})

Mock.mock('/upload','post', (param) => {
    console.log(param)
    return Mock.mock({
        status:200
    })
})

Mock.mock('/buyer/buyGood','post', (buyerId,goodId) => {
    console.log(buyerId,goodId)
    return Mock.mock({
        status:200
    })
})

Mock.mock('/buyer/cancelOrder','post', (orderId) => {
    console.log(orderId)
    return Mock.mock({
        status:200
    })
})

Mock.mock('/buyer/receiveOrder','post', (orderId) => {
    console.log(orderId)
    return Mock.mock({
        status:200
    })
})

// Simulate the interface for returning the estimated product price, status and category
Mock.mock('/seller/distinguish','post', () => {
    return Mock.mock({
        'category':'@word',
        'newness|30-100':1,
        'price|1-10000':1,
        status:200
    })
})

// Simulate the interface for returning the estimated product price, status and category
Mock.mock('/seller/offShelf','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/user/lockAccount','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/user/unlockAccount','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/manager/editOrder','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/seller/editGood','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/seller/sendGood','post', () => {
    return Mock.mock({
        status:200
    })
})

Mock.mock('/user/searchStudentName','post', () => {
    const mes = Mock.mock({
        'userId':/\d{8}/,
        'password':'@word(8,20)',
        'userName':'@name',
        'address':'@sentence',
        'phone':/\d{11}/,
        'status|0-1':0,
    })
    return mes
})

