import style from "./Hero.module.css";

function Hero() {
    return (
        <div className={style.mainCont}>
            <div className={style.textCont}>
            <div className={style.badgeCont}>
                <p className={style.badge}>Digitális könyvtár</p>
            </div>
            <h1>Fedezze fel a <span>tudás <br /> végtelen</span> világát</h1>
            <p>Böngésszen könyvtárunk gazdag gyűjteményében, keressen <br/> rá kedvenc szerzőire, és kölcsönözzön egyszerűen online.</p>
            </div>
            <div className={style.filterCont}>
                <input type="text" placeholder="Keresés cím, szerző vagy ISBN alapján" />
                <button className={style.searchButton}>Keresés --></button>
            </div>
            <div className={style.informationCont}>
                <p className={style.information}>10,000+ könyv</p>
                <p className={style.information}>5000+ olvasó</p>
                <p className={style.information}>Biztonságos rendszer</p> 
            </div>
        </div>
    );
}

export default Hero;