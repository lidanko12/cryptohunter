import React, { Suspense } from 'react';
import Banner from '../components/Banner'
import Loader from '../components/Loader/Loader'
import { ErrorBoundary } from "react-error-boundary";

import MyErrorBund from '../components/MyErrorBund/MyErrorBund';
const CoinsTable = React.lazy(()=>import('../components/CoinsTable'))

const HomePage = () => {
    return (
        <>
          <Banner/> 
          <ErrorBoundary fallback={<Loader/>} FallbackComponent={<MyErrorBund/>}>
          <Suspense fallback={<Loader/>}>
          <CoinsTable/>
          </Suspense>
          </ErrorBoundary>
        </>
    )
}

export default HomePage
