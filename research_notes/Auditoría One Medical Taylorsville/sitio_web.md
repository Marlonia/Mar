# Website inventory and on-page audit: onesourcemvc.com ("One Source Medical Center" / "One Medical Clinic"), Taylorsville, UT

Research date: 2026-10-20. Method: search-engine-indexed snippets only. WebFetch returned `getaddrinfo ENOTFOUND onesourcemvc.com` (an environment limit that hits every domain, so it is NOT evidence the site is down), and direct HTTP is blocked. Every "confirmed" item below comes from search-result titles or snippet text that the search tool returned for onesourcemvc.com URLs. The search tool paraphrases snippets, so wording is near-verbatim at best. Quotes marked as quotes appeared as quoted fragments in tool output. No crawl or index dates were exposed for any onesourcemvc.com result, so "as indexed" means "as of the search engine's latest snapshot, retrieved 2026-10-20". Labels: **[Confirmed-snippet]** = seen in indexed text; **[Inference]** = my reasoning.

## Q1. Which URLs are indexed, with what titles and descriptions? Are there duplicate home URLs?

### Takeaway
Only three onesourcemvc.com URLs appeared across about 20 domain-restricted queries in English and Spanish: `/`, `/home` and `/schedule-now`. There is a duplicate home pair (`/` and `/home`), and the brand in the titles is inconsistent: `/` was indexed as both "One Source Medical Center" and "One Medical Clinic", while the other two pages end in "- One Medical Clinic". No services, about, contact, provider, blog, privacy or Spanish pages are indexed.

### Cited Findings
- [Confirmed-snippet] `https://onesourcemvc.com/` appears with the title **"One Source Medical Center"** in most results — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] The same root URL also appeared with the title **"One Medical Clinic"** in two other queries ("One Medical Clinic Taylorsville Utah" and "Trusted Healthcare Services" One Medical Clinic welcome) — [One Medical Clinic](https://onesourcemvc.com/)
- [Confirmed-snippet] `https://onesourcemvc.com/home` is indexed separately with the title **"Trusted Healthcare Services - One Medical Clinic"** — [Trusted Healthcare Services - One Medical Clinic](https://onesourcemvc.com/home)
- [Confirmed-snippet] `https://onesourcemvc.com/schedule-now` is indexed with the title **"Schedule Now - One Medical Clinic"** — [Schedule Now - One Medical Clinic](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] "Trusted Healthcare Services" is the page header or headline used on the home content, and it also appears on the root URL — [One Medical Clinic](https://onesourcemvc.com/); [/home](https://onesourcemvc.com/home)
- [Confirmed-snippet] An unfiltered search for "onesourcemvc" surfaced `/` and `/schedule-now` among OneSource Virtual, OneSource Risk Management and other "OneSource" companies — [One Source Medical Center](https://onesourcemvc.com/); [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] A search for the bare domain string "onesourcemvc.com" returned no onesourcemvc.com page at all. It returned ASP.NET MVC and NuGet pages instead, so the token "mvc" collides with the Microsoft framework name — [CMSWire MVC article](https://www.cmswire.com/cms/web-development/microsoft-open-sources-net-mvc-framework-004236.php)

### Inferences
- `/` and `/home` carry substantially the same content: both hold the family medicine, bilingual staff, phone and "Trusted Healthcare Services" text. That is duplicate content, and it splits ranking signals unless `/home` has a canonical tag pointing to `/` or a 301 redirect. I could not check which.
- The two titles seen for `/` suggest the site was re-titled or rebranded between crawls, from "One Source Medical Center" to "One Medical Clinic" or the reverse, and the search engine holds both versions.
- The titles carry no keyword, city or service: none of them contain "Taylorsville", "chiropractor", "family doctor", "car accident" or "clínica". That is a major local-SEO weakness.
- With only three indexed URLs, the site cannot rank for individual services, such as auto-injury chiropractic or physicals, or for Spanish-language queries.

### Gaps
- I could not retrieve the actual `<meta name="description">` text. The search tool shows titles and its own paraphrased snippet, not the raw meta description.
- I could not determine whether `/home` has a canonical tag, a redirect or a noindex, or whether a sitemap.xml or robots.txt exists. Both need a direct fetch.
- I could not see crawl or cache dates for any URL.

## Q2. What services are listed? What does "mvc" mean? Which providers are named, with what credentials?

### Takeaway
The indexed copy positions the clinic as "Comprehensive Chiropractic & Medical Care". It lists personal injury and car-accident evaluation and care, medical evaluations, referrals, physical therapy, joint pain evaluation and treatment, and family medicine for all ages. No provider is named anywhere, with or without credentials. DOT, immigration, workers' comp, labs and chronic care do not appear in the indexed content.

### Cited Findings
- [Confirmed-snippet] The site describes itself as "Comprehensive Chiropractic & Medical Care" and offers "medical evaluations, referrals, and physical therapy" — [Schedule Now / Home](https://onesourcemvc.com/home)
- [Confirmed-snippet] It has a personal injury evaluation and care section with a topic or heading "Injuries Overlooked After Car Accidents". The section describes comprehensive medical evaluations "to identify underlying conditions" and physical therapists who build plans to restore function and ease pain — [One Source Medical Center](https://onesourcemvc.com/); [/home](https://onesourcemvc.com/home)
- [Confirmed-snippet] Family medicine is "for patients of all ages" and includes "preventive care, routine check-ups, and treatment for a wide range of health issues" — [/home](https://onesourcemvc.com/home)
- [Confirmed-snippet] The site offers joint pain evaluations and treatments using "the latest techniques" — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] Benefit blocks are headed "Expert Care" (experienced professionals focused on high-quality services), "Personalized Treatment" ("individualized care plans tailored to specific needs") and "Bilingual Staff" — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] A domain-restricted query for "physicals DOT immigration workers compensation insurance" returned only the root page, and the tool reported that the page says nothing about DOT physicals, immigration exams or workers' comp — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] A domain-restricted query for doctor, chiropractor, DC, nurse practitioner or "our team" returned only the root page, and the tool reported that the page "doesn't name individual providers or list their credentials" — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] A third-party Spanish-language directory listing (Mexicanas en Utah & Amigas, about 391 days old as of the search, so roughly Sept 2025) lists the same services: personal injury evaluation and care, medical evaluations, physical therapy, joint pain assessment, family medicine and referrals. It files the clinic under "alternative natural health care" and also appears in a "Quiropráctico" category — [Mexicanas en Utah listing](https://mexicanasenutah.com/listing/one-source-medical-center/); [Quiropractico category](https://mexicanasenutah.com/listing-category/quiropractico/)
- [Confirmed-snippet, context] Another business at the same street address, 1972 W 5400 S, Taylorsville, is "Ava Injury Clinic" (MapQuest). Search results describe AVA as treating auto-accident injuries and working with personal injury attorneys — [MapQuest Ava Injury Clinic](https://www.mapquest.com/us/utah/ava-injury-clinic-290551235)
- [Confirmed-snippet, context] WebMD also lists "Utah Pain Relief Institute" at 1972 W 5400 S, Taylorsville 84129 (chiropractic plus mental health counseling, "not accepting new patients"). Its own Facebook and Yelp listings place it in Murray, so the WebMD address may be stale — [WebMD UPRI](https://doctor.webmd.com/practice/utah-pain-relief-institute-f60d4e36-7116-e311-a62b-001f29e3eb44); [Yelp UPRI Murray](https://www.yelp.com/biz/utah-pain-relief-institute-murray)

### Inferences
- "mvc" in the domain very likely stands for "motor vehicle collision" (or "medical/vehicle center"). This is an inference: no snippet spells it out, but the car-accident and personal-injury focus fits that meaning. The site never explains the acronym to patients, and the acronym gives the brand no recognition value.
- The service mix (chiropractic, PT, PI evaluation, referrals) is typical of a PI / auto-injury clinic that bolts on family medicine. The family-medicine copy is generic and has no specifics: no conditions, no labs, no vaccines, no insurance plans.
- No named providers, no credentials (MD/DO/DC/NP/PA/PT) and no licensing information is a significant trust and E-E-A-T weakness for a medical site. It also leaves unclear who legally provides "medical" care rather than chiropractic care.
- The same-address co-tenants (an injury clinic and a pain institute) may cause NAP or citation confusion in local search, or they may be related entities. That cannot be determined here.

### Gaps
- The meaning of "MVC" is not confirmed by any source.
- No provider names, NPI numbers or credentials were found on the site or in the directories searched.
- Accepted insurance, PIP/auto-insurance billing, attorney liens and self-pay pricing were not found in indexed content.
- I could not determine whether services have their own sections on the page (anchors) or only short blurbs.

## Q3. What are the posted hours, and are they consistent across pages?

### Takeaway
The site posts very limited hours, about 16.5 hours a week: Monday 3:00 to 6:30 pm, and Wednesday and Friday 9 am to 12 pm plus 3:00 to 6:30 pm. Tuesday, Thursday, Saturday and Sunday are closed. The hours appear on the home and schedule content; one search summary said the hours appear on only one page. The time formatting is inconsistent.

### Cited Findings
- [Confirmed-snippet] "Monday: 3pm-6:30pm"; Wednesday "9 am-12 pm, 3pm-6:30pm"; Friday "9am-12:00pm, 3pm-6:30pm"; Tuesday, Thursday, Saturday and Sunday closed — [/home](https://onesourcemvc.com/home); [/schedule-now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] For a query that returned both /home and /schedule-now, the tool's summary said "the hours appear only on one of them". For another query it said the /schedule-now result "doesn't include the clinic's actual hours" — [/schedule-now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet, context] WebMD lists weekday hours of 8:00 am to 6:00 pm for the other tenant at the same address (Utah Pain Relief Institute), which does not match One Source's hours — [WebMD UPRI](https://doctor.webmd.com/practice/utah-pain-relief-institute-f60d4e36-7116-e311-a62b-001f29e3eb44)

### Inferences
- The report that the clinic is open Mon/Wed/Fri and closed Tuesday is confirmed, and Thursday is also closed.
- The format varies ("9 am-12 pm" vs "9am-12:00pm" vs "3pm-6:30pm"). This is a polish and consistency issue, and it suggests hand-typed content.
- Hours that seem to appear on only some pages, or as a block on the home page, without structured data (OpeningHoursSpecification) mean Google may not show correct hours unless the Google Business Profile is maintained separately.
- No opening hours exist before 3 pm on Monday, Tuesday or Thursday, and the site offers no after-hours option (online request or WhatsApp). The site therefore misses most weekday demand from accident patients, who often seek care within 72 hours.

### Gaps
- I could not confirm whether the hours appear in the footer of every page or in one block only.
- I could not confirm whether these hours match the Google Business Profile; it is not visible through this tool.

## Q4. How does scheduling work on /schedule-now? What data does it collect? Are there privacy, HIPAA, terms or accessibility notices?

### Takeaway
No online booking vendor appears in indexed text. Scheduling is by phone, Gmail address or a simple contact-style request form protected by reCAPTCHA. The form asks for full name, phone, email and a preferred morning or afternoon time. Two different phone numbers appear. The only privacy text found is the standard Google reCAPTCHA disclaimer: no privacy policy, notice of privacy practices, HIPAA notice, terms or accessibility statement was found.

### Cited Findings
- [Confirmed-snippet] The /schedule-now page asks visitors to call (801) 645-0286 or email onesourcemvc@gmail.com "for questions, comments, or scheduling inquiries", with "Call us today at (801) 645-0286" — [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] /schedule-now also lists a second number, **(385) 497-5590**, alongside (801) 645-0286 — [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] The contact or request form asks for full name, phone number, email address and a preferred morning or afternoon time. The page also gives the email onesourcemvc@gmail.com — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] The form is protected by reCAPTCHA, with the notice that the Google Privacy Policy and Terms of Service apply — [Schedule Now](https://onesourcemvc.com/schedule-now); [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] The root page invites visitors to "contact One Medical today to schedule an appointment". A domain-restricted query naming Calendly, Zocdoc, Jane, Tebra or Square returned only this page and no booking-vendor mention — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] A domain-restricted query for "privacy policy copyright terms HIPAA" returned only /schedule-now. The only matching text was the copyright footer and the reCAPTCHA/Google notice, with nothing about HIPAA — [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] The Mexicanas en Utah directory shows a partly masked phone number with area code (385), which differs from the site's main 801 number — [Mexicanas en Utah listing](https://mexicanasenutah.com/listing/one-source-medical-center/)

### Inferences
- The "Schedule Now" page is a request-a-callback form, not real-time booking. Patients cannot see or pick an open slot, which adds friction and makes the page title "Schedule Now" over-promise.
- Collecting name, phone and email through a generic site-builder form, then relaying them to a free Gmail inbox, is a HIPAA-risk pattern if patients type symptoms or accident details into a message field. A consumer Gmail account is generally not covered by a Business Associate Agreement. (General compliance reasoning; I did not verify whether the form has a free-text field.)
- A medical site with no privacy policy, notice of privacy practices, terms or accessibility statement is a trust and compliance gap. Section 1557/ADA expectations and Google's ads policies for healthcare also favor having them. This needs confirmation by a direct crawl, because a footer link might exist without being indexed.
- Two numbers, (801) 645-0286 and (385) 497-5590, without labels explaining which is for what (main line vs. scheduling, WhatsApp or text) create confusion and NAP inconsistency. The 385 number may be the older one, given the ~2025 directory listing.
- No WhatsApp click-to-chat or SMS link was found. For a Hispanic-oriented clinic, that is a missed conversion channel. This is not confirmed absent, only not indexed.

### Gaps
- I could not see the exact form field labels, whether there is a free-text "reason for visit" field, what confirmation message appears, or where submissions go.
- I could not determine which of the two phone numbers is current or what each is for.
- I could not check whether a cookie banner, analytics, Meta pixel or Google Tag Manager is present.

## Q5. Is the site in English, Spanish or both? How good is the translation? Is there a language switcher?

### Takeaway
All indexed content is English only, even though the site advertises "Bilingual Staff". No Spanish URL, Spanish text or language switcher appeared in any indexed snippet. Spanish-language visibility comes only from a third-party directory.

### Cited Findings
- [Confirmed-snippet] "Bilingual Staff": the site says its bilingual staff ensures effective communication and understanding, providing care in both English and Spanish — [/home](https://onesourcemvc.com/home); [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] A domain-restricted Spanish query ("español atención médica clínica citas") returned only the English /home and /schedule-now pages. The tool noted its Spanish summary was "my paraphrase, not the original text" — [/home](https://onesourcemvc.com/home); [/schedule-now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] A domain-restricted Spanish query ("Llámenos hoy horario lunes miércoles viernes cerrado") returned **no results** — (no URL returned; query run 2026-10-20 restricted to onesourcemvc.com)
- [Confirmed-snippet] A Spanish-language directory listing for One Source Medical Center exists on mexicanasenutah.com, a directory aimed at Hispanic women and families in Utah — [Mexicanas en Utah listing](https://mexicanasenutah.com/listing/one-source-medical-center/)

### Inferences
- The site promises Spanish-language care but does not deliver Spanish content. That is a mismatch for what appears to be a core Hispanic audience, and it forfeits ranking for queries like "quiropráctico Taylorsville", "clínica hispana Taylorsville" or "doctor accidente de carro Utah".
- With no Spanish pages, translation quality cannot be judged. If a client-side translation widget exists, its output would not be indexed and would not help SEO.

### Gaps
- I could not confirm whether a Google Translate widget, a language toggle or any hreflang tags exist; that needs the live DOM.

## Q6. Platform and technology hints (GoDaddy, Wix, Squarespace, WordPress, GitHub Pages, Vercel, AI builders, and so on)

### Takeaway
The indexed footer and form boilerplate match **GoDaddy Website Builder (Websites + Marketing)**: "Copyright © 2026 One Source Medical Center - All Rights Reserved." plus the reCAPTCHA/Google notice on a simple contact form. This is a strong inference, not proof. I found no public GitHub repository or code mentioning "onesourcemvc", so the reported GitHub/ChatGPT Atlas workflow is not visible in public data.

### Cited Findings
- [Confirmed-snippet] Footer text: "Copyright © 2026 One Source Medical Center - All Rights Reserved." — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] The form is protected by reCAPTCHA with the "Google Privacy Policy and Terms of Service apply" notice — [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] The page slugs are `/home` and `/schedule-now` — [/home](https://onesourcemvc.com/home); [/schedule-now](https://onesourcemvc.com/schedule-now)
- [Confirmed] A GitHub repository search for "onesourcemvc" returned 0 repositories, and a GitHub code search for "onesourcemvc" returned 0 code results (GitHub MCP search, 2026-10-20). — (GitHub search API; no URL)
- [Confirmed-snippet] A domain-restricted search for GoDaddy default phrases ("Drop us a line", "Better yet, see us in person", "Powered by GoDaddy") returned no results — (query restricted to onesourcemvc.com, 2026-10-20)

### Inferences
- "Copyright © {year} {Business Name} - All Rights Reserved." is GoDaddy Website Builder's default auto-generated footer. GoDaddy updates the year automatically, so "2026" does not prove recent manual maintenance. A reCAPTCHA-protected contact form with name, phone, email and a preferred-time selector also matches GoDaddy's built-in contact and appointment-request section. Wix, Squarespace and WordPress do not produce this exact footer string by default. Confidence is moderate to high, but the image CDN (img1.wsimg.com would be conclusive) and generator meta could not be checked.
- The missing GoDaddy phrases ("Drop us a line", "Powered by GoDaddy") only mean that those strings are not in the search index. Search snippets rarely include them, so this is weak counter-evidence.
- A site published to GitHub Pages, Vercel or Netlify would normally serve hand-coded or static HTML and would not carry the GoDaddy-style footer. If the owner does use GitHub, possibilities include: (a) a separate rebuild not yet live or not indexed, (b) a private repository (GitHub search does not index private repos), or (c) the GitHub claim refers to a different project. The title flip from "One Source Medical Center" to "One Medical Clinic" on `/` is consistent with a rebuild or rename in progress.
- The copy reads as generic, template-like healthcare marketing ("Trusted Healthcare Services", "Expert Care", "Personalized Treatment", "individualized care plans tailored to specific needs", "the latest techniques", "treatment for a wide range of health issues"). That style fits either builder AI-generated copy (GoDaddy's builder auto-writes copy with AI) or ChatGPT-written text. I found no lorem ipsum or placeholder text in snippets.

### Gaps
- Hosting, DNS, server headers, generator meta, CMS fingerprints, image CDN hostnames and page speed could not be checked without a direct fetch. Running `curl -I`, viewing source and running a Wappalyzer or BuiltWith lookup from an unrestricted network would settle the platform question.
- I could not verify the claim that the owner uses GitHub and ChatGPT Atlas.

## Q7. SERP features, knowledge panel, reviews and the brand-name collision with Amazon One Medical

### Takeaway
The search tool exposes no sitelinks, star ratings or knowledge panel, so these remain unverified. For "One Medical Clinic Taylorsville Utah" the site does surface, but below several Intermountain Health "Taylorsville Clinic" listings. No Amazon One Medical location in Utah surfaced, so Amazon does not crowd out the site on that local query, though the shared name remains a brand and trademark risk. No reviews for this clinic were found on Yelp, Facebook or similar sites.

### Cited Findings
- [Confirmed-snippet] For the query "One Medical Clinic Taylorsville Utah", the results were, in order: Nextdoor (Intermountain Taylorsville Clinic), two Intermountain ProviderMatch pages, Yelp Taylorsville Clinic and urgentcarelocations.org, then **onesourcemvc.com/ ("One Medical Clinic")** and **/schedule-now** at roughly positions 7 and 8 of 10, followed by Jordan Meadows and wheree.com — [One Medical Clinic](https://onesourcemvc.com/); [Yelp Taylorsville Clinic](https://www.yelp.com/biz/taylorsville-clinic-taylorsville)
- [Confirmed-snippet] For the query '"One Medical Clinic" Taylorsville 5400 S', the site did **not** appear. The results were Green Chiropractic, Utah Pain Relief Institute (at 1972 W 5400 S), Solv and Intermountain — [WebMD UPRI](https://doctor.webmd.com/practice/utah-pain-relief-institute-f60d4e36-7116-e311-a62b-001f29e3eb44); [WebMD Green Chiropractic](https://doctor.webmd.com/practice/green-chiropractic-610d90a7-effd-4bc4-ad62-8064ee7bf184)
- [Confirmed-snippet] The query '"One Medical" clinic Salt Lake City Utah location' surfaced no One Medical (Amazon) location. Results were WebMD listings for Intermountain and other practices — [WebMD Intermountain Salt Lake Clinic](https://doctor.webmd.com/practice/intermountain-salt-lake-clinic-aed0f1ff-c9df-4bf2-a07f-2938f1510ce6)
- [Confirmed-snippet] The query '"One Source Medical" Taylorsville reviews Yelp Facebook' returned only unrelated One Source Medical companies in Dallas TX, Sanford FL, San Antonio and Tampa/Jupiter FL, and nothing tied to Taylorsville — [Yelp One Source Medical Services Sanford](https://www.yelp.com/biz/one-source-medical-services-sanford); [BBB One Source Medical Group Tampa](https://www.bbb.org/us/fl/tampa/profile/medical-supplies/one-source-medical-group-llc-0653-90153541)
- [Confirmed-snippet] The exact phone number "(801) 645-0286" in quotes returned no listing anywhere except, in other queries, the clinic's own site. No directory citations for the number were found — (query run 2026-10-20); [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] The query "One Source Medical Center Taylorsville" (domain-filtered) returned the homepage — [One Source Medical Center](https://onesourcemvc.com/)

### Inferences
- The local citation footprint is very thin: the only third-party citation found is mexicanasenutah.com, and it shows a different (385) phone number. No Yelp, Healthgrades, WebMD, Facebook or BBB listing turned up for One Source Medical Center in Taylorsville. This limits Google Maps and local-pack rankings.
- Using "One Medical Clinic" as the public brand collides with Amazon's "One Medical" brand. That creates trademark exposure and confusion when patients search "One Medical" (Amazon One Medical's national pages and app would dominate generic brand queries). It also leaves the clinic with two competing names, "One Source Medical Center" and "One Medical Clinic", that split brand signals. (This is a legal and branding inference; I did not research the trademark registration itself.)
- The phrase "One Medical Clinic" combined with "Taylorsville" is weakly owned. Intermountain's "Taylorsville Clinic" outranks the site on that query, partly because of the generic word "Clinic".

### Gaps
- I could not observe Google sitelinks, a knowledge panel, Google Business Profile rating or review count, a map-pack position or rich results. The search tool returns links and summaries, not rendered SERP features. The name, categories and reviews on the Google Business Profile remain unknown.
- I could not determine whether Amazon One Medical ads or pages appear for "One Medical Taylorsville" on Google specifically.

## Q8. Typos, broken text, copyright year, inconsistent business names, missing contact information

### Takeaway
The main problems are brand and NAP inconsistency, not typos. The site uses three names ("One Source Medical Center", "One Medical Clinic", "One Medical"), two phone numbers, a Gmail address and an address shown both with and without "Suite #2". It also has inconsistent time formatting and no named providers. The copyright year is current (2026), probably auto-updated.

### Cited Findings
- [Confirmed-snippet] The footer reads "One Source Medical Center"; titles read "- One Medical Clinic"; the body says "contact One Medical today" — [One Source Medical Center](https://onesourcemvc.com/); [/home](https://onesourcemvc.com/home); [/schedule-now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] The address appears as "1972 W 5400 S, Taylorsville, UT 84129" and also as "One Source Medical Center 1972 W 5400 S, Suite #2"; the tool noted that "the site lists two addresses" — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] Phones: (801) 645-0286 everywhere; (385) 497-5590 also on /schedule-now. The tool noted that "the two pages list slightly different phone numbers" — [Schedule Now](https://onesourcemvc.com/schedule-now); [/home](https://onesourcemvc.com/home)
- [Confirmed-snippet] Email: onesourcemvc@gmail.com (a free Gmail address, not a domain email) — [Schedule Now](https://onesourcemvc.com/schedule-now)
- [Confirmed-snippet] "Copyright © 2026 One Source Medical Center - All Rights Reserved." — [One Source Medical Center](https://onesourcemvc.com/)
- [Confirmed-snippet] For one /home result, the tool noted that "the page does not give a street address, hours, or insurance details". Contact details are therefore not uniformly present on every indexed page — [/home](https://onesourcemvc.com/home)
- [Confirmed-snippet] Hours are formatted inconsistently ("9 am-12 pm" vs "9am-12:00pm") — [/home](https://onesourcemvc.com/home)

### Inferences
- NAP (name, address, phone) inconsistency across the site and the one directory citation (different name variants, suite present or absent, 801 vs 385) is a known local-SEO negative. It should be unified to one legal and brand name, one primary phone and one address format, matched exactly on the Google Business Profile.
- A Gmail address on a medical site lowers perceived professionalism and trust. A domain email (for example, citas@onesourcemvc.com) on a HIPAA-capable provider is preferable.
- No typos or lorem ipsum were detected in the snippets available. Because snippets are paraphrased and partial, a direct proofread of the live pages is still required.

### Gaps
- I could not run a full proofread, broken-link check, image alt-text review, mobile rendering check, Core Web Vitals test or schema.org (LocalBusiness/MedicalClinic) check, because all of them need direct page access.
- Social profile links (Facebook, Instagram, TikTok, WhatsApp) on the site could not be confirmed.
