type CardProps = {
	cardString: string
	className?: string | null
}

export default function Card({ cardString, className }: CardProps) {
	let [value, suite] = cardString

	// Transform T to 10
	if (value === 'T') value = '10'

	return (
		<div className={`card ${suite} ${className ?? ''}`}>
			<div className="value-area">
				<p className="value">{value}</p>
				<p className="suite">{suite}</p>
			</div>
			<div className="suite-area">
				<p>{suite}</p>
			</div>
		</div>
	)
}
