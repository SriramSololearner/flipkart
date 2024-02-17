import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Istate {
    OrderId: string;
    check: boolean;
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
    users: [
        {
            id: number;
            username: string;
            email: string;
            password: string;
            contact: string;
        }
    ];
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
    status: string;
    isLoading: boolean;
    msg: string;
}

const initialState: Istate = {
    msg: "",
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
    isAdded: false,
    status: "",
    isLoading: false,
    users: [
        {
            id: 1,
            username: "sriram",
            email: "sriram123@gmail.com",
            password: "123456",
            contact: '7894561356',
        },
    ],
};

export const Slider = createSlice({

    name: "Ecommerce",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const user = {
                id: state.users.length + 1,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                contact: action.payload.contact,
            };
            state.users.push(user);
        },
        updateUser: (state, action) => {
            const { payload } = action;
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

            });
    },
});

export const fetchData = createAsyncThunk("products", async () => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    } catch {
        throw new Error(" something Error");
    }
});

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

export const {
    addCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    addUser,
    removeAll,
    updateUser,
} = Slider.actions;

export default Slider.reducer;
