import { Card, Avatar, Button } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

export default function ProductCard({ product }) {
  return (
    <div className="w-full ">
      <Card
        className="my-12 flex flex-col"
        style={{
          width: 250,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
        }}
        cover={
          <img
            alt={product.name}
            src={product.imageUrl}
            // className="flex-grow"
            style={{
              height: "200px",
              objectFit: "cover",
            }}
          />
        }
        actions={[
          <span key="price" className="font-semibold">
            ${product.price}
          </span>,
          <span key="category" className="text-gray-500">
            {product.category}
          </span>,
          <Button
            key="delete"
            type="text"
            className="text-red-500 hover:text-red-700"
            icon={<DeleteOutlined />}
            //   onClick={() => handleDelete(product._id)}
          />,
        ]}
        hoverable
      >
        <Meta
          avatar={<Avatar src={product.imageUrl} />}
          title={product.name}
          description={product.description}
        />
      </Card>
    </div>
  );
}
