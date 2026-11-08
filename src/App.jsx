import { useState } from 'react';
import {
	ArrowDownRight,
	ArrowRight,
	BookOpen,
	Check,
	ChevronRight,
	CircleHelp,
	Compass,
	KeyRound,
	LockKeyhole,
	Mail,
	RotateCcw,
	ScrollText,
	Sparkles,
} from 'lucide-react';
import CipherStage from './components/CipherStage';
import InventoryStage from './components/InventoryStage';
import JournalStage from './components/JournalStage';
import LettersStage from './components/LettersStage';
import SurveyorStage from './components/SurveyorStage';
import TestamentStage from './components/TestamentStage';
import { addCompletedStage, answerMatches, isStageUnlocked } from './puzzle';

const stages = [
	{
		id: 0,
		title: 'The inventory',
		short: 'Inventory',
		icon: ScrollText,
		eyebrow: 'DOCUMENT I',
	},
	{
		id: 1,
		title: 'The correspondence',
		short: 'Letters',
		icon: Mail,
		eyebrow: 'DOCUMENT II',
	},
	{
		id: 2,
		title: 'The ciphered slip',
		short: 'Cipher',
		icon: Sparkles,
		eyebrow: 'DOCUMENT III',
	},
	{
		id: 3,
		title: 'The private journal',
		short: 'Journal',
		icon: BookOpen,
		eyebrow: 'DOCUMENT IV',
	},
	{
		id: 4,
		title: 'The surveyor’s seal',
		short: 'Check',
		icon: Compass,
		eyebrow: 'DOCUMENT V',
	},
	{
		id: 5,
		title: 'The final testament',
		short: 'Will',
		icon: KeyRound,
		eyebrow: 'DOCUMENT VI',
	},
];

const hints = [
	[
		'Wetherby tells you which dates deserve to stay. Ordinary calendar knowledge is enough.',
		'Keep only leap-year acquisitions, then sort them from earliest to latest.',
		'Read the first letter of each kept object: M A R G I N.',
	],
	[
		'The small number at the left of each letter is useful, but it is not a letter.',
		'Sort the letters by postmark. Use the number to count into the recipient’s first name.',
		'The ordered initials are J O U R N A L.',
	],
	[
		'The note tells you to use the length of JOURNAL as the shift.',
		'Move each ciphertext letter seven places backward through the alphabet.',
		'The decoded word names the operation for each reading pair.',
	],
	[
		'The decoded word names the operation. The margin marks separate south from east.',
		'For each pair, subtract the smaller reading from the larger.',
		'The ten differences are 3 1 2 4 6 0 4 5 8 3. Keep S first, then E.',
	],
	[
		'Add the five digits in each row separately, then multiply the two sums.',
		'The southern sum is 16. The eastern sum is 20.',
		'16 multiplied by 20 gives the three-digit seal number.',
	],
	[
		'The testament supplies the degrees and directions. The journal supplies the minutes.',
	],
];

function readProgress() {
	try {
		return (
			JSON.parse(localStorage.getItem('wetherby-progress')) || {
				completed: [],
				hints: {},
			}
		);
	} catch {
		return { completed: [], hints: {} };
	}
}

export default function App() {
	const [progress, setProgress] = useState(readProgress);
	const [activeStage, setActiveStage] = useState(0);
	const [answer, setAnswer] = useState('');
	const [feedback, setFeedback] = useState('');

	const completed = progress.completed;
	const isUnlocked = (stage) => isStageUnlocked(stage, completed);

	function saveProgress(next) {
		setProgress(next);
		localStorage.setItem('wetherby-progress', JSON.stringify(next));
	}

	function checkAnswer(event) {
		event.preventDefault();
		if (!answerMatches(activeStage, answer)) {
			setFeedback(
				'That does not fit the evidence yet. Recheck the order and the extraction rule.',
			);
			return;
		}

		saveProgress({
			...progress,
			completed: addCompletedStage(completed, activeStage),
		});
		setFeedback('Correct. The next document is now available.');
		setAnswer('');
	}

	function showHint() {
		const count = progress.hints[activeStage] || 0;
		if (count >= hints[activeStage].length) return;
		saveProgress({
			...progress,
			hints: { ...progress.hints, [activeStage]: count + 1 },
		});
	}

	function resetCase() {
		localStorage.removeItem('wetherby-progress');
		setProgress({ completed: [], hints: {} });
		setActiveStage(0);
		setAnswer('');
		setFeedback('');
	}

	function goToStage(stage) {
		if (!isUnlocked(stage)) return;
		if (stage === stages.length - 1 && !completed.includes(stage)) {
			saveProgress({ ...progress, completed: [...completed, stage] });
		}
		setActiveStage(stage);
		setAnswer('');
		setFeedback('');
	}

	const stageComplete = completed.includes(activeStage);
	const hintsShown = progress.hints[activeStage] || 0;
	const current = stages[activeStage];

	return (
		<div className="site-shell">
			<header className="topbar">
				<a className="brand" href="#top" aria-label="Wetherby Papers home">
					<span className="brand-mark">
						<Compass size={18} strokeWidth={1.7} />
					</span>
					<span>
						FIELD NOTES <b>·</b> NO. 04
					</span>
				</a>
				<div className="topbar-right">
					<span className="status-dot" /> PRIVATE ESTATE ARCHIVE
				</div>
			</header>

			<main id="top" className="layout">
				<aside className="sidebar">
					<div className="case-label">
						<span>THE WETHERBY PAPERS</span>
						<span className="case-stamp">CASE 04</span>
					</div>
					<h1>
						The last will of
						<br />
						<em>Mr Ambrose Wetherby</em>
					</h1>
					<p className="sidebar-intro">
						A six-document mystery, assembled from the papers of an eccentric
						collector.
					</p>
					<figure className="archive-photo">
						<img
							src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
							alt="Tall shelves of books in an old library"
						/>
						<figcaption>THE COLLECTOR’S READING ROOM</figcaption>
					</figure>

					<div className="progress-block">
						<div className="progress-heading">
							<span>INVESTIGATION</span>
							<span>
								{completed.length} / {stages.length}
							</span>
						</div>
						<div
							className="progress-track"
							aria-label={`${completed.length} of ${stages.length} documents solved`}
						>
							<span
								style={{
									width: `${(completed.length / stages.length) * 100}%`,
								}}
							/>
						</div>
					</div>

					<nav className="stage-nav" aria-label="Case documents">
						{stages.map((stage) => {
							const Icon = stage.icon;
							const unlocked = isUnlocked(stage.id);
							const done = completed.includes(stage.id);
							return (
								<button
									className={`stage-link ${activeStage === stage.id ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
									key={stage.id}
									onClick={() => goToStage(stage.id)}
									disabled={!unlocked}
									aria-current={activeStage === stage.id ? 'step' : undefined}
								>
									<span className="stage-icon">
										{done ? (
											<Check size={16} />
										) : unlocked ? (
											<Icon size={16} />
										) : (
											<LockKeyhole size={15} />
										)}
									</span>
									<span className="stage-label">
										<small>{stage.eyebrow}</small>
										{stage.short}
									</span>
									{done ? (
										<span className="stage-done">SOLVED</span>
									) : unlocked ? (
										<ChevronRight className="stage-chevron" size={15} />
									) : null}
								</button>
							);
						})}
					</nav>

					<div className="sidebar-bottom">
						<div className="seal">
							A.W.<span>1894</span>
						</div>
						<p>
							“Do not be fooled by the obvious. The order matters, the words
							matter, and the numbers matter most of all.”
						</p>
						<span className="quote-credit">— A. WETHERBY, PERSONAL NOTE</span>
					</div>
				</aside>

				<section className="workspace" aria-live="polite">
					<div className="workspace-head">
						<div className="breadcrumbs">
							<span>CASE FILE</span>
							<ChevronRight size={13} />
							<span>{current.eyebrow}</span>
						</div>
						<button
							className="reset-button"
							onClick={resetCase}
							title="Reset investigation"
						>
							<RotateCcw size={14} />
							<span>RESET</span>
						</button>
					</div>

					{activeStage === 0 && <InventoryStage />}
					{activeStage === 1 && <LettersStage />}
					{activeStage === 2 && <CipherStage />}
					{activeStage === 3 && <JournalStage />}
					{activeStage === 4 && <SurveyorStage />}
					{activeStage === 5 && <TestamentStage />}

					{activeStage < stages.length - 1 && (
						<div className="solve-area">
							{stageComplete ? (
								<div className="solved-banner">
									<span className="solved-check">
										<Check size={16} />
									</span>
									<div>
										<strong>Document deciphered</strong>
										<small>
											{activeStage === stages.length - 2
												? 'The testament is ready to be read.'
												: 'The next paper has been released from the envelope.'}
										</small>
									</div>
									<button onClick={() => goToStage(activeStage + 1)}>
										CONTINUE <ArrowRight size={14} />
									</button>
								</div>
							) : (
								<form className="answer-form" onSubmit={checkAnswer}>
									<label htmlFor="answer">
										{activeStage === 3
											? 'ENTER THE TEN DIGITS IN ORDER'
											: activeStage === 4
												? 'ENTER THE SURVEYOR’S SEAL NUMBER'
												: activeStage === 2
													? 'DECODE THE CIPHERED SLIP'
													: 'WHAT DOES THE EVIDENCE SPELL?'}
									</label>
									<div className="answer-row">
										<input
											id="answer"
											value={answer}
											onChange={(event) => {
												setAnswer(event.target.value);
												setFeedback('');
											}}
											placeholder={
												activeStage === 3
													? 'e.g. 1234567890'
													: activeStage === 4
														? 'e.g. 320'
														: 'Your answer'
											}
											autoComplete="off"
											spellCheck="false"
										/>
										<button
											className="submit-button"
											type="submit"
											aria-label="Check answer"
										>
											<ArrowRight size={18} />
										</button>
									</div>
									<div className="form-foot">
										<span>Answers are not case-sensitive.</span>
										{feedback && (
											<span
												className={
													feedback.startsWith('Correct')
														? 'feedback good'
														: 'feedback'
												}
											>
												{feedback}
											</span>
										)}
									</div>
								</form>
							)}

							<div className="hint-area">
								<div className="hint-header">
									<span>
										<CircleHelp size={15} /> NEED A NUDGE?
									</span>
									<button
										onClick={showHint}
										disabled={hintsShown >= hints[activeStage].length}
									>
										{hintsShown >= hints[activeStage].length
											? 'ALL HINTS SHOWN'
											: `REVEAL HINT ${hintsShown + 1} / ${hints[activeStage].length}`}
										<ArrowDownRight size={14} />
									</button>
								</div>
								{hints[activeStage].slice(0, hintsShown).map((hint, index) => (
									<p className="hint-copy" key={hint}>
										<span>{String(index + 1).padStart(2, '0')}</span>
										{hint}
									</p>
								))}
							</div>
						</div>
					)}

					<footer className="page-footer">
						<span>WETHERBY ESTATE · PRIVATE PAPERS</span>
						<span>ALL TIMES AND PLACES ARE FICTIONAL</span>
					</footer>
				</section>
			</main>
		</div>
	);
}
