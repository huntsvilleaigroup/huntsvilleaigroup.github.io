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
		rent: 2700,
		beds: 4,
		baths: 3,
		sqft: 2480,
		image: 'northington.webp',
		uahMinutes: 5,
		zillow: 'https://www.zillow.com/homes/4101-Northington-Dr-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-2',
		name: '803 BRICKELL RD NW',
		address: '803 BRICKELL RD NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7280840,
		lng: -86.6354350,
		rent: 2400,
		beds: 3,
		baths: 2,
		sqft: 1520,
		image: 'brickell.webp',
		uahMinutes: 3,
		zillow: 'https://www.zillow.com/homes/803-Brickell-Rd-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-3',
		name: '3522 SPRUCE AVE SW',
		address: '3522 SPRUCE AVE SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7012040,
		lng: -86.6125586,
		rent: 1750,
		beds: 3,
		baths: 2,
		sqft: 1685,
		image: 'spruce.webp',
		uahMinutes: 9,
		zillow: 'https://www.zillow.com/homes/3522-Spruce-Ave-SW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-4',
		name: '3507 CAYMAN RD SW',
		address: '3507 CAYMAN RD SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.708177974683,
		lng: -86.614328268452,
		rent: 1350,
		beds: 4,
		baths: 3,
		sqft: 2105,
		image: 'cayman.webp',
		uahMinutes: 8,
		zillow: 'https://www.zillow.com/homes/3507-Cayman-Rd-SW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-5',
		name: '1616 SEBRING ST NW',
		address: '1616 SEBRING ST NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7467869,
		lng: -86.6222948,
		rent: 1750,
		beds: 4,
		baths: 2,
		sqft: 1870,
		image: 'sebring.jpg',
		uahMinutes: 9,
		zillow: 'https://www.zillow.com/homes/1616-Sebring-St-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-6',
		name: '406 EWING ST NW',
		address: '406 EWING ST NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7233635,
		lng: -86.6308319,
		rent: 1800,
		beds: 3,
		baths: 1,
		sqft: 1340,
		image: 'ewing.webp',
		uahMinutes: 5,
		zillow: 'https://www.zillow.com/homes/406-Ewing-St-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-7',
		name: '4508 AUSTIN DR NW',
		address: '4508 AUSTIN DR NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7273419,
		lng: -86.6335582,
		rent: 1800,
		beds: 3,
		baths: 1,
		sqft: 1075,
		image: 'austin.jpg',
		uahMinutes: 3,
		zillow: 'https://www.zillow.com/homes/4508-Austin-Dr-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-8',
		name: '4202 TOFTOY DR SW',
		address: '4202 TOFTOY DR SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7112065,
		lng: -86.6250026,
		rent: 1700,
		beds: 3,
		baths: 2,
		sqft: 1445,
		image: 'toftoy.jpg',
		uahMinutes: 5,
		zillow: 'https://www.zillow.com/homes/4202-Toftoy-Dr-SW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-9',
		name: '2114 WIMBERLY RD NW',
		address: '2114 WIMBERLY RD NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7517476,
		lng: -86.6380406,
		rent: 1950,
		beds: 5,
		baths: 2,
		sqft: 2857,
		image: 'wimberly.jpg',
		uahMinutes: 5,
		zillow: 'https://www.zillow.com/homes/2114-Wimberly-Rd-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-10',
		name: '1005 CRESTLINE RD NW',
		address: '1005 CRESTLINE RD NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7323110,
		lng: -86.6159133,
		rent: 1200,
		beds: 2,
		baths: 1,
		sqft: 1250,
		image: 'crestline.jpg',
		uahMinutes: 4,
		zillow: 'https://www.zillow.com/homes/1005-Crestline-Rd-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-11',
		name: '4108 HOLMES AVE NW',
		address: '4108 HOLMES AVE NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7276173,
		lng: -86.6305711,
		rent: 2600,
		beds: 3,
		baths: 2,
		sqft: 1659,
		image: 'holmes.jpg',
		uahMinutes: 2,
		zillow: 'https://www.zillow.com/homes/4108-Holmes-Ave-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-12',
		name: '3005 8TH AVE SW',
		address: '3005 8TH AVE SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7166372,
		lng: -86.6061603,
		rent: 1250,
		beds: 3,
		baths: 1,
		sqft: 950,
		image: '8thave.jpg',
		uahMinutes: 7,
		zillow: 'https://www.zillow.com/homes/3005-8th-Ave-SW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-13',
		name: '322 S PLYMOUTH RD NW',
		address: '322 S PLYMOUTH RD NW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7643346,
		lng: -86.5741491,
		rent: 1000,
		beds: 3,
		baths: 2,
		sqft: 940,
		image: 'plymouth.jpg',
		uahMinutes: 12,
		zillow: 'https://www.zillow.com/homes/322-S-Plymouth-Rd-NW-Huntsville-AL_rb/',
	},
	{
		id: 'prop-14',
		name: '2722 HILLSBORO RD SW',
		address: '2722 HILLSBORO RD SW, Huntsville, AL',
		tags: ['Residential'],
		lat: 34.7120573,
		lng: -86.6175931,
		rent: 1650,
		beds: 4,
		baths: 2,
		sqft: 1781,
		image: 'hillsboro.jpg',
		uahMinutes: 6,
		zillow: 'https://www.zillow.com/homes/2722-Hillsboro-Rd-SW-Huntsville-AL_rb/',
	},
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
		const zillowLink = prop.zillow ? `<a href="${prop.zillow}" target="_blank" rel="noopener noreferrer" class="zillow-link" onclick="event.stopPropagation()">View on Zillow</a>` : '';
		card.innerHTML = `
			${photo}
			<div class="property-card-body">
				<h3 class="property-name">${prop.name}</h3>
				<p class="property-meta">${prop.address}</p>
				${rentDisplay}
				${statsDisplay}
				${travelDisplay}
				${zillowLink}
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
	const locationSelect = document.getElementById('location');

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
		const btn = form.querySelector('button[type="submit"]');
		const originalText = btn.textContent;
		btn.textContent = 'Sending...';
		btn.disabled = true;

		fetch(form.action, {
			method: 'POST',
			body: new FormData(form),
			headers: { 'Accept': 'application/json' },
		})
		.then((response) => {
			if (response.ok) {
				form.reset();
				btn.textContent = 'Message Sent!';
				btn.style.background = '#16a34a';
				setTimeout(() => {
					btn.textContent = originalText;
					btn.style.background = '';
					btn.disabled = false;
				}, 4000);
			} else {
				throw new Error('Form submission failed');
			}
		})
		.catch(() => {
			btn.textContent = 'Error — Try Again';
			btn.style.background = '#dc2626';
			setTimeout(() => {
				btn.textContent = originalText;
				btn.style.background = '';
				btn.disabled = false;
			}, 4000);
		});
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


