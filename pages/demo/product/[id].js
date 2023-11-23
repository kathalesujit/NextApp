import React from 'react'
import Link from "next/link";
import NavBar from '../../../Components/NavBar';
import styles from '../../../styles/demo.module.css'
import { IoMdArrowBack } from 'react-icons/io'
import { Card, Container } from 'reactstrap';

export default function Post({ data }) {
    console.log("-----------", data)
    return (
        <>
            <NavBar id={null} path={"/home"} />
            <header>
                <Link href="/demo">
                    <h5> <IoMdArrowBack /> All Product</h5>
                </Link>
            </header>
            <h2 style={{ color: '#45474B', textAlign: 'center', paddingBottom: '10px' }}>Product Details </h2>
            <main>
                <Container className={`${styles.demoCon}`}>
                    <Card className={`${styles.demoCard}`}>
                        <img
                            alt="Card"
                            src={data.image}
                            height="200px"
                            width="200px"
                            className={`${styles.cardImg} `}
                        />
                        <h1 className={`${styles.demoTitle}`}>{data.title}</h1>
                        <p>{data.description}</p>
                        <p> <span className={styles.coloredText}>Price :- </span>$ {data.price}</p>
                        <p> <span className={styles.coloredText}>Rating :- </span> {data.rating.rate}</p>

                    </Card>
                </Container>
            </main>
        </>
    );
}

export async function getStaticPaths() {
    const res = await fetch("https://fakestoreapi.com/products",)
    console.log("+++++", res)
    const data = await res.json();

    const paths = data.map((datas) => ({
        params: { id: datas.id.toString() }

    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // Find the product with a matching id (converted to string)
    const product = data.find((p) => p.id.toString() === id);

    return {
        props: {
            data: product,
        },
    };
}
