import { ArrowDownRight, Sparkles } from 'lucide-react';

export default function CipherStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT III · DRAWER SLIP</span>
					<h2>A note in cipher</h2>
				</div>
				<span className="paper-number">
					LOOSE INSERT <ArrowDownRight size={14} />
				</span>
			</div>
			<div className="cipher-artifact">
				<div className="artifact-topline">
					<span>FOUND INSIDE THE JOURNAL COVER</span>
					<span>UNDATED</span>
				</div>
				<div className="ciphered-text" aria-label="Ciphertext">
					KPMMLYLUJL
				</div>
				<p>
					“JOURNAL is the key you have just found. Count its letters. I moved
					every letter on this slip that many places forward through the
					alphabet; move each one back by the same number. After Z, begin again
					at A.”
				</p>
				<div className="cipher-footer">
					<span>ALPHABETIC SHIFT · REVERSE THE MOTION</span>
					<span>A.W.</span>
				</div>
			</div>
			<div className="instruction-strip">
				<Sparkles size={15} />
				<span>
					The decoded word names the operation to use on the journal’s paired
					readings.
				</span>
			</div>
		</>
	);
}
