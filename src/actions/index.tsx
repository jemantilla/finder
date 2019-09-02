import * as constants from "../constants";
import { SortSettings } from "../types/SortSettings.interface";

// export interface SetUsersData {
//   type: constants.SET_USERS_DATA;
//   users_data: User[];
// }

// export const setUsersData = (data: User[]): SetUsersData => ({
//   type: constants.SET_USERS_DATA,
//   users_data: data
// });

export interface SetSortSettings {
  type: constants.SET_SORT_SETTINGS;
  data: SortSettings;
}

export const setSortSettings = (data: SortSettings): SetSortSettings => ({
  type: constants.SET_SORT_SETTINGS,
  data: data
});
