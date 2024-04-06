import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Dropdown,
    FormControl,
    InputGroup,
} from "react-bootstrap";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./ProductsContainer.css";

const ProductsContainer = ({ onAddToCart, cartItems, onRemoveItem }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (searchQuery.length > 0) {
            axios
                .get("https://dummyjson.com/products/search?q=" + searchQuery)
                .then((response) => {
                    const filteredProducts = response.data.products.filter(
                        (product) =>
                            selectedCategory
                                ? product.category === selectedCategory &&
                                  product
                                : product
                    );
                    setProducts(filteredProducts);
                });
        } else {
            axios.get("https://dummyjson.com/products").then((response) => {
                const filteredProducts = response.data.products.filter(
                    (product) =>
                        selectedCategory
                            ? product.category === selectedCategory && product
                            : product
                );
                setProducts(filteredProducts);
            });
        }
        if (categories.length === 0) {
            axios
                .get("https://dummyjson.com/products/categories")
                .then((response) => {
                    setCategories(response.data);
                });
        }
    }, [searchQuery, selectedCategory]);

    const isItemInCart = (productId) => {
        return cartItems.some((item) => item.id === productId);
    };

    const getProductInCart = (productId) => {
        return cartItems.find((item) => item.id === productId);
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} color="#ffc107" />);
            } else if (hasHalfStar && i === fullStars) {
                stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
            } else {
                stars.push(<FaStar key={i} color="#e4e5e9" />);
            }
        }
        return stars;
    };

    return (
        <div className="product-list-bg">
            <Container className="py-5">
                <h2 className="text-center mb-4 stylish-title">Products</h2>
                <Row className="mb-3">
                    <Col className="" xs={12}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={8}>
                        <Dropdown variant="primary">
                            <Dropdown.Toggle variant="primary">
                                {selectedCategory || "Select Category"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => setSelectedCategory(null)}
                                >
                                    All
                                </Dropdown.Item>
                                {categories?.map((category) => (
                                    <Dropdown.Item
                                        key={category}
                                        onClick={() => {
                                            console.log(category);
                                            setSelectedCategory(category);
                                            setSearchQuery("");
                                        }}
                                    >
                                        {category}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row>
                    {products?.map((product) => (
                        <Col
                            key={product.id}
                            xs={12}
                            md={4}
                            lg={3}
                            className="mb-4"
                        >
                            <Card className="h-100 product-card shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={product.thumbnail}
                                    className="product-image"
                                />
                                <Card.Body>
                                    <Card.Title className="mb-2 product-title">
                                        {product.title}
                                    </Card.Title>
                                    <Card.Text className="mb-3 product-description">
                                        {product.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between align-items-center product-footer">
                                    <div>
                                        <p className="rating-stars">
                                            {renderRatingStars(product.rating)}
                                        </p>
                                        <p className="product-price">
                                            Price: ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <Button
                                        className={`product-button ${
                                            isItemInCart(product.id)
                                                ? "btn-remove"
                                                : "btn-add"
                                        }`}
                                        onClick={() =>
                                            isItemInCart(product.id)
                                                ? onRemoveItem(
                                                      getProductInCart(
                                                          product.id
                                                      ).id
                                                  )
                                                : onAddToCart(product)
                                        }
                                    >
                                        {isItemInCart(product.id)
                                            ? "Remove"
                                            : "Add to Cart"}
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
export default ProductsContainer;
