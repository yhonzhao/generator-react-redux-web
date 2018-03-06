function changeStatus(status = {request: false, success: false, failure: false}) {
    return Object.assign({request: false, success: false, failure: false}, status);
}

const initialState = {
    error: null,
    status: {request: false, success: false, failure: false},
    res: null,
    type: null
};

function makeTypes(actionTypes) {
    let requests = [];
    let successes = [];
    let failures = [];
    for (let actionType of actionTypes) {
        requests.push(actionType.REQUEST);
        successes.push(actionType.SUCCESS);
        failures.push(actionType.FAILURE);
    }
    return {requests, successes, failures};
}

export function createReduce(...actionTypes) {
    const {requests, successes, failures} = makeTypes(actionTypes);
    return (state = initialState, action = {}) => {
        switch (true) {
            case (requests.indexOf(action.type) >= 0):
                return Object.assign({}, state, {
                    status: changeStatus({request: true}),
                    type: action.type
                });
            case (successes.indexOf(action.type) >= 0):
                return Object.assign({}, state, {
                    status: changeStatus({success: true}),
                    res: action.res,
                    type: action.type
                });
            case (failures.indexOf(action.type) >= 0):
                return Object.assign({}, state, {
                    status: changeStatus({failure: true}),
                    error: action.error,
                    type: action.type
                });
            default:
                return state;
        }
    };
}
