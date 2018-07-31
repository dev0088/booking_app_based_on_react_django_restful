import React, {Component} from 'react'
import { 
  Row, 
  Col, 
  Table, 
} from 'reactstrap'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Card, CardHeader, CardText} from 'material-ui/Card';
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
import './usersScreen.css'

class UsersScreen extends Component {

	constructor(props) {
		super(props);
    this.state = {
      // brighteyes: props.brighteyes ? props.brighteyes.value : [],
      users: props.users.value,
      reminders: props.reminders.value,
      services: props.services.value,
      serviceCategories: props.serviceCategories.value,
      bookings: props.bookings.value,
      userReviews: props.userReviews.value
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
      users,
      reminders,
      services,
      serviceCategories,
      bookings,
      userReviews
    } = nextProps;

    this.checkAndSetStateByName('users', users)
    this.checkAndSetStateByName('reminders', reminders)
    this.checkAndSetStateByName('services', services)
    this.checkAndSetStateByName('serviceCategories', serviceCategories)
    this.checkAndSetStateByName('bookings', serviceCategories)
    this.checkAndSetStateByName('userReviews', userReviews)
	}

  getAverageReviewMarks(user_bookings) {
    let sum_marks = 0
    let sum_count = 0
    Object.keys(user_bookings).map((key) => {
      let user_booking = user_bookings[key]
      console.log('=== user_booking.state: ', user_booking.state)
      if ((user_booking.state === 'completed' || 
          user_booking.state === 'canceled' ||
          user_booking.state === 'timeout') 
        && user_booking.review_mark >= 0) {

        sum_marks += user_booking.review_mark
        sum_count ++
      }
    })
    console.log('=== sum_marks, sum_count: ', sum_marks, sum_count)
    if (sum_count === 0){
      return 0
    }

    return sum_marks / sum_count
  }

  renderUsersView () {
    const { users, bookings, userReviews } = this.state
    let items = []
    Object.keys(userReviews).map((key) => {
      let user = userReviews[key]
      let averageReviewMarks = this.getAverageReviewMarks(user.bookings)

      let item = (
        <ListItem>
          <Card>
            <CardHeader
              avatar={
                <Avatar src={`${appConfig.assetServer}${user.image}`}/>
              }
              title={`${user.first_name} ${user.last_name}`}
            />
            <CardText>
              <Rating
                placeholderRating={averageReviewMarks}
                emptySymbol={<img src="images/star-grey.png" className="icon" />}
                placeholderSymbol={<img src="../images/star-yellow.png" className="icon" />}
                fullSymbol={<img src="images/star-yellow.png" className="icon" />}
                readonly
              />
            </CardText>
          </Card>
        </ListItem>
      )
      items.push(item)
    })

    return (
      <List>
        <Subheader>Previous chats</Subheader>
        { items }
      </List>
    )
  }

  render() {
    console.log('=== state: ', this.state)
    return (
      <div className='users_screen_container'>
        {this.renderUsersView()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    users,
    reminders,
    services,
    serviceCategories,
    bookings,
    userReviews
  } = state;

  return {
    users: users,
    reminders,
    services,
    serviceCategories,
    bookings,
    userReviews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    brighteyesActions: bindActionCreators(brighteyesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
