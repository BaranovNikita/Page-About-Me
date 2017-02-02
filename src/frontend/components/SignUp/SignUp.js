import React from "react";
import {Paper, TextField, RaisedButton, CircularProgress} from "material-ui";
class SignUp extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isLoading: false
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick() {
      this.setState({isLoading: true});
      setTimeout(()=> this.setState({isLoading: false}), 2000);
  }

  render() {
    return (
      <Paper zDepth={2}>
        <TextField hintText="First name" onChange={this.handleChange} name='first_name' fullWidth={true}/>
        <TextField hintText="Last name" onChange={this.handleChange} name='last_name' fullWidth={true}/>
        <TextField hintText="Email address" onChange={this.handleChange} name='email' fullWidth={true}/>
        <TextField hintText="Password" onChange={this.handleChange} name='password' type='password' fullWidth={true}/>
        <TextField hintText="Confirm Password" onChange={this.handleChange} name='passwordConfirm' type='password'
                   fullWidth={true}/>
        <RaisedButton label='Sign Up'
                      style={{'display': (this.state.isLoading ? 'none' : 'block')}}
                      onTouchTap={this.handleClick}/>
        <CircularProgress style={{'display': (!this.state.isLoading ? 'none' : 'block'), margin: 'auto'}}/>
      </Paper>
    );
  }
}

export default SignUp;
