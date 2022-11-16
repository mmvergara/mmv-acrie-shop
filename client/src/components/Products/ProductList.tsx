import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  return (
    <section className='flex w-[100vw] p-2 flex-wrap gap-12  justify-center'>
      <ProductCard
        prod_name='sampleproduasdasdasdasdasct'
        prod_price={200}
        prod_pic_url='https://cdn.discordapp.com/attachments/1039263662852030475/1042323495461326908/aaa.PNG'
        transitionSec={1}
      />{" "}
      <ProductCard
        prod_name='sampleproduct'
        prod_price={200}
        prod_pic_url='https://cdn.discordapp.com/attachments/901942613815468106/1042333857434837002/image.png'
        transitionSec={2}
      />{" "}
      <ProductCard
        prod_name='sampleproduct'
        prod_price={200}
        prod_pic_url='https://cdn.discordapp.com/attachments/1039263662852030475/1042323495461326908/aaa.PNG'
        transitionSec={3}

      />
            <ProductCard
        prod_name='sampleproduct'
        prod_price={200}
        prod_pic_url='https://cdn.discordapp.com/attachments/901942613815468106/1042333857434837002/image.png'
        transitionSec={4}

      />{" "}      <ProductCard
        prod_name='sampleproduct'
        prod_price={200}
        prod_pic_url='https://cdn.discordapp.com/attachments/901942613815468106/1042333857434837002/image.png'
        transitionSec={5}

      />{" "}
    </section>
  );
};

export default ProductList;
