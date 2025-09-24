"use client"

import Link from 'next/link'
import React from 'react'


export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 sm:py-24 lg:py-32 bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-vector/digital-technology-background-with-hexagon-frame-white-tone_53876-117507.jpg?t=st=1744432931~exp=1744436531~hmac=114e9bc2ec9f9d84ae0be428d5754a03a17d9da63c2a8a956f787dca0df3415d&w=1380')]">
            {/*bg-gradient-to-r from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 */}
            <Link
                href={'dashboard/partner'}
                className="border border-gray-300 rounded-lg py-2 px-4 text-gray-600 text-sm mb-5 transition duration-300 ease-in-out hover:text-gray-800"
            >
                Forget about spending hundreds $
            </Link>

            <h1 className="mx-auto max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800">
                Bring transparency to material trade{" "}
                <span className="relative whitespace-nowrap text-blue-500">
                    <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-500" preserveAspectRatio="none">
                        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
                    </svg>
                    <span className="relative">with AI</span>
                </span>
            </h1>

            <h2 className="mx-auto mt-6 sm:mt-10 max-w-xl text-base sm:text-lg text-gray-600 leading-relaxed">
                Marketplace for businesses to buy & sell reused materials with verifiable provenance, automated payments, and real environmental impact tracking.      </h2>

            <div className='mt-8'>
                <Link href="/dashboard/partner" className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay text-sm px-3 py-[0.1875rem] ring-1 bg-blue-600 text-white ring-blue-600" target="" data-sentry-element="Component" data-sentry-component="LinkButton" data-sentry-source-file="Button.tsx">Start Exploring for free</Link>
            </div>

        </div>

    )
}
