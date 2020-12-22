import create from "zustand";
import { devtools, redux } from "zustand/middleware";
import { AuthReducer } from "./AuthReducer";

const initialState = null;

const useAuthStore = create(
  // Connects store to devtools
  // Without reducers and action-types you would see "setState" logged out instead
  devtools(
    // Transforms our store into a redux action dispatcher ...
    // Adds a dispatch method to the store as well as to the api
    redux(AuthReducer, initialState)
  )
);

export { useAuthStore };
