import { SortSettings } from "../types/SortSettings.interface";
import { SetSortSettings } from "../actions";
import { SET_SORT_SETTINGS } from "../constants";

export function sortData(
  state: SortSettings,
  action: SetSortSettings
): SortSettings {
  switch (action.type) {
    case SET_SORT_SETTINGS:
      const results = { ...state, sort: action.data.sort };
      return results;
  }
  return state;
}
