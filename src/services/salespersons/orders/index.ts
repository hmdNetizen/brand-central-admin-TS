import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { config } from "src/config/config";
import axios from "src/services/axios";
import {
  OrderPaymentStatusTypes,
  OrderStatusTypes,
} from "src/services/orders/OrderTypes";
import { QueryParams } from "src/services/types";
import {
  SalespersonOrderInitStateTypes,
  SalespersonOrderResponsePayload,
  SalespersonOrdersPayloadTypes,
  SingleSalespersonOrderPayloadTypes,
  UpdateSalespersonOrderRequestPayload,
} from "./types";

const initialState: SalespersonOrderInitStateTypes = {
  loadingOrders: false,
  loadingOrderAction: false,
  loadingSingleOrder: false,
  salespersonOrders: [],
  salespersonPendingOrders: [],
  salespersonCompletedOrders: [],
  totalOrders: 0,
  pendingOrdersTotal: 0,
  error: null,
  singleOrder: null,
};

export const getSingleSalespersonOrders = createAsyncThunk(
  "get-single-salesperson-orders",
  async (details: QueryParams & { salespersonId: string }, thunkAPI) => {
    const { page, limit, salespersonId } = details;

    try {
      const { data } = await axios.get(
        config.salespersons.orders.getBySalespersonId(salespersonId),
        { params: { page, limit } }
      );

      const result = data as SalespersonOrdersPayloadTypes;

      return {
        orders: result.data.results,
        total: result.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const getSalespersonSingleOrder = createAsyncThunk(
  "create-salesperson-single-order",
  async (orderId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        config.salespersons.orders.getById(orderId)
      );
      const result = data as SingleSalespersonOrderPayloadTypes;

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const getAllSalespersonsOrders = createAsyncThunk(
  "get-sales-person-order-status",
  async (details: QueryParams & { status: string }, thunkAPI) => {
    const { page, limit, status } = details;
    try {
      const { data } = await axios.get(config.salespersons.orders.getByStatus, {
        params: {
          status,
          page,
          limit,
        },
      });

      const results = data as SalespersonOrdersPayloadTypes;

      return {
        orders: results.data.results,
        total: results.data.total,
      };
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const updateSalespersonOrderStatus = createAsyncThunk(
  "update-order-status",
  async (details: UpdateSalespersonOrderRequestPayload, thunkAPI) => {
    const { orderId, setOpen, ...fields } = details;
    try {
      const { data, status } = await axios.patch(
        config.salespersons.orders.update(orderId),
        fields
      );
      const results = data as SingleSalespersonOrderPayloadTypes;

      if (status === 200 && setOpen) {
        setOpen(false);
      }

      return results.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const countSalespersonOrderByStatus = createAsyncThunk(
  "count-salesperson-order-by-status",
  async (status: OrderStatusTypes, thunkAPI) => {
    try {
      const { data } = await axios.get(
        config.salespersons.orders.countByStatus,
        { params: { status } }
      );

      const result = data as {
        data: {
          total: number;
        };
      };

      return result.data.total;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

const salespersonOrdersSlice = createSlice({
  name: "salespersonOrders",
  initialState,
  reducers: {
    setCurrentSalespersonOrder: (
      state,
      action: PayloadAction<SalespersonOrderResponsePayload>
    ) => {
      state.singleOrder = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSingleSalespersonOrders.pending, (state, action) => {
        state.loadingOrders = true;
      })
      .addCase(getSingleSalespersonOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.salespersonOrders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.error = null;
      })
      .addCase(getSingleSalespersonOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespersonSingleOrder.pending, (state) => {
        state.loadingSingleOrder = true;
      })
      .addCase(getSalespersonSingleOrder.fulfilled, (state, action) => {
        state.loadingSingleOrder = false;
        state.singleOrder = action.payload;
        state.error = null;
      })
      .addCase(getSalespersonSingleOrder.rejected, (state, action) => {
        state.loadingSingleOrder = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getAllSalespersonsOrders.pending, (state) => {
        state.loadingOrders = true;
      })
      .addCase(getAllSalespersonsOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.salespersonOrders = action.payload.orders;
        state.salespersonPendingOrders = action.payload.orders.filter(
          (order) => order.orderStatus === "pending"
        );
        state.salespersonCompletedOrders = action.payload.orders.filter(
          (order) => order.orderStatus === "completed"
        );
        state.totalOrders = action.payload.total;
        state.error = null;
      })
      .addCase(getAllSalespersonsOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(updateSalespersonOrderStatus.pending, (state) => {
        state.loadingOrderAction = true;
      })
      .addCase(updateSalespersonOrderStatus.fulfilled, (state, action) => {
        state.loadingOrderAction = false;
        state.salespersonOrders = state.salespersonOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.error = null;
      })
      .addCase(updateSalespersonOrderStatus.rejected, (state, action) => {
        state.loadingOrderAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder.addCase(
      countSalespersonOrderByStatus.fulfilled,
      (state, action) => {
        state.pendingOrdersTotal = action.payload;
      }
    );
  },
});

export const { setCurrentSalespersonOrder } = salespersonOrdersSlice.actions;
export default salespersonOrdersSlice.reducer;
