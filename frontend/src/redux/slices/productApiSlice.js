import { PRODUCTS_URL, UPLOAD_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const productApislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Products"],
    }),
    uploadImageProduct: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
    }),
    addStock: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/api/products/${id}/stock`,
        method: "PUT",
        body: {
          quantity,
        },
      }),
    }),
    createNewProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImageProductMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
  useCreateNewProductMutation,
  useAddStockMutation,
} = productApislice;

// keepUnusedDataFor-> keep data for 5 seconds after page leave
// invalidatesTags-> check thr product in lack is outdated or not
// provideTags -> this lack contains this type of data
