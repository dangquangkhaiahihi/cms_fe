import * as ActionType from '../type/actionTypes'

const initState = {
    total: 0,
    listConversations: [],
    selectedConversation: {
        id: "",
        listMessages: [],
        listDialogs: [],
        totalMessage: 0,
        conversation: {},
        selectedDialogId: ''
    },
    listIntents: [],
    listIntentTypes: [],
    listServices: [],
    listEntities: [],
    listTags: [],
    listChannels: [],
    urlPara: ""
};

const conversation = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionType.INIT_LIST_CONVERSATION:
        {
            const { data, total } = payload;
            return {
                ...state,
                listConversations: data,
                total,
                selectedConversation: {
                    ...state.selectedConversation,
                    id: data && data.length > 0 ? data[0].id : "",
                    conversation: data && data.length > 0 ? data[0] : {}
                }
            };
        }
    case ActionType.UPDATE_SINGLE_CONVERSATION:
        {
            const newConversation = payload.data;
            return {
                ...state,
                listConversations: state.listConversations.map(elm => elm.id === newConversation.id ? newConversation : elm),
                selectedConversation: {
                    ...state.selectedConversation,
                    conversation: state.selectedConversation.id === newConversation.id ? newConversation : state.selectedConversation.conversation
                }
            };
        }
    case ActionType.UPDATE_MULTI_CONVERSATION:
        {
            const newConversations = payload.data;
            return {
                ...state,
                listConversations: state.listConversations.map(oldConv => {
                    const newConv = newConversations.find(elm => elm.id === oldConv.id);
                    return newConv ? newConv : oldConv;
                })
            };
        }
    case ActionType.ADD_NEW_CONVERSATION:
        {
            const newConversations = payload.data;
            newConversations.reverse();
            const newListConversations = [...state.listConversations];
            newConversations.forEach(newConv => newListConversations.unshift(newConv));
            return {
                ...state,
                listConversations: newListConversations
            };
        }    
    case ActionType.INIT_CONVERSATION_MESSAGE:
        {
            const { data, total, conversation, dialogs } = payload;
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    listMessages: data,
                    listDialogs: dialogs || [],
                    totalMessage: total,
                    id: conversation.id,
                    conversation
                }
            };
        }
    case ActionType.LOAD_MORE_CONVERSATION_MESSAGE:
        {
            const { data, total } = payload;
            const newListMessages = [...state.selectedConversation.listMessages];
            data.forEach(newMessage => {
                if (!newListMessages.find(message => message.id === newMessage.id)) {
                    newListMessages.push(newMessage);
                }
            });
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    listMessages: newListMessages,
                    totalMessage: total
                }
            };
        }
    case ActionType.ADD_NEW_CONVERSATION_MESSAGE:
        {
            const newMessages = payload.data;
            newMessages.reverse();
            const newListMessages = [...state.selectedConversation.listMessages];
            newMessages.forEach(newMessage => {
                newListMessages.unshift(newMessage);
            });
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    listMessages: newListMessages,
                }
            };
        }
    case ActionType.LOAD_SENDED_MESSAGE:
        {
            const { data } = payload;
            const newListMessages = [...state.selectedConversation.listMessages];
            newListMessages.unshift(data);
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    listMessages: newListMessages,
                }
            };
        }

    case ActionType.INIT_LIST_TAG:
        {
            const { data } = payload;
            return {
                ...state,
                listTags: data
            };
        }
    case ActionType.INIT_LIST_INTENT_TYPE:
        {
            const { data } = payload;
            return {
                ...state,
                listIntentTypes: data
            };
        }
    case ActionType.INIT_LIST_INTENT:
        {
            const { data } = payload;
            return {
                ...state,
                listIntents: data
            };
        }
    case ActionType.INIT_LIST_ENTITY:
        {
            const { data } = payload;
            return {
                ...state,
                listEntities: data
            };
        }
    case ActionType.INIT_LIST_SERVICE:
        {
            const { data } = payload;
            return {
                ...state,
                listServices: data
            };
        }
    case ActionType.INIT_LIST_CHANNEL:
        {
            const { data } = payload;
            return {
                ...state,
                listChannels: data
            };
        }
    case ActionType.UPDATE_CONVERSATION_URL_PARA:
        {
            const { data } = payload;
            return {
                ...state,
                urlPara: data
            };
        }

    case ActionType.SELECT_CONVERSATION_DIALOG:
        {
            const { data } = payload;
            if (state.selectedConversation.selectedDialogId === data) {
                return {
                    ...state,
                    selectedConversation: {
                        ...state.selectedConversation,
                        selectedDialogId: ''
                    }
                };
            }
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    selectedDialogId: data
                }
            };
        }
    case ActionType.UPDATE_DIALOG_TAG:
        {
            const newDialog = payload.data;
            return {
                ...state,
                selectedConversation: {
                    ...state.selectedConversation,
                    listDialogs: state.selectedConversation.listDialogs.map(elm => elm.id === newDialog.id ? newDialog : elm)
                }
            };
        }
    default:
      return state
  }
}

export default conversation;
