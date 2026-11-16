import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import InventoryStage from './components/InventoryStage';
import LettersStage from './components/LettersStage';

const testAnswers = ['TESTZERO', 'TESTONE', 'TESTTWO', 'TESTTHREE', 'TESTFOUR'];

beforeEach(() => {
	localStorage.clear();
	vi.stubGlobal(
		'fetch',
		vi.fn(async (_url, options) => {
			const { stage, answer } = JSON.parse(options.body);
			return {
				ok: true,
				json: async () => ({ correct: answer === testAnswers[stage] }),
			};
		}),
	);
});

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

async function solveCurrentStage(label, answer) {
	fireEvent.change(screen.getByLabelText(label), { target: { value: answer } });
	fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
	await waitFor(() =>
		expect(
			screen.getByRole('button', { name: /CONTINUE/ }),
		).toBeInTheDocument(),
	);
	fireEvent.click(screen.getByRole('button', { name: /CONTINUE/ }));
}

describe('Wetherby investigation', () => {
	it('opens and closes an inventory item detail modal', () => {
		render(<InventoryStage />);

		fireEvent.click(screen.getByRole('button', { name: /Ivory chess knight/ }));

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(
			screen.getByRole('heading', { name: 'Ivory chess knight' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('img', { name: 'Ivory chess knight' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Previous item' }),
		).toBeDisabled();
		fireEvent.click(screen.getByRole('button', { name: 'Next item' }));
		expect(
			screen.getByRole('heading', { name: 'Magnifying glass' }),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Previous item' }));
		expect(
			screen.getByRole('heading', { name: 'Ivory chess knight' }),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Close item details' }));
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('opens a letter with its complete text and closes the modal', () => {
		render(<LettersStage />);

		fireEvent.click(
			screen.getByRole('button', { name: 'Read letter to Alice, 08 JUL 1894' }),
		);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: 'Previous letter' }),
		).toBeDisabled();
		expect(
			screen.getByRole('heading', { name: 'Letter to Alice' }),
		).toBeInTheDocument();
		expect(screen.getByText(/The tide was unusually high/)).toBeInTheDocument();
		expect(
			screen.getByText(/I shall bring the papers you asked for/),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Next letter' }));
		expect(
			screen.getByRole('heading', { name: 'Letter to Lucy' }),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Previous letter' }));
		expect(
			screen.getByRole('heading', { name: 'Letter to Alice' }),
		).toBeInTheDocument();

		fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('requires correct answers and unlocks all six documents in order', async () => {
		render(<App />);

		expect(
			screen.getByRole('button', { name: /DOCUMENT II Letters/ }),
		).toBeDisabled();
		fireEvent.change(screen.getByLabelText('WHAT DOES THE EVIDENCE SPELL?'), {
			target: { value: 'WRONG' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
		await waitFor(() =>
			expect(screen.getByText(/does not fit the evidence/)).toBeInTheDocument(),
		);
		expect(
			screen.getByRole('button', { name: /DOCUMENT II Letters/ }),
		).toBeDisabled();

		fireEvent.change(screen.getByLabelText('WHAT DOES THE EVIDENCE SPELL?'), {
			target: { value: testAnswers[0] },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
		await waitFor(() =>
			expect(
				screen.getByRole('button', { name: /CONTINUE/ }),
			).toBeInTheDocument(),
		);
		fireEvent.click(screen.getByRole('button', { name: /CONTINUE/ }));

		await solveCurrentStage('WHAT DOES THE EVIDENCE SPELL?', testAnswers[1]);
		await solveCurrentStage('DECODE THE CIPHERED SLIP', testAnswers[2]);
		await solveCurrentStage('ENTER THE TEN DIGITS IN ORDER', testAnswers[3]);
		await solveCurrentStage('ENTER THE SURVEYOR’S SEAL NUMBER', testAnswers[4]);

		expect(
			screen.getByRole('heading', { name: 'The final instruction' }),
		).toBeInTheDocument();
		expect(screen.getByText('153° 04.583')).toBeInTheDocument();
		expect(screen.getByText(/fictional puzzle solution/)).toBeInTheDocument();
		expect(screen.getByText('6 / 6')).toBeInTheDocument();
	});

	it('restores saved completion and hint progress', () => {
		localStorage.setItem(
			'wetherby-progress',
			JSON.stringify({ completed: [0, 1], hints: { 1: 2 } }),
		);
		render(<App />);

		expect(screen.getByText('2 / 6')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /DOCUMENT III Cipher/ }),
		).toBeEnabled();
		expect(
			screen.getByRole('button', { name: /DOCUMENT IV Journal/ }),
		).toBeDisabled();
	});
});
