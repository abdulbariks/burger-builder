import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from './../Orders/Checkout/Checkout';

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}
class BurgerBuilder extends Component {
    state = {
        modalOpen: false,

    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    addIngredientHandler = type => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }

    removeIngredientHandler = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

   
    handleCheckout = () => {
        console.log("helloooooo");
        // const history = useNavigate();
        // // history.push("/yourpath");
        // console.log(history);

        // const location = useLocation();
        // location("/checkout");
        //    const navigate = useNavigate();
        //    navigate("/checkout")

        // this.props.history.push("/checkout");
    }

    // componentDidMount(){
    //     console.log(this.props);
    // }
    render() {
        return (
            <div>
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.props.ingredients} />
                <Controls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.props.totalPrice}
                    purchasable={this.props.purchasable}
                    toggleModal={this.toggleModal}
                />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Link to= "/checkout">
                            Checkout
                        {/* <Button color="success" onClick={this.handleCheckout}>Checkout</Button> */}
                        </Link>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);