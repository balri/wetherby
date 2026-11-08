export function normalizeAnswer(value) {
	return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function isStageUnlocked(stage, completed) {
	return stage === 0 || completed.includes(stage - 1);
}

export function addCompletedStage(completed, stage) {
	return [...new Set([...completed, stage])];
}
