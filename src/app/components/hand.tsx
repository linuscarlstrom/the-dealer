import Card from './card'

type HandProps = {
	cardStrings: string[]
	highlight: string[]
}

export default function Hand({ cardStrings, highlight = [] }: HandProps) {
	return (
		<div className="hand">
			{cardStrings.map(cardString => (
				<Card
					key={cardString}
					cardString={cardString}
					className={highlight.includes(cardString) ? 'highlight' : null}
				/>
			))}
		</div>
	)
}
