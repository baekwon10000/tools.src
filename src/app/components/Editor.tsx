import React from "react"
import {connect} from "react-redux";
import {Props} from "../Types";

// let ace, $;
declare let ace, $;

interface EditorProps extends Props {

  type: string;
  inputEditorMode: string;
  inputEditorHint?: string;
  outputEditorMode: string;
  outputEditorHint?: string;
  setSampleData: React.MouseEventHandler<HTMLAnchorElement>;
  
  //
  beautify: React.MouseEventHandler<HTMLButtonElement>;
  minify: React.MouseEventHandler<HTMLButtonElement>;
  verify: React.MouseEventHandler<HTMLButtonElement>;
  replace: React.MouseEventHandler<HTMLButtonElement>;
  convert: React.MouseEventHandler<HTMLButtonElement>;
  options: () => React.JSX.Element;

}

class Editor extends React.Component<EditorProps,{}> {

  ace_common_options = {
    showPrintMargin: false,
    showInvisibles: true,
    // enableBasicAutocompletion: true,
    // enableSnippets: true,
    // enableLiveAutocompletion: true
  };
  
  // Instants or Variables
  inputACEEditor = null;
  outputACEEditor = null;
  // .scriptsLoaded = [];

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    ace.require("ace/ext/rtl");
    ace.require("ace/multi_select");
    this.setupInputEditor();
    this.setupOutputEditor();
  }

  componentWillUnmount() {
    if(this.inputACEEditor) {
      this.inputACEEditor.destroy();
      this.inputACEEditor.container.remove();
    }
    if(this.outputACEEditor) {
      this.outputACEEditor.destroy();
      this.outputACEEditor.container.remove();
    }
  }

  //
  setupInputEditor() {
    let self = this;
    let editor = this.inputACEEditor = ace.edit('inputACEEditor',
      {
        ...this.ace_common_options,
        mode: `ace/mode/${this.props.inputEditorMode}`,
        placeholder: this.props.inputEditorHint ? this.props.inputEditorHint : `Paste or type your data here...`,
      }
    );
    let lang = ace.require("ace/lib/lang");
    let statusUpdate = lang.delayedCall(function() {
      self.updateInputAceEditorStatusBar(editor);
    }.bind(this)).schedule.bind(null, 100);
    editor.on('changeStatus', statusUpdate);
    editor.on("changeSelection", statusUpdate);
    editor.on("keyboardActivity", statusUpdate);
  }
  postSetupInputEditor() {}
  updateInputAceEditorStatusBar(editor) {
    let selection = editor.selection;
    let lead = selection.lead;
    // console.log('lead = ', lead);
    document.getElementById('inputAceLineColumn').textContent = `Ln: ${lead.row+1} Col: ${lead.column}`;
    document.getElementById('inputTextSize').textContent = `Size: ${editor.getValue().length}`;
  }
  setupOutputEditor() {
    let self = this;
    let editor = this.outputACEEditor = ace.edit('outputACEEditor', {
      ...this.ace_common_options,
      mode: `ace/mode/${this.props.outputEditorMode}`,
      placeholder: this.props.outputEditorHint ? this.props.outputEditorHint : ''
    });
    let lang = ace.require("ace/lib/lang");
    let statusUpdate = lang.delayedCall(function() {
      self.updateOutputAceEditorStatusBar(editor);
    }.bind(this)).schedule.bind(null, 100);
    editor.on('changeStatus', statusUpdate);
    editor.on("changeSelection", statusUpdate);
    editor.on("keyboardActivity", statusUpdate);
  }
  postSetupOutputEditor() {}
  updateOutputAceEditorStatusBar(editor) {
    let selection = editor.selection;
    let lead = selection.lead;
    document.getElementById('outputAceLineColumn').textContent = `Ln: ${lead.row+1} Col: ${lead.column}`;
    document.getElementById('outputTextSize').textContent = `Size: ${editor.getValue().length}`;
  }
  setupEditorAndLoadData() {}

  // 
  cleanAllEditor = (event) => {
    this.inputACEEditor.setValue("");
    this.outputACEEditor.setValue("");
  }

  // Input
  copyTextInputEditor = (event) => {

    this.inputACEEditor.selectAll();
    this.inputACEEditor.focus();
    document.execCommand("copy");

    // 말풍선 효과
    let el = document.querySelector('#inputcopy');
    el.classList.add("active");
    setTimeout(function () {
      el.classList.remove("active");
    }, 2000);

  }
  selectInputEditor = (event) => {
    this.inputACEEditor.selectAll();
    // this.inputACEEditor.focus();
  }
  cleanInputEditor = (event) => {
    this.inputACEEditor.setValue("");
  }
  
  // Output
  copyTextOutputEditor = (event) => {

    this.outputACEEditor.selectAll();
    this.outputACEEditor.focus();
    document.execCommand("copy");

    // 말풍선 효과
    let el = document.querySelector('#outputcopy');
    el.classList.add("active");
    setTimeout(function () {
      el.classList.remove("active");
    }, 2000);

  }
  selectOutputEditor = (event) => {
    this.outputACEEditor.selectAll();
  }
  cleanOutputEditor = (event) => {
    this.outputACEEditor.setValue("");
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
    return (
      <div className="">
        <div className="row mb-3">
          <div className="col-md-12">
            {
              this.props.beautify ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.beautify}>
                <span>Beautify</span>
              </button> : null
            }
            {
              this.props.minify ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.minify}>
                <span>Minify</span>
              </button> : null
            }
            { 
              this.props.verify ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.verify}>
                <span>Verify</span>
              </button> : null
            }
            {
              this.props.replace ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.replace}>
                <span>Replace</span>
              </button> : null
            }
            {
              this.props.convert ? <button className="btn btn-outline-secondary mr-1" onClick={this.props.convert}>
                <span>Convert</span>
              </button> : null
            }
            { 
              this.props.options ? <button className="btn btn-outline-secondary mr-1" onClick={this.options}>
                <span>Options</span>
              </button> : null
            }
            <button className="btn btn-outline-secondary" onClick={this.cleanAllEditor}>
              <span>Clear</span>
            </button>
            {/* <div className="select">
              <select id="indent" onChange={this.beautifyHTML} defaultValue={2}>
                <option value="t">Use Tab</option>
                <option value="1">1 Space</option>
                <option value="2">2 Space</option>
                <option value="3">3 Space</option>
                <option value="4">4 Space</option>
                <option value="5">5 Space</option>
                <option value="6">6 Space</option>
                <option value="7">7 Space</option>
                <option value="8">8 Space</option>
                <option value="9">9 Space</option>
                <option value="10">10 Space</option>
              </select>
            </div> */}
          </div>
        </div>
        { this.props.options ? this.props.options() : null }
        {
          this.props.replace
            ? <div className="row form">
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
              </div>
            : null
        }
        <div className="row">
          <div className="col-md-6 mb-4">
            <div id="inputDiv" className="aceEditorBorder">
              <div className="aceEditorMenu">
                <label className="aceEditorMenuLabel">
                  <i>Input</i>
                </label>
                <div className="editortoolbar btn-group-sm">
                  <a href="#nolink" id="inputcopy" className="icon copytext" title="Copy to Clipboard" onClick={this.copyTextInputEditor}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#nolink" className="icon" title="Select All" onClick={this.selectInputEditor}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#nolink" className="icon" title="Clear" onClick={this.cleanInputEditor}>
                    <svg className="svgicon">
                      <use href="#trash"></use>
                    </svg>
                  </a>
                </div>
                <a href="#nolink" className="icon" style={{marginRight:'25px',float:'right'}} title={`Sample ${this.props.type.toUpperCase()} Data`} onClick={this.props.setSampleData}>
                  <i>Sample</i>
                </a>
              </div>
              <div id="inputACEEditor" className="twoEditor"></div>
              <div className="columns m-0 is-mobile" id="inputACEStatusBar" style={{backgroundColor:'#ededed',border:'1px solid #dbdbdb'}}>
                <span className="column p-0 pl-1" id="inputAceLineColumn">Ln: 1 Col: 0</span>
                <span className="column p-0 has-text-centered" id="inputTextSize">Size: 0</span>
                {/* <span className="column p-0 is-hidden-mobile" id="inputFontSize">
                  <a href="#nolink" id="inputFontSizeI" title="Increase Text Size" className="icon is-pulled-right">
                    <svg className="svgicon">
                      <use href="#title"></use>
                    </svg>
                  </a>
                  <a href="#nolink" id="inputFontSizeD" title="Decrease Text Size" className="icon is-pulled-right">
                    <svg className="svgicon16">
                      <use href="#title"></use>
                    </svg>
                  </a>
                </span> */}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div id="outputDiv" className="aceEditorBorder">
              <div className="aceEditorMenu">
                <label className="aceEditorMenuLabel">
                  <i>Output</i>
                </label>
                <div id="outputToolBar" className="editortoolbar btn-group-sm">
                  <a href="#nolink" id="outputcopy" className="icon copytext" title="Copy to Clipboard" onClick={this.copyTextOutputEditor}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#nolink" className="icon" title="Select All" onClick={this.selectOutputEditor}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#nolink" className="icon" title="Clear" onClick={this.cleanOutputEditor}>
                    <svg className="svgicon">
                      <use href="#trash"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <div id="outputACEEditor" className="twoEditor"></div>
              <div className="columns m-0 is-mobile" id="outputACEStatusBar" style={{backgroundColor:'#ededed',border:'1px solid #dbdbdb'}}>
                <span className="column p-0 pl-1" id="outputAceLineColumn">Ln: 1 Col: 0</span>
                <span className="column p-0 has-text-centered" id="outputTextSize">Size: 0</span>
                {/* <span className="column p-0 is-hidden-mobile" id="outputFontSize">
                  <a href="#nolink" id="outputFontSizeI" title="Increase Text Size" className="icon is-pulled-right">
                    <svg className="svgicon">
                      <use href="#title"></use>
                    </svg>
                  </a>
                  <a href="#nolink" id="outputFontSizeD" title="Decrease Text Size" className="icon is-pulled-right">
                    <svg className="svgicon16">
                      <use href="#title"></use>
                    </svg>
                  </a>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Editors.propTypes = {};
// Editors.defaultProps = {};

export default connect(null, null, null, {withRef:true})(Editor);