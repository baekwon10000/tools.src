import React, {} from "react"
import {Link} from "react-router";
import "../../www/css/style.css"
import Icon from "./Icon"
import ICONS from "../utils/Icons"
import Main from "../pages/Main"
import { Props } from "../Types"
import { MENUS } from "../Constants"

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
                  {
                    MENUS.map((item, index) => {
                      return (
                        <li key={index} className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{item.title}</a>
                          <div className="dropdown-menu" aria-labelledby="dropdown01">
                            {
                              item.menus.map((item, index) => {
                                return (
                                  <a key={index} className="dropdown-item" href={item.link}>{item.name}</a>
                                )
                              })
                            }
                          </div>
                        </li>
                      );
                    })
                  }
                  {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Beautifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <a className="dropdown-item" href="/beautify/html">Html</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Minifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown02">
                      <a className="dropdown-item" href="/minify/html">Html</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Verifier</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown03">
                      <a className="dropdown-item" href="/verify/json">Json</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Converter</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Encoder/Decoder</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="/encode/unicode">Unicode</a>
                      <a className="dropdown-item" href="/encode/url">Url</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#nolink" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Etc</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                      <a className="dropdown-item" href="/replace/html">Html Tag Remover</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                      <a className="dropdown-item" href="#nolink">-</a>
                    </div>
                  </li> */}
                </ul>
                <ul className="contacts">
                  <li>
                    <a className="" href="#nolink" title="Buy a coffee">
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
              {
                MENUS.map((item, index) => {
                  return (
                    <div key={index} className="col-6 col-md">
                      <h5>{item.title}</h5>
                      <ul className="list-unstyled text-small">
                        {
                          item.menus.map((item, index) => {
                            return (
                              <li key={index}><a className="text-muted" href={item.link}>{item.name}</a></li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
              {/* <div className="col-6 col-md">
                <h5>Beautifier</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/beautify/html">Html</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Minifier</h5>
                <ul className="list-unstyled text-small">
                <li><a className="text-muted" href="/minify/html">Html</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Verifier</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/verify/json">Json</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Converter</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Encoder/Decoder</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/encode/unicode">Unicode</a></li>
                  <li><a className="text-muted" href="/encode/url">Url</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Etc</h5>
                <ul className="list-unstyled text-small">
                  <li><a className="text-muted" href="/replace">Html Tag Remover</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                  <li><a className="text-muted" href="#nolink">-</a></li>
                </ul>
              </div> */}
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
