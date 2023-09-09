import React from 'react';
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";
import Editor from '../components/Editor'
import utils from '../utils/Utils';
import {SAMPLE_DATA} from '../Constants';

declare let beautifier, minify, $, Cookies;
// let beautifier, minify;

class Beautify extends React.Component<ComponentProps,{}> {

  // Refs
  editor: any = null;

  // Constants
  HTML_BEAUTIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautifier.js';

  // Instants or Variables
  scriptsLoaded = [];

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentDidMount() {
    this.read_settings_from_cookie();
  }

  any(a, b) {
    return a || b;
  }

  read_settings_from_cookie() {
    $('#tabsize').val(this.any(Cookies.get('tabsize'), '4'));
    $('#brace-style').val(this.any(Cookies.get('brace-style'), 'collapse'));
    $('#detect-packers').prop('checked', Cookies.get('detect-packers') !== 'off');
    $('#max-preserve-newlines').val(this.any(Cookies.get('max-preserve-newlines'), '5'));
    $('#keep-array-indentation').prop('checked', Cookies.get('keep-array-indentation') === 'on');
    $('#break-chained-methods').prop('checked', Cookies.get('break-chained-methods') === 'on');
    $('#indent-scripts').val(this.any(Cookies.get('indent-scripts'), 'normal'));
    $('#additional-options').val(this.any(Cookies.get('additional-options'), '{}'));
    $('#space-before-conditional').prop('checked', Cookies.get('space-before-conditional') !== 'off');
    $('#wrap-line-length').val(this.any(Cookies.get('wrap-line-length'), '0'));
    $('#unescape-strings').prop('checked', Cookies.get('unescape-strings') === 'on');
    $('#jslint-happy').prop('checked', Cookies.get('jslint-happy') === 'on');
    $('#end-with-newline').prop('checked', Cookies.get('end-with-newline') === 'on');
    $('#indent-inner-html').prop('checked', Cookies.get('indent-inner-html') === 'on');
    $('#comma-first').prop('checked', Cookies.get('comma-first') === 'on');
    $('#e4x').prop('checked', Cookies.get('e4x') === 'on');
    $('#language').val(this.any(Cookies.get('language'), 'js'));
    $('#indent-empty-lines').prop('checked', Cookies.get('indent-empty-lines') === 'on');
  }

  setSampleData = (event) => {
    const {type} = this.props;
    let sampleData;
    if(type === 'javascript')
      sampleData = SAMPLE_DATA.javascript
    else if(type === 'css')
      sampleData = SAMPLE_DATA.css
    else // if(type === 'html')
      sampleData = SAMPLE_DATA.html
    this.editor.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  beautifyOptions = () => (
    <div id="options" className="row mb-3 bg-light py-3" style={{display:'none'}}>
      <div className="col-md-6">
        <div className="options-select">
          <select name="tabsize" id="tabsize">
            <option value="1">Indent with a tab character</option>
            <option value="2">Indent with 2 spaces</option>
            <option value="3">Indent with 3 spaces</option>
            <option value="4">Indent with 4 spaces</option>
            <option value="8">Indent with 8 spaces</option>
          </select>
          <select name="max-preserve-newlines" id="max-preserve-newlines">
            <option value="-1">Remove all extra newlines</option>
            <option value="1">Allow 1 newline between tokens</option>
            <option value="2">Allow 2 newlines between tokens</option>
            <option value="5">Allow 5 newlines between tokens</option>
            <option value="10">Allow 10 newlines between tokens</option>
            <option value="0">Allow unlimited newlines between tokens</option>
          </select>
          <select name="wrap-line-length" id="wrap-line-length">
            <option value="0">Do not wrap lines</option>
            <option value="40">Wrap lines near 40 characters</option>
            <option value="70">Wrap lines near 70 characters</option>
            <option value="80">Wrap lines near 80 characters</option>
            <option value="110">Wrap lines near 110 characters</option>
            <option value="120">Wrap lines near 120 characters</option>
            <option value="160">Wrap lines near 160 characters</option>
          </select>
          <select id="brace-style">
            <option value="collapse">Braces with control statement</option>
            <option value="expand">Braces on own line</option>
            <option value="end-expand">End braces on own line</option>
            <option value="none">Attempt to keep braces where they are</option>
          </select>
          <div>
            <p style={{margin:"6px 0 0 0"}}>HTML &lt;style&gt;, &lt;script&gt; formatting:</p>
            <select id="indent-scripts">
              <option value="keep">Keep indent level of the tag</option>
              <option value="normal">Add one indent level</option>
              <option value="separate">Separate indentation</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="options-checkboxes">
          <input className="checkbox" type="checkbox" id="end-with-newline"/>
          <label htmlFor="end-with-newline">End script and style with newline?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="e4x"/>
          <label htmlFor="e4x">Support e4x/jsx syntax</label>
          <br/>
          <input className="checkbox" type="checkbox" id="comma-first"/>
          <label htmlFor="comma-first">Use comma-first list style?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="detect-packers"/>
          <label htmlFor="detect-packers">Detect packers and obfuscators?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="brace-preserve-inline"/>
          <label htmlFor="brace-preserve-inline">Preserve inline braces/code blocks?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="keep-array-indentation"/>
          <label htmlFor="keep-array-indentation">Keep array indentation?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="break-chained-methods"/>
          <label htmlFor="break-chained-methods">Break lines on chained methods?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="space-before-conditional"/>
          <label htmlFor="space-before-conditional">Space before conditional: "if(x)" / "if (x)"</label>
          <br/>
          <input className="checkbox" type="checkbox" id="unescape-strings"/>
          <label htmlFor="unescape-strings">Unescape printable chars encoded as \xNN or \uNNNN?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="jslint-happy"/>
          <label htmlFor="jslint-happy">Use JSLint-happy formatting tweaks?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="indent-inner-html"/>
          <label htmlFor="indent-inner-html">Indent &lt;head&gt; and &lt;body&gt; sections?</label>
          <br/>
          <input className="checkbox" type="checkbox" id="indent-empty-lines"/>
          <label htmlFor="indent-empty-lines">Keep indentation on empty lines?</label>
          {/* <br/><a href="?without-codemirror" className="turn-off-codemirror">Use a simple textarea htmlFor code input?</a> */}
        </div>

        {/* <div>
          <p style={{margin:"6px 0 0 0"}}>Additional Settings (JSON):</p>
          <textarea id="additional-options" rows={5}>{}</textarea>
        </div>
        <p id="additional-options-error" hidden style={{margin:"6px 0 0 0; color:red"}}>Could Not Parse JSON!</p>
        <p style={{margin:"6px 0 0 0"}}>Your Selected Options (JSON):</p>
        <div>
          <textarea readOnly id="options-selected" rows={5}></textarea>
        </div> */}
      </div>
    </div>
  )

  store_settings_to_cookie() {
    var opts = {
      expires: 360
    };
    Cookies.set('tabsize', $('#tabsize').val(), opts);
    Cookies.set('brace-style', $('#brace-style').val(), opts);
    Cookies.set('detect-packers', $('#detect-packers').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('max-preserve-newlines', $('#max-preserve-newlines').val(), opts);
    Cookies.set('keep-array-indentation', $('#keep-array-indentation').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('break-chained-methods', $('#break-chained-methods').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('space-before-conditional', $('#space-before-conditional').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('unescape-strings', $('#unescape-strings').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('jslint-happy', $('#jslint-happy').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('end-with-newline', $('#end-with-newline').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('wrap-line-length', $('#wrap-line-length').val(), opts);
    Cookies.set('indent-scripts', $('#indent-scripts').val(), opts);
    Cookies.set('additional-options', $('#additional-options').val(), opts);
    Cookies.set('indent-inner-html', $('#indent-inner-html').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('comma-first', $('#comma-first').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('e4x', $('#e4x').prop('checked') ? 'on' : 'off', opts);
    Cookies.set('language', $('#language').val(), opts);
    Cookies.set('indent-empty-lines', $('#indent-empty-lines').prop('checked') ? 'on' : 'off', opts);
  }

  beautify = (event) => {
    let self = this;
    this.store_settings_to_cookie();
    utils.loadScript(this.HTML_BEAUTIFIER_URL, function() {
      let opts = {
        indent_size: '',
        indent_char: '',
        max_preserve_newlines: '',
        preserve_newlines: false,
        keep_array_indentation: '',
        break_chained_methods: '',
        indent_scripts: '',
        brace_style: '',
        space_before_conditional: '',
        unescape_strings: '',
        jslint_happy: '',
        end_with_newline: '',
        wrap_line_length: '',
        indent_inner_html: '',
        comma_first: '',
        e4x: '',
        indent_empty_lines: '',
      };

      opts.indent_size = $('#tabsize').val();
      opts.indent_char = parseInt(opts.indent_size, 10) === 1 ? '\t' : ' ';
      opts.max_preserve_newlines = $('#max-preserve-newlines').val();
      opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
      opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
      opts.break_chained_methods = $('#break-chained-methods').prop('checked');
      opts.indent_scripts = $('#indent-scripts').val();
      opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked') ? ",preserve-inline" : "");
      opts.space_before_conditional = $('#space-before-conditional').prop('checked');
      opts.unescape_strings = $('#unescape-strings').prop('checked');
      opts.jslint_happy = $('#jslint-happy').prop('checked');
      opts.end_with_newline = $('#end-with-newline').prop('checked');
      opts.wrap_line_length = $('#wrap-line-length').val();
      opts.indent_inner_html = $('#indent-inner-html').prop('checked');
      opts.comma_first = $('#comma-first').prop('checked');
      opts.e4x = $('#e4x').prop('checked');
      opts.indent_empty_lines = $('#indent-empty-lines').prop('checked');

      let inputEditor = self.editor.getWrappedInstance().inputACEEditor;
      let output;
      if(self.props.type === 'javascript')
        output = beautifier.js(inputEditor.getValue(), opts);
      else if(self.props.type === 'css')
        output = beautifier.css(inputEditor.getValue(), opts);
      else // if(self.props.type === 'html')
        output = beautifier.html(inputEditor.getValue(), opts);
      let outputEditor = self.editor.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output, 1);
    });
  }

  render() {
    // console.log('this.props = ', this.props);
    const {type, action} = this.props;
    let inputEditorMode, outputEditorMode, beautify, minify, options;

    inputEditorMode = type;
    outputEditorMode = type;
    beautify = this.beautify;
    options = this.beautifyOptions;
    minify = null;

    return (
      <div className={`beautify ${action} ${type}`}>
        <Editor
          ref={ref => this.editor = ref}
          type={type}
          inputEditorMode={inputEditorMode}
          outputEditorMode={outputEditorMode}
          setSampleData={this.setSampleData}
          beautify={beautify}
          minify={minify}
          // verify={this.verifyHtml}
          options={options}
        />
      </div>
    )
  }
}

// Html.propTypes = {};
// Html.defaultProps = {};

export default connect()(Beautify);