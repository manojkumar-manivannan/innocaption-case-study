import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = typeof item.price === "number" ? item.price : 0;
        const itemQuantity =
            typeof item.quantity === "number" ? item.quantity : 0;
        return total + itemPrice * itemQuantity;
    }, 0);

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container className="py-5">
                <h2 className="text-center mb-4">Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                disabled={item.quantity === 1}
                                                className="btn-sm mx-1"
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() =>
                                                    onUpdateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="btn-sm mx-1"
                                            >
                                                +
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    onRemoveItem(item.id)
                                                }
                                                className="btn-sm"
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-end">
                            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                            <Button variant="primary" className="btn-sm">
                                Checkout
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Cart;
