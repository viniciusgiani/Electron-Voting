import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainState, TUserDetails } from './types'


// Define the initial state using that type
const initialState: IMainState = {
  voted: undefined,
  user_details: undefined,
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserDetails: (state, action: PayloadAction<TUserDetails>) => {
      state.user_details = action.payload
    },
    
    setVoted: (state, action: PayloadAction<number>) => {
      state.voted = action.payload
    },

  },
})

export const { 
    updateUserDetails,
    setVoted
 } = mainSlice.actions

export default mainSlice.reducer