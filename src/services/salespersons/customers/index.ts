import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { config } from "src/config/config";
import axios from "src/services/axios";
import { QueryParams } from "src/services/types";
import { SalespersonOrdersPayloadTypes } from "../orders/types";
import {
  DeleteSalespersonCustomerRequestPayload,
  InitStateTypes,
  SalespersonCustomerPayloadTypes,
  SalespersonCustomerRequestPayload,
  SalespersonCustomerResponsePayload,
  SingleSalespersonCustomerReturnedPayloadTypes,
} from "./types";

const initialState: InitStateTypes = {
  loadingSalespersonCustomers: false,
  loadingSingleSalespersonCustomer: false,
  loadingCustomerOrders: false,
  loadingSalespersonCustomerAction: false,
  salespersonCustomers: [],
  salespersonCustomerOrders: [],
  singleSalespersonCustomer: null,
  totalCustomers: 0,
  totalCustomerOrders: 0,
  error: null,
  errors: [],
};

type QueryTypes = QueryParams & { salespersonId: string };

export const getSalespeopleCustomers = createAsyncThunk(
  "get-salespeople-customers",
  async (details: QueryParams, thunkAPI) => {
    const { limit, page } = details;
    try {
      const { data } = await axios.get(config.salespersons.customers.get, {
        params: { page, limit },
      });
      const results = data as SalespersonCustomerPayloadTypes;

      return {
        customers: results.data.results,
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

export const getSingleSalespersonCustomers = createAsyncThunk(
  "get-single-salesperson-customers",
  async (details: QueryTypes, thunkAPI) => {
    const { page, limit, salespersonId } = details;
    try {
      const { data } = await axios.get(
        config.salespersons.customers.getById(salespersonId),
        {
          params: {
            page,
            limit,
          },
        }
      );

      const result = data as SalespersonCustomerPayloadTypes;

      return {
        customers: result.data.results,
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

export const getSalespersonCustomerProfile = createAsyncThunk(
  "get-salesperson-customer-profile",
  async (customerId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        config.salespersons.customers.profile(customerId)
      );
      const result = data as SalespersonCustomerResponsePayload;

      return result;
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

export const getSalespersonCustomerOrders = createAsyncThunk(
  "get-salesperson-customer-orders",
  async (details: QueryParams & { customerId: string }, thunkAPI) => {
    const { customerId, page, limit } = details;
    try {
      const { data } = await axios.get(
        config.salespersons.orders.getByCustomerId(customerId),
        {
          params: {
            page,
            limit,
          },
        }
      );

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

export const createNewSalespersonCustomer = createAsyncThunk(
  "create-salesperson-customer",
  async (dataset: SalespersonCustomerRequestPayload, thunkAPI) => {
    const { setOpen, ...fields } = dataset;
    try {
      const { data, status } = await axios.post(
        config.salespersons.customers.add,
        fields
      );

      if (status === 201) {
        setOpen(false);
      }

      const results = data as SingleSalespersonCustomerReturnedPayloadTypes;

      return results.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue("Error occurred while fetching orders");
      }
    }
  }
);

export const deleteSalespersonCustomer = createAsyncThunk(
  "delete-salesperson-customer",
  async (dataset: DeleteSalespersonCustomerRequestPayload, thunkAPI) => {
    const { customerId, setOpen } = dataset;
    try {
      const { status } = await axios.delete(
        config.salespersons.customers.delete(customerId)
      );

      if (status === 200) {
        setOpen(false);
      }

      return customerId;
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

const salespersonCustomerSlice = createSlice({
  name: "salespersonCustomers",
  initialState,
  reducers: {
    setCurrentSalespeopleCustomer: (
      state,
      action: PayloadAction<SalespersonCustomerResponsePayload>
    ) => {
      state.singleSalespersonCustomer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSingleSalespersonCustomers.pending, (state) => {
        state.loadingSalespersonCustomers = true;
      })
      .addCase(getSingleSalespersonCustomers.fulfilled, (state, action) => {
        state.loadingSalespersonCustomers = false;
        state.salespersonCustomers = action.payload.customers;
        state.totalCustomers = action.payload.total;
        state.error = null;
      })
      .addCase(getSingleSalespersonCustomers.rejected, (state, action) => {
        state.loadingSalespersonCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespeopleCustomers.pending, (state) => {
        state.loadingSalespersonCustomers = true;
      })
      .addCase(getSalespeopleCustomers.fulfilled, (state, action) => {
        state.loadingSalespersonCustomers = false;
        state.salespersonCustomers = action.payload.customers;
        state.totalCustomers = action.payload.total;
        state.error = null;
      })
      .addCase(getSalespeopleCustomers.rejected, (state, action) => {
        state.loadingSalespersonCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespersonCustomerProfile.pending, (state) => {
        state.loadingSingleSalespersonCustomer = true;
      })
      .addCase(getSalespersonCustomerProfile.fulfilled, (state, action) => {
        state.loadingSingleSalespersonCustomer = false;
        state.singleSalespersonCustomer = action.payload;
        state.error = null;
      })
      .addCase(getSalespersonCustomerProfile.rejected, (state, action) => {
        state.loadingSingleSalespersonCustomer = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSalespersonCustomerOrders.pending, (state) => {
        state.loadingCustomerOrders = true;
      })
      .addCase(getSalespersonCustomerOrders.fulfilled, (state, action) => {
        state.loadingCustomerOrders = false;
        state.salespersonCustomerOrders = action.payload.orders;
        state.totalCustomerOrders = action.payload.total;
        state.error = null;
      })
      .addCase(getSalespersonCustomerOrders.rejected, (state, action) => {
        state.loadingCustomerOrders = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(createNewSalespersonCustomer.pending, (state) => {
        state.loadingSalespersonCustomerAction = true;
      })
      .addCase(createNewSalespersonCustomer.fulfilled, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        state.salespersonCustomers = [
          action.payload,
          ...state.salespersonCustomers,
        ];
        state.errors = [];

        toast.success(
          `${action.payload.companyName} added as a Sales Rep's customer`,
          {
            position: "top-center",
            hideProgressBar: true,
          }
        );
      })
      .addCase(createNewSalespersonCustomer.rejected, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        if (Array.isArray(action.payload)) {
          state.errors = action.payload;
        }

        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteSalespersonCustomer.pending, (state) => {
        state.loadingSalespersonCustomerAction = true;
      })
      .addCase(deleteSalespersonCustomer.fulfilled, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        state.salespersonCustomers = state.salespersonCustomers.filter(
          (customer) => customer.id !== action.payload
        );
        state.error = null;

        toast.success(`Customer has been successfully deleted.`, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .addCase(deleteSalespersonCustomer.rejected, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentSalespeopleCustomer } =
  salespersonCustomerSlice.actions;
export default salespersonCustomerSlice.reducer;
