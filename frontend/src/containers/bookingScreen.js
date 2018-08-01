import React, {Component} from 'react'
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Panel from '../components/panel';

import ReactStars from 'react-stars'
import Rating from 'react-rating'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import Slider from "react-slick"
import ReactRating from 'react-rating'
import * as brighteyesActions from  '../actions/brighteyesActions'
import appConfig from '../constants/config'
import Loading from '../components/loading';
import './bookingScreen.css'


const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};
const selectItemStyle = {
  'whiteSpace': 'preWrap'
}

class BookingScreen extends Component {

	constructor(props) {
		super(props);
    this.state = {
      selected: props.selectedUser.value,
      reminders: props.reminders.value,
      services: props.services.value,
      serviceCategories: props.serviceCategories.value,
    };
	}
	componentWillMount() {
    this.props.brighteyesActions.getUsers()
    this.props.brighteyesActions.getServiceCategories()
    this.props.brighteyesActions.getServices()
    this.props.brighteyesActions.getBookings()
    this.props.brighteyesActions.getUserReviews()
	}

  checkAndSetStateByName(name, item) {
    if(item.isFetched) {
      this.setState({
        [name]: item.value
      })
    }
  }

	componentWillReceiveProps(nextProps) {
    const { 
      selectedUser,
      reminders,
      services,
      serviceCategories,
      userReviews
    } = nextProps;

    // this.checkAndSetStateByName('users', users)
    // this.checkAndSetStateByName('reminders', reminders)
    // this.checkAndSetStateByName('services', services)
    // this.checkAndSetStateByName('serviceCategories', serviceCategories)
    // this.checkAndSetStateByName('bookings', serviceCategories)
    // this.checkAndSetStateByName('userReviews', userReviews)
	}

  handleBooking = (user, item) => {
    console.log('=== clicked item: ', user, item)
    this.props.brighteyesActions.selectUser(user)
  }

  renderUserView() {
    const { services, reminders } = this.props

    return (
            <Form>
              <TextField
                name="userFullName"
                id="userFullName"
                placeholder=""
                value={'Valeriia Didushok'}
                floatingLabelText="Full Name"
                fullWidth={true}
              />
              <TextField
                name="userPhoneNumber"
                id="userPhoneNumber"
                placeholder=""
                value={'123456789'}
                floatingLabelText="Phone Number"
                fullWidth={true}
              />
              <TextField
                type="email"
                name="email"
                id="email"
                value={'test1@email.com'}
                floatingLabelText="Email"
                fullWidth={true}
              />
              <SelectField
                id="serivce"
                name="serivce"
                floatingLabelText="Service"
                value={this.state.type}
                onChange={this.handleSelectChange}
                menuItemStyle={selectItemStyle}
                fullWidth={true}
              >
                <MenuItem value={1} primaryText="Service1" />
                <MenuItem value={2} primaryText="Service2" />
              </SelectField>
            </Form>
      )
  }

  renderBookView() {
    const { error } = this.state;
    return(
          
          <Form>
            {!!error && <Alert color="danger">{error}</Alert>}
            <TextField
              name="firstName"
              id="firstName"
              placeholder=""
              value={this.state.firstName}
              onChange={this.handleChange}
              floatingLabelText="First Name"
              fullWidth={true}
            />
            <TextField
              name="lastName"
              id="lastName"
              placeholder=""
              value={this.state.lastName}
              onChange={this.handleChange}
              floatingLabelText="Last Name"
              fullWidth={true}
            />
            <TextField
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              floatingLabelText="Email"
              fullWidth={true}
            />
            <TextField
              name="phonNumber"
              id="phonNumber"
              placeholder=""
              value={this.state.phonNumber}
              onChange={this.handleChange}
              floatingLabelText="Phone number"
              fullWidth={true}
            />
          </Form>
    )
  }

  render() {
    const { loading } = this.state;
    // Loading
    if (loading) return <Loading />;

    return (
      <div className="login-wrapper booking-wrapper">
          <Row>
            <Col className="col-md-12">
              <Panel title="User">
                { this.renderUserView() }
              </Panel>
            </Col>
          </Row>
          <Row>

            <Col className="col-md-12">
              <Panel title="Your info">
                { this.renderBookView() }
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-4">
              <div className="pt20">
                <RaisedButton label="< Back" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
            </Col>
            <Col className="col-md-2">
            </Col>
            <Col className="col-md-6">
              <div className="pt20">
                <RaisedButton label="Book" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
            </Col>
          </Row>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    selectedUser,
    reminders,
    services,
    serviceCategories,
    userReviews
  } = state;

  return {
    selectedUser,
    reminders,
    services,
    serviceCategories,
    userReviews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    brighteyesActions: bindActionCreators(brighteyesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);
