import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Rating from 'react-rating'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
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
    // this.handleBooking = this.handleBooking.bind(this);
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
      if ((user_booking.state === 'completed' || 
          user_booking.state === 'canceled' ||
          user_booking.state === 'timeout') 
        && user_booking.review_mark >= 0) {

        sum_marks += user_booking.review_mark
        sum_count ++
      }
    })
    if (sum_count === 0){
      return 0
    }

    return {
      averageReviewMarks: sum_marks / sum_count, 
      reviewCount: sum_count
    }
  }

  handleBooking = (user, event) => {
    console.log('=== clicked event: ', user, event)
    this.props.brighteyesActions.selectUser(user)
  }

  renderUsersView () {
    const { userReviews } = this.state
    let items = []
    Object.keys(userReviews).map((key) => {
      let user = userReviews[key]
      const { averageReviewMarks, reviewCount } = this.getAverageReviewMarks(user.bookings)
      // let numberOfReviews = user.bookings ? user.bookings.length : 0
      let item = (
        <Link to="/book_by_user" key={`user_list_item_${key}`}>
          <ListItem className="user_screen_listitem" onClick={(event)=>this.handleBooking(user, event)}>
            <Card className="user_screen_card">
                <CardText>
                  <div className="user_screen_card_header">
                    <Avatar 
                      src={`${appConfig.assetServer}${user.image}`}
                      className="user_screen_avatar"/>
                      <CardTitle
                        title={`${user.first_name} ${user.last_name}`}
                        subtitle={user.service}
                        className="user_screen_card_header_avatar_title"
                        />
                  </div>
                </CardText>
                <CardText className='user_screen_card_review_container'>
                  <Rating
                    placeholderRating={averageReviewMarks}
                    emptySymbol={<img src="images/star-grey.png" className="icon" />}
                    placeholderSymbol={<img src="../images/star-yellow.png" className="icon" />}
                    fullSymbol={<img src="images/star-yellow.png" className="icon" />}
                    readonly
                  />
                  <CardTitle
                    title={''}
                    subtitle={`${reviewCount} reviews`}
                    className="user_screen_card_review_text"
                    />
                </CardText>
            </Card>
          </ListItem>
        </Link>
      )
      items.push(item)
    })

    return (
      <List className="user_screen_list">
        <Subheader>Previous chats</Subheader>
        { items }
      </List>
    )
  }

  render() {
    return (
      <div className='users_screen_container'>
        { this.renderUsersView() } 
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
