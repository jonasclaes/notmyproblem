import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const toTitleCase = (text: string): string => {
	const firstPart = text.slice(0, 1);
	const secondPart = text.slice(1);
	return `${firstPart.toUpperCase()}${secondPart}`;
};

export const load = (async ({ fetch, params }) => {
	const reasonResponse = await fetch(`/api/v1/reasons/${params.id}`);

	if (reasonResponse.status !== 200) {
		const reasonError: { error: { message: string } } = await reasonResponse.json();

		return error(reasonResponse.status, reasonError.error.message);
	}

	const reason: { data: { id: number; status: string; reason: string } } =
		await reasonResponse.json();

	return { reason: { ...reason.data, reason: toTitleCase(reason.data.reason) } };
}) satisfies PageServerLoad;
