import { ArrowDownRight, Sparkles } from 'lucide-react';

const inventory = [
	{
		year: 1889,
		item: 'Ivory chess knight',
		note: 'A gift from the Hargreaves estate',
	},
	{
		year: 1872,
		item: 'Magnifying glass',
		note: 'Found in a railway bookstall',
	},
	{ year: 1897, item: 'Brass telescope', note: 'A duplicate; sold in 1901' },
	{
		year: 1876,
		item: 'Antique map',
		note: 'Purchased after the northern crossing',
	},
	{ year: 1884, item: 'Green glass bottle', note: 'Washed ashore at Whitby' },
	{
		year: 1880,
		item: 'Rusted sextant',
		note: 'The instrument still holds its mark',
	},
	{
		year: 1881,
		item: 'Silver thimble',
		note: 'A neighbour left it by mistake',
	},
	{
		year: 1892,
		item: 'Nautical telescope',
		note: 'The last thing I bought abroad',
	},
	{
		year: 1885,
		item: 'Porcelain dog',
		note: 'Never belonged to my collection',
	},
	{
		year: 1888,
		item: 'Ivory compass',
		note: 'Needle points true, case does not',
	},
];

export default function InventoryStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT I · ESTATE PAPERS</span>
					<h2>The collector’s inventory</h2>
				</div>
				<span className="paper-number">
					FOLIO 01 <ArrowDownRight size={14} />
				</span>
			</div>
			<div className="artifact inventory-artifact">
				<div className="artifact-topline">
					<span>WETHERBY HOUSE · OBJECT REGISTER</span>
					<span>REVISED 1898</span>
				</div>
				<div className="inventory-note">
					<span className="ink-mark">A.W.</span>
					<p>
						“I trust the years in which February borrowed a day. The others are
						only clutter. Arrange what remains by the year it entered my
						collection.”
					</p>
				</div>
				<div
					className="inventory-list"
					role="list"
					aria-label="Estate inventory"
				>
					{inventory.map((entry, index) => (
						<div className="inventory-entry" role="listitem" key={entry.item}>
							<span className="entry-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className="entry-item">
								{entry.item}
								<small>{entry.note}</small>
							</span>
							<span className="entry-year">{entry.year}</span>
							<span className="entry-tick" aria-hidden="true">
								{index % 3 === 1 ? '·' : ''}
							</span>
						</div>
					))}
				</div>
				<div className="artifact-footer">
					<span>CATALOGUED BY A. WETHERBY</span>
					<span>THE FIRST ENTRY IS NOT THE FIRST CLUE</span>
				</div>
			</div>
			<div className="instruction-strip">
				<Sparkles size={15} />
				<span>
					Keep the qualifying acquisitions, then read the first letter of each
					object.
				</span>
			</div>
		</>
	);
}
