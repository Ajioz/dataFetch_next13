import React, { useEffect, useState } from "react";

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("firebase-url/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformSales = [];
        for (const key in data) {
          transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
    if (!sales) return <p>No data yet</p>;
    
  return (
    <>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} -${sale.volume}
          </li>
        ))}
      </ul>
    </>
  );
};

export default LastSalesPage;
