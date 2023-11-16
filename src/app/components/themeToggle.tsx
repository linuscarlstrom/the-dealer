'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'system' | 'dark'>('system')

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	return (
		<div className="theme-toggle">
			<div
				className={`toggle-option ${theme === 'light' ? 'active' : ''}`}
				onClick={() => {
					setTheme('light')
				}}>
				<Image src="/sun.svg" alt="Toggle light" height={16} width={16} priority />
			</div>
			<div
				className={`toggle-option ${theme === 'system' ? 'active' : ''}`}
				onClick={() => {
					setTheme('system')
				}}>
				<Image src="/monitor.svg" alt="Toggle system" height={16} width={16} priority />
			</div>
			<div
				className={`toggle-option ${theme === 'dark' ? 'active' : ''}`}
				onClick={() => {
					setTheme('dark')
				}}>
				<Image src="/moon.svg" alt="Toggle dark" height={16} width={16} priority />
			</div>
		</div>
	)
}
