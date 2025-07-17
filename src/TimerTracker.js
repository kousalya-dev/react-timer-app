// React Timer Project: Start/Stop Timer with Date & Time Logging

import React, { useState, useEffect, useRef } from 'react';
import './TimerTracker.css';

export default function TimerTracker() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [logs, setLogs] = useState([]);
    const intervalRef = useRef(null);

    // Start or Stop timer
    const toggleTimer = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            saveLog();
        } else {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        setIsRunning(!isRunning);
    };

    // Save log when timer stops
    const saveLog = () => {
        const now = new Date();
        const timeStr = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        setLogs((prev) => [...prev, { time: timeStr, seconds }]);
        setSeconds(0);
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="container">
            <h1 className="heading">React Timer Tracker ⏱️</h1>

            <div className="timer-display">{seconds}s</div>

            <button
                onClick={toggleTimer}
                className={`toggle-button ${isRunning ? 'stop' : 'start'}`}
            >
                {isRunning ? 'Stop' : 'Start'} Timer
            </button>

            <div className="logs">
                <h2 className="logs-title">⏳ Timer Logs</h2>
                <ul className="logs-list">
                    {logs.map((log, index) => (
                        <li key={index} className="log-item">
                            <strong>{log.time}:</strong> {log.seconds} seconds
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
