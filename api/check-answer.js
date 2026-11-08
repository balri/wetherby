import { normalizeAnswer } from '../src/puzzle.js';

function readAnswerKey() {
	try {
		const answerKey = JSON.parse(process.env.PUZZLE_ANSWERS);
		if (
			!Array.isArray(answerKey) ||
			answerKey.length !== 5 ||
			answerKey.some((answer) => typeof answer !== 'string')
		) {
			return null;
		}
		return answerKey.map(normalizeAnswer);
	} catch {
		return null;
	}
}

export function isCorrectAnswer(stage, answer, answerKey = readAnswerKey()) {
	return (
		Array.isArray(answerKey) &&
		Number.isInteger(stage) &&
		stage >= 0 &&
		stage < answerKey.length &&
		typeof answer === 'string' &&
		normalizeAnswer(answer) === answerKey[stage]
	);
}

export default function handler(request, response) {
	if (request.method !== 'POST') {
		response.setHeader('Allow', 'POST');
		return response.status(405).json({ error: 'Method not allowed' });
	}

	const answerKey = readAnswerKey();
	if (!answerKey) {
		return response
			.status(503)
			.json({ error: 'Answer checking is not configured' });
	}

	const { stage, answer } = request.body ?? {};
	if (
		!Number.isInteger(stage) ||
		stage < 0 ||
		stage >= answerKey.length ||
		typeof answer !== 'string' ||
		answer.length > 100
	) {
		return response.status(400).json({ error: 'Invalid answer request' });
	}

	return response
		.status(200)
		.json({ correct: isCorrectAnswer(stage, answer, answerKey) });
}
