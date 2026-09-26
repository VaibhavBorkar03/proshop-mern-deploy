import { Form, Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { toast } from "react-toastify"; // Import toast
import {
  useCreateProductReviewMutation,
  useGetProductDetailsQuery,
} from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Meta from "../components/Meta";

function ProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo", userInfo);

  const { cartItems } = useSelector((state) => state.cart);
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [productReview, { isLoading: loadingReview }] =
    useCreateProductReviewMutation();

  const addToCartHandler = () => {
    if (userInfo) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  const buyProductHandler = (e) => {
    if (userInfo) {
      dispatch(addToCart({ ...product, qty }));
      navigate("/login?redirect=/shipping");
    } else {
      navigate("/login");
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await productReview({
        productId,
        rating: Number(rating),
        comment,
      }).unwrap();
      refetch();
      toast.success(res?.data?.message || res?.message);
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  maxWidth: "350px",
                }}
                fluid
              />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3> {product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ₹{product.price}</ListGroupItem>
                <ListGroupItem>
                  <strong>Description : </strong>
                  {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem className="d-flex justify-content-between">
                    <Button
                      type="button"
                      className="btn btn-dark "
                      style={{ width: "120px" }}
                      disabled={userInfo?.isAdmin || product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      type="button"
                      variant="dark"
                      className="btn-block"
                      style={{ width: "120px" }}
                      disabled={userInfo?.isAdmin}
                      onClick={buyProductHandler}
                    >
                      Buy
                    </Button>
                  </ListGroupItem>

                  {/* <ListGroupItem>
                    
                  </ListGroupItem> */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6} className="fw-bold">
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant="danger">No Review</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a Customer review</h3>
                  {loadingReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <FormGroup controlId="rating" className="my-3">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very good</option>
                          <option value="5">5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <Button
                        className="btn-block bg-dark mt-3"
                        type="submit"
                        disabled={loadingReview}
                      >
                        submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to provide a
                      review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductScreen;
