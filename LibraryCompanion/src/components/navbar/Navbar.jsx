import style from "./Navbar.module.css";
import logo from "../../assets/logo.svg"
import dark_mode from "../../assets/dark_mode.svg"
import magnifier from "../../assets/magnifier.svg"
import profile from "../../assets/profile.svg"

function Navbar({ children }) {
    return (
        <>
        <nav className={style.mainContainer}>
            <div className={style.leftContainer}>
                <img src={logo} alt="Library Logo" className={style.logo} />
                <h2>Library</h2>
            </div>

            <div className={style.middleContainer}>
                <button className={style.catalogueButton}>Home</button>
                <button className={style.catalogueButton}>Catalogue</button>
                <button className={style.catalogueButton}>Search</button>
                <button className={style.catalogueButton}>Dashboard</button>
            </div>

            <div className={style.rightContainer}>
                <button className={style.buttonsRight} aria-label="Toggle Dark Mode">
                    <img src={dark_mode} alt="" className={style.iconRight} />
                </button>
                
                <button className={style.buttonsRight} aria-label="Search">
                    <img src={magnifier} alt="" className={style.iconRight} />
                </button>
                
                <button className={style.buttonsRight} aria-label="Profile">
                    <img src={profile} alt="" className={style.iconRight} />
                </button>

                <button className={style.signIn}>Sign in</button>
            </div>
        </nav>
        {children}
        </>
    )
}

export default Navbar;