export function amazonPdfFileHasErrored(state = false, action) {
    switch (action.type) {
        case 'AMAZON_PDF_FILE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function amazonPdfFileIsLoading(state = false, action) {
    switch (action.type) {
        case 'AMAZON_PDF_FILE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function amazonPdfFile(state = {}, action) {
    switch (action.type) {
        case 'AMAZON_PDF_FILE_FETCH_DATA_SUCCESS':
            return action.amazonPdfFile;

        default:
            return state;
    }
}