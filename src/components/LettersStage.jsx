import { useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, Mail, X } from 'lucide-react';

const letters = [
	{
		date: '08 JUL 1894',
		recipient: 'Alice',
		position: 2,
		excerpt:
			'The river at dusk was the colour of old pewter. I watched it from the bridge until the lamps came on.',
		body: [
			'The river at dusk was the colour of old pewter. I watched it from the bridge until the lamps came on.',
			'The tide was unusually high, and a small boat had broken loose from its mooring. No one seemed much troubled by it, though I thought of the keeper who will have to account for it in the morning.',
			'I shall bring the papers you asked for when I come to town on Thursday. Until then, please keep this between us.',
		],
	},
	{
		date: '02 MAY 1894',
		recipient: 'Lucy',
		position: 2,
		excerpt:
			'A parcel arrived with no return address. It contained three buttons and a very stern note.',
		body: [
			'A parcel arrived with no return address. It contained three buttons and a very stern note.',
			'The note insists that the buttons be returned to their proper owner, though it gives no name by which I might find them. One is brass, one is horn, and the third is plainly from a child’s coat.',
			'I have put them in the top drawer of the writing desk. Perhaps you will recognise the hand when you see the note.',
		],
	},
	{
		date: '03 APR 1894',
		recipient: 'Julia',
		position: 1,
		excerpt:
			'The new lens is excellent, though it makes the housekeeper appear even more suspicious than usual.',
		body: [
			'The new lens is excellent, though it makes the housekeeper appear even more suspicious than usual.',
			'It arrived safely on Tuesday, wrapped in enough paper to furnish a small shop. I have already used it to examine the old photograph from the west room; there is a mark in the corner that I cannot make out by candlelight.',
			'Do come by before the week is out, if your other engagements permit.',
		],
	},
	{
		date: '20 JUN 1894',
		recipient: 'Caleb',
		position: 2,
		excerpt:
			'I have taken to walking before breakfast. The gulls are less conversational than the neighbours.',
		body: [
			'I have taken to walking before breakfast. The gulls are less conversational than the neighbours.',
			'This morning I went as far as the harbour wall and found the stones still wet from the night’s rain. The air was clear enough to see the headland, and for once I returned in better spirits than I left.',
			'If you are in the neighbourhood on Sunday, I should be glad of your company.',
		],
	},
	{
		date: '15 MAY 1894',
		recipient: 'Bernard',
		position: 3,
		excerpt:
			'Your account of the auction was diverting. I should have bid on the little brass box after all.',
		body: [
			'Your account of the auction was diverting. I should have bid on the little brass box after all.',
			'I remember its clasp was unusual, and I suspect there was something hidden in the lining. If the buyer can be persuaded to part with it, do let me know; I will pay a fair price and ask no questions.',
			'Thank you for thinking to write. Your letters are always a welcome interruption.',
		],
	},
	{
		date: '05 JUN 1894',
		recipient: 'Anne',
		position: 2,
		excerpt:
			'Please return the blue volume when convenient. Its spine is cracked, but the endpapers are sound.',
		body: [
			'Please return the blue volume when convenient. Its spine is cracked, but the endpapers are sound.',
			'I have found a name written faintly beneath the front board, in a hand I do not know. It may be nothing, but I would rather have the book here before I ask the solicitor about it.',
			'There is no hurry if you are still reading. I only ask that it not be lent onward.',
		],
	},
	{
		date: '17 APR 1894',
		recipient: 'Robert',
		position: 2,
		excerpt:
			'The map you sent is upside down, unless the world has lately changed its habits.',
		body: [
			'The map you sent is upside down, unless the world has lately changed its habits.',
			'Even corrected, it places the old path a good half-mile east of where I remember it. I walked there yesterday and found only a stone wall, newly repaired. Perhaps the surveyor’s copy will settle the matter.',
			'Do send the original when you have a moment, and I shall compare the markings.',
		],
	},
];

export default function LettersStage() {
	const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
	const selectedLetter =
		selectedLetterIndex === null ? null : letters[selectedLetterIndex];

	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT II · PRIVATE CORRESPONDENCE</span>
					<h2>Letters from A. Wetherby</h2>
				</div>
				<span className="paper-number">
					7 ENVELOPES <ArrowDownRight size={14} />
				</span>
			</div>
			<div className="letter-intro">
				<Mail size={17} />
				<p>
					Seven letters were found together, though they were not filed in the
					order they were written. Each bears a pencilled figure at the left.
				</p>
			</div>
			<div className="letters-grid">
				{letters.map((letter, index) => (
					<button
						className="letter-card"
						type="button"
						key={letter.date}
						onClick={() => setSelectedLetterIndex(index)}
						aria-label={`Read letter to ${letter.recipient}, ${letter.date}`}
					>
						<span className="margin-number">{letter.position}</span>
						<span className="letter-postmark">
							<span>POSTMARK</span>
							<time>{letter.date}</time>
						</span>
						<span className="letter-to">Dear {letter.recipient},</span>
						<span className="letter-excerpt">{letter.excerpt}</span>
						<span className="letter-signoff">Yours, A.W.</span>
					</button>
				))}
			</div>
			{selectedLetter && (
				<div
					className="item-modal-backdrop"
					onClick={(event) => {
						if (event.target === event.currentTarget)
							setSelectedLetterIndex(null);
					}}
				>
					<section
						className="item-modal letter-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="letter-modal-title"
						aria-describedby="letter-modal-body"
						autoFocus
						tabIndex={-1}
						onKeyDown={(event) => {
							if (event.key === 'Escape') setSelectedLetterIndex(null);
						}}
					>
						<button
							className="item-modal-close"
							type="button"
							aria-label="Close letter"
							onClick={() => setSelectedLetterIndex(null)}
						>
							<X size={18} />
						</button>
						<div className="item-modal-copy letter-modal-copy">
							<span className="eyebrow">
								PRIVATE CORRESPONDENCE · {selectedLetter.date}
							</span>
							<h3 id="letter-modal-title">
								Letter to {selectedLetter.recipient}
							</h3>
							<p className="letter-modal-salutation">
								Dear {selectedLetter.recipient},
							</p>
							<div id="letter-modal-body">
								{selectedLetter.body.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
								<p className="letter-modal-signoff">Yours, A.W.</p>
							</div>
							<div className="item-modal-navigation">
								<button
									className="modal-navigation-button"
									type="button"
									aria-label="Previous letter"
									disabled={selectedLetterIndex === 0}
									onClick={() =>
										setSelectedLetterIndex(selectedLetterIndex - 1)
									}
								>
									<ArrowLeft size={14} />
									<span>PREVIOUS</span>
								</button>
								<span className="modal-navigation-count">
									{String(selectedLetterIndex + 1).padStart(2, '0')} /{' '}
									{String(letters.length).padStart(2, '0')}
								</span>
								<button
									className="modal-navigation-button"
									type="button"
									aria-label="Next letter"
									disabled={selectedLetterIndex === letters.length - 1}
									onClick={() =>
										setSelectedLetterIndex(selectedLetterIndex + 1)
									}
								>
									<span>NEXT</span>
									<ArrowRight size={14} />
								</button>
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
