import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Truncate from 'react-truncate-html';
import * as brighteyesActions from  '../actions/brighteyesActions'
import './subFaq.css'

class SubFaq extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brighteyesInfo: props.brighteyesInfo.value,
      titleArray: {
        "what_is_brighteyes": "What is BrightEyes.com?",
        "how_does_brighteyes_work": "How Does BrightEyes.com Work?",
        "why_use_brighteyes": "Why use BrightEyes.com?",
        "the_brighteyes_difference": "The BrightEyes.com Difference",
      }
    };

  }
  componentWillMount() {
    this.props.brighteyesActions.getBrightEyesInfo()
    this.setState({
      brighteyesInfo: this.props.brighteyesInfo.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      brighteyesInfo: nextProps.brighteyesInfo.value
    })
  }

  getValueByName(name) {
    try {
      if (this.state.brighteyesInfo) {
        let info = this.state.brighteyesInfo.find(function(info) {
          return info.name === name;
        })
        return info ? info.value : ''
      }
    } catch (error) {

    }
    return '';
  }

  render() {
    const { pageId } = this.props.match.params;
    return(
      <div className="faq-container">
        <Row className="pt-5">
          <Col sm="12">
            <h3><i className="icon-map" />{ this.state.titleArray[pageId] }</h3>
            <hr />
            <Truncate
              lines={9}
              dangerouslySetInnerHTML={{
               __html: this.getValueByName(pageId)
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { brighteyesInfo } = state;
  return {
    brighteyesInfo: brighteyesInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    brighteyesActions: bindActionCreators(brighteyesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubFaq);
