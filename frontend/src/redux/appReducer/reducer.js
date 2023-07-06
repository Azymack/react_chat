import * as types from "./actionType"

const initialState = {

    isSearchUserProcessing: false,
    isSearchUserSuccess: false,
    searchedUser: [],

    singleUserChatProcessing: false,
    singleUserChatsuccess: false,
    singleUserChatObj: {},

    getAllChatProcessing: false,
    getAllChatSuccess: false,
    getAllChatFail: false,
    allChat: [],

    createGroupChatProcessing: false,
    createGroupChatSuccess: false,
    createGroupChatFail: false,
    createGroupChatMessage: false,
    createdGouup: {},

    addMembersInGroupProcessing: false,
    addMembersInGroupSuccess: false,
    addMembersInGroupFail: false,
    addMembersInGroupMessage: "",
    addMembersInGroupObj: {},

    removeMembersFromGroupProcessing: false,
    removeMembersFromGroupSuccess: false,
    removeMembersFromGroupFail: false,
    removeMembersFromGroupMessage: "",
    removeMembersFromGroupObj: {},

    isRenameGroupProcessing: false,
    isRenameGroupSuccess: false,
    isRenameGroupFail: false,

    sendMessageProcessing: false,
    sendMessageSuccess: false,
    sendMessageFail: false,
    sendMessageObj: {},

    getMessageProcessing: false,
    getMessageSuccess: false,
    getMessageFail: false,
    getMessageData: {},

    selectedUserForChat: null,

    notficationsMessages: [],

    webSocket: "",
}

export const reducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.SEARCH_USER_PROCESSING:
            return {
                ...state,
                isSearchUserProcessing: true,
                isSearchUserSuccess: false,
                searchedUser: [],
            };
        case types.SEARCH_USER_SUCCESS:
            return {
                ...state,
                isSearchUserProcessing: false,
                isSearchUserSuccess: true,
                searchedUser: payload,
            };
        case types.SEARCH_USER_FAIL:
            return {
                ...state,
                isSearchUserProcessing: false,
                isSearchUserSuccess: false,
                searchedUser: [],
            };
        case types.SINGLE_CHAT_CREATE_PROCESSING:
            return {
                ...state,
                singleUserChatProcessing: true,
                singleUserChatsuccess: false,
                singleUserChatObj: {},
            };
        case types.SINGLE_CHAT_CREATE_SUCCESS:
            return {
                ...state,
                singleUserChatProcessing: false,
                singleUserChatsuccess: true,
                singleUserChatObj: payload,
            };
        case types.SINGLE_CHAT_CREATE_FAIL:
            return {
                ...state,
                singleUserChatProcessing: false,
                singleUserChatsuccess: false,
                singleUserChatObj: {},
            };

        case types.ALL_CHATS_REQUEST_PROCESSING:
            return {
                ...state,
                getAllChatProcessing: true,
                getAllChatSuccess: false,
                getAllChatFail: false,
                allChat: []
            };
        case types.ALL_CHATS_REQUEST_SUCCESS:
            return {
                ...state,
                getAllChatProcessing: false,
                getAllChatSuccess: true,
                getAllChatFail: false,
                allChat: payload
            };
        case types.ALL_CHATS_REQUEST_FAIL:
            return {
                ...state,
                getAllChatProcessing: false,
                getAllChatSuccess: false,
                getAllChatFail: true,
                allChat: []
            };

        case types.CREATE_GROUP_REQUEST_PROCESSING:
            return {
                ...state,
                createGroupChatProcessing: true,
                createGroupChatSuccess: false,
                createGroupChatFail: false,
                createGroupChatMessage: false,
                createdGouup: {},
            };
        case types.CREATE_GROUP_REQUEST_SUCCESS:
            return {
                ...state,
                createGroupChatProcessing: false,
                createGroupChatSuccess: true,
                createGroupChatFail: false,
                createGroupChatMessage: "Group Successfully Created.",
                createdGouup: payload,

            };
        case types.CREATE_GROUP_REQUEST_FAIL:
            return {
                ...state,
                createGroupChatProcessing: false,
                createGroupChatSuccess: false,
                createGroupChatFail: true,
                createGroupChatMessage: "Failed To Create Group",
                createdGouup: {},
            };

        case types.RENAME_GROUP_REQUEST_PROCESSING:
            return {
                ...state,
                isRenameGroupProcessing: true,
                isRenameGroupSuccess: false,
                isRenameGroupFail: false,
            };
        case types.RENAME_GROUP_REQUEST_SUCCESS:
            return {
                ...state,
                selectedUserForChat: payload,
                isRenameGroupProcessing: false,
                isRenameGroupSuccess: true,
                isRenameGroupFail: false,

            };
        case types.RENAME_GROUP_REQUEST_FAIL:
            return {
                ...state,
                isRenameGroupProcessing: false,
                isRenameGroupSuccess: false,
                isRenameGroupFail: true,
            };

        case types.ADD_NEW_MEMBER_GROUP_REQUEST_PROCESSING:
            return {
                ...state,
                addMembersInGroupProcessing: true,
                addMembersInGroupSuccess: false,
                addMembersInGroupFail: false,
                addMembersInGroupMessage: "",
                addMembersInGroupObj: {},
            };
        case types.ADD_NEW_MEMBER_GROUP_REQUEST_SUCCESS:
            return {
                ...state,
                addMembersInGroupProcessing: false,
                addMembersInGroupSuccess: true,
                addMembersInGroupFail: false,
                addMembersInGroupMessage: "Members Successfully added to group",
                addMembersInGroupObj: payload,
            };
        case types.ADD_NEW_MEMBER_GROUP_REQUEST_FAIL:
            return {
                ...state,
                addMembersInGroupProcessing: false,
                addMembersInGroupSuccess: false,
                addMembersInGroupFail: true,
                addMembersInGroupMessage: payload,
                addMembersInGroupObj: {},
            };

        case types.REMOVE_MEMBER_FROM_GROUP_REQUEST_PROCESSING:
            return {
                ...state,
                removeMembersFromGroupProcessing: true,
                removeMembersFromGroupSuccess: false,
                removeMembersFromGroupFail: false,
                removeMembersFromGroupMessage: "",
                removeMembersFromGroupObj: {},
            };
        case types.REMOVE_MEMBER_FROM_GROUPP_REQUEST_SUCCESS:
            return {
                ...state,
                removeMembersFromGroupProcessing: false,
                removeMembersFromGroupSuccess: true,
                removeMembersFromGroupFail: false,
                removeMembersFromGroupMessage: "Successfully removed from group",
                removeMembersFromGroupObj: payload,
            };
        case types.REMOVE_MEMBER_FROM_GROUP_REQUEST_FAIL:
            return {
                ...state,
                removeMembersFromGroupProcessing: false,
                removeMembersFromGroupSuccess: false,
                removeMembersFromGroupFail: true,
                removeMembersFromGroupMessage: payload,
                removeMembersFromGroupObj: {},
            };


        case types.SELECT_USER_FOR_CHAT:
            return {
                ...state,
                selectedUserForChat: payload
            };

        case types.SEND_MESSAGE_REQUEST_PROCESSING:
            return {
                ...state,
                sendMessageProcessing: true,
                sendMessageSuccess: false,
                sendMessageFail: false,
                sendMessageObj: {},

            };
        case types.SEND_MESSAGE_REQUEST_SUCCESS:
            return {
                ...state,
                sendMessageProcessing: false,
                sendMessageSuccess: true,
                sendMessageFail: false,
                sendMessageObj: payload,
            };
        case types.SEND_MESSAGE_REQUEST_FAIL:
            return {
                ...state,
                sendMessageProcessing: false,
                sendMessageSuccess: false,
                sendMessageFail: true,
                sendMessageObj: {},
            };

        case types.GET_MESSAGE_REQUEST_PROCESSING:
            return {
                ...state,
                getMessageProcessing: true,
                getMessageSuccess: false,
                getMessageFail: false,
                getMessageData: {},

            };
        case types.GET_MESSAGE_REQUEST_SUCCESS:
            return {
                ...state,
                getMessageProcessing: false,
                getMessageSuccess: true,
                getMessageFail: false,
                getMessageData: payload,
            };
        case types.GET_MESSAGE_REQUEST_FAIL:
            return {
                ...state,
                getMessageProcessing: false,
                getMessageSuccess: false,
                getMessageFail: true,
                getMessageData: {},
            };
        case types.WEB_SOCKET_CONNECTED:
            return {
                ...state,
                webSocket: payload,
            };
        case types.WEB_SOCKET_RECEIVED_MESSAGE:
            return {
                ...state,
                getMessageData: [...state.getMessageData, payload],
            };
        case types.WEB_SOCKET_NOTIFICATION_RECEIVED:
            return {
                ...state,
                notficationsMessages: [...state.notficationsMessages, payload],
            };


        default:
            return state;
    }
}