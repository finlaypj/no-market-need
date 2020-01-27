import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

import { rhythm } from "../utils/typography"
import Splash from "../components/splash"
import SplashMinified from "../components/splash-minified"

class Layout extends React.Component {
  state = {
    email: "",
    submitted: false,
    text: "Subscribe to keep up",
    buttonText: "Submit",
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState({
      email: value,
    })
  }

  _handleSubmit = async e => {
    e.preventDefault()
    this.setState({ buttonText: "Submitting..." })
    await addToMailchimp(this.state.email)
    this.setState({
      email: "",
      text: "Thanks for subscribing!",
      buttonText: "Submit",
    })
  }

  render() {
    const { location, title, description, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = <Splash description={description} />
    } else {
      header = <SplashMinified description={description} />
    }

    return (
      <div>
        <div class="splash" style={{ color: "#F6F0FD", padding: "20px" }}>
          <section className="wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
          </section>
          <header
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(40),
            }}
          >
            {header}
          </header>
        </div>
        <div class="main-nav">
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(40),
            }}
          ></div>
        </div>
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            padding: "30px",
            maxWidth: rhythm(40),
          }}
        >
          {children}
        </main>
        <footer
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            padding: "30px",
            maxWidth: rhythm(40),
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              maxWidth: rhythm(40),
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {this.state.text}
            <form
              autoComplete="off"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "12px",
              }}
              onSubmit={this._handleSubmit}
            >
              <input
                type="text"
                name="email"
                placeholder="Enter your email..."
                value={this.state.email}
                onChange={this.handleInputChange}
                class="subscribe-input flex fill"
              />
              <button type="submit" class="subscribe-submit">
                {this.state.buttonText}
              </button>
            </form>
          </div>

          <span
            class="grey-text"
            style={{
              fontSize: "12px",
              padding: "30px",
              maxWidth: rhythm(40),
              display: "flex",
              justifyContent: "center",
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    )
  }
}

export default Layout
