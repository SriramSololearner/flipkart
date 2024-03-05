export const Stylesheet = {
    loginPage: {
        width: "100%",
        display: { xs: "block", sm: "block", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.5s ease",
    },
    leftContainer: {
        width: { lg: "50%", md: "60%", sm: "50%", xs: "100%" },
        height: { lg: "100vh", md: "100vh", sm: "100%", xs: "100vh" },
        display: { xs: "none", sm: "none", md: "none", lg: "flex" },
        flexDirection: 'column',
        justifyContent: { xs: "", md: "", lg: "center" },
        py: { lg: "0px", xs: "20px" },
        alignItems: { xs: "", sm: "", md: "", lg: "center" },
        position: "relative",

    },
    leftContainer_header1: {
        width: { xs: "60%", sm: "50%", md: "50%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        mx: { xs: "0px", sm: "0px" },
        my: { xs: "20px", sm: "20px" }
    },

    leftContainer_header1_Con: {
        fontSize: "25px", fontWeight: "lighter  ",

    },

    leftContainer_headerContent1: {
        fontFamily: "'Raleway', sans-serif",
        fontWeight: "600",
        fontSize: { lg: "25px", md: "25px", sm: "22px", xs: "20px" },
    },
    leftContainer_headerContent2: {
        fontFamily: "'Raleway', sans-serif",
        fontWeight: "500",
        fontSize: { lg: "15px", md: "25px", sm: "20px", xs: "15px" },
    },
    label: {
        fonWeight: "bold"
    },

    leftContainer_header2: {

        width: "100%",
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mr: { lg: "90px", xs: "0px" },
        my: "20px",
        mx: { xs: "20px", sm: "0px" },

    },

    leftContainer_header2Content1: {
        fontSize: { lg: "12px", xs: "10px" }
    },

    leftContainer_header2Content2: {
    },

    rightContainer: {
        width: { lg: "40%", md: "100%", sm: "100%", xs: "100%" },
        height: { lg: "100%", sm: "100vh", xs: "100vh" },
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
        alignItems: { lg: "center", sm: "center", xs: "flex-start" },
        mx: { xs: "20px", sm: "0px" }
    },
    header: {
        fontSize: "28px",
        mr: "150px",
        mb: "10px"
    },
    headerContent: {
        mb: "-22px",
        fontSize: "12px",
        fontFamily: "Poppins"
    },
    headerContent1: {
        mb: "0px",
        fontSize: "12px", fontFamily: "Poppins"
    },

    spanContent: {
        color: "#000000",
        fontFamily: "Poppins",
        fontWeight: "600",
        mx: "10px",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.9px"
        }
    },

    personImg: {
        display: { xs: "none", sm: "none", lg: "flex" },
        width: "45em",
    },

    formContainer: {
        width: { xs: "100%", sm: "50%", md: "50%", lg: "50%" },
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },
    forgotText: {
        alignSelf: "flex-end",
        fontSize: "13px",
        color: "#5555",
    },
    input1: {
        width: { xs: "90%", lg: "100%" },
        fontSize: "15px",
        borderBottom: "1px solid",
        "&:hover": {
            borderBottom: "1.5px solid",
        },

    },
    input: {
        p: "15px 15px",
        border: "1px solid #ABABAB", outline: "none",
        borderRadius: "6px",
        fontSize: "15px",
        '&::placeholder': {
            fontSize: "12px",
        }
    },
    roleInput: {
        pt: 1, width: {
            xs: "90%", lg: "100%",
            "& .MuiSelect-standard MuiInputBase-input ": {
                opacity: "0.3",
                color: 'red'
            },
            // MuiSelect-select MuiSelect-standard MuiInputBase-input MuiInput-input css-1ldywpb-MuiSelect-select-MuiInputBase-input-MuiInput-input
            // MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl  css-1lal16b-MuiInputBase-root-MuiInput-root-MuiSelect-root
        }
    },


    icons: {
        display: "flex",
        gap: "5px"
    },

    buttonsContainer: {
        width: { lg: "100%", sm: "75%", xs: "95%" },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", lg: "center" },
    },

    button: {
        width: { xs: "90%", md: "90%", lg: "100%" },
        height: "3.2em",
        mt: "16px",
        cursor: "pointer",
        background: "#000000",
        textTransform: "capitalize",
        fontWeight: "bold",
        "&:hover": {
            background: "#000000",
            opacity: "0.9"
        }
    },
    continueWith: {
        color: "#5555",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        mt: "20px"
    },
    pwedContainer: {
        position: "relative"
    },
    eyeIcon: {
        color: "#000"
    },


    googleSign: {
        width: { lg: "50%", xs: "100%" },
        my: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: "12px",
        color: "red",
        fontWeight: 600
    },


}