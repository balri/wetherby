import { describe, expect, it } from 'vitest';
import {
	addCompletedStage,
	answerMatches,
	isStageUnlocked,
	normalizeAnswer,
} from './puzzle';

describe('puzzle answer rules', () => {
	it('normalizes case and coordinate punctuation', () => {
		expect(normalizeAnswer(' 31.246 / 04.583 ')).toBe('3124604583');
		expect(normalizeAnswer('difference')).toBe('DIFFERENCE');
	});

	it('accepts each stage answer and rejects incorrect answers', () => {
		expect(answerMatches(0, 'margin')).toBe(true);
		expect(answerMatches(2, 'difference')).toBe(true);
		expect(answerMatches(3, '31.246 04.583')).toBe(true);
		expect(answerMatches(4, '319')).toBe(false);
	});

	it('unlocks stages in sequence and records completion only once', () => {
		expect(isStageUnlocked(0, [])).toBe(true);
		expect(isStageUnlocked(2, [0])).toBe(false);
		expect(isStageUnlocked(2, [0, 1])).toBe(true);
		expect(addCompletedStage([0, 1], 1)).toEqual([0, 1]);
		expect(addCompletedStage([0, 1], 2)).toEqual([0, 1, 2]);
	});
});
