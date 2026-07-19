// Case-study content. Text lives in the locale files (keys below);
// this module only holds structure, links and assets.
export const STUDIES = {
  tictacverse: {
    name: "Tic Tac Verse",
    titleHtml: '<span class="hl">Ultimate</span> Tic Tac Toe',
    subKey: "cs_ttv_sub",
    tags: ["Flutter", "Dart", "AdMob", "Play Developer API", "Google Ads"],
    live: "https://play.google.com/store/apps/details?id=com.bobagi.tictacverse",
    liveLabel: "Google Play",
    github: "https://github.com/Bobagi/tictacverse",
    facts: [
      { n: "6", k: "cs_ttv_f1" },
      { n: "18", k: "cs_ttv_f2" },
      { n: "5", k: "cs_ttv_f3" },
      { n: "24", k: "cs_ttv_f4" },
    ],
    paras: ["cs_ttv_p1", "cs_ttv_p2", "cs_ttv_p3", "cs_ttv_p4"],
    shots: (locale) => [
      `/screenshots/case/ttv-${locale}-super.png`,
      `/screenshots/case/ttv-${locale}-modes.png`,
      `/screenshots/case/ttv-${locale}-win.png`,
    ],
  },
  "warframe-farm-helper": {
    name: "Warframe Farm Helper",
    titleHtml: 'Warframe <span class="hl">Farm Helper</span>',
    subKey: "cs_wf_sub",
    tags: ["Node.js", "Express", "SQLite", "MiniSearch", "SSR"],
    live: "https://warframe.bobagi.space",
    liveLabel: "warframe.bobagi.space",
    github: "https://github.com/Bobagi/warframe-farm-helper",
    facts: [
      { n: "4406", k: "cs_wf_f1" },
      { n: "4", k: "cs_wf_f2" },
      { n: "107", k: "cs_wf_f3" },
      { n: "0", k: "cs_wf_f4" },
    ],
    paras: ["cs_wf_p1", "cs_wf_p2", "cs_wf_p3", "cs_wf_p4"],
    shots: () => ["/screenshots/warframe.png", "/screenshots/case/wf-item.png"],
  },
};
