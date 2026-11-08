import { useState } from 'react';
import { ArrowDownRight, X } from 'lucide-react';
import ivoryChessKnightImage from '../assets/inventory/01_ivory_chess_knight.jpg';
import magnifyingGlassImage from '../assets/inventory/02_magnifying_glass.jpg';
import brassTelescopeImage from '../assets/inventory/03_brass_telescope.jpg';
import antiqueMapImage from '../assets/inventory/04_antique_map.jpg';
import greenGlassBottleImage from '../assets/inventory/05_green_glass_bottle.jpg';
import rustedSextantImage from '../assets/inventory/06_rusted_sextant.jpg';
import silverThimbleImage from '../assets/inventory/07_silver_thimble.jpg';
import nauticalTelescopeImage from '../assets/inventory/08_nautical_telescope.jpg';
import porcelainDogImage from '../assets/inventory/09_porcelain_dog.jpg';
import ivoryCompassImage from '../assets/inventory/10_ivory_compass.jpg';

const inventory = [
	{
		year: 1889,
		item: 'Ivory chess knight',
		note: 'A gift from the Hargreaves estate',
		description:
			'A carved chess piece in the shape of a horse, made for a Victorian-era chess set.',
		image: ivoryChessKnightImage,
	},
	{
		year: 1872,
		item: 'Magnifying glass',
		note: 'Found in a railway bookstall',
		description:
			'A hand-held lens for close inspection, mounted in a simple dark frame.',
		image: magnifyingGlassImage,
	},
	{
		year: 1897,
		item: 'Brass telescope',
		note: 'A duplicate; sold in 1901',
		description:
			'A compact brass refracting telescope, the sort once carried by sailors and travelers.',
		image: brassTelescopeImage,
	},
	{
		year: 1876,
		item: 'Antique map',
		note: 'Purchased after the northern crossing',
		description:
			'A weathered chart of coastlines and routes, folded for use on long journeys.',
		image: antiqueMapImage,
	},
	{
		year: 1884,
		item: 'Green glass bottle',
		note: 'Washed ashore at Whitby',
		description:
			'A heavy green glass bottle shaped to withstand rough handling at sea.',
		image: greenGlassBottleImage,
	},
	{
		year: 1880,
		item: 'Rusted sextant',
		note: 'The instrument still holds its mark',
		description:
			'A navigational instrument used to measure the angle between a celestial body and the horizon.',
		image: rustedSextantImage,
	},
	{
		year: 1881,
		item: 'Silver thimble',
		note: 'A neighbour left it by mistake',
		description:
			'A small protective cap worn on the finger while sewing, here made from silver.',
		image: silverThimbleImage,
	},
	{
		year: 1892,
		item: 'Nautical telescope',
		note: 'The last thing I bought abroad',
		description:
			'A long brass spyglass used to bring distant ships and coastlines into view.',
		image: nauticalTelescopeImage,
	},
	{
		year: 1885,
		item: 'Porcelain dog',
		note: 'Never belonged to my collection',
		description:
			'A small glazed dog figurine, modeled as a decorative mantelpiece ornament.',
		image: porcelainDogImage,
	},
	{
		year: 1888,
		item: 'Ivory compass',
		note: 'Needle points true, case does not',
		description:
			'A pocket compass pairs a magnetized needle with a marked dial to indicate direction.',
		image: ivoryCompassImage,
	},
];

export default function InventoryStage() {
	const [selectedItem, setSelectedItem] = useState(null);

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
						“Some years have a little more to offer than others. Those are the
						years I remember most fondly.”
					</p>
				</div>
				<div className="inventory-list">
					{inventory.map((entry, index) => (
						<button
							className="inventory-entry"
							type="button"
							key={entry.item}
							onClick={() => setSelectedItem(entry)}
						>
							<span className="entry-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className="entry-item">
								{entry.item}
								<small>{entry.note}</small>
							</span>
							<span className="entry-year">{entry.year}</span>
						</button>
					))}
				</div>
				<div className="artifact-footer">
					<span>CATALOGUED BY A. WETHERBY</span>
				</div>
			</div>
			{selectedItem && (
				<div
					className="item-modal-backdrop"
					onClick={(event) => {
						if (event.target === event.currentTarget) setSelectedItem(null);
					}}
				>
					<section
						className="item-modal"
						role="dialog"
						aria-modal="true"
						aria-labelledby="item-modal-title"
						aria-describedby="item-modal-description"
						autoFocus
						tabIndex={-1}
						onKeyDown={(event) => {
							if (event.key === 'Escape') setSelectedItem(null);
						}}
					>
						<button
							className="item-modal-close"
							type="button"
							aria-label="Close item details"
							onClick={() => setSelectedItem(null)}
						>
							<X size={18} />
						</button>
						<img
							className="item-modal-image"
							src={selectedItem.image}
							alt={selectedItem.item}
						/>
						<div className="item-modal-copy">
							<span className="eyebrow">
								OBJECT RECORD · {selectedItem.year}
							</span>
							<h3 id="item-modal-title">{selectedItem.item}</h3>
							<p className="item-modal-note">{selectedItem.note}</p>
							<p id="item-modal-description">{selectedItem.description}</p>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
