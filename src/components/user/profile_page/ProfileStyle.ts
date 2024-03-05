export const Styles = {
    root: {

    },
    sideBar: {
        container: {
            width: "100%",
            height: "fit-content",
            border: "1px solid #e0e0e0",
            bgcolor: "white",
            borderRadius: "10px",
            boxSizing: "border-box",
            paddingLeft: "5%",
            paddingTop: "2%",
            paddingBottom: "2%",
            paddingRight: "5%",
            marginBottom: "4%",
            display: "flex",
            position: "sticky",
            top: "10%"
        },
        orderrIcon: { width: "25px", height: "25px" },
        uploadBtn: { display: 'none' }
    },

    // WishList Styles
    wishListContainer: {
        width: "100%",
        height: "fit-content",
        border: "1px solid #e0e0e0",
        bgcolor: "white",
        borderRadius: "10px",
        boxSizing: "border-box",
        paddingTop: "3%",
        paddingBottom: "5%",
        marginBottom: "4%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column"
    },
    wishListTxt: {
        alignSelf: "flex-start",
        mx: "5%",
        my: "1.5%",
        fontWeight: "bold"
    },
    prodItm: {
        my: "4%",
        mx: '2%',

    },
    prodImg: {
        width: '100px',
        height: "100px"
    },
    title: {
        cursor: "pointer",
        "&:hover": {
            color: "#2874f0"
        },
    },
    price: {
        fontSize: "22px",
        fontWeight: 800
    }
}