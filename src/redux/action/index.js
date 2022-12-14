// Them item vao cart
export const addItem = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
};

// Xoa item khoi cart
export const delItem = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
};