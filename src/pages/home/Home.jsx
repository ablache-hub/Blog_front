import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"

export default function Home() {

    const [fetchData, setFetchData] = useState([])
    useEffect(() => {

        const fetchingData = async () => {
            await axios.get("/article")
                .then((response) => {
                    setFetchData(response.data)
                })

        }
        fetchingData()
    }, [])


    return (
        <>
            <Header/>
            <div className="home">

            <Posts posts={fetchData}/>
            <Sidebar/>
        </div>
        </>
    )
}
