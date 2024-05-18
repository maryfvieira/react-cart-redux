import '@testing-library/jest-dom';
import { render, screen, queryByAttribute } from "@testing-library/react";
import Products from '@/components/Products';
//import Layout from '@/app/layout';
import container from './ioc.config.test';

//todo: talvez nao esta dando tempo de carregar o container, ele demora e mostra vazio
describe('Home', () => {
    const getById = queryByAttribute.bind(null, 'id');

    it('renders no product', () => {
      const dom = render(<Products container={container}/>)
      expect(dom.findAllByText('No Product Available')).toBeInTheDocument()
   
      //const produtosDiv = getById(dom.container, 'listaProdutos');
   
    })
  })