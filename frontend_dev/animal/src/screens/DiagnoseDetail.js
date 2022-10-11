import axios from 'axios'
import { useEffect, useState } from "react";
import Lottie from 'lottie-react';
import paper from './../lotties/paper.json'
import treat from './../lotties/treat.json'
import ProgressBar from 'react-bootstrap/ProgressBar';
import loadLottie from './../lotties/loading.json'
import { useLocation } from 'react-router-dom';
import treatMethod from './../treats/treatMethod.json'


const DiagnoseDetail = () => {
    let [info, setInfo] = useState(null)
    let [loading, setLoading] = useState(true)
    let [treats, setTreats] = useState('')
    let location = useLocation();
    useEffect(()=>{
        let accessToken = localStorage.getItem('accessToken')
        const id = location.pathname.substring(16)
        axios({
            url : `http://j7c101.p.ssafy.io:8080/api/diagnose/${id}`,
            method: 'get',
            headers : {
                authorization : `Bearer ${accessToken}`
            }
        })
        .then((res)=>{
            setInfo(res.data.data)
            setTreats(treatMethod[res.data.data.disease_name1])
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <div>
            {
                loading ? <Loading /> :
                <div>
                    <div id='diagnose-result'>
                    <div id='result-header'>
                    <Lottie id='result-paper' animationData={paper}></Lottie>
                    <h2 style={{'fontSize':'60px'}}>{`${info.name}의 진단결과`}</h2>
                    </div>
                    <img src={info.img_url} style={{'width':'350px', 'marginBottom':'30px'}}></img>
                    <div>
                        <div id='result-item'>
                            {info.disease_name1.substr(2)}일 확률 <ProgressBar style={{'height':'30px', 'fontSize':'30px'}} striped animated variant="danger" now={info.probability1} label={`${info.probability1}%`}/>
                        </div>
                        <div id='result-item'>
                            {info.disease_name2.substr(2)}일 확률 <ProgressBar style={{'height':'30px', 'fontSize':'30px'}} striped animated variant="warning" now={info.probability2} label={`${info.probability2}%`}/>
                        </div>
                        <div id='result-item'>
                            {info.disease_name3.substr(2)}일 확률 <ProgressBar style={{'height':'30px', 'fontSize':'30px'}} striped animated variant="info" now={info.probability3} label={`${info.probability3}%`}/>
                        </div>
                    </div>
                    <div id='treat-header'>
                    <Lottie id='treat' animationData={treat}></Lottie>
                    <h2 style={{'fontSize':'60px'}}>{`${info.disease_name1.substr(2)} 대처법`}</h2>
                    </div>
                    <div style={{'width': '550px', 'marginBottom':'30px'}}>
                        {treats}
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

const Loading = () => {
    return (
        <div style={{'display':'flex', 'justifyContent': 'center'}}>
            <Lottie animationData={loadLottie} style={{'width': '300px'}}></Lottie>
        </div>
    )
}

export default DiagnoseDetail;