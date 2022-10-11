import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ShowpetLIst.css'

const ShowpetList = () => {
    let [showpetList, setShowpetList] = useState(null)
    useEffect(()=>{
        axios({
            url:'http://ssafy.io/api/show-pet/articles', // 본인이 쓴 자랑하기 글 목록 조회 api 주소
            method: 'get',
            headers: {
                Token: 'asdfsf' // 사용자의 토큰값
            }
        })
        .then((res)=>{
            setShowpetList(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    return(
        <div>
            <ListGroup as="ol" numbered>
                {
                    showpetList.length >= 5 ?
                    <div>
                        <ListGroup.Item as="li" action variant='light'>{showpetList[0].title}</ListGroup.Item>
                        <ListGroup.Item as="li" action variant='light'>{showpetList[1].title}</ListGroup.Item>
                        <ListGroup.Item as="li" action variant='light'>{showpetList[2].title}</ListGroup.Item>
                        <ListGroup.Item as="li" action variant='light'>{showpetList[3].title}</ListGroup.Item>
                        <ListGroup.Item as="li" action variant='light'>{showpetList[4].title}</ListGroup.Item>
                    </div> :
                    <div>
                        {
                            showpetList.map(function(article) {
                                return(
                                    <div>
                                        <ListGroup.Item as="li" action variant='light'>{article.title}</ListGroup.Item>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                }
            </ListGroup>
        </div>
    )
}

export default ShowpetList;