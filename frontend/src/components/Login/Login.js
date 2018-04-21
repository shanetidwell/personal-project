import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



export default class Login extends Component{
  render (){
    const styles = this.styles();
    return(
    <div>
    <div style={styles.banner}>Gifted.</div>
    {/* <div style={styles.line}/> */}
    <div style={styles.background}>
      <div style={styles.header}> Not a Good Gift Giver? </div>
      <div style={styles.header}> Leave it to Gifted </div>
      <a href="http://localhost:4000/auth"><button style={styles.loginButton}>Login</button></a>
    </div>
    </div>
    )
  }
  styles = () => {
    
    return {
        background: {
            backgroundImage: "url(" + "https://images.unsplash.com/photo-1510284876186-b1a84b94418f?ixlib=rb-0.3.5&s=126b9605a0aa819c77f00279c80d48e4&auto=format&fit=crop&w=1950&q=80" + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // backgroundPosition: "center",
            height: "80vh",
            display: "flex",
            flexDirection: "Column",
            justifyContent: "Center",
            alignItems: "Center"
        },
        header: {
          fontSize: "40px",
        },
        loginButton: {
          border: "none",
          cursor: "pointer",
          borderRadius: "2px",
          marginTop: "20px",
          backgroundColor: "Transparent",
          border: "1px solid black",
          fontSize: "16px"
        },
        banner: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "Center",
          height: "70px",
          // backgroundColor: "#dfe1e2",
          color: "#163D57",
          fontSize: "45px",
          paddingRight: "30px",
          fontFamily:"'Amatic SC', cursive",
          fontWeight: "bold",
          boxShadow: "0px 2px 2px #C9C9C9",
          marginBottom: "2px"
        },
        line: {
          height: "15px",
          backgroundColor: "#0A1C28"
        }
    }
  }
}

