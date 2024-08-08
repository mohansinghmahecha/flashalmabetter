// add type of actions are declared there 
export const addgroup = (task) => {
    return { 
        type: 'CREATED',
        payload: task
    };
};

export const createGroup = (grp) => {
    return {
        type: 'CREATE_GROUP',
        payload: grp
    }
}
