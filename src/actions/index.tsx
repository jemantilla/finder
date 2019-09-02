import * as constants from "../constants";
import { SortSettings } from "../types/SortSettings.interface";

export interface SetSortSettings {
  type: constants.SET_SORT_SETTINGS;
  data: SortSettings;
}

export const setSortSettings = (data: SortSettings): SetSortSettings => ({
  type: constants.SET_SORT_SETTINGS,
  data: data
});
