import { useEffect, useState } from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Stage from './Stage';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8000"

function App() {
    const [meetingId, setMeetingId] = useState()

    const createMeeting = async () => {
        const res = await fetch(`${SERVER_URL}/meetings`, {
            method: "POST",
            body: JSON.stringify({ title: "Joint Entrance Examination" }),
            headers: { "Content-Type": "application/json" }
        })
        const resJson = await res.json()
        window.localStorage.setItem("adminId", resJson.admin_id)
        setMeetingId(resJson.data.id)
    }

    useEffect(() => {
        window.localStorage.removeItem('refImgUrl')
        const id = window.location.pathname.split('/')[2]
        if(!!!id) {
            createMeeting()
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home meetingId={meetingId} />}></Route>
                <Route path='/meeting/:meetingId' element={<Stage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;