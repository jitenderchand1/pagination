import * as types from '../constants/ActionTypes';

export function addFriend(name, id) {
  return {
    type: types.ADD_FRIEND,
    name,
    id,
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

export function selectGender(id, gender) {
    return {
        type: types.SELECT_GENDER,
        id,
        gender
    };
}
