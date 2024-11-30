import React from 'react';
import ProductContainer from '../components/ProductContainer';
import ProductCategory from '../components/ProductCategory';
import VisibilityContext from '@/Contexts/VisibilityContext';
import { useContext } from 'react';
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

  return (
    <>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-1/4 w-full p-4'>
            <ProductCategory />
          </div>
          {visible && (
            <Drawer open={visible} onOpenChange={() => setVisible(false)}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className='text-customPalette-white'>drawer title</DrawerTitle>
                  <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          <div className='lg:w-3/4 w-full p-4'>
            <ProductContainer />
          </div>
        </div>
    </>
  );
};

export default ProductsPage;
