export function ebayOrdersHasErrored(state = [], action) {
    switch (action.type) {
        case 'EBAY_ORDERS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function ebayOrdersIsLoading(state = [], action) {
    switch (action.type) {
        case 'EBAY_ORDERS_IS_LOADING':
            return action.ebayOrdersIsLoading;

        default:
            return state;
    }
}

export function fileNameEbayPdf(state = [], action) {
    switch (action.type) {
        case 'FILE_NAME_EBAY_PDF':
            return action.fileNameEbayPdf;

        default:
            return state;
    }
}

export function ebayOrders(state = [], action) {
    switch (action.type) {
        case 'EBAY_ORDERS_FETCH_DATA_SUCCESS':
            return action.ebayOrders;
        case 'EBAY_ORDERS_UPDATE':
            return action.ebayOrders;

        default:
            return state;
    }
}



