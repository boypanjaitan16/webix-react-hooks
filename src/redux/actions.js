export const setSession = (session) => {
    return {
        type    : "SET_SESSION",
        session
    }
}

export const clearSession = () => {
    return {
        type    : "CLEAR_SESSION"
    }
}