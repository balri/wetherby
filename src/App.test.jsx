import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';

beforeEach(() => {
	localStorage.clear();
});

afterEach(() => {
	cleanup();
});

function solveCurrentStage(label, answer) {
	fireEvent.change(screen.getByLabelText(label), { target: { value: answer } });
	fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
	fireEvent.click(screen.getByRole('button', { name: /CONTINUE/ }));
}

describe('Wetherby investigation', () => {
	it('requires correct answers and unlocks all six documents in order', () => {
		render(<App />);

		expect(
			screen.getByRole('button', { name: /DOCUMENT II Letters/ }),
		).toBeDisabled();
		fireEvent.change(screen.getByLabelText('WHAT DOES THE EVIDENCE SPELL?'), {
			target: { value: 'WRONG' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
		expect(screen.getByText(/does not fit the evidence/)).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /DOCUMENT II Letters/ }),
		).toBeDisabled();

		fireEvent.change(screen.getByLabelText('WHAT DOES THE EVIDENCE SPELL?'), {
			target: { value: 'MARGIN' },
		});
		fireEvent.click(screen.getByRole('button', { name: 'Check answer' }));
		fireEvent.click(screen.getByRole('button', { name: /CONTINUE/ }));

		solveCurrentStage('WHAT DOES THE EVIDENCE SPELL?', 'JOURNAL');
		solveCurrentStage('DECODE THE CIPHERED SLIP', 'DIFFERENCE');
		solveCurrentStage('ENTER THE TEN DIGITS IN ORDER', '3124604583');
		solveCurrentStage('ENTER THE SURVEYOR’S SEAL NUMBER', '320');

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
