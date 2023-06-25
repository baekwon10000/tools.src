import React from 'react';
import {connect} from 'react-redux';
import Editors from './Editors'
import utils from "../utils/utils";
// import {minify} from 'html-minifier';
// import requirejs from 'requirejs';
// var requirejs = require('requirejs');
// import $ from "jquery";
// window.jQuery = $;

class Html extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    // Refs
    this.editors = null;

    // Constants
    this.HTML_BEAUTIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautifier.js';
    this.HTML_MINIFIER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html-minifier/0.8.1/htmlminifier.min.js';

    // // Instants or Variables
    // this.scriptsLoaded = [];
  }
  
  setHtmlSampleData = (event) => {
    
    let sampleData = `<!DOCTYPE html>
<html>
  <head>
    <title>Largest companies by market cap — US Stock Market</title>
    <meta charset='UTF-8'>
  </head>
  <body>
    <h1>Apple : 2010 Billion</h1>
    <h2>Saudi Aramco : 1812 Billion</h2>
    <h3>Microsoft : 1800 Billion</h3>
    <h4>Alphabet (Google) : 1155 Billion</h4>
    <h5>Amazon : 869 Billion</h5>
    <b>This data is as of 21 Dec 2022.</b>
  </body>
</html>`;

    // let editor = this.inputACEEditor;
    // editor.setValue(sampleData, 1);
    this.editors.getWrappedInstance().inputACEEditor.setValue(sampleData, 1);
  }

  beautifyHtml = (event) => {
    let self = this;
    utils.loadScript(this.HTML_BEAUTIFIER_URL, function() {
      let opts = {
        'indent_size': '2',
        'indent_char': ' ',
      };
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let output = beautifier.html(inputEditor.getValue(), opts);
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output, 1);
    });
  }

  byId(id) {
    return document.getElementById(id);
  }

  getOptions = () => {
    return {
      removeIgnored:                  this.byId('remove-ignored').checked,
      removeComments:                 this.byId('remove-comments').checked,
      removeCommentsFromCDATA:        this.byId('remove-comments-from-cdata').checked,
      removeCDATASectionsFromCDATA:   this.byId('remove-cdata-sections-from-cdata').checked,
      collapseWhitespace:             this.byId('collapse-whitespace').checked,
      conservativeCollapse:           this.byId('conservative-collapse').checked,
      collapseBooleanAttributes:      this.byId('collapse-boolean-attributes').checked,
      removeAttributeQuotes:          this.byId('remove-attribute-quotes').checked,
      removeRedundantAttributes:      this.byId('remove-redundant-attributes').checked,
      useShortDoctype:                this.byId('use-short-doctype').checked,
      removeEmptyAttributes:          this.byId('remove-empty-attributes').checked,
      removeEmptyElements:            this.byId('remove-empty-elements').checked,
      removeOptionalTags:             this.byId('remove-optional-tags').checked,
      removeScriptTypeAttributes:     this.byId('remove-script-type-attributes').checked,
      removeStyleLinkTypeAttributes:  this.byId('remove-style-link-type-attributes').checked,
      caseSensitive:                  this.byId('case-sensitive').checked,
      keepClosingSlash:               this.byId('keep-closing-slash').checked,
      minifyJS:                       this.byId('minify-js').checked,
      // processScripts:                 this.byId('minify-js-templates').checked ? this.byId('minify-js-templates-type').value : false,
      minifyCSS:                      this.byId('minify-css').checked,
      minifyURLs:                     this.byId('minify-urls').checked ? { site:this.byId('minify-urls-siteurl').value } : false,
      // lint:                           this.byId('use-htmllint').checked ? new HTMLLint() : null,
      // maxLineLength:                  parseInt(this.byId('max-line-length').value, 10)
    };
  }

  minifyHtml = (event) => {
    let self = this;
    utils.loadScript(this.HTML_MINIFIER_URL, function() {
      let inputEditor = self.editors.getWrappedInstance().inputACEEditor;
      let output = minify(inputEditor.getValue(), self.getOptions.bind(self)());
      let outputEditor = self.editors.getWrappedInstance().outputACEEditor;
      outputEditor.setValue(output);
    });
  }

  verifyHtml = (event) => {
    let self = this;
  }

  options = () => (
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

    let map = {
      'beautify':'beatuifier',
      'minify':'minifier',
      'verify':'verifier',
    }

    let pathname = this.props.location.pathname;
    pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;
    let split = pathname.split('/');
    let first = split.length > 0 ? split[0] : null, type = first;
    let second = split.length > 1 ? split[1] : 'beautify', action = second;
    // let third = split.length > 2 ? split[2] : null;
    let title = type.toUpperCase() + ' ' + map[action].substring(0,1).toUpperCase()+map[action].substring(1);

    return (
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{title}</h1>
          </div>
        </div>
        <Editors
          ref={ref => this.editors = ref}
          title={type.toUpperCase()}
          inputEditorMode={'html'}
          outputEditorMode={'html'}
          setSampleData={this.setHtmlSampleData}
          // beautify={this.beautifyHtml}
          minify={this.minifyHtml}
          // verify={this.verifyHtml}
          options={this.options}
        />
      </div>
    )
  }
}

Html.propTypes = {};
Html.defaultProps = {};

export default connect()(Html);