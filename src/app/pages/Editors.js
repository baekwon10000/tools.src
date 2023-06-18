import React from "react"
import {connect} from "react-redux";

class Editors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.ace_common_options = {
      mode: `ace/mode/${this.props.mode}`,
      showPrintMargin: false,
    };
    
    // Instants or Variables
    this.inputACEEditor = null;
    this.outputACEEditor = null;
    // this.scriptsLoaded = [];
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
        placeholder: `Paste or type your data here...`,
        // enableBasicAutocompletion: true,
        // enableSnippets: true,
        // enableLiveAutocompletion: true
      }
    );
    // editor.setTheme('ace/theme/monokai');
    // editor.setShowPrintMargin(false);
    // editor.session.setMode('ace/mode/html');
    /* editor.session.on('change', function(delta) {
      // delta.start, delta.end, delta.lines, delta.action
      console.log('delta = ', delta);
      self.updateInputAceEditorStatusBar();
    }); */
    let lang = ace.require("ace/lib/lang");
    let statusUpdate = lang.delayedCall(function() {
      self.updateInputAceEditorStatusBar(editor);
    }.bind(this)).schedule.bind(null, 100);
    // console.log('lang = ', lang);
    editor.on('changeStatus', statusUpdate);
    editor.on("changeSelection", statusUpdate);
    editor.on("keyboardActivity", statusUpdate);
  }
  postSetupInputEditor() {}
  updateInputAceEditorStatusBar(editor) {
    // console.log('updateInputAceEditorStatusBar() is called...');
    // console.log('editor.keyBinding.getStatusText(editor) = ', editor.keyBinding.getStatusText(editor));
    let selection = editor.selection;
    let lead = selection.lead;
    // console.log('selection = ', selection);
    // console.log('lead = ', lead);
    document.getElementById('inputAceLineColumn').textContent = `Ln: ${lead.row+1} Col: ${lead.column}`;
  }
  setupOutputEditor() {
    let self = this;
    let editor = this.outputACEEditor = ace.edit('outputACEEditor', {
      ...this.ace_common_options,
    });
    // editor.setTheme('ace/theme/monokai');
    // editor.setShowPrintMargin(false);
    // editor.session.setMode('ace/mode/html');
    // editor.session.on('change', function(delta) {
    //   // delta.start, delta.end, delta.lines, delta.action
    //   self.updateOutputAceEditorStatusBar();
    // });
    let lang = ace.require("ace/lib/lang");
    let statusUpdate = lang.delayedCall(function() {
      self.updateOutputAceEditorStatusBar(editor);
    }.bind(this)).schedule.bind(null, 100);
    // console.log('lang = ', lang);
    editor.on('changeStatus', statusUpdate);
    editor.on("changeSelection", statusUpdate);
    editor.on("keyboardActivity", statusUpdate);
  }
  postSetupOutputEditor() {}
  updateOutputAceEditorStatusBar(editor) {
    let selection = editor.selection;
    let lead = selection.lead;
    // let status = [];
    document.getElementById('outputAceLineColumn').textContent = `Ln: ${lead.row+1} Col: ${lead.column}`;
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
    /* let currentText = this.inputACEEditor.getValue();
    let copyArea = $('<textarea />')
      .text(currentText)
      .attr('readonly', '')
      .css({ 'position': 'absolute', 'left': '-9999px' });
    $('body').append(copyArea);
    copyArea.select();
    document.execCommand('copy');
    copyArea.remove(); */

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
  }
  selectOutputEditor = (event) => {
    this.outputACEEditor.selectAll();
  }
  cleanOutputEditor = (event) => {
    this.outputACEEditor.setValue("");
  }

  render() {
    return (
      <div className="container-fluid py-3">
        <div className="mb-2">
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
        <div className="row">
          <div className="col-md-6 mb-4">
            <div id="inputDiv" className="aceEditorBorder">
              <div className="aceEditorMenu">
                <label className="aceEditorMenuLabel">
                  <i>Input</i>
                </label>
                <div className="editortoolbar btn-group-sm">
                  <a href="#" id="inputcopy" className="icon copytext" title="Copy to Clipboard" onClick={this.copyTextInputEditor}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#" className="icon" title="Select All" onClick={this.selectInputEditor}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#" className="icon" title="Clear" onClick={this.cleanInputEditor}>
                    <svg className="svgicon">
                      <use href="#trash"></use>
                    </svg>
                  </a>
                </div>
                <a href="#" className="icon" style={{marginRight:'25px',float:'right'}} title={`Sample ${this.props.mode.toUpperCase()} Data`} onClick={this.props.setSampleData}>
                  <i>Sample</i>
                </a>
              </div>
              <div id="inputACEEditor" className="twoEditor"></div>
              <div className="columns m-0 is-mobile" id="inputACEStatusBar" style={{backgroundColor:'#ededed',border:'1px solid #dbdbdb'}}>
                <span className="column p-0 pl-1" id="inputAceLineColumn">Ln: 1 Col: 0</span>
                <span className="column p-0 has-text-centered" id="inputTextSize">Size: 0</span>
                {/* <span className="column p-0 is-hidden-mobile" id="inputFontSize">
                  <a href="#" id="inputFontSizeI" title="Increase Text Size" className="icon is-pulled-right">
                    <svg className="svgicon">
                      <use href="#title"></use>
                    </svg>
                  </a>
                  <a href="#" id="inputFontSizeD" title="Decrease Text Size" className="icon is-pulled-right">
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
                  <a href="#" id="outputcopy" className="icon" title="Copy to Clipboard" onClick={this.copyTextOutputEditor}>
                    <svg className="svgicon">
                      <use href="#copy"></use>
                    </svg>
                  </a>
                  {/* <a href="#" className="icon" title="Select All" onClick={this.selectOutputEditor}>
                    <span className="material-symbols-outlined">select_all</span>
                  </a> */}
                  <a href="#" className="icon" title="Clear" onClick={this.cleanOutputEditor}>
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
                  <a href="#" id="outputFontSizeI" title="Increase Text Size" className="icon is-pulled-right">
                    <svg className="svgicon">
                      <use href="#title"></use>
                    </svg>
                  </a>
                  <a href="#" id="outputFontSizeD" title="Decrease Text Size" className="icon is-pulled-right">
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

Editors.propTypes = {};
Editors.defaultProps = {};

export default connect(null, null, null, {withRef:true})(Editors);