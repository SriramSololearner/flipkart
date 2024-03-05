import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUrl, productsUrl, signupUrl } from "../../utilities/constants";
export const Token = localStorage.getItem("authToken");


export interface Istate {
    OrderId: string;
    check: boolean;
    profileUrl: string,
    postOffice: {
        Block?: string;
        BranchType?: string;
        Circle?: string;
        Country?: string;
        DeliveryStatus?: string;
        Description: null;
        District?: string;
        Division?: string;
        Name?: string;
        Pincode?: string;
        Region?: string;
        State: string;
    }[];
    adress: {
        id: number,
        username: string,
        mobile: string,
        pincode: string,
        area: string,
        adrs: string,
        city: string,
        state: string,
    }[]
    products: {
        id: number;
        title: string;
        description: string;
        category: string;
        price: number;
        rating: {
            rate: number;
            count: number;
        };
        image: string;
    }[];
    isAdded: boolean;
    uid: number;
    users:
    {
        id: number;
        username: string;
        email: string;
        password: string;
        contact: string;
        userType: string;
    }[],
    sellerProductMesage: string

    cart: {
        id: number;
        title: string;
        description: string;
        category: string;
        price: number;
        rating: {
            rate: number;
            count: number;
        };
        image: string;
        qty: number;
    }[];
    wishList: {
        id: number;
        title: string;
        description: string;
        category: string;
        price: number;
        rating: {
            rate: number;
            count: number;
        };
        image: string;
        qty: number;
    }[];
    currentUser: {
        id: number,
        email: string,
        contact: string,
        username: string,
        userType: string,
    },
    status: string;
    isLoading: boolean;
    msg: string;
    addWishList: boolean,
    allProducts: {
        productId: number;
        productName: string;
        description: string;
        productImage: string[];
        quantity: number;
        price: number;
        categoryImage: string;
        discount: number;
        categoryId: number;
        productCreatedAt: string;
        productUpdatedAt: string;
        weight: string;
    }[];
}

const initialState: Istate = {
    sellerProductMesage: "",
    adress: [{
        id: 1,
        username: "sriram",
        mobile: "7418529639",
        pincode: "533001",
        area: "Kakinada",
        adrs: "",
        city: "Kakinada",
        state: "Andhrapradesh",
    }],

    allProducts: [{
        productId: 0,
        productName: "",
        description: "",
        productImage: [''],
        quantity: 0,
        price: 0,
        discount: 0,
        categoryImage: "",
        categoryId: 0,
        productCreatedAt: "",
        productUpdatedAt: "",
        weight: "",
    }],
    profileUrl: "/static/images/avatar/2.jpg",
    msg: "",
    currentUser: {
        id: 1,
        email: "sriram123@gmail.com",
        contact: "7894561356",
        username: "Sriram Garapati",
        userType: "user"
    },
    postOffice: [
        {
            Block: "",
            BranchType: "",
            Circle: "",
            Country: "",
            DeliveryStatus: "",
            Description: null,
            District: "",
            Division: "",
            Name: "hyderabad",
            Pincode: "",
            Region: "",
            State: "",
        }
    ],
    check: false,
    OrderId: "",
    products: [],
    uid: 0,
    cart: [],
    wishList: [],
    isAdded: false,
    status: "",
    isLoading: false,
    addWishList: false,
    users: [
        {
            id: 1,
            username: "sriram Garapati",
            email: "sriram123@gmail.com",
            password: "123456",
            contact: '7894561356',
            userType: "user"
        },
        {
            id: 2,
            username: "admin",
            email: "admin123@gmail.com",
            password: "Admin123@",
            contact: '7894561356',
            userType: "admin"
        },
        {
            id: 3,
            username: "rajesh kondeti",
            email: "rajesh@gmail.com",
            password: "123456",
            contact: '9632587417',
            userType: "user"
        },
        {
            id: 4,
            username: "saikumar gajendra",
            email: "saikumar@@gmail.com",
            password: "123456",
            contact: '8523165496',
            userType: "user"
        },
        {
            id: 5,
            username: "priyanka Sivudu",
            email: "priya@gmail.com",
            password: "123456",
            contact: '8523165496',
            userType: "user"
        },
    ],
};

export const Slider = createSlice({

    name: "Ecommerce",
    initialState,
    reducers: {
        emptySellerProductMsg: (state) => {
            state.sellerProductMesage = "";
        },
        adminAddProduct: (state, action) => {
            const { payload } = action
            const data = {
                ...payload, id: state.products.length + 1
            }
            state.products.push(data);
        },
        adminDeleteProduct: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },
        addUser: (state, action) => {
            const user = {
                id: state.users.length + 1,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                contact: action.payload.contact,
                userType: "user"
            };
            state.users.push(user);
        },
        updateUser: (state, action) => {
            const { payload } = action;
            state.currentUser = payload;
            let index = state.users.findIndex((item) => item.id === payload.userId);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...payload.formData };
            } else {
                return;
            }

        },
        addCart: (state, action) => {
            const { payload } = action;
            state.cart.push(payload);
            state.cart.find((ob) => ob.id === payload.id) && (state.isAdded = true);
            state.uid = payload.id;
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((items) => items.id !== action.payload);
            state.uid = 0;
        },

        addWishlist: (state, action) => {
            const { payload } = action;
            state.wishList.push(payload);
            state.wishList.find(obj => obj.id === payload.id) && (state.addWishList = true);
        },
        removeFromWishList: (state, action) => {
            state.wishList = state.wishList.filter((items) => items.id !== action.payload);
        },
        increaseQty: (state, action) => {
            const { payload } = action;
            let res = state.cart.find((obj) => obj.id === payload);
            res && (res.qty += 1);
        },
        decreaseQty: (state, action) => {
            const { payload } = action;
            const res = state.cart.find((obj) => obj.id === payload);
            res && (res.qty -= 1);
        },
        removeAll: (state) => {
            state.cart = [];
        },

        uploadImage: (state, action) => {
            const { payload } = action;
            state.profileUrl = payload

        },
        addAddres: (state, action) => {
            const { payload } = action
            const data = { ...payload, id: state.adress.length + 1 };
            state.adress.push(data)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchData.rejected, (state) => {
                state.isLoading = true;
                state.status = "failed";
            })
            .addCase(findAddrs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(findAddrs.fulfilled, (state, action) => {
                console.log(action.payload.Message)
                state.postOffice = action.payload.PostOffice
                state.msg = action.payload.Message

            })
            .addCase(findAddrs.rejected, (state, action) => {

            })
            .addCase(fetchApiCall.fulfilled, (state, action) => {
                state.allProducts = action.payload?.data?.data;
            })
            .addCase(fetchApiCall.rejected, () => {
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload.data.message);
                state.sellerProductMesage = action.payload.data.message;
            })
    },
});

export const fetchApiCall = createAsyncThunk('fetch/products', async () => {
    try {
        const response = await fetch(productsUrl)
        const res = await response.json();

        return res
    }
    catch {
        throw new Error(" something Error");
    }
})


export const fetchData = createAsyncThunk("products", async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");

        return response.data;
    } catch {
        throw new Error(" something Error");
    }
});

export const fetchProducts = createAsyncThunk('products', async () => {

})

export const findAddrs = createAsyncThunk("addr", async (data: string) => {
    try {
        const response = await axios.get(
            `https://api.postalpincode.in/pincode/${data}`
        );
        console.log(response.data[0].PostOffice);
        return response.data[0];
    } catch {
        throw new Error("something error");
    }
});

export const fetchById = createAsyncThunk("product", async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    } catch {
        throw Error(" something Error");
    }
});

export const userRegistration = createAsyncThunk('signup', async () => {
    try {
        const response = await axios.post(signupUrl,)
    }
    catch {
        throw new Error("something error");
    }
});


export const deleteProduct = createAsyncThunk(
    "delete",
    async (id: number) => {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        };
        const response = axios.delete(deleteUrl + id, options);
        return response;
    }
);

export const {
    addCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    addUser,
    removeAll,
    updateUser,
    addWishlist,
    removeFromWishList,
    uploadImage,
    addAddres,
    adminAddProduct,
    adminDeleteProduct,
    emptySellerProductMsg
} = Slider.actions;

export default Slider.reducer;
