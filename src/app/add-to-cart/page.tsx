'use client'
import NavbarComponent from '@/component/Common/Navbar'
import Spinner from '@/component/Common/Spinner'
import AvailableServices from '@/component/Home/AvailableServices'
import { useGetAllAddToCartQuery } from '@/redux/api/service'
import { IAddToCart } from '@/types'
import { Button, Card, Col, Row } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dynamic from "next/dynamic";
import { getUserInfo } from '@/services/auth.service'

  function AddTOCart() {
    const { userId } = getUserInfo() as any;


    const {data,isLoading} = useGetAllAddToCartQuery({id:userId});

  return (
    <div>
        <NavbarComponent />
        <div>
        {isLoading ? (
        <Spinner />
      ) : (
        <div style={{width:'80%',margin:"auto"}}>
          <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
            Add To Cart Services
          </h1> 
          <Row gutter={100}>
            {data?.addToCart && data?.addToCart[0] ? (
              data?.addToCart?.map((addToCart: IAddToCart) => {
                return (
                  <Col key={addToCart.id} lg={6}>
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={
                        <Image
                          width={150}
                          height={150}
                          alt={addToCart.service.title}
                          src={addToCart.service.image}
                        />
                      }
                      actions={[
                        <Button key={addToCart.id} type="primary">
                          <Link
                            style={{ color: "white" }}
                            href={`/booking/${addToCart.service.id}`}
                          >
                            Book Now
                          </Link>
                        </Button>
                      ]}
                    >
                      <Card.Meta
                        title={addToCart.service.title}
                        description={addToCart.service.description}
                      />
                      <div>
                        <strong>Category: </strong>
                        {addToCart.service.category}
                      </div>
                      <div>
                        <strong>Price: </strong>${addToCart.service.price}
                      </div>
                      <div>
                        <strong>Rating: </strong>
                        {addToCart.service.rating}
                      </div>
                      <div>
                        <strong>Location: </strong>
                        {addToCart.service.serviceLocation}
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div
                style={{ textAlign: "center", width: "100%", color: "#ff1f4f" }}
              >
                <br />
                <br />
                <hr />
                <h2>Services Not Available</h2>
                <hr />
                <br />
                <br />
              </div>
            )}
          </Row>
        </div>
      )}
        </div>
    </div>
  )
}

export default dynamic (() => Promise.resolve(AddTOCart), {ssr: false})