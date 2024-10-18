import { createReducer } from "@reduxjs/toolkit";
import {
  registerUser,
  addTracker,
  updateLocation,
  getFollowingLocations,
  toggleVisibility,
  addZone,
  checkZone,
  getLog,
  loadUser,
} from "./userActions";

export const userReducer = createReducer(
  {
    user: {},
    followingLocations: [],
    logs: [],
    zones: [],
    code: "",
    deviceId: "", 
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.code = action.payload.code;
        state.deviceId = action.payload.deviceId;
        state.zones = action.payload.zones;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.code = action.payload.code;
        state.zones = action.payload.zones;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTracker.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addTracker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFollowingLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFollowingLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.followingLocations = action.payload;
      })
      .addCase(getFollowingLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleVisibility.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVisibility.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(toggleVisibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(addZone.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkZone.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);