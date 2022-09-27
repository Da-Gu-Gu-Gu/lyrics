import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazomCoreAPi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazomCoreAPi.reducerPath]: shazomCoreAPi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazomCoreAPi.middleware),
});
