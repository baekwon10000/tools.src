import React, {} from "react"
import {Link} from "react-router";
import "../../www/css/style.css"
import Icon from "./Icon"
import ICONS from "../utils/icons"
import Main from "../pages/Main"
import { Props } from "../types"

// interface LayoutProps extends Props {}

export class Layout extends React.Component<Props, {}> {
  render() {
    return (
      <div className={this.props.className}>
        { this.props.children }
      </div>
    )
  }
}

export class PlainLayout extends React.Component<Props, {}> {
  render() {
    return (
      <Layout className="plain layout">
        { this.props.children }
      </Layout>
    )
  }
}

// interface MainLayoutProps extends React.Props<> {}
export class MainLayout extends React.Component<Props, {}> {
  
  render() {

    // console.log('this.props = ', this.props);
    // let {index} = this.props;
    let endpoint = this.props.location ? this.props.location.pathname.split('/')[1] : '404';
    // console.log('endpoint = ', endpoint);

    return (
      <Layout className="layout">

          <header>
            <nav className="navbar navbar-expand-md navbar-light bg-light rounded fixed-top">
              <a className="navbar-brand" href="/" title="Tools">
                <span className="material-symbols-outlined">
                  construction
                </span>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Beautifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <a className="dropdown-item" href="/html/beautify">HTML</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Minifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown02">
                      <a className="dropdown-item" href="/html/minify">HTML</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/json" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Verifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown03">
                      <a className="dropdown-item" href="/json/verify">JSON</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Converter</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="#">JSON to XML</a>
                      <a className="dropdown-item" href="#">XML to JSON</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Encoder/Decoder</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="#">UNICODE</a>
                      <a className="dropdown-item" href="#">URL</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Etc</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="/replace">Html Tag Remover</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                </ul>
                <ul className="contacts">
                  <li>
                    <a className="" href="#" title="Buy a coffee">
                      <span className="material-symbols-outlined">
                        local_cafe
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:zamong99@gmail.com" target="_blank">
                      <Icon name="Email" icon={ICONS['EMAIL']}/>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/baekwon10000/tools.src" target="_blank">
                      <Icon name="Github" icon={ICONS['GITHUB']}/>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <div className="container-total">
            { this.props.children ? this.props.children : <Main/> }
          </div>
          
          <footer className="container-fluid py-3">
            <div className="row">
              <div className="col-6 col-md">
                <h5>Beautifier</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/html">HTML</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Minifier</h5>
                <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="/html">HTML</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Verifier</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/json">JSON</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>메뉴명이들어갑니다</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>메뉴명이들어갑니다</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                  <li><a className="text-muted" href="#">툴이름이들어갑니다</a></li>
                </ul>
              </div>
            </div>
          </footer>
          <footer>
            <div className="wrap">
              <p>© 2023 by 김진규. All right reserved.</p>
            </div>
          </footer>
      </Layout>
    )
  }
}

export default MainLayout
