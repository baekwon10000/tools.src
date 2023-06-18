import React, {} from "react"
import {Link} from "react-router";
import "../../www/css/style.css"
import Icon from "./Icon"
import ICONS from "../utils/icons"
import Main from "../pages/Main"

export class Layout extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        { this.props.children }
      </div>
    )
  }
}

export class PlainLayout extends React.Component {
  render() {
    return (
      <Layout className="plain layout">
        { this.props.children }
      </Layout>
    )
  }
}

export class MainLayout extends React.Component {
  
  render() {

    // console.log('this.props = ', this.props);
    // let {index} = this.props;
    let endpoint = this.props.location ? this.props.location.pathname.split('/')[1] : '404';
    // console.log('endpoint = ', endpoint);

    return (
      <Layout className="layout">

          <header>
            <nav className="navbar navbar-expand-md navbar-light bg-light rounded fixed-top">
              <a className="navbar-brand" href="/">
                Tools
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Beautifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <a className="dropdown-item" href="/html">HTML</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Minifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown02">
                      <a className="dropdown-item" href="/html">HTML</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/json" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Verifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown03">
                      <a className="dropdown-item" href="/json">JSON</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">메뉴명</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                      <a className="dropdown-item" href="#">툴이름</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <div className="main-wrap">
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
                <h5>카테고리명이들어갑니다</h5>
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
