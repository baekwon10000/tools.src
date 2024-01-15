import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";
import TextArea from "../components/TextArea";
import {SAMPLE_DATA} from '../Constants';

declare let $;

class ByteLength extends React.Component<ComponentProps,{}> {

  // Refs
  textarea: any = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  action = (event) => {}

  setSampleData = () => {
    let sampleData = SAMPLE_DATA.bytelength;
    $("#inputArea").val(sampleData).trigger("keyup");
  }

  onInputAreaKeyUp = (event) => {
    let v = $("#korean-length").val();
    let a = $("#inputArea").val();
    let length = 0;
    for(let i = 0; i < a.length; i++) {
      if('ㄱ' <= a[i] && a[i] <= '힣')
        length += parseInt(v);
      else
        length += 1;
    }
    // console.log(length);
    $("#outputArea").val(length+' bytes').trigger("updateStatusBar");
  }

  options = () => (
    <div id="options" className="row mb-3 bg-light py-3" style={{display:'none'}}>
      <div className="col-md-6">
        <ul className="optionsList">
          <li>
            <label htmlFor="korean-bytelength" className="sub-option">
              한글바이트수
            </label>
            <input type="input" id="korean-bytelength" value="2"/> bytes
          </li>
        </ul>
      </div>
      <div className="col-md-6"></div>
    </div>
  )

  onChange(e) {
    $("#inputArea").trigger("keyup");
  }

  descriptions = () => (
    <div id="descriptions" className="row mb-1 bg-light py-1">
      <div className="col-md-6">
        <ul className="optionsList">
          <li>
            <label htmlFor="korean-length" className="sub-option">
              한글바이트수
            </label>
            <input type="number" id="korean-length" defaultValue="2" min="2" max="3" onChange={this.onChange}/> bytes
          </li>
        </ul>
      </div>
      <div className="col-md-6"></div>
    </div>
  )

  render() {
    const {type, action} = this.props;
    return (
      <div className="byte-length">
        <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          action={action}
          setSampleData={this.setSampleData}
          // options={this.options}
          descriptions={this.descriptions}
          onInputAreaKeyUp={this.onInputAreaKeyUp}
          // onOutputAreaKeyUp={this.onOutputAreaKeyUp}
        />
      </div>
    )
  }
}

import {
  setSomeVal,
} from "../reducers/sample";

const mapStateToProps = (state) => {
  return {
      someVal: state.sample.someVal,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      onSetSomeVal: (value) => dispatch(setSomeVal(value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps, null)(ByteLength);