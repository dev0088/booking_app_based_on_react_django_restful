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
import DayPicker from 'react-day-picker';
import Panel from '../components/panel';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as moment from 'moment-timezone';

import * as brighteyesActions from  '../actions/brighteyesActions'
import appConfig from '../constants/config'
import Loading from '../components/loading';
import './bookingScreen.css'
import 'react-day-picker/lib/style.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  flatPrimary: {
    color: "#258df2",
  },
});

const selectItemStyle = {
  'whiteSpace': 'preWrap'
}

class BookingScreen extends Component {

	constructor(props) {
		super(props);
    this.state = {
      loading: false,
      // props 
      services: props.services.value,
      selectedUser: props.selectedUser.value,
      reminders: props.reminders.value,
      serviceCategories: props.serviceCategories.value,
      bookings: props.bookings.value,
      // booking info 
      selectedService: 1,
      selectedServiceDuration: 30,
      selectedDay: null,
      selectedBookingTime: null,
      booking_time_area_in_day: [],
      // client info
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      description: '',
      reminder: 60,
      agree: false
    };
	}

	componentWillMount() {
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
      services,
      selectedUser,
      reminders,
      serviceCategories,
      userReviews,
      bookings,
      setBook
    } = nextProps;
    this.checkAndSetStateByName('services', services)
    this.checkAndSetStateByName('selectedUser', selectedUser)
    this.checkAndSetStateByName('reminders', reminders)
    this.checkAndSetStateByName('serviceCategories', serviceCategories)
    this.checkAndSetStateByName('bookings', bookings)
    if (selectedUser && selectedUser.service) {
      this.setState({
        selectedService: selectedUser.service
      })
    }

    console.log('=== isFetched: ', setBook)
    if (setBook.isFetched) {
      this.setState({
        loading: false,
        booked: !setBook.failure,
        error: setBook.errorMessage
      })
    }
	}

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSelectChange = (event, index, value) => {
    console.log('=== handleSelectChange: ', event.target.name, event.target.value, index, value)
    this.setState({ selectedService: value })
  };

  isAlreadyBooked(booking_time) {
    const { bookings } = this.state
    let isBooked = false

    Object.keys(bookings).map((key) => {
      let booking = bookings[key]
      let booking_date = moment(booking.booking_time)
      let diff_day = booking_date.diff(booking_time, 'days')
      let diff_min = booking_date.diff(booking_time, 'minutes')
      if (diff_day === 0 && diff_min === 0 &&
          (booking.state === 'booked' || 
           booking.state === 'accepted')
         ) {
        console.log('=== already booked')
        isBooked = true
        return true
      }
    })
    return isBooked
  }

  handleDayClick = (day, { selected }) => {
    if (moment(day).diff(moment()) < 0) {
      return
    }
    const {
      services, 
      selectedUser, 
      selectedService, 
      bookings,
      booking_time_area_in_day
    } = this.state

    // Set available book time area.
    let service = services.filter(function(item) { 
      return item.title === selectedUser.service; 
    });
    service = service[0]
    let service_duration = service.time
    let selectedDay = moment(day).tz('Europe/Kiev').set({h: 0, m: 0})
    let service_time = selectedDay.add(9, 'hours')

    let new_booking_time_area_in_day = []
    new_booking_time_area_in_day.push(service_time.format())
    let count = Math.round(480 / service_duration)

    for (let i = 0; i < count; i ++) {
      service_time = service_time.add(service_duration, 'minutes')
      if (service_time.hours() === 12) {
        i --
        continue
      }
      if (!this.isAlreadyBooked(service_time)){
        new_booking_time_area_in_day.push(service_time.format())
      }
    }

    this.setState({
      selectedServiceDuration: service_duration,
      selectedDay: selected ? undefined : day,
      booking_time_area_in_day: new_booking_time_area_in_day
    });

  }

  hanldeTimeClick = (val) =>  {
    this.setState({ selectedBookingTime: val });
  }

  handleAgreeChange = (event) =>  {
    this.setState({ agree: event.target.checked });
  }

  hanldeBack = () => {

  }

  handleBooking = (event) => {
    event.preventDefault();
    
    const { 
      selectedUser,
      selectedService,
      selectedBookingTime,
      firstName,
      lastName,
      email,
      phoneNumber,
      reminder,
      description,
      agree
    } = this.state
    
    let user = {
      username: selectedUser.username
    }
    let booking = {
      service: selectedUser.service,
      booking_time: selectedBookingTime
    }
    let client = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      description: description,
      reminder: reminder,
      agree: agree
    } 
    console.log('=== booking: ', user, booking, client)
    this.props.brighteyesActions.setBooking(user, booking, client)
    this.setState({
      loading: true
    })
  }

  renderUserView() {
    const { reminders, selectedUser } = this.state

    return (
      <Form>
        <TextField
          name="userFullName"
          id="userFullName"
          placeholder=""
          value={ `${selectedUser.first_name} ${selectedUser.last_name}` }
          floatingLabelText="Full Name"
          fullWidth={true}
        />
        <TextField
          name="userPhoneNumber"
          id="userPhoneNumber"
          placeholder=""
          value={selectedUser.phone_number}
          floatingLabelText="Phone Number"
          fullWidth={true}
        />
        <TextField
          type="email"
          name="email"
          id="email"
          value={selectedUser.email}
          floatingLabelText="Email"
          fullWidth={true}
        />
      </Form>
    )
  }

  renderBookingView() {
    const { 
      reminders, 
      selectedUser, 
      selectedBookingTime,
      selectedServiceDuration,
      booking_time_area_in_day 
    } = this.state

    return (
      <Form>
        <SelectField
          id="selectedSerivce"
          name="selectedSerivce"
          floatingLabelText="Service"
          value={this.state.selectedService ? this.state.selectedService : selectedUser.service}
          onChange={this.handleSelectChange}
          menuItemStyle={selectItemStyle}
          fullWidth={true}
        >
          <MenuItem value={1} primaryText={selectedUser.service} />
        </SelectField>

        <Row>
          <Col>
            <h5> 
              Booking time
            </h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <DayPicker
              disabledDays={[
                {before: new Date(),}
              ]}
              selectedDays={this.state.selectedDay}
              onDayClick={this.handleDayClick}
            />
          </Col>
          <Col>
            <Typography>
              {
                booking_time_area_in_day.map((booking_time, index) => {
                  return (
                    <FlatButton
                      key={index}
                      label={`${moment(booking_time).format('HH:mm')} - ${moment(booking_time).add(selectedServiceDuration, 'minutes').format('HH:mm')}`}
                      primary={(booking_time === selectedBookingTime)}
                      onClick={() => this.hanldeTimeClick(booking_time)}
                      className={ (booking_time === selectedBookingTime) ? "booking_time_button_primary" : "normal-button" }
                    />)
                })
              }
            </Typography>
          </Col>
        </Row>

      </Form>
    )
  }

  renderClientInfoView() {
    const { error } = this.state;
    return (
      <Form>
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
          name="phoneNumber"
          id="phoneNumber"
          placeholder=""
          value={this.state.phoneNumber}
          onChange={this.handleChange}
          floatingLabelText="Phone number"
          fullWidth={true}
        />
        <TextField
          name="description"
          id="description"
          placeholder=""
          value={this.state.description}
          onChange={this.handleChange}
          floatingLabelText="Description"
          fullWidth={true}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="agree"
              id="agree"
              checked={this.state.agree}
              onChange={this.handleAgreeChange}
              value="agree"
              color="primary"
            />
          }
          label="Agree?"
        />
      </Form>
    )
  }

  render() {
    const { loading, error } = this.state;
    console.log('=== loading: ', loading)
    // Loading
    if (loading) return <Loading />;
    if (this.state.selectedUser.email === undefined || this.state.selectedUser.email === null) {
      return (<div className="login-wrapper booking-wrapper" />)
    }
    return (
      <div className="login-wrapper booking-wrapper">
        {!!error && <Alert color="danger">{error}</Alert>}
        <Row>
          <Col className="col-md-12">
            <Panel title="User">
              { this.renderUserView() }
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12">
            <Panel title="Booking info">
              { this.renderBookingView() }
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-12">
            <Panel title="Your info">
              { this.renderClientInfoView() }
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4">
            <div className="pt20">
              <Link to='/book_online'>
                <RaisedButton label="< Back" primary={true} fullWidth={true} onClick={this.handleBack}/>
              </Link>
            </div>
          </Col>
          <Col className="col-md-2">
          </Col>
          <Col className="col-md-6">
            <div className="pt20">
              <RaisedButton label="Book" primary={true} fullWidth={true} onClick={(event) => this.handleBooking(event)}/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    services,
    selectedUser,
    reminders,
    serviceCategories,
    userReviews,
    bookings,
    setBook
  } = state;

  return {
    services,
    selectedUser,
    reminders,
    serviceCategories,
    userReviews,
    bookings,
    setBook
  }
}

function mapDispatchToProps(dispatch) {
  return {
    brighteyesActions: bindActionCreators(brighteyesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);
