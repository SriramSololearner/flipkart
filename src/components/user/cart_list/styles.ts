export const Styles = {

    root: {},
    logo: {
        fontSize: "15px",
        fontWeight: "600",
    },
    logoSpan: {
        color: "black"
    },
    Span: {
        color: "grey"
    },
    loginBtn: { textTransform: "capitalize" },
    cardContainer: {
        height: "390px",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: 'column',
        transition: "all 0.1s ease",
        boxShadow: "0px 0px 2px 0px #555",
        "&:hover": {
            boxShadow: "1px 5px 10px 0px #ccc",
        }

    },
    imgContainer: {
        width: "200px",
        height: "200px",
        background: "cover",
        px: 2
    },

    favIcons: {
        position: 'absolute',
        top: '2%',
        right: "3%",
        zIndex: "2",
        color: "#1976d2",
        cursor: "pointer",
    },
    favBorderIcon: {
        cursor: "pointer",
        position: 'absolute',
        top: '2%',
        right: "3%",
        zIndex: "2",
        color: "#1976d2"
    },

    cardTitle: {
        fontSize: "15px",
    },
    cardDesc: {
        fontSize: "15px",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",

    },
    cardContent: {
        textAlign: "justify"
    },
    StackContainer: {
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-evenly",
        my: "5px"
    },
    rating: { color: "#388e3c" },
    btnGrp: {
        display: 'flex',
        '&:hover': {
        }
    },
    btnInner: {
        display: "flex",
        alignItems: "center",
        mt: "1px",
        justifyContent: "space-around",
    },
    button: {

        borderRadius: "20px",
        textTransform: "capitalize",
        fontWeight: "600",
        fontSize: "12px",
        transition: "all 1s ease",
        '&:hover': {
            bgcolor: '#2874f0',
            color: 'white'
        }
    },
    cartIcon: { color: "#2874f0", },
    cartIcon1: { "&:hover": { cursor: "pointer" } },

    qty: { ml: "8px", mr: "8px", fontWeight: 800 },
    btn: { fontWeight: "900" },



    MainContainer: {
        width: "100%",
        height: '100vh',
        bgcolor: "#f1f3f6",
        pt: "1px",
        display: "flex",

    },
    CartContainer: {
        width: '100%',
        height: '100vh',
        bgcolor: '#ffffff',


    },
    CartEmpty: {
        height: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    CartImg: {
        width: '20%', height: '20%',
    },
    cartNum: { color: "red", fontWeight: 600 },
    LogTxt: {
        mt: "10px",
        fontSize: '11.5px'
    },
    logBtn: {
        color: 'white',
        bgcolor: '#f9641b',
        border: 'none',
        mt: '20px', mb: '20px',
        padding: "10px 60px"
    },
    cartListContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: { xs: 'column-reverse', sm: "row" },
        background: "white",

    },
    cartListInnerContainer: {
        display: "flex",
        px: "10px",
        mt: "8rem",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: "45px",
    },
    cartList: {
        width: { xs: "90%", md: "45ch" },
        display: "flex",
        justifyContent: "space-around",
        border: "1px solid #ccc",
        padding: "20px",
    },
    cartThumnail: {
        width: "140px", height: "140px",
        transition: 'scale 150ms',
        "&:hover": {
            cursor: 'pointer',
            scale: '105%',
            transition: '0.6s ease',
            transform: 'scale(1)'
        },
    },
    cartPrice: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "10px",
        fontWeight: "500 !important",
        justifyContent: "flex-end",
    },
    remove: {
        mt: "15px",
        boxShadow: "0px 0px 2px #555",
        textTransform: "capitalize",
        "&:hover": {
            boxShadow: "inset 0 0 100px 0px #578cc9",
            transition: "1.5s ease",
            color: "white",
        },
    },


    checkoutPageContainer: {
        width: { xs: "85%", sm: "100%", md: "40%" },
        height: "100%",
        bgcolor: "#ffffff",
        position: { xs: "none", sm: "sticky", md: "sticky" },
        top: "100px",
        mt: { xs: "5rem", },
        ml: "30px",
        mr: "30px",
    },
    innerContainer: {
        padding: "5px",
        display: "flex",
        flexDirection: "column",
    },
    innerHeader: {
        color: "grey",
        pb: "10px",
        pt: "5px",
        fontSize: { xs: "16px", md: "17px" },
    },
    addrContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "5rem",

    },
    address: {
        width: { xs: "80%", sm: "80%", md: "50ch" },
        height: "fit-content",
        fontSize: "15px",
        background: "#f5faff",
        pb: "20px",
        ml: { sm: "2em", md: "2em" },
    },
    addrInnerText: {

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        mb: "20px"
    },
    eachAdres: {
        background: "#ccc",
        mt: "10px",
        width: "100%",
        cursor: "pointer",
        trasition: "all 0.8s ease",
        py: "20px",
        "&:hover": {
            background: "#9c9c9c",
        },
    },
    adresField: { width: "50%", height: "100%" },
    voice: {

    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 2
    },
    formInnerContainer: {
        display: 'flex',
        gap: 2,
    },
    addrChild1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mx: "10px",
        my: "10px"
    },
    deliveryTag: {
        textAlign: "left",
        background: "#0a66c2",
        color: "white",
        padding: "8px",
        fontWeight: 600
    },
    ChecoutItems: { display: 'flex', justifyContent: 'space-between', pt: '10px', pb: '15px' },
    ChecoutItemsTotal: {
        display: 'flex', justifyContent: 'space-between', pt: '25px', pb: '25px', fontSize: { xs: "15px", md: "20px" },
        fontWeight: '900'
    },
    deliveryChr: { display: "flex", alignItems: "center" },
    charg: {
        textDecoration: "line-through",
        color: "grey",
    },
    free: { color: "green", ml: "10px" },
    text: { pt: "10px", pb: "10px" },

}