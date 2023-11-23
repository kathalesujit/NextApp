import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../../../Components/NavBar';
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io'
import { Button, Col, Row } from 'reactstrap';
export default function tododetails(props) {
    const TodoList = useSelector((state) => state.Todo.value)
    const router = useRouter()
    useEffect(() => {
        if (!sessionStorage.getItem("userdetails")) {
            router.push('/')
        }
        // if session storage does not have user details then it will redirect to login page.
    }, [])

    return (
        <div>
            <NavBar id={props.id} path={"/tododetails/"} />
            <br /><br />
            <Col lg={5} className="card container " >
                <br />
                <div>
                    <Button className='btn-sm ' onClick={() => {
                        router.push("/")
                    }} ><IoMdArrowBack /></Button>&nbsp;
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <h4 className="text-uppercase text-center">Task Details</h4>
                </div>
                <br />{
                    TodoList.filter((data) => {
                        if (data.id == props.id) {
                            return data
                        }
                    }).map((data) =>
                        <div>
                            <Row >
                                <Col lg={6}><strong>Title</strong>:</Col>
                                <Col lg={6}>{data.title}</Col>
                            </Row>
                            <br />
                            <Row >
                                <Col lg={6}><strong>Description</strong>:</Col>
                                <Col lg={6}>{data.description}</Col>
                            </Row>
                        </div>
                    )
                }
                <br />
            </Col>
        </div>
    )
}
export async function getServerSideProps({ query }, context) {
    console.log("context ->", context)
    return {
        props: {
            id: query.id,
        },
    }
}

