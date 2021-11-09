import axios from "axios";

// const baseUrl =
// 	process.env.NODE_ENV === "production"
// 		? "http://localhost:8888"
// 		: "http://localhost:8080";

// common
//export const editAccountInfo = (params) => axios.post(`${baseUrl}/user/editStudent`, params)
export const editAccountInfo = (params) => axios.post(`/user/editStudent`, params)

//export const getProductDetail = (goodId) => axios.post(`${baseUrl}/manager/checkGoodById`,goodId)
export const getProductDetail = () => axios.get(`/manager/checkGoodById`)

// visitor
// export const login = (params) => axios.post(`${baseUrl}/user/login`, params)
export const login = (params) => axios.post(`/user/login`, params)

//export const register = (params) => axios.post(`${baseUrl}/user/register`, params)
export const register = (params) => axios.post(`/user/register`, params)

// buyer
//export const getAllProducts = () => axios.post(`${baseUrl}/buyer/checkAllGoods`)
export const getAllProducts = () => axios.post(`/buyer/checkAllGoods`)

//export const getTagProducts = (tag) => axios.post(`${baseUrl}/buyer/filterGoods`,tag)
export const getTagProducts = (tag) => axios.post(`/buyer/filterGoods`,tag)

//export const createNewOrder = (buyerId, goodId) => axios.post(`${baseUrl}/buyer/buyGood`, buyerId, goodId)
export const createNewOrder = (buyerId, goodId) => axios.post(`/buyer/buyGood`, buyerId, goodId)

//export const getBuyerOrders = (userId) => axios.post(`${baseUrl}/buyer/checkBuyerOrders`,userId)
export const getBuyerOrders = (userId) => axios.post(`/buyer/checkBuyerOrders`,userId)

//export const receiveOrder = (orderId) => axios.post(`${baseUrl}/buyer/receiveOrder`,orderId)
export const receiveOrder = (orderId) => axios.post(`/buyer/receiveOrder`,orderId)

//export const cancelOrder = (orderId) => axios.post(`${baseUrl}/buyer/cancelOrder`,orderId)
export const cancelOrder = (orderId) => axios.post(`/buyer/cancelOrder`,orderId)

// seller
//export const getMyProducts = (id) => axios.post(`${baseUrl}/seller/checkMyGoods`,id)
export const getMyProducts = (id) => axios.post(`/seller/checkMyGoods`,id)

//export const getSellerOrders = (id) => axios.post(`${baseUrl}/seller/checkSellerOrders`,id)
export const getSellerOrders = (userId) => axios.post(`/seller/checkSellerOrders`,userId)

//export const upShelfProduct = (params) => axios.post(`${baseUrl}/seller/upShelf`, params)
export const upShelfProduct = (params) => axios.post(`/seller/upShelf`, params)

//export const editProduct = (params) => axios.post(`${baseUrl}/seller/editGood`, params)
export const editProduct = (params) => axios.post(`/seller/editGood`, params)

//export const offShelfProduct = (id) => axios.post(`${baseUrl}/seller/offShelf`,id)
export const offShelfProduct = (id) => axios.post(`/seller/offShelf`,id)

//export const getClassification = (id) => axios.post(`${baseUrl}/seller/distinguish`,id)
export const getClassification = (id) => axios.post(`/seller/distinguish`,id)

//export const sendProduct = (id) => axios.post(`${baseUrl}/seller/sendGood`,id)
export const sendProduct = (id) => axios.post(`/seller/sendGood`,id)

// administrator
//export const blockAccount = (id) => axios.post(`${baseUrl}/user/lockAccount`,id)
export const blockAccount = (id) => axios.post(`/user/lockAccount`,id)

//export const unblockAccount = (id) => axios.post(`${baseUrl}/user/unlockAccount`,id)
export const unblockAccount = (id) => axios.post(`/user/unlockAccount`,id)

// export const getAccountByName = (name) => axios.post(`${baseUrl}/user/searchStudentName`,name)
export const getAccountByName = (name) => axios.post(`/user/searchStudentName`,name)

//export const getOrderById = (orderId) => axios.post(`${baseUrl}/manager/checkOrderById`,orderId)
export const getOrderById = (orderId) => axios.post(`/manager/checkOrderById`,orderId)

//export const changeOrderStatus = (orderId, status) => axios.post(`${baseUrl}/manager/editOrder`,orderId,status)
export const changeOrderStatus = (orderId, status) => axios.post(`/manager/editOrder`,orderId,status)