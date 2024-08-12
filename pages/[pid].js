import path from "path";
import fs from "fs/promises";

const ProductDetailPage = (props) => {
    const { loadedProduct: { title, description } } = props;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export default ProductDetailPage;
