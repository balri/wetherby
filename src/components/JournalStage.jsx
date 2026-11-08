import { ArrowDownRight, BookOpen, Compass } from 'lucide-react';

const journal = [
	{
		side: 'S',
		date: '12 March',
		first: 8,
		second: 5,
		note: 'At the south stair, the old brass measure disagreed with the new one.',
	},
	{
		side: 'S',
		date: '18 March',
		first: 7,
		second: 6,
		note: 'A short walk to the lower gate; rain made the stones shine.',
	},
	{
		side: 'S',
		date: '2 April',
		first: 9,
		second: 7,
		note: 'The path bends where the rowan tree was cut down.',
	},
	{
		side: 'S',
		date: '9 April',
		first: 11,
		second: 7,
		note: 'Measured again before breakfast. The house clock is still fast.',
	},
	{
		side: 'S',
		date: '21 April',
		first: 10,
		second: 4,
		note: 'I do not trust the painted marker, but the distance is plain.',
	},
	{
		side: 'E',
		date: '3 May',
		first: 5,
		second: 5,
		note: 'A calm morning; the two readings met exactly.',
	},
	{
		side: 'E',
		date: '11 May',
		first: 9,
		second: 5,
		note: 'The east walk is longer than it looks from the window.',
	},
	{
		side: 'E',
		date: '24 May',
		first: 12,
		second: 7,
		note: 'The gate was locked, so I took the gravel path instead.',
	},
	{
		side: 'E',
		date: '1 June',
		first: 13,
		second: 5,
		note: 'A clear day. I heard a train but saw no smoke.',
	},
	{
		side: 'E',
		date: '14 June',
		first: 7,
		second: 4,
		note: 'Last reading before I put the instruments away.',
	},
];

export default function JournalStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT IV · POCKET JOURNAL</span>
					<h2>Readings from the walks</h2>
				</div>
				<span className="paper-number">
					10 ENTRIES <ArrowDownRight size={14} />
				</span>
			</div>
			<div className="journal-note">
				<BookOpen size={17} />
				<p>
					“I have always preferred the distance between two things to either
					thing itself. Take the operation named by the slip. In the margin,{' '}
					<b>S</b> marks the southern line and <b>E</b> the eastern. Keep each
					line in the order recorded.”
				</p>
			</div>
			<div className="journal-sheet">
				<div className="journal-columns">
					<span>ENTRY / DATE</span>
					<span>FIELD NOTE</span>
					<span>PAIRED READINGS</span>
				</div>
				{journal.map((entry, index) => (
					<div className="journal-entry" key={`${entry.side}-${entry.date}`}>
						<span className={`journal-side side-${entry.side.toLowerCase()}`}>
							{entry.side}
						</span>
						<span className="journal-date">
							<b>{String(index + 1).padStart(2, '0')}</b>
							{entry.date}
						</span>
						<span className="journal-text">{entry.note}</span>
						<span className="journal-values">
							<i>{entry.first}</i>
							<span>—</span>
							<i>{entry.second}</i>
						</span>
					</div>
				))}
				<div className="journal-bottom">
					<span>“THE DIFFERENCE IS THE THING.”</span>
					<span>— A.W.</span>
				</div>
			</div>
			<div className="instruction-strip">
				<Compass size={15} />
				<span>
					Subtract the smaller reading from the larger. Join each line’s five
					results in recorded order: S first, then E.
				</span>
			</div>
		</>
	);
}
