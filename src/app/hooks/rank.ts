import useSWR from 'swr'
import { useState } from 'react'
import { RankHandsResponse } from '#/types'

import fetcher from '../utils/fetcher'

export function useRank(): {
	rankings: Partial<RankHandsResponse>
	rankHands: (hands: string[][]) => void
	clearRankings: () => void
	loading: boolean
} {
	const [shouldFetch, setShouldFetch] = useState<boolean>(false)
	const [hands, setHands] = useState<string[][]>()

	const rankHands = (hands: string[][]) => {
		setHands(hands)
		setShouldFetch(true)
	}

	const clearRankings = () => {
		setShouldFetch(false)
	}

	const { data, isLoading } = useSWR<RankHandsResponse, Error>(
		shouldFetch ? `/api/rank-hands?handOne=${hands?.[0].join(',')}&handTwo=${hands?.[1].join(',')}` : null,
		fetcher,
		{ revalidateOnFocus: false }
	)

	return { rankings: data || {}, rankHands, clearRankings, loading: isLoading }
}
