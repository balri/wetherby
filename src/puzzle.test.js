import { describe, expect, it } from 'vitest';
import { addCompletedStage, isStageUnlocked, normalizeAnswer } from './puzzle';

describe('puzzle answer rules', () => {
	it('normalizes case and coordinate punctuation', () => {
		expect(normalizeAnswer(' 12.345 / 67.890 ')).toBe('1234567890');
		expect(normalizeAnswer('Mixed Case')).toBe('MIXEDCASE');
	});

	it('unlocks stages in sequence and records completion only once', () => {
		expect(isStageUnlocked(0, [])).toBe(true);
		expect(isStageUnlocked(2, [0])).toBe(false);
		expect(isStageUnlocked(2, [0, 1])).toBe(true);
		expect(addCompletedStage([0, 1], 1)).toEqual([0, 1]);
		expect(addCompletedStage([0, 1], 2)).toEqual([0, 1, 2]);
	});
});
