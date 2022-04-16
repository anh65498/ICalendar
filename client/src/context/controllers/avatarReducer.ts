import { GlobalState, Action } from 'context/GlobalReducer';

export type UpdateAvatarPayload = {
  hair?: number;
  hats?: number;
  bottoms?: number;
  tops?: number;
  shoes?: number;
  facialHair?: number;
  accessories?: number;
};

export const updateAvatar = (state: GlobalState, action: Action) => {
  if (action.type !== 'UPDATE_AVATAR') {
    return state;
  }
  return { ...state, avatar: { ...state.avatar, ...action.payload } };
};
