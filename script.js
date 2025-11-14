// Year in footer
document.addEventListener('DOMContentLoaded', () => {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});

// Smooth scrolling for nav links
document.addEventListener('click', (e) => {
	const target = e.target;
	if (target && target.matches('a[href^="#"]')) {
		const href = target.getAttribute('href');
		if (href && href.length > 1) {
			const el = document.querySelector(href);
			if (el) {
				e.preventDefault();
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}
}, { passive: false });

// Dynamic brand colors from logo using Color Thief (with fallbacks)
window.addEventListener('load', () => {
	try {
		const logo = document.getElementById('brandLogo');
		// Guard if CDN not loaded or image blocked by CORS/file origin
		if (!window.ColorThief || !logo || !logo.complete) return;
		const thief = new window.ColorThief.ColorThief();
		let dominant = null;
		let palette = null;
		try {
			dominant = thief.getColor(logo);
			palette = thief.getPalette(logo, 4);
		} catch (_err) {
			// Canvas tainted (e.g., file://). Silently ignore.
			return;
		}
		if (dominant) {
			const [r, g, b] = dominant;
			document.documentElement.style.setProperty('--brand', `rgb(${r} ${g} ${b})`);
			// Slightly lighter accent
			const lighten = (v, amt) => Math.max(0, Math.min(255, Math.round(v + amt)));
			document.documentElement.style.setProperty('--brand-2', `rgb(${lighten(r, 30)} ${lighten(g, 30)} ${lighten(b, 30)})`);
			// Very light background tint
			document.documentElement.style.setProperty('--brand-3', `rgb(${lighten(r, 220)} ${lighten(g, 220)} ${lighten(b, 220)})`);
		} else if (palette && palette.length) {
			const [r, g, b] = palette[0];
			document.documentElement.style.setProperty('--brand', `rgb(${r} ${g} ${b})`);
		}
	} catch (_e) {
		// Ignore color extraction errors
	}
});

// Static properties data - completely self-contained
// Coordinates geocoded using OpenStreetMap Nominatim API (see sources in README/notes)
const properties = [
	{
		id: 'prop-1',
		name: '4101 NORTHINGTON DR NW',
		address: '4101 NORTHINGTON DR NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7346380,
		lng: -86.6291030,
		rent: 2100,
		beds: 4,
		baths: 3,
		sqft: 2480,
		image: 'northington.webp',
		uahMinutes: 5,
	},
	{
		id: 'prop-2',
		name: '803 BRICKELL RD NW',
		address: '803 BRICKELL RD NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7280840,
		lng: -86.6354350,
		rent: 1750,
		beds: 3,
		baths: 2,
		sqft: 1520,
		image: 'brickell.webp',
		uahMinutes: 3,
	},
	{
		id: 'prop-3',
		name: '3522 SPRUCE AVE SW',
		address: '3522 SPRUCE AVE SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7012040,
		lng: -86.6125586,
		rent: 1650,
		beds: 3,
		baths: 2,
		sqft: 1685,
		image: 'spruce.webp',
		uahMinutes: 9,
	},
	{
		id: 'prop-4',
		name: '3507 CAYMAN RD SW',
		address: '3507 CAYMAN RD SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.708177974683,
		lng: -86.614328268452,
		rent: 1950,
		beds: 4,
		baths: 3,
		sqft: 2105,
		image: 'cayman.webp',
		uahMinutes: 8,
	},
	{
		id: 'prop-5',
		name: '1616 SEBRING ST NW',
		address: '1616 SEBRING ST NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7467869,
		lng: -86.6222948,
		rent: 1800,
		beds: 4,
		baths: 2,
		sqft: 1870,
		image: 'sebring.jpg',
		uahMinutes: 9,
	},
	{
		id: 'prop-6',
		name: '406 EWING ST NW',
		address: '406 EWING ST NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7233635,
		lng: -86.6308319,
		rent: 1600,
		beds: 3,
		baths: 1,
		sqft: 1340,
		image: 'ewing.webp',
		uahMinutes: 5,
	}
];

// Render properties grid
function renderProperties() {
	const grid = document.getElementById('propertiesGrid');
	if (!grid) return;
	grid.innerHTML = '';
	if (!properties.length) {
		const p = document.createElement('p');
		p.textContent = 'No properties listed yet.';
		grid.appendChild(p);
		return;
	}
	for (const prop of properties) {
		const card = document.createElement('article');
		card.className = 'property-card';
		card.id = prop.id;
		card.tabIndex = 0;
		const photo = prop.image ? `<img class="property-photo" src="${prop.image}" alt="${prop.name} exterior">` : '';
		const rentDisplay = prop.rent ? `<p class="property-rent">$${prop.rent.toLocaleString()}/mo</p>` : '';
		const stats = [];
		if (prop.beds != null) stats.push(`${prop.beds} bd`);
		if (prop.baths != null) stats.push(`${prop.baths} ba`);
		if (prop.sqft != null) stats.push(`${prop.sqft.toLocaleString()} sqft`);
		const statsDisplay = stats.length ? `<p class="property-meta">${stats.join(' • ')}</p>` : '';
		const travelDisplay = prop.uahMinutes != null ? `<div class="property-cta">${prop.uahMinutes} min to UAH</div>` : '';
		card.innerHTML = `
			${photo}
			<div class="property-card-body">
				<h3 class="property-name">${prop.name}</h3>
				<p class="property-meta">${prop.address}</p>
				${rentDisplay}
				${statsDisplay}
				${travelDisplay}
			</div>
		`;
		card.addEventListener('click', () => focusPropertyOnMap(prop.id));
		card.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				focusPropertyOnMap(prop.id);
			}
		});
		grid.appendChild(card);
	}
}

// Leaflet map setup
let map;
let markers = new Map(); // id -> marker

function initMap() {
	const mapEl = document.getElementById('leafletMap');
	if (!mapEl || !window.L) return;
	map = window.L.map(mapEl, {
		scrollWheelZoom: true
	});

	window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	addMarkers();
}

function addMarkers() {
	if (!map || !window.L) return;
	markers.forEach((m) => m.remove());
	markers.clear();

	const bounds = window.L.latLngBounds([]);
	for (const prop of properties) {
		if (typeof prop.lat !== 'number' || typeof prop.lng !== 'number') continue;
		const marker = window.L.marker([prop.lat, prop.lng]).addTo(map);
		const rentInfo = prop.rent ? `<br>Rent: $${prop.rent.toLocaleString()}/month` : '';
		const stats = [];
		if (prop.beds != null) stats.push(`${prop.beds} bd`);
		if (prop.baths != null) stats.push(`${prop.baths} ba`);
		if (prop.sqft != null) stats.push(`${prop.sqft.toLocaleString()} sq ft`);
		const statsInfo = stats.length ? `<br>${stats.join(' · ')}` : '';
		const travelInfo = prop.uahMinutes != null ? `<br>UAH: ~${prop.uahMinutes} min drive` : '';
		const photoSnippet = prop.image ? `<div class="popup-photo"><img src="${prop.image}" alt="${prop.name} exterior"></div>` : '';
		marker.bindPopup(`<div class="popup-content"><strong>${prop.name}</strong><br>${prop.address}${rentInfo}${statsInfo}${travelInfo}${photoSnippet}</div>`);
		markers.set(prop.id, marker);
		bounds.extend([prop.lat, prop.lng]);
	}
	if (bounds.isValid()) {
		map.fitBounds(bounds.pad(0.2));
	} else {
		// Default to Huntsville, AL
		map.setView([34.7304, -86.5861], 12);
	}
}

function focusPropertyOnMap(id) {
	const marker = markers.get(id);
	if (marker && map) {
		map.setView(marker.getLatLng(), Math.max(map.getZoom(), 15), { animate: true });
		marker.openPopup();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
}

// Contact form -> mailto:
document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.site-nav');
	if (navToggle && nav) {
		navToggle.addEventListener('click', () => {
			nav.classList.toggle('open');
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
		});
		nav.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => nav.classList.remove('open'));
		});
		window.addEventListener('resize', () => {
			if (window.innerWidth > 768) {
				nav.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	const form = document.getElementById('contactForm');
	if (!form) return;
	const TARGET_EMAIL = 'Johncglosemeyer@gmail.com';
	const locationSelect = document.getElementById('location');
	const requestSelect = document.getElementById('requestType');

	// Populate location dropdown from properties list
	if (locationSelect) {
		const seen = new Set();
		for (const prop of properties) {
			const label = prop.name || prop.address;
			if (!label || seen.has(label)) continue;
			seen.add(label);
			const opt = document.createElement('option');
			opt.value = label;
			opt.textContent = label;
			locationSelect.appendChild(opt);
		}
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('name')?.value?.trim() ?? '';
		const email = document.getElementById('email')?.value?.trim() ?? '';
		const message = document.getElementById('message')?.value?.trim() ?? '';
		const location = locationSelect?.value ?? '';
		const request = requestSelect?.value ?? '';
		const subject = encodeURIComponent(`Website inquiry from ${name || 'Prospective Contact'}`);
		const bodyLines = [
			`Name: ${name}`,
			`Email: ${email}`,
			location ? `Preferred Property: ${location}` : null,
			request ? `Request Type: ${request}` : null,
			'',
			message
		].filter(Boolean);
		const body = encodeURIComponent(bodyLines.join('\n'));
		window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
	});
});

// Initialize content
document.addEventListener('DOMContentLoaded', () => {
	renderProperties();
	setupPropertyCarousel();
	initMap();
});

// Team photo fallback to initials
document.addEventListener('DOMContentLoaded', () => {
	const avatars = document.querySelectorAll('.avatar');
	avatars.forEach((avatar) => {
		const img = avatar.querySelector('img.team-photo');
		if (!img) {
			avatar.classList.add('fallback');
			return;
		}
		const toFallback = () => {
			try { img.remove(); } catch (_e) {}
			avatar.classList.add('fallback');
		};
		img.addEventListener('error', toFallback, { once: true });
		// Handle cached broken images
		if (img.complete && img.naturalWidth === 0) {
			toFallback();
		}
	});
});

function setupPropertyCarousel() {
	const track = document.getElementById('propertiesGrid');
	const prevBtn = document.querySelector('.properties-carousel .prev');
	const nextBtn = document.querySelector('.properties-carousel .next');
	if (!track) return;

	const scrollByCard = (direction) => {
		const card = track.querySelector('.property-card');
		const gap = 16;
		const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
		track.scrollBy({ left: direction * amount, behavior: 'smooth' });
	};

	prevBtn?.addEventListener('click', () => scrollByCard(-1));
	nextBtn?.addEventListener('click', () => scrollByCard(1));
}


