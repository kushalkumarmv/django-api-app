import React from 'react';
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

function render(ui,{...renderOptions } = {}) {
    const Wrapper = ({children}) => (
        <BrowserRouter>{children}</BrowserRouter>
    );
    return rtlRender(ui, { Wrapper:Wrapper,...renderOptions});
}
export * from '@testing-library/react' ;  // export everything we get from @testing-library/react to make it easier for us
export { render };