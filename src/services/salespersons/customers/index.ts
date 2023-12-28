import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";

import { config } from "src/config/config";
import axios from "src/services/axios";
import { setUploadPercentage } from "src/services/common";
import { QueryParams } from "src/services/types";
import { SalespersonOrdersPayloadTypes } from "../orders/types";
import {
  DeleteSalespersonCustomerRequestPayload,
  InitStateTypes,
  SalespersonCustomerPayloadTypes,
  SalespersonCustomerRequestPayload,
  SalespersonCustomerResponsePayload,
  SingleSalespersonCustomerReturnedPayloadTypes,
  UploadSalespersonCustomerInvoicesRequestTypes,
  UploadSalespersonCustomersRequestTypes,
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
  uploadedCustomerStatus: "",
  uploadingCustomerStatus: "",
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
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching customers"
        );
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
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching sales rep's customers"
        );
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
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching customer's profile"
        );
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
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching customer orders"
        );
      }
    }
  }
);

export const createNewSalespersonCustomer = createAsyncThunk(
  "create-salesperson-customer",
  async (dataset: SalespersonCustomerRequestPayload, thunkAPI) => {
    const { setOpen, setCustomerInformation, ...fields } = dataset;
    try {
      const { data, status } = await axios.post(
        config.salespersons.customers.add,
        fields
      );

      if (status === 201) {
        setOpen(false);

        if (setCustomerInformation) {
          setCustomerInformation({
            companyName: "",
            companyEmail: "",
            address: "",
            contactName: "",
            customerCode: "",
            initials: "",
            phoneNumber: "",
            priceCode: "",
          });
        }
      }

      const results = data as SingleSalespersonCustomerReturnedPayloadTypes;

      return results.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.errors);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while creating new customer"
        );
      }
    }
  }
);

export const updateSalespersonCustomer = createAsyncThunk(
  "update-salesperson-customer",
  async (
    dataset: SalespersonCustomerRequestPayload & { customerId: string },
    thunkAPI
  ) => {
    const { customerId, setOpen, ...fields } = dataset;
    try {
      const { data, status } = await axios.patch(
        config.salespersons.customers.update(customerId),
        fields
      );
      const result = data as SingleSalespersonCustomerReturnedPayloadTypes;

      if (status === 200) {
        setOpen(false);
      }

      return result.data;
    } catch (error: AxiosError | any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while updating customer"
        );
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
        return thunkAPI.rejectWithValue(
          "Error occurred while deleting customer"
        );
      }
    }
  }
);

export const getFilteredSalespersonCustomers = createAsyncThunk(
  "get-filtered-salesperson-customers",
  async (dataset: QueryParams & { searchTerm: string }, thunkAPI) => {
    const { limit, page, searchTerm } = dataset;
    try {
      const { data } = await axios.get(config.salespersons.customers.filter, {
        params: { page, limit, searchTerm },
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
        return thunkAPI.rejectWithValue(
          "Error occurred while fetching sales rep's customers"
        );
      }
    }
  }
);

export const uploadSalespersonCustomers = createAsyncThunk(
  "upload-salesperson-customers",
  async (dataset: Array<UploadSalespersonCustomersRequestTypes>, thunkAPI) => {
    const uploadConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(setUploadingCustomerText());

        const total = progressEvent.total;

        if (total !== undefined) {
          const percentage = Number(
            Math.round((progressEvent.loaded * 100) / total)
          );
          thunkAPI.dispatch(setUploadPercentage(percentage));
        }
      },
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(
          setUploadedCustomerStatusText("Updating Customers List")
        );

        const total = progressEvent.total;

        if (total !== undefined) {
          const percentage = Number(
            Math.round((progressEvent.loaded * 100) / total)
          );
          thunkAPI.dispatch(setUploadPercentage(percentage));
        }
      },
    };
    try {
      const { data } = await axios.patch(
        config.salespersons.customers.updateMany,
        { customers: dataset },
        uploadConfig
      );

      const result = data as { message: string };

      // if (status === 200) {
      //   thunkAPI.dispatch(
      //     setUploadedCustomerStatusText(result.message)
      //   );
      // }

      return result.message;
    } catch (error: AxiosError | any) {
      thunkAPI.dispatch(setUploadPercentage(0));
      thunkAPI.dispatch(setUploadedCustomerStatusText(""));
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while updating inventory"
        );
      }
    }
  }
);
export const uploadSalespersonCustomersInvoices = createAsyncThunk(
  "upload-customers-invoices",
  async (
    dataset: Array<UploadSalespersonCustomerInvoicesRequestTypes>,
    thunkAPI
  ) => {
    const uploadConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(setUploadingCustomerText());

        const total = progressEvent.total;

        if (total !== undefined) {
          const percentage = Number(
            Math.round((progressEvent.loaded * 100) / total)
          );
          thunkAPI.dispatch(setUploadPercentage(percentage));
        }
      },
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        thunkAPI.dispatch(
          setUploadedCustomerStatusText("Updating Customers Invoices")
        );

        const total = progressEvent.total;

        if (total !== undefined) {
          const percentage = Number(
            Math.round((progressEvent.loaded * 100) / total)
          );
          thunkAPI.dispatch(setUploadPercentage(percentage));
        }
      },
    };
    try {
      const { data } = await axios.patch(
        config.salespersons.invoices.updateMany,
        { invoices: dataset },
        uploadConfig
      );

      const result = data as { message: string };

      return result.message;
    } catch (error: AxiosError | any) {
      thunkAPI.dispatch(setUploadPercentage(0));
      thunkAPI.dispatch(setUploadedCustomerStatusText(""));
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("No response received from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Error occurred while updating inventory"
        );
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
    setUploadingCustomerText: (state) => {
      state.uploadingCustomerStatus = "Uploading Files";
      state.uploadedCustomerStatus = "";
    },
    setUploadedCustomerStatusText: (state, action) => {
      state.uploadedCustomerStatus = action.payload;
      state.uploadingCustomerStatus = "";
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
    builder.addCase(
      getFilteredSalespersonCustomers.fulfilled,
      (state, action) => {
        state.salespersonCustomers = action.payload.customers;
        state.totalCustomers = action.payload.total;
        state.error = null;
      }
    );
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
    builder
      .addCase(updateSalespersonCustomer.pending, (state) => {
        state.loadingSalespersonCustomerAction = true;
      })
      .addCase(updateSalespersonCustomer.fulfilled, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        state.salespersonCustomers = state.salespersonCustomers.map(
          (customer) =>
            customer.id === action.payload.id ? action.payload : customer
        );
        state.error = null;

        toast.success(
          `${action.payload.companyName} account has been updated.`,
          {
            position: "top-center",
            hideProgressBar: true,
          }
        );
      })
      .addCase(updateSalespersonCustomer.rejected, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(uploadSalespersonCustomers.pending, (state) => {
        state.loadingSalespersonCustomerAction = true;
      })
      .addCase(uploadSalespersonCustomers.fulfilled, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        state.uploadedCustomerStatus = action.payload;
        state.error = null;
        state.errors = [];
      })
      .addCase(uploadSalespersonCustomers.rejected, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        if (Array.isArray(action.payload)) {
          state.errors = action.payload;
        }
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
    builder
      .addCase(uploadSalespersonCustomersInvoices.pending, (state) => {
        state.loadingSalespersonCustomerAction = true;
      })
      .addCase(
        uploadSalespersonCustomersInvoices.fulfilled,
        (state, action) => {
          state.loadingSalespersonCustomerAction = false;
          state.uploadedCustomerStatus = action.payload;
          state.error = null;
          state.errors = [];
        }
      )
      .addCase(uploadSalespersonCustomersInvoices.rejected, (state, action) => {
        state.loadingSalespersonCustomerAction = false;
        if (Array.isArray(action.payload)) {
          state.errors = action.payload;
        }
        if (typeof action.payload === "string" || action.payload === null) {
          state.error = action.payload;
        }
      });
  },
});

export const {
  setCurrentSalespeopleCustomer,
  setUploadingCustomerText,
  setUploadedCustomerStatusText,
} = salespersonCustomerSlice.actions;
export default salespersonCustomerSlice.reducer;
