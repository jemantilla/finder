import { FinderStore } from "../types/FinderStore.interface";
import { SetUsersData } from "../actions";
import { SET_USERS_DATA } from "../constants";

export function userData(
  state: FinderStore,
  action: SetUsersData
): FinderStore {
  switch (action.type) {
    case SET_USERS_DATA:
      const results = { ...state, users_data: action.users_data };
      return results;
  }
  return state;
}
