// Smooth scroll and scrollspy for navigation
document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = [
		document.getElementById('cover-section'),
		document.getElementById('portfolio-section'),
		document.getElementById('experience-section'),
		document.getElementById('skills-section'),
		document.getElementById('about-section')
	];

	let scrollTimeout;
	let isClickScrolling = false;

	// Smooth scroll
	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href').slice(1);
			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				e.preventDefault();
				isClickScrolling = true;

				// Immediately update active class for instant feedback
				navLinks.forEach(l => l.classList.remove('active'));
				this.classList.add('active');

				const headerOffset = 90; // Creates 10px of space above the heading
				const elementPosition = targetSection.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

				// After scroll animation, allow scrollspy to take over again
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => { isClickScrolling = false; }, 1000);
			}
		});
	});

	// Scrollspy
	function onScroll() {
		if (isClickScrolling) return; // Prevent scrollspy from running during click-scroll

		let scrollPos = window.scrollY || window.pageYOffset;
		let offset = 90; // adjust if header height changes
		let found = false;
		for (let i = 0; i < sections.length; i++) {
			const sec = sections[i];
			if (sec) {
				const top = sec.offsetTop - offset;
				const bottom = top + sec.offsetHeight;
				if (scrollPos >= top && scrollPos < bottom) {
					navLinks.forEach(l => l.classList.remove('active'));
					navLinks[i].classList.add('active');
					found = true;
					break;
				}
			}
		}
		// If not found (scrolled past last section), highlight last tab
		if (!found) {
			navLinks.forEach(l => l.classList.remove('active'));
			navLinks[navLinks.length - 1].classList.add('active');
		}
	}

	window.addEventListener('scroll', onScroll);
	onScroll(); // initialize

	// Project expand/collapse (single-open accordion)
	const projects = document.querySelectorAll('.project');
	projects.forEach(project => {
		const header = project.querySelector('.project-header');
		if (!header) return;

		header.addEventListener('click', (e) => {
			e.preventDefault();
			const wasOpen = project.classList.contains('open');

			// First, close all projects
			projects.forEach(p => {
				p.classList.remove('open');
				const h = p.querySelector('.project-header');
				if (h) h.setAttribute('aria-expanded', 'false');
			});

			// If the clicked project wasn't already open, re-open it.
			if (!wasOpen) {
				project.classList.add('open');
				header.setAttribute('aria-expanded', 'true');
			}
		});
	});
});
