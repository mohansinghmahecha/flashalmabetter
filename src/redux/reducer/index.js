/* application changes in response to actions
 */
const initialState = {
  noOfItemsInCart: 10,
};

/* default intial schema */
const initialGroup = [
  {
    itemId: "",
    groupName: "",
    groupDiscription: "",
    groupImage: "",

    groupItems: [
      {
        subGroupName: "",
        subGroupDiscription: "",
        subGroupId: 0,
        subGroupImage: "",
      },
    ],
  },
];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATED":
      return {
        ...state,
        noOfItemsInCart: state.noOfItemsInCart + 1,
      };
    default:
      return state;
  }
};

const groupCreating = (state = initialGroup, action) => {
  switch (action.type) {
    case "CREATE_GROUP":
      // Create a new group object with the provided details
      const newGroup = {
        itemId: action.payload.itemId,
        groupName: action.payload.groupName || "",
        groupDiscription: action.payload.groupDiscription || "",
        groupImage: action.payload.groupImage || "",
        groupItems: action.payload.groupItems || [], // Ensure empty array if not provided
      };

      // Concatenate the new group object with the existing groups
      return [...state, newGroup];
    default:
      return state;
  }
};

/*
 */

export { groupCreating, cartReducer };
