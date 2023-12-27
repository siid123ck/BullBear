const styles = {
    container: {
      backgroundColor: '#5e2bff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
    },
    logo: {
      fontSize: '24px',
      color: '#fff',
      marginRight: '10px',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
    },
    navLink: {
      fontSize: '16px',
      color: '#fff',
      marginLeft: '20px',
      textDecoration: 'none',
    },
    connectButton: {
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      padding: '10px 15px',
      fontSize: '16px',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
     content: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    submitButton: {
        marginTop: '10px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px 15px',
        fontSize: '16px',
      },
    
  };

  

  export default styles;