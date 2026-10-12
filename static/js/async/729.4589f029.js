"use strict";
(self.webpackChunkmy_trading_bot = self.webpackChunkmy_trading_bot || []).push([["729"], {
  47394(e, s, t) {
    t.r(s), t.d(s, { default: () => z });
    const i = t(74848), a = t(96540), x = t(69469), m = t(88332);

    const WS_URL = "wss://api.derivws.com/trading/v1/options/ws/public";
    const SYMBOLS = [
      { v: "1HZ90V", l: "Volatility 90 (1s) Index" },
      { v: "R_10", l: "Volatility 10 Index" },
      { v: "R_25", l: "Volatility 25 Index" },
      { v: "R_50", l: "Volatility 50 Index" },
      { v: "R_75", l: "Volatility 75 Index" },
      { v: "R_100", l: "Volatility 100 Index" },
      { v: "1HZ10V", l: "Volatility 10 (1s) Index" },
      { v: "1HZ25V", l: "Volatility 25 (1s) Index" },
      { v: "1HZ50V", l: "Volatility 50 (1s) Index" },
      { v: "1HZ75V", l: "Volatility 75 (1s) Index" },
      { v: "1HZ100V", l: "Volatility 100 (1s) Index" }
    ];
    const HIST_N = 500, WINDOW_MAX = 800;

    /* ================= styles ================= */
    const CSS = `
.main__container > div{height:100%}.main__container .dc-tabs--top{height:100%}.dc-tabs__list--header--main__tabs{overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.dc-tabs__list--header--main__tabs::-webkit-scrollbar{display:none}@media (max-width:480px){.dc-drawer.run-panel{display:none}.app-header__logo .app-header__logo-img{width:132px;height:auto}.deriv-wrapper.deriv-wrapper__left{padding-inline-start:6px}.deriv-wrapper.deriv-wrapper__right{padding-inline-end:6px}.auth-actions.auth-actions{gap:4px}.auth-actions .dc-btn.dc-btn{margin-left:0;padding:0 7px;font-size:12.5px;height:30px}.auth-actions .nav-trophy{padding:0 2px}}@media (max-width:360px){.app-header__logo .app-header__logo-img{width:92px;height:auto}.auth-actions.auth-actions{gap:3px}.auth-actions .dc-btn.dc-btn{padding:0 6px;font-size:12px}}.mt-page{width:100%;max-width:560px;margin:0 auto;padding:14px 14px 42px;color:var(--text-prominent,#2a2f45);font-family:inherit}
/* tabs */
.mt-tabs::-webkit-scrollbar{display:none}.mt-tabs{display:grid;grid-template-columns:1fr 1.25fr 1fr;gap:4px;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-ms-overflow-style:none;background:#f1f2f7;border:1px solid var(--border-general,#e6e8f0);border-radius:14px;padding:4px;margin-bottom:14px;box-shadow:0 2px 8px rgba(24,28,37,.05)}
.mt-tab{padding:10px 4px;border:none;border-radius:11px;background:transparent;font-size:12.5px;font-weight:800;color:var(--text-less-prominent,#8a8fa3);cursor:pointer;letter-spacing:.2px;white-space:nowrap;transition:all .15s}
.mt-tab.on{background:#fff;color:var(--brand-primary,#ff444f);box-shadow:0 3px 10px rgba(24,28,37,.12)}
.mt-tab:hover:not(.on){color:var(--text-prominent,#2a2f45)}
/* market header */
.mt-market{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.mt-market__ico{flex:0 0 auto;width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#ff5f68,#b71f28);display:grid;place-items:center;color:#fff;font-size:15px;font-weight:900;box-shadow:0 6px 14px rgba(225,50,60,.3)}
.mt-market__body{flex:1;min-width:0}
.mt-select{appearance:none;width:100%;border:none;background:transparent url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='7'><path d='M1 1l5 5 5-5' stroke='%23ff444f' stroke-width='2' fill='none' stroke-linecap='round'/></svg>") no-repeat right 2px center;padding:0 22px 0 0;font-size:17.5px;font-weight:900;letter-spacing:.2px;color:var(--text-prominent,#2a2f45);cursor:pointer;text-overflow:ellipsis}
.mt-select:focus{outline:none}
.mt-quote{display:flex;align-items:center;gap:8px;margin-top:3px;font-variant-numeric:tabular-nums}
.mt-quote__dot{width:7px;height:7px;border-radius:50%;background:#f59e0b;flex:0 0 auto}
.mt-quote__dot.live{background:#16b866;animation:mt-pulse 1.6s infinite}
.mt-quote__dot.off{background:#ff444f;animation:none}
@keyframes mt-pulse{0%{box-shadow:0 0 0 0 rgba(22,184,102,.45)}70%{box-shadow:0 0 0 6px rgba(22,184,102,0)}100%{box-shadow:0 0 0 0 rgba(22,184,102,0)}}
.mt-quote__price{font-size:14px;font-weight:900;color:var(--text-prominent,#2a2f45)}
.mt-quote__chg{font-size:12.5px;font-weight:800}
.mt-quote__chg.up{color:#16b866}.mt-quote__chg.down{color:#ff444f}
/* card shell */
.mt-card{background:#fff;border:1px solid var(--border-general,#e6e8f0);border-radius:18px;padding:16px 14px;box-shadow:0 8px 24px rgba(24,28,37,.06);margin-bottom:14px}
/* digits */
.mt-digits{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.mt-digit{position:relative;aspect-ratio:1/1;border-radius:50%;border:1.5px solid var(--border-general,#e6e8f0);background:#fbfcff;padding:0;cursor:pointer;display:grid;place-items:center;transition:transform .15s,box-shadow .15s,background .15s,border-color .15s;-webkit-tap-highlight-color:transparent}
.mt-digit:hover{transform:translateY(-2px)}
.mt-digit.sel{background:#181c25;border-color:#181c25;box-shadow:0 8px 18px rgba(24,28,37,.35)}
.mt-digit__in{position:absolute;inset:0;display:grid;place-items:center}
.mt-digit__in svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.mt-ring{fill:none;stroke:#e3e5ee;stroke-width:2}
.mt-digit.sel .mt-ring{stroke:#2c3140}
.mt-arc{fill:none;stroke-width:3.4;stroke-linecap:round}
.mt-digit__txt{position:relative;display:flex;flex-direction:column;align-items:center;line-height:1;z-index:1}
.mt-digit__txt b{font-size:clamp(15px,4.6vw,21px);font-weight:900;color:var(--text-prominent,#2a2f45)}
.mt-digit__txt i{font-style:normal;font-size:clamp(9px,2.9vw,12px);font-weight:800;color:var(--text-less-prominent,#6e7288);margin-top:3px;font-variant-numeric:tabular-nums}
.mt-digit.sel .mt-digit__txt b{color:#fff}
.mt-digit.sel .mt-digit__txt i{color:rgba(255,255,255,.75)}
.mt-digit.live::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px dashed var(--brand-primary,#ff444f);animation:mt-spin 5s linear infinite;pointer-events:none}
@keyframes mt-spin{to{transform:rotate(360deg)}}
.mt-digit-stats{margin-top:12px;display:flex;justify-content:space-between;gap:8px;font-size:11px;font-weight:700;color:var(--text-less-prominent,#6e7288)}
/* trade panel */
.mt-learn{display:flex;align-items:center;gap:6px;width:100%;justify-content:flex-start;border:none;background:transparent;padding:0 0 10px;font-size:12.5px;font-weight:700;color:var(--text-less-prominent,#6e7288);cursor:pointer;text-align:left}
.mt-learn:hover{color:var(--brand-primary,#ff444f)}
.mt-learn span{font-size:14px}
.mt-chips{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.mt-chip{display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:11px;border:1.5px solid var(--border-general,#e6e8f0);background:#fbfcff;font-size:13.5px;font-weight:800;color:var(--text-prominent,#2a2f45);cursor:pointer}
.mt-chip.on{border-color:var(--brand-primary,#ff444f);background:rgba(255,68,79,.07);color:var(--brand-primary,#ff444f)}
.mt-chip--digit{cursor:pointer}
.mt-chip--digit b{font-size:15px;font-weight:900}
.mt-learnbox{font-size:12px;line-height:1.55;color:var(--text-less-prominent,#6e7288);background:#f6f7fb;border:1px dashed var(--border-general,#e6e8f0);border-radius:11px;padding:10px 12px;margin:-4px 0 12px}
.mt-vals{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px}
.mt-val{border:1.5px solid var(--border-general,#e6e8f0);border-radius:13px;background:#fbfcff;padding:11px 12px;display:flex;flex-direction:column;gap:2px}
.mt-val:focus-within{border-color:rgba(255,68,79,.55);background:#fff}
.mt-val__main{display:flex;align-items:center;gap:6px}
.mt-val select,.mt-val input{flex:1;min-width:0;border:none;background:transparent;font-size:16px;font-weight:900;color:var(--text-prominent,#2a2f45);font-variant-numeric:tabular-nums;padding:0;appearance:none}
.mt-val select{cursor:pointer}
.mt-val input:focus,.mt-val select:focus{outline:none}
.mt-val__cur{font-size:12.5px;font-weight:900;color:var(--text-less-prominent,#8a8fa3)}
.mt-val__cap{font-size:10.5px;font-weight:800;letter-spacing:.7px;text-transform:uppercase;color:var(--text-less-prominent,#8a8fa3)}
.mt-buy{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.mt-buy button{min-height:74px;padding:12px 8px;border:none;border-radius:16px;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:transform .15s,filter .15s;box-shadow:0 12px 24px rgba(24,28,37,.18);-webkit-tap-highlight-color:transparent}
.mt-buy button:hover{transform:translateY(-2px);filter:brightness(1.05)}
.mt-buy button:active{transform:translateY(0)}
.mt-buy button:disabled{opacity:.6;cursor:progress;transform:none}
.mt-buy .over{background:linear-gradient(160deg,#16c79d,#0d9b7c)}
.mt-buy .under{background:linear-gradient(160deg,#ff6a63,#e1323c)}
.mt-buy__t{font-size:18px;font-weight:900;letter-spacing:.6px;display:flex;align-items:center;gap:7px}
.mt-buy__t em{font-style:normal;font-size:15px;opacity:.9}
.mt-buy__p{font-size:11.5px;font-weight:800;opacity:.92;font-variant-numeric:tabular-nums}
.mt-buy__p u{text-decoration:none;display:block;font-size:9.5px;letter-spacing:.8px;text-transform:uppercase;opacity:.75;margin-bottom:1px}
.mt-acct{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:11.5px;font-weight:700;color:var(--text-less-prominent,#6e7288);margin-bottom:12px;padding:8px 11px;border-radius:10px;background:#f6f7fb;border:1px dashed var(--border-general,#e6e8f0)}
.mt-acct b{color:var(--brand-primary,#ff444f);font-weight:900}
.mt-err{margin-top:10px;padding:9px 12px;border-radius:10px;background:rgba(255,68,79,.08);border:1px solid rgba(255,68,79,.3);color:#c22832;font-size:12.5px;font-weight:700}
.mt-result{margin-top:10px;padding:11px 14px;border-radius:12px;background:rgba(22,184,102,.08);border:1px solid rgba(22,184,102,.35);font-size:12.5px;font-weight:800;color:#0f9d58;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
/* AI analysis (kept below, compact) */
.mt-sub{margin:2px 0 12px;font-size:11.5px;color:var(--text-less-prominent,#6e7288)}
.mt-ai__head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}
.mt-ai__title{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:900}
.mt-ai__mark{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,#ff5f68,#e1323c);color:#fff;font-size:12px;font-weight:900}
.mt-badge{font-size:10px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:var(--brand-primary,#ff444f);background:rgba(255,68,79,.09);border:1px solid rgba(255,68,79,.25);padding:3px 8px;border-radius:999px}
.mt-ai__grid{display:grid;grid-template-columns:130px 1fr;gap:10px}
@media (max-width:420px){.mt-ai__grid{grid-template-columns:1fr}}
.mt-verdict{padding:12px 12px;border-radius:13px;border:1px solid var(--border-general,#e6e8f0);background:linear-gradient(180deg,#fbfbfe,#f6f7fb);text-align:center}
.mt-verdict__word{font-size:20px;font-weight:900;letter-spacing:.3px}
.mt-verdict__word.up{color:#16b866}.mt-verdict__word.down{color:#ff444f}.mt-verdict__word.flat{color:#f59e0b}
.mt-verdict__meta{margin-top:4px;font-size:10.5px;font-weight:700;color:var(--text-less-prominent,#6e7288)}
.mt-conf{height:7px;border-radius:99px;background:#eceef5;overflow:hidden;margin-top:8px}
.mt-conf i{display:block;height:100%;background:linear-gradient(90deg,#ff5f68,#e1323c);border-radius:99px;transition:width .6s cubic-bezier(.2,.8,.2,1)}
.mt-facts{display:flex;flex-direction:column;gap:6px}
.mt-fact{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:7px 10px;border-radius:10px;border:1px solid var(--border-general,#e6e8f0);background:#fdfdff;font-size:11.5px}
.mt-fact__l{display:flex;align-items:center;gap:7px;color:var(--text-less-prominent,#6e7288);font-weight:700}
.mt-fact__d{width:7px;height:7px;border-radius:50%;background:#c8cbd8}
.mt-fact__d.up{background:#16b866}.mt-fact__d.down{background:#ff444f}
.mt-fact__v{font-weight:900;font-variant-numeric:tabular-nums;text-align:right}
.mt-scan{display:flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;color:var(--text-less-prominent,#6e7288);padding:20px 4px}
.mt-scan i{width:15px;height:15px;border-radius:50%;border:2.5px solid rgba(255,68,79,.25);border-top-color:#ff444f;animation:mt-spin2 .9s linear infinite;font-style:normal}
@keyframes mt-spin2{to{transform:rotate(360deg)}}
.mt-note{font-size:10.5px;color:var(--text-less-prominent,#8a8fa3);text-align:center;line-height:1.6;margin-top:4px}@media (min-width:640px){.mt-page{padding-top:20px}} /* ================ floating AI button + dock ================ */ .mt-ai__headend{display:flex;align-items:center;gap:7px} .mt-fab{position:fixed;right:18px;bottom:18px;z-index:900;display:inline-flex;align-items:center;gap:9px;height:52px;padding:0 18px 0 13px;border:0;border-radius:999px;cursor:pointer;color:#fff;font-size:13.5px;font-weight:900;letter-spacing:.4px;background:linear-gradient(135deg,#ff5f68,#e1323c);box-shadow:0 12px 28px rgba(225,50,60,.38);transition:transform .18s ease,box-shadow .18s ease,background .18s ease} .mt-fab:hover{transform:translateY(-2px);box-shadow:0 16px 34px rgba(225,50,60,.46)} .mt-fab:active{transform:translateY(0) scale(.98)} .mt-fab:focus-visible{outline:3px solid rgba(255,68,79,.35);outline-offset:2px} .mt-fab.on{background:#12141c;box-shadow:0 12px 28px rgba(18,20,28,.34)} .mt-fab__ico{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.22);font-size:13px;line-height:1} .mt-fab.on .mt-fab__ico{background:rgba(255,68,79,.2);color:#ff6b73} .mt-fab__txt{line-height:1} .mt-dock{position:fixed;right:18px;bottom:82px;z-index:900;width:min(336px,calc(100vw - 24px));max-height:min(72vh,540px);overflow:auto;overscroll-behavior:contain;padding:14px;border-radius:17px;border:1px solid var(--border-general,#e6e8f0);background:#fff;box-shadow:0 26px 64px rgba(16,18,28,.24);animation:mt-dockin .22s cubic-bezier(.2,.8,.2,1)} @keyframes mt-dockin{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}} .mt-dock__x{width:26px;height:26px;border-radius:9px;border:1px solid var(--border-general,#e6e8f0);background:#fff;color:var(--text-less-prominent,#6e7288);font-size:12px;font-weight:900;line-height:1;cursor:pointer} .mt-dock__x:hover{color:#ff444f;border-color:rgba(255,68,79,.4)} .mt-dock__price{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:2px 0 10px;padding:9px 11px;border-radius:11px;border:1px solid var(--border-general,#e6e8f0);background:#fbfbfe;font-size:11.5px} .mt-dock__pl{color:var(--text-less-prominent,#6e7288);font-weight:700} .mt-dock__pv{font-weight:900;font-variant-numeric:tabular-nums} @media (max-width:480px){.mt-fab{right:12px;bottom:12px;height:48px;padding:0 15px 0 11px}.mt-dock{right:12px;left:12px;bottom:70px;width:auto;max-height:66vh}} `;

    /* ================= helpers ================= */
    function readToken() {
      try {
        const raw = localStorage.getItem("auth_info");
        if (!raw) return "";
        const o = JSON.parse(raw);
        if (o.expires_at && Date.now() > 1e3 * Number(o.expires_at)) return "";
        return String(o.access_token || "");
      } catch (e) { return ""; }
    }
    function readLoginId() { try { return localStorage.getItem("active_loginid") || ""; } catch (e) { return ""; } }
    function fmtPrice(p, pip) {
      if (p == null || !isFinite(Number(p))) return "—";
      const d = pip != null ? Math.min(8, Math.max(0, Number(pip))) : 3;
      return Number(p).toFixed(d);
    }
    function lastDigit(price, pip) {
      if (price == null || !isFinite(Number(price))) return null;
      const p = pip != null ? Number(pip) : 3;
      const s = Math.abs(Number(price)).toFixed(p);
      return Number(s.replace(".", "").slice(-1));
    }

    /* ================= indicators / AI ================= */
    function ema(v, p) {
      if (v.length < p) return null;
      const k = 2 / (p + 1);
      let e = v.slice(0, p).reduce((s, x) => s + x, 0) / p;
      for (let j = p; j < v.length; j++) e = v[j] * k + e * (1 - k);
      return e;
    }
    function rsi(v, p) {
      p = p || 14;
      if (v.length < p + 1) return null;
      let g = 0, l = 0;
      for (let j = v.length - p; j < v.length; j++) { const d = v[j] - v[j - 1]; d >= 0 ? (g += d) : (l -= d); }
      if (l === 0) return 100;
      const rs = (g / p) / (l / p);
      return 100 - 100 / (1 + rs);
    }
    function volPct(v, n) {
      n = n || 20;
      const s = v.slice(-(n + 1));
      if (s.length < 4) return null;
      const r = [];
      for (let j = 1; j < s.length; j++) r.push((s[j] - s[j - 1]) / s[j - 1]);
      const mu = r.reduce((p2, c) => p2 + c, 0) / r.length;
      const sd = Math.sqrt(r.reduce((p2, c) => p2 + (c - mu) * (c - mu), 0) / r.length);
      return sd * 100;
    }
    function analyze(candles, livePrice) {
      const closes = candles.map((c) => Number(c.close)).filter((v) => isFinite(v));
      if (closes.length && livePrice != null && isFinite(Number(livePrice))) closes[closes.length - 1] = Number(livePrice);
      if (closes.length < 55) return { ready: false };
      const e20 = ema(closes, 20), e50 = ema(closes, 50), r = rsi(closes, 14), vol = volPct(closes, 20);
      const base = closes[closes.length - 11];
      const mom = base ? ((closes[closes.length - 1] - base) / base) * 100 : 0;
      let score = 0;
      const facts = [];
      const up = e20 > e50;
      const gap = Math.abs(e20 - e50) / e50 * 100;
      score += (up ? 1 : -1) * 40 * Math.min(1, gap / 0.35);
      facts.push({ label: "Trend · EMA 20/50", val: (up ? "Bullish" : "Bearish") + " · " + gap.toFixed(2) + "%", dir: up ? 1 : -1 });
      let rDir = 0, rTxt = "";
      if (r >= 70) { rDir = -1; rTxt = Math.round(r) + " — overbought"; score -= 30; }
      else if (r <= 30) { rDir = 1; rTxt = Math.round(r) + " — oversold"; score += 30; }
      else if (r > 55) { rDir = 1; rTxt = Math.round(r) + " — bullish zone"; score += 20; }
      else if (r < 45) { rDir = -1; rTxt = Math.round(r) + " — bearish zone"; score -= 20; }
      else { rTxt = Math.round(r) + " — neutral"; }
      facts.push({ label: "Momentum · RSI 14", val: rTxt, dir: rDir });
      const mDir = mom > 0.02 ? 1 : mom < -0.02 ? -1 : 0;
      score += mDir * 20 * Math.min(1, Math.abs(mom) / 0.4);
      facts.push({ label: "Price impulse · 10 bars", val: (mom >= 0 ? "+" : "") + mom.toFixed(3) + "%", dir: mDir });
      const volTxt = vol == null ? "—" : (vol < 0.15 ? "Calm · " : vol < 0.5 ? "Moderate · " : "Elevated · ") + vol.toFixed(3) + "%";
      facts.push({ label: "Volatility regime", val: volTxt, dir: 0 });
      const sc = Math.max(-100, Math.min(100, score));
      let verdict, cls;
      if (sc >= 45) { verdict = "Strong Buy"; cls = "up"; }
      else if (sc >= 15) { verdict = "Buy"; cls = "up"; }
      else if (sc > -15) { verdict = "Neutral"; cls = "flat"; }
      else if (sc > -45) { verdict = "Sell"; cls = "down"; }
      else { verdict = "Strong Sell"; cls = "down"; }
      let conf = Math.min(97, Math.round(52 + Math.abs(sc) * 0.45));
      if (vol != null && vol > 0.6) conf = Math.max(40, conf - 8);
      return { ready: true, score: sc, verdict, cls, confidence: conf, facts };
    }

    /* ================= market data ================= */
    function useDesk(symbol) {
      const [st, setSt] = a.useState({ prices: [], candles: [], pip: null, price: null, status: "connecting" });
      a.useEffect(() => {
        let alive = true, ws = null, retry = null, prices = [];
        const schedule = () => { clearTimeout(retry); if (alive) retry = setTimeout(open, 2500); };
        function open() {
          if (!alive) return;
          try { ws = new WebSocket(WS_URL); } catch (e) { schedule(); return; }
          ws.onopen = () => {
            if (!alive || !ws) return;
            ws.send(JSON.stringify({ ticks_history: symbol, style: "ticks", count: HIST_N, end: "latest", req_id: 11 }));
            ws.send(JSON.stringify({ ticks_history: symbol, style: "candles", count: 120, end: "latest", granularity: 60, req_id: 12 }));
            ws.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
          };
          ws.onmessage = (ev) => {
            if (!alive) return;
            let d; try { d = JSON.parse(ev.data); } catch (e) { return; }
            if (d.req_id === 11 && d.history && Array.isArray(d.history.prices)) {
              prices = d.history.prices.map(Number).filter((v) => isFinite(v));
              setSt((s) => Object.assign({}, s, { prices: prices.slice(), pip: d.pip_size != null ? Number(d.pip_size) : s.pip, price: prices.length ? prices[prices.length - 1] : s.price, status: "live" }));
            } else if (d.req_id === 12 && Array.isArray(d.candles)) {
              setSt((s) => Object.assign({}, s, { candles: d.candles }));
            } else if (d.msg_type === "tick" && d.tick) {
              const p = Number(d.tick.quote);
              if (isFinite(p)) {
                prices = prices.concat([p]);
                if (prices.length > WINDOW_MAX) prices = prices.slice(prices.length - WINDOW_MAX);
                setSt((s) => Object.assign({}, s, { price: p, pip: d.tick.pip_size != null ? Number(d.tick.pip_size) : s.pip, prices: prices.slice(), status: "live" }));
              }
            }
          };
          ws.onclose = () => { if (alive) { setSt((s) => Object.assign({}, s, { status: "offline" })); schedule(); } };
          ws.onerror = () => { try { ws && ws.close(); } catch (e) {} };
        }
        open();
        return () => { alive = false; clearTimeout(retry); try { ws && ws.close(); } catch (e) {} };
      }, [symbol]);
      return st;
    }

    /* ================= digit probability circles ================= */
    function DigitGrid(props) {
      const prices = props.prices, pip = props.pip, selected = props.selected, onSelect = props.onSelect;
      const stats = a.useMemo(() => {
        const counts = new Array(10).fill(0);
        let n = 0;
        for (let j = 0; j < prices.length; j++) {
          const d = lastDigit(prices[j], pip);
          if (d != null) { counts[d]++; n++; }
        }
        return { counts: counts, n: n };
      }, [prices, pip]);
      const liveD = prices.length ? lastDigit(prices[prices.length - 1], pip) : null;
      const C = 2 * Math.PI * 32;
      const digits = [];
      for (let d = 0; d < 10; d++) {
        const pct = stats.n ? (stats.counts[d] / stats.n) * 100 : 0;
        const col = pct >= 10.5 ? "#16b866" : "#ff5f5f";
        const frac = Math.min(1, pct / 13);
        const arcDeg = frac * 110;
        const len = (arcDeg / 360) * C;
        const isSel = selected === d, isLive = liveD === d;
        digits.push((0, i.jsx)("button", {
          type: "button",
          className: "mt-digit" + (isSel ? " sel" : "") + (isLive ? " live" : ""),
          onClick: () => onSelect(d),
          "aria-pressed": isSel,
          "aria-label": "Digit " + d + (stats.n ? ", " + pct.toFixed(1) + " percent" : ""),
          children: (0, i.jsxs)("span", { className: "mt-digit__in", children: [
            (0, i.jsxs)("svg", { viewBox: "0 0 72 72", "aria-hidden": "true", children: [
              (0, i.jsx)("circle", { className: "mt-ring", cx: 36, cy: 36, r: 32 }),
              stats.n > 0 && (0, i.jsx)("circle", {
                className: "mt-arc", cx: 36, cy: 36, r: 32, stroke: col,
                "strokeDasharray": len.toFixed(1) + " " + (C * 2).toFixed(1),
                transform: "rotate(" + (90 - arcDeg / 2).toFixed(1) + " 36 36)"
              })
            ] }),
            (0, i.jsxs)("span", { className: "mt-digit__txt", children: [
              (0, i.jsx)("b", { children: String(d) }),
              (0, i.jsx)("i", { children: stats.n ? pct.toFixed(1) + "%" : "…" })
            ] })
          ] })
        }, "d" + d));
      }
      return (0, i.jsxs)(i.Fragment, { children: [
        (0, i.jsx)("div", { className: "mt-digits", role: "group", "aria-label": "Last digit probabilities", children: digits }),
        (0, i.jsxs)("div", { className: "mt-digit-stats", children: [
          (0, i.jsx)("span", { children: stats.n ? "Based on the last " + stats.n + " ticks" : "Collecting tick history…" }),
          (0, i.jsx)("span", { children: liveD != null ? "live digit · " + liveD : "" })
        ] })
      ] });
    }

    /* ================= live payouts (real API, logged out allowed) ================= */
    function usePayouts(symbol, barrier, duration, stakeRaw) {
      const [stakeDeb, setStakeDeb] = a.useState(Number(stakeRaw) || 10);
      a.useEffect(() => {
        const to = setTimeout(() => { const v = Number(stakeRaw); setStakeDeb(isFinite(v) && v > 0 ? v : 10); }, 350);
        return () => clearTimeout(to);
      }, [stakeRaw]);
      const [pay, setPay] = a.useState({ over: null, under: null });
      a.useEffect(() => {
        let alive = true, ws = null, retry = null, seq = 0;
        const schedule = () => { clearTimeout(retry); if (alive) retry = setTimeout(open, 2500); };
        function open() {
          if (!alive) return;
          try { ws = new WebSocket(WS_URL); } catch (e) { schedule(); return; }
          const subMap = {};
          const send = (payload) => { try { ws.send(JSON.stringify(payload)); } catch (e) {} };
          ws.onopen = () => {
            if (!alive || !ws) return;
            const base = { proposal: 1, amount: stakeDeb, basis: "stake", barrier: String(barrier), currency: "USD", duration: duration, duration_unit: "t", underlying_symbol: symbol, subscribe: 1 };
            send(Object.assign({ req_id: 101 }, base, { contract_type: "DIGITOVER" }));
            send(Object.assign({ req_id: 102 }, base, { contract_type: "DIGITUNDER" }));
          };
          ws.onmessage = (ev) => {
            if (!alive) return;
            let d; try { d = JSON.parse(ev.data); } catch (e) { return; }
            if (d.msg_type === "proposal" && d.proposal) {
              let side = d.req_id === 101 ? "over" : d.req_id === 102 ? "under" : ((d.subscription && subMap[d.subscription.id]) || null);
              if (!side) {
                const ct = String(d.proposal.contract_type || "").toLowerCase();
                if (ct === "digitover") side = "over";
                else if (ct === "digitunder") side = "under";
              }
              if (side && d.subscription && d.subscription.id) subMap[d.subscription.id] = side;
              if (side) setPay((p) => Object.assign({}, p, { [side]: { payout: d.proposal.payout, id: d.proposal.id } }));
            }
          };
          ws.onclose = () => { if (alive) { setPay({ over: null, under: null }); schedule(); } };
          ws.onerror = () => { try { ws && ws.close(); } catch (e) {} };
        }
        setPay({ over: null, under: null });
        open();
        return () => { alive = false; clearTimeout(retry); try { ws && ws.close(); } catch (e) {} };
      }, [symbol, barrier, duration, stakeDeb]);
      return pay;
    }

    /* ================= manual trade panel ================= */
    function TradePanel(props) {
      const symbol = props.symbol;
      const barrier = props.barrier, setBarrier = props.setBarrier;
      const [stakeRaw, setStakeRaw] = a.useState("10.00");
      const [duration, setDuration] = a.useState(1);
      const [busy, setBusy] = a.useState(false);
      const [err, setErr] = a.useState(null);
      const [result, setResult] = a.useState(null);
      const [showLearn, setShowLearn] = a.useState(false);
      const [bal, setBal] = a.useState(null);
      const [version, setVersion] = a.useState(0);
      a.useEffect(() => { setVersion(readToken() ? 1 : 0); }, []);
      const pay = usePayouts(symbol, barrier, duration, stakeRaw);
      const loggedIn = !!readToken() || version > 0;
      const stakeNum = Math.max(0.35, Number(stakeRaw) || 10);

      /* live balance for connected accounts */
      a.useEffect(() => {
        if (!loggedIn) { setBal(null); return; }
        let alive = true, ws = null;
        try { ws = new WebSocket(WS_URL); } catch (e) { return; }
        ws.onmessage = (ev) => {
          let d; try { d = JSON.parse(ev.data); } catch (e2) { return; }
          if (d.authorize && alive) setBal({ v: d.authorize.balance, c: d.authorize.currency, id: d.authorize.loginid });
        };
        ws.onopen = () => { try { ws.send(JSON.stringify({ authorize: readToken() })); } catch (e2) {} };
        return () => { alive = false; try { ws && ws.close(); } catch (e2) {} };
      }, [loggedIn, result]);

      async function login() {
        try {
          const u = await (0, x.arA)();
          if (u) window.location.replace(u);
        } catch (e) { setErr("Could not start Deriv login."); }
      }
      /* ONE manual action -> ONE contract. No loops, no automation. */
      async function buy(side) {
        const token = readToken();
        if (!token) { setVersion(0); await login(); return; }
        setBusy(true); setErr(null); setResult(null);
        let ws = null;
        const pending = new Map();
        let seq = 0;
        try {
          ws = new WebSocket(WS_URL);
          const call = (payload, ms) => new Promise((res, rej) => {
            const id = ++seq;
            payload.req_id = id;
            const to = setTimeout(() => { pending.delete(id); rej(new Error("Request timed out")); }, ms || 15000);
            pending.set(id, { res: (d) => { clearTimeout(to); res(d); }, rej: (e2) => { clearTimeout(to); rej(e2); } });
            ws.send(JSON.stringify(payload));
          });
          ws.onmessage = (ev) => {
            let d; try { d = JSON.parse(ev.data); } catch (e2) { return; }
            if (d.req_id != null && pending.has(d.req_id)) {
              const p = pending.get(d.req_id);
              pending.delete(d.req_id);
              d.error ? p.rej(new Error(d.error.message)) : p.res(d);
            }
          };
          await new Promise((res, rej) => {
            ws.onopen = () => res();
            ws.onerror = () => rej(new Error("Could not connect to the trading endpoint."));
          });
          const auth = await call({ authorize: token });
          const cur = (auth.authorize && auth.authorize.currency) || "USD";
          const ctype = side === "over" ? "DIGITOVER" : "DIGITUNDER";
          const prop = await call({
            proposal: 1, amount: stakeNum, basis: "stake", contract_type: ctype,
            barrier: String(barrier), currency: cur, duration: duration, duration_unit: "t",
            underlying_symbol: symbol
          });
          const ask = prop.proposal.ask_price, pid = prop.proposal.id;
          const buyRes = await call({ buy: pid, price: ask });
          const b = buyRes.buy || {};
          setResult({ side: side, cid: b.contract_id, payout: b.payout, cur: cur, barrier: barrier });
          try { (0, m.N)("Contract bought — payout " + Number(b.payout || 0).toFixed(2) + " " + cur); } catch (e2) {}
        } catch (e2) {
          setErr(e2 && e2.message ? e2.message : "Trade failed.");
        } finally {
          try { ws && ws.close(); } catch (e2) {}
          setBusy(false);
        }
      }

      const fmtPay = (p) => p && p.payout != null ? Number(p.payout).toFixed(2) + " USD" : "loading…";
      return (0, i.jsxs)("div", { className: "mt-card", "data-testid": "manual-trade", children: [
        (0, i.jsxs)("button", { type: "button", className: "mt-learn", onClick: () => setShowLearn((v) => !v), "aria-expanded": showLearn, children: [
          (0, i.jsx)("span", { children: "ℹ" }),
          "Learn about this trade type"
        ] }),
        showLearn && (0, i.jsx)("div", { className: "mt-learnbox", children: "Over/Under (Digits): the contract wins if the last digit of the final tick is strictly above (Over) or below (Under) your chosen digit. Payout depends on the digit you pick — higher payout odds on rarer outcomes. Duration is measured in ticks." }),
        (0, i.jsxs)("div", { className: "mt-chips", children: [
          (0, i.jsx)("button", { type: "button", className: "mt-chip on", "aria-pressed": true, children: "↗ Over/Under" }),
          (0, i.jsxs)("button", {
            type: "button",
            className: "mt-chip mt-chip--digit",
            onClick: () => setBarrier((b) => (b + 1) % 10),
            title: "Tap to cycle the digit — or tap a circle above",
            children: ["Digit: ", (0, i.jsx)("b", { children: String(barrier) })]
          })
        ] }),
        (0, i.jsxs)("div", { className: "mt-acct", children: [
          (0, i.jsx)("span", { children: loggedIn ? (bal ? bal.id + " · balance" : "connected") : "not logged in" }),
          (0, i.jsx)("b", { children: loggedIn ? (bal ? " " + Number(bal.v).toFixed(2) + " " + bal.c : "…") : "live payouts only" })
        ] }),
        (0, i.jsxs)("div", { className: "mt-vals", children: [
          (0, i.jsxs)("div", { className: "mt-val", children: [
            (0, i.jsxs)("div", { className: "mt-val__main", children: [
              (0, i.jsx)("select", { value: String(duration), onChange: (e) => setDuration(Number(e.target.value)), "aria-label": "Duration in ticks", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (0, i.jsx)("option", { value: String(n), children: n + (n === 1 ? " tick" : " ticks") }, String(n))) }),
              (0, i.jsx)("span", { className: "mt-val__cur", children: "▾" })
            ] }),
            (0, i.jsx)("span", { className: "mt-val__cap", children: "Duration" })
          ] }),
          (0, i.jsxs)("div", { className: "mt-val", children: [
            (0, i.jsxs)("div", { className: "mt-val__main", children: [
              (0, i.jsx)("input", { type: "number", min: "0.35", step: "0.35", value: stakeRaw, onChange: (e) => setStakeRaw(e.target.value), "aria-label": "Stake amount", placeholder: "10.00" }),
              (0, i.jsx)("span", { className: "mt-val__cur", children: "USD" })
            ] }),
            (0, i.jsx)("span", { className: "mt-val__cap", children: "Stake" })
          ] })
        ] }),
        (0, i.jsxs)("div", { className: "mt-buy", children: [
          (0, i.jsxs)("button", { type: "button", className: "over", disabled: busy, onClick: () => buy("over"), children: [
            (0, i.jsxs)("span", { className: "mt-buy__t", children: [(0, i.jsx)("em", { children: "▲" }), "Over"] }),
            (0, i.jsxs)("span", { className: "mt-buy__p", children: [(0, i.jsx)("u", { children: "Payout" }), fmtPay(pay.over)] })
          ] }),
          (0, i.jsxs)("button", { type: "button", className: "under", disabled: busy, onClick: () => buy("under"), children: [
            (0, i.jsxs)("span", { className: "mt-buy__t", children: [(0, i.jsx)("em", { children: "▼" }), "Under"] }),
            (0, i.jsxs)("span", { className: "mt-buy__p", children: [(0, i.jsx)("u", { children: "Payout" }), fmtPay(pay.under)] })
          ] })
        ] }),
        err && (0, i.jsx)("div", { className: "mt-err", children: err }),
        result && (0, i.jsxs)("div", { className: "mt-result", children: [
          (0, i.jsx)("span", { children: (result.side === "over" ? "Over" : "Under") + " " + result.barrier + " · contract #" + result.cid }),
          (0, i.jsx)("span", { children: "payout " + Number(result.payout || 0).toFixed(2) + " " + result.cur })
        ] })
      ] });
    }

    /* ================= AI analysis (compact, below) ================= */
    function AiPanel(props) {
      const ana = props.ana, label = props.label, status = props.status;
      if (!ana.ready && status !== "live" && status !== "offline") {
        return (0, i.jsxs)("div", { className: "mt-card", children: [
          (0, i.jsxs)("div", { className: "mt-ai__head", children: [(0, i.jsxs)("div", { className: "mt-ai__title", children: [(0, i.jsx)("span", { className: "mt-ai__mark", children: "✦" }), "AI Market Analysis"] })] }),
          (0, i.jsxs)("div", { className: "mt-scan", children: [(0, i.jsx)("i", {}), " AI is scanning 120 candles…"] })
        ] });
      }
      if (!ana.ready) return null;
      return (0, i.jsxs)("div", { className: "mt-card", children: [
        (0, i.jsxs)("div", { className: "mt-ai__head", children: [
          (0, i.jsxs)("div", { className: "mt-ai__title", children: [(0, i.jsx)("span", { className: "mt-ai__mark", children: "✦" }), "AI Market Analysis", (0, i.jsx)("span", { className: "mt-badge", children: label })] }),
          (0, i.jsx)("span", { className: "mt-badge", children: status === "live" ? "streaming" : status === "offline" ? "reconnecting" : "connecting" })
        ] }),
        (0, i.jsxs)("div", { className: "mt-ai__grid", children: [
          (0, i.jsxs)("div", { className: "mt-verdict", children: [
            (0, i.jsx)("div", { className: "mt-verdict__word " + ana.cls, children: ana.verdict }),
            (0, i.jsx)("div", { className: "mt-verdict__meta", children: "score " + (ana.score >= 0 ? "+" : "") + ana.score.toFixed(0) + " · " + ana.confidence + "%" }),
            (0, i.jsx)("div", { className: "mt-conf", children: (0, i.jsx)("i", { style: { width: ana.confidence + "%" } }) })
          ] }),
          (0, i.jsx)("div", { className: "mt-facts", children: ana.facts.map((f, idx) => (0, i.jsxs)("div", { className: "mt-fact", children: [
            (0, i.jsxs)("span", { className: "mt-fact__l", children: [(0, i.jsx)("span", { className: "mt-fact__d" + (f.dir > 0 ? " up" : f.dir < 0 ? " down" : "") }), f.label] }),
            (0, i.jsx)("span", { className: "mt-fact__v", children: f.val })
          ] }, "f" + idx)) })
        ] })
      ] });
    }      /* ================= floating AI dock ================= */
      function AiDock(props) {
        const ana = props.ana, label = props.label, status = props.status, price = props.price, pip = props.pip, onClose = props.onClose;
        return (0, i.jsxs)("div", { className: "mt-dock", role: "dialog", "aria-label": "AI market analysis", children: [
          (0, i.jsxs)("div", { className: "mt-ai__head", children: [
            (0, i.jsxs)("div", { className: "mt-ai__title", children: [
              (0, i.jsx)("span", { className: "mt-ai__mark", "aria-hidden": "true", children: "✦" }),
              "AI Market Analysis",
              (0, i.jsx)("span", { className: "mt-badge", children: label })
            ] }),
            (0, i.jsxs)("div", { className: "mt-ai__headend", children: [
              (0, i.jsx)("span", { className: "mt-badge", children: status === "live" ? "streaming" : status === "offline" ? "reconnecting" : "connecting" }),
              (0, i.jsx)("button", { type: "button", className: "mt-dock__x", "aria-label": "Close AI analysis", onClick: onClose, children: "✕" })
            ] })
          ] }),
          price != null && (0, i.jsxs)("div", { className: "mt-dock__price", children: [
            (0, i.jsx)("span", { className: "mt-dock__pl", children: "Last price" }),
            (0, i.jsx)("span", { className: "mt-dock__pv", children: fmtPrice(price, pip) })
          ] }),
          ana.ready ? (0, i.jsxs)("div", { className: "mt-ai__grid", children: [
            (0, i.jsxs)("div", { className: "mt-verdict", children: [
              (0, i.jsx)("div", { className: "mt-verdict__word " + ana.cls, children: ana.verdict }),
              (0, i.jsx)("div", { className: "mt-verdict__meta", children: "score " + (ana.score >= 0 ? "+" : "") + ana.score.toFixed(0) + " · " + ana.confidence + "%" }),
              (0, i.jsx)("div", { className: "mt-conf", children: (0, i.jsx)("i", { style: { width: ana.confidence + "%" } }) })
            ] }),
            (0, i.jsx)("div", { className: "mt-facts", children: ana.facts.map((f, idx) => (0, i.jsxs)("div", { className: "mt-fact", children: [
              (0, i.jsx)("span", { className: "mt-fact__l", children: [(0, i.jsx)("span", { className: "mt-fact__d" + (f.dir > 0 ? " up" : f.dir < 0 ? " down" : "") }), f.label] }),
              (0, i.jsx)("span", { className: "mt-fact__v", children: f.val })
            ] }, "d" + idx)) })
          ] }) : (0, i.jsxs)("div", { className: "mt-scan", children: [
            (0, i.jsx)("i", {}), " AI is scanning 120 candles…"
          ] }),
          (0, i.jsx)("div", { className: "mt-note", children: "Signals are computed on this device from live Deriv candles. Not financial advice." })
        ] });
      }

      /* ================= page ================= */
    const z = () => {
      const [symbol, setSymbol] = a.useState("1HZ90V");
      const [barrier, setBarrier] = a.useState(2);
      const [fabOpen, setFabOpen] = a.useState(false);
      const desk = useDesk(symbol);
      const ana = a.useMemo(() => analyze(desk.candles, desk.price), [desk.candles, desk.price]);
      const label = (SYMBOLS.find((s) => s.v === symbol) || {}).l || symbol;
      a.useEffect(() => {
        if (document.getElementById("mt-style")) return;
        const el = document.createElement("style");
        el.id = "mt-style";
        el.textContent = CSS;
        document.head.appendChild(el);
      }, []);
      a.useEffect(() => {
        if (!fabOpen) return;
        const onKey = (e) => { if (e.key === "Escape") setFabOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
      }, [fabOpen]);
      const chg = a.useMemo(() => {
        const cs = desk.candles.map((c) => Number(c.close)).filter((v) => isFinite(v));
        if (cs.length < 2) return null;
        const diff = cs[cs.length - 1] - cs[cs.length - 2];
        return { diff: diff, pct: (diff / cs[cs.length - 2]) * 100 };
      }, [desk.candles]);
      const dotCls = desk.status === "live" ? " live" : desk.status === "offline" ? " off" : "";
      const tabs = [
        { k: "tv", l: "Trading View" },
        { k: "mt", l: "Manual Trader" },
        { k: "tu", l: "Tutorial" }
      ];
      return (0, i.jsxs)("div", { className: "mt-page", "data-testid": "manual-trader", children: [
        (0, i.jsx)("div", { className: "mt-tabs", role: "tablist", "aria-label": "Trading modes", children: tabs.map((tb) => (0, i.jsx)("button", {
          type: "button",
          role: "tab",
          "aria-selected": tb.k === "mt",
          className: "mt-tab" + (tb.k === "mt" ? " on" : ""),
          onClick: () => { if (tb.k !== "mt") try { (0, m.N)(tb.l + " arrives in a later release"); } catch (err) {} },
          children: tb.l
        }, tb.k)) }),
        (0, i.jsxs)("div", { className: "mt-market", children: [
          (0, i.jsx)("span", { className: "mt-market__ico", "aria-hidden": "true", children: "⇅" }),
          (0, i.jsxs)("div", { className: "mt-market__body", children: [
            (0, i.jsxs)("select", { className: "mt-select", value: symbol, onChange: (e) => setSymbol(e.target.value), "aria-label": "Market", children: SYMBOLS.map((sy) => (0, i.jsx)("option", { value: sy.v, children: sy.l }, sy.v)) }),
            (0, i.jsxs)("div", { className: "mt-quote", children: [
              (0, i.jsx)("span", { className: "mt-quote__dot" + dotCls }),
              (0, i.jsx)("span", { className: "mt-quote__price", children: fmtPrice(desk.price, desk.pip) }),
              chg && (0, i.jsxs)("span", { className: "mt-quote__chg " + (chg.diff >= 0 ? "up" : "down"), children: [
                (chg.diff >= 0 ? "+" : "") + chg.diff.toFixed(3),
                "  (", (chg.pct >= 0 ? "+" : "") + chg.pct.toFixed(2), "%)"
              ] })
            ] })
          ] })
        ] }),
        (0, i.jsxs)("div", { className: "mt-card", children: [
          (0, i.jsx)(DigitGrid, { prices: desk.prices, pip: desk.pip, selected: barrier, onSelect: setBarrier })
        ] }),
        (0, i.jsx)(TradePanel, { symbol: symbol, barrier: barrier, setBarrier: setBarrier }),
        (0, i.jsx)(AiPanel, { ana: ana, label: label, status: desk.status }),
        (0, i.jsxs)("button", { type: "button", className: "mt-fab" + (fabOpen ? " on" : ""), "aria-label": "AI market analysis", "aria-expanded": fabOpen, onClick: () => setFabOpen((v) => !v), children: [
          (0, i.jsx)("span", { className: "mt-fab__ico", "aria-hidden": "true", children: "✦" }),
          (0, i.jsx)("span", { className: "mt-fab__txt", children: "AI" })
        ] }),
        fabOpen && (0, i.jsx)(AiDock, { ana: ana, label: label, status: desk.status, price: desk.price, pip: desk.pip, onClose: () => setFabOpen(false) }),
        (0, i.jsx)("div", { className: "mt-note", children: "Digit probabilities are computed live from recent ticks; payouts stream from Deriv in real time. Each press of Over/Under sends exactly one trade request on your connected Deriv account. Not financial advice." })
      ] });
    };
  }
}]);
