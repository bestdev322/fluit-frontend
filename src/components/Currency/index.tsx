import React from "react";

interface IProps {
  price: number;
}

const Currency: React.FC<IProps> = ({ price }) => {
  return (
    <>
        {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
    </>
  );
}

export default Currency;