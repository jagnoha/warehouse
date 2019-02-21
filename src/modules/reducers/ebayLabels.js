export function ebayLabelsHasErrored(state = false, action) {
    switch (action.type) {
        case 'EBAY_LABELS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function ebayLabelsIsLoading(state = false, action) {
    switch (action.type) {
        case 'EBAY_LABELS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function ebayLabels(state = "", action) {
    switch (action.type) {
        case 'EBAY_LABELS_FETCH_DATA_SUCCESS':
            return action.ebayLabels;
        case 'EBAY_LABELS_UPDATE':
            return action.ebayLabels;

        default:
            return state;
    }
}