import { afterEach, describe, expect, it, vi } from 'vitest';
import { isCorrectAnswer } from '../api/check-answer';

afterEach(() => {
	vi.unstubAllEnvs();
});

describe('server-side answer validation', () => {
	it('reads its answer key from the server environment', () => {
		vi.stubEnv(
			'PUZZLE_ANSWERS',
			JSON.stringify([
				'TESTZERO',
				'TESTONE',
				'TESTTWO',
				'TESTTHREE',
				'TESTFOUR',
			]),
		);

		expect(isCorrectAnswer(0, 'testzero')).toBe(true);
		expect(isCorrectAnswer(0, 'not-the-answer')).toBe(false);
	});

	it('rejects invalid stages and unconfigured answers', () => {
		vi.stubEnv('PUZZLE_ANSWERS', '');

		expect(isCorrectAnswer(0, 'TESTZERO')).toBe(false);
		expect(isCorrectAnswer(5, 'TESTZERO', ['TESTZERO'])).toBe(false);
	});
});
