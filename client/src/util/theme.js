export default {
  palette: {
    /*
    primary: {
      light: '#fff263',
      main: '#424242',
      dark: '#c49000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#c49000',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    */
    primary: {
      light: '#676767',
      main: '#424242',
      dark: '#2e2e2e',
      //contrastText: '#fff',
    },
    secondary: {
      light: '#cfa633',
      main: '#c49000',
      dark: '#896400',
      //contrastText: '#fff',
    },
    background: {
      default: '#fcd145',
    },
  },
  spreadIt: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
    },

    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },

    button: {
      marginTop: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0,1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#00bcd4',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
};
