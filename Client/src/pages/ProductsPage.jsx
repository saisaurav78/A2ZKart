import React, { useState, useContext } from 'react';
import ProductContainer from '../components/ProductContainer';
import ProductCategory from '../components/ProductCategory';
import VisibilityContext from '@/Contexts/VisibilityContext';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const ProductsPage = () => {
  const { visible, setVisible } = useContext(VisibilityContext);
  const [productCategories, setProductCategories] = useState([]);

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Sidebar: Product Categories */}
      <aside className='lg:w-1/4 w-full p-4'>
        <ProductCategory
          productCategories={productCategories}
          setProductCategories={setProductCategories}
        />
      </aside>

      {/* Drawer for Mobile View */}
      {visible && (
        <Drawer open={visible} onOpenChange={setVisible}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className='text-customPalette-white'>Product Categories</DrawerTitle>
              {/* Properly rendering categories */}
              <DrawerDescription>
                {productCategories.length > 0 ? (
                  <ul className='list-disc pl-5'>
                    {productCategories.map((category, index) => (
                      <li key={index} className='text-customPalette-white'>
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No categories available.</p>
                )}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <button className='bg-customPalette-red text-customPalette-white px-4 py-2 rounded-md'>
                  Close
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {/* Main Content: Product Listing */}
      <main className='lg:w-3/4 w-full p-4'>
        <ProductContainer />
      </main>
    </div>
  );
};

export default ProductsPage;
