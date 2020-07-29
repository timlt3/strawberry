//'use strict';

const e = React.createElement;

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loged: false };
  }

  render() {
    if (this.state.loged) {
      return 'You Login.';
    }

    // return (
    //   <button onCLick={() =>this.setState({liked:true})}>
    //   Like
    //   </button>
    // );
    return e(
      // <button onCLick:() => this.setState({ liked: true })>Lik</button>
      'button',
      { onClick: () => this.setState({ loged: true }) },
      'Login'
    );
  }
}

const domContainer = document.querySelector('#login_button');//
ReactDOM.render(e(LoginButton), domContainer);

