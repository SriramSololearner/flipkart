export const StyleSheet = {
    // Card Styles 
    rootContainer: { bgcolor: { xs: "none", md: "white" }, height: "60vw", },
    Container: {
        display: 'flex',
        justifyContent: 'Center',
        alignItems: 'center',
        height: "fit-content",


    },
    btnContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    Back: {
        display: 'flex',
        justifyContent: 'center',
        margin: '30px',
        // width: { xs: '90vw', md: "70vw", lg: '50vw' },
        minWidth: '10%',
        '&:hover': {
            minwidth: "50%",
            cursor: 'pointer',
            bgcolor: "#3774f0",
            color: 'white',
            transition: '1s ease'

        }

    },

    Main: {
        bgcolor: 'white', height: '100vh', width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column' },
    },
    product: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '10px',
        flexDirection: { xs: 'column', md: 'row' }
    },
    imgList: {
        display: { xs: 'none', md: 'block' },
        margin: '11px 0px 10px 25px',
        width: '90px',
        height: '90px',

    },
    eachImg: {
        width: "80%",
        height: '80%',
        border: '1px solid grey',
        transition: 'scale 100ms',
        mt: "8px",
        '&:hover': {
            cursor: 'pointer',
            scale: '90%', border: '1px solid blue',
            transition: '0.5s ease'
        }
    },

    prodImage: {
        margin: '10px',
        width: { xs: '300px', md: '400px' },
        height: '400px',
        objectFit: 'contain',
        border: '1px solid grey',
        ml: '-1px'

    },
    prodDesc: { alignSelf: "flex-start", fontSize: "16px" },

    btnGrp: {
        // width: { xs: '105%', md: "100%" },
    },
    formContainer: { "& > :not(style)": { m: 1 } },

    Cart: {
        bgcolor: '#f99f00',
        border: 'none',
        color: 'white',
        padding: '15px 35px',
        textAlign: 'center',
        // mr: '5px',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#f99f00',
            boxShadow: '0 3px 5px 2px #f99f00',
            outline: 'none',
            border: 'none',
        }



    },
    Buy: {
        bgcolor: '#f9641b',
        border: 'none',
        color: 'white',
        padding: '15px 45px',
        fontWeight: 'bold',
        fontSize: '15px',
        ml: '15px',


        '&:hover': {
            backgroundColor: '#e85a0c',
            boxShadow: '0 3px 5px 2px rgba(255, 100, 10)',
            outline: 'none',
            border: 'none',
        }

    },

    prodDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "flexStart",
        mt: "30px",


    },
    Rating: {
        display: 'flex',
        jusstifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        mt: '5px'

    },
    RatingInnerCont: {
        alignSelf: 'flex-start',
        fontWeight: 600,
        mt: '5px',
        bgcolor: '#388e3c', color: 'white',
        fontSize: '15px',
        padding: ' 0px 5px',
        borderRadius: '5px',
    },

    Review: {
        color: 'grey', mt: '2px', fontSize: '15px'
    },

    assured: {
        width: '80px',
    },
    PriceTxt: {
        alignSelf: 'flex-start',
        fontSize: '13px',
        fontWeight: '600',
        color: '#388e3c',
        mt: '10px'
    },
    price: { alignSelf: 'flex-start', fontWeight: 600, mt: '5px', fontSize: '26px' },
    priceTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    Oldprice: {
        mt: '5px',
        textDecorationLine: 'line-through',
        color: 'GREY'
    },
    offer: {
        color: '#388e3c',
        mt: '5px',
        fontWeight: 'bold',
    },
    offerTag: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        mt: '20px'

    },
    BankOffer: {
        display: 'flex',
        gap: '12px',
        mt: '12px',
        fontSize: '12px'
    },
    Tag: {
        color: '#17be47',
        width: '20px', height: '10px'

    },
    offerTxt: {
        fontWeight: 'bold',
        fontSize: { xs: '12px', md: '15px' },
        textAlign: { xs: 'justify', md: 'justify' }

    },
    cardOffer: {
        fontSize: { xs: '12px', md: '15px' },
        textAlign: { xs: 'justify', md: 'center' }
    },
    Tc: {
        color: '#3974f1',
        fontSize: { xs: '12px', md: '15px' },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    warranty: {
        display: "flex",
        gap: '60px',
        mt: '30px',
        alignItems: 'center'
    },
    Wtxt: {
        color: 'grey',
        fontWeight: '600',
        fontSize: '15px'
    },
    Delivadd: {
        display: 'flex',
        gap: '10px',
        mt: "2px"
    },
    DD: {
        fontWeight: "bold",
        fontSize: '14px',
    },
    Free: {
        color: '#3a9151',
        fontWeight: "bold",
        fontSize: '14px',
    },
    cost: {
        textDecorationLine: 'line-through',
        color: 'GREY',
        fontSize: '14px',
    },
    orderTime: {
        display: 'flex',
        fontSize: '12px'

    },
    VD: {
        display: 'flex',
        fontSize: '15px',
        color: '#3774f0',
        mt: '5px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    Highlhs: {
        display: 'flex'
    },

}