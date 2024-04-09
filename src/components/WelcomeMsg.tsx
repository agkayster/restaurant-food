'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

const WelcomeMsg = () => {
	const { status, data } = useSession();

	return (
		<div>
			{status === 'authenticated' && data && (
				<div>
					Welcome {data.user?.name?.split(' ').splice(0, 1).join()}
				</div>
			)}
		</div>
	);
};

export default WelcomeMsg;
