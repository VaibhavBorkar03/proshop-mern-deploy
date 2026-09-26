import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetProductDetailsQuery,
  useAddStockMutation,
} from "../../redux/slices/productApiSlice";

const AddStockScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("Purchase");

  // Get product
  const {
    data: product,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductDetailsQuery(id);

  // Add stock mutation
  const [
    addStock,
    { isLoading: addingStock },
  ] = useAddStockMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const stockQuantity = Number(quantity);

    // Validate quantity
    if (!stockQuantity || stockQuantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    try {
      await addStock({
        id,
        quantity: stockQuantity,
        reason,
      }).unwrap();

      alert(
        `${stockQuantity} units added successfully`
      );

      navigate("/inventory");
    } catch (error) {
      console.error("Add stock error:", error);

      alert(
        error?.data?.message ||
          error?.message ||
          "Failed to add stock"
      );
    }
  };

  // Loading product
  if (productLoading) {
    return (
      <div className="container py-5 text-center">
        <h5>Loading product...</h5>
      </div>
    );
  }

  // Product error
  if (productError || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Product not found.
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/inventory")}
        >
          Back to Inventory
        </button>
      </div>
    );
  }

  // IMPORTANT:
  // Your schema uses countInStock, NOT qtyAvailable
  const currentStock = product.countInStock ?? 0;

  const stockToAdd = Number(quantity || 0);

  const newStock = currentStock + stockToAdd;

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="mb-4">
        <h1 className="fw-bold">
          Add Stock
        </h1>

        <p className="text-muted">
          Add physical stock to an existing product.
        </p>
      </div>

      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-7">

          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-4">
                Product Information
              </h4>

              {/* Product */}
              <div className="mb-4">

                <label className="form-label">
                  Product
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={product.name}
                  disabled
                />

              </div>

              {/* Product ID */}
              <div className="mb-4">

                <label className="form-label">
                  Product ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={product._id}
                  disabled
                />

              </div>

              {/* Current Stock */}
              <div className="mb-4">

                <label className="form-label">
                  Current Stock
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={currentStock}
                  disabled
                />

              </div>

              <hr />

              <h5 className="mb-3">
                Stock Entry
              </h5>

              {/* Quantity */}
              <div className="mb-3">

                <label className="form-label">
                  Quantity Received
                </label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                />

                <small className="text-muted">
                  Example: Physical count = 5
                </small>

              </div>

              {/* Reason */}
              <div className="mb-4">

                <label className="form-label">
                  Reason
                </label>

                <select
                  className="form-select"
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                >
                  <option value="Purchase">
                    Purchase
                  </option>

                  <option value="Physical Count">
                    Physical Count
                  </option>

                  <option value="Return">
                    Customer Return
                  </option>

                  <option value="Stock Adjustment">
                    Stock Adjustment
                  </option>
                </select>

              </div>

              {/* Buttons */}
              <div className="d-flex gap-2">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    navigate("/inventory")
                  }
                  disabled={addingStock}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={addingStock}
                  onClick={submitHandler}
                >
                  {addingStock
                    ? "Adding..."
                    : "Add Stock"}
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-5">

          <div className="card shadow-sm">

            <div className="card-body">

              <h5>
                Stock Summary
              </h5>

              <hr />

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Product
                </span>

                <strong>
                  {product.name}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Current Stock
                </span>

                <strong>
                  {currentStock}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  Stock to Add
                </span>

                <strong className="text-success">
                  +{stockToAdd}
                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <strong>
                  New Stock
                </strong>

                <strong className="text-primary">
                  {newStock}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddStockScreen;