import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import NoPasswordsView from '../NoPasswords'
import WebsiteItem from '../WebsiteItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websitesList: [],
    showPassword: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onChangeInput = event => {
    console.log(event.target.value)
    this.setState({[event.target.name]: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  deleteItem = id => {
    const {websitesList} = this.state
    const updatedDataList = websitesList.filter(item => item.id !== id)
    this.setState({websitesList: updatedDataList})
  }

  addUser = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website.length > 0 && username.length > 0 && password.length > 0) {
      this.setState(prevState => ({
        websitesList: [
          ...prevState.websitesList,
          {
            id: uuidv4(),
            website,
            username,
            password,
          },
        ],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  renderNoPasswords = () => <NoPasswordsView />

  renderPasswordList = () => {
    const {websitesList, showPassword, searchInput} = this.state
    const filteredList = websitesList.filter(ele =>
      ele.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="passwords-list">
        {filteredList.map(websiteDetails => (
          <WebsiteItem
            key={websiteDetails.id}
            websiteDetails={websiteDetails}
            showPassword={showPassword}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      websitesList,
      website,
      username,
      password,
      showPassword,
      searchInput,
    } = this.state

    const filteredList = websitesList.filter(ele =>
      ele.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo"
            />
          </div>
          <div className="password-container">
            <div className="sm-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-sm-image"
              />
            </div>
            <form className="password-input-container" onSubmit={this.addUser}>
              <h1 className="add-password-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeInput}
                  name="website"
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeInput}
                  name="username"
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangeInput}
                  name="password"
                  value={password}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="lg-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-lg-image"
              />
            </div>
          </div>
          <div className="password-list-container">
            <div className="search-header">
              <div className="password-heading-length">
                <h1 className="password-list-heading">Your Passwords</h1>
                <p className="passwords-count">{filteredList.length}</p>
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-logo"
                />
                <input
                  className="input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                  name="searchInput"
                  value={searchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="show-password-container">
              <input
                className="checkbox"
                type="checkbox"
                onChange={this.onShowPassword}
                checked={showPassword}
                id="checkbox"
              />
              <label htmlFor="checkbox" className="show-password">
                Show passwords
              </label>
            </div>
            {filteredList.length === 0
              ? this.renderNoPasswords()
              : this.renderPasswordList()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
