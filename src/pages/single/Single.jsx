import Sidebar from "../../components/sidebar/Sidebar"
import Article from "../../components/article/Article"
import "./single.css"

export default function Single() {
    return (
        <div className="single">
            <Article/>
            <Sidebar/>
        </div>
    )
}
