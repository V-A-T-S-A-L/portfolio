"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { HomeIcon, MapPin, Brain, Briefcase, FolderKanban, Mail, CodeXml, ExternalLink } from "lucide-react"


export default function Home() {
	const [isDark, setIsDark] = useState(true)
	const [activeSection, setActiveSection] = useState("")
	const sectionsRef = useRef<HTMLElement[]>([])

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark)
	}, [isDark])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.remove("opacity-0")
						entry.target.classList.add("fade-in-up")
						setActiveSection(entry.target.id)
					}
				})
			},
			{ threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
		)

		sectionsRef.current.forEach((section) => {
			if (section) observer.observe(section)
		})

		return () => observer.disconnect()
	}, [])

	const addSectionRef = (el: HTMLElement | null) => {
		if (el && !sectionsRef.current.includes(el)) {
			sectionsRef.current.push(el)
		}
	}

	const toggleTheme = () => setIsDark(!isDark)

	return (
		<div className="min-h-screen bg-background text-foreground relative">
			<nav className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex">
				<div className="
				flex flex-col gap-2 p-2
				backdrop-blur-md bg-background/60
				border border-border/50
				rounded-2xl shadow-2xl
			">
					{[
						{ id: "intro", label: "Intro", icon: <HomeIcon size={16} /> },
						{ id: "skills", label: "Skills", icon: <CodeXml size={16} /> },
						{ id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
						{ id: "projects", label: "Projects", icon: <FolderKanban size={16} /> },
						{ id: "contact", label: "Contact", icon: <Mail size={16} /> }
					].map((item) => (
						<div key={item.id} className="relative">
							<button
								onClick={() =>
									document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
								}
								className={`
									group relative flex items-center justify-center
									w-10 h-10 rounded-xl
									transition-all duration-300 cursor-pointer
									${activeSection === item.id
										? "bg-foreground text-background shadow-lg scale-110"
										: "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"}
								`}
							>

								<span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
									{item.icon}
								</span>

								{activeSection === item.id && (
									<span className="absolute inset-0 rounded-xl bg-foreground/20 animate-pulse" />
								)}
							</button>
						</div>
					))}
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
				{/* INTRO */}
				<header id="intro" ref={addSectionRef} className="min-h-screen flex items-center opacity-0">
					<div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
						<div className="lg:col-span-3 space-y-6 sm:space-y-8">
							<div className="space-y-3 sm:space-y-2">
								<div className="flex items-center">
									<button onClick={toggleTheme} className="cursor-pointer group p-2 mr-5 rounded-sm border border-border hover:border-muted-foreground/50 transition-all duration-300" aria-label="Toggle theme">
										{isDark ? (
											<svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
											</svg>
										) : (
											<svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
												<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
											</svg>
										)}
									</button>
									<div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2026</div>
								</div>
								<h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
									Vatsal
									<br />
									<span className="text-muted-foreground">Shah</span>
								</h1>
							</div>

							<div className="space-y-6 max-w-md">
								<p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
									Aspiring Software Engineer crafting digital experiences at the intersection of
									<span className="text-foreground"> innovation</span>, <span className="text-foreground">technology</span>, and <span className="text-foreground">user experience</span>.
								</p>

								<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
										Open to SDE / Internship roles
									</div>
									<div className="flex items-center">
										<MapPin className="mr-1 w-4 h-4" />
										<div>India</div>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
							<div className="space-y-4">
								<div className="text-sm text-muted-foreground font-mono">CONTACT</div>
								<div className="space-y-2">
									<div className="text-foreground">vatsalshah004@gmail.com</div>
									<div className="text-xs text-muted-foreground">Mumbai, India</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="text-sm text-muted-foreground font-mono">EDUCATION</div>
								<div className="space-y-2">
									<div className="text-foreground">Fr. Conceicao Rodrigues College of Engineering</div>
									<div className="text-muted-foreground">B.E - Artificial Intelligence & Data Science (2022 - 2026)</div>
									<div className="text-xs text-muted-foreground">CGPA: 8.14</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* SKILLS */}
				<section id="skills" ref={addSectionRef} className="py-24 sm:py-32 opacity-0 scroll-mt-24">
					<div className="space-y-12 sm:space-y-16">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
							<h2 className="text-3xl sm:text-4xl font-light">Skills</h2>
							<div className="text-sm text-muted-foreground font-mono">Technical & Tools</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<div className="space-y-6">
								<h3 className="text-lg font-medium">Programming</h3>
								<div className="flex flex-wrap gap-2">
									{["Java", "C", "JavaScript", "PHP", "Python", "HTML", "CSS"].map((s) => (
										<span key={s} className="px-3 py-1 text-xs border border-border rounded-full">
											{s}
										</span>
									))}
								</div>
							</div>

							<div className="space-y-6">
								<h3 className="text-lg font-medium">Frameworks & Platforms</h3>
								<div className="flex flex-wrap gap-2">
									{["React", "Node", "Express", "Next.js", "Spring Boot", "Tailwind"].map((s) => (
										<span key={s} className="px-3 py-1 text-xs border border-border rounded-full">
											{s}
										</span>
									))}
								</div>
							</div>

							<div className="space-y-6">
								<h3 className="text-lg font-medium">Databases</h3>
								<div className="flex flex-wrap gap-2">
									{["MySQL", "PostgreSQL", "MongoDB"].map((s) => (
										<span key={s} className="px-3 py-1 text-xs border border-border rounded-full">
											{s}
										</span>
									))}
								</div>
							</div>

							<div className="space-y-6">
								<h3 className="text-lg font-medium">Tools & CS Fundamentals</h3>
								<div className="flex flex-wrap gap-2">
									{["Git", "GitHub", "XAMPP", "AWS", "VS Code", "DS & Algorithms", "OOP", "DBMS"].map((s) => (
										<span key={s} className="px-3 py-1 text-xs border border-border rounded-full">
											{s}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* EXPERIENCE */}
				<section id="experience" ref={addSectionRef} className="py-24 sm:py-32 opacity-0 scroll-mt-24">
					<div className="space-y-12 sm:space-y-16">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
							<h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
							<div className="text-sm text-muted-foreground font-mono">Selected roles</div>
						</div>

						<div className="space-y-8">
							<div className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50">
								<div className="lg:col-span-2">
									<div className="text-xl sm:text-2xl font-light text-muted-foreground">June - Jul 2024</div>
								</div>

								<div className="lg:col-span-6 space-y-3">
									<div>
										<h3 className="text-lg sm:text-xl font-medium">Backend Developer Intern</h3>
										<div className="text-muted-foreground">Navlakhi - Mumbai, India</div>
									</div>
									<p className="text-muted-foreground leading-relaxed max-w-lg">
										Collaborated with a team of 6 on the core project following agile practices. Developed backend & server-side logic in PHP and JavaScript,
										worked on MySQL database queries, and optimized APIs to reduce response times.
									</p>
								</div>

								<div className="lg:col-span-4 flex max-h-max flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
									<span className="px-2 py-1 text-xs text-muted-foreground rounded border hover:border-muted-foreground/50">PHP</span>
									<span className="px-2 py-1 text-xs text-muted-foreground rounded border hover:border-muted-foreground/50">JavaScript</span>
									<span className="px-2 py-1 text-xs text-muted-foreground rounded border hover:border-muted-foreground/50">MySQL</span>
									<span className="px-2 py-1 text-xs text-muted-foreground rounded border hover:border-muted-foreground/50">APIs</span>
								</div>
							</div>

							{/* Note: Resume lists internships/education; additional past roles are not in the resume so not included */}
						</div>
					</div>
				</section>

				{/* PROJECTS (replaces Thoughts) */}
				<section id="projects" ref={addSectionRef} className="py-24 sm:py-32 opacity-0 scroll-mt-24">
					<div className="space-y-12 sm:space-y-16">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
							<h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
							<div className="text-sm text-muted-foreground font-mono">Highlighted work</div>
						</div>

						<div className="grid gap-6 sm:gap-8">
							{/* Code Busters */}
							<article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
								<div className="space-y-4">
									<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
										<span>React • Node • Express • MySQL • Judge0</span>
									</div>

									<h3 className="text-lg sm:text-xl font-medium">Code Busters</h3>

									<p className="text-muted-foreground leading-relaxed">
										Web-based competitive coding platform with custom rooms and localized leaderboards. Integrated the Judge0 API for code execution and
										custom test-case validation with automated scoreboard updates.
									</p>

									<div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
										<a href="https://github.com/V-A-T-S-A-L/coding-platform" target="_blank" rel="noreferrer" className="underline">
											View repo
										</a>
										<ExternalLink className="w-4 h-4 cursor-pointer" />
									</div>
								</div>
							</article>

							{/* CardGenX */}
							<article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
								<div className="space-y-4">
									<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
										<span>Next.js • Supabase • Gemini</span>
									</div>

									<h3 className="text-lg sm:text-xl font-medium">CardGenX</h3>

									<p className="text-muted-foreground leading-relaxed">
										AI-powered tool to auto-generate flashcards and summaries from PDFs with markdown notes, custom export, and smart filtering.
										Implemented page-linked content to jump to exact PDF pages from flashcards for quick context.
									</p>

									<div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
										<a href="https://github.com/V-A-T-S-A-L/AI-Learning-Platform" target="_blank" rel="noreferrer" className="underline">
											View repo
										</a>
										<ExternalLink className="w-4 h-4 cursor-pointer" />
									</div>
								</div>
							</article>

							{/* Veracity */}
							<article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
								<div className="space-y-4">
									<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
										<span>React • Django • Firebase • CNN</span>
									</div>

									<h3 className="text-lg sm:text-xl font-medium">Veracity</h3>

									<p className="text-muted-foreground leading-relaxed">
										Deepfake detection system - used CNNs for facial classification after face extraction. Packaged the model behind an API with key-based access,
										exposing `/detect` and `/health` endpoints for easy integration.
									</p>

									<div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
										<a href="https://github.com/V-A-T-S-A-L/deepfake" target="_blank" rel="noreferrer" className="underline">
											View repo
										</a>
										<ExternalLink className="w-4 h-4 cursor-pointer" />
									</div>
								</div>
							</article>

							{/* Resolve (ongoing) */}
							<article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg">
								<div className="space-y-4">
									<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
										<span>React • Spring Boot • MySQL</span>
									</div>

									<h3 className="text-lg sm:text-xl font-medium">Resolve (Ongoing)</h3>

									<p className="text-muted-foreground leading-relaxed">
										Built backend services for authentication, project management, member handling, and join requests with Spring Boot, MySQL, and Spring Data JPA.
										Integrated APIs with a React frontend to enable project collaboration; planned extensions include activity logs and real-time notifications.
									</p>

									<div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
										<a href="https://github.com/V-A-T-S-A-L/Resolve" target="_blank" rel="noreferrer" className="underline">
											View repo
										</a>
										<ExternalLink className="w-4 h-4 cursor-pointer" />
									</div>
								</div>
							</article>
						</div>
					</div>
				</section>

				{/* CONTACT */}
				<section id="contact" ref={addSectionRef} className="py-24 sm:py-32 opacity-0 scroll-mt-24">
					<div className="">
						<div className="space-y-6 sm:space-y-8">
							<h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

							<div className="space-y-6">
								<p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
									I'm actively looking for SDE opportunities and internships. Reach out for collaborations, interviews, or to view more work.
								</p>

								<div className="space-y-4">
									<a href="mailto:vatsalshah004@gmail.com" className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
										<span className="text-base sm:text-lg">vatsalshah004@gmail.com</span>
										<svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</a>

									<div className="flex flex-wrap gap-3">
										<a href="https://github.com/V-A-T-S-A-L" target="_blank" rel="noreferrer" className="px-4 py-2 border border-border rounded hover:border-muted-foreground/50">
											GitHub
										</a>
										<a href="https://linkedin.com/in/vatsal-shah-1324132b5/" target="_blank" rel="noreferrer" className="px-4 py-2 border border-border rounded hover:border-muted-foreground/50">
											LinkedIn
										</a>
										<a href="https://leetcode.com/u/_Vatsal/" target="_blank" rel="noreferrer" className="px-4 py-2 border border-border rounded hover:border-muted-foreground/50">
											LeetCode
										</a>
										<a href="/VatsalShah_Resume.pdf" target="_blank" rel="noreferrer" className="px-4 py-2 border border-border rounded hover:border-muted-foreground/50">
											View Resume
										</a>
									</div>
									<p className="pt-6 text-sm text-muted-foreground">
										Outside of software, I occasionally explore 3D art and procedural materials as a creative outlet -
										<a
											href="https://archive-vatsalshah.vercel.app"
											target="_blank"
											rel="noreferrer"
											className="ml-1 underline underline-offset-4 hover:text-foreground transition-colors"
										>
											check out my humble Blender archive.
										</a>
									</p>

								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FOOTER */}
				<footer className="py-12 sm:py-16 border-t border-border">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
						<div className="space-y-2">
							<div className="text-sm text-muted-foreground">© 2025 Vatsal Shah. All rights reserved.</div>
							<div className="text-xs text-muted-foreground">Built with Next.js & Tailwind</div>
						</div>

						<div className="flex items-center gap-4">
							<button onClick={toggleTheme} className="cursor-pointer group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300" aria-label="Toggle theme">
								{isDark ? (
									<svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
									</svg>
								) : (
									<svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
										<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
									</svg>
								)}
							</button>
						</div>
					</div>
				</footer>
			</main>

			<div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
		</div>
	)
}
