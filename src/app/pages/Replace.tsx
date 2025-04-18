import React from "react"
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";
import {SAMPLE_DATA} from "../Constants";
import TextArea from '../components/TextArea'
import Editor from '../components/Editor'

declare let $;

class Replace extends React.Component<ComponentProps, {}> {

  // Refs
  editor: any = null;
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
    // $('#inputArea').val(sampleData);
    //// $('#inputArea').focus();
    // $('#inputArea').trigger('updateStatusBar');
    this.editor.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  replace = (event) => {
    let self = this;
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
    // let $input = $('#inputArea');
    // let inputEl = document.getElementById('inputArea') as HTMLTextAreaElement;
    // let input = $('#inputArea').val();
    let inputEditor = this.editor.getWrappedInstance().inputACEEditor;

    // console.log('selectionStart = ', inputEl.selectionStart);
    // console.log('selectionEnd = ', inputEl.selectionEnd);
    // console.log(inputEl.value.substring(inputEl.selectionStart, inputEl.selectionEnd));

    // let output = $('#outputArea').val();
    // let opt = 'g';
    // if(!match_case) opt += 'i';
    // let result = input.replace(new RegExp(find, 'g'), replace);
    // $('#outputArea').val(result);
    let result = inputEditor.getValue().replace(new RegExp(find, 'g'), replace);
    let outputEditor = this.editor.getWrappedInstance().outputACEEditor;
    outputEditor.setValue(result, 1);
  }

  panel(): React.JSX.Element {
    return (
      <div className="row form">
        <div className="find form-group col-md-12 mb-1">
          <label htmlFor="inputFind" className="">Find</label>
          <div className="input-group">
            <input type="text" className="form-control" id="inputFind" aria-describedby="" placeholder=""/>
            <div className="input-group-append">
              <button title="Match Case" className="input-group-text material-symbols-outlined">match_case</button>
              <button title="Match Whole Word" className="input-group-text material-symbols-outlined">match_word</button>
              <button title="User Regular Expression" className="input-group-text material-symbols-outlined">regular_expression</button>
            </div>
          </div>
          <button title="in Selection" className="select btn material-symbols-outlined">select</button>
          {/* <div className="wrap">
            <input type="text" className="form-control col-md-4" id="inputFind" aria-describedby="" placeholder=""/>
            <button className="btn btn-secondary material-symbols-outlined">match_case</button>
          </div>
          <button className="btn btn-secondary material-symbols-outlined">select</button> */}
        </div>
        <div className="replace form-group col-md-12">
          <label htmlFor="inputReplace" className="">Replace</label>
          <input type="text" className="form-control" id="inputReplace" aria-describedby="" placeholder=""/>
        </div>
      </div>
    );
  }

  render() {
    // console.log('this.props = ', this.props);
    const {type, action} = this.props; 
    return (
      <div className="replace">
        {/* <TextArea
          ref={ref => this.textarea = ref}
          type={type}
          setSampleData={this.setSampleData}
          // action={this.replace}
          replace={this.replace}
        /> */}
        <Editor
          ref={ref => this.editor = ref}
          type={type}
          inputEditorMode={'text'}
          outputEditorMode={'text'}
          replace={this.replace}
          setSampleData={this.setSampleData}
          panel={this.panel}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect()(Replace);