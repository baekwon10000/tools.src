import React from 'react';
import {connect} from 'react-redux';
import {Props, ComponentProps} from "../Types";
import Editor from '../components/Editor'
import utils from '../utils/Utils';
import {SAMPLE_DATA} from '../Constants';

declare let beautifier, minify, $;
// let beautifier, minify;

class Html extends React.Component<ComponentProps,{}> {

  // Refs
  editor: any = null;

  // Constants
  HTML_BEAUTIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.7/beautifier.js';
  HTML_MINIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html-minifier/0.8.1/htmlminifier.min.js';

  // Instants or Variables
  scriptsLoaded = [];

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  setHtmlSampleData = (event) => {
    let sampleData = SAMPLE_DATA.html;
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

  beautifyHtml = (event) => {
    let self = this;
    utils.loadScript(this.HTML_BEAUTIFIER_URL, function() {
      let opts = {
        indent_size: '4',
        indent_char: ' ',
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
      let output = beautifier.html(inputEditor.getValue(), opts);
      let outputEditor = self.editor.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output, 1);
    });
  }

  byId = (id: string): HTMLInputElement | null => {
    return document.getElementById(id) as HTMLInputElement;
  }

  getMinifyOptions = () => {
    return {
      removeIgnored:                  this.byId('remove-ignored')?.checked,
      removeComments:                 this.byId('remove-comments')?.checked,
      removeCommentsFromCDATA:        this.byId('remove-comments-from-cdata')?.checked,
      removeCDATASectionsFromCDATA:   this.byId('remove-cdata-sections-from-cdata')?.checked,
      collapseWhitespace:             this.byId('collapse-whitespace')?.checked,
      conservativeCollapse:           this.byId('conservative-collapse')?.checked,
      collapseBooleanAttributes:      this.byId('collapse-boolean-attributes')?.checked,
      removeAttributeQuotes:          this.byId('remove-attribute-quotes')?.checked,
      removeRedundantAttributes:      this.byId('remove-redundant-attributes')?.checked,
      useShortDoctype:                this.byId('use-short-doctype')?.checked,
      removeEmptyAttributes:          this.byId('remove-empty-attributes')?.checked,
      removeEmptyElements:            this.byId('remove-empty-elements')?.checked,
      removeOptionalTags:             this.byId('remove-optional-tags')?.checked,
      removeScriptTypeAttributes:     this.byId('remove-script-type-attributes')?.checked,
      removeStyleLinkTypeAttributes:  this.byId('remove-style-link-type-attributes')?.checked,
      caseSensitive:                  this.byId('case-sensitive')?.checked,
      keepClosingSlash:               this.byId('keep-closing-slash')?.checked,
      minifyJS:                       this.byId('minify-js')?.checked,
      // processScripts:                 this.byId('minify-js-templates')?.checked ? this.byId('minify-js-templates-type')?.value : false,
      minifyCSS:                      this.byId('minify-css')?.checked,
      minifyURLs:                     this.byId('minify-urls')?.checked ? { site:this.byId('minify-urls-siteurl')?.value } : false,
      // lint:                           this.byId('use-htmllint')?.checked ? new HTMLLint() : null,
      // maxLineLength:                  parseInt(this.byId('max-line-length')?.value, 10)
    };
  }

  minifyHtml = (event) => {
    let self = this;
    utils.loadScript(this.HTML_MINIFIER_URL, function() {
      let inputEditor = self.editor.getWrappedInstance().inputACEEditor;
      let output = minify(inputEditor.getValue(), self.getMinifyOptions.bind(self)());
      let outputEditor = self.editor.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output);
    });
  }

  verifyHtml = (event) => {
    let self = this;
  }

  minifyOptions = () => (
    <div id="options" className="row mb-3 bg-light pt-3" style={{display:'none'}}>
      <div className="col-md-6">
        <ul className="optionsList">
          <li>
            <input type="checkbox" id="remove-comments" defaultChecked/>
            <label htmlFor="remove-comments">Remove comments
              <br/>
              <span className="quiet short">
                Conditional comments are left intact, but their inner (insignificant) whitespace is removed.
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-comments-from-cdata" defaultChecked/>
            <label htmlFor="remove-comments-from-cdata">Also remove comments from scripts and styles</label>
          </li>
          <li>
            <input type="checkbox" id="remove-cdata-sections-from-cdata" defaultChecked/>
            <label htmlFor="remove-cdata-sections-from-cdata">Remove CDATA sections from scripts and styles</label>
          </li>
          <li>
            <input type="checkbox" id="collapse-whitespace" defaultChecked/>
            <label htmlFor="collapse-whitespace">Collapse whitespace</label>
          </li>
          <li>
            <input type="checkbox" id="conservative-collapse"/>
            <label htmlFor="conservative-collapse">Conservative whitespace collapse</label>
          </li>
          <li>
            <input type="checkbox" id="collapse-boolean-attributes" defaultChecked/>
            <label htmlFor="collapse-boolean-attributes">
              Collapse boolean attributes
              <br/>
              <span className="quiet short">
                (e.g. <code>&lt;... disabled="disabled"&gt; &rarr; &lt;... disabled&gt;</code>)
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-attribute-quotes" defaultChecked/>
            <label htmlFor="remove-attribute-quotes">
              Remove attribute quotes
              <br/>
              <span className="quiet">
                (e.g. <code>&lt;p className="foo"&gt; &rarr; &lt;p className=foo&gt;</code>)
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-redundant-attributes" defaultChecked/>
            <label htmlFor="remove-redundant-attributes">Remove redundant attributes/values</label>
            <div className="quiet">
              <code>&lt;script language="Javascript" ...&gt;</code><br/>
              <code>&lt;form method="get" ...&gt;</code><br/>
              <code>&lt;input type="text" ...&gt;</code><br/>
              <code>&lt;script src="..." charset="..."&gt;</code><br/>
              <code>&lt;a id="..." name="..."&gt;</code><br/>
              <code>&lt;... onclick="javascript:..." ...&gt;</code>
            </div>
          </li>
          <li>
            <input type="checkbox" id="use-short-doctype" defaultChecked/>
            <label htmlFor="use-short-doctype" title="i.e. <!DOCTYPE html>">
              Use short doctype
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-empty-attributes" defaultChecked/>
            <label htmlFor="remove-empty-attributes">
              Remove empty (or blank) attributes
              <br/>
              <span className="quiet short">
                Valid attributes are: className, id, style, title, lang, dir, event attributes
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-optional-tags"/>
            <label htmlFor="remove-optional-tags">
              Remove optional tags
              <br/>
              <span className="quiet short">
                Currently, only:
                <code>&lt;/html&gt;</code>,
                <code>&lt;/head&gt;</code>,
                <code>&lt;/body&gt;</code>,
                <code>&lt;/option&gt;</code>
                <code>&lt;/thead&gt;</code>,
                <code>&lt;/tbody&gt;</code>,
                <code>&lt;/tfoot&gt;</code>,
                and
                <code>&lt;/tr&gt;</code>
              </span>
            </label>
          </li>
        </ul>
      </div>
      <div className="col-md-6">
        <ul className="optionsList">
          <li>
            <input type="checkbox" id="remove-ignored"/>
            <label htmlFor="remove-ignored">
              Remove ignored tags
              <br/>
              <span className="quiet short">
                Currently, only tags starting and ending with:
                <code>&lt;% ... %&gt;</code>
                and
                <code>&lt;? ... ?&gt;</code>
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-empty-elements"/>
            <label htmlFor="remove-empty-elements" className="unsafe">
              Remove empty elements
              <br/>
              <span className="quiet short">
                All except <code>textarea</code>
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-script-type-attributes"/>
            <label htmlFor="remove-script-type-attributes">
              Remove <code>type="text/javascript"</code> from <code>script</code>'s
              <br/>
              <span className="quiet short">
                Values other than "text/javascript" (e.g. "text/vbscript") are left intact.
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="remove-style-link-type-attributes"/>
            <label htmlFor="remove-style-link-type-attributes">
              Remove <code>type="text/css"</code> from <code>style</code>'s and <code>link</code>'s
              <br/>
              <span className="quiet short">
                Values other than "text/css" (e.g. "text/plain" or "application/atom+xml") are left intact.
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="case-sensitive"/>
            <label htmlFor="case-sensitive">
              Case-sensitive attributes
              <br/>
              <span className="quiet short">
                Useful when minifying SVG
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="keep-closing-slash"/>
            <label htmlFor="keep-closing-slash">
              Keep closing slash
              <br/>
              <span className="quiet short">
                Useful when minifying SVG
              </span>
            </label>
          </li>
          <li>
            <input type="checkbox" id="minify-js" defaultChecked/>
            <label htmlFor="minify-js">
              Minify JS
            </label>
          </li>
          {/* <li>
            <input type="checkbox" id="minify-js-templates"/>
            <label htmlFor="minify-js-templates">
              Minify JS Templates
              <br/>
              <span className="quiet short">
                Minify HTML served inside script tag with a custom type attribute like "text/x-handlebars-template"
              </span>
            </label>
          </li>
          <li>
            <label htmlFor="minify-js-templates-type" className="sub-option">
              Template type
            </label>
            <input type="input" id="minify-js-templates-type"/>
          </li> */}
          <li>
            <input type="checkbox" id="minify-css" defaultChecked/>
            <label htmlFor="minify-css">
              Minify CSS
            </label>
          </li>
          <li>
            <input type="checkbox" id="minify-urls"/>
            <label htmlFor="minify-urls">
              Minify URLs
              <br/>
              <span className="quiet short">
                Convert absolute URLs to relative
              </span>
            </label>
          </li>
          <li>
            <label htmlFor="minify-urls-siteurl" className="sub-option">
              Site URL
            </label>
            <input type="input" id="minify-urls-siteurl"/>
          </li>
          {/* <li>
            <input type="checkbox" id="use-htmllint" defaultChecked/>
            <label htmlFor="use-htmllint">
              Validate input through HTML lint
            </label>
          </li> */}
          {/* <li>
            <label htmlFor="max-line-length" className="sub-option">
              Max line length
            </label>
            <input type="number" id="max-line-length" value="0" min="0" max="10000"/>
          </li> */}
        </ul>
      </div>
    </div>
  )

  render() {
    // console.log('this.props = ', this.props);
    const {type, action} = this.props;
    let inputEditorMode, outputEditorMode, beautify, minify, options;

    if(action === 'minify') {
      inputEditorMode = 'html';
      outputEditorMode = 'html';
      beautify = null;
      minify = this.minifyHtml;
      options = this.minifyOptions;
    } else { //if(action === 'beautify') {
      inputEditorMode = 'html';
      outputEditorMode = 'html';
      beautify = this.beautifyHtml;
      options = this.beautifyOptions;
      minify = null;
    }

    return (
      <div className={`html ${action}`}>
        <Editor
          ref={ref => this.editor = ref}
          type={type}
          inputEditorMode={inputEditorMode}
          outputEditorMode={outputEditorMode}
          setSampleData={this.setHtmlSampleData}
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

export default connect()(Html);