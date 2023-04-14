import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import { toast } from "react-toastify";
import {
  initStateType,
  RecentOrdersPayloadType,
  RecentSalesPayloadType,
  OrdersCountReturnedPayload,
  OrderReturnedPayload,
  SendEmailType,
  SingleOrderPayloadType,
  OrderUpdateType,
  PaginatedOrdersPayloadType,
  PaginatedOrdersQueryType,
} from "./OrderTypes";
import React from "react";

const initialState: initStateType = {
  loadingOrders: false,
  loadingOrderAction: false,
  orders: [],
  totalOrders: 0,
  completedOrders: [],
  recentOrders: [],
  pendingOrdersCount: 0,
  processingOrdersCount: 0,
  completedOrdersCount: 0,
  lastThirtyDaysSale: 0,
  totalSales: 0,
  loadingSingleOrder: false,
  singleOrder: null,
  sendingEmail: false,
  emailSuccess: "",
  error: null,
};

export const fetchAllOrders = createAsyncThunk(
  "get-orders",
  async (details: PaginatedOrdersQueryType, thunkAPI) => {
    const { page, limit, status } = details;

    const orderStatus = status ? `&status=${status}` : "";

    try {
      const { data } = await axios.get(
        `/api/orders/v1?page=${page}&limit=${limit}${orderStatus}`
      );

      const result = data as PaginatedOrdersPayloadType;

      return {
        orders: result.data.orders,
        totalOrders: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching orders");
    }
  }
);

export const getAllSearchedOrders = createAsyncThunk(
  "searched-orders",
  async (details: PaginatedOrdersQueryType, thunkAPI) => {
    const { page, limit, status, searchTerm } = details;

    const orderStatus = status ? `&status${status}` : "";
    const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

    try {
      const { data } = await axios.get(
        `/api/orders/v1?page=${page}&limit=${limit}${orderStatus}${searchQuery}`
      );
      const result = data as PaginatedOrdersPayloadType;

      return {
        orders: result.data.orders,
        totalOrders: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching orders");
    }
  }
);

export const getRecentSales = createAsyncThunk(
  "recent-sales",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/completed/recent");
      const result = data as RecentSalesPayloadType;

      return {
        totalSales: result.data.total,
        lastThirtyDays: result.data.lastThirtyDays,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching sales");
    }
  }
);

export const getRecentOrders = createAsyncThunk(
  "recent-orders",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/recent");
      const result = data as RecentOrdersPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while fetching orders");
    }
  }
);

export const getOrdersCount = createAsyncThunk(
  "orders-count",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/orders/count");

      const result = data as OrdersCountReturnedPayload;

      return {
        processingOrders: result.data.processing,
        pendingOrders: result.data.pending,
        completedOrders: result.data.completed,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occured while fetching orders");
    }
  }
);

export const sendOrderStatusEmail = createAsyncThunk(
  "send-email",
  async (details: SendEmailType, thunkAPI) => {
    const { setOpen, ...fields } = details;

    try {
      const { status } = await axios.post(`/api/messages`, fields);

      if (status === 200) setOpen(false);

      return fields;
    } catch (error) {
      return thunkAPI.rejectWithValue("Email could not be sent");
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "single-order",
  async (orderId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      const result = data as SingleOrderPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Order could not be retrieved");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "update-order-status",
  async (details: OrderUpdateType, thunkAPI) => {
    const { orderId, setOpenDeliveryStatus, ...fields } = details;
    try {
      const { data, status } = await axios.patch(
        `/api/orders/${orderId}/status`,
        fields
      );
      const result = data as SingleOrderPayloadType;

      if (status === 200) {
        setOpenDeliveryStatus(false);
      }

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error occurred while updating order");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "delete-order",
  async (
    orderDetails: {
      orderId: string;
      setOpenDeleteOrder: React.Dispatch<React.SetStateAction<boolean>>;
    },
    thunkAPI
  ) => {
    const { orderId, setOpenDeleteOrder } = orderDetails;
    try {
      const { status } = await axios.delete(`/api/orders/${orderId}`);

      if (status === 200) {
        setOpenDeleteOrder(false);
      }

      return orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while attempting to delete order"
      );
    }
  }
);

export const markOrderStatusAsCompleted = createAsyncThunk(
  "mark-order-as-completed",
  async (orderId: string, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/orders/${orderId}/status`, {
        orderStatus: "completed",
        orderPaymentStatus: "paid",
      });
      const result = data as SingleOrderPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<OrderReturnedPayload>) => {
      state.singleOrder = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getAllSearchedOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getAllSearchedOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.error = null;
      })
      .addCase(getAllSearchedOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getRecentSales.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getRecentSales.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.lastThirtyDaysSale = action.payload.lastThirtyDays;
        state.totalSales = action.payload.totalSales;
        state.error = null;
      })
      .addCase(getRecentSales.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getRecentOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.recentOrders = action.payload;
        state.error = null;
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(getOrdersCount.fulfilled, (state, action) => {
      state.completedOrdersCount = action.payload.completedOrders;
      state.pendingOrdersCount = action.payload.pendingOrders;
      state.processingOrdersCount = action.payload.processingOrders;
    });
    builder
      .addCase(sendOrderStatusEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendOrderStatusEmail.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSuccess = "Email Sent";
        state.error = null;
      })
      .addCase(sendOrderStatusEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSuccess = "";
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.loadingSingleOrder = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loadingSingleOrder = false;
        state.singleOrder = action.payload;
        state.error = null;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.loadingSingleOrder = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loadingOrderAction = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loadingOrderAction = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload._id
            ? {
                ...order,
                orderStatus: action.payload.orderStatus,
                orderPaymentStatus: action.payload.orderPaymentStatus,
              }
            : order
        );

        toast.success("Order successfully updated", {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loadingOrderAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loadingOrderAction = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loadingOrderAction = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loadingOrderAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(markOrderStatusAsCompleted.pending, (state) => {
        state.loadingOrderAction = true;
      })
      .addCase(markOrderStatusAsCompleted.fulfilled, (state, action) => {
        state.loadingOrderAction = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload._id
            ? {
                ...order,
                ...action.payload,
              }
            : order
        );

        toast.success("Order successfully completed", {
          position: "top-center",
          hideProgressBar: true,
        });
        state.error = null;
      })
      .addCase(markOrderStatusAsCompleted.rejected, (state, action) => {
        state.loadingOrderAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
