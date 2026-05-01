function createStore(initialState) {
    let state = initialState;
    let listeners = [];

    function getState() {
        return { ...state };
    }
    function setState(newState) {
        state = { ...state, ...newState };
        notify();
    }

    function notify() {
        listeners.forEach((fn) => fn(state));
        console.log();
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            listeners = listeners.filter((fn) => fn !== listener);
        };
    }

    return { getState, setState, subscribe };
}

export { createStore };
