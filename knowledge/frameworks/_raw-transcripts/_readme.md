# Raw Transcripts — Schema & Retrieval Instructions

**Co tato složka obsahuje:** Strukturované transcripty z YouTube videí + Skool lekcí + podcast appearances. Každý soubor = 1 zdroj = 1 set insights.

**Cíl:** AI při skill call NEčte všechny transcripty (overflow context). Místo toho:
1. Načte master `_transcripts-index.md` (jen frontmatter summary všech files)
2. Identify relevant files based on situation
3. Load specific 2-5 transcripts on-demand

Tento workflow = **RAG-lite** (lightweight retrieval-augmented generation).

---

## Folder structure

```
_raw-transcripts/
├── _readme.md (this file)
├── hormozi/      ← Alex Hormozi YouTube + podcast appearances
├── voss/         ← Chris Voss YouTube + podcast
├── cole-gordon/  ← Cole Gordon YouTube + podcast
├── miner/        ← Jeremy Miner YouTube + podcast
├── bay/          ← Jason Bay YouTube + podcast
├── charlie-morgan/ ← Charlie Morgan (Imperium) own YouTube
└── imperium/     ← Imperium Academy Skool lessons
    ├── w1/       ← Week 1: Business Genesis
    ├── w2/       ← Week 2: Self Transcendence
    ├── w3/       ← Week 3: Client Results
    ├── w4/       ← Week 4: Closing Clients (L4.3 already done)
    ├── w5/       ← Week 5: Booking Appointments
    ├── w6/       ← Week 6: Operations & Finances
    ├── w7/       ← Week 7: $10k/mo Growth Playbook
    ├── bonuses/  ← Bonuses & Tech
    └── case-studies/ ← 6 & 7 Figure Case Studies
```

---

## File naming convention

`{NNN}_{topic-slug}_{key-technique-slug}.md`

Examples:
- `001_pricing_value-equation.md`
- `002_objections_3-as-framework.md`
- `003_discovery_clarify-stack.md`

**NNN** = 3-digit sequence per author (001-999)
**topic-slug** = primary topic (pricing | objections | discovery | closing | mindset | tonalita | follow-up | kvalifikace)
**key-technique-slug** = main technique name, kebab-case

---

## Frontmatter schema (POVINNÝ format)

Každý transcript MUSÍ mít tento YAML frontmatter:

```yaml
---
# Identification
id: hormozi-001                    # author-NNN
author: Hormozi                    # display name
source_type: youtube               # youtube | podcast | book-chapter | skool-lesson | x-thread | linkedin
source_url: https://...            # direct URL
title: "30 Minutes of Sales Training..."  # original title
date: 2024-03-15                   # upload/publish date
duration: 12:34                    # mm:ss or hh:mm:ss
views: 487000                      # if YouTube

# Classification (controlled vocabulary — DŮLEŽITÉ for grep)
primary_topics:                    # ONE-OF: discovery | namitky | closing | mindset | tonalita | kvalifikace | pricing | follow-up
  - pricing
secondary_topics:                  # free-form, 2-5 tags
  - value-equation
  - anchoring
use_cases:                         # konkrétní situations kdy je tento transcript relevantní
  - pricing-objection
  - value-justification
  - first-time-pricing-reveal
key_techniques:                    # 3-7 named techniques
  - Value Equation formula
  - Anchor heinous amount first
  - "Charge as much as humanly possible"
applicable_skills:                 # které skills mohou tento transcript loadovat
  - analyzuj-call
  - priprav-call
  - role-play

# Quality metadata
cz_adaptation_needed: high         # high | medium | low | none
word_count: 4523
quality_score: 8.5                 # 1-10 — agent's assessment of insight density

# Quick context (NEJDŮLEŽITĚJŠÍ pro skill)
summary: |
  2-4 věty co se v tomto transcriptu řeší. Pokud agent najde "pricing objection"
  v hovoru, přečte si tento summary a rozhodne, jestli celý transcript
  load či ne. Summary musí mít: (1) hlavní téma, (2) klíčový insight,
  (3) CZ adaptation note (pokud relevantní).

best_quotes:                       # 2-3 nejlepší direct quotes (40 slov max each)
  - "Value = (Dream Outcome × Likelihood) / (Time Delay × Effort)"
  - "Those who pay the most pay the most attention."
---
```

Po frontmatter následuje **tělo transcriptu** (cleaned-up text, ideálně s timestamps).

---

## Controlled vocabulary (POVINNÝ)

**Primary topics** (8 hodnot, MUSÍ být jedna z nich):
- `discovery`
- `namitky`
- `closing`
- `mindset`
- `tonalita`
- `kvalifikace`
- `pricing`
- `follow-up`

**Source types** (5 hodnot):
- `youtube` — YouTube video
- `podcast` — Podcast appearance/own podcast
- `book-chapter` — Book chapter extract
- `skool-lesson` — Imperium Skool lesson
- `x-thread` — X/Twitter thread
- `linkedin` — LinkedIn post

**CZ adaptation needed** (4 hodnoty):
- `high` — US-specific framing, potřeba complete rewrite pro CZ context
- `medium` — koncept funguje, ale CZ phrasing potřeba úprava
- `low` — minor tonality tweaks
- `none` — concept je universal

**Applicable skills** (3 hodnoty, libovolná kombinace):
- `analyzuj-call`
- `priprav-call`
- `role-play`

---

## Retrieval workflow pro skills

```
Skill call (e.g. /analyzuj-call):

1. Read primary per-topic file (e.g., pricing-framing.md)
   → Always loaded, ~5k tokens

2. Read _transcripts-index.md (jen frontmatter overview)
   → ~5-10k tokens

3. Identify relevant transcripts:
   a. Grep index for primary_topics matching call situation
   b. Filter by use_cases tag
   c. Top 3-5 by quality_score
   
4. Load specific transcripts (full body)
   → Each ~3-5k tokens, total ~15-20k

5. Synthesize answer using both per-topic file + selected transcripts

Total tokens per call: ~30-40k (vs ~700k if loaded everything)
```

---

## Quality control

**Co MÁ být v transcript file:**
- ✅ Strukturovaný frontmatter (validate against schema)
- ✅ Body text s timestamps `[mm:ss]` kde to dává smysl
- ✅ Direct quotes jasně označené
- ✅ Summary v frontmatter je informativní (3-4 věty)

**Co NEMÁ být:**
- ❌ Filler words ("uh", "you know", "like") — clean up
- ❌ Auto-caption errors necheckované
- ❌ Generic summary ("This video is about sales")
- ❌ Bez tagů v frontmatter

---

## Update workflow

Když přidáváš nové transcripty:
1. Save file s correct frontmatter v správné author složce
2. Regeneruj `_transcripts-index.md` (Bash script v _scripts/)
3. Commit (pokud v git)

---

## Maintenance

- **Audit kvartálně:** check že all files mají valid frontmatter
- **Tag cleanup:** pokud topic emerges víc než 20× v secondary_topics, povýš na primary
- **Quality score recalibration:** po 6 měsících use, retroaktive update quality_score based on real skill outcomes
