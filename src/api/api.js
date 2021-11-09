import axios from "axios";

const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://localhost:8888"
		: "http://localhost:8080";

// common
export const editAccountInfo = (params) => axios.post(`${baseUrl}/user/editStudent`, params)

export const getProductDetail = (goodId) => axios.post(`${baseUrl}/manager/checkGoodById`,
{},
{
    params:{
        goodId:goodId
    }
})

// visitor
export const login = (params) => axios.post(`${baseUrl}/user/login`, 
{},
{
    params: params
})


export const register = (params) => axios.post(`${baseUrl}/user/register`, params)

// buyer
export const getAllProducts = () => axios.post(`${baseUrl}/buyer/checkAllGoods`)

export const getTagProducts = (tag) => axios.post(`${baseUrl}/buyer/filterGoods`,
{},
{
    params:{
        classi:tag
    }
})

export const createNewOrder = (buyerId, goodId) => axios.post(`${baseUrl}/buyer/buyGood`, 
{},
{
    params:{
        buyerId:buyerId,
        goodId:goodId
    }
})

export const getBuyerOrders = (userId) => axios.post(`${baseUrl}/buyer/checkBuyerOrders`,
{},
{
    params:{
        studentId:userId
    }
})

export const receiveOrder = (orderId) => axios.post(`${baseUrl}/buyer/receiveOrder`,
{},
{
    params:{
        orderId:orderId
    }
})

export const cancelOrder = (orderId) => axios.post(`${baseUrl}/buyer/cancelOrder`,
{},
{
    params:{
        orderId:orderId
    }
})

// seller
export const getMyProducts = (id) => axios.post(`${baseUrl}/seller/checkMyGoods`,
{},
{
    params:{
        studentId:id
    }
})

export const getSellerOrders = (id) => axios.post(`${baseUrl}/seller/checkSellerOrders`,
{},
{
    params:{
        studentId:id
    }
})

export const upShelfProduct = (params) => axios.post(`${baseUrl}/seller/upShelf`, params)

export const editProduct = (params) => axios.post(`${baseUrl}/seller/editGood`, params)

export const offShelfProduct = (id) => axios.post(`${baseUrl}/seller/offShelf`,
{},
{
    params:{
        goodId:id
    }
})

export const getClassification = (id) => axios.post(`${baseUrl}/seller/distinguish`,
{},
{
    params:{
        goodId:id
    }
})

export const sendProduct = (id) => axios.post(`${baseUrl}/seller/sendGood`,
{},
{
    params:{
        orderId:id
    }
})

// administrator
export const blockAccount = (id) => axios.post(`${baseUrl}/user/lockAccount`,
{},
{
    params:{
        id:id
    }
})

export const unblockAccount = (id) => axios.post(`${baseUrl}/user/unlockAccount`,
{},
{
    params:{
        id:id
    }
})

export const getAccountByName = (name) => axios.post(`${baseUrl}/user/searchStudentName`,
{}
,{
    params:{
        name:name
    }
})

export const getOrderById = (orderId) => axios.post(`${baseUrl}/manager/checkOrderById`,
{},
{
    params:{
        orderId:orderId
    }
})

export const changeOrderStatus = (orderId, status) => axios.post(`${baseUrl}/manager/editOrder`,
{},
{
    params:{
        orderId:orderId,
        status:status
    }
})

export const getAccountById = (id) => axios.post(`${baseUrl}/user/checkStudentById`,
{},
{
    params:{
        studentId:id
    }
})

// mock.js (mock api)
// export const editAccountInfo = (params) => axios.post(`/user/editStudent`, params)

// export const getProductDetail = () => axios.get(`/manager/checkGoodById`)

// export const getAllProducts = () => axios.post(`/buyer/checkAllGoods`)

// export const getTagProducts = (tag) => axios.post(`/buyer/filterGoods`,tag)

// export const login = (params) => axios.post(`/user/login`, params)

// export const register = (params) => axios.post(`/user/register`, params)

// export const getAccountByName = (name) => axios.post(`/user/searchStudentName`,name)

// export const createNewOrder = (buyerId, goodId) => axios.post(`/buyer/buyGood`, buyerId, goodId)

// export const getBuyerOrders = (userId) => axios.post(`/buyer/checkBuyerOrders`,userId)

// export const receiveOrder = (orderId) => axios.post(`/buyer/receiveOrder`,orderId)

// export const cancelOrder = (orderId) => axios.post(`/buyer/cancelOrder`,orderId)

// export const getMyProducts = (id) => axios.post(`/seller/checkMyGoods`,id)

// export const getSellerOrders = (userId) => axios.post(`/seller/checkSellerOrders`,userId)

// export const upShelfProduct = (params) => axios.post(`/seller/upShelf`, params)

// export const editProduct = (params) => axios.post(`/seller/editGood`, params)

// export const offShelfProduct = (id) => axios.post(`/seller/offShelf`,id)

// export const getClassification = (id) => axios.post(`/seller/distinguish`,id)

// export const sendProduct = (id) => axios.post(`/seller/sendGood`,id)

// export const blockAccount = (id) => axios.post(`/user/lockAccount`,id)

// export const unblockAccount = (id) => axios.post(`/user/unlockAccount`,id)

// export const getOrderById = (orderId) => axios.post(`/manager/checkOrderById`,orderId)

// export const changeOrderStatus = (orderId, status) => axios.post(`/manager/editOrder`,orderId,status)