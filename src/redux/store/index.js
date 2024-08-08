import { createStore, combineReducers } from 'redux';
import { cartReducer, groupCreating } from '../reducer/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cartReducer,
  groupCreating,
});
/* persistor helps us when we refresh the page the data didnot gone it exists in a page 

*/
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);
/* export both store and persistor  */
export { store, persistor };
