import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  
  // useSWR(<request-url>, ("firebase-url/sales.json") => fetch(url).then(res => res.json()))
  const { data, error } = useSWR("firebase-url/sales.json");
  
  //   const [isLoading, setIsLoading] = useState(false);
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("firebase-url/sales.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformSales = [];
  //         for (const key in data) {
  //           transformSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformSales);
  //         setIsLoading(false);
  //       });
  //   }, [data]);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (!sales) return <p>No data yet</p>;

  useEffect(() => {
    if (data) {
      const transformSales = [];
      for (const key in data) {
        transformSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformSales);
    }
  }, [data]);

  if (error) return <p>Failed to load</p>;
  if (!data && !sales) return <p>Loading...</p>;

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

export async function getStaticProps(context) {
  const res = await fetch("firebase-url/sales.json");
  const data = res.json();

  const transformSales = [];
  for (const key in data) {
    transformSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformSales,
    },
    revalidate: 20,
  };
}
