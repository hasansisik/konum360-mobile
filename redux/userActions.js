import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../config";

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ deviceId }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/user/register`, { deviceId });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/load",
  async ({ deviceId }, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/user/load-user/${deviceId}`);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Add Tracker
export const addTracker = createAsyncThunk(
  "user/addTracker",
  async ({ deviceId, code, nickname }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/user/add-tracker`, { deviceId, code, nickname });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Update Location
export const updateLocation = createAsyncThunk(
  "user/updateLocation",
  async ({ deviceId, latitude, longitude }, thunkAPI) => {
    try {
      const response = await axios.put(`${server}/user/update-location`, { deviceId, latitude, longitude });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Get Following Locations
export const getFollowingLocations = createAsyncThunk(
  "user/getFollowingLocations",
  async ({ deviceId }, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/user/following-locations/${deviceId}`);
      return response.data.followingLocations;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Toggle Visibility
export const toggleVisibility = createAsyncThunk(
  "user/toggleVisibility",
  async ({ deviceId, visibility }, thunkAPI) => {
    try {
      const response = await axios.patch(`${server}/user/toggle-visibility`, { deviceId, visibility });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Add Zone
export const addZone = createAsyncThunk(
  "user/addZone",
  async ({ deviceId, title, latitude, longitude, zoneRadius }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/user/add-zone`, { deviceId, title, latitude, longitude, zoneRadius });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Check Zone
export const checkZone = createAsyncThunk(
  "user/checkZone",
  async ({ deviceId }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/user/check-zone`, { deviceId });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// Get Log
export const getLog = createAsyncThunk(
  "user/getLog",
  async ({ deviceId }, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/user/get-log`, { params: { deviceId } });
      return response.data.followingLogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
