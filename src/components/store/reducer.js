const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

export const initialState = {
	ingredients: null,
	orders: [],
	totalPrice: 0,
	loading: false,
	error: null,
	email: null,
	token: null,
	userId: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_INGREDIENTS_REQUEST':
			return {
				...state,
				ingredients: null,
				loading: true,
				error: null
			};

		case 'FETCH_INGREDIENTS_SUCCESS':
			return {
				...state,
				ingredients: action.ingredients,
				loading: false,
				error: null
			};

		case 'FETCH_INGREDIENTS_FAILURE':
			return {
				...state,
				ingredients: null,
				loading: false,
				error: action.error
			};

		case 'SEND_ORDER_REQUEST':
			return {
				...state,
				loading: true,
				error: null
			};

		case 'SEND_ORDER_SUCCESS':
			return {
				...state,
				ingredients: null,
				orders: [],
				totalPrice: 0,
				loading: false,
				error: null
			};

		case 'SEND_ORDER_FAILURE':
			return {
				...state,
				loading: false,
				error: action.error
			};

		case 'FETCH_ORDERS_REQUEST':
			return {
				...state,
				orders: [],
				loading: true,
				error: null
			};

		case 'FETCH_ORDERS_SUCCESS':
			return {
				...state,
				orders: action.orders,
				loading: false,
				error: null
			};

		case 'FETCH_ORDERS_FAILURE':
			return {
				...state,
				loading: false,
				error: action.error
			};

		case 'ADD_INGREDIENT':
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: +(state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]).toFixed(2)
			};

		case 'REMOVE_INGREDIENT':
			const ingredientName = action.ingredientName;
			const ingredientValue = state.ingredients[ingredientName]
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[ingredientName]: ingredientValue === 1 ? 0 : ingredientValue - 1
				},
				totalPrice: +(state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]).toFixed(2)
			};

		case 'SIGN_UP_START':
			return {
				...state,
				loading: true,
				error: null
			};

		case 'SIGN_UP_SUCCESS':
			return {
				...state,
				loading: false,
				email: action.email,
			};

		case 'SIGN_UP_ERROR':
			return {
				...state,
				loading: false,
				error: action.error
			};

		case 'SIGN_IN_START':
			return {
				...state,
				loading: true,
				error: null
			};

		case 'SIGN_IN_SUCCESS':
			return {
				...state,
				loading: false,
				token: action.idToken,
				userId: action.localId
			};

		case 'SIGN_IN_ERROR':
			return {
				...state,
				loading: false,
				error: action.error
			};

		case 'LOG_OUT':
			return {
				...state,
				ingredients: null,
				totalPrice: 0,
				token: null,
				userId: null
			};

		default:
			return state;
	}
};

export default reducer;