import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_APP_AUTH_SERVICE_URL,
	trustedOrigins: [
		import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL,
		import.meta.env.VITE_APP_AUTH_SERVICE_URL,
	],
	plugins: [
		inferAdditionalFields({
			user: {
				lastName: {
					type: 'string',
				},
			},
		}),
	],
});
