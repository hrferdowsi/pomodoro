
import React, { useState, useEffect } from 'react';
import styles from "../styles/pomodo.module.css";

import { Howl, Howler } from 'howler';


interface Time {
    seconds: string;
    minutes: string
}

export default function Pomodo() {

    function timeCalculator(t) {
        let seconds = t % 60;
        let minutes = (t - seconds) / 60;

        let time: Time;
        time.seconds = (seconds < 10 ? `0${seconds}` : JSON.stringify(seconds))
        time.minutes = (minutes < 10 ? `0${minutes}` : JSON.stringify(minutes))

        return time
    }

    const SoundPlay = () => {
        const Sounds = new Howl({
            src: ['./MySound.mp3'],
            html5: true,

        })
        Sounds.play()
    }

    const focusTime = 10;
    const restTime = 5;

    const [play, setPlay] = useState(false)
    const [rest, setRest] = useState(false)
    const [curTime, setCurTime] = useState(focusTime)


    useEffect(() => {

        if (curTime == 0) {
            if (!rest) {
                SoundPlay()
                setCurTime(restTime);
                setRest(true)
                setPlay(false)
            } else {
                setCurTime(focusTime)
                setRest(false)
                setPlay(false)
            }
        } else {
            if (play) {
                const timer = setTimeout(() => {
                    setCurTime(curTime - 1)
                }, 1000);
                return () => clearTimeout(timer);
            }
        }

    })

    return (
        <div className={styles.main}>

            <h1 className={styles.headline}> This is my pomodoro clock </h1>
            {/* <img
              src={'/images/pomodoro.jpg'}
              alt={"pomodo"}
            /> */}
            <div className={styles.clock}>
                <h1>{timeCalculator(curTime).minutes} : {timeCalculator(curTime).seconds}</h1>
                <p>
                    {
                        rest ?
                            "Practice stepping out of repetitive, anxious patterns of thought."
                            :
                            "Without judging, bring your attention back to what matters most at that moment."
                    }
                </p>
            </div>
            <div className={styles.button}>
                <button
                    className={styles.play_button}
                    onClick={() => { setPlay(!play) }
                    }>
                    {!play ? "play" : "pause"}
                </button>
                <button className={styles.reset_button} onClick={() => { setPlay(false); setCurTime(focusTime) }}>
                    Reset
                </button>
                {/* <button onClick={() => SoundPlay()}>Sound</button> */}

            </div>
        </div>
    )
}



  
  