// Overlay menu
const overlay = document.getElementById('overlay');
document.getElementById('openMenu').addEventListener('click', () => {
  overlay.setAttribute('aria-hidden','false');
});
document.getElementById('closeMenu').addEventListener('click', () => {
  overlay.setAttribute('aria-hidden','true');
});

// Close overlay when clicking a nav link
document.querySelectorAll('.overlay-nav a').forEach(a => {
  a.addEventListener('click', () => overlay.setAttribute('aria-hidden','true'));
});

// Language toggle
const htmlEl = document.documentElement;
const langToggle = document.getElementById('langToggle');

// Simple i18n map (EN default). Edit strings freely.
const t = {
  en: {
    brand: "Save the Date[s]",
    nav: {
      save: "Save the Date[s]",
      katib: "Katib Kitab",
      henna: "Henna Night",
      waleemeh: "Waleemeh",
      friends: "Friends Night Out",
      wedding: "Wedding Day",
      conclusion: "Conclusion [come to our wedding.]",
    },
    save: {
      title: "Save the Date[s]",
      title_ar: "احفظوا التاريخ",
      intro: "We would love to celebrate with you, so we made this website to share the general dates as soon as possible. Find the dates for each event below and details in the sections. Please note that the exact date of each event is still to be confirmed, but the week is finalized.",
      d1: "08–09/01/2026", k1: "Katib Kitab",
      d2: "09–10/01/2026", k2: "Henna Night",
      d3: "09–10/01/2026", k3: "Waleemeh",
      d4: "TBA",          k4: "Friends Night Out",
      d5: "12–13/01/2026",k5: "Wedding Day",
      note_label: "General Note:",
      note: "Please ignore the basic visual language and very simple layout — I needed to send this out as soon as possible, but I’m still too crazy for a Canva digital card. This was a great learning experience. Thanks for understanding."
    },
    kk: {
      title: "Katib Kitab",
      title_ar: "كتب الكتاب",
      body: "A close family event. If you received this link, it’s unlikely you are invited to the Katib Kitab.",
      cultural_label: "Cultural Note:",
      cultural_body: "The Katib Kitab is the marriage contract ceremony — a meaningful family gathering where the union officially becomes recognized. It’s a spiritual moment led by a sheikh (religious leader), where a short reading, blessings, and vows take place. It’s quiet, intimate, and deeply spiritual — the marriage is sealed in faith before the celebrations begin."
    },
    hn: {
      title: "Henna Night",
      title_ar: "ليلة الحنّة",
      caption1: "1. Sarah wearing traditional Palestinian thobe and waquya, 2008.",
      body: "Please join us to celebrate Sarah’s Henna Night on the 9th — or 10th (final date coming soon) — of January, 2026. Address [TBA], Amman, Jordan. Note that the Henna Night is for Sarah’s girls only (boys, please see Waleemeh).",
      cultural_label: "Cultural Note:",
      cultural_body: "Since this is a Palestinian wedding, this note speaks specifically to Palestinian Henna traditions. The Henna Night is a joyful pre-wedding celebration led mostly by the women in the family — a night where love is expressed through music, dance, and community. It’s not a formal ceremony but a cultural gathering, where henna is applied to the bride’s hands as a symbol of blessing, beauty, and protection. There are traditional songs, zaghareet (celebratory ululations), and moments of laughter that blend with unexpected emotion. It’s lively, loud in the most loving way, and deeply rooted in Palestinian heritage — a celebration of womanhood, family, and the joy that comes before the wedding day."
    },
    wl: {
      title: "Waleemeh",
      title_ar: "وليمة الرجال",
      caption2: "2. Nadir (right) and Ahmed (left) looking like the coolest revolutionaries, 2010.",
      body: "Please join us to celebrate Nadir’s Waleemeh on the 9th — or 10th (final date coming soon) — of January, 2026. Address [TBA], Amman, Jordan. Note that the Waleemeh is for Nadir’s boys only (girls, please see Henna Night).",
      cultural_label: "Cultural Note:",
      cultural_body: "The Waleemeh is a traditional Palestinian wedding feast hosted by the groom’s side — an expression of generosity and community. Guests are welcomed with food served in abundance, strong Arabic coffee, and the familiar rhythm of Palestinian dabke songs. The joy rises naturally, and before long, a dabke line forms, feet striking the ground with pride and heritage. In Palestinian tradition, the Waleemeh is not just about sharing a meal — it is about honoring guests, celebrating identity, and beginning the wedding days with steps that carry both culture and belonging."
    },
    fn: {
      title: "Friends Night Out",
      title_ar: "سهرة الأصحاب",
      body: "To be honest, we don’t really know if this will happen — but Sarah wants it to. We’ll spend a day out in Amman and share some of our favorite spots."
    },
    wd: {
      title: "Wedding Day",
      title_ar: "يوم الفرح",
      caption16: "16. Ipsum Lorem. n.d. loremipsum.com/2.html",
      caption17: "17. Ibid.",
      body: "The event of the year, right at the start. <i>Fin.</i>"
    },
    co: {
      title: "Conclusion [come to our wedding.]",
      title_ar: "الخاتمة [تعالوا على عرسنا]",
      body1: "Website made in 2 hours by Sarah.",
      body2: "Nadir thinks it looks like a mission statement.",
      body3: "Sarah just wants to share the dates.",
      body4: "Nadir & Sarah want to celebrate with you.",
      body5: "Proofreading (our maid of honor and best man — they didn’t proofread anything): Aiten Mahfouz, Mohammad Azhari.",
      body6: "Typeset in: Libre Baskerville, Inter, JetBrains Mono."
    }
  },

  ar: {
    brand: "احفظوا التاريخ",
    nav: {
      save: "احفظوا التاريخ",
      katib: "كتب الكتاب",
      henna: "ليلة الحنّة",
      waleemeh: "وليمة الرجال",
      friends: "سهرة الأصحاب",
      wedding: "يوم الفرح",
      conclusion: "الخاتمة [تعالوا على عرسنا]",
    },
    save: {
      title: "Save the Date[s]", /* heading shows both EN left / AR right; keep EN text here */
      title_ar: "احفظوا التاريخ",
      intro: "مبسوطين نحتفل معكم، وعشان هيك عملنا هذا الموقع لنشارككم المواعيد العامة بأسرع وقت. التواريخ لكل فعالية موجودة تحت مع تفاصيل بكل قسم. المواعيد الدقيقة رح تتأكد لاحقًا، بس الأسبوع صار محدد.",
      d1: "08–09/01/2026", k1: "كتب الكتاب",
      d2: "09–10/01/2026", k2: "ليلة الحنّة",
      d3: "09–10/01/2026", k3: "وليمة الرجال",
      d4: "لاحقًا",          k4: "سهرة الأصحاب",
      d5: "12–13/01/2026", k5: "يوم الفرح",
      note_label: "ملاحظة عامة:",
      note: "تجاهلوا البساطة الشديدة بالشكل — لازم نبعث الروابط بسرعة، ولسّا مش قادرين نعمل كرت كانفا :) التجربة كانت حلوة وتعلمنا منها. شكرًا لتفهمكم."
    },
    kk: {
      title: "Katib Kitab",
      title_ar: "كتب الكتاب",
      body: "فعالية عائلية مقرّبة فقط. إذا وصلكم هذا الرابط، فغالبًا الدعوة لا تشمل كتب الكتاب.",
      cultural_label: "معلومة ثقافية:",
      cultural_body: "كتب الكتاب هو عقد الزواج الرسمي — لمّة عائلية مُهمّة بتصير فيها العلاقة مُعترَف فيها رسميًا. شيخ يقود لحظة روحانية قصيرة فيها قراءة، أدعية، وموافقة. الجو هادئ وحميمي — الزواج يَثبت بالإيمان قبل ما تبدأ الاحتفالات."
    },
    hn: {
      title: "Henna Night",
      title_ar: "ليلة الحنّة",
      caption1: "١. سارة بلباس فلسطيني تقليدي (الثوب والوقيّة)، ٢٠٠٨.",
      body: "انضموا إلينا للاحتفال بليلة حنة سارة بتاريخ ٩ — أو ١٠ (نثبّت قريبًا) — كانون الثاني ٢٠٢٦. العنوان [لاحقًا]، عمّان — الأردن. ملاحظة: ليلة الحنّة للبنات فقط (يا شباب شوفوا الوليمة).",
      cultural_label: "معلومة ثقافية:",
      cultural_body: "بما أنه عرس فلسطيني، فهذه المعلومة تخص تقاليد الحنّة الفلسطينية. ليلة الحنّة احتفال ما قبل الزواج تقوده النساء غالبًا — ليلة تُعبَّر فيها المحبة بالموسيقى والرقص واللمّة. مش طقس رسمي بل تجمع ثقافي، تُرسم فيه الحنّة على يدي العروس كرمز للبركة والجمال والوقاية من الحسد. فيها أغانٍ تراثية وزغاريد ولحظات ضحك ممتزجة بالعاطفة — فرح صادق متجذّر بالتراث."
    },
    wl: {
      title: "Waleemeh",
      title_ar: "وليمة الرجال",
      caption2: "٢. نادر (يمين) وأحمد (يسار) بأحلى طلة، ٢٠١٠.",
      body: "انضموا إلينا للاحتفال بوليمة نادر بتاريخ ٩ — أو ١٠ (نثبّت قريبًا) — كانون الثاني ٢٠٢٦. العنوان [لاحقًا]، عمّان — الأردن. ملاحظة: الوليمة للشباب فقط (يا بنات شوفوا ليلة الحنّة).",
      cultural_label: "معلومة ثقافية:",
      cultural_body: "الوليمة تجمع زفّة فلسطيني تقليدي من طرف العريس — كرم وضيافة ولمّة. الضيوف يُستقبلون بالطعام الوفير والقهوة العربية ونغم دبكة فلسطينية. الفرح بيطلع طبيعي، وبس بدها لحظات وبتتشكّل دبكة، وخطواتها تدق الأرض بفخر وانتماء. معناها أكبر من الأكل — تكريم للضيوف واحتفاء بالهوية وبداية أيام العُرس بخطوات من التراث."
    },
    fn: {
      title: "Friends Night Out",
      title_ar: "سهرة الأصحاب",
      body: "بصراحة مش أكيد تصير — بس سارة نفسها فيها. يوم طلعة بعمان ونفرجيكم أماكننا المفضلة."
    },
    wd: {
      title: "Wedding Day",
      title_ar: "يوم الفرح",
      caption16: "١٦. إبسوم لورِم. بلا تاريخ. loremipsum.com/2.html",
      caption17: "١٧. المرجع نفسه.",
      body: "حدث السنة من بدايتها. <i>النهاية.</i>"
    },
    co: {
      title: "Conclusion [come to our wedding.]",
      title_ar: "الخاتمة [تعالوا على عرسنا]",
      body1: "الموقع انعمل بساعتين — سارة.",
      body2: "نادر شايفه بيان مهمة.",
      body3: "سارة بدها بس تشارك المواعيد.",
      body4: "نادر وسارة بدهم يحتفلوا معكم.",
      body5: "التدقيق اللغوي (وصيفة الشرف وإشبين العريس — ما دققوا إشي): آيتن محفوظ، محمد أزهري.",
      body6: "خطوط: Libre Baskerville، Inter، JetBrains Mono."
    }
  }
};

function setLang(lang){
  const scope = (obj, path) => path.split('.').reduce((o,k)=>o?.[k], obj);

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = scope(t[lang], key);
    if (val != null) {
      el.innerHTML = val;
      // Flip direction for Arabic bodies/captions
      if (/\.title_ar$/.test(key) || lang==='ar' && /(intro|body|caption|note)/.test(key)) {
        // Heading right labels already have dir=rtl in HTML
      }
    }
  });

  // Update html lang
  document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
  document.documentElement.setAttribute('data-lang', lang);
}

langToggle.addEventListener('click', ()=>{
  const next = (htmlEl.getAttribute('data-lang') === 'en') ? 'ar' : 'en';
  setLang(next);
});

// Initialize
setLang(document.documentElement.getAttribute('data-lang') || 'en');
