import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../types";
import {SAMPLE_DATA} from "../constants";
import TextArea from '../components/TextArea'

declare let $;

class Replace extends React.Component<ComponentProps, {}> {

  // Refs
  textarea: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    $('#inputFind').val('<[^>]*>?');
  }

  setHtmlSampleData = (event) => {
    let sampleData = SAMPLE_DATA.html;
    $('#inputArea').val(sampleData);
    $('#inputArea').focus();
  }

  replace = (event) => {
    let find = $('#inputFind').val();
    let replace = $('#inputReplace').val();
    let input = $('#inputArea').val();
    // let output = $('#outputArea').val();
    let result = input.replace(new RegExp(find, 'g'), replace);
    $('#outputArea').val(result);
  }

  render() {
    // console.log('this.props = ', this.props);
    const {type, action} = this.props; 
    return (
      <div className="replace">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          setSampleData={this.setHtmlSampleData}
          // action={this.replace}
          replace={this.replace}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect()(Replace);