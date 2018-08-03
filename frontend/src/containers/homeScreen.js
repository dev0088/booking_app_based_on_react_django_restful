import React, {Component} from 'react'
import { 
  Row, 
  Col, 
  Jumbotron, 
  Table, 
  // Carousel, 
  // CarouselIndicators, 
  UncontrolledCarousel
} from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridListinlineCustom from '../components/grid-list/gridlistInlineCustom'
import Img from 'react-image'
// import ImageGallery from 'react-image-gallery';
import Slider from "react-slick";
import * as brighteyesActions from  '../actions/brighteyesActions'
import appConfig from '../constants/config'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './homeScreen.css'

class HomeScreen extends Component {

	constructor(props) {
		super(props);
    this.state = {
      // brighteyes: props.brighteyes ? props.brighteyes.value : [],
      users: props.users.value,
      galleries: props.galleries.value,
      places: props.places.value,
      reminders: props.reminders.value,
      shops: props.shops.value,
      services: props.services.value,
      serviceCategories: props.serviceCategories.value
    };

	}
	componentWillMount() {
		// this.props.brighteyesActions.getBrightEyesInfo()
    this.props.brighteyesActions.getShops()
    this.props.brighteyesActions.getPlaces()
    this.props.brighteyesActions.getUsers()
    this.props.brighteyesActions.getServiceCategories()
    this.props.brighteyesActions.getServices()
    this.props.brighteyesActions.getGalleries()

		this.setState({
			brighteyes: this.props.brighteyesActions.value
		})
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
      galleries,
      places,
      reminders,
      shops,
      services,
      serviceCategories
    } = nextProps;

    this.checkAndSetStateByName('users', users)
    this.checkAndSetStateByName('galleries', galleries)
    this.checkAndSetStateByName('places', places)
    this.checkAndSetStateByName('reminders', reminders)
    this.checkAndSetStateByName('shops', shops)
    this.checkAndSetStateByName('services', services)
    this.checkAndSetStateByName('serviceCategories', serviceCategories)
	}

	getValueByName(name) {
		return ''
	}

  renderServices () {
    const { 
      serviceCategories
    } = this.state;

    let categories = []
    for(let i = 0; i < serviceCategories.length; i += 3) {
      let rowCategories = []
      for (let j = i; j < i+3; j ++){
        let category =  (
            <Col key={`service_category_${j}`} xs="12" md="4" className="pt-3 pt-md-0">
              <div className="details-content">
                <Img src={`${appConfig.assetServer}${serviceCategories[j].image}`} 
                  alt="" 
                  className="service_category_image"
                />
                <h3><i className="icon-map" />{serviceCategories[j].title}</h3>
                <Table>
                  <tbody>
                  {
                    serviceCategories[j].services && Object.keys(serviceCategories[j].services).map((key) => {
                      const { title, price_currency, price } = serviceCategories[j].services[key]
                      return (
                        <tr key={`service_category_service_${key}`}>
                          <td className="service_title_td">
                            {title}
                          </td>
                          <td className="service_price_currency_td">
                            {price_currency}
                          </td>
                          <td className="service_price_td">
                            {Math.round(price)}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
              </div>
            </Col>
          )
        rowCategories.push(category)
      }

      let rowCategory = (
          <Row key={`row_category_${i}`} className="pt-3">
            { rowCategories }
          </Row>
        )
      categories.push(rowCategory)
    }
 
    return categories
  
  }

  renderPlaces() {
    let items = []
    const { places } = this.state
    Object.keys(places).map((key) => {
      const { description, image } = places[key]
      if (image) {
        let item =   {
          src: `${appConfig.assetServer}${image}`,
          altText: description,
          caption: '',
          header: ''
        }
        items.push(item)
      }
    })

    return (
      <UncontrolledCarousel items={items} />
    )
  }

  renderGalleries() {
    const { galleries } = this.state

    let items = []
    Object.keys(galleries).map((key) => {
      const { title, image } = galleries[key]
      if (image) {
        let item =   {
          img: `${appConfig.assetServer}${image}`,
          title: title,
          author: ''
        }
        items.push(item)
      }
    })

    return (
      <GridListinlineCustom tiles={items}/>
    )
  }

  renderUsers() {
    const { users } = this.state
    let items = []

    let settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  
    Object.keys(users).map((key) => {

      let item = (
        <div key={`home_user_view_${key}`}>
          <Table>
            <tbody>
              <tr>
                <td className="user_image_th">
                  <Img src={`${appConfig.assetServer}${users[key].image}`} 
                    alt="" 
                    className="user_image"
                  />                
                </td>
                <td>
                  <table>
                  <tbody>
                    <tr>
                      <td>
                        <div className="user_name">
                          {`${users[key].first_name} ${users[key].last_name}`}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="user_overview">
                          <p>
                            {users[key].overview}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </td>
              </tr>

            </tbody>
          </Table>
        </div>
      )
      items.push(item)
    })

    return (
      <Slider {...settings}>
        {items}
      </Slider>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Jumbotron className="text-center slogan-description-background">
            <h1>{this.getValueByName('slogan')}</h1>
            <p></p>
            <p className="lead">{this.getValueByName('slogan_description')}</p>
          </Jumbotron>
          <img src={require('../images/backgrounds/back.jpg')} className="home-background-image"/>
        </Row>
        <Row className="pt-5">
          <Col xs="4">
            <div className="services-title">
              <h3><i className="icon-fire" />ПОСЛУГИ ТА ЦІНИ</h3>
            </div>
          </Col>
          <Col xs="8" className="services-content">
            <p>
            Не марнуй свій час – приходь до нас! Наші майстри – найкращі в Україні. Вони перетворять тебе на королеву!
Працюємо виключно з професійною косметикою та матеріалами.
            </p>
          </Col>
        </Row>
        { this.renderServices() }
        { this.renderGalleries() }
        { this.renderUsers() }
        { this.renderPlaces() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    users,
    galleries,
    places,
    reminders,
    shops,
    services,
    serviceCategories
  } = state;

  return {
    users: users,
    galleries,
    places,
    reminders,
    shops,
    services,
    serviceCategories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    brighteyesActions: bindActionCreators(brighteyesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
