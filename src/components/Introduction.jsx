import { ArrowRight } from 'lucide-react';
import ambroseWetherbyImage from '../assets/ambrose_wetherby.jpg';

export default function Introduction({ onStart }) {
	return (
		<main
			id="top"
			className="introduction-page"
			aria-labelledby="introduction-title"
		>
			<div className="introduction-story">
				<figure className="introduction-portrait">
					<img
						src={ambroseWetherbyImage}
						alt="Ambrose Wetherby's portrait beside a sealed envelope and handwritten note"
					/>
					<figcaption>AMBROSE WETHERBY · PRIVATE PAPERS</figcaption>
				</figure>
				<div className="introduction-narrative">
					<span className="eyebrow">THE WETHERBY PAPERS · CASE 04</span>
					<h1 id="introduction-title">The story of Ambrose Wetherby</h1>
					<div className="introduction-copy">
						<p>
							Mr Ambrose Wetherby was a collector of unusual objects, a keen
							traveller and, according to his neighbours, a rather peculiar
							gentleman.
						</p>
						<p>
							When he died, his solicitor discovered that Wetherby had left no
							conventional instructions concerning his most prized possession.
						</p>
						<p>
							Instead, he left a sealed envelope containing six documents and a
							handwritten note:
						</p>
						<blockquote>
							“I have spent a lifetime collecting things that others overlook.
							My final possession shall go to the person who can see what I have
							seen. Do not be fooled by the obvious. The order matters, the
							words matter, and the numbers matter most of all.”
						</blockquote>
						<p>
							The solicitor has made the documents available to anyone willing
							to undertake the investigation.
						</p>
					</div>
					<button
						className="introduction-start"
						type="button"
						onClick={onStart}
					>
						Begin the investigation <ArrowRight size={16} />
					</button>
				</div>
			</div>
		</main>
	);
}
