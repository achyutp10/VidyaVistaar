import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useAxios from '../../utils/useAxios';
import axios from 'axios';

const axiosInstance = useAxios(); // Use our custom Axios instance

const initialState = {
  accessToken: localStorage.getItem('access_token') || '',
  refreshToken: localStorage.getItem('refresh_token') || '',
  role: null, // Initially set to null
  user: null, // Initially set to null
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/register/', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login User
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/user/login/', formData);
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login/', formData);

      const { access, refresh, role, user } = response.data;
      // console.log("Login Response:", response.data);
      // console.log("User after login:", user);

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Dispatch setAuth to update the Redux store with the login data
      dispatch(authSlice.actions.setAuth({ access, refresh, role, user }));


      // Return the login data as a response for the component to use
      return { access, refresh, role, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/user/login/', formData);

//       // Store the tokens in localStorage
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);

//       // Return the response with role included
//       return {
//         access: response.data.access,
//         refresh: response.data.refresh,
//         role: response.data.role, // Ensure the role is included here
//       };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );




// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await axiosInstance.post('/logout/', { refresh: refreshToken });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Current User
// export const fetchCurrentUser = createAsyncThunk(
//   'auth/fetchCurrentUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/user/current/');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { getState }) => {
//   const { auth } = getState();
//   const response = await axiosInstance.get('/user/current/', {
//     headers: {
//       Authorization: `Bearer ${auth.access}`,
//     },
//   });
//   return response.data;
// });

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get('/user/current'); // Adjust based on your API
      // console.log("Fetch Current User Response", response.data);  // Add this log


      const { role, user } = response.data;

      // Update Redux state
      dispatch(authSlice.actions.setAuth({ user: response.data, role: response.data.role, isAuthenticated: true }));

      return { user: response.data, role: response.data.role }; // Ensure you return these details
    } catch (error) {
      // If fetching the user fails, set authenticated to false
      dispatch(authSlice.actions.setAuth({ user: null, role: null, isAuthenticated: false }));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setAuth: (state, action) => {
    //   const { access, refresh, role, user } = action.payload;
    //   console.log("Setting Auth:", action.payload);  // Add this log
    //   state.access = access;
    //   state.refresh = refresh;
    //   state.role = role;
    //   state.user = user;
    //   state.isAuthenticated = true;
    // },
    setAuth: (state, action) => {
      console.log("Setting Auth:", action.payload); // Debug log
      const { access, refresh, role, user } = action.payload || {};
      state.access = access || null;
      state.refresh = refresh || null;
      state.role = role || null;
      state.user = user || null;
      state.isAuthenticated = !!user; // Set based on user presence
    },
    // loginSuccess(state, action) {
    //   state.user = action.payload.user;
    //   state.isAuthenticated = true;
    //   state.role = action.payload.role;
    //   state.token = action.payload.token;
    // },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isAuthenticated = true;
      //   state.accessToken = action.payload.access;
      //   state.refreshToken = action.payload.refresh;
      //   state.user = action.payload.user; // Store user details
      //   state.role = action.payload.role; // Store user role
      // })

      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.access = action.payload.access;
      //   state.refresh = action.payload.refresh;
      //   // state.user = { ...state.user, role: action.payload.role };
      //   state.user = action.payload.user; // Correctly set user
      //   state.role = action.payload.role;
      //   state.isAuthenticated = true;
      //   state.isLoading = false;
      // })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user || state.user; // Preserve existing user if not provided
        // state.role = action.payload.role || state.role; // Preserve role
        state.role = action.payload.user.role || state.role; // Preserve role
        state.isAuthenticated = true;
        state.isLoading = false;
      })


      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // state.role = action.payload.role;  // Store role in the state
        state.role = action.payload.user.role;  // Store role in the state
        state.isAuthenticated = true;
      })
      // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   const { user, role } = action.payload || {};
      //   state.user = user || state.user; // Preserve existing user if undefined
      //   state.role = role || state.role;
      //   state.isAuthenticated = !!user;
      // })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
