# Transcripts Master Index — RAG-lite navigation

**Co tento soubor je:** Master tabulka všech raw transcripts z YouTube + Imperium Skool. AI při skill call načte TENHLE INDEX (ne full files), identifikuje relevant subset (1-5 files), pak load specific transcripts.

**Total transcripts:** 150

**Distribution per author:**
- Bay: 30
- Cole Gordon: 30
- Hormozi: 30
- Miner: 30
- Voss: 30

**Distribution per primary topic:**
- `discovery`: 29 transcripts
- `namitky`: 22 transcripts
- `closing`: 13 transcripts
- `mindset`: 51 transcripts
- `tonalita`: 13 transcripts
- `kvalifikace`: 7 transcripts
- `pricing`: 7 transcripts
- `follow-up`: 8 transcripts

## Quick navigation

- [Discovery (29)](#discovery)
- [Namitky (22)](#namitky)
- [Closing (13)](#closing)
- [Mindset (51)](#mindset)
- [Tonalita (13)](#tonalita)
- [Kvalifikace (7)](#kvalifikace)
- [Pricing (7)](#pricing)
- [Follow-Up (8)](#follow-up)

---

## How AI uses this index (RAG-lite workflow)

1. **Skill (e.g. /analyzuj-call) loads:**
   - Primary per-topic file (`discovery.md`, `namitky.md`, atd.) — always loaded
   - **THIS INDEX FILE** — scan tabulky for relevant transcripts
2. **Identify relevant transcripts:**
   - Filter by `primary_topics` matching call situation
   - Filter by `use_cases` tag (e.g., `pricing-objection`)
   - Pick top 3-5 by `quality_score`
3. **Load specific transcripts** (only those 3-5) — read full body for direct quotes + techniques
4. **Synthesize answer** using per-topic + selected transcripts

**Token budget per skill call: ~30-40k (vs 700k+ if loaded everything).**

---

## Discovery

**Total: 29 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 10.0 | Cole Gordon | How To Become A Master Salesperson In 2025 | 7 Beliefs Ladder: Pain → Doubt → Cost → Desire → Money → Sup… | structuring-discovery, preventing-objections-befor… | ✅ | [cole-gordon/011_discovery_seven-beliefs-ladder.md](cole-gordon/011_discovery_seven-beliefs-ladder.md) |
| 9.8 | Voss | Chris Voss Speaks on Tactical Empathy at The World Economic Forum 2025 | What do you love about [topic]?" (deep thinking portal), See… | opening-with-strangers, getting-to-the-real-why… | 🟢 | [voss/013_discovery_tactical-empathy-davos.md](voss/013_discovery_tactical-empathy-davos.md) |
| 9.5 | Miner | The Top 6 Sales Questions That Make Prospects Sell Themselves | 6 NEPQ stages — Connection / Situation / Problem Awareness /… | structuring-discovery-call, moving-prospect-cost-t… | 🟢 | [miner/002_discovery_nepq-6-stage-question-framework.md](miner/002_discovery_nepq-6-stage-question-framework.md) |
| 9.5 | Miner | How To Call Leads THE RIGHT WAY (Prospecting & Warm Leads) | 3 NEPQ connection questions for outbound/inbound leads, You … | calling-an-inbound-lead, calling-back-someone-who-… | 🟢 | [miner/006_prospecting_outbound-lead-callback-script.md](miner/006_prospecting_outbound-lead-callback-script.md) |
| 9.5 | Miner | The Biggest Psychological Triggers That Makes Prospects Close themselv | 6 generic problem-awareness question frames, Do you 100% lov… | building-the-gap, problem-stacking… | 🟢 | [miner/007_discovery_gap-building-problem-awareness-stack.md](miner/007_discovery_gap-building-problem-awareness-stack.md) |
| 9.5 | Miner | 42 Minutes of Sales Training That Will Explode Your Sales in 2026 | Family Picture Frame analogy (POV = perception of value), 30… | keynote-or-event-presentation, selling-to-mixed-au… | 🟢 | [miner/024_discovery_42-min-keynote-frame-and-pov.md](miner/024_discovery_42-min-keynote-frame-and-pov.md) |
| 9.4 | Voss | How To UNFCK Your Sales In 15 Minutes or Less! | Lead with tactical empathy (label likely reality before aski… | structuring-discovery-call, opening-sales-call… | 🟡 | [voss/005_discovery_tactical-empathy-4-step.md](voss/005_discovery_tactical-empathy-4-step.md) |
| 9.4 | Voss | Build Trust-Based Relationship With Anyone! : Troy Smith's Most Diffic | Dump your bucket first (clear emotional baggage), 75-80% con… | earning-trust-from-zero, mindset-reset-before-hard… | 🟢 | [voss/016_discovery_trusted-advisor-hostage-story.md](voss/016_discovery_trusted-advisor-hostage-story.md) |
| 9.2 | Voss | Dive Into The Emotions Driving Other Negotiators | Latent labels (label what's NOT said), Presenting vs latent … | going-deeper-in-discovery, reading-between-the-lin… | 🟡 | [voss/002_discovery_latent-labels.md](voss/002_discovery_latent-labels.md) |
| 9.0 | Cole Gordon | ALWAYS Do This at the Beginning of Every Sales Call | Establish PAIN first — all 6 other beliefs are predicated on… | opening-discovery-question, softening-challenge-la… | 🟢 | [cole-gordon/016_discovery_establish-pain-first.md](cole-gordon/016_discovery_establish-pain-first.md) |
| 9.0 | Cole Gordon | You can sell ANYTHING after watching this video… | Goals-first vs Problems-first syntax — depends on pain vs un… | eliciting-desired-state, long-term-vision… | 🟢 | [cole-gordon/024_discovery_painting-heaven-island-permission-frame.md](cole-gordon/024_discovery_painting-heaven-island-permission-frame.md) |
| 9.0 | Hormozi | Helping 6 Business Owners Scale in 33 Minutes | What's stopping you? Then dig 3 layers deep, Can/won't frami… | discovery-script, constraint-diagnosis… | 🟢 | [hormozi/030_discovery_live-q-and-a-constraint-diagnosis.md](hormozi/030_discovery_live-q-and-a-constraint-diagnosis.md) |
| 9.0 | Miner | 4 Sales Questions So Good Prospects Will Close Themselves | NEPQ Precision Probing, Repeat the emotional word back (one-… | opening-prospect-emotionally, building-the-gap… | 🟢 | [miner/001_discovery_nepq-precision-probing.md](miner/001_discovery_nepq-precision-probing.md) |
| 8.9 | Voss | This Secret Phrase Transforms Deals Instantly! - Magic Wand Phrases | It seems like you have a reason for saying that, Dynamic sil… | opening-discovery, getting-someone-to-elaborate… | 🟢 | [voss/019_discovery_magic-wand-phrase.md](voss/019_discovery_magic-wand-phrase.md) |
| 8.7 | Voss | Chris Voss Former FBI Hostage Negotiator Interviews Jefferson Fisher T | Earnest questions (not accusatory) — Socratic teaching, Phra… | reading-non-verbal-cues, asking-vs-telling… | 🟢 | [voss/020_discovery_fisher-interview-six-seconds.md](voss/020_discovery_fisher-interview-six-seconds.md) |
| 8.5 | Bay | Why prospects ignore your cold emails and cold calls (and how to fix i | Customer Voice (pull, not push), 4-Component Messaging Matri… | cold-outreach-messaging, email-personalization… | 🟢 | [bay/001_messaging_customer-voice-priority-language.md](bay/001_messaging_customer-voice-priority-language.md) |
| 8.5 | Hormozi | Helping 4 Educational Business Owners Build a $1M Business in 25 Minut | What's stopping you? — open discovery question, Can you hand… | discovery-script, qualification-questions… | 🟢 | [hormozi/018_discovery_live-discovery-coaching-roundtable.md](hormozi/018_discovery_live-discovery-coaching-roundtable.md) |
| 8.5 | Miner | 5 Sales Questions That Unlock Hidden Pain (And Close More Deals) | 2 change drivers — pain + fear of future pain, Repeat emotio… | probing-deeper-into-pain, getting-past-surface-lev… | 🟢 | [miner/004_discovery_precision-probing-hidden-pain.md](miner/004_discovery_precision-probing-hidden-pain.md) |
| 8.5 | Miner | These Sales Questions Are Costing You Deals | The Family Picture Frame analogy (great vs cracked frame, sa… | replacing-vague-discovery-questions, reframing-exi… | 🟢 | [miner/018_discovery_bad-questions-vs-reframes.md](miner/018_discovery_bad-questions-vs-reframes.md) |
| 8.5 | Miner | 6 Minutes To Master Identifying Lies In Sales Prospects | Replace predictable questions ("what are your challenges?") … | reframing-vague-discovery-questions, detaching-fro… | 🟢 | [miner/029_discovery_identifying-lies-3-causes.md](miner/029_discovery_identifying-lies-3-causes.md) |
| 8.4 | Voss | Tim Ross: Embracing Vulnerability and Tactical Empathy: That's Right S | Accusations Audit ("I know the last 9 months has been really… | rebuilding-broken-relationships, hosting-difficult… | 🟢 | [voss/014_discovery_thats-right-vulnerability.md](voss/014_discovery_thats-right-vulnerability.md) |
| 8.0 | Miner | Door to Door with the 25 y/o Who Sold Over $1,000,000 in 4 Months | Reference neighbor opener ("Max three doors down, big red do… | door-to-door-opener, i'm-already-out-here"-positio… | 🟡 | [miner/025_prospecting_door-to-door-pest-control-million.md](miner/025_prospecting_door-to-door-pest-control-million.md) |
| 7.5 | Bay | Cold calling: How to get prospects to lean in | Customer voice vs product voice contrast, Open with buyer's  | what-do-you-guys-do-answer, opening-30-seconds… | 🟢 | [bay/006_discovery_product-voice-vs-customer-voice.md](bay/006_discovery_product-voice-vs-customer-voice.md) |
| 7.5 | Bay | Tell the story vs product pitch | Tell the story, don't product feature dump, Add the human el… | cold-call-opener, first-meeting-credibility… | 🟢 | [bay/019_discovery_tell-story-vs-feature-dump.md](bay/019_discovery_tell-story-vs-feature-dump.md) |
| 7.5 | Cole Gordon | How to Sell Anything to Anyone (Explained in 90 Seconds) | Business = solving problems. Solving problems creates value.… | elevator-pitch-of-sales-philosophy, quick-framewor | ✅ | [cole-gordon/025_discovery_sell-anything-90-seconds-problem-gap.md](cole-gordon/025_discovery_sell-anything-90-seconds-problem-gap.md) |
| 7.0 | Bay | The mindset behind the "customer voice" approach | Meet buyer in their world first, Mutual language = prioritie… | first-15-seconds-cold-call, outbound-opener… | 🟢 | [bay/017_discovery_meet-buyer-in-their-world.md](bay/017_discovery_meet-buyer-in-their-world.md) |
| 6.5 | Bay | Stop selling deals; solve specific business challenges | Frame conversations around business challenges, not deals, C | large-account-strategy, moving-from-tactical-to-st… | 🟡 | [bay/013_discovery_solve-specific-business-challenges.md](bay/013_discovery_solve-specific-business-challenges.md) |
| 6.5 | Bay | Push vs. Pull: Sell in Their World | Pull method — meet them in their world first, Build messagin | cold-outreach-messaging, opening-talk-track… | 🟢 | [bay/018_discovery_push-vs-pull.md](bay/018_discovery_push-vs-pull.md) |
| 6.5 | Bay | Buyers need to be educated, not sold to | Blind date" framing — they've already experienced you online… | first-meeting-positioning, building-credibility… | 🟡 | [bay/023_discovery_buyers-self-educate-pre-call.md](bay/023_discovery_buyers-self-educate-pre-call.md) |

## Namitky

**Total: 22 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 10.0 | Cole Gordon | 55 minutes of objection handling that will explode your sales in 2025 | 3 buckets: Uncertainty (top of pyramid) + Support + Financia… | think-about-it, what-if-it-doesnt-work… | 🟡 | [cole-gordon/015_namitky_55min-objection-handling-masterclass.md](cole-gordon/015_namitky_55min-objection-handling-masterclass.md) |
| 9.7 | Bay | Objection Handling: In 60 minutes, I'll help you handle any objection  | EVO Framework (Empathize → Validate → Offer), Pause 5× longe… | all-cold-call-objections, not-interested-handling… | 🟢 | [bay/003_namitky_60min-objection-handling-masterclass.md](bay/003_namitky_60min-objection-handling-masterclass.md) |
| 9.5 | Bay | In 15 minutes, I'll help you handle any objection prospects throw at y | EVO Framework (Empathize → Validate → Offer), Instinctive vs… | not-interested-handling, send-me-an-email… | 🟢 | [bay/002_namitky_evo-framework-instinctive-vs-calculated.md](bay/002_namitky_evo-framework-instinctive-vs-calculated.md) |
| 9.5 | Cole Gordon | Handle ANY Sales Objection with this Simple Framework | Pacing the objection: 'No problem — just so I can stay organ… | i-need-to-think-about-it, cant-afford-money… | 🟢 | [cole-gordon/007_namitky_universal-pacing-tie-down-framework.md](cole-gordon/007_namitky_universal-pacing-tie-down-framework.md) |
| 9.5 | Cole Gordon | How to Overcome Every Objection With 1 Simple Question | The 1 question: 'Investment and everything aside, do you fee… | i-need-to-think-about-it, intangible-objection… | 🟢 | [cole-gordon/009_namitky_one-simple-question-thesis-tie-down.md](cole-gordon/009_namitky_one-simple-question-thesis-tie-down.md) |
| 9.5 | Cole Gordon | Overcoming The "Spouse" Objection (Live Sales Roleplay) | TRIPLE tie-down (very conversational) for highest-resistance… | spouse-objection-need-talk, spouse-controls-financ… | 🟡 | [cole-gordon/018_namitky_spouse-objection-live-roleplay-coaching.md](cole-gordon/018_namitky_spouse-objection-live-roleplay-coaching.md) |
| 9.5 | Miner | How To Prevent Every Sales Objection (Full Masterclass) | Surface spouse opinion EARLY ("how does your spouse feel abo… | preventing-spouse-objection, think-it-over / more-… | 🟢 | [miner/027_namitky_prevent-every-objection-masterclass.md](miner/027_namitky_prevent-every-objection-masterclass.md) |
| 9.3 | Voss | How to Get the Upper Hand in ANY Take it Or Leave it Deal! | No-oriented opener ("Is it disrespectful if I ask to clarify… | handling-take-it-or-leave-it, ultimatum-response… | 🟡 | [voss/012_namitky_take-it-or-leave-it.md](voss/012_namitky_take-it-or-leave-it.md) |
| 9.3 | Voss | You're Being Lied To. Here's What to Do | Drain the fear that fuels the lie (don't attack the lie itse… | sensing-deception, getting-truth-from-defensive-co… | 🟡 | [voss/017_namitky_dealing-with-liars.md](voss/017_namitky_dealing-with-liars.md) |
| 9.1 | Voss | USE This Skill To Remove You as The Threat in Negotiation! | Preemptive Labels (Accusations Audit before they voice it), … | opening-cold-call, reducing-perceived-threat… | 🟡 | [voss/022_namitky_accusations-audit-preemptive.md](voss/022_namitky_accusations-audit-preemptive.md) |
| 9.1 | Voss | STOP! Letting Yes Ruin Your Sales! | 3 kinds of yes: commitment, confirmation, counterfeit, That'… | reframing-yes-driven-pipeline, identifying-counter… | 🟡 | [voss/028_namitky_yes-vs-thats-right.md](voss/028_namitky_yes-vs-thats-right.md) |
| 9.0 | Cole Gordon | I Reacted to The Internet's Most Popular Sales Advice | ALWAYS categorize: is it value/uncertainty OR is it financia… | financial-vs-uncertainty-categorization, identity-… | 🟡 | [cole-gordon/008_namitky_reaction-top10-viral-sales-clips.md](cole-gordon/008_namitky_reaction-top10-viral-sales-clips.md) |
| 9.0 | Miner | 9 Minute Training To Destroy Any Sales Objection | Can I ask you something — how can I communicate to you that … | now is not a good time / get back to you later, em… | 🟡 | [miner/008_namitky_destroy-any-objection-loop-back.md](miner/008_namitky_destroy-any-objection-loop-back.md) |
| 9.0 | Voss | Why Forcing a Yes Is Killing Your Sales (and how to fix it) | No-oriented questions ("Is now a bad time?", "Would it be ri… | reframing-yes-seeking-behavior, opening-cold-conve… | 🟡 | [voss/011_namitky_no-oriented-questions.md](voss/011_namitky_no-oriented-questions.md) |
| 9.0 | Voss | How to Deal with Someone who is Verbally Attacking You! | 45-sec to 1-min dynamic silence during attack, Diagnose 3 at… | handling-verbal-attacks, confronting-manipulators… | 🟡 | [voss/021_namitky_verbal-attacks-im-message.md](voss/021_namitky_verbal-attacks-im-message.md) |
| 8.9 | Voss | How to Negotiate With Someone That Does NOT LISTEN TO YOU! | Give them the illusion of control (don't knock them down a p… | dealing-with-loud-boss, power-dynamic-imbalance… | 🟢 | [voss/029_namitky_someone-doesnt-listen.md](voss/029_namitky_someone-doesnt-listen.md) |
| 8.8 | Voss | Negotiation Myths That Kill Your Sales! | No-oriented questions ("Would it be ridiculous...", "Is now … | reframing-sales-mindset, handling-fairness-objecti… | 🟡 | [voss/001_namitky_5-negotiation-myths.md](voss/001_namitky_5-negotiation-myths.md) |
| 8.8 | Voss | How to Talk to Unfair Leadership or Management in Your Work Place! | Mirror at end of request (let them restate, hear themselves)… | closing-an-assertive-buyer, dealing-with-data-driv… | 🟢 | [voss/030_namitky_power-dynamics-assertive-close.md](voss/030_namitky_power-dynamics-assertive-close.md) |
| 8.7 | Voss | DON'T GET TOO EXCITED DEALING WITH MANIPULATIVE PEOPLE! | Slow it down ("would you be opposed to me taking a few days … | high-stakes-deal-red-flags, dealing-with-bullies… | 🟡 | [voss/008_namitky_manipulative-counterpart.md](voss/008_namitky_manipulative-counterpart.md) |
| 8.5 | Cole Gordon | Client Says, "Let me talk to one of your clients." And You Say "..." | Objection PREVENTION via case-study loading in pitch (use as… | talk-to-your-clients-objection, need-to-verify-res… | 🟢 | [cole-gordon/010_namitky_talk-to-your-clients-objection.md](cole-gordon/010_namitky_talk-to-your-clients-objection.md) |
| 8.5 | Miner | Uncover the Real Objection Using TONALITY (5 Minute Masterclass) | Can I — can I ask you something, John?" (permission, with pa… | prospect-gives-objection-you-cant-overcome, i need… | 🟢 | [miner/016_namitky_uncover-real-objection-tonality.md](miner/016_namitky_uncover-real-objection-tonality.md) |
| 8.5 | Miner | How To STOP A Sales Objection Before It Starts | That's probably one of the biggest reasons why people come t… | pet-food-store-owner-pitch, preventing-need-to-tal… | 🟡 | [miner/017_namitky_prevent-objection-via-spouse-prep.md](miner/017_namitky_prevent-objection-via-spouse-prep.md) |

## Closing

**Total: 13 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 10.0 | Cole Gordon | How To Pitch Anything To Anyone In Less Than 10 Minutes (My Framework) | 3-part Pitch Codex: High-Level Promise + Bridge (3-4 Pillars… | structuring-the-pitch, building-bridge-pillars… | 🟢 | [cole-gordon/019_closing_pitch-codex-deep-dive.md](cole-gordon/019_closing_pitch-codex-deep-dive.md) |
| 9.9 | Bay | Cold Calling: Give me an hour and I'll eliminate your fear of the phon | Intro → Hook → Close framework (extended), 5 PBO variants (C… | cold-call-talk-track-design, first-30-seconds… | 🟢 | [bay/016_closing_60min-cold-calling-masterclass.md](bay/016_closing_60min-cold-calling-masterclass.md) |
| 9.8 | Bay | Cold Calling: Give me 23 minutes and I'll eliminate your fear of the p | Intro → Hook → Close framework, Permission-Based Opener (PBO… | cold-call-talk-track-design, first-60-seconds-cold… | 🟢 | [bay/004_closing_cold-call-framework-intro-hook-close.md](bay/004_closing_cold-call-framework-intro-hook-close.md) |
| 9.8 | Bay | Mastering the Framework that Triples Cold Call Conversions | 3 T's — Trigger (why now) + Tension (problem) + Trust (socia… | cold-call-talk-track-design, meeting-show-rate-imp… | 🟢 | [bay/010_closing_3-ts-trigger-tension-trust-framework.md](bay/010_closing_3-ts-trigger-tension-trust-framework.md) |
| 9.6 | Voss | STOP Losing Clients With This Common Mistake! | I've got some really bad news" preface, Get IN FRONT of prob… | delivering-bad-news, retention-after-problem… | 🟢 | [voss/024_closing_breaking-bad-news.md](voss/024_closing_breaking-bad-news.md) |
| 9.0 | Cole Gordon | Follow My EXACT Pitch Framework | Pitch Codex 3 parts: High-Level Promise + Bridge (3-4 Pillar… | structuring-the-pitch, converting-discovery-into-p… | 🟢 | [cole-gordon/004_closing_pitch-codex-bridge-pillars.md](cole-gordon/004_closing_pitch-codex-bridge-pillars.md) |
| 9.0 | Cole Gordon | Close 100% of sales calls with THIS… | Committing Phase = 3 steps: Temp Check + Onboarding + Invest… | transitioning-from-pitch-to-price, measuring-buy-i… | 🟢 | [cole-gordon/005_closing_committing-phase-temp-check-price-drop.md](cole-gordon/005_closing_committing-phase-temp-check-price-drop.md) |
| 9.0 | Miner | How To Get Prospects to BUY NOW (No Follow Up Needed) | NEPQ Consequence Question — "what happens if you don't do an… | prospect-going-ghost-after-demo, we-liked-it-but-n… | 🟡 | [miner/028_closing_consequence-questions-buy-now.md](miner/028_closing_consequence-questions-buy-now.md) |
| 9.0 | Voss | Top 5 Deal Killers (and How to Stop Them!) | Asking labels ("It seems like someone else needs to feel com… | mid-funnel-stalls, detecting-fake-yes… | 🟡 | [voss/003_closing_5-secret-deal-killers.md](voss/003_closing_5-secret-deal-killers.md) |
| 8.9 | Voss | How Great Trial Lawyers Close the Deal! | Show your bruises (own your weaknesses upfront), Connect rat… | first-meeting-credibility, handling-dismissive-lau… | 🟢 | [voss/009_closing_trial-lawyer-credibility.md](voss/009_closing_trial-lawyer-credibility.md) |
| 8.5 | Cole Gordon | Close 20% More Deals With This Simple Strategy... | Distinguish OBJECTIONS (don't believe it's right/now) vs LOG… | need-to-move-money-around, want-to-start-after-hol… | 🟢 | [cole-gordon/002_closing_logistics-vs-objections-payment-plans.md](cole-gordon/002_closing_logistics-vs-objections-payment-plans.md) |
| 8.0 | Bay | [Playbook] How two reps closed a $30M+ deal (the largest in company hi | First year = education, not selling, Stakeholder validation … | large-account-strategy, taking-over-existing-accou… | 🔴 | [bay/022_closing_30m-deal-playbook-multithread-champion.md](bay/022_closing_30m-deal-playbook-multithread-champion.md) |
| 8.0 | Miner | Jeremy Get's CALLED OUT on Sales Call for His Tactics - You won't beli | 4 rep archetypes — Winger / Dabbler / Know-it-aller / Commit… | when-prospect-calls-you-out-on-tactics, selling-th… | 🔴 | [miner/012_closing_called-out-on-tactics-roleplay.md](miner/012_closing_called-out-on-tactics-roleplay.md) |

## Mindset

**Total: 51 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 10.0 | Cole Gordon | Sales First Principles - Advanced Sales Techniques 02 | Hell Island vs Heaven Island — paint current and desired cle… | building-sales-mental-model, reframing-discovery-q… | 🟢 | [cole-gordon/012_mindset_sales-first-principles-philosophy.md](cole-gordon/012_mindset_sales-first-principles-philosophy.md) |
| 9.5 | Cole Gordon | Sales Was Scary Until I Rewired My Brain | Rule 1: Grade the PROCESS, not the OUTCOME, Rule 2: Sell the… | sales-rep-self-coaching, dealing-with-rejection… | ✅ | [cole-gordon/013_mindset_rewire-rejection-three-rules.md](cole-gordon/013_mindset_rewire-rejection-three-rules.md) |
| 9.5 | Cole Gordon | The Difference Between Average And Elite Salespeople - Advanced Sales  | Projections (bare minimum) > Goals (aspirations). Hit 75-80%… | setting-weekly-targets, diagnosing-rut… | 🟢 | [cole-gordon/022_mindset_high-performance-projections-ruts.md](cole-gordon/022_mindset_high-performance-projections-ruts.md) |
| 9.5 | Voss | 15 Minute Daily Habit to Make You Millions! | 3-min: label news headlines aloud, 3-min: calibrated questio… | building-skill-muscle-memory, daily-reps-routine… | 🟢 | [voss/018_mindset_15-min-daily-habit.md](voss/018_mindset_15-min-daily-habit.md) |
| 9.0 | Cole Gordon | Dean Graziosi: Everything He's Learned After $2 Billion In Revenue | Campaign vs Company — both look same when growing, only comp… | building-company-not-campaign, market-downturn-piv… | 🟢 | [cole-gordon/026_mindset_dean-graziosi-campaign-vs-company.md](cole-gordon/026_mindset_dean-graziosi-campaign-vs-company.md) |
| 9.0 | Miner | Why Biblical Sales Beats Traditional Selling with Myron Golden \| Ep. 3 | Persuasion is helping you make a decision you already desire… | shifting-from-convincing-to-persuasion, selling-co… | 🔴 | [miner/022_mindset_biblical-sales-myron-golden.md](miner/022_mindset_biblical-sales-myron-golden.md) |
| 8.8 | Bay | AI in sales masterclass & why RevOps will disappear with Kyle Vamvouri | Context Engineering (vs Prompt Engineering) — multi-agent st… | choosing-ai-sales-tools, building-ai-coach… | 🟡 | [bay/009_mindset_ai-sales-masterclass-context-engineering.md](bay/009_mindset_ai-sales-masterclass-context-engineering.md) |
| 8.7 | Voss | A Former FBI Hostage Negotiator and Navy Seal Talk About the MOST Impo | Earnest questions (assume YOU are wrong, not them), Do you t… | leadership-coaching, team-feedback-conversations… | 🟢 | [voss/025_mindset_listening-leadership.md](voss/025_mindset_listening-leadership.md) |
| 8.5 | Bay | Sales Enablement Masterclass with VP of Sales Enablement at Rippling,  | Optimize for outcome, not training, One metric per initiativ… | enablement-strategy, measuring-skill-improvement… | 🟡 | [bay/005_mindset_sales-enablement-masterclass-rippling.md](bay/005_mindset_sales-enablement-masterclass-rippling.md) |
| 8.5 | Cole Gordon | $30M CEO Explains How To Build A Sales Team In 2025 | 3 traits to hire: Specialized Knowledge + Industry Acumen + … | building-sales-team, interviewing-reps… | 🟢 | [cole-gordon/023_mindset_sales-team-hiring-three-traits-prodigy.md](cole-gordon/023_mindset_sales-team-hiring-three-traits-prodigy.md) |
| 8.5 | Cole Gordon | 4 Lessons From Building FOUR 8 Figure Sales Teams | 3 hiring traits: Specialized Knowledge + Industry Acumen + B… | building-sales-team, mishire-prevention… | 🟢 | [cole-gordon/028_mindset_4-lessons-building-sales-teams.md](cole-gordon/028_mindset_4-lessons-building-sales-teams.md) |
| 8.5 | Miner | 7 Dark Psychology Secrets That Create Instant Respect | Command silence — speak surgically, no "does that make sense… | establishing-authority-in-discovery, handling-snar… | 🟢 | [miner/013_mindset_7-secrets-instant-respect.md](miner/013_mindset_7-secrets-instant-respect.md) |
| 8.5 | Miner | 7 Tips To Become The Top 1% In Sales | Non-verbal mastery — tonality, body language, facial express… | rep-onboarding, mindset-talk… | 🟡 | [miner/023_mindset_7-tips-top-1-percent.md](miner/023_mindset_7-tips-top-1-percent.md) |
| 8.5 | Miner | Your Prospects Are Hiding the Truth from You (How to Uncover It) | Most salespeople sell to the mask, not the human, Non-commit… | sales-trainer-level-content, reading-non-committal… | 🟢 | [miner/026_mindset_mask-frame-non-committal-language.md](miner/026_mindset_mask-frame-non-committal-language.md) |
| 8.5 | Voss | Former FBI Hostage Negotiator and Navy Seal Answer Leadership Question | Iterative decision-making (small steps + feedback loop), How… | founder-mindset-coaching, when-to-leave-day-job… | 🟢 | [voss/007_mindset_iterative-decisions-careers.md](voss/007_mindset_iterative-decisions-careers.md) |
| 8.5 | Voss | Former FBI Hostage Negotiator and Navy Seal Talk About How You Can Kee | Identify YOUR red flags (face flush, fast talk, fist clench,… | regulating-during-tough-conversation, pre-call-emo… | 🟢 | [voss/026_mindset_emotional-control-red-flags.md](voss/026_mindset_emotional-control-red-flags.md) |
| 8.0 | Cole Gordon | I Spent $225,000 on Alex Hormozi's Books (Here's Why) | Bigger investment forces bigger thinking ($10K → 1 client/mo… | justify-coaching-spend, extreme-business-modeling… | 🟡 | [cole-gordon/020_mindset_hormozi-225k-investment-coaching-philosophy.md](cole-gordon/020_mindset_hormozi-225k-investment-coaching-philosophy.md) |
| 8.0 | Miner | Spy Tactics Every Salesperson Needs to Know (From A CIA Spy) | Don't live in your emotional brain — live in tactical brain,… | separating-emotional-from-tactical-brain, reading-… | 🟢 | [miner/020_mindset_cia-spy-tactics-emotional-detachment.md](miner/020_mindset_cia-spy-tactics-emotional-detachment.md) |
| 7.5 | Bay | From Rep To Sales Exec with Bryan Evans, VP of Sales at Neo4j | Don't lead with friendship — lead with value/obstacle remova… | first-time-management-pitfalls, new-role-100-day-p… | 🔴 | [bay/024_mindset_rep-to-sales-exec-bryan-evans-neo4j.md](bay/024_mindset_rep-to-sales-exec-bryan-evans-neo4j.md) |
| 7.5 | Bay | HOT TAKE ALERT: Sales training is overrated! | Optimize for the outcome, not for the training, One proxy me… | training-design, measuring-skill-improvement… | 🟢 | [bay/025_mindset_training-overrated-optimize-for-outcome.md](bay/025_mindset_training-overrated-optimize-for-outcome.md) |
| 7.5 | Cole Gordon | Overview - Advanced Sales Techniques 01 | Advanced selling = right philosophy FIRST, then tactics natu… | learning-roadmap, identifying-skill-gaps… | 🟢 | [cole-gordon/027_mindset_advanced-selling-techniques-overview.md](cole-gordon/027_mindset_advanced-selling-techniques-overview.md) |
| 7.5 | Hormozi | Why Doing More Is Actually Making You Less Money | 20% guaranteed decrement rule — only test if >40% potential … | business-focus-decision, feature-prioritization… | 🟢 | [hormozi/011_mindset_20-percent-cost-of-change.md](hormozi/011_mindset_20-percent-cost-of-change.md) |
| 7.5 | Hormozi | If You're in Your 20s or 30s, Here's How to Win (at Anything) | MORE = highest risk-adjusted return move (vs. optimization),… | outreach-scaling, marketing-volume… | 🟡 | [hormozi/021_mindset_more-volume-as-best-risk-adjusted-bet.md](hormozi/021_mindset_more-volume-as-best-risk-adjusted-bet.md) |
| 7.5 | Miner | Psychology Hacks To Close More Sales | 3 jobs of every question — seed doubt, prevent objections, a… | understanding-why-prospects-default-to-objections,… | 🟢 | [miner/005_mindset_human-psychology-frames.md](miner/005_mindset_human-psychology-frames.md) |
| 7.0 | Bay | Sales Leadership; Know your teams Sales math | Backward math from quota to daily activity, Quota → Win rate | setting-prospecting-targets, justifying-call-volum… | 🟢 | [bay/008_mindset_sales-math-backward-from-quota.md](bay/008_mindset_sales-math-backward-from-quota.md) |
| 7.0 | Bay | Two Keys for Sales Leaders to Successfully Drive Change | Explain the WHY before the WHAT, Repeat the WHY 3-4 times (p… | rolling-out-new-process, introducing-new-tool… | 🟢 | [bay/011_mindset_drive-change-explain-why.md](bay/011_mindset_drive-change-explain-why.md) |
| 7.0 | Hormozi | My Actual Social Media Strategy For 2026 | SPCL framework — Status, Power, Credibility, Likeness, Statu… | content-positioning, audience-targeting… | 🔴 | [hormozi/002_mindset_spcl-influence-framework.md](hormozi/002_mindset_spcl-influence-framework.md) |
| 7.0 | Hormozi | You can make way more money than you think | TAM keyhole reframe — your slice is tiny compared to total a… | market-objection-handling, niche-expansion-decisio… | 🟡 | [hormozi/005_mindset_total-addressable-market-expansion.md](hormozi/005_mindset_total-addressable-market-expansion.md) |
| 7.0 | Hormozi | You're Setting Goals Wrong | Priority comes from prior = one-and-only first, Concentrate … | business-focus-coaching, priority-setting… | 🟢 | [hormozi/027_mindset_single-priority-focus-vehicle.md](hormozi/027_mindset_single-priority-focus-vehicle.md) |
| 7.0 | Miner | Top 5 Sales Skills Gen Z Needs to Make Real Money | Verbal pacing (name. name. periods = pauses), Sell with a mi… | young-rep-onboarding, mindset-for-rejection… | 🟢 | [miner/010_mindset_top-5-sales-skills-young-rep.md](miner/010_mindset_top-5-sales-skills-young-rep.md) |
| 7.0 | Miner | The Mindset Shift That Separates the Top 1% in Sales | The 30/70 stat — words are 30%, body language + tonality is … | end-of-call-emotional-momentum, speaker-keynote-op… | 🔴 | [miner/019_mindset_christopher-reeve-defining-moment.md](miner/019_mindset_christopher-reeve-defining-moment.md) |
| 6.5 | Bay | Successful Sales Teams; Leaders must walk the walk | Walk the walk — leaders practice the script themselves, Show | leading-by-example, rep-buy-in… | 🟢 | [bay/014_mindset_walk-the-walk-frontline-leadership.md](bay/014_mindset_walk-the-walk-frontline-leadership.md) |
| 6.5 | Hormozi | How the Top 1% Actually Think About Money | Inflation-adjusted goal setting (4M today = 24M nominal at 6… | pricing-pitch, client-onboarding… | 🔴 | [hormozi/003_mindset_skills-over-savings-investing.md](hormozi/003_mindset_skills-over-savings-investing.md) |
| 6.5 | Hormozi | Why Ambitious People Stay Mediocre | Ignore industry standards — you set the standard, Multi-vect… | founder-standards, team-standards-setting… | 🟡 | [hormozi/025_mindset_standards-vs-industry-averages.md](hormozi/025_mindset_standards-vs-industry-averages.md) |
| 6.0 | Bay | Ideal way on rolling out an AE prospecting motion | Public announcement in team meeting, 1-month runway between … | announcing-process-change, introducing-new-client-… | 🟡 | [bay/015_mindset_rolling-out-ae-prospecting.md](bay/015_mindset_rolling-out-ae-prospecting.md) |
| 6.0 | Bay | Why Most AI Sales Tools Fail | AI tool needs a point of view (built by experienced sales le | choosing-ai-tools, leveraging-ai-for-prep… | 🟢 | [bay/020_mindset_ai-tools-need-point-of-view.md](bay/020_mindset_ai-tools-need-point-of-view.md) |
| 6.0 | Bay | Sales Enablement needs to proactively surface insights | Proactively surface insights (don't wait for direction), Ana… | enablement-strategy, data-driven-improvement… | 🟡 | [bay/030_mindset_enablement-proactively-surface-insights.md](bay/030_mindset_enablement-proactively-surface-insights.md) |
| 6.0 | Hormozi | How to Win With AI in 2026 | Workflow-based thinking over role-based hiring, Train AI lik… | agency-positioning, automation-strategy… | 🟡 | [hormozi/017_mindset_ai-first-workflow-thinking.md](hormozi/017_mindset_ai-first-workflow-thinking.md) |
| 6.0 | Hormozi | How to Change Your Life | All upside is on other side of uncertainty and delay, Downsi… | client-decision-coaching, objection-fear-of-loss | 🟡 | [hormozi/020_mindset_tradeoffs-fixed-cost-of-suffering.md](hormozi/020_mindset_tradeoffs-fixed-cost-of-suffering.md) |
| 6.0 | Hormozi | 15 Brutal Truths I Know at 36 That I Wish I Knew at 20 | Suffering is a fixed cost — pick a goal worth suffering for,… | motivation, founder-perspective… | 🔴 | [hormozi/022_mindset_fifteen-brutal-truths.md](hormozi/022_mindset_fifteen-brutal-truths.md) |
| 5.5 | Bay | Sales Managers are corporate stewards NOT friends with their reps | Put a line between manager-friendly and being-everything-to- | managing-direct-reports, laying-off-team-members… | 🟡 | [bay/027_mindset_corporate-steward-not-friend.md](bay/027_mindset_corporate-steward-not-friend.md) |
| 5.5 | Hormozi | If you’re ambitious but inconsistent, please watch this | Follow your passion is a lie — interests get you started, pr… | motivation, client-mindset-coaching… | 🔴 | [hormozi/013_mindset_follow-passion-myth-frustration-tolerance.md](hormozi/013_mindset_follow-passion-myth-frustration-tolerance.md) |
| 5.0 | Hormozi | How Acquisition.com Makes Money | Eyeballs → contact → conversion → ascension funnel, Disney a… | business-model-design, premium-tier-strategy… | 🔴 | [hormozi/006_mindset_acq-business-model-flywheel.md](hormozi/006_mindset_acq-business-model-flywheel.md) |
| 5.0 | Hormozi | If I Wanted to Make My First $100K in 2026, I’d Do This | Cut all costs (food/car/shelter to minimum), Save time — 444… | early-stage-coaching, client-financial-discipline | 🟡 | [hormozi/014_mindset_first-100k-six-steps.md](hormozi/014_mindset_first-100k-six-steps.md) |
| 5.0 | Hormozi | Build a Mind So Strong It Scares People | Mental Toughness = chance bad thing changes behavior against… | motivation, founder-recovery… | 🔴 | [hormozi/016_mindset_mental-toughness-four-components.md](hormozi/016_mindset_mental-toughness-four-components.md) |
| 5.0 | Hormozi | It took me 36 years to realize what I’ll tell you in 26 minutes… | Passio = suffering (Latin) — not love, Path is the passion, … | motivation, founder-meaning | 🔴 | [hormozi/028_mindset_passion-myth-duty-quest.md](hormozi/028_mindset_passion-myth-duty-quest.md) |
| 4.5 | Hormozi | how to force yourself to be consistent and do hard things | Many-sided die metaphor — keep rolling, every die has a gree… | motivation, outreach-persistence… | 🔴 | [hormozi/012_mindset_many-sided-dice-infinite-game.md](hormozi/012_mindset_many-sided-dice-infinite-game.md) |
| 4.5 | Hormozi | How to make progress faster than everyone | Cringe = defensive status play, interpret positively, Docume… | content-creation-mindset, early-stage-encouragemen | 🟡 | [hormozi/024_mindset_embrace-the-cringe-document.md](hormozi/024_mindset_embrace-the-cringe-document.md) |
| 4.5 | Hormozi | give me 14 minutes and you'll learn how to be absurdly happy with your | Wanting everything = formula for dissatisfaction, High commi… | motivation, client-mindset-coaching | 🔴 | [hormozi/029_mindset_tradeoffs-and-commitment.md](hormozi/029_mindset_tradeoffs-and-commitment.md) |
| 4.0 | Hormozi | If You Have a Hard Life, Watch This | Tolerance/Fortitude/Resilience/Adaptability (same as #016),  | motivation, founder-recovery | 🔴 | [hormozi/019_mindset_mental-toughness-grief-framework.md](hormozi/019_mindset_mental-toughness-grief-framework.md) |
| 1.0 | Hormozi | $100M Money Models Rick Roll |  |  | ✅ | [hormozi/026_mindset_rick-roll-promo-video.md](hormozi/026_mindset_rick-roll-promo-video.md) |

## Tonalita

**Total: 13 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 10.0 | Cole Gordon | Subcommunication & Tonality - Advanced Sales Techniques 05 | Three filters for idea receptiveness: Certainty + Inner Alig… | improving-call-tonality, building-authority-frame… | 🟢 | [cole-gordon/030_tonalita_subcommunication-three-mechanisms.md](cole-gordon/030_tonalita_subcommunication-three-mechanisms.md) |
| 9.5 | Hormozi | How to Speak So Well People Give You Money | Sales Tone — 5 elements (volume, speed, articulation, pauses… | sales-script-design, tonality-training… | 🟡 | [hormozi/001_tonalita_sales-tone-five-elements.md](hormozi/001_tonalita_sales-tone-five-elements.md) |
| 9.5 | Miner | 2026 Cold Calling Techniques (He Trained 1 Million Sales Reps) | Hey, it's Jeremy. Jeremy Miner. I'm holding a copy of your b… | cold-call-opener, first-30-seconds… | 🟡 | [miner/003_prospecting_2026-cold-calling-pattern-interrupt.md](miner/003_prospecting_2026-cold-calling-pattern-interrupt.md) |
| 9.1 | Voss | Use this Secret To Ask for Something and INCREASE Sales! | Playful tone of voice ("31% smarter in positive frame"), Gre… | asking-for-discount, timing-your-asks… | 🟡 | [voss/006_tonalita_playful-voice-green-light.md](voss/006_tonalita_playful-voice-green-light.md) |
| 9.0 | Miner | 5 Tonalities To Master To Close Any Deal | 5 NEPQ tones — Curious, Confused, Challenging, Concerned, Pl… | matching-tone-to-question-type, opening-a-prospect… | 🟢 | [miner/009_tonalita_5-nepq-tonalities.md](miner/009_tonalita_5-nepq-tonalities.md) |
| 9.0 | Miner | The Exact Script That Made Me 3 Million Dollars in 12 Months | Hey, John, it's it's Jeremy. Jeremy Miner with XYZ" (familia… | cold-call-opener-3m-rep-script, calling-expired-li… | 🟡 | [miner/030_prospecting_3m-script-cold-call-framework.md](miner/030_prospecting_3m-script-cold-call-framework.md) |
| 8.6 | Voss | The Secret to Dealing With Attacks In a Negotiation! | WAIT acronym (Why Am I Talking) + stay curious, Find the "wh… | controlling-your-own-tone-under-attack, de-escalat… | 🟢 | [voss/010_tonalita_wait-stay-curious-baggage.md](voss/010_tonalita_wait-stay-curious-baggage.md) |
| 8.5 | Cole Gordon | 3 Dark Psychological Sales Tricks To Sell ANYTHING | Power Resolve = quiet certainty, NOT hyped-up energy. Michae… | building-authority-frame, delivering-case-studies… | 🟢 | [cole-gordon/003_tonalita_resolve-social-proof-vocal-authority.md](cole-gordon/003_tonalita_resolve-social-proof-vocal-authority.md) |
| 8.5 | Miner | Your Sales Pitch Sounds Like Trash (Fix It in 12 Minutes) | 5 NEPQ tones (recap), Off the record — what's really holding… | making-questions-sound-conversational, bridging-fr… | 🟢 | [miner/011_tonalita_verbal-pauses-and-pacing.md](miner/011_tonalita_verbal-pauses-and-pacing.md) |
| 8.5 | Miner | 12-Minute Masterclass on Preventing Objections to Increase Close Rate | 5 NEPQ tones — Curious / Confused / Challenging / Concerned … | matching-tone-to-question-type, bridging-questions… | 🟢 | [miner/014_tonalita_5-tonalities-and-verbal-cues.md](miner/014_tonalita_5-tonalities-and-verbal-cues.md) |
| 8.3 | Voss | The Winner of the Johnny Depp Defamation Lawsuit Discloses Critical St | Test and try every communication style with team (show & tel… | dealing-with-provocative-counterpart, cross-team-a… | 🟡 | [voss/027_tonalita_depp-heard-genuine.md](voss/027_tonalita_depp-heard-genuine.md) |
| 8.0 | Miner | Master This Speaking Skill To Close More Deals | Verbal pause before/after key word controls focus, 100% happ… | building-urgency-via-pause-placement, making-quest… | 🟢 | [miner/015_tonalita_verbal-pause-placement-urgency.md](miner/015_tonalita_verbal-pause-placement-urgency.md) |
| 6.5 | Bay | The art of "fun" on sales calls | People will find reasons to do business with people they lik… | cold-call-tonality, gatekeeper-conversations… | 🟢 | [bay/028_tonalita_fun-on-sales-calls.md](bay/028_tonalita_fun-on-sales-calls.md) |

## Kvalifikace

**Total: 7 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 9.0 | Bay | \"We increased pipeline by 170% this month!\ | Narrow to fewer industries/personas → 170% pipeline growth, … | icp-refinement, target-account-prioritization… | 🟡 | [bay/029_kvalifikace_say-no-narrow-niche-170-percent.md](bay/029_kvalifikace_say-no-narrow-niche-170-percent.md) |
| 9.0 | Cole Gordon | My Sales Team Hit $100M with This ONE Shift | Primary KPI = OFFERS PER CLOSER PER DAY (not just show rate)… | increasing-show-rates, building-sales-ops-dept… | 🟡 | [cole-gordon/029_kvalifikace_seven-show-rate-levers-sales-ops.md](cole-gordon/029_kvalifikace_seven-show-rate-levers-sales-ops.md) |
| 8.8 | Voss | It is Not a Sin to Take a While to Make a deal, It is a Sin to Take a  | Proof of Life" framing (is there a real deal & is it with YO… | disqualifying-time-wasters, sniffing-out-fake-deal… | 🟡 | [voss/023_kvalifikace_proof-of-life.md](voss/023_kvalifikace_proof-of-life.md) |
| 8.5 | Cole Gordon | Live Outbound Sales Call - Full Appointment Setter Training | Open with reason + permission: 'Quick 5 minutes now?', Don't… | cold-call-opening-when-prospect-busy, quick-qualif… | 🟡 | [cole-gordon/006_kvalifikace_live-outbound-appointment-setting.md](cole-gordon/006_kvalifikace_live-outbound-appointment-setting.md) |
| 8.5 | Cole Gordon | I Did $119M In Revenue w/These 11 Funnels (Copy Them) | Three content categories: Direct CTA + Indirect (value + CTA… | choosing-right-funnel-for-stage, dm-conversation-d… | 🟡 | [cole-gordon/021_kvalifikace_eleven-funnels-119m-revenue.md](cole-gordon/021_kvalifikace_eleven-funnels-119m-revenue.md) |
| 8.0 | Bay | Outbound: Disqualification is the most important step | Martini glass pipeline (narrow top, go deep on fewer), Accou… | icp-refinement, prospecting-list-narrowing… | 🟢 | [bay/021_kvalifikace_martini-glass-narrow-funnel.md](bay/021_kvalifikace_martini-glass-narrow-funnel.md) |
| 7.5 | Bay | Dialers won't fix your cold calling problem | Volume isn't the fix for cold call problems (spam-flagging k… | choosing-outreach-tooling, improving-connect-rate… | 🟡 | [bay/007_kvalifikace_dialers-dont-fix-cold-calling.md](bay/007_kvalifikace_dialers-dont-fix-cold-calling.md) |

## Pricing

**Total: 7 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 9.5 | Cole Gordon | Stop Losing Sales Over Price, Say This Instead (Live Roleplay) | Money aside, do you really want to do this? (Double tie-down… | too-expensive-objection, cant-afford-objection… | 🟢 | [cole-gordon/001_pricing_money-aside-double-tie-down.md](cole-gordon/001_pricing_money-aside-double-tie-down.md) |
| 9.5 | Hormozi | Why you aren't making as much money as you want | Sell to rich — top 1% has more wealth than bottom 90%, Paret… | pricing-tier-design, high-ticket-objection… | 🟡 | [hormozi/007_pricing_sell-to-the-rich-pareto-tiers.md](hormozi/007_pricing_sell-to-the-rich-pareto-tiers.md) |
| 9.0 | Cole Gordon | Handling "It's Too Expensive" Objection While Driving | Determine TRUE financial vs SMOKESCREEN for uncertainty FIRS… | too-expensive-objection, structuring-payment-split… | 🟢 | [cole-gordon/014_pricing_too-expensive-objection-driving.md](cole-gordon/014_pricing_too-expensive-objection-driving.md) |
| 9.0 | Hormozi | Making Money is a Game (Here's the Cheat Code) | Money Model = sequence of offers maximizing upfront cash + L… | pricing-architecture, offer-stack-design… | 🟡 | [hormozi/015_pricing_money-model-four-offer-types.md](hormozi/015_pricing_money-model-four-offer-types.md) |
| 9.0 | Hormozi | If I Started A Business in 2026, I'd Do This | Either ultra-cheap mass OR ultra-expensive few (middle dies)… | premium-tier-creation, one-on-one-pricing… | 🟡 | [hormozi/023_pricing_one-on-one-unscalable-premium.md](hormozi/023_pricing_one-on-one-unscalable-premium.md) |
| 9.0 | Miner | 10 Minute Training to Crush Any Price Objection | Well it depends — you must have asked me that for a reason t… | prospect-asks-for-discount, competitor-offered-10-… | 🟢 | [miner/021_pricing_discount-deframe-results-thinking.md](miner/021_pricing_discount-deframe-results-thinking.md) |
| 8.0 | Hormozi | The 6 Levels of Making Money | 6 payment structures — Work-then-pay, Pay-as-go, Pay-then-wo… | pricing-structure-design, premium-positioning… | 🟡 | [hormozi/004_pricing_risk-arbitrage-payment-structures.md](hormozi/004_pricing_risk-arbitrage-payment-structures.md) |

## Follow-Up

**Total: 8 transcripts**

| Q | Author | Title | Key techniques | Use cases | CZ | File |
|---|---|---|---|---|---|---|
| 9.5 | Voss | The One Phrase that Revives Ghosted Deals! | Have you given up on this deal?" (the one phrase, no padding… | reviving-dead-pipeline, 5th-followup-cadence… | 🟢 | [voss/004_follow-up_ghosted-deal-phrase.md](voss/004_follow-up_ghosted-deal-phrase.md) |
| 9.2 | Voss | #1 Trick To Build Trust With ANY Client! | Scheduled "nothing-new" calls (predictable cadence), Tell th… | retaining-current-clients, reducing-client-anxiety… | 🟢 | [voss/015_follow-up_predictable-cadence.md](voss/015_follow-up_predictable-cadence.md) |
| 9.0 | Bay | How to 3x your contact rates | 3× contact rate with multichannel vs single-channel, KISS ca… | building-outreach-sequence, voicemail-strategy… | 🟡 | [bay/026_follow-up_3x-contact-rate-multichannel.md](bay/026_follow-up_3x-contact-rate-multichannel.md) |
| 9.0 | Cole Gordon | Prospects ghosting your follow up call? Watch this... | Open Loops = tease info you'll provide on next call (case st… | prospect-ghosting-followup, keeping-info-leverage… | 🟢 | [cole-gordon/017_follow-up_open-loops-diffuse-pressure.md](cole-gordon/017_follow-up_open-loops-diffuse-pressure.md) |
| 8.5 | Bay | Biggest mistake when re-engaging closed/lost opps | Time-based INSIGHTS, not time-based HOPE, Re-engage as if it… | re-engaging-cold-clients, reactivating-dead-leads… | 🟢 | [bay/012_follow-up_closed-lost-reengagement.md](bay/012_follow-up_closed-lost-reengagement.md) |
| 8.5 | Hormozi | Watch This To Generate 1000s of Leads (In Any Niche) | Lead magnet = mini-offer solving narrow problem, reveals big… | lead-magnet-design, free-trial-strategy… | 🟡 | [hormozi/008_follow-up_lead-magnet-deprivation-loop.md](hormozi/008_follow-up_lead-magnet-deprivation-loop.md) |
| 8.0 | Hormozi | This Video Should be REQUIRED Viewing For Business Owners | Self-reinforcing review flywheel (effort → customers → resul… | review-strategy, customer-referral-design… | 🟢 | [hormozi/010_follow-up_review-flywheel-four-tactics.md](hormozi/010_follow-up_review-flywheel-four-tactics.md) |
| 7.0 | Hormozi | Copy This Strategy, It'll Blow Up Your Business | Two-tier affiliate offer — top performers + long-tail, Prize… | partnership-deals, launch-promotion… | 🟡 | [hormozi/009_follow-up_affiliate-two-tier-structure.md](hormozi/009_follow-up_affiliate-two-tier-structure.md) |

---

## Imperium Skool PDFs (deep references)

Imperium Charlie Morgan original lesson slides. Pro complete A-Z process viz [`imperium-deep.md`](../imperium-deep.md). Pro Charliho originální slides:

| Week | Lesson | Topic | File |
|---|---|---|---|
| W4 | L1 | Sales Introduction | [W4-L1-Sales-Introduction.pdf](../imperium-raw/pdfs/W4-L1-Sales-Introduction.pdf) |
| W4 | L2 | Sales Bedrock | [W4-L2-Sales-Bedrock.pdf](../imperium-raw/pdfs/W4-L2-Sales-Bedrock.pdf) |
| W4 | L3 | Imperium Conversion Playbook | [W4-L3-Imperium-Conversion-Playbook.pdf](../imperium-raw/pdfs/W4-L3-Imperium-Conversion-Playbook.pdf) |
| W4 | L3b | Imperium Conversion Script | [W4-L3b-Imperium-Conversion-Script.pdf](../imperium-raw/pdfs/W4-L3b-Imperium-Conversion-Script.pdf) |
| W4 | L4 | Script Modification | [W4-L4-Script-Modification.pdf](../imperium-raw/pdfs/W4-L4-Script-Modification.pdf) |
| W4 | L5 | Conquering Objections P1 | [W4-L5-Conquering-Objections-P1.pdf](../imperium-raw/pdfs/W4-L5-Conquering-Objections-P1.pdf) |
| W4 | L6 | Conquering Objections P2 | [W4-L6-Conquering-Objections-P2.pdf](../imperium-raw/pdfs/W4-L6-Conquering-Objections-P2.pdf) |
| W4 | L7 | Oscillation Of Doubt | [W4-L7-Oscillation-Of-Doubt.pdf](../imperium-raw/pdfs/W4-L7-Oscillation-Of-Doubt.pdf) |
| W5 | L1 | Appointments Introduction | [W5-L1-Appointments-Introduction.pdf](../imperium-raw/pdfs/W5-L1-Appointments-Introduction.pdf) |
| W5 | L2 | Outbound Inbound Rulebook | [W5-L2-Outbound-Inbound-Rulebook.pdf](../imperium-raw/pdfs/W5-L2-Outbound-Inbound-Rulebook.pdf) |
| W5 | L3 | Asymmetric Psychological Leverage | [W5-L3-Asymmetric-Psychological-Leverage.pdf](../imperium-raw/pdfs/W5-L3-Asymmetric-Psychological-Leverage.pdf) |
| W5 | L4 | Building Outbound Systems | [W5-L4-Building-Outbound-Systems.pdf](../imperium-raw/pdfs/W5-L4-Building-Outbound-Systems.pdf) |
| W5 | L5 | Building Inbound Systems | [W5-L5-Building-Inbound-Systems.pdf](../imperium-raw/pdfs/W5-L5-Building-Inbound-Systems.pdf) |
| W5 | L6 | 90 Day Plan Of Attack | [W5-L6-90-Day-Plan-Of-Attack.pdf](../imperium-raw/pdfs/W5-L6-90-Day-Plan-Of-Attack.pdf) |

---

## Maintenance

Tento index je **regenerovaný** Python skriptem `scripts/build_index.py`. Při přidání nových transcripts (stejný formát frontmatteru jako stávající) spusť z kořene repa:

```bash
python3 scripts/build_index.py
```
