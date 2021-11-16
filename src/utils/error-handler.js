import { resStatuses } from '../constants';

// Wrapper function
export const errorHandler = async ({ tryFunc, ctx }) => {
	try {
		await tryFunc();
	} catch (error) {
		ctx.status = error.status || 500;
		ctx.body = {
			status: resStatuses.error,
			message: error.message || 'Something went wrong.'
		};
	}
};

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
