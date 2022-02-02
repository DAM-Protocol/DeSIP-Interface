import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router';
import Landing from './pages/Landing';
import extendedTheme from './theme';
import DefaultLayout from './components/layouts/DefaultLayout';
import Loader from './components/Loader';
import NotFound from './pages/NotFound';
import Suite from './pages/SuperSuite/Suite';

const App = () => {
	return (
		<ChakraProvider theme={extendedTheme}>
			<DefaultLayout>
				<Routes>
					<Route path='/'>
						<Route
							exact
							path=''
							element={
								<Suspense fallback={<Loader />}>
									<Landing />
								</Suspense>
							}
						/>

						<Route
							exact
							path='/Super-Suite'
							element={
								<Suspense fallback={<Loader />}>
									<Suite />
								</Suspense>
							}
						/>
						<Route
							exact
							path='/super-dHEDGE'
							element={
								<Suspense fallback={<Loader />}>
									<Suite />
								</Suspense>
							}
						/>
						<Route exact path='404' element={<NotFound />} />
						<Route path='*' element={<Navigate to='/404' />} />
					</Route>
				</Routes>
			</DefaultLayout>
		</ChakraProvider>
	);
};

export default App;
