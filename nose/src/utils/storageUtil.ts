const ShoppingCartKey = "ShoppingCart";
export const setShoppingCart = (item: any) => {
    let items: any[] = localStorage.getItem(ShoppingCartKey) ? JSON.parse(localStorage.getItem(ShoppingCartKey) as string) : [];
    items.push(item);
    localStorage.setItem(ShoppingCartKey,JSON.stringify(items));
}

export const getShoppingCart = (): any[] => {
    if (localStorage.getItem(ShoppingCartKey) !== null) {
        return JSON.parse(localStorage.getItem(ShoppingCartKey) as string)
    } else {
        return [];
    }

}

export const removeShoppingCart = () => {
    localStorage.removeItem(ShoppingCartKey);
}