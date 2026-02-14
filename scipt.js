// scipt.js — shows a surprise card when the surprise button is clicked
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(
        '#surprise-btn, .surprise-btn, .btn, button[data-action="surprise"]',
    );
    if (!btn) {
        console.warn(
            'Surprise button not found. Add id="surprise-btn" or class="surprise-btn".',
        );
        return;
    }

    let card = document.querySelector(
        '#surprise-card, .surprise-card, .card[data-role="surprise"]',
    );
    if (!card) {
        card = document.createElement("div");
        card.id = "surprise-card";
        card.className = "surprise-card";
        card.innerHTML = `
			<div class="surprise-content">
				<h3>My Strongest Mom❤️</h3>
				<p>இந்த உலகத்தில் நான் முதலில் பார்த்த முகம் நீ… நான் முதலில் கேட்ட குரலும் நீ தான்… நான்
            முதலில் உணர்ந்த அன்பும் உன்னிடம் தான்...!

            என் வாழ்க்கையின் முதல் காதலான உங்களுக்கு நன்றி சொல்லணும்…
            என்னை இவ்வளவு அன்பா வளர்த்ததற்கு…
            எப்போதும் என்னுடன் இருந்ததற்கு…
            என்னை நான் ஆக செய்ததற்கு 🌹

                </p>
			</div>`;
        card.style.display = "none";
        btn.insertAdjacentElement("afterend", card);
    }

    // Add minimal inline styles only if user CSS doesn't provide them
    const styleId = "surprise-card-inline-style";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
			.surprise-card{ display:none; max-width:360px; margin:16px auto 0; transition: opacity .22s ease, transform .22s ease; opacity:0; transform: translateY(-6px); padding:12px; border-radius:8px; background:var(--card-bg,#ffffff); color:var(--card-fg,#111); box-shadow:0 6px 20px rgba(0,0,0,0.12); box-sizing:border-box; }
			.surprise-card.show{ display:block; opacity:1; transform: translateY(0); }
			.surprise-card .surprise-content{ margin:0; text-align: center; }
			.surprise-card h3{ margin:0 0 8px 0; text-align: center; font-size: 18px; }
			.surprise-card p{ margin:0; text-align: center; font-size: 14px; }
		`;
        document.head.appendChild(style);
    }

    btn.addEventListener("click", function () {
        const hidden =
            getComputedStyle(card).display === "none" ||
            !card.classList.contains("show");
        if (hidden) {
            card.style.display = "block";
            void card.offsetWidth; // force reflow for transition
            card.classList.add("show");
            card.setAttribute("aria-hidden", "false");
            btn.setAttribute("aria-expanded", "true");
            btn.style.display = "none";
        } else {
            card.classList.remove("show");
            card.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
            setTimeout(function () {
                if (!card.classList.contains("show")) card.style.display = "none";
            }, 240);
        }
    });
});
