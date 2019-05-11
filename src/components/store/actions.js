const addIngredient = (ingredientName) => ({type: 'ADD_INGREDIENT', ingredientName});
const removeIngredient = (ingredientName) => ({type: 'REMOVE_INGREDIENT', ingredientName});

const ingredientsRequested = () => ({type: 'FETCH_INGREDIENTS_REQUEST'});
const ingredientsLoaded = (ingredients) => ({type: 'FETCH_INGREDIENTS_SUCCESS', ingredients});
const ingredientsError = (error) => ({type: 'FETCH_INGREDIENTS_FAILURE', error});

const sendOrderRequest = () => ({type: 'SEND_ORDER_REQUEST'});
const sendOrderSuccess = () => ({type: 'SEND_ORDER_SUCCESS'});
const sendOrderError = (error) => ({type: 'SEND_ORDER_FAILURE', error});

const ordersRequested = () => ({type: 'FETCH_ORDERS_REQUEST'});
const ordersLoaded = (orders) => ({type: 'FETCH_ORDERS_SUCCESS', orders});
const ordersError = (error) => ({type: 'FETCH_ORDERS_FAILURE', error});

const signUpStart = () => ({type: 'SIGN_UP_START'});
const signUpSuccess = (email) => ({type: 'SIGN_UP_SUCCESS', email});
const signUpError = (error) => ({type: 'SIGN_UP_ERROR', error});

const signInStart = () => ({type: 'SIGN_IN_START'});
const signInSuccess = (idToken, localId) => ({type: 'SIGN_IN_SUCCESS', idToken, localId});
const signInError = (error) => ({type: 'SIGN_IN_ERROR', error});

const logOut = () => ({type: 'LOG_OUT'});

export {
	addIngredient,
	removeIngredient,
	ingredientsRequested,
	ingredientsLoaded,
	ingredientsError,
	sendOrderRequest,
	sendOrderSuccess,
	sendOrderError,
	ordersRequested,
	ordersLoaded,
	ordersError,
	signUpStart,
	signUpSuccess,
	signUpError,
	signInStart,
	signInSuccess,
	signInError,
	logOut
};