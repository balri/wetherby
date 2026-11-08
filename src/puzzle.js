export const answerKey = [
	'MARGIN',
	'JOURNAL',
	'DIFFERENCE',
	'3124604583',
	'320',
];

export function normalizeAnswer(value) {
	return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function answerMatches(stage, answer) {
	return normalizeAnswer(answer) === answerKey[stage];
}

export function isStageUnlocked(stage, completed) {
	return stage === 0 || completed.includes(stage - 1);
}

export function addCompletedStage(completed, stage) {
	return [...new Set([...completed, stage])];
}
