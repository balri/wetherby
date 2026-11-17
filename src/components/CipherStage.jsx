import { ArrowDownRight } from 'lucide-react';

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
				<h2>A Curious Discovery</h2>
				<p>
					Whilst examining the belongings of the late Ambrose Wetherby, we came
					across a rather curious entry in one of his notebooks.{' '}
				</p>
				<p>
					Amongst the usual assortment of observations, calculations and
					seemingly unimportant scribblings was the following string of letters:
				</p>
				<div className="ciphered-text" aria-label="Ciphertext">
					MWZWRRPWQY
				</div>
				<p>
					There was no explanation, no accompanying note and no indication of
					what it might mean.
				</p>
				<p>
					We've tried reading it forwards, backwards and in every other way we
					can think of, but so far we've drawn a blank.
				</p>
				<p>
					Perhaps it is a name, a place, or some sort of coded instruction.
					Knowing Wetherby's fondness for puzzles, it seems unlikely to be
					random.
				</p>
				<p>
					There may be something else in his notebook that we've overlooked.
				</p>
				<div className="cipher-footer">
					<span>
						One key, many turns. The same letter may wear a different disguise
						each time.
					</span>
					<span>A.W.</span>
				</div>
			</div>
		</>
	);
}
