import { NavLink } from 'react-router-dom';
import NavbarCSS from './BoardNavbar.module.css';

function BoardNavbar() {
    return (
        <nav className={NavbarCSS.navbar}>
            <div className={NavbarCSS.wrap}>
                <div className={NavbarCSS.title}>게시판</div>
                <ul className={NavbarCSS.submenu}>
                    <li>
                        <NavLink to="/" activeclassname={NavbarCSS.active} exact="ture">
                            공지사항
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeclassname={NavbarCSS.active}>
                            자유 게시판
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeclassname={NavbarCSS.active}>
                            부서&직급 게시판
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default BoardNavbar;