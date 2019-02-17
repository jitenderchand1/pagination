import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true,
      id: 1,
    },
    {
      name: 'Abraham Lincoln',
      starred: false,
      id: 2,
    },
    {
      name: 'George Washington',
      starred: false,
      id: 3,
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            name: action.name,
            id: action.id,
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item) => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item) => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };
    case types.SELECT_GENDER:{
      let friends = [...state.friendsById];
      let friend = friends.find((item) => item.id === action.id);
      friend.gender = action.gender;
      return {
        ...state,
        friendsById: friends
      };
    }

    default:
      return state;
  }
}
