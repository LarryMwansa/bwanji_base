"use client"

import { useState } from "react";

export default function SocialFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");

  // Simple formatter: replaces markdown-like syntax with unicode
  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold
      .replace(/\*(.*?)\*/g, "$1") // italic
      .replace(/~~(.*?)~~/g, "$1") // strikethrough
      .replace(/`(.*?)`/g, "$1"); // monospace
  }

  function handleFormat() {
    setFormatted(formatText(input));
  }

  function handleCopy() {
    navigator.clipboard.writeText(formatted);
  }

  // Unicode style maps
  const unicodeMaps = {
    bold: {
      a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
      A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
    },
    italic: {
      a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
      A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
    },
    monospace: {
      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
    },
    strikethrough: {
      // Strikethrough is done by combining with U+0336
    }
  };

  function applyUnicodeStyle(style) {
    const textarea = document.querySelector("#post-input");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = input.slice(start, end);
    let styled = selected;
    if (style === "strikethrough") {
      styled = selected.split("").map(ch => ch + "\u0336").join("");
    } else if (unicodeMaps[style]) {
      styled = selected.split("").map(ch => unicodeMaps[style][ch] || ch).join("");
    }
    const newText = input.slice(0, start) + styled + input.slice(end);
    setInput(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + styled.length);
    }, 0);
  }

  function insertBullet() {
    const textarea = document.querySelector("#post-input");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    // Find start of current line
    const before = input.slice(0, start);
    const after = input.slice(end);
    const lastNewline = before.lastIndexOf("\n");
    const insertPos = lastNewline + 1;
    const newText = before.slice(0, insertPos) + "• " + before.slice(insertPos) + after;
    setInput(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2);
    }, 0);
  }

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
      <h1>Social Media Post Formatter</h1>
      <textarea
        id="post-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your post here..."
        rows={6}
        style={{ width: "400px", padding: "1rem", marginBottom: "0.5rem" }}
      />
      {/* Toolbar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button type="button" onClick={() => applyUnicodeStyle("bold")}>Bold</button>
        <button type="button" onClick={() => applyUnicodeStyle("italic")}>Italic</button>
        <button type="button" onClick={() => applyUnicodeStyle("strikethrough")}>Strikethrough</button>
        <button type="button" onClick={() => applyUnicodeStyle("monospace")}>Monospace</button>
        <button type="button" onClick={() => setInput(input + " 😊")}>Emoji</button>
        <button type="button" onClick={insertBullet}>Bullet Point</button>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={handleFormat}>Format</button>
        <button onClick={handleCopy}>Copy</button>
      </div>
      <div style={{ width: "400px", minHeight: "100px", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", background: "#fafafa" }}>
        <span>{formatted || "Preview will appear here..."}</span>
      </div>
      <div style={{ marginTop: "2rem", color: "#888", fontSize: "0.9rem" }}>
        <p><b>Formatting:</b> <br />
          <span>**bold** &nbsp; *italic* &nbsp; ~~strikethrough~~ &nbsp; `monospace`</span>
        </p>
        <p>Use emoji and special characters for extra flair!</p>
      </div>
    </main>
  );
}
