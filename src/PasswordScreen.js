import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./styles.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const eye_off =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Ic_visibility_off_48px.svg/48px-Ic_visibility_off_48px.svg.png";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1B3280"
    }
  }
});

const Icon = props => (
  <i {...props} class="material-icons">
    {props.children}
  </i>
);

const NumberButton = props => (
  <Button
    onClick={e => {
      e.preventDefault();
      props.onButtonClick(props.children);
    }}
    color={props.children === "submit" ? "primary" : undefined}
    variant={props.children === "submit" ? "fab" : undefined}
    style={{
      padding: "0.4em",
      fontSize: "1.4em",
      marginLeft: props.children === "submit" ? "0.7em" : undefined,
      color: props.children === "submit" ? "white" : "#1b3280"
    }}
  >
    {props.children === "submit" && <Icon>check</Icon>}
    {props.children === "clear" && <Icon>backspace</Icon>}
    {!isNaN(props.children) && props.children}
  </Button>
);

const Each = props => <p {...props}>{props.children}</p>;
const PasswordText = props => {
  return (
    <div className="passwordText">
      {props.text.map((each, i) => {
        let color = i <= props.activeCursor ? "black" : "#c4c4c4";
        return <Each style={{ color: color }}>{each}</Each>;
      })}
    </div>
  );
};
const Password = props => {
  const text = [...props.text];
  let n = 4 - text.length;
  if (!props.show) {
    for (let i = 0; i < text.length; i++) {
      text[i] = "•";
    }
  }
  for (let i = 0; i < n; i++) {
    text.push("_");
  }
  return (
    <div className="passwordContainer">
      <div className="passwordFirstLine">
        <p className="passwordTip">ENTER UPI PIN</p>
        <Button
          color="primary"
          onClick={() => props.onToggleShow()}
          style={{ padding: "0" }}
        >
          <Icon style={{ padding: 0 }}>
            {!props.show ? "remove_red_eye" : "visibility_off"}
          </Icon>
          <p style={{ marginLeft: "1em" }}>{!props.show ? "Show" : "Hide"}</p>
        </Button>
      </div>
      <PasswordText text={text} activeCursor={props.activeCursor} />
    </div>
  );
};

class PasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passText: [],
      show: false,
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, "clear", 0, "submit"],
      bankName: "Bank of Maharashtra",
      upiLogo:
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
    };
    this.handleNumberButtonClick = this.handleNumberButtonClick.bind(this);
    this.handleToggleShow = this.handleToggleShow.bind(this);
  }

  handleToggleShow() {
    this.setState({ show: !this.state.show });
  }

  handleNumberButtonClick(button) {
    let { nums, passText, count } = this.state;
    if (nums.includes(button)) {
      if (button === "clear") {
        //clear one -- backspace
        passText.pop();
        this.setState({ passText });
      } else if (button === "submit") {
        //submit only if full password is given
        passText.length === 4
          ? alert(`Awesome! The password is ${passText}`)
          : undefined;
      } else {
        //append to the passText only if less than 4
        passText.length < 4 ? passText.push(button) : undefined;
        this.setState({ passText });
      }
    } else {
      alert("damn, son! wtf is this button?");
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="rootContainer">
          <div className="whiteBar">
            <p className="bankName">{this.state.bankName}</p>
            <img src={this.state.upiLogo} width="80" height="60" />
          </div>
          <div className="blueBar">
            <Button>
              <Icon style={{ color: "white" }}>keyboard_arrow_down</Icon>
            </Button>
          </div>
          <Password
            text={this.state.passText}
            show={this.state.show}
            activeCursor={this.state.passText.length}
            onToggleShow={this.handleToggleShow}
          />
          <div className="numbersContainer">
            {this.state.nums.map(each => (
              <NumberButton onButtonClick={this.handleNumberButtonClick}>
                {each}
              </NumberButton>
            ))}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PasswordScreen;
