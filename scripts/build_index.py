#!/usr/bin/env python3
"""Build master _transcripts-index.md from all transcript files."""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict
try:
    import yaml  # pip3 install pyyaml — bez něj se použije záložní parser níž
except ImportError:
    yaml = None

# Spouštěj z kořene repa: python3 scripts/build_index.py
ROOT = Path(__file__).resolve().parent.parent / "knowledge" / "frameworks" / "_raw-transcripts"
INDEX_FILE = ROOT / "_transcripts-index.md"

VALID_TOPICS = ["discovery", "namitky", "closing", "mindset", "tonalita", "kvalifikace", "pricing", "follow-up"]

def parse_frontmatter(content):
    """Extract YAML frontmatter from markdown file. Falls back to regex extraction if YAML invalid."""
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not m:
        m = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not m:
        return None

    yaml_text = m.group(1)

    # Try strict YAML parse first
    if yaml is not None:
        try:
            return yaml.safe_load(yaml_text)
        except yaml.YAMLError:
            pass

    # Fallback: regex extraction of key fields (handles malformed YAML)
    data = {}
    # Simple scalar fields
    for key in ["id", "author", "source_type", "source_url", "title", "date", "duration", "views",
                "cz_adaptation_needed", "word_count", "quality_score"]:
        m2 = re.search(rf'^{key}:\s*(.+?)$', yaml_text, re.MULTILINE)
        if m2:
            val = m2.group(1).strip().strip('"').strip("'")
            # Try numeric conversion
            try:
                if "." in val:
                    val = float(val)
                else:
                    val = int(val)
            except ValueError:
                pass
            data[key] = val

    # List fields — extract items under the key
    for key in ["primary_topics", "secondary_topics", "use_cases", "key_techniques",
                "applicable_skills", "best_quotes"]:
        items = []
        in_section = False
        for line in yaml_text.split("\n"):
            if line.startswith(f"{key}:"):
                in_section = True
                continue
            if in_section:
                # Stop at next top-level key (no leading whitespace, has colon)
                if re.match(r'^\S+:', line):
                    break
                # Match list item
                m3 = re.match(r'^\s+-\s+(.+?)$', line)
                if m3:
                    val = m3.group(1).strip().strip('"').strip("'")
                    items.append(val)
        if items:
            data[key] = items

    # summary — block-style multi-line
    m_sum = re.search(r'^summary:\s*\|?\s*\n((?:\s+.+\n?)+)', yaml_text, re.MULTILINE)
    if m_sum:
        data["summary"] = " ".join(l.strip() for l in m_sum.group(1).strip().split("\n"))

    return data if data else None

def to_str(item):
    """Coerce list items (str or dict) to single-line string."""
    if isinstance(item, str):
        return item
    if isinstance(item, dict):
        # Some agents nested dicts — flatten to "key: value" or first value
        if len(item) == 1:
            k, v = next(iter(item.items()))
            return f"{k}: {v}" if v else str(k)
        return "; ".join(f"{k}: {v}" for k, v in item.items())
    return str(item)

def process_files():
    """Walk _raw-transcripts, collect metadata from all .md files."""
    entries = []
    for author_dir in sorted(ROOT.iterdir()):
        if not author_dir.is_dir() or author_dir.name.startswith("_"):
            continue
        for md_file in sorted(author_dir.glob("*.md")):
            content = md_file.read_text(encoding="utf-8")
            fm = parse_frontmatter(content)
            if not fm:
                print(f"Skip (no frontmatter): {md_file}")
                continue

            # Normalize primary_topics (list or str)
            topics = fm.get("primary_topics", [])
            if isinstance(topics, str):
                topics = [topics]

            # Validate against vocabulary
            invalid = [t for t in topics if t not in VALID_TOPICS]
            if invalid:
                print(f"Invalid topics in {md_file.name}: {invalid}", file=sys.stderr)

            entries.append({
                "file": str(md_file.relative_to(ROOT)),
                "id": fm.get("id", ""),
                "author": fm.get("author", author_dir.name),
                "title": fm.get("title", ""),
                "primary_topics": topics,
                "secondary_topics": fm.get("secondary_topics", []) or [],
                "use_cases": fm.get("use_cases", []) or [],
                "key_techniques": fm.get("key_techniques", []) or [],
                "applicable_skills": fm.get("applicable_skills", []) or [],
                "cz_adaptation_needed": fm.get("cz_adaptation_needed", "unknown"),
                "quality_score": fm.get("quality_score", 0),
                "duration": fm.get("duration", ""),
                "views": fm.get("views", 0),
                "summary": (fm.get("summary", "") or "").strip(),
                "best_quotes": fm.get("best_quotes", []) or [],
                "source_url": fm.get("source_url", ""),
            })
    return entries

def build_index(entries):
    """Generate master index markdown."""
    lines = []
    lines.append("# Transcripts Master Index — RAG-lite navigation")
    lines.append("")
    lines.append("**Co tento soubor je:** Master tabulka všech raw transcripts z YouTube + Imperium Skool. AI při skill call načte TENHLE INDEX (ne full files), identifikuje relevant subset (1-5 files), pak load specific transcripts.")
    lines.append("")
    lines.append(f"**Total transcripts:** {len(entries)}")
    lines.append("")
    lines.append("**Distribution per author:**")
    by_author = defaultdict(int)
    for e in entries:
        by_author[e["author"]] += 1
    for author, count in sorted(by_author.items(), key=lambda x: -x[1]):
        lines.append(f"- {author}: {count}")
    lines.append("")

    # Distribution per primary topic
    by_topic = defaultdict(list)
    for e in entries:
        for t in e["primary_topics"]:
            by_topic[t].append(e)

    lines.append("**Distribution per primary topic:**")
    for topic in VALID_TOPICS:
        count = len(by_topic.get(topic, []))
        lines.append(f"- `{topic}`: {count} transcripts")
    lines.append("")

    # Quick navigation
    lines.append("## Quick navigation")
    lines.append("")
    for topic in VALID_TOPICS:
        count = len(by_topic.get(topic, []))
        lines.append(f"- [{topic.title()} ({count})](#{topic})")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Retrieval workflow guide
    lines.append("## How AI uses this index (RAG-lite workflow)")
    lines.append("")
    lines.append("1. **Skill (e.g. /analyzuj-call) loads:**")
    lines.append("   - Primary per-topic file (`discovery.md`, `namitky.md`, atd.) — always loaded")
    lines.append("   - **THIS INDEX FILE** — scan tabulky for relevant transcripts")
    lines.append("2. **Identify relevant transcripts:**")
    lines.append("   - Filter by `primary_topics` matching call situation")
    lines.append("   - Filter by `use_cases` tag (e.g., `pricing-objection`)")
    lines.append("   - Pick top 3-5 by `quality_score`")
    lines.append("3. **Load specific transcripts** (only those 3-5) — read full body for direct quotes + techniques")
    lines.append("4. **Synthesize answer** using per-topic + selected transcripts")
    lines.append("")
    lines.append("**Token budget per skill call: ~30-40k (vs 700k+ if loaded everything).**")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Per-topic tables
    for topic in VALID_TOPICS:
        topic_entries = sorted(by_topic.get(topic, []), key=lambda e: -e["quality_score"])
        if not topic_entries:
            continue

        lines.append(f"## {topic.title()}")
        lines.append("")
        lines.append(f"**Total: {len(topic_entries)} transcripts**")
        lines.append("")
        lines.append("| Q | Author | Title | Key techniques | Use cases | CZ | File |")
        lines.append("|---|---|---|---|---|---|---|")
        for e in topic_entries:
            quality = f"{e['quality_score']:.1f}" if e['quality_score'] else "?"
            techs = ", ".join(to_str(t) for t in e["key_techniques"][:3])[:60]
            if len(e["key_techniques"]) > 3:
                techs += "…"
            uses = ", ".join(to_str(u) for u in e["use_cases"][:2])[:50]
            if len(e["use_cases"]) > 2:
                uses += "…"
            title = (e["title"] or "")[:70].replace("|", "\\|")
            file_link = f"[{e['file']}]({e['file']})"
            cz = e["cz_adaptation_needed"]
            cz_short = {"high": "🔴", "medium": "🟡", "low": "🟢", "none": "✅", "unknown": "?"}.get(cz, cz)
            lines.append(f"| {quality} | {e['author']} | {title} | {techs} | {uses} | {cz_short} | {file_link} |")
        lines.append("")

    # Imperium PDFs section
    pdfs_dir = ROOT.parent / "imperium-raw" / "pdfs"
    if pdfs_dir.exists():
        lines.append("---")
        lines.append("")
        lines.append("## Imperium Skool PDFs (deep references)")
        lines.append("")
        lines.append("Imperium Charlie Morgan original lesson slides. Pro complete A-Z process viz [`imperium-deep.md`](../imperium-deep.md). Pro Charliho originální slides:")
        lines.append("")
        lines.append("| Week | Lesson | Topic | File |")
        lines.append("|---|---|---|---|")
        for pdf in sorted(pdfs_dir.glob("*.pdf")):
            name = pdf.stem
            # W4-L3-Imperium-Conversion-Playbook → W4, L3, Imperium Conversion Playbook
            parts = name.split("-", 2)
            if len(parts) == 3:
                week, lesson, title = parts
                title = title.replace("-", " ")
                lines.append(f"| {week} | {lesson} | {title} | [{pdf.name}](../imperium-raw/pdfs/{pdf.name}) |")
        lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("## Maintenance")
    lines.append("")
    lines.append("Tento index je **regenerovaný** Python skriptem `scripts/build_index.py`. Při přidání nových transcripts (stejný formát frontmatteru jako stávající) spusť z kořene repa:")
    lines.append("")
    lines.append("```bash")
    lines.append("python3 scripts/build_index.py")
    lines.append("```")
    lines.append("")

    return "\n".join(lines)

def main():
    entries = process_files()
    print(f"Processed {len(entries)} files")

    index_content = build_index(entries)
    INDEX_FILE.write_text(index_content, encoding="utf-8")
    print(f"Index written: {INDEX_FILE}")
    print(f"Index size: {len(index_content)} chars")

if __name__ == "__main__":
    main()
