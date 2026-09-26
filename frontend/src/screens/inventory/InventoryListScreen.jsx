// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus, FaEdit, FaSearch } from "react-icons/fa";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetProductsQuery,
//   useGetTopProductsQuery,
// } from "../../redux/slices/productApiSlice";
// import Paginate from "../../components/Paginate";

// const InventoryListScreen = () => {
//   // const { data: products, isLoading, isError } = useGetTopProductsQuery();
//   // const { data: products, isLoading } = useGetProductsQuery();
//   const { pageNumber, keyword } = useParams();
//   const { data, isLoading, error } = useGetProductsQuery({
//     pageNumber,
//     keyword,
//   });

//   //   const [products, setProducts] = useState([]);
//   // const [keyword, setKeyword] = useState("");

//   const navigate = useNavigate();

//   //   const products = data.products || data;

//   //   useEffect(() => {
//   //     fetchProducts();
//   //   }, []);

//   //   const fetchProducts = async () => {
//   //     try {
//   //       setLoading(true);

//   //       //   const { data } = await axios.get("/api/products");

//   //       setProducts(data.products || data);
//   //     } catch (error) {
//   //       console.error("Error fetching products:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   const filteredProducts = data?.products?.filter((product) => {
//     const search = keyword.toLowerCase();

//     return (
//       product.name?.toLowerCase().includes(search) ||
//       product.category?.toLowerCase().includes(search) ||
//       product.brand?.toLowerCase().includes(search) ||
//       product._id?.toLowerCase().includes(search)
//     );
//   });

//   return (
//     <div className="container-fluid px-4">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h1 className="fw-bold mb-1">Inventory</h1>

//           <p className="text-muted mb-0">Manage product stock and inventory</p>
//         </div>

//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/inventory/add-stock")}
//         >
//           <FaPlus className="me-2" />
//           Add Stock
//         </button>
//       </div>

//       {/* Search */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="input-group">
//             <span className="input-group-text">
//               <FaSearch />
//             </span>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search product, category, brand..."
//               value={keyword}
//               onChange={(e) => setKeyword(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>PRICE</th>
//               <th>CATEGORY</th>
//               <th>BRAND</th>
//               <th>QTY AVAILABLE</th>
//               <th>STATUS</th>
//               <th>ACTION</th>
//             </tr>
//           </thead>

//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-5">
//                   Loading inventory...
//                 </td>
//               </tr>
//             ) : filteredProducts?.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-5">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               filteredProducts.map((product) => {
//                 const quantity = product.countInStock ?? 0;

//                 let status = "In Stock";
//                 let statusClass = "bg-success";

//                 if (quantity === 0) {
//                   status = "Out of Stock";
//                   statusClass = "bg-danger";
//                 } else if (quantity <= 10) {
//                   status = "Low Stock";
//                   statusClass = "bg-warning text-dark";
//                 }

//                 return (
//                   <tr key={product._id}>
//                     <td>
//                       <small>{product._id}</small>
//                     </td>

//                     <td>
//                       <strong>{product.name}</strong>
//                     </td>

//                     <td>₹{product.price}</td>

//                     <td>{product.category}</td>

//                     <td>{product.brand}</td>

//                     <td className="text-center">
//                       <strong
//                         className={
//                           quantity === 0
//                             ? "text-danger"
//                             : quantity <= 10
//                               ? "text-warning"
//                               : "text-success"
//                         }
//                       >
//                         {quantity}
//                       </strong>
//                     </td>

//                     <td>
//                       <span className={`badge ${statusClass}`}>{status}</span>
//                     </td>

//                     <td>
//                       <button
//                         className="btn btn-primary btn-sm me-2"
//                         onClick={() =>
//                           navigate(`/inventory/add-stock/${product._id}`)
//                         }
//                       >
//                         <FaPlus className="me-1" />
//                         Add Stock
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//       {data.pages > 1 && (
//         <Paginate
//           page={data.page}
//           pages={data.pages}
//           keyword={keyword ? keyword : ""}
//         />
//       )}
//     </div>
//   );
// };

// export default InventoryListScreen;


import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../redux/slices/productApiSlice";
import Paginate from "../../components/Paginate";

const InventoryListScreen = () => {
  const navigate = useNavigate();

  // Give default values
  const {
    pageNumber = 1,
    keyword = "",
  } = useParams();

  // Get products from backend
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  // Safely get products
  const products = data?.products || [];

  // Safely get pagination values
  const currentPage = data?.page || 1;
  const totalPages = data?.pages || 1;

  return (
    <div className="container-fluid px-4">

      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="fw-bold mb-1">
            Inventory
          </h1>

          <p className="text-muted mb-0">
            Manage product stock and inventory
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={() =>
            navigate("/inventory")
          }
        >
          <FaPlus className="me-2" />
          Add Stock
        </button>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="row mb-4">

        <div className="col-md-6">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search product, category, brand..."
              value={keyword}
              onChange={(e) => {
                const value = e.target.value;

                if (value.trim()) {
                  navigate(
                    `/inventory/search/${value}/page/1`
                  );
                } else {
                  navigate("/inventory");
                }
              }}
            />

          </div>

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {isError && (
        <div className="alert alert-danger">
          {error?.data?.message ||
            "Failed to load inventory"}
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="table-responsive">

        <table className="table table-bordered table-hover align-middle">

          <thead className="table-light">

            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>QTY AVAILABLE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>

          </thead>

          <tbody>

            {/* Loading */}

            {isLoading && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-5"
                >
                  Loading inventory...
                </td>
              </tr>
            )}

            {/* No products */}

            {!isLoading &&
              products.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-5"
                  >
                    No products found
                  </td>
                </tr>
              )}

            {/* Products */}

            {!isLoading &&
              products.map((product) => {

                const quantity =
                  product.countInStock ?? 0;

                let status = "In Stock";
                let statusClass =
                  "bg-success";

                if (quantity === 0) {
                  status = "Out of Stock";
                  statusClass = "bg-danger";
                } else if (quantity <= 10) {
                  status = "Low Stock";
                  statusClass =
                    "bg-warning text-dark";
                }

                return (
                  <tr key={product._id}>

                    {/* ID */}

                    <td>
                      <small>
                        {product._id}
                      </small>
                    </td>

                    {/* NAME */}

                    <td>
                      <strong>
                        {product.name}
                      </strong>
                    </td>

                    {/* PRICE */}

                    <td>
                      ₹{product.price}
                    </td>

                    {/* CATEGORY */}

                    <td>
                      {product.category}
                    </td>

                    {/* BRAND */}

                    <td>
                      {product.brand}
                    </td>

                    {/* STOCK */}

                    <td className="text-center">

                      <strong
                        className={
                          quantity === 0
                            ? "text-danger"
                            : quantity <= 10
                              ? "text-warning"
                              : "text-success"
                        }
                      >
                        {quantity}
                      </strong>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`badge ${statusClass}`}
                      >
                        {status}
                      </span>

                    </td>

                    {/* ACTION */}

                    <td>

                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() =>
                          navigate(
                            `/inventory/add-stock/${product._id}`
                          )
                        }
                      >
                        <FaPlus className="me-1" />
                        Add Stock
                      </button>

                    </td>

                  </tr>
                );
              })}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}

      {!isLoading &&
        totalPages > 1 && (

          <Paginate
            page={currentPage}
            pages={totalPages}
            keyword={keyword}
          />

        )}

    </div>
  );
};

export default InventoryListScreen;