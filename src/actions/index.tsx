import * as constants from "../constants";
import User from "../types/Users.interface";

export interface SetUsersData {
  type: constants.SET_USERS_DATA;
  users_data: User[];
}

export const setUsersData = (data: User[]): SetUsersData => ({
  type: constants.SET_USERS_DATA,
  users_data: data
});
