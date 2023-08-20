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
    $('.form button')[2].classList.add('active');
    $('#inputFind').val('<[^>]*>?');
    $('.form button').click((e) => {
      if(e.target.classList.contains('active'))
        e.target.classList.remove('active');
      else
        e.target.classList.add('active');
    });
  }

  setSampleData = (event) => {
    let sampleData = SAMPLE_DATA.html;
    $('#inputArea').val(sampleData);
    // $('#inputArea').focus();
    $('#inputArea').trigger('updateStatusBar');
  }

  replace = (event) => {
    let match_case = $('.form button')[0].classList.contains('active');
    let match_word = $('.form button')[1].classList.contains('active');
    let regular_expression = $('.form button')[2].classList.contains('active');
    let in_select = $('.form button')[3].classList.contains('active');
    // console.log(match_case);
    // console.log(match_word);
    // console.log(regular_expression);
    // console.log(in_select);

    let find = $('#inputFind').val();
    let replace = $('#inputReplace').val();
    let input = $('#inputArea').val();
    // let output = $('#outputArea').val();
    let opt = 'g';
    if(!match_case) opt += 'i';
    let result = input.replace(new RegExp(find, opt), replace);
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
          setSampleData={this.setSampleData}
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