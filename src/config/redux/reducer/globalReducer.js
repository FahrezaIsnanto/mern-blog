const initialState = {
    name:'Fahreza Isnanto'
}


const globalReducer = (state = initialState,action) => {
    if(action.type === 'UPDATE_NAME'){
        return {
            ...state,
            name:'Zulfikar Isnanto'
        }
    }
    return state;
}

export default globalReducer;

