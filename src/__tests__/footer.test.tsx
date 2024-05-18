import '@testing-library/jest-dom';
import { render, screen, queryByAttribute } from "@testing-library/react";
import Footer from '@/components/Footer';
//import Layout from '@/app/layout';
describe('Home', () => {
    const getById = queryByAttribute.bind(null, 'id');
    it('renders a footer', () => {
      const dom = render(<Footer />)
   
      const footerDiv = getById(dom.container, 'footer');
   
      expect(footerDiv).toBeInTheDocument()
    })
  })

// test("renders the footer in page component", ( )=>{
// const { getByText } = render(<Home/>);
// expect(getByText("I am Child1")).toBeInTheDocument();

// })

// test("renders the footer in page component", () => {
//     render(<Page />);
//     const image = screen.getByAltText("logo");
//   })