export function apiErrorHandler(error) {
    throw error.response ?
        new Error(error.response.data.error) :
        error;
}