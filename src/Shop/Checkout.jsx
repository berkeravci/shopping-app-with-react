import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatter";
import Input from "../UI/Input";
import { useMutation } from "@tanstack/react-query";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import { createNewOrder } from "../util/http";
import { useState } from "react";

const Checkout = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal= cartCtx.items.reduce((totalPrice,item) => totalPrice + item.quantity * item.price,0);
    function handleClose(){
        userProgressCtx.hideCheckout();
        setShowSuccessModal(false)
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        setShowSuccessModal(false)
    }

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewOrder,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['order'] });
          navigate('/products');
        }
      });
    // submission process - getting data from the form
      function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        console.log(formData)
        const customerData = Object.fromEntries(formData);
        const items = cartCtx.items;
        console.log(items);
        console.log(customerData);
        
        const combinedObject = {customerData,items};
        console.log(combinedObject)
        
        mutate({ order: combinedObject });
        setShowSuccessModal(true)
        
        
      }
    //   button actions
    let actions = (
        <>
            <Button type="button" className="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if(isPending){
        actions = <span>Sending order data...</span>
    }

    // if(!isError && !isPending){
    //     return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
    //         <h2>Success!</h2>
    //         <p className="modal-actions">
    //             <Button onClick={handleFinish}>Okay</Button>
    //         </p>
    //     </Modal>
    // }
    return(
        <>
        {/* Contitdional Successful Order Modal */}
         <Modal open={showSuccessModal}> 
                <div>
                    <h2>Success!</h2>
                    <p>Your order has been submitted successfully.</p>
                    <Button onClick={handleFinish}>Close</Button>
                </div>
            </Modal>
        {/* Checkout Modal which includes form */}
            <Modal open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name"></Input>
                <Input label="E-Mail Address" type="email" id="email"></Input>
                <Input label="Street" type="text" id="street"></Input>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>
                
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
        </>
        
    );
}


export default Checkout;