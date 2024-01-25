import UserIcon from "../../assets/user.png"
import "./header.css"
const Header = () => {
  return (
    <div className="header-container">
      <div className="left">
        <div className="logo">Lets Chat</div>
      </div>
      <div className="right">
        <div className="user">
          <img src={UserIcon} alt="profile" />
        </div>
      </div>
    </div>
  )
}

export default Header