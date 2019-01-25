
export function productsByPage(state = 10, action) {
    switch (action.type) {
        case 'CHANGE_PRODUCTS_BY_PAGE':
            return action.productsByPage;

        default:
            return state;
    }
}