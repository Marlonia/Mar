# Legal & Compliance Requirements for a Small Utah Medical Clinic's Website, Forms, Messaging and Marketing Stack (status as of 2026-10-20)

> Method note for the report writer. Only WebSearch was available. WebFetch fails (DNS) and curl is blocked, so every finding comes from search-result summaries, not full-page reads. The shared web-search budget ran out before the last two planned queries (EO 14224 / federal language-access posture, and Meta's own WhatsApp terms text); those are listed as Gaps. Labels used below: **[Primary]** = official government/vendor source; **[Secondary]** = law firm, compliance vendor, trade press; **(background knowledge)** = from the researcher's prior knowledge, not re-verified in this session. This is informational research, not legal advice.

## 1. HIPAA and websites: tracking technologies, analytics, FTC Health Breach Notification Rule

### Takeaway
The OCR tracking-technology bulletin (Dec 2022, revised March 2024) still governs everything except the narrow "IP address + visit to a public, unauthenticated page" theory that *AHA v. Becerra* vacated in June 2024, and HHS dropped its appeal. Google Analytics or Meta Pixel on appointment-request, symptom-intake, patient-portal or any form page remains high-risk, because neither Google nor Meta signs a BAA for those tools. The main exposure today is private class actions (multi-million-dollar settlements in 2025–2026), not OCR fines. Cookieless or self-hosted analytics (Plausible, Umami) lower the risk but carry no BAA or HIPAA certification.

### Cited Findings
**Court ruling and current status of OCR guidance**
- [Secondary] On June 20, 2024, the N.D. Texas court in *AHA v. Becerra* vacated the part of OCR's bulletin known as the "Proscribed Combination": the position that an IP address plus a visit to a public, unauthenticated page about health conditions or providers is PHI by itself — [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en-us/knowledge/publications/77cf7f04/applying-hipaa-to-online-tracking-technologies); [ConsentPixel](https://consentpixel.com/blogs/hhs-ocr-tracking-guidance/)
- [Secondary] HHS OCR first filed a notice of appeal, then withdrew it on August 29, 2024, so the vacatur is final — [Quarles](https://www.quarles.com/newsroom/publications/hhs-ocr-withdraws-tracking-technologies-appeal-in-aha-v-becerra); [HIPAA Journal](https://www.hipaajournal.com/ocr-to-appeal-district-court-ruling-in-aha-tracking-technology-case/); [MoFo](https://www.mofo.com/resources/insights/240930-a-mofo-privacy-minute-q-a-hhs-withdraws)
- [Secondary] The ruling was narrow and most of the bulletin survives. Trackers on authenticated pages (patient portals), on forms, and anywhere a user types health information still trigger HIPAA, and vendors receiving PHI still need a BAA. OCR has not issued replacement guidance as of 2026 — [ConsentPixel](https://consentpixel.com/blogs/hhs-ocr-tracking-guidance/); [HIPAA Compliant Hosting blog](https://hipaacomplianthosting.com/blog/hipaa-tracking-technologies)
- [Secondary] The March 2024 OCR update said a visit to a provider's public page does not automatically create PHI unless the visit relates to the person's health or to payment for care — [AccountableHQ](https://www.accountablehq.com/post/is-google-analytics-hipaa-compliant-ga4-baa-phi-and-safer-alternatives)

**Google Analytics and Meta Pixel**
- [Primary] Google's official help article says Google "makes no representations that Google Analytics satisfies HIPAA requirements" and does not offer BAAs for it. HIPAA-regulated customers "must not use Google Analytics in any way that implicates Google's access to, or collection of, PHI," may use it only on pages that are not HIPAA-covered, and should not tag authenticated pages — [Google Analytics Help: HIPAA and Google Analytics](https://support.google.com/analytics/answer/13297105?hl=en)
- [Secondary] Even with IP anonymization and cookies disabled, GA4 still sends identifiable data to Google. Consent Mode does not retroactively fix unconsented hits — [AccountableHQ](https://www.accountablehq.com/post/is-google-analytics-hipaa-compliant-ga4-baa-phi-and-safer-alternatives)
- [Secondary] Meta and Google do not sign BAAs for their standard pixels, so using them on pages that touch PHI is high-risk — [Paubox / pixel settlement coverage](https://www.paubox.com/blog/five-healthcare-providers-reach-tracking-pixel-settlements); [ConsentPixel](https://consentpixel.com/blogs/hhs-ocr-tracking-guidance/)
- [Secondary] Since January 1, 2025, Meta stops middle- and bottom-funnel event data from advertisers in restricted categories, including health and wellness. The block applies to both the Pixel and the server-side Conversions API. Only top-of-funnel signals such as page views remain usable — [Ours Privacy](https://oursprivacy.com/blog/meta-changes-to-data-policy); [Accelerated Digital Media](https://www.accelerateddigitalmedia.com/insights/new-meta-ads-policies-force-health-and-wellness-advertisers-to-rethink-their-campaigns/)

**Litigation and enforcement risk**
- [Secondary] In August 2026, five healthcare providers reached proposed class settlements over tracking tools on their websites and portals. One example is Emanate Health Medical Center's $777,000 settlement fund — [Paubox](https://www.paubox.com/blog/five-healthcare-providers-reach-tracking-pixel-settlements)
- [Secondary] CVS Health and Criteo agreed to pay a combined $20.5M to settle website-tracking litigation, after mediation in March 2026 — [HIPAA Journal](https://www.hipaajournal.com/cvs-health-criteo-american-wellness-corp-data-breach-settlements/)
- [Secondary] Inova Health's tracking-pixel settlement was $3.1M — [Curve Compliance](https://www.curvecompliance.com/inova-health-3-1m-settlement-pixel-configuration-cost); see also the [Healthcare Pixel Lawsuit Tracker](https://www.curvecompliance.com/healthcare-pixel-lawsuit-tracker-settlements-compliance-lessons)
- [Secondary] One vendor says healthcare pixel settlements have exceeded $193M since 2023. The source sells compliance services, so treat the figure as indicative only — [Ours Privacy on Plausible](https://oursprivacy.com/learn/hipaa-compliant-tools/is-plausible-hipaa-compliant)
- [Secondary] No new OCR monetary enforcement action specifically about tracking pixels turned up in 2025–2026 search results. One vendor blog says OCR scrutiny of pixels on portals and scheduling pages has "intensified," but that is commentary, not a documented action — [LlamaLab](https://www.llamalab.ai/blog/hipaa-enforcement-2026-ocr-expanded-priorities); [Melurna](https://www.melurna.com/blog/hipaa-compliant-tracking/)

**Safer analytics**
- [Secondary] Plausible is cookieless, collects no personal data, and does no cross-site tracking. Its managed cloud is hosted only in the EU, and a self-hostable Community Edition exists. It uses hashed IPs for sessions. No source confirmed that Plausible signs a BAA, and a compliance vendor notes that "better for privacy" and "healthcare compliant" are not the same thing — [Ours Privacy](https://oursprivacy.com/learn/hipaa-compliant-tools/is-plausible-hipaa-compliant); [Ulam.io comparison](https://www.ulam.io/blog/privacy-first-analytics-in-healthcare-top-tools-compared); [Martech Zone](https://martech.zone/plausible-cookieless-analytics/?amp=1)
- [Secondary] Umami can be self-hosted (data stays on your own instance) and is cookieless. A consent-management vendor says IPs are used only for country-level geolocation and are not stored. No source discusses HIPAA or BAAs for Umami — [ConsentStack](https://www.consentstack.io/vendors/umami); [Vultr docs](https://docs.vultr.com/how-to-deploy-umami-open-source-analytics-platform); [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-l7vwfam4rn33o)
- [Primary] Cloudflare's HIPAA Trust Hub lists Zaraz (its server-side tag manager) among the services covered by its BAA, but only for Enterprise customers. Third-party scripts configured inside Zaraz remain the customer's responsibility — [Cloudflare Trust Hub HIPAA FAQ](https://www.cloudflare.com/trust-hub/compliance-resources/hipaa/)

**FTC Health Breach Notification Rule (HBNR)**
- [Secondary] The FTC issued its amended HBNR on April 26, 2024. It was published May 30, 2024 and took effect July 29, 2024. It complements HIPAA and covers vendors of personal health records and health apps that are not HIPAA-regulated. HIPAA covered entities are generally outside it — [Quarles](https://www.quarles.com/newsroom/publications/ftc-publishes-final-rule-amending-health-breach-notification-rule); [Hogan Lovells](https://hoganlovells.com/en/publications/ftc-finalizes-revised-health-breach-notification-rule-expanding-its-scope-and-updating-companies-obligations); [McDermott](https://www.mwe.com/?p=279089)
- [Secondary] The amendments responded to the FTC's 2023 actions against digital-health companies that shared health data with ad platforms. The FTC also co-signed a 2023 letter with OCR warning hospitals and telehealth providers about tracking technologies — [Quarles](https://www.quarles.com/newsroom/publications/ftc-publishes-final-rule-amending-health-breach-notification-rule); [XIFIN](https://www.xifin.com/billing-beat/ftc-finalizes-amendments-to-health-breach-notification-rule-aimed-at-clarifying-its-application-to-health-applications-and-similar-technologies)
- [Secondary] The FTC later rescinded its 2021 health-app breach policy statement as redundant, and the underlying rule remains in force. The snippet did not state the exact year — [MyChesCo](https://www.mychesco.com/a/news/national/ftc-drops-health-app-policy-after-rule-makes-it-redundant/)

### Inferences
- For a HIPAA covered entity clinic, HIPAA (not the HBNR) is the controlling regime for its own website. The HBNR matters only if the agency or a vendor runs a non-HIPAA, direct-to-consumer health app or tool for the clinic. The FTC Act Section 5 "unfair/deceptive" authority (used in the 2023 GoodRx and BetterHelp cases, background knowledge) still applies to misleading privacy claims on the site.
- After *AHA v. Becerra*, GA4 on purely informational public pages (home, "about us", directions) is defensible but not risk-free. GA4 or Meta Pixel on these pages is high-risk: appointment request, symptom checker, intake/contact forms that capture reason for visit, the patient portal, and thank-you/confirmation pages whose URL reveals a service. That is where class actions focus.
- Lowest-risk default for a small clinic: no Meta Pixel or Google tags at all on forms, booking, or portal pages; self-hosted Umami or Plausible CE (on BAA-covered or clinic-controlled infrastructure) for aggregate traffic; no URL query strings containing names, conditions or appointment types; and a consent banner for any remaining marketing tags.
- Because Meta has blocked health-category conversion events since January 2025, a Meta Pixel on a clinic site now brings little ad benefit and keeps the legal risk. That is a strong business argument for removing it.

### Gaps
- I could not read the current text of the OCR bulletin on hhs.gov directly (WebFetch unavailable). Status relies on consistent secondary sources.
- I found no source confirming that Plausible or Umami (cloud or self-hosted) will sign a BAA. Piwik PRO, Freshpaint and similar "HIPAA analytics" vendors with BAAs were not verified in this session.
- I found no OCR monetary penalty specifically for tracking pixels. Exposure is evidenced through class actions only.

## 2. Online forms, PHI, vendor BAAs, self-hosting (homelab) and the HIPAA Security Rule NPRM

### Takeaway
A web form that collects name, date of birth, reason for visit or insurance creates ePHI. Every vendor that stores or processes it (form builder, host or CDN that decrypts traffic, email, CRM, automation, chat, SMS, AI) needs a signed BAA, and the clinic must apply Security Rule safeguards. Of the stack under review:
- **Can be used with PHI under a BAA:** Google Workspace (paid, with BAA accepted), Jotform (Gold/Enterprise with a HIPAA-enabled account), Twilio (Security/Enterprise Edition, eligible products only), Vercel Pro (HIPAA add-on), Netlify Enterprise, Cloudflare Enterprise only, OpenAI (ChatGPT for Healthcare / Enterprise / API with BAA), Anthropic (HIPAA-ready API / Enterprise).
- **Not for PHI:** free Gmail, Cloudflare Free/Pro/Business, Formspree, Tally, n8n Cloud, GitHub, WhatsApp (any form), consumer ChatGPT/Claude, ChatGPT Atlas.
- **Self-host only, with full Security Rule duties:** n8n, Twenty, Chatwoot.

The Security Rule overhaul (NPRM of January 6, 2025) is still not final. Its target slipped to about July 2027. The current rule, especially the risk-analysis requirement OCR keeps enforcing, applies fully.

### Cited Findings
**Email / productivity**
- [Primary] Google's BAA covers named Workspace services, including Gmail, Calendar, Chat, Drive (Docs, Forms, Sheets, Slides), Keep, Meet, Sites, Vault and Voice (managed users), plus Gemini in Workspace but not Gemini in Chrome — [Google Cloud: HIPAA compliance on Google Cloud and Workspace](https://docs.cloud.google.com/docs/security/compliance/hipaa)
- [Secondary] Free @gmail.com accounts and Google Workspace Individual are not covered, and Google does not sign BAAs for consumer accounts. Paid Business Standard/Plus, Enterprise and Education editions are listed as covered, with the BAA accepted by an admin in the Admin console. Marketplace add-ons and browser extensions fall outside the BAA — [AccountableHQ: Workspace](https://www.accountablehq.com/post/is-google-workspace-hipaa-compliant-baa-covered-apps-and-setup-steps); [AccountableHQ: Gmail](https://www.accountablehq.com/post/can-i-use-gmail-for-hipaa-compliance-requirements-risks-and-alternatives); [AccountableHQ: which Google services](https://www.accountablehq.com/post/which-google-services-are-hipaa-compliant-workspace-cloud-and-baa-explained)
- [Secondary] Google states the customer "is solely responsible for ensuring that its and its End Users' use of the Covered Services complies with HIPAA" — [AccountableHQ](https://www.accountablehq.com/post/hipaa-compliance-for-google-workspace-is-it-compliant-and-how-to-set-it-up-baa-security-settings)

**Hosting / CDN / code**
- [Primary] Cloudflare "will only enter into BAAs with its enterprise customers." In-scope services include Cache/CDN, DNS, Load Balancing, Argo, Waiting Room and Zaraz, among others; the full list was truncated in the snippet — [Cloudflare US Privacy Compliance FAQ](https://www.cloudflare.com/trust-hub/us-privacy-compliance/); [Cloudflare Trust Hub HIPAA FAQ](https://www.cloudflare.com/trust-hub/compliance-resources/hipaa/); [Cloudflare HIPAA whitepaper](https://www.cloudflare.com/resources/assets/slt3lc6tev37/3PeVHvuZAh7p3tN77kIfhG/596a459dd1cfbc2ad6b1dbef36ff0eb1/BDES-1265_Privacy_Compliance_Whitepapers_HIPAA.pdf)
- [Secondary] Developers report it is unclear whether Workers, D1 and R2 are covered even on Enterprise. A long-standing community feature request confirms that non-Enterprise customers cannot get a BAA — [AnswerOverflow: Workers](https://www.answeroverflow.com/m/1428298876615655457); [AnswerOverflow: R2](https://www.answeroverflow.com/m/1231995650120613980); [Cloudflare Community](https://community.cloudflare.com/t/support-hipaa-without-an-enterprise-agreement/436612)
- [Primary] Vercel Pro teams can sign a BAA self-serve through the dashboard, with no Enterprise contract required. Pro customers buy the HIPAA add-on under Settings → Billing — [Vercel changelog](https://vercel.com/changelog/hipaa-baas-are-now-available-to-pro-teams); [Vercel HIPAA guide](https://docs.vercel.com/guides/hipaa-compliance-guide-vercel)
- [Secondary] The Vercel add-on is reported at about $350/month on Pro. External databases connected to Vercel are not covered by Vercel's BAA. One consultancy says v0 (Vercel's AI tool) terms bar PHI even with a BAA — [Paubox](https://www.paubox.com/blog/is-vercel-hipaa-compliant); [RapidDevelopers](https://www.rapidevelopers.com/compliance/is-v0-hipaa-compliant)
- [Primary] Netlify announced in August 2024 that Enterprise customers handling PHI can execute a BAA. Confirm the current terms — [Netlify blog](https://netlify.com/blog/netlify-launches-a-hipaa-compliant-service-offering)
- [Secondary] GitHub: several analyses say GitHub signs no BAA on any tier and that its terms forbid sending PHI without prior written consent. Microsoft's BAA does not mention GitHub. One source claims otherwise for Enterprise Cloud, unverified — [RapidDevelopers](https://www.rapidevelopers.com/md/compliance/is-github-copilot-hipaa-compliant); contra [Sonomos](https://sonomos.ai/blog/is-github-copilot-hipaa-compliant-2026/)

**Forms**
- [Primary/Secondary] Jotform signs a BAA only with Gold or Enterprise customers. It applies only to HIPAA-enabled accounts, and other use is "strictly prohibited and not covered." Reported entry price is $99–$129/month, sources conflict — [Jotform HIPAA FAQ (es)](https://www.jotform.com/es/hipaa/faq/); [Jotform Answers](https://www.jotform.com/answers/441335-Is-Jot-Form-HIPAA-compliant); [Paubox](https://paubox.com/blog/is-jotform-hipaa-compliant/); [Formsort](https://formsort.com/article/is-jotform-hipaa-compliant/)
- [Secondary] No source found that Formspree or Tally offer a BAA or HIPAA compliance — [Embeddable: HIPAA form builders 2026](https://embeddable.co/blog/best-hipaa-compliant-online-form-builders); [Activepieces](https://www.activepieces.com/blog/best-jotform-alternatives-in-2026.md)

**Automation / CRM / chat**
- [Secondary] n8n does not offer a BAA for n8n Cloud, which its support team has repeatedly confirmed on the community forum. Self-hosted n8n moves all responsibility to the operator: encryption at rest, audit logging, access controls, and BAAs with every downstream service. Losing the n8n encryption key makes stored credentials unrecoverable — [AccountableHQ: n8n](https://www.accountablehq.com/post/is-n8n-hipaa-compliant-baa-self-hosting-best-practices); [n8n community thread](https://community.n8n.io/t/is-self-hosting-n8n-on-google-cloud-secure-enough-for-healthcare-hipaa-related-automation/296030); [Logic.inc](https://logic.inc/resources/n8n-hipaa-compliant-alternatives); [HostAdvice](https://hostadvice.com/blog/web-hosting/vps/hosting-n8n-in-regulated-industries-gdpr-hipaa/)
- [Secondary] Chatwoot: a directory labels self-hosted Chatwoot "HIPAA Eligible" (a reviewer label, not a certification). The SaaS version is SOC 2 Type II/GDPR, and no evidence was found that Chatwoot Inc. signs BAAs — [The GTM Directory](https://thegtmdirectory.com/tools/chatwoot/md); [Subscribed.fyi](https://subscribed.fyi/chatwoot//deals)
- [Secondary] Twenty CRM: open source and self-hostable. No HIPAA or BAA information found — [Formable](https://formable.app/twenty-crm/); [selfhost.dev](https://selfhost.dev/deploy/twenty/)

**Messaging**
- [Secondary] WhatsApp: multiple sources report that Meta offers no BAA under any WhatsApp plan, including WhatsApp Business and the Business/Cloud API. They cite Meta's Cloud API Hosting Terms as stating Meta is not a business associate, and WhatsApp Business Terms disclaiming suitability for heightened-confidentiality entities. End-to-end encryption does not substitute for a BAA — [LuxSci](https://www.luxsci.com/blog/is-whatsapp-hipaa-compliant/); [AccountableHQ](https://www.accountablehq.com/post/is-whatsapp-hipaa-compliant-best-practices-and-compliance-tips); [Patient Protect](https://patient-protect.com/post/is-whatsapp-hipaa-compliant); [BloomText](https://www.bloomtext.com/is-whatsapp-hipaa-compliant/)
- [Primary] Twilio: HIPAA accounts require Security Edition or Enterprise Edition plus a signed BAA. Only products on Twilio's "HIPAA Eligible Products and Services" list may carry PHI, and signing a BAA alone does not make an application compliant — [Twilio docs: HIPAA Accounts](https://www.twilio.com/docs/iam/twilio-editions/hippa); [Twilio and HIPAA](https://www.twilio.com/en-us/hipaa)
- [Secondary] Programmable Messaging (SMS/MMS) and Voice are reported as HIPAA-eligible. WhatsApp-via-Twilio, SendGrid, AI Assistants and Verify Fraud Guard are reported as not eligible — [Patient Protect](https://patient-protect.com/post/is-twilio-hipaa-compliant); [Paubox](https://paubox.com/blog/twilio-hipaa-compliant/); [Strac](https://www.strac.io/blog/is-twilio-hipaa-compliant); [Twilio HIPAA skill summary (third party)](https://claudeskills.info/skills/twilio/ai/twilio-security-compliance-hipaa/)

**AI**
- [Primary] OpenAI announced "OpenAI for Healthcare" / ChatGPT for Healthcare on January 8, 2026, with a BAA, audit logs and customer-managed encryption keys. Eligible API customers can apply for a BAA — [OpenAI](https://openai.com/index/openai-for-healthcare/)
- [Secondary] BAA-eligible OpenAI products, per an October 2026 guide: ChatGPT for Healthcare, ChatGPT Enterprise (Regulated Workspace), ChatGPT for Clinicians, and the API with modified/zero retention. Not eligible: Free, Plus, Pro and ChatGPT Business. API BAAs cover only zero-data-retention-eligible endpoints. Requests go to baa@openai.com and are reviewed case by case — [Superwise](https://superwise.ai/learn/is-chatgpt-hipaa-compliant/); [AccountableHQ](https://www.accountablehq.com/post/is-openai-hipaa-compliant-current-status-baas-and-secure-alternatives); [Knack](https://www.knack.com/blog/is-chatgpt-hipaa-compliant/)
- [Secondary] ChatGPT Atlas (the consumer AI browser, October 2025): no BAA or HIPAA coverage found. Agent mode runs inside the user's logged-in browser session and is vulnerable to prompt injection that can exfiltrate data, which OpenAI acknowledges. Memories persist across sessions. Researchers recommend disabling memory or using logged-out mode — [Zenity Labs](https://labs.zenity.io/p/exploring-the-risks-of-chatgpt-s-atlas-browser); [HUMAN Security](https://www.humansecurity.com/ai-agent/chatgpt-atlas/); [Adversa](https://airq.adversa.ai/agent/chatgpt-atlas); [Axios](https://www.axios.com/2025/10/21/openai-atlas-what-to-know)
- [Primary] Anthropic's BAA covers its "HIPAA-ready services," such as the Claude API with HIPAA configuration and HIPAA-ready Enterprise plans. These do not require Zero Data Retention. For the API, the BAA is signed through sales, and Anthropic provisions a dedicated HIPAA-enabled organization that blocks non-eligible features. For Claude Code on a Console API key, the BAA applies only with ZDR enabled — [Anthropic Privacy Center](https://privacy.claude.com/en/articles/8956058-is-anthropic-willing-to-sign-a-business-associate-agreement-baa-with-customers-handling-protected-health-information-phi); [Claude Platform docs: API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention.md)
- [Secondary] Unverified secondary claims about Anthropic: the BAA reportedly excludes Workbench, Console, Cowork and beta features. Pre-December 2, 2025 BAAs reportedly cover the API only. Sources conflict on whether Claude Code/Cowork can be BAA-covered — [Aptible](https://aptible.com/hipaa/claude-baa); [IntuitionLabs](https://intuitionlabs.ai/articles/is-claude-hipaa-compliant)

**Security Rule obligations (homelab / self-hosting)**
- [Secondary, quoting 45 CFR 164.308(a)(1)(ii)(A)] Risk analysis is a *required* implementation specification: an "accurate and thorough assessment" of risks to the confidentiality, integrity and availability of ePHI — [AccountableHQ](https://www.accountablehq.com/post/hipaa-security-rule-encryption-and-risk-analysis-for-small-covered-employers); [Open Security Architecture](https://opensecurityarchitecture.org/frameworks/hipaa-sr)
- [Secondary] Contingency plan (164.308(a)(7)): data backup, disaster recovery and emergency-mode operation plans are *required*; testing/revision and criticality analysis are addressable. Technical safeguards (164.312) cover access control, audit controls, integrity, person/entity authentication and transmission security. Encryption is "addressable," which means the entity must implement it, or document an equally effective alternative based on the risk analysis; it is not optional — [Open Exam Prep summary](https://open-exam-prep.com/study-guides/cahims/privacy-security-and-compliance/hipaa-security-rule); [NIU HIPAA Security Rule guidance](https://doit.niu.edu/doit/about/policies/hipaa-security-rule.shtml); [d3rx: 164.306](https://d3rx.com/regulations/hipaa-security-rule-general-rules)
- [Secondary] OCR's Risk Analysis Initiative produced a steady stream of small-entity settlements in 2025:
  - a billing-service business associate paid $75,000 (ransomware; only finding was no accurate risk analysis);
  - BST & Co. CPAs paid $175,000 (August 2025, 15th ransomware action);
  - an Oklahoma EMS provider paid $90,000 (October 2024);
  - Comprehensive Neurology, PC (NY, about 6,800 patients, April 2025) settled for an amount not found.

  Each came with a two-year corrective action plan — [Brach Eichler](https://www.bracheichler.com/insights/ocr-settles-13th-ransomware-enforcement-action?print=pdf); [Hunton](https://www.hunton.com/privacy-and-cybersecurity-law-blog/ocr-announces-settlement-with-neurology-practice-following-ransomware-attack); [Feldesman](https://www.feldesman.com/ocrs-new-security-risk-analysis-initiative-results-in-seven-enforcement-actions-in-first-six-months/); [AccountableHQ Aug 2025](https://www.accountablehq.com/post/ocr-hipaa-settlement-august-2025-key-findings-penalties-and-compliance-lessons)
- [Secondary] 2026 inflation-adjusted HIPAA civil money penalties, effective January 28, 2026 (multiplier 1.02598):
  - per-violation maximum $73,011;
  - calendar-year cap $2,190,294 per identical provision;
  - tier minimums $145 (did not know), $1,461 (reasonable cause), $14,602 (willful neglect, corrected), $73,011 (willful neglect, not corrected).

  HHS's April 2019 enforcement discretion sets lower annual caps for the lower tiers — [Mercer](https://www.mercer.com/insights/law-and-policy/hhs-adjusts-2026-hipaa-certain-aca-and-msp-monetary-penalties/); [Prospyr](https://prospyrmed.com/blog/post/hhs-raises-hipaa-violation-penalties-effective-january-28-2026); [PolicyRisk / FR 2026-01688](https://policyrisk.com/federal-register/2026-01688)

**Security Rule NPRM status**
- [Secondary] The NPRM was published January 6, 2025, and comments closed March 7, 2025. As of September–October 2026 no final rule has been published. OCR is reviewing more than 4,700 comments, and more than 100 provider groups asked HHS to withdraw it. The federal regulatory agenda now lists final action for about July 2027 (previously May 2026). If finalized, it would take effect 60 days after publication, with most compliance 180 days after that. The current Security Rule remains fully enforced — [Pact-One (Sept 2026)](https://www.pact-one.com/2026/09/hipaa-security-rule-2026-status/); [HIPAA Journal](https://www.hipaajournal.com/hipaa-security-rule-update-postponed/); [HIPAA Journal updates](https://www.hipaajournal.com/hipaa-updates-hipaa-changes/); [BeefedUpIT](https://www.beefedupit.com/blog/hipaa-security-rule-proposed-changes/); [Medcurity](https://medcurity.com/hipaa-security-rule-2026-update/)

**Website privacy notice**
- [Secondary] Notice of Privacy Practices: covered entities had to update NPPs by February 16, 2026 for the revised 42 CFR Part 2 (SUD records) rule, which affects all covered entities, not only Part 2 programs. The reproductive-health privacy rule was vacated by a federal court in June 2025, but the Part 2-related NPP changes remain — [Proskauer](https://www.proskauer.com/blog/upcoming-hipaa-compliance-deadline-hipaa-notice-of-privacy-practices-updates-required-by-february-16); [Dykema](https://www.dykema.com/news-insights/new-part-2-compliance-deadline-for-npp-updates-healthcare-organizations-must-revise-privacy-notices-by-february-16-2026.html); [Hall Render](https://hallrender.com/2026/02/26/important-deadlines-for-hipaa-covered-entities-and-part-2-programs/); [Brach Eichler](https://www.bracheichler.com/insights/healthcare-providers-must-update-their-notice-of-privacy-practices-by-february-16-2026/)

### Inferences
**Tool verdicts for PHI** (inferred from the findings above; verify each contract before go-live)

| Tool | PHI allowed? | Condition / note |
|---|---|---|
| Google Workspace (paid Business Standard+ or Enterprise) | Yes | Admin must accept the BAA; use only covered services; turn off non-covered add-ons. Suitable for receiving form notifications and storing intake PDFs |
| Plain @gmail.com | No | No BAA. Never route form submissions or patient email to it |
| Cloudflare Free/Pro/Business | No PHI through proxied (orange-cloud) traffic | BAA is Enterprise-only. Fine for DNS and for proxying public marketing pages with no PHI |
| Cloudflare Enterprise | Yes, covered services only | Workers/R2/D1 coverage unclear |
| Vercel Pro + HIPAA add-on, Vercel Enterprise | Yes | About $350/mo add-on; connected DBs need their own BAA; no PHI in v0 |
| Netlify | Enterprise only | |
| GitHub | No | Keep PHI and real patient data out of repos, issues and Actions logs |
| Jotform Gold/Enterprise, HIPAA-enabled | Yes | Good option for intake/appointment forms |
| Formspree, Tally | No | No BAA found |
| n8n Cloud | No | |
| n8n self-hosted | Possible | Only on BAA-covered or clinic-controlled, Security-Rule-compliant infrastructure, with every connected service under a BAA |
| Twenty CRM, Chatwoot | Self-hosted only | Same conditions as n8n self-hosted; Chatwoot SaaS has no BAA found |
| WhatsApp (app, Business app, Cloud API, or via Twilio/BSPs) | No | Use only for generic, non-PHI messages, e.g. "call us," hours, address, or with the patient's informed choice (see Section 5) |
| Twilio SMS/Voice | Yes | Security/Enterprise Edition + BAA |
| Twilio SendGrid, Twilio WhatsApp | No | |
| OpenAI ChatGPT for Healthcare / Enterprise (regulated) / API with BAA | Yes | |
| ChatGPT Free/Plus/Pro/Business, ChatGPT Atlas | No | |
| Anthropic API (HIPAA-enabled org) / HIPAA-ready Enterprise | Yes | |
| Consumer Claude plans | No (inferred) | |

**Architecture and hosting**
- **Cloudflare architecture inference.** When Cloudflare proxies a site, it terminates TLS and can see form submissions in clear text. Proxying a PHI form on a non-Enterprise plan would therefore put PHI in a vendor without a BAA. Practical workarounds:
  - embed the form from the BAA-covered vendor's own domain (e.g., a Jotform HIPAA iframe), so data goes browser → vendor directly;
  - or serve the form endpoint from a DNS-only (grey-cloud) host covered by a BAA.
- **HHS background (background knowledge).** HHS's 2016 cloud-computing guidance treats a cloud provider that stores or maintains ePHI as a business associate even if the data is encrypted and the provider has no key. The "conduit" exception covers only transmission-only services such as ISPs.
- **Homelab hosting of PHI.** Legally possible, but the clinic becomes its own "cloud provider" and must document and maintain at least the following (based on the cited Security Rule elements and background knowledge of the 164.308/310/312 structure):
  - a written risk analysis and risk-management plan;
  - unique user IDs, MFA and role-based access;
  - audit logs that are actually reviewed;
  - encryption at rest (full-disk/database) and in transit (TLS);
  - automatic logoff;
  - patching and vulnerability management;
  - offsite, encrypted, tested backups and a disaster-recovery and emergency-mode plan;
  - physical safeguards: locked room/rack, and device and media disposal;
  - workforce training and sanctions;
  - incident response and breach notification procedures;
  - BAAs with any ISP or backup service that stores data.

  The OCR Risk Analysis Initiative cases show that the missing or stale risk analysis is what turns a ransomware incident into a $75k–$175k+ settlement. For a small clinic, BAA-covered SaaS (Jotform + Workspace + EHR portal) is usually lower risk than a homelab.
- **If the NPRM is finalized as proposed (background knowledge),** encryption and MFA would become mandatory rather than addressable. It would also require an asset inventory and network map, annual compliance audits, vulnerability scanning and penetration testing, and 72-hour restoration capability. Building to these now is prudent future-proofing, though not yet legally required.

**Website and form hygiene**
- The website should link to the current NPP. Posting the NPP on the website of a covered entity that maintains one is required by 45 CFR 164.520(c)(3)(i) (background knowledge, not re-verified this session).
- **Minimum-necessary form design:** collect only what booking needs, e.g. name, phone, preferred time, and a brief reason with a "do not include detailed medical history" note. Send notification emails without PHI in the body ("New request received — log in to view"). Never put PHI in URL parameters. Add a consent/acknowledgment checkbox and links to the NPP and the website privacy policy.

### Gaps
- Exact current Jotform pricing, and whether Jotform's Silver plan now includes HIPAA, are unconfirmed.
- I could not confirm whether Google Workspace Business Starter is covered by Google's BAA. Sources listed Standard and above.
- I could not read Meta's primary WhatsApp Business / Cloud API terms; the search budget ran out. The "Meta is not a business associate" clause is reported only by secondary sources.
- I found no primary Netlify page dated 2025–2026, and nothing on Chatwoot/Twenty vendor BAAs. GitHub's position is conflicting in secondary sources.
- The dollar amount for the Comprehensive Neurology settlement was not found.

## 3. Accessibility: HHS Section 504 rule (WCAG 2.1 AA) and ADA Title III lawsuit risk

### Takeaway
The May 2024 HHS Section 504 rule requires WCAG 2.1 AA websites, apps and online forms for any recipient of HHS financial assistance, which includes a clinic that accepts Medicaid, CHIP or Medicare Part B. On May 11, 2026, an interim final rule pushed the compliance dates back one year: **May 11, 2027** for recipients with 15 or more employees and **May 10, 2028** for those with fewer. The standard and the underlying non-discrimination duty did not change. Separately, any private clinic faces ADA Title III website suits: 3,117 federal filings in 2025, up 27%.

### Cited Findings
- [Primary] The HHS OCR interim final rule (91 FR 25496, Federal Register May 11, 2026, doc. 2026-09266) extends the web content and mobile app compliance dates adopted in May 2024. Recipients with 15 or more employees move from May 11, 2026 to May 11, 2027. Recipients with fewer than 15 move from May 10, 2027 to May 10, 2028 — [Federal Register](https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web); [Duane Morris](https://www.duanemorris.com/alerts/health_human_services_follows_department_justices_lead_extends_section_504_web_mobile_0526.html); [Baker Donelson](https://bakerdonelson.com/hhs-extends-web-and-mobile-accessibility-compliance-deadlines); [Converge Accessibility](https://convergeaccessibility.com/2026/05/11/hhs-delays-504-rule/)
- [Secondary] The technical standard remains WCAG 2.1 Level AA, and the substantive scope is unchanged. The extension does not relieve recipients of other Section 504 obligations; the broader duty of nondiscriminatory digital access has applied since July 8, 2024. HHS followed DOJ's April 2026 extension of the ADA Title II web rule. It was announced around May 7, 2026, four days before the original date — [Pivotal Accessibility](https://www.pivotalaccessibility.com/2026/06/hhs-section-504-web-accessibility-deadline-extended/); [AccessiBe](https://accessibe.com/blog/knowledgebase/hhs-extends-the-section-504-deadline-what-healthcare-organizations-need-to-know); [Silktide](https://silktide.com/blog/the-section-504-deadline-moved/); [JD Supra](https://www.jdsupra.com/legalnews/hhs-extends-web-and-mobile-1896333/)
- [Secondary, unconfirmed] One source reports a May 2026 National Federation of the Blind lawsuit challenging the federal accessibility deadline delays. It is not corroborated — [ADAScanPro](https://adascanpro.com/blog/hhs-section-504-web-accessibility-deadline-2027)
- [Secondary] In its 2024 rulemaking, HHS reversed its roughly 40-year position and now treats Medicare Part B payments as federal financial assistance under all the civil-rights statutes it enforces: Title VI, Section 504, Title IX, the Age Act and Section 1557. Part B-only providers had until May 6, 2025 — [McDermott](https://www.mwe.com/?p=277219); [CRS Legal Sidebar LSB10860](https://www.everycrsreport.com/reports/LSB10860.html); [Bass Berry](https://www.bassberry.com/news/compliance-deadlines-for-new-section-1557-nondiscrimination-rules/)
- [Secondary] ADA Title III website lawsuits: 3,117 federal website-accessibility suits in 2025, up 27% from 2,452 in 2024 and 36% of all federal Title III suits (8,667), per Seyfarth Shaw data. More than 5,000 digital-accessibility suits including state courts, per UsableNet. Filings expanded into healthcare in 2025. WCAG 2.1 AA is the de facto standard courts use. Remedies include injunctive relief and attorneys' fees, plus damages in states like California — [Level Access](https://www.levelaccess.com/blog/web-accessibility-lawsuits); [BeAccessible](https://beaccessible.com/post/americans-with-disabilities-act-statistics/)

### Inferences
- If the clinic bills Medicare (including Part B) or Medicaid, it is an HHS "recipient" and the 504 web rule applies. A small clinic with fewer than 15 employees has until **May 10, 2028**; with 15 or more, until **May 11, 2027**. This needs the clinic's head-count to determine which.
- The deadline is not a safe harbor. ADA Title III exposure exists now: demand letters, injunctions and attorneys' fees. Utah has no Unruh-style state damages statute (background knowledge), so exposure is mainly federal fees and settlements.
- Practical checklist, all part of WCAG 2.1 AA:
  - forms with programmatic labels, error messages and no CAPTCHA-only gates;
  - keyboard operability and visible focus;
  - 4.5:1 color contrast;
  - alt text;
  - captions on videos;
  - accessible PDFs (or HTML instead of PDF intake forms);
  - a `lang="es"` attribute on Spanish pages;
  - an accessibility statement with a contact method.

  Third-party embeds (booking widgets, Jotform, chat widgets) must also be accessible, because the clinic is responsible for them.
- Avoid relying on accessibility "overlay" widgets as the compliance strategy (background knowledge: overlays are frequently cited in lawsuits and criticized by disability advocates).

### Gaps
- I could not verify the NFB lawsuit.
- I found no Utah-specific accessibility statute or case data, and no healthcare-specific count of ADA website suits.

## 4. Language access: ACA Section 1557 (2024 rule), Spanish website/forms and machine translation

### Takeaway
A clinic accepting Medicare Part B, Medicaid or other HHS funds is a Section 1557 covered entity. Since **July 5, 2025** it must provide an annual Notice of Availability of free language assistance and auxiliary aids, posted prominently in the clinic and on the website. The notice must be in English and at least the 15 languages most common among LEP people in Utah (45 CFR 92.11). Machine translation of anything critical (rights, consent, clinical or technical content) must be reviewed by a qualified human translator (92.201(c)(3)). The June 2, 2026 vacatur notice removed only the gender-identity provisions; the language-access provisions remain in force.

### Cited Findings
- [Secondary] The 2024 rule replaced "taglines" with a Notice of Availability. It is similar to the old tagline requirement but adds auxiliary aids and services. It must be provided annually and displayed prominently, physically and online, in English and at least 15 languages common among LEP individuals in the state (45 CFR 92.11(b)). Compliance date was July 5, 2025 — [Morgan Lewis](https://www.morganlewis.com/blogs/healthlawscan/2025/01/affordable-care-act-section-1557-new-language-accessibility-requirements); [National Health Law Program explainer](https://healthlaw.org/wp-content/uploads/2024/05/2025_12_11_T-VI-and-Sec-1557-explainer-2025-update.pdf); [Propio](https://propio.com/blog/compliance-taglines-and-notices-of-nondiscrimination-whats-now-required/)
- [Secondary] Entities in several states must reflect each state's top languages. HHS points to lep.gov and Census ACS data for determining them — [Morgan Lewis](https://morganlewis.com/blogs/healthlawscan/2025/01/affordable-care-act-section-1557-new-language-accessibility-requirements); [HHS LEP fact sheet](https://www.hhs.gov/civil-rights/for-individuals/section-1557/fs-limited-english-proficiency/index.html?utm_id=289); [McDermott: HHS letter on language access](https://www.mwe.com/?p=296805)
- [Primary] Under 45 CFR 92.201(c)(3), if a covered entity uses machine translation, a qualified human translator must review it when the content is critical to rights, benefits or meaningful access, when accuracy is essential, or when the source contains complex, non-literal or technical language — [eCFR 45 CFR 92.201](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201); [Syfert copy](https://syfert.com/cfr/sections/45-92.201.html)
- [Secondary] Many healthcare documents likely meet at least one of those criteria, so raw AI translation without review may not comply. Documenting which items were human-reviewed is the practical challenge — [Sheppard Mullin](https://www.sheppard.com/insights/blogs/ai-in-healthcare-translation-and-interpretive-services-what-covered-entities-need-to-know); [Dynamic Language](https://blog.dynamiclanguage.com/the-machine-translation-guardrail-in-section-1557-proving-which-content-a-human-reviewed)
- [Primary] The June 2, 2026 Federal Register "Notice of Vacatur" (91 FR 32887, doc. 2026-11015, CMS/OCR) implements an October 22, 2025 Mississippi court vacatur of the provisions expanding sex discrimination to gender identity. "The other provisions of the Section 1557 Rule remain in force." The listed sections (e.g., 92.101(a)(2)(iv), 92.206(b), 92.207(b)(3)-(5)) do not include 92.11 or 92.201 — [Federal Register](https://www.federalregister.gov/documents/2026/06/02/2026-11015/notice-of-vacatur-regarding-certain-provisions-of-the-2024-nondiscrimination-in-health-programs-and); [GovInfo PDF](https://www.govinfo.gov/content/pkg/FR-2026-06-02/pdf/2026-11015.pdf); [Hylant](https://hylant.com/insights/blog/key-section-1557-nondiscrimination-provisions-permanently-vacated-following-court-rulings)
- [Secondary] Medicare Part B counts as federal financial assistance, so physician practices that accept Part B are covered, and the rule applies to all of their patients — [PolicyMed](https://policymed.com/2024/06/summary-of-section-1557-of-the-affordable-care-act-and-application-for-health-systems-medical-practices-and-clinical-research.html); [DWT](https://www.dwt.com/insights/2024/07/healthcare-providers-prepare-for-section-1557-rule); [Bass Berry](https://www.bassberry.com/news/compliance-deadlines-for-new-section-1557-nondiscrimination-rules/)
- [Secondary] No reporting was found on OCR enforcement actions or penalties tied specifically to the Notice of Availability — [search result summary; see Morgan Lewis above](https://www.morganlewis.com/blogs/healthlawscan/2025/01/affordable-care-act-section-1557-new-language-accessibility-requirements)

### Inferences
- **Website must-dos for a covered clinic:**
  - a footer link, on every page or at least the home page, to the Notice of Availability in English + Spanish + the other 13+ Utah top languages;
  - the Notice of Nondiscrimination (92.10, background knowledge);
  - a plain statement in Spanish such as "Ofrecemos intérpretes y traducción gratis" near phone numbers and forms.
- **Spanish best practice:**
  - a real Spanish version of the site (not just a Google Translate widget), with its own `/es/` URLs and `hreflang`, and `lang="es"`;
  - Spanish intake and appointment forms, with error messages and confirmation emails/SMS in Spanish;
  - bilingual staff or an interpreter line advertised;
  - human review by a qualified translator of anything about consent, privacy (NPP), financial policies, clinical instructions or forms;
  - AI translation is acceptable only for low-stakes marketing copy, and even then human review is prudent;
  - keep a log of which pages were human-reviewed and when, to meet the documentation challenge noted by Dynamic Language.
- Under the 2024 rule, covered entities with 15+ employees must designate a Section 1557 coordinator and adopt written language-access and effective-communication policies (92.7/92.8, background knowledge, not re-verified this session).
- Even if federal enforcement posture softened in 2025–2026, the regulation remains in force, and private plaintiffs and future administrations can rely on it. Spanish access is also a clear business advantage for a clinic with many Spanish-speaking patients.

### Gaps
- **Utah's specific top-15 LEP language list** was not found. Get it from lep.gov or HHS OCR's state-language resources; Spanish will certainly be #1.
- **Federal posture under Executive Order 14224** (March 2025, English as official language) and any rescission of HHS or DOJ LEP guidance were not verified, because the search budget was exhausted. This affects enforcement likelihood, not the text of 45 CFR 92.11/92.201, which remains in force per the June 2026 notice.

## 5. Messaging and marketing: TCPA/texting consent, Google Ads health policies, review responses, testimonials

### Takeaway
- **Texting.** Appointment-reminder texts can rely on the TCPA's healthcare exemption: a HIPAA "treatment" purpose, to the number the patient provided, short, at most 1 per day and 3 per week, no marketing or billing content, opt-out honored. Marketing texts need prior express written consent. The FCC's one-to-one consent rule was vacated in January 2025. An October 1, 2026 FCC order rewrote the "revoke-all" opt-out rule so an opt-out can be limited to a message category such as appointment reminders.
- **Advertising.** Google Ads bars remarketing or audience targeting based on health conditions. Meta has blocked health conversion events since January 2025.
- **Reviews.** Replying to online reviews with any patient detail has produced OCR penalties of $10,000–$50,000.
- **Testimonials.** Fake or incentivized reviews and testimonials are prohibited by the FTC's Consumer Review Rule, in force since October 21, 2024.

### Cited Findings
**TCPA / texting**
- [Secondary] The FCC's 2015 healthcare exemption covers appointment reminders and similar care messages to wireless numbers. Conditions: 160 characters or less, no more than 1 per day and 3 per week, no billing or marketing content, immediate opt-out. Sources conflict on the codified citation, 47 CFR 64.1200(a)(9)(iv) vs (a)(3)(v), so verify against eCFR — [LeadCompliant](https://leadcompliant.com/articles/tcpa-basics/tcpa-healthcare-exemption); [Arbol](https://www.getarbol.com/en/blog/tcpa-appointment-reminders-compliance/); [Revelrex](https://revelrex.com/blog/texting-patients-appointment-reminders-tcpa-and-hipaa-rules-for-medical-practices); [iChelon](https://ichelonconsulting.com/insights/tcpa-texting-calling-compliance-us-healthcare-2026)
- [Secondary] The 11th Circuit (*Insurance Marketing Coalition v. FCC*, January 24, 2025) vacated the FCC's one-to-one consent rule as exceeding the TCPA. Consent must be voluntary, clearly stated and given before the call. The court did not decide the separate "written" consent question — [MoFo](https://mofo.com/resources/insights/250130-eleventh-circuit-vacates-fcc-s-tcpa-one-to-one-consent-rule); [Perkins Coie](https://perkinscoie.com/insights/update/fccs-one-one-consent-rule-vacated-whats-next-tcpa-compliance); [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/eleventh-circuit-vacates-tcpa-11-consent-rule)
- [Secondary] FCC Report and Order of October 1, 2026 (FCC 26-67) narrowed the "revoke all" rule. For informational robocalls and robotexts, an opt-out may be treated as applying only to the category of messages where it was given, and appointment reminders are named as a category. Callers may designate one exclusive opt-out channel: an automated voice/keypress mechanism, a standardized text keyword such as STOP, or a designated website/phone number. The FCC sought comment on shorter compliance deadlines. An earlier guide said the revoke-all requirement had been delayed to January 31, 2027; confirm the effective date against the order — [Nixon Peabody (Oct 7, 2026)](https://www.nixonpeabody.com/insights/alerts/2026/10/07/fcc-scraps-revoke-all-and-lets-businesses-pick-how-consumers-opt-out); [Womble Bond Dickinson](https://www.womblebonddickinson.com/us/insights/insights/102o48j/fcc-narrows-the-tcpa-revoke-all-rule-permits-exclusive-opt-out-methods-and-se); [Consumer Financial Services Law Monitor](https://www.consumerfinancialserviceslawmonitor.com/2026/09/fcc-overhauls-tcpa-revocation-rules-before-they-even-take-effect/); [mPulse](https://mpulse.com/blog/navigating-the-new-fcc-tcpa-consent-revocation-rules-an-in-depth-guide-for-healthcare-organizations/)

**Ads platforms**
- [Secondary] Google Ads' personalized advertising policy treats health as a sensitive category. Advertisers may not target users based on personal health conditions or treatments, so no remarketing lists built from treatment-page visitors. A May 2025 clarification lets campaigns targeting licensed healthcare professionals in their professional capacity use Remarketing and Customer Match, extended in July 2025 to "Restricted drug terms" with guardrails — [Accelerated Digital Media](https://www.accelerateddigitalmedia.com/insights/how-create-compliant-google-healthcare-ads); [ADM July 2025 update](https://www.accelerateddigitalmedia.com/insights/google-health-advertising-update-july-2025/); [OuterBox](https://www.outerboxdesign.com/articles/digital-marketing/health-and-wellness-advertising-restrictions-on-google-ads-keeping-your-campaigns-compliant/)
- [Secondary] Meta has restricted health and wellness advertisers' lower-funnel events since January 1, 2025 (see Section 1) — [Ours Privacy](https://oursprivacy.com/blog/meta-changes-to-data-policy)

**Review responses: OCR enforcement**
- [Secondary] Elite Dental Associates (Dallas) settled with OCR in 2019 for $10,000 plus a two-year corrective action plan. It had disclosed a patient's last name, treatment plan and cost in Yelp review replies, and disclosed other patients' PHI the same way. OCR also found no social-media PHI policies and no compliant NPP — [Thomson Reuters](https://tax.thomsonreuters.com/blog/covered-entity-pays-10000-hipaa-settlement-after-disclosing-phi-in-response-to-social-media-review); [AFS Law](https://www.afslaw.com/perspectives/health-care-counsel-blog/disclosing-patient-information-responses-online-reviews)
- [Secondary] A North Carolina dental practice (Dr. U. Phillip Igbinadolor) received a $50,000 civil money penalty for disclosing PHI in reply to a 2015 Google review, after ignoring OCR's data requests and subpoena. New Vision Dental paid $23,000 plus a two-year CAP for review-reply disclosures. The common pattern: reviewers used pseudonyms, and the practice's reply added the identifying PHI — [DLA Piper](https://dlapiper.com/insights/publications/2023/01/hipaa-settlement-highlights-the-importance-of-caution-in-responding-to-negative-online-reviews); [SC World](https://www.scworld.com/analysis/compliance/dental-practices-response-to-negative-review-among-four-hipaa-enforcement-actions-by-ocr); [TechTarget](https://www.techtarget.com/healthtechsecurity/news/366594828/OCR-Announces-Four-HIPAA-Enforcement-Actions); [AccountableHQ 2023 roundup](https://www.accountablehq.com/post/2023-ocr-settlement-roundup)

**Fake reviews and testimonials: FTC rule**
- [Secondary] The FTC Consumer Reviews and Testimonials Rule (16 CFR Part 465) took full effect October 21, 2024. It bans:
  - creating, buying or disseminating fake reviews and testimonials, including AI-generated ones or those by people with no real experience, when the business knew or should have known;
  - conditioning compensation or incentives on positive (or negative) reviews;
  - company-controlled "independent" review sites;
  - review suppression, except under neutral criteria.

  Civil penalties were reported at up to $51,744 per violation (2024 figure; current inflation-adjusted figure not verified). The FTC sent warning letters using a template dated December 22, 2025 — [Hogan Lovells](https://www.hoganlovells.com/en/publications/ftc-publishes-final-rule-banning-fake-consumer-reviews-and-testimonials); [Mondaq](https://mondaq.com/unitedstates/advertising-marketing-branding/1506460/ftc-finalizes-rule-prohibiting-fake-reviews-and-testimonials); [ETCentric](https://www.etcentric.org/ftc-rule-prohibiting-fake-and-paid-reviews-goes-into-effect/); [FTC 2025 warning template](https://search.ftc.gov/system/files/ftc_gov/pdf/2025-Fake-Review-Warning-Template.pdf)

### Inferences
- **SMS reminders:**
  - capture the mobile number and an SMS consent checkbox at intake, in English and Spanish;
  - keep reminders minimal, e.g. "Recordatorio: cita mañana 10:00 en [clínica]. Responda STOP para cancelar mensajes", with no diagnosis or visit reason;
  - send via a BAA-covered SMS provider (Twilio Security/Enterprise Edition, or the EHR/PM system's built-in texting with a BAA);
  - honor STOP immediately and per category;
  - keep marketing texts (promotions, newsletters, review requests) separate, under prior express written consent.

  Background knowledge, not re-verified: HHS FAQs allow unencrypted texts or emails if the patient is told the risk and prefers that channel.
- **WhatsApp:** because Meta signs no BAA, use WhatsApp only for non-PHI, generic communication, or when a patient has initiated contact there and been informed of the risk, and move clinical details to a BAA-covered channel. No intake forms, lab results or insurance cards via WhatsApp.
- **Google Ads:** standard search campaigns on service keywords are fine. No remarketing audiences from appointment or condition pages, no Customer Match uploads of patient lists, no conversion tags that pass form contents. Track conversions with no PHI (e.g., a "call clicked" event, or offline conversion counts without identifiers).
- **Review replies:** use a template that never confirms the person is a patient. Example: "Gracias por sus comentarios. Por respeto a la privacidad de nuestros pacientes no podemos comentar casos específicos; por favor llámenos al ...". Adopt a written social-media/review policy and train staff, since a missing policy was itself an OCR finding.
- **Testimonials:**
  - use a real patient's testimonial, name, photo or story only with a HIPAA-compliant written authorization (marketing authorization, 45 CFR 164.508(a)(3), background knowledge);
  - disclose any incentive (FTC Endorsement Guides, background knowledge);
  - never post AI-generated or staff-written "patient" reviews;
  - review-request campaigns must ask all patients, not only happy ones, and not offer incentives tied to positive sentiment.

### Gaps
- I did not read the primary FCC 26-67 text or the eCFR text of the healthcare exemption. The final effective dates for revocation-rule changes need confirmation.
- I did not retrieve Google's primary "Healthcare and medicines" and "Personalized advertising" policy pages, including LegitScript certification triggers, e.g. addiction treatment or online pharmacy; that is background knowledge only.
- I found no 2024–2026 OCR review-reply actions beyond those listed; there may be newer ones.
- The current inflation-adjusted FTC civil penalty figure was not verified.

## 6. Utah-specific: Consumer Privacy Act, breach notification, AI disclosure, runner/solicitation rules

### Takeaway
- **UCPA:** does not apply to the clinic. It is exempt at entity level as a HIPAA covered entity, and would also fall below the $25M revenue threshold.
- **Breach notification:** Utah's law (Utah Code 13-44-202) does apply. It requires notice to affected Utah residents, plus the Attorney General and Utah Cyber Center at 500 or more residents, and consumer reporting agencies at 1,000 or more.
- **AI disclosure:** a Utah-specific rule matters for chatbots. The Utah AI Policy Act, as amended by SB 226 (effective May 7, 2025), requires licensed healthcare providers to disclose up front when a patient is interacting with generative AI in "high-risk" interactions (collecting health data, giving medical advice).
- **Solicitation:** Utah's Insurance Fraud Act prohibits using "runners, cappers or steerers" for fraudulent insurance claims, and accident reports are confidential with restricted access. I found no Utah statute imposing a specific waiting period on providers soliciting accident victims.

### Cited Findings
**Utah Consumer Privacy Act (Utah Code 13-61)**
- [Secondary] The UCPA applies only to controllers/processors with annual revenue of $25M or more AND either (a) personal data of 100,000+ Utah consumers per year, or (b) more than 50% of revenue from selling personal data plus data of 25,000+ consumers — [Privacy Rights Clearinghouse](https://www.privacyrights.org/resources-tools/law-overviews/utah-consumer-privacy-act); [Baker Donelson Utah guide](https://www.bakerdonelson.com/webfiles/Privacy_Guide/Utah-Privacy-Law-Guide.pdf); [Enzuzo](https://www.enzuzo.com/blog/utah-consumer-privacy-act-ucpa)
- [Secondary] HIPAA covered entities and business associates are exempt as whole organizations. One guide calls this the broadest health exemption among states. HB 418 (2025) adds a right to correct, effective July 1, 2026, and sources conflict on related bill numbers — [AccountableHQ: UCPA vs HIPAA](https://www.accountablehq.com/post/utah-consumer-privacy-act-vs-hipaa-covered-entity-exemptions-gray-areas-checklist); [AccountableHQ: exemption](https://www.accountablehq.com/post/utah-consumer-privacy-act-hipaa-covered-entity-exemption-requirements-explained); [PrivacyLawMap](https://privacylawmap.com/blog/utah-consumer-privacy-act-guide)

**Utah breach notification (Utah Code 13-44-202)**
- [Primary] Once an investigation finds misuse of personal information, or that misuse is reasonably likely, the entity must notify each affected Utah resident. If 500 or more Utah residents are affected, it must also notify the Office of the Attorney General and the Utah Cyber Center (created in 63A-16-1102). At 1,000 or more, it must also notify nationwide consumer reporting agencies. The regulator notice must include breach dates, discovery date, total and Utah counts, data types and a short description. A waiver of the section is void — [Utah Code 13-44-202 (eff. 5/1/2024)](https://le.utah.gov/xcode/Title13/Chapter44/C13-44-S202_2024050120240501.pdf); [Utah Cyber Center: Report a Breach](https://cybercenter.utah.gov/Report-a-Breach); [2024 S.B. 98](https://le.utah.gov/~2024/bills/sbillamd/SB0098S03.htm)

**Utah AI Policy Act (SB 149, 2024; SB 226, 2025)**
- [Secondary] SB 226 (effective May 7, 2025) narrows disclosure duties to two cases: a clear consumer request asking whether they are talking to AI, and "high-risk" interactions in regulated occupations. Regulated occupations are those licensed by the Utah Department of Commerce, including numerous healthcare professions. High-risk interactions include collecting sensitive personal information such as health data, and giving personalized medical or mental-health advice that individuals may rely on for significant decisions. The disclosure must come at the start of the interaction, verbally or in writing. Utah also enacted mental-health-chatbot rules (HB 452, 2025) — [Perkins Coie](https://perkinscoie.com/insights/update/new-utah-ai-laws-change-disclosure-requirements-and-identity-protections-target); [Davis Wright Tremaine](https://www.dwt.com/blogs/artificial-intelligence-law-advisor/2025/04/utah-regulation-ai-policy-mental-health-chatbots); [Future of Privacy Forum overview](https://fpf.org/wp-content/uploads/2025/04/Overview-of-Utahs-2025-Enacted-AI-Legislation.pdf); [Sheppard Mullin](https://www.sheppard.com/insights/blogs/utah-enacts-ai-amendments-targeted-at-mental-health-chatbots-and-generative-ai)

**Runners, solicitation and accident reports**
- [Primary/Secondary] Utah Insurance Fraud Act: 31A-31-102 defines a "runner" (including a capper or steerer) as a person who recruits clients for someone seeking insurance benefits or asserting claims. Under 31A-31-103, knowingly employing, using or acting as a runner to commit a fraudulent insurance act is itself a fraudulent insurance act. Service providers, including health-care providers, also commit fraud by knowingly billing substantially excessive or unnecessary charges — [Justia 31A-31-103 (2025)](https://law.justia.com/codes/utah/title-31a/chapter-31/section-103/); [Justia 31A-31-102](https://law.justia.com/codes/utah/2010/title31a/31a-31-102.html); [Utah Code Ch. 31A-31](https://le.utah.gov/xcode/Title31A/Chapter31/C31A-31_1800010118000101.pdf); [2004 HB 171](https://le.utah.gov/~2004/bills/hbillenr/HB0171.pdf)
- [Primary] Utah accident reports (41-6a-404, version effective May 7, 2025) are confidential. Access is limited to involved or injured persons and their agents: an engaged attorney, the insurer, a qualifying ER hospital that treated the person, or anyone with signed permission. Otherwise reports are released only in statistical form. 2023 S.B. 246 would have barred using accident-report information to market services to people involved; enactment not confirmed — [Utah Code 41-6a-404 (eff. 5/7/2025)](https://le.utah.gov/xcode/Title41/Chapter6A/C41-6a-S404_2025050720250507.pdf); [2023 S.B. 246 enrolled](https://le.utah.gov/~2023/bills/sbillenr/SB0246.pdf); [Utah Code 41-12a-202](https://le.utah.gov/xcode/Title41/Chapter12a/C41-12a-S202_1800010118000101.pdf)
- [Secondary] No Utah rule specifically banning chiropractors or other providers from soliciting accident victims was found in search. Utah's general unprofessional-conduct rule (R156-1-501) and the chiropractic rule (R156-73-501) exist, but their solicitation text was not retrieved — [Cornell LII R156-1-501](https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R156-1-501); [Justia R156-73](https://regulations.justia.com/states/utah/commerce/title-r156/rule-r156-73)

### Inferences
- **UCPA:** the website privacy policy does not need UCPA-specific rights language for the clinic's HIPAA activities. A short general website privacy policy (cookies, analytics, contact forms, SMS) is still good practice, and FTC Act deception risk applies if it misstates practices.
- **Breach:** a breach at the clinic triggers HIPAA notifications (individuals within 60 days; HHS; media if more than 500 in a state — background knowledge) and Utah 13-44 notifications. Utah's own definition of "personal information" (name + SSN, financial account, driver's license — background knowledge) may not cover every HIPAA breach, but the AG and Cyber Center notice at 500+ should be planned for. Use the Cyber Center form, which notifies both bodies.
- **AI chatbot:** any website chatbot or AI-assisted WhatsApp/SMS triage that collects symptoms or gives health information must, under Utah law:
  - say clearly at the start, in English and Spanish, that the user is interacting with AI;
  - also answer truthfully if asked.

  Under HIPAA, it must run on a BAA-covered AI service (OpenAI or Anthropic healthcare/API tiers, not consumer apps). The repeal or sunset date of the UAIPA after SB 226 was not confirmed; it was reportedly extended to 2027, which needs checking.
- **Runners and PIP marketing:** if the clinic markets to auto-injury (PIP) patients (background knowledge: Utah is a no-fault state with $3,000 minimum PIP under Utah Code 31A-22-307):
  - never pay or accept "runners" or referral fees for accident victims;
  - do not obtain or use accident reports for outreach;
  - avoid cold-calling or texting accident victims, which also carries TCPA and Utah telephone-solicitation-law exposure;
  - keep PIP billing strictly to medically necessary, customary charges.

  Advertising generally ("¿Accidente de auto? Le atendemos") is lawful. Unsolicited targeted outreach is the risk area.

### Gaps
- I did not confirm the current UAIPA sunset date after SB 226/SB 332.
- I did not confirm whether 2023 S.B. 246 (accident-report marketing ban) passed.
- I found no Utah statute or DOPL rule specifically limiting health-care-provider solicitation of accident victims; R156-73-501 text was not retrieved.
- I did not research the Utah Telephone and Facsimile Solicitation Act (Utah Code 13-25a), which may apply to marketing calls and texts.
- I did not verify whether Utah 13-44 deems HIPAA-compliant notifications sufficient (a "HIPAA safe harbor").

## 7. Consolidated checklist (must vs. should) and risk summary for the clinic's website and communications

### Takeaway
The highest-value fixes for a small Utah clinic, in priority order:
1. Remove Meta Pixel and Google tags from any form, booking or portal page.
2. Move all PHI-collecting forms and inboxes onto BAA-covered vendors, and stop using free Gmail and WhatsApp for PHI.
3. Do and document a HIPAA risk analysis.
4. Publish the NPP plus the Section 1557 Notice of Availability and nondiscrimination notice in English and Spanish (plus Utah's top languages).
5. Bring the site to WCAG 2.1 AA ahead of the 2027/2028 Section 504 deadlines.
6. Use TCPA-compliant reminder texting through a BAA-covered SMS vendor.
7. Adopt a PHI-free review-response policy.
8. Disclose AI to patients under Utah law if any chatbot is used.

### Cited Findings
- [Secondary] Pixels and GA on forms, portals and health-input pages still trigger HIPAA after *AHA v. Becerra* — [ConsentPixel](https://consentpixel.com/blogs/hhs-ocr-tracking-guidance/). Google forbids GA use that gives it PHI — [Google Help](https://support.google.com/analytics/answer/13297105?hl=en)
- [Primary] BAA availability. Vercel Pro: [Vercel changelog](https://vercel.com/changelog/hipaa-baas-are-now-available-to-pro-teams). Cloudflare (Enterprise only): [Cloudflare](https://www.cloudflare.com/trust-hub/us-privacy-compliance/). Google Workspace: [Google Cloud](https://docs.cloud.google.com/docs/security/compliance/hipaa). Twilio: [Twilio](https://www.twilio.com/docs/iam/twilio-editions/hippa). OpenAI: [OpenAI](https://openai.com/index/openai-for-healthcare/). Anthropic: [Anthropic](https://privacy.claude.com/en/articles/8956058-is-anthropic-willing-to-sign-a-business-associate-agreement-baa-with-customers-handling-protected-health-information-phi)
- [Primary] Section 504 web deadlines: May 11, 2027 (15+ employees) and May 10, 2028 (fewer than 15) — [Federal Register](https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web)
- [Primary] Section 1557 provisions other than gender identity remain in force — [Federal Register June 2, 2026](https://www.federalregister.gov/documents/2026/06/02/2026-11015/notice-of-vacatur-regarding-certain-provisions-of-the-2024-nondiscrimination-in-health-programs-and). Machine-translation human-review rule — [eCFR 92.201](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201)
- [Secondary] Risk magnitudes:
  - HIPAA penalties up to $73,011 per violation and $2,190,294 per year per provision (2026) — [Mercer](https://www.mercer.com/insights/law-and-policy/hhs-adjusts-2026-hipaa-certain-aca-and-msp-monetary-penalties/);
  - risk-analysis settlements of $75k–$175k for small entities — [Brach Eichler](https://www.bracheichler.com/insights/ocr-settles-13th-ransomware-enforcement-action?print=pdf);
  - review-reply penalties of $10k–$50k — [DLA Piper](https://dlapiper.com/insights/publications/2023/01/hipaa-settlement-highlights-the-importance-of-caution-in-responding-to-negative-online-reviews);
  - pixel class actions from about $0.8M to $20.5M — [Paubox](https://www.paubox.com/blog/five-healthcare-providers-reach-tracking-pixel-settlements), [HIPAA Journal](https://www.hipaajournal.com/cvs-health-criteo-american-wellness-corp-data-breach-settlements/);
  - 3,117 federal ADA website suits in 2025 — [Level Access](https://www.levelaccess.com/blog/web-accessibility-lawsuits)
- [Secondary] The HIPAA Security Rule NPRM is not final, with a target of about July 2027; the current rule is fully enforced — [Pact-One](https://www.pact-one.com/2026/09/hipaa-security-rule-2026-status/)

### Inferences
**MUST (legal requirement, assuming the clinic is a HIPAA covered entity that bills Medicare and/or Medicaid):**
1. **BAAs:**
   - signed BAAs with every vendor that creates, receives, stores or transmits PHI: form builder, email, hosting/CDN that sees form data, EHR/portal, SMS, CRM, automation, AI, backup;
   - keep a vendor inventory with BAA dates;
   - no PHI in free Gmail, Formspree, Tally, n8n Cloud, WhatsApp, consumer ChatGPT, Claude or Atlas, GitHub, or non-Enterprise Cloudflare-proxied endpoints.
2. **Forms:**
   - HTTPS/TLS everywhere;
   - PHI forms hosted by a BAA vendor;
   - notification emails without PHI, or through BAA-covered Workspace;
   - access limited by role, with MFA;
   - retention and deletion rules.
3. **Security Rule:**
   - a documented risk analysis and risk-management plan (update at least annually and when the stack changes);
   - access controls, audit logs, encryption (or a documented alternative);
   - backups plus DR and emergency-mode plans;
   - workforce training;
   - incident and breach procedures covering HIPAA and Utah 13-44-202.
4. **Tracking:** no Meta Pixel, GA, Google Ads or remarketing tags, or session replay on appointment, symptom, intake, contact-with-reason or portal pages, or on pages whose URLs reveal conditions. Audit the tag manager.
5. **Notices:**
   - NPP (updated for the Feb 16, 2026 Part 2 changes) linked on the website;
   - Section 1557 Notice of Availability (English + at least 15 Utah top languages) and nondiscrimination notice on the site and in the clinic;
   - human review of machine-translated critical Spanish content.
6. **Accessibility:** WCAG 2.1 AA for website, forms and embedded third-party tools by May 10, 2028 (fewer than 15 employees) or May 11, 2027 (15 or more). The ADA Title III litigation risk exists now.
7. **Texting:**
   - appointment and treatment texts within the healthcare-exemption limits;
   - marketing texts only with prior express written consent;
   - STOP honored per the FCC's 2025–2026 revocation rules;
   - send via a BAA-covered provider.
8. **Reviews and testimonials:**
   - never confirm patient status or add details in review replies;
   - written HIPAA authorization before using any patient's story or image;
   - no fake, AI-written or incentivized-for-positive reviews (FTC 16 CFR 465).
9. **Utah AI disclosure:** for any generative-AI chatbot collecting health information or giving health guidance, disclose AI at the start of the interaction.
10. **Utah solicitation:** no runners or paid steering of accident victims; no use of accident reports for outreach.

**SHOULD (best practice):**
- Use privacy-first analytics (self-hosted Umami or Plausible CE, or Cloudflare Web Analytics on non-PHI pages only), with URLs free of PHI, or BAA-backed analytics if conversion data is needed.
- Run a full Spanish mirror of the site with native or reviewed copy. Make Spanish forms, confirmations and reminders the default for patients who choose Spanish, and advertise a bilingual phone line.
- Publish an accessibility statement and run periodic WCAG audits, manual plus automated. Avoid overlay-only "fixes."
- Keep a website privacy policy covering cookies, analytics, forms and SMS, and a consent banner if any marketing tags remain on non-PHI pages.
- Prefer BAA-covered SaaS over a homelab for PHI. If a homelab is used, apply the full Security Rule control set and consider building to the proposed NPRM controls (MFA, encryption, asset inventory, 72-hour restore) now.
- Draft bilingual review-response templates and a social-media policy, and train front-desk staff.
- Use Google Ads search campaigns without health-based remarketing or Customer Match. Drop the Meta Pixel, given the January 2025 health-event block.

**Risk of getting it wrong (summary):**
- OCR investigations, typically after a complaint or breach, with settlements of tens to hundreds of thousands of dollars plus two-year corrective action plans; statutory caps of $73k per violation and $2.19M per year per provision.
- Pixel class actions.
- ADA demand letters and suits.
- Section 1557/504 complaints to OCR, which can put federal funding at risk.
- TCPA statutory damages of $500–$1,500 per text (background knowledge).
- FTC penalties for fake reviews.
- Utah AG involvement in breaches of 500 or more.
- Reputational damage with a Spanish-speaking community that relies on trust.

### Gaps
- Clinic-specific facts are unknown and determine which deadlines apply: employee count, whether it bills Medicare/Medicaid, whether it has a patient portal or EHR texting, and whether it markets to auto-injury (PIP) patients.
- I did not verify current pricing for BAA tiers, other than Vercel at about $350/month (secondary) and Jotform at $99–$129/month (conflicting).
- I could not check the current federal enforcement posture on language access (EO 14224) or Meta's primary WhatsApp terms, because the search budget was exhausted.
