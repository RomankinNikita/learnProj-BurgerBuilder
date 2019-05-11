import React, { Component, Fragment } from 'react';
import Burger from '../burger/burger';
import BuildControls from '../burger/build-controls/build-controls';
import Modal from '../modal/modal';
import OrderSummary from '../burger/order-summary/order-summary';
import Spinner from '../spinner/spinner';
import withErrorHandler from '../hoc/with-error-handler/with-error-handler';

import axios from '../../axios-orders';

import './burger-builder.css';
import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  ingredientsRequested,
  ingredientsLoaded,
  ingredientsError
} from '../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    if (this.props.ingredients === null) {
      this.props.ingredientsRequested();
      document.addEventListener('keydown', this.escCloseHandler);
      axios
        .get('/ingredients.json')
        .then(({ data }) => this.props.ingredientsLoaded(data))
        .catch(err => this.props.ingredientsError(err));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escCloseHandler);
  }

  escCloseHandler = ({ key }) => {
    if (key === 'Escape' && this.state.purchasing) {
      this.purchaseCancelHandler();
    }
  };

  purchaseHandler = () => {
    if (this.props.token !== null) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/sign-in');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const {
      ingredients,
      totalPrice,
      addIngredient,
      removeIngredient,
      token
    } = this.props;

    let totalIngredients, purchasable, orderSummary;

    if (ingredients) {
      totalIngredients = Object.values(ingredients).reduce(
        (sum, item) => sum + item,
        0
      );
      purchasable = totalIngredients > 0;
      orderSummary = (
        <OrderSummary
          price={totalPrice}
          ingredients={ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
        />
      );
    }

    if (this.props.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;

    if (ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabledInfo={ingredients}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            price={totalPrice}
            isDisabledOrder={purchasable}
            purchaseHandler={this.purchaseHandler}
            isAuthenticated={token !== null}
          />
        </Fragment>
      );
    }

    return (
      <main className='content'>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </main>
    );
  }
}

const mapStateToProps = ({ ingredients, totalPrice, loading, token }) => {
  return {
    ingredients,
    totalPrice,
    loading,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName => dispatch(addIngredient(ingredientName)),
    removeIngredient: ingredientName =>
      dispatch(removeIngredient(ingredientName)),
    ingredientsRequested: () => dispatch(ingredientsRequested()),
    ingredientsLoaded: ingredients => dispatch(ingredientsLoaded(ingredients)),
    ingredientsError: error => dispatch(ingredientsError(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
