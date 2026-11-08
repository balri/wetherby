import { ArrowDownRight, Mail } from 'lucide-react';

const letters = [
	{
		date: '08 JUL 1894',
		recipient: 'Alice',
		position: 2,
		excerpt:
			'The river at dusk was the colour of old pewter. I watched it from the bridge until the lamps came on.',
	},
	{
		date: '02 MAY 1894',
		recipient: 'Lucy',
		position: 2,
		excerpt:
			'A parcel arrived with no return address. It contained three buttons and a very stern note.',
	},
	{
		date: '03 APR 1894',
		recipient: 'Julia',
		position: 1,
		excerpt:
			'The new lens is excellent, though it makes the housekeeper appear even more suspicious than usual.',
	},
	{
		date: '20 JUN 1894',
		recipient: 'Caleb',
		position: 2,
		excerpt:
			'I have taken to walking before breakfast. The gulls are less conversational than the neighbours.',
	},
	{
		date: '15 MAY 1894',
		recipient: 'Bernard',
		position: 3,
		excerpt:
			'Your account of the auction was diverting. I should have bid on the little brass box after all.',
	},
	{
		date: '05 JUN 1894',
		recipient: 'Anne',
		position: 2,
		excerpt:
			'Please return the blue volume when convenient. Its spine is cracked, but the endpapers are sound.',
	},
	{
		date: '17 APR 1894',
		recipient: 'Robert',
		position: 2,
		excerpt:
			'The map you sent is upside down, unless the world has lately changed its habits.',
	},
];

export default function LettersStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT II · PRIVATE CORRESPONDENCE</span>
					<h2>Letters to the solicitor</h2>
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
				{letters.map((letter) => (
					<article className="letter-card" key={letter.date}>
						<span className="margin-number">{letter.position}</span>
						<div className="letter-postmark">
							<span>POSTMARK</span>
							<time>{letter.date}</time>
						</div>
						<p className="letter-to">Dear {letter.recipient},</p>
						<p className="letter-excerpt">{letter.excerpt}</p>
						<span className="letter-signoff">Yours, A.W.</span>
					</article>
				))}
			</div>
			<div className="artifact-clue">
				<span className="clue-rule" />
				<p>
					“The postmark keeps their order. The figure in the margin tells which
					letter to take from the name after <em>Dear</em>.”
				</p>
				<span className="clue-sign">A.W.</span>
			</div>
			<div className="instruction-strip">
				<ArrowDownRight size={15} />
				<span>
					Read chronologically. Count letters in the first name, starting at
					one.
				</span>
			</div>
		</>
	);
}
