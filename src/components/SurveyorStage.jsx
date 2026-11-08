import { ArrowDownRight, Check, Compass } from 'lucide-react';

export default function SurveyorStage() {
	return (
		<>
			<div className="stage-title-row">
				<div>
					<span className="eyebrow">DOCUMENT V · SURVEYOR’S REGISTER</span>
					<h2>The seal calculation</h2>
				</div>
				<span className="paper-number">
					TWO LINES <ArrowDownRight size={14} />
				</span>
			</div>
			<div className="survey-note">
				<Compass size={17} />
				<p>
					Before accepting the figures, the surveyor checked his sums. Add the
					digits on each line separately, then multiply the two totals. The
					product is the seal number.
				</p>
			</div>
			<div className="survey-register">
				<div className="artifact-topline">
					<span>TRANSCRIBED FROM THE JOURNAL</span>
					<span>CHECK BEFORE SIGNING</span>
				</div>
				<div className="survey-line">
					<span className="journal-side side-s">S</span>
					<span>
						3 <i>1</i> <i>2</i> <i>4</i> <i>6</i>
					</span>
					<small>SOUTHERN LINE</small>
				</div>
				<div className="survey-line">
					<span className="journal-side side-e">E</span>
					<span>
						0 <i>4</i> <i>5</i> <i>8</i> <i>3</i>
					</span>
					<small>EASTERN LINE</small>
				</div>
				<div className="survey-instruction">
					(sum of S digits) × (sum of E digits) = ?
				</div>
			</div>
			<div className="instruction-strip">
				<Check size={15} />
				<span>
					This independent check confirms the journal’s two five-digit strings
					before the will is opened.
				</span>
			</div>
		</>
	);
}
