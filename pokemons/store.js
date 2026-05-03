function createStore(initialState) {
    let state = initialState;
    let listeners = [];

    function getState() {
        return { ...state };
    }
    function setState(newState) {
        state = { ...state, ...newState };
        if (newState.theme) {
            localStorage.setItem("site-theme", newState.theme);
        }
        notify();
    }

    function notify() {
        const currentState = getState();
        listeners.forEach((listener) => listener(currentState));
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            listeners = listeners.filter((fn) => fn != listener);
        };
    }
    return { setState, getState, subscribe };
}
export { createStore };
