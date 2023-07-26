import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../types";
import TextArea from "../components/TextArea";
import {SAMPLE_DATA} from '../constants';

declare let $;

class Url extends React.Component<ComponentProps,{}> {

  // Refs
  textarea: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  setSampleData = () => {
    let sampleData = SAMPLE_DATA.url;
    $("#inputArea").val(sampleData).trigger("keyup");
  }

  action = (event) => {}
  encode = (event) => {
    $("#outputArea").val(encodeURIComponent($("#inputArea").val()));
  }
  decode = (event) => {
    $("#inputArea").val(decodeURIComponent($("#outputArea").val()));
  }

  onInputAreaKeyUp = (event) => {
    $("#outputArea").val(encodeURIComponent($("#inputArea").val())).trigger("updateStatusBar");
    $("#inputArea").trigger("updateStatusBar");
  }
  onOutputAreaKeyUp = (event) => {
    $("#inputArea").val(decodeURIComponent($("#outputArea").val())).trigger("updateStatusBar");
    $("#outputArea").trigger("updateStatusBar");
  }

  render() {
    const {type, action} = this.props;
    return (
      <div className="url">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          setSampleData={this.setSampleData}
          // action={this.action}
          // encode={this.encode}
          // decode={this.decode}
          onInputAreaKeyUp={this.onInputAreaKeyUp}
          onOutputAreaKeyUp={this.onOutputAreaKeyUp}
        />
      </div>
    )
  }
}

export default connect()(Url);