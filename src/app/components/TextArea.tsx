import React from "react"
import {connect} from "react-redux";
import {Props} from "../types";

declare let $;

interface TextAreaProps extends Props {

  //
  type: string;
  action: string;
  inputEditorMode: string;
  outputEditorMode: string;
  setSampleData: React.MouseEventHandler<HTMLAnchorElement>;
  
  //
  // action: React.MouseEventHandler<HTMLButtonElement>;
  replace: React.MouseEventHandler<HTMLButtonElement>;
  encode: React.MouseEventHandler<HTMLButtonElement>;
  decode: React.MouseEventHandler<HTMLButtonElement>;
  options: Function;
  onInputAreaKeyUp: React.MouseEventHandler<HTMLButtonElement>;
  onOutputAreaKeyUp: React.MouseEventHandler<HTMLButtonElement>;
}

class TextArea extends React.Component<TextAreaProps,{}> {

  // Instants or Variables
  inputArea = null;
  outputArea = null;
  $inputArea = null;
  $outputArea = null;

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let self = this;
    this.$inputArea = $('#inputArea');
    this.$inputArea.on('keyup', (e) => {
      if(this.props.onInputAreaKeyUp)
        this.props.onInputAreaKeyUp(e);
      this.updateInputAreaStatusBar();
    });
    this.$inputArea.on('mouseup updateStatusBar', (e) => {
      this.updateInputAreaStatusBar();
    });
    this.$outputArea = $('#outputArea');
    this.$outputArea.on('keyup', (e) => {
      if(this.props.onOutputAreaKeyUp)
        this.props.onOutputAreaKeyUp(e);
      this.updateOutputAreaStatusBar();
    });
    this.$outputArea.on('mouseup updateStatusBar', (e) => {
      this.updateOutputAreaStatusBar();
    });
  }

  componentWillUnmount() {
  }

  getLnAndCol(textarea) {
    let lines = textarea.value.substr(0, textarea.selectionStart).split("\n");
    let ln = lines.length;
    let col = lines[lines.length-1].length;
    // console.log("Current Line Number: " + ln + ", Current Column Index: " + col);
    return {ln:ln,col:col};
  }

  updateInputAreaStatusBar() {
    let lead = this.getLnAndCol(this.inputArea);
    document.getElementById('inputLineColumn').textContent = `Ln: ${lead.ln} Col: ${lead.col}`;
    document.getElementById('inputTextSize').textContent = `Size: ${this.inputArea.textLength}`;
  }

  updateOutputAreaStatusBar() {
    let lead = this.getLnAndCol(this.outputArea);
    document.getElementById('outputLineColumn').textContent = `Ln: ${lead.ln} Col: ${lead.col}`;
    document.getElementById('outputTextSize').textContent = `Size: ${this.outputArea.textLength}`;
  }

  // 
  cleanAll = (event) => {
    // this.inputArea.value = "";
    // this.outputArea.value = "";
    this.$inputArea.val("").trigger("keyup");
    this.$outputArea.val("").trigger("keyup");
  }

  // Input
  copyTextInputArea = (event) => {

    this.inputArea.select();
    this.inputArea.focus();
    document.execCommand("copy");

    // 말풍선 효과
    let el = document.querySelector('#inputcopy');
    el.classList.add("active");
    setTimeout(function () {
      el.classList.remove("active");
    }, 2000);

  }

  cleanInputArea = (event) => {
    // this.inputArea.value = "";
    this.$inputArea.val("").trigger("keyup");
  }
  
  // Output
  copyTextOutputArea = (event) => {

    this.outputArea.select();
    this.outputArea.focus();
    document.execCommand("copy");

    // 말풍선 효과
    let el = document.querySelector('#outputcopy');
    el.classList.add("active");
    setTimeout(function () {
      el.classList.remove("active");
    }, 2000);

  }
  cleanOutputArea = (event) => {
    // this.outputArea.value = "";
    this.$outputArea.val("").trigger("keyup");
  }

  options = (e) => {
    // let self = this;
    e.preventDefault();
    if($("#options").is(":hidden")) {
      $("#options").slideDown(0);
    } else {
      $("#options").slideUp(0);
    }
  }

  render() {
    // console.log('this.props = ', this.props);
    const {type, action} = this.props;
    let leftPanelName = 'Input', rightPanelName = 'Output';
    if(action === 'encode' || action === 'decode') {
      leftPanelName = 'Decode', rightPanelName = 'Encode';
    }

    return (
      <div className="textarea">
        <div className="row mb-3">
          <div className="col-md-12">
            {
              this.props.replace ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.replace}>
                <span>Replace</span>
              </button> : null
            }
            {
              this.props.encode ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.encode}>
                <span>Encode</span>
              </button> : null
            }
            {
              this.props.decode ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.decode}>
                <span>Decode</span>
              </button> : null
            }
            <button className="btn btn-outline-secondary" onClick={this.cleanAll}>
              <span>Clear</span>
            </button>
          </div>
        </div>
        {
          this.props.replace ? <form className="row">
            <div className="find form-group col-md-12 mb-1">
              <label htmlFor="exampleInputEmail1" className="">Find</label>
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
              <label htmlFor="exampleInputEmail1" className="">Replace</label>
              <input type="text" className="form-control" id="inputReplace" aria-describedby="" placeholder=""/>
            </div>
          </form> : null
        }
        { this.props.options ? this.props.options() : null }
        <div className="row">
          <div className="col-md-6 mb-4">
            <div id="inputDiv" className="editorBorder">
              <div className="editorMenu">
                <label className="editorMenuLabel">
                  <i>{leftPanelName}</i>
                </label>
                <div className="editortoolbar btn-group-sm">
                  <a href="#" id="inputcopy" className="icon copytext" title="Copy to Clipboard" onClick={this.copyTextInputArea}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#" className="icon" title="Select All" onClick={this.selectInputArea}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#" className="icon" title="Clear" onClick={this.cleanInputArea}>
                    <svg className="svgicon">
                      <use href="#trash"></use>
                    </svg>
                  </a>
                </div>
                {
                  this.props.setSampleData ?
                    <a href="#" className="icon" style={{marginRight:'25px',float:'right'}} title={`Sample ${this.props.type.toUpperCase()} Data`} onClick={this.props.setSampleData}>
                      <i>Sample</i>
                    </a>
                    : null
                }
              </div>
              <div className="twoEditor">
                <textarea ref={(ref)=>{this.inputArea=ref;}}
                  id="inputArea" placeholder='Paste or type your data here...'/>
              </div>
              <div className="columns m-0 is-mobile" id="inputStatusBar" style={{backgroundColor:'#ededed',border:'1px solid #dbdbdb'}}>
                <span className="column p-0 pl-1" id="inputLineColumn">Ln: 1 Col: 0</span>
                <span className="column p-0 has-text-centered" id="inputTextSize">Size: 0</span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div id="outputDiv" className="editorBorder">
              <div className="editorMenu">
                <label className="editorMenuLabel">
                  <i>{rightPanelName}</i>
                </label>
                <div id="outputToolBar" className="editortoolbar btn-group-sm">
                  <a href="#" id="outputcopy" className="icon copytext" title="Copy to Clipboard" onClick={this.copyTextOutputArea}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#" className="icon" title="Select All" onClick={this.selectOutputArea}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#" className="icon" title="Clear" onClick={this.cleanOutputArea}>
                    <svg className="svgicon">
                      <use href="#trash"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="twoEditor">
                <textarea ref={(ref)=>{this.outputArea=ref;}}
                  id="outputArea"/>
              </div>
              <div className="columns m-0 is-mobile" id="outputStatusBar" style={{backgroundColor:'#ededed',border:'1px solid #dbdbdb'}}>
                <span className="column p-0 pl-1" id="outputLineColumn">Ln: 1 Col: 0</span>
                <span className="column p-0 has-text-centered" id="outputTextSize">Size: 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// TextArea.propTypes = {};
// TextArea.defaultProps = {};

export default connect(null, null, null, {withRef:true})(TextArea);
