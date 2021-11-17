import { resStatuses } from '../constants';

// Wrapper function to catch errors and send corrosponding response.
export const asyncHandler = (fn) => (ctx) => {
	return Promise
		.resolve(fn(ctx))
		.catch((error) => {
			ctx.status = error.status || 500;
			ctx.body = {
				status: resStatuses.error,
				message: error.message || 'Something went wrong.'
			};
		});
};
