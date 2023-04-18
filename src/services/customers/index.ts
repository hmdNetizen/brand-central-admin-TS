import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";
import {
  initStateTypes,
  CustomerExcerptPayloadType,
  SingleCustomerPayloadType,
  AllCustomersPayloadType,
  PaginatedCustomersQueryType,
  DeleteCustomerType,
} from "./CustomerTypes";
import { UserProfileReturnedPayload } from "../user/UserTypes";
import { toast } from "react-toastify";
import { capitalizeFirstLetters } from "src/lib/helpers";

const initialState: initStateTypes = {
  loadingCustomers: false,
  customers: [],
  recentCustomers: [],
  numberOfCustomersInThirtyDays: 0,
  totalCustomers: 0,
  loadingSingleCustomer: false,
  loadingCustomerAction: false,
  deletingCustomer: false,
  singleCustomer: null,
  error: null,
};

export const getAllCustomers = createAsyncThunk(
  "get-all-customers",
  async (details: PaginatedCustomersQueryType, thunkAPI) => {
    try {
      const { page, limit, isBlocked } = details;
      const isInActive = isBlocked ? `&isBlocked=${isBlocked}` : "";
      const { data } = await axios.get(
        `/api/customers/v1?page=${page}&limit=${limit}${isInActive}`
      );
      const result = data as AllCustomersPayloadType;

      return {
        customers: result.data.customers,
        totalCustomers: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getSearchedCustomers = createAsyncThunk(
  "searched-customers",
  async (details: PaginatedCustomersQueryType, thunkAPI) => {
    try {
      const { page, limit, isBlocked, searchTerm } = details;

      const isInActive = isBlocked ? `&isBlocked=${isBlocked}` : "";
      const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

      const { data } = await axios.get(
        `/api/customers/v1?page=${page}&limit=${limit}${isInActive}${searchQuery}`
      );
      const result = data as AllCustomersPayloadType;

      return {
        customers: result.data.customers,
        totalCustomers: result.data.total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching customers"
      );
    }
  }
);

export const getRecentCustomers = createAsyncThunk(
  "get-customers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/customers/recent");
      const result = data as CustomerExcerptPayloadType;

      return {
        data: result.data.data,
        lastThirtyDays: result.data.lastThirtyDays,
        totalCustomers: result.data.totalCustomers,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching customers"
      );
    }
  }
);

export const getSingleCustomer = createAsyncThunk(
  "single-customer",
  async (customerId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/customers/${customerId}`);
      const result = data as SingleCustomerPayloadType;

      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error occurred while fetching customer data"
      );
    }
  }
);

export const handleToggleCustomerBlock = createAsyncThunk(
  "block-unblock-customer",
  async (details: { customerId: string; isBlocked: boolean }, thunkAPI) => {
    const { customerId, isBlocked } = details;
    try {
      await axios.patch(`/api/customers/${customerId}/block`, {
        isBlocked,
      });

      return details;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const unblockCustomer = createAsyncThunk(
  "unblock-customer",
  async (customerId: string, thunkAPI) => {
    try {
      const { status } = await axios.patch(
        `/api/customers/${customerId}/block`,
        {
          isBlocked: false,
        }
      );

      // if (status === 200) {
      //   getAllBlockedCustomers();
      // }

      return customerId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "delete",
  async (details: DeleteCustomerType, thunkAPI) => {
    const { customerId, setOpenDeleteCustomer } = details;
    try {
      const { status } = await axios.delete(
        `/api/customers/${customerId}/remove`
      );

      if (status === 200) {
        setOpenDeleteCustomer(false);
        thunkAPI.dispatch(clearSingleCustomer());
      }

      return customerId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Customer could not be deleted");
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCurrentCustomer: (
      state,
      action: PayloadAction<UserProfileReturnedPayload>
    ) => {
      state.singleCustomer = action.payload;
    },
    clearSingleCustomer: (state) => {
      state.singleCustomer = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.loadingCustomers = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loadingCustomers = false;
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.totalCustomers;
        state.error = null;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loadingCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSearchedCustomers.fulfilled, (state, action) => {
        state.loadingCustomers = false;
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.totalCustomers;
        state.error = null;
      })
      .addCase(getSearchedCustomers.rejected, (state, action) => {
        state.loadingCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getRecentCustomers.pending, (state) => {
        state.loadingCustomers = true;
      })
      .addCase(getRecentCustomers.fulfilled, (state, action) => {
        state.loadingCustomers = false;
        state.recentCustomers = action.payload.data;
        state.numberOfCustomersInThirtyDays = action.payload.lastThirtyDays;
        state.totalCustomers = action.payload.totalCustomers;
      })
      .addCase(getRecentCustomers.rejected, (state, action) => {
        state.loadingCustomers = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(getSingleCustomer.pending, (state) => {
        state.loadingSingleCustomer = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.loadingSingleCustomer = false;
        state.singleCustomer = action.payload;
        state.error = null;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.loadingSingleCustomer = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(handleToggleCustomerBlock.pending, (state) => {
        state.loadingCustomerAction = true;
      })
      .addCase(handleToggleCustomerBlock.fulfilled, (state, action) => {
        state.loadingCustomerAction = false;
        state.customers = state.customers.map((customer) =>
          customer._id === action.payload.customerId
            ? { ...customer, isBlocked: action.payload.isBlocked }
            : customer
        );
        state.error = null;

        // Handles toastify notification
        const customerIndex = state.customers.findIndex(
          (customer) => customer._id === action.payload.customerId
        );
        const customerName = capitalizeFirstLetters(
          state.customers[customerIndex].companyName
        );

        if (action.payload.isBlocked) {
          toast.error(`${customerName} account has been blocked`, {
            position: "top-center",
            hideProgressBar: true,
          });
        } else {
          toast.success(`${customerName} account has been unblocked`, {
            position: "top-center",
            hideProgressBar: true,
          });
        }
      })
      .addCase(handleToggleCustomerBlock.rejected, (state, action) => {
        state.loadingCustomerAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(unblockCustomer.pending, (state) => {
        state.loadingCustomerAction = true;
      })
      .addCase(unblockCustomer.fulfilled, (state, action) => {
        state.loadingCustomerAction = false;
        state.customers = state.customers.map((customer) =>
          customer._id === action.payload
            ? { ...customer, isBlocked: false }
            : customer
        );
        state.error = null;

        // Handles toastify notification
        const customerIndex = state.customers.findIndex(
          (customer) => customer._id === action.payload
        );
        const customerName = state.customers[customerIndex].companyName;

        toast.success(
          `${capitalizeFirstLetters(customerName)} account has been unblocked`,
          {
            position: "top-center",
            hideProgressBar: true,
          }
        );
      })
      .addCase(unblockCustomer.rejected, (state, action) => {
        state.loadingCustomerAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(deleteCustomer.pending, (state) => {
        state.deletingCustomer = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.deletingCustomer = false;
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload
        );
        state.error = null;

        toast.success("Customer deleted successfully", {
          position: "top-center",
        });
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deletingCustomer = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const { setCurrentCustomer, clearSingleCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
