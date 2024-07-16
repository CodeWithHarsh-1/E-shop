import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartProductType } from "@/app/product/[productId]/productDetails";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() => {
        const cartItems = localStorage.getItem("eshopCartItems");
        const cProducts = cartItems ? JSON.parse(cartItems) : null;
        setCartProducts(cProducts);
        if (cProducts) {
            setCartTotalQty(cProducts.length);
        }
    }, []);

    useEffect(() => {
        const calculateTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts.reduce(
                    (acc, item) => {
                        const itemTotal = item.price * item.quantity;
                        acc.total += itemTotal;
                        acc.qty += item.quantity;
                        return acc;
                    },
                    { total: 0, qty: 0 }
                );

                setCartTotalAmount(total);
                setCartTotalQty(qty);
            }
        };

        calculateTotals();
    }, [cartProducts]);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev ? [...prev, product] : [product];
            toast.success("Product added to cart");
            localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
            setCartTotalQty(updatedCart.length);
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
            setCartProducts(filteredProducts);
            toast.success("Product removed from cart");
            localStorage.setItem("eshopCartItems", JSON.stringify(filteredProducts));
            setCartTotalQty(filteredProducts.length);
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        if (product.quantity === 99) {
            return toast.error("Maximum quantity reached");
        }

        if (cartProducts) {
            const updatedCart = cartProducts.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartProducts(updatedCart);
            localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        if (product.quantity === 1) {
            return toast.error("Minimum quantity reached");
        }

        if (cartProducts) {
            const updatedCart = cartProducts.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCartProducts(updatedCart);
            localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.removeItem("eshopCartItems");
    }, []);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
