import './index.css'

const bgColors = ['color1', 'color2', 'color3', 'color4', 'color5']

const WebsiteItem = props => {
  const {websiteDetails, showPassword, deleteItem} = props
  const {id, website, username, password} = websiteDetails

  const onClickDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-item">
      <div className="left-part">
        <div
          className={`initial-container ${
            bgColors[Math.floor(Math.random() * bgColors.length)]
          }`}
        >
          <h1 className="initial">{website[0].toUpperCase()}</h1>
        </div>
        <div className="detail-container">
          <p className="detail">{website}</p>
          <p className="detail">{username}</p>
          {showPassword ? (
            <p className="detail">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-icon"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default WebsiteItem
