import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Spring</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" alt="" src="../assets/blog_header.jpg"></img>
        </div>
    )
}
