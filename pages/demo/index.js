import React, { useEffect } from 'react'
import Link from "next/link";
import NavBar from '../../Components/NavBar';
import { useRouter } from 'next/router';
import styles from '../../styles/demo.module.css'
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
export default function Static({ data }) {
    const router = useRouter()
    useEffect(() => {
        if (!sessionStorage.getItem("userdetails")) {
            router.push('/')
        }
    }, [])
    return (
        <div>
            <NavBar id={null} path={"/home"} />

            <div className={`container-fluid row mx-auto ${styles.MainClassProducts}`} >
                {data.map((data, index) => (
                    <div className={`col-md-3 ${styles.subdivs}`} key={index}>
                        <Card className={`${styles.mainCard}`}>
                            <div className='text-center'>
                                <img
                                    alt="Card"
                                    src={data.image}
                                    height="130px"
                                    width="130px"
                                    className={`${styles.cardImg} `}
                                />
                                <CardBody>
                                    <CardTitle tag="h5" className={`${styles.cardTitle}`} >
                                        <Link href={`/demo/product/${data.id}`}>{data.title}</Link>
                                    </CardTitle>
                                    <CardText>
                                        <span className={styles.coloredText}>Price :- </span>${data.price}
                                        {/* Price : ${data.price} */}
                                    </CardText>
                                    <CardText>
                                        <span className={styles.coloredText}>Rating :- </span> {data.rating.rate}
                                        {/* Rating :  {data.rating.rate} */}
                                    </CardText>
                                </CardBody>
                            </div>
                        </Card>

                    </div>
                ))}
            </div>
        </div>
    )
}
export async function getStaticProps(context) {
    // console.log("Hello",context)
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    return {
        props: {
            data,
        },
    }
}
