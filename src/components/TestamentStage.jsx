import { ArrowLeft, Check } from 'lucide-react';

export default function TestamentStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT VI · SEALED TESTAMENT</span>
					<h2>The final instruction</h2>
				</div>
				<span className="paper-number">
					OPENED <Check size={14} />
				</span>
			</div>
			<div className="testament-wrap">
				<div className="testament-paper">
					<span className="testament-rule">
						LAST WILL AND TESTAMENT · EXTRACT
					</span>
					<div className="testament-seal">A.W.</div>
					<p>A gentleman never forgets where he came from.</p>
					<p>
						The southern line precedes the eastern. Neither the degrees nor the
						direction shall be altered.
					</p>
					<p>My final resting treasure lies where these figures point.</p>
					<span className="testament-sign">Ambrose Wetherby</span>
				</div>
				<div className="coordinate-result">
					<span className="eyebrow">THE FIGURES, ASSEMBLED</span>
					<div className="coordinate-line">
						<span>S</span>
						<strong>27° 31.246</strong>
					</div>
					<div className="coordinate-line">
						<span>E</span>
						<strong>153° 04.583</strong>
					</div>
					<div className="fiction-notice">
						<span className="notice-mark">!</span>
						<p>
							<b>Illustrative coordinates only.</b>
							<br />
							This is a fictional puzzle solution, not a proposed cache
							location.
						</p>
					</div>
				</div>
			</div>
			<div className="completion-note">
				<span>
					<Check size={17} />
				</span>
				<p>
					<b>The papers are in order.</b>
					<br />
					You have followed Wetherby’s trail from the inventory to the final
					figures.
				</p>
			</div>
			<div className="instruction-strip">
				<ArrowLeft size={15} />
				<span>
					All six documents remain available in the case file if you wish to
					retrace the clues.
				</span>
			</div>
		</>
	);
}
