import React, { Suspense } from 'react';
import SuccessPage from '../success/page';

function SucessFallback() {
	return <>Success Page</>;
}

const OnSuccessPage = () => {
	return (
		<Suspense fallback={<SucessFallback />}>
			<SuccessPage />
		</Suspense>
	);
};

export default OnSuccessPage;
