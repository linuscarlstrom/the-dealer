import useSWR, { KeyedMutator } from 'swr'
import { DrawHandsResponse } from '#/types'

import fetcher from '../utils/fetcher'

export function useGame(): {
	data: Partial<DrawHandsResponse>
	loading: boolean
	refreshing: boolean
	newGame: KeyedMutator<DrawHandsResponse>
} {
	const { data, isLoading, isValidating, mutate } = useSWR<DrawHandsResponse, Error>('/api/draw-hands', fetcher, {
		revalidateOnFocus: false
	})

	return { data: data || {}, loading: isLoading || !data, refreshing: isValidating, newGame: mutate }
}
