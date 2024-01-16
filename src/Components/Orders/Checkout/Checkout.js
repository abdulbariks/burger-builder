import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import {resetIngredients} from '../../../redux/actionCreators';



const mapStateTopProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch =>{
  return{
    resetIngredients: () => dispatch(resetIngredients()),
  }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg:"",
       }

       goBack = () => {
         this.props.history.goBack("/");
       }

       inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
       }

       submitHandler = () => {
        this.setState({isLoading: true});
         const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
         }
         axios.post("https://burger-builder-42bd0-default-rtdb.firebaseio.com/orders.json", order)
         .then(response => {
          if(response.status === 200){
            this.setState({
              isLoading: false,
              isModalOpen: true,
              modalMsg:"Order Placed Successfully!",
            })
            this.props.resetIngredients();
          }else{
            this.setState({
              isLoading: false,
              isModalOpen: true,
              modalMsg:"Order Again!",
            })
          }
         })
         .catch(err => {  
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg:"Order Again!",
        })})

       }
    render() {

      let form = (<div>
                <h3 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px" 
                  }}>
                    Payment: {this.props.totalPrice} BDT
                </h3>
                  <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px" 
                  }}>
                    <textarea name='deliveryAddress' value={this.state.values.deliveryAddress} 
                    className='form-control' placeholder='Your Delivery Addtrss' onChange={(e) => this.inputChangerHandler(e)}></textarea>
                      <br/>
                      <input name='phone'className='form-control' placeholder='Your Phone Number' onChange={(e) => this.inputChangerHandler(e)} value={this.state.values.phone} />
                      <br/>
                      <select name='paymentType' className='form-control' onChange={(e) => this.inputChangerHandler(e)} value={this.state.values.paymentType}>
                         <option value="Cash On Delivery">Cash On Delivery</option>
                         <option value="Bkash">Bkash</option>
                      </select>
                      <Button style={{backgroundColor:"D70F64"}} className='mr-auto' onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>
                      <Button color='secondary' className='ml-2' onClick={this.goBack}>Cancel</Button>
                  </form>
      </div>)
        return (
            <div>
           {this.state.isLoading ? <Spinner/> : form}    
           <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}></Modal>
           <ModalBody>
            <p>{this.state.modalMsg}</p>
           </ModalBody>
            </div>
        );
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Checkout);