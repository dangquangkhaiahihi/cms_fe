import * as ActionType from '../type/actionTypes'

const initState = {
    listTags: []
};

const tag = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionType.INIT_LIST_TAG:
        {
            const { data } = payload;
            return {
                ...state,
                listTags: data
            };
        }
    default:
      return state
  }
}

export default tag;
