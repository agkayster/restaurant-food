import React, { Suspense } from 'react';
import SuccessPage from '../success/page';

function SucessFallback() {
	return <>Success Page</>;
}

const OnSuccessPage = () => {
	return (
		<div>
			<Suspense fallback={<SucessFallback />}>
				<SuccessPage />
			</Suspense>
		</div>
	);
};

export default OnSuccessPage;
