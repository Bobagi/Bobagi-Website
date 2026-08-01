<template>
  <div
    ref="bp"
    class="bp"
  >
    <!-- ============ NAV ============ -->
    <header class="nav">
      <div class="wrap nav-inner">
        <a
          href="#home"
          class="brand"
          @click.prevent="scrollTo('#home')"
        >
          <span class="mark">B</span>
          <span>bobagi</span>
        </a>
        <nav
          ref="navlinks"
          class="links"
        >
          <a
            href="#home"
            class="active"
            @click.prevent="scrollTo('#home')"
          >{{ $t('nav_home') }}</a>
          <a
            href="#projects"
            @click.prevent="scrollTo('#projects')"
          >{{ $t('nav_projects') }}</a>
          <a
            href="#games"
            @click.prevent="scrollTo('#games')"
          >{{ $t('nav_games') }}</a>
          <a
            href="#tools"
            @click.prevent="scrollTo('#tools')"
          >{{ $t('nav_tools') }}</a>
        </nav>
        <div class="nav-tools">
          <button
            class="toggle icon burger"
            :aria-expanded="mobileOpen ? 'true' : 'false'"
            aria-label="Menu"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
              v-if="!mobileOpen"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            ><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            ><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <button
            class="toggle"
            :title="$t('nav_home')"
            aria-label="Switch language"
            @click="toggleLang"
          >
            <span
              class="flag"
              aria-hidden="true"
              v-html="locale === 'pt' ? FLAGS.br : FLAGS.us"
            ></span>
            <span class="mono lang-txt">{{ locale.toUpperCase() }}</span>
          </button>
          <button
            class="toggle icon"
            title="High contrast mode / Alto contraste"
            aria-label="Toggle high contrast mode"
            :aria-pressed="highContrast ? 'true' : 'false'"
            @click="toggleContrast"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            ><circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            /><path
              d="M12 3a9 9 0 0 1 0 18Z"
              fill="currentColor"
            /></svg>
          </button>
        </div>
      </div>
      <nav
        v-show="mobileOpen"
        class="mobile-menu"
      >
        <a
          href="#home"
          @click.prevent="goMobile('#home')"
        >{{ $t('nav_home') }}</a>
        <a
          href="#projects"
          @click.prevent="goMobile('#projects')"
        >{{ $t('nav_projects') }}</a>
        <a
          href="#games"
          @click.prevent="goMobile('#games')"
        >{{ $t('nav_games') }}</a>
        <a
          href="#tools"
          @click.prevent="goMobile('#tools')"
        >{{ $t('nav_tools') }}</a>
        <a
          href="#contact"
          @click.prevent="goMobile('#contact')"
        >{{ $t('cta_contact') }}</a>
      </nav>
    </header>

    <main>
      <!-- ============ HERO ============ -->
      <section
        id="home"
        class="hero"
      >
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">
              <span class="dot"></span>
              <span>{{ $t('hero_eyebrow') }}</span>
              <span
                class="flag"
                aria-hidden="true"
                v-html="FLAGS.br"
              ></span>
            </span>
            <h1>
              <span>{{ $t('hero_hi') }}</span> <span class="wave">👋</span>
              <span class="l2 hl">{{ $t('hero_name') }}</span>
            </h1>
            <p
              class="lead"
              v-html="$t('hero_lead')"
            ></p>
            <p
              class="sub mono"
              v-html="$t('hero_sub')"
            ></p>
            <div class="cta-row">
              <a
                href="#contact"
                class="btn btn-primary"
                @click.prevent="scrollTo('#contact')"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                /><path d="m22 7-10 5L2 7" /></svg>
                <span>{{ $t('cta_contact') }}</span>
              </a>
              <a
                class="btn btn-ghost"
                :href="cvHref"
                target="_blank"
                rel="noopener"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" /></svg>
                <span>{{ $t('cta_cv') }}</span>
              </a>
            </div>
            <div class="socials">
              <a
                :href="links.github"
                target="_blank"
                rel="noopener"
                title="GitHub"
                aria-label="GitHub"
                v-html="ICONS.github"
              ></a>
              <a
                :href="links.linkedin"
                target="_blank"
                rel="noopener"
                title="LinkedIn"
                aria-label="LinkedIn"
                v-html="ICONS.linkedin"
              ></a>
              <a
                :href="links.mail"
                title="Email"
                aria-label="Email"
                v-html="ICONS.mail"
              ></a>
            </div>
          </div>
          <div class="hero-side">
            <div class="avatar-frame">
              <img
                class="avatar"
                src="/screenshots/profile.jpg"
                alt="Gustavo Antonio Perin"
                loading="lazy"
              />
              <div class="badge-float badge-1">
                <span class="g"></span><span>{{ $t('badge_open') }}</span>
              </div>
              <div class="badge-float badge-2">
                <span
                  class="flag"
                  aria-hidden="true"
                  v-html="FLAGS.br"
                ></span> <span>{{ $t('badge_loc') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap">
          <div class="marquee">
            <div class="marquee-track">
              <span>Python<i></i>Node.js<i></i>C#<i></i>Next.js<i></i>Vue<i></i>TypeScript<i></i>Automation<i></i>Game Bots<i></i></span>
              <span>Python<i></i>Node.js<i></i>C#<i></i>Next.js<i></i>Vue<i></i>TypeScript<i></i>Automation<i></i>Game Bots<i></i></span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ ABOUT ============ -->
      <section id="about">
        <div class="wrap">
          <div class="about-grid reveal">
            <div>
              <div class="sec-tag">{{ $t('about_tag') }}</div>
              <p
                class="big"
                v-html="$t('about_text')"
              ></p>
              <div class="facts">
                <div class="fact">
                  <div class="n">5+</div>
                  <div class="l">{{ $t('fact_years') }}</div>
                </div>
                <div class="fact">
                  <div class="n">11+</div>
                  <div class="l">{{ $t('fact_live') }}</div>
                </div>
                <div class="fact">
                  <div class="n">6</div>
                  <div class="l">{{ $t('fact_applang') }}</div>
                </div>
              </div>
            </div>
            <div class="stack-card">
              <h4>{{ $t('stack_title') }}</h4>
              <div class="chips">
                <span
                  v-for="t in stack"
                  :key="t"
                  class="chip"
                >{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ PROJECTS ============ -->
      <section id="projects">
        <div class="wrap">
          <div class="sec-head reveal">
            <div>
              <div class="sec-tag">{{ $t('nav_projects') }}</div>
              <h2>{{ $t('proj_title') }}</h2>
            </div>
            <p>{{ $t('proj_sub') }}</p>
          </div>
          <div class="proj-grid">
            <article
              v-for="(p, i) in projects"
              :key="p.name"
              class="card reveal"
            >
              <div class="thumb">
                <span class="num">{{ String(i + 1).padStart(2, "0") }}</span>
                <img
                  :src="p.img"
                  :alt="p.name"
                  loading="lazy"
                />
              </div>
              <div class="body">
                <h3>
                  {{ p.name }} <span class="status live">{{ $t('st_live') }}</span>
                </h3>
                <p>{{ $t(p.descKey) }}</p>
                <div class="tags">
                  <span
                    v-for="t in p.tags"
                    :key="t"
                    class="tag"
                  >{{ t }}</span>
                  <span
                    v-if="p.client"
                    class="tag"
                  >{{ $t('st_client') }}</span>
                </div>
                <div class="foot">
                  <a
                    :href="p.live"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg><span>{{ $t('link_live') }}</span>
                  </a>
                  <a
                    v-if="p.github"
                    :href="p.github"
                    target="_blank"
                    rel="noopener"
                  ><span
                    class="ico"
                    v-html="ICONS.github"
                  ></span>GitHub</a>
                  <router-link
                    v-if="p.study"
                    :to="p.study"
                  >{{ $t('link_case') }} →</router-link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ============ GAMES ============ -->
      <section id="games">
        <div class="wrap">
          <div class="sec-head reveal">
            <div>
              <div class="sec-tag">{{ $t('nav_games') }}</div>
              <h2 v-html="$t('games_title')"></h2>
            </div>
            <p>{{ $t('games_sub') }}</p>
          </div>
          <div class="game-feat reveal">
            <div class="art">
              <img
                class="wide"
                :src="locale === 'pt' ? '/screenshots/tictacverse-pt.png' : '/screenshots/tictacverse-en.png'"
                alt="Tic Tac Verse"
                loading="lazy"
              />
            </div>
            <div class="info">
              <div class="glogo">Tic Tac Verse</div>
              <h3><span class="hl">Ultimate</span> Tic Tac Toe</h3>
              <p>{{ $t('ttv_desc') }}</p>
              <p>{{ $t('ttv_how') }}</p>
              <div class="btns">
                <span
                  class="status live"
                  style="align-self:center"
                >{{ $t('st_live') }}</span>
                <a
                  class="btn btn-dark"
                  href="https://play.google.com/store/apps/details?id=com.bobagi.tictacverse"
                  target="_blank"
                  rel="noopener"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  <span>Google Play</span>
                </a>
                <a
                  class="btn btn-ghost"
                  href="https://github.com/Bobagi/tictacverse"
                  target="_blank"
                  rel="noopener"
                ><span
                  class="ico"
                  v-html="ICONS.github"
                ></span>GitHub</a>
                <router-link
                  class="btn btn-ghost"
                  to="/p/tictacverse"
                >{{ $t('cs_tag') }}</router-link>
              </div>
            </div>
          </div>

          <div class="game-feat reveal">
            <div class="art">
              <img
                src="/Browser_Orion.png"
                alt="Hero Wars bot art"
                loading="lazy"
              />
            </div>
            <div class="info">
              <div class="glogo">Hero Wars: Dominion Era</div>
              <h3><span class="hl">Auto</span>play Bot</h3>
              <p>{{ $t('game_desc') }}</p>
              <p>{{ $t('game_how') }}</p>
              <p class="warn">{{ $t('game_warn') }}</p>
              <div class="btns">
                <span
                  class="status wip"
                  style="align-self:center"
                >{{ $t('st_wip') }}</span>
                <a
                  class="btn btn-dark"
                  href="https://bobagi.net/downloads/dist.7z"
                  target="_blank"
                  rel="noopener"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  <span>{{ $t('cta_download') }}</span>
                </a>
                <a
                  class="btn btn-ghost"
                  href="https://github.com/Bobagi/Hero-Wars-Auto-Play-Bot"
                  target="_blank"
                  rel="noopener"
                ><span
                  class="ico"
                  v-html="ICONS.github"
                ></span>GitHub</a>
              </div>
            </div>
          </div>

          <div class="proj-grid game-grid">
            <article
              v-for="g in gameCards"
              :key="g.name"
              class="card reveal"
            >
              <div class="thumb">
                <img
                  :src="g.img"
                  :alt="g.name"
                  loading="lazy"
                />
              </div>
              <div class="body">
                <h3>
                  {{ g.name }} <span class="status live">{{ $t('st_live') }}</span>
                </h3>
                <p>{{ $t(g.descKey) }}</p>
                <div class="tags">
                  <span
                    v-for="t in g.tags"
                    :key="t"
                    class="tag"
                  >{{ t }}</span>
                </div>
                <div class="foot">
                  <a
                    :href="g.live"
                    target="_blank"
                    rel="noopener"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg><span>{{ $t('link_live') }}</span>
                  </a>
                  <a
                    v-if="g.github"
                    :href="g.github"
                    target="_blank"
                    rel="noopener"
                  ><span
                    class="ico"
                    v-html="ICONS.github"
                  ></span>GitHub</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ============ TOOLS ============ -->
      <section id="tools">
        <div class="wrap">
          <div class="sec-head reveal">
            <div>
              <div class="sec-tag">{{ $t('nav_tools') }}</div>
              <h2>{{ $t('tools_title') }}</h2>
            </div>
            <p>{{ $t('tools_sub') }}</p>
          </div>
          <div class="tool-grid">
            <div class="tool reveal">
              <div class="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /></svg>
              </div>
              <h4>{{ $t('tool1_t') }}</h4>
              <p>{{ $t('tool1_d') }}</p>
              <router-link
                to="/SnowFlake"
                class="more"
              >{{ $t('tool_open') }}</router-link>
            </div>
            <div class="tool reveal">
              <div class="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><rect
                  x="5"
                  y="3"
                  width="14"
                  height="9"
                  rx="2"
                /><path d="M12 12v6M8 21h8M9 7h.01M13 7h2" /></svg>
              </div>
              <h4>{{ $t('tool2_t') }}</h4>
              <p>{{ $t('tool2_d') }}</p>
              <router-link
                to="/MouseJiggler"
                class="more"
              >{{ $t('tool_open') }}</router-link>
            </div>
            <div class="tool reveal">
              <div class="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><circle
                  cx="12"
                  cy="12"
                  r="10"
                /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
              </div>
              <h4>{{ $t('tool3_t') }}</h4>
              <p>{{ $t('tool3_d') }}</p>
              <a
                href="https://next-ip-converter.vercel.app"
                target="_blank"
                rel="noopener"
                class="more"
              >{{ $t('tool_open') }}</a>
            </div>
            <div class="tool reveal">
              <div class="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><rect
                  x="9"
                  y="2"
                  width="11"
                  height="18"
                  rx="2"
                /><path d="M5 6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9M13 16h3" /></svg>
              </div>
              <h4>{{ $t('tool4_t') }}</h4>
              <p>{{ $t('tool4_d') }}</p>
              <div class="tool-links">
                <a
                  href="https://bobagi.space/clonador"
                  class="more"
                >{{ $t('tool_download') }}</a>
                <a
                  href="https://github.com/Bobagi/clonador"
                  target="_blank"
                  rel="noopener"
                  class="more"
                >GitHub →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ CONTACT ============ -->
      <section
        id="contact"
        class="contact"
      >
        <div class="wrap">
          <div class="contact-band reveal">
            <div class="ct-tag">{{ $t('contact_tag') }}</div>
            <h2>{{ $t('contact_title') }}</h2>
            <p>{{ $t('contact_sub') }}</p>
            <div class="ct-row">
              <a
                :href="links.mail"
                class="btn btn-onyellow"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                /><path d="m22 7-10 5L2 7" /></svg>
                <span>{{ $t('cta_contact') }}</span>
              </a>
              <a
                :href="links.github"
                target="_blank"
                rel="noopener"
                class="btn btn-outline-y"
              ><span
                class="ico"
                v-html="ICONS.github"
              ></span>GitHub</a>
              <a
                :href="links.linkedin"
                target="_blank"
                rel="noopener"
                class="btn btn-outline-y"
              ><span
                class="ico"
                v-html="ICONS.linkedin"
              ></span>LinkedIn</a>
              <a
                :href="cvHref"
                target="_blank"
                rel="noopener"
                class="btn btn-outline-y"
              >{{ $t('cta_cv') }}</a>
              <a
                :href="links.coffee"
                target="_blank"
                rel="noopener"
                class="btn btn-outline-y"
              >☕ {{ $t('cta_coffee') }}</a>
            </div>
            <p class="joke">{{ $t('contact_joke') }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- ============ FOOTER ============ -->
    <footer>
      <div class="wrap foot-inner">
        <div class="foot-brand">
          © {{ year }} <span>bobagi</span><span class="foot-rights"> · {{ $t('foot_rights') }}</span>
        </div>
        <div class="foot-soc">
          <a
            :href="links.github"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            v-html="ICONS.github"
          ></a>
          <a
            :href="links.linkedin"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            v-html="ICONS.linkedin"
          ></a>
        </div>
        <div class="foot-meta">{{ $t('foot_update') }}</div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { FLAGS, ICONS } from "./bp-shared";



export default {
  name: "HomePage",
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  data() {
    return {
      FLAGS,
      ICONS,
      highContrast: false,
      mobileOpen: false,
      stack: [
        "Python",
        "Node.js",
        "C#",
        "Next.js",
        "Vue",
        "TypeScript",
        ".NET",
        "PostgreSQL",
        "Docker",
        "Selenium",
        "Tailwind",
        "Git",
      ],
      links: {
        coffee:
          "https://www.paypal.com/donate?business=gustavoperin067%40gmail.com&item_name=Support+Gustavo's+Journey&currency_code=USD",
        github: "https://github.com/Bobagi",
        linkedin: "https://www.linkedin.com/in/gustavoaperin/",
        mail: "mailto:gustavoperin067@gmail.com",
      },
      projects: [
        {
          name: "Cartomania",
          img: "/screenshots/cartomania.png",
          descKey: "proj_carto",
          tags: ["SvelteKit", "NestJS", "PostgreSQL"],
          live: "https://cartomania.bobagi.space",
          github: "https://github.com/Bobagi/cartomania",
        },
        {
          name: "Porkfolio",
          img: "/screenshots/porkfolio.png",
          descKey: "proj_coin",
          tags: ["SvelteKit", "Go", "PostgreSQL"],
          live: "https://porkfolio.bobagi.space",
        },
        {
          name: "Warframe Farm Helper",
          img: "/screenshots/warframe.png",
          descKey: "proj_warframe",
          tags: ["Node.js", "Express", "SQLite"],
          live: "https://warframe.bobagi.space",
          github: "https://github.com/Bobagi/warframe-farm-helper",
          study: "/p/warframe-farm-helper",
        },
        {
          name: "RetroASM",
          img: "/screenshots/retroasm.png",
          descKey: "proj_retroasm",
          tags: ["React", "TypeScript", "Vite"],
          live: "https://retroasm.bobagi.space",
          github: "https://github.com/Bobagi/Bomberman",
        },
        {
          name: "Rhyme",
          img: "/screenshots/rhyme.png",
          descKey: "proj_rhyme",
          tags: ["JavaScript", "Web Speech API"],
          live: "https://rhyme.bobagi.space",
          github: "https://github.com/Bobagi/rhyme",
        },
        {
          name: "Chéri Doces",
          img: "/screenshots/cheri.png",
          descKey: "proj_cheri",
          tags: ["Next.js", "TypeScript"],
          client: true,
          live: "https://cheri.bobagi.space",
        },
        {
          name: "VS.Dragon",
          img: "/screenshots/vsdragon.png",
          descKey: "proj_vsdragon",
          tags: ["Next.js", "TypeScript"],
          client: true,
          live: "https://vsdragon.bobagi.space",
        },
      ],
      gameCards: [
        {
          name: "Blockaboom",
          img: "/screenshots/blockaboom.png",
          descKey: "proj_blockaboom",
          tags: ["Phaser 3", "TypeScript", "Capacitor"],
          live: "https://block.bobagi.space",
        },
        {
          name: "Terraria Bobagi",
          img: "/screenshots/terraria.png",
          descKey: "proj_terraria",
          tags: ["tModLoader", "Docker", "Node.js"],
          live: "https://terraria.bobagi.space",
          github: "https://github.com/Bobagi/terraria-status",
        },
        {
          name: "Primordium",
          img: "/screenshots/primordium.png",
          descKey: "proj_primordium",
          tags: ["JavaScript", "Docker"],
          live: "https://primordium.bobagi.space",
          github: "https://github.com/Bobagi/primordium",
        },
      ],
      revealObserver: null,
      navObserver: null,
    };
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
    cvHref() {
      return this.locale === "pt"
        ? "/cv/gustavo-antonio-perin-cv-pt.pdf"
        : "/cv/gustavo-antonio-perin-cv-en.pdf";
    },
  },
  mounted() {
    // restore persisted preferences
    try {
      const savedLang = localStorage.getItem("bobagi-lang");
      if (savedLang === "en" || savedLang === "pt") this.locale = savedLang;
    } catch (e) {
      /* ignore */
    }
    try {
      this.highContrast = localStorage.getItem("bobagi-contrast") === "1";
    } catch (e) {
      /* ignore */
    }
    this.applyContrast();
    this.applyLangAttr();

    this.$nextTick(() => {
      const root = this.$refs.bp;
      if (!root) return;

      // scroll reveal
      this.revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              this.revealObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      root.querySelectorAll(".reveal").forEach((el) => this.revealObserver.observe(el));

      // active nav
      const navA = [...this.$refs.navlinks.querySelectorAll("a")];
      const secs = navA
        .map((a) => root.querySelector(a.getAttribute("href")))
        .filter(Boolean);
      this.navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const id = "#" + e.target.id;
              navA.forEach((a) =>
                a.classList.toggle("active", a.getAttribute("href") === id)
              );
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      secs.forEach((s) => this.navObserver.observe(s));
    });
  },
  beforeUnmount() {
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.navObserver) this.navObserver.disconnect();
    document.documentElement.removeAttribute("data-contrast");
  },
  methods: {
    scrollTo(sel) {
      const el = this.$refs.bp && this.$refs.bp.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    goMobile(sel) {
      this.mobileOpen = false;
      this.scrollTo(sel);
    },
    toggleLang() {
      this.locale = this.locale === "en" ? "pt" : "en";
      this.applyLangAttr();
      try {
        localStorage.setItem("bobagi-lang", this.locale);
      } catch (e) {
        /* ignore */
      }
    },
    applyLangAttr() {
      document.documentElement.setAttribute("lang", this.locale);
    },
    toggleContrast() {
      this.highContrast = !this.highContrast;
      this.applyContrast();
      try {
        localStorage.setItem("bobagi-contrast", this.highContrast ? "1" : "0");
      } catch (e) {
        /* ignore */
      }
    },
    applyContrast() {
      if (this.highContrast) {
        document.documentElement.setAttribute("data-contrast", "high");
      } else {
        document.documentElement.removeAttribute("data-contrast");
      }
    },
  },
};
</script>

<style>
/* ====== Bobagi portfolio redesign (scoped under .bp) ====== */
.bp {
  --bg: #0e0d0b;
  --bg-2: #16140f;
  --bg-3: #1f1c15;
  --line: rgba(245, 241, 230, 0.1);
  --line-strong: rgba(245, 241, 230, 0.18);
  --text: #f5f1e6;
  --muted: #a39e92;
  --yellow: #ffd21a;
  --yellow-deep: #e9b400;
  --on-yellow: #15130b;
  --dot: rgba(245, 241, 230, 0.05);
  --card-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.8);

  position: relative;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: "Space Grotesk", system-ui, sans-serif;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background 0.5s ease, color 0.5s ease;
}
html[data-contrast="high"] .bp {
  --bg: #000000;
  --bg-2: #000000;
  --bg-3: #000000;
  --line: #ffffff;
  --line-strong: #ffffff;
  --text: #ffffff;
  --muted: #ffffff;
  --yellow: #ffe500;
  --yellow-deep: #ffe500;
  --on-yellow: #000000;
  --dot: transparent;
  --card-shadow: none;
  font-size: 18px;
  line-height: 1.6;
}
html[data-contrast="high"] .bp .lead,
html[data-contrast="high"] .bp .card .body p,
html[data-contrast="high"] .bp .tool p,
html[data-contrast="high"] .bp .sec-head p,
html[data-contrast="high"] .bp .game-feat p {
  font-weight: 500;
}
html[data-contrast="high"] .bp .card,
html[data-contrast="high"] .bp .stack-card,
html[data-contrast="high"] .bp .fact,
html[data-contrast="high"] .bp .tool,
html[data-contrast="high"] .bp .game-feat,
html[data-contrast="high"] .bp .chip,
html[data-contrast="high"] .bp .tag,
html[data-contrast="high"] .bp .toggle,
html[data-contrast="high"] .bp .socials a,
html[data-contrast="high"] .bp .foot-soc a,
html[data-contrast="high"] .bp .eyebrow,
html[data-contrast="high"] .bp .badge-float,
html[data-contrast="high"] .bp .btn-ghost,
html[data-contrast="high"] .bp .btn-dark {
  border-width: 2px;
  border-color: #ffffff;
}
html[data-contrast="high"] .bp header.nav {
  background: #000;
}
html[data-contrast="high"] .bp nav.links a {
  color: #ffffff;
  font-weight: 800;
}
html[data-contrast="high"] .bp .marquee-track span {
  color: #ffffff;
}
html[data-contrast="high"] .bp .fact .n,
html[data-contrast="high"] .bp .sec-tag,
html[data-contrast="high"] .bp .more,
html[data-contrast="high"] .bp nav.links a.active {
  color: var(--yellow);
}
html[data-contrast="high"] .bp .avatar-frame::before {
  opacity: 1;
}
.bp a:focus-visible,
.bp button:focus-visible,
.bp img:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 3px;
  border-radius: 6px;
}
html[data-contrast="high"] .bp a:focus-visible,
html[data-contrast="high"] .bp button:focus-visible {
  outline: 4px solid var(--yellow);
}

.bp * {
  box-sizing: border-box;
}
.bp::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: radial-gradient(var(--dot) 1.4px, transparent 1.4px);
  background-size: 26px 26px;
  pointer-events: none;
  z-index: 0;
}
.bp .wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
  position: relative;
  z-index: 1;
}
.bp a {
  color: inherit;
  text-decoration: none;
}
.bp ::selection {
  background: var(--yellow);
  color: var(--on-yellow);
}
.bp h1,
.bp h2,
.bp h3,
.bp h4 {
  font-family: "Archivo", sans-serif;
  margin: 0;
}
.bp p {
  margin: 0;
}
.bp .mono {
  font-family: "JetBrains Mono", monospace;
}
.bp .ico {
  display: inline-flex;
}
.bp .ico svg {
  width: 1em;
  height: 1em;
}

/* ---------- NAV ---------- */
.bp header.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  transition: background 0.5s ease, border-color 0.5s ease;
}
.bp .nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}
.bp .toggle.burger {
  display: none;
}
.bp .mobile-menu {
  display: none;
  flex-direction: column;
  padding: 6px 24px 14px;
  background: color-mix(in srgb, var(--bg) 96%, transparent);
  border-bottom: 1px solid var(--line);
}
.bp .mobile-menu a {
  padding: 13px 2px;
  font-family: "Archivo";
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.02em;
  border-bottom: 1px solid var(--line);
}
.bp .mobile-menu a:last-child {
  border-bottom: none;
}
.bp .brand {
  display: flex;
  align-items: center;
  gap: 11px;
  font-family: "Archivo";
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.02em;
}
.bp .brand .mark {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--yellow);
  color: var(--on-yellow);
  display: grid;
  place-items: center;
  font-size: 19px;
  font-weight: 900;
  transform: rotate(-6deg);
  box-shadow: 0 6px 18px -6px var(--yellow);
  transition: transform 0.3s ease;
}
.bp .brand:hover .mark {
  transform: rotate(6deg) scale(1.05);
}
.bp nav.links {
  display: flex;
  gap: 6px;
  align-items: center;
}
.bp nav.links a {
  font-family: "Archivo";
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  padding: 9px 14px;
  border-radius: 8px;
  color: var(--muted);
  text-transform: uppercase;
  transition: color 0.2s, background 0.2s;
  position: relative;
  cursor: pointer;
}
.bp nav.links a:hover {
  color: var(--text);
}
.bp nav.links a.active {
  color: var(--text);
}
.bp nav.links a.active::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 3px;
  height: 2px;
  background: var(--yellow);
  border-radius: 2px;
}
.bp .nav-tools {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bp .toggle {
  border: 1px solid var(--line-strong);
  background: transparent;
  color: var(--text);
  height: 38px;
  border-radius: 9px;
  cursor: pointer;
  font-family: "JetBrains Mono";
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  transition: all 0.2s;
}
.bp .toggle:hover {
  border-color: var(--yellow);
  color: var(--yellow);
}
.bp .toggle.icon {
  width: 38px;
  padding: 0;
  justify-content: center;
}
.bp .toggle svg {
  width: 18px;
  height: 18px;
}
.bp .toggle[aria-pressed="true"] {
  background: var(--yellow);
  color: var(--on-yellow);
  border-color: var(--yellow);
}
.bp .flag {
  width: 21px;
  height: 15px;
  border-radius: 3px;
  display: inline-flex;
  flex: none;
  vertical-align: -3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25) inset;
  overflow: hidden;
}
.bp .flag svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ---------- HERO ---------- */
.bp .hero {
  padding: 84px 0 60px;
  position: relative;
}
.bp .hero-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 54px;
  align-items: center;
}
.bp .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: "JetBrains Mono";
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--yellow);
  text-transform: uppercase;
  margin-bottom: 22px;
  border: 1px solid var(--line-strong);
  padding: 7px 13px;
  border-radius: 100px;
}
.bp .eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--yellow);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--yellow) 22%, transparent);
  animation: bp-pulse 2s infinite;
}
@keyframes bp-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
.bp .hero h1 {
  font-weight: 900;
  font-size: clamp(44px, 6.6vw, 96px);
  line-height: 1;
  letter-spacing: -0.035em;
  margin-bottom: 30px;
  text-wrap: balance;
}
.bp .hero h1 .l2 {
  display: block;
  margin-top: 0.08em;
}
.bp .hero h1 .wave {
  display: inline-block;
  transform-origin: 70% 70%;
  animation: bp-wave 2.6s ease-in-out infinite;
}
@keyframes bp-wave {
  0%,
  60%,
  100% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(16deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(16deg);
  }
  40% {
    transform: rotate(-6deg);
  }
  50% {
    transform: rotate(10deg);
  }
}
.bp .hero h1 .hl {
  color: var(--yellow);
}
.bp .hero .lead {
  font-size: clamp(16px, 1.6vw, 19px);
  color: var(--muted);
  max-width: 50ch;
  margin-bottom: 14px;
}
.bp .hero .lead b {
  color: var(--text);
  font-weight: 600;
}
.bp .hero .sub {
  font-family: "JetBrains Mono";
  font-size: 13.5px;
  color: var(--text);
  margin-bottom: 30px;
}
.bp .cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-bottom: 26px;
}
.bp .btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: "Archivo";
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 14px 22px;
  border-radius: 11px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s, background 0.2s, color 0.2s;
  white-space: nowrap;
}
.bp .btn svg {
  width: 18px;
  height: 18px;
}
.bp .btn .ico svg {
  width: 18px;
  height: 18px;
}
.bp .btn-primary {
  background: var(--yellow);
  color: var(--on-yellow);
  box-shadow: 0 10px 26px -10px var(--yellow);
}
.bp .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 34px -12px var(--yellow);
}
.bp .btn-ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--line-strong);
}
.bp .btn-ghost:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  transform: translateY(-3px);
}
.bp .btn-dark {
  background: var(--bg-2);
  color: var(--text);
  border: 1px solid var(--line);
}
html[data-contrast="high"] .bp .btn-dark {
  color: var(--text);
  background: #000;
}
.bp .btn-dark:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow);
}
.bp .socials {
  display: flex;
  gap: 12px;
  align-items: center;
}
.bp .socials a {
  width: 46px;
  height: 46px;
  border-radius: 11px;
  border: 1px solid var(--line-strong);
  display: grid;
  place-items: center;
  transition: all 0.2s;
  color: var(--text);
}
.bp .socials a:hover {
  background: var(--yellow);
  color: var(--on-yellow);
  border-color: var(--yellow);
  transform: translateY(-3px);
}
.bp .socials a svg {
  width: 21px;
  height: 21px;
}
.bp .hero-side {
  position: relative;
  display: grid;
  place-items: center;
}
.bp .avatar-frame {
  position: relative;
  width: 300px;
  height: 300px;
}
.bp .avatar-frame::before {
  content: "";
  position: absolute;
  inset: -16px;
  border: 2px solid var(--yellow);
  border-radius: 30px;
  transform: rotate(-5deg);
  opacity: 0.5;
}
.bp .avatar {
  width: 300px;
  height: 300px;
  border: 1px solid var(--line-strong);
  border-radius: 26px;
  object-fit: cover;
  position: relative;
}
.bp .badge-float {
  position: absolute;
  font-family: "JetBrains Mono";
  font-weight: 700;
  font-size: 12px;
  background: var(--bg-2);
  border: 1px solid var(--line-strong);
  color: var(--text);
  padding: 9px 14px;
  border-radius: 100px;
  box-shadow: var(--card-shadow);
  display: flex;
  align-items: center;
  gap: 7px;
}
.bp .badge-float .g {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #3ed66b;
}
.bp .badge-1 {
  top: -14px;
  right: -6px;
  animation: bp-float 4s ease-in-out infinite;
}
.bp .badge-2 {
  bottom: 6px;
  left: -30px;
  animation: bp-float 4s ease-in-out infinite 0.8s;
}
@keyframes bp-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

/* ---------- MARQUEE ---------- */
.bp .marquee {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 18px 0;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 30px;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}
.bp .marquee-track {
  display: inline-flex;
  gap: 46px;
  animation: bp-scrollx 26s linear infinite;
}
.bp .marquee:hover .marquee-track {
  animation-play-state: paused;
}
.bp .marquee-track span {
  font-family: "Archivo";
  font-weight: 800;
  font-size: 22px;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 46px;
  letter-spacing: -0.01em;
}
.bp .marquee-track span i::after {
  content: "●";
  color: var(--yellow);
  font-size: 9px;
}
@keyframes bp-scrollx {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- SECTIONS ---------- */
.bp section {
  padding: 88px 0;
  position: relative;
  scroll-margin-top: 76px;
}
.bp #home {
  scroll-margin-top: 0;
}
.bp .sec-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 42px;
  flex-wrap: wrap;
}
.bp .sec-tag {
  font-family: "JetBrains Mono";
  font-size: 13px;
  font-weight: 700;
  color: var(--yellow);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 9px;
}
.bp .sec-tag::before {
  content: "";
  width: 26px;
  height: 2px;
  background: var(--yellow);
}
.bp .sec-head h2 {
  font-weight: 900;
  font-size: clamp(32px, 4.4vw, 56px);
  line-height: 0.96;
  letter-spacing: -0.03em;
}
.bp .sec-head p {
  color: var(--muted);
  max-width: 42ch;
  font-size: 15.5px;
}

/* about / stack */
.bp .about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;
}
.bp .about-grid .big {
  font-family: "Archivo";
  font-weight: 700;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}
.bp .about-grid .big b {
  color: var(--yellow);
}
.bp .stack-card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 26px;
  box-shadow: var(--card-shadow);
}
.bp .stack-card h4 {
  font-family: "JetBrains Mono";
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 18px;
  font-weight: 500;
}
.bp .chips {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.bp .chip {
  font-family: "JetBrains Mono";
  font-size: 13px;
  font-weight: 500;
  padding: 8px 13px;
  border-radius: 9px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  transition: all 0.2s;
  cursor: default;
}
.bp .chip:hover {
  border-color: var(--yellow);
  color: var(--yellow);
  transform: translateY(-2px);
}
.bp .facts {
  display: flex;
  gap: 14px;
  margin-top: 22px;
  flex-wrap: wrap;
}
.bp .fact {
  flex: 1;
  min-width: 120px;
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 18px;
}
.bp .fact .n {
  font-family: "Archivo";
  font-weight: 900;
  font-size: 34px;
  color: var(--yellow);
  line-height: 1;
}
.bp .fact .l {
  font-family: "JetBrains Mono";
  font-size: 11.5px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 8px;
}

/* projects */
.bp .proj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.bp .card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1),
    border-color 0.28s;
  display: flex;
  flex-direction: column;
}
.bp .card:hover {
  transform: translateY(-7px);
  border-color: var(--line-strong);
}
.bp .card .thumb {
  position: relative;
  height: 200px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  background: var(--bg-3);
}
.bp .card .thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.bp .card .thumb .num {
  position: absolute;
  top: 14px;
  left: 14px;
  font-family: "JetBrains Mono";
  font-size: 12px;
  font-weight: 700;
  background: var(--bg);
  color: var(--yellow);
  padding: 5px 10px;
  border-radius: 7px;
  border: 1px solid var(--line-strong);
  z-index: 2;
}
.bp .card .body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex: 1;
}
.bp .card .body h3 {
  font-weight: 800;
  font-size: 23px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 10px;
}
.bp .card .body p {
  color: var(--muted);
  font-size: 14.5px;
  flex: 1;
}
.bp .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.bp .tag {
  font-family: "JetBrains Mono";
  font-size: 11px;
  font-weight: 500;
  padding: 5px 9px;
  border-radius: 6px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  color: var(--muted);
}
.bp .card .foot {
  display: flex;
  gap: 16px;
  padding-top: 6px;
  border-top: 1px solid var(--line);
  margin-top: 4px;
}
.bp .card .foot a {
  font-family: "Archivo";
  font-weight: 700;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text);
  padding-top: 14px;
  transition: color 0.2s;
}
.bp .card .foot a:hover {
  color: var(--yellow);
}
.bp .card .foot a svg {
  width: 15px;
  height: 15px;
}
.bp .status {
  font-family: "JetBrains Mono";
  font-size: 11px;
  font-weight: 700;
  padding: 4px 9px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.bp .status.live {
  background: rgba(62, 214, 107, 0.14);
  color: #3ed66b;
}
.bp .status.wip {
  background: rgba(255, 210, 26, 0.16);
  color: var(--yellow-deep);
}
html[data-contrast="high"] .bp .status.wip {
  color: #ffe500;
  background: transparent;
  border: 2px solid #ffe500;
}
html[data-contrast="high"] .bp .status.live {
  color: #5dff8f;
  background: transparent;
  border: 2px solid #5dff8f;
}

/* games featured */
.bp .game-feat {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  box-shadow: var(--card-shadow);
}
.bp .game-feat .art {
  position: relative;
  background: linear-gradient(160deg, var(--bg-3), var(--bg));
  display: grid;
  place-items: center;
  padding: 40px;
  border-right: 1px solid var(--line);
}
.bp .game-feat .art img {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 18px;
}
.bp .game-feat .art img.wide {
  max-width: 100%;
  aspect-ratio: auto;
}
.bp .game-feat + .game-feat,
.bp .game-grid {
  margin-top: 28px;
}
.bp .game-feat .info {
  padding: 44px;
}
.bp .game-feat .glogo {
  font-family: "Archivo";
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--yellow);
  text-transform: uppercase;
  margin-bottom: 14px;
}
.bp .game-feat h3 {
  font-weight: 900;
  font-size: clamp(28px, 3.4vw, 42px);
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 18px;
}
.bp .game-feat h3 .hl {
  color: var(--yellow);
}
.bp .game-feat p {
  color: var(--muted);
  font-size: 15px;
  margin-bottom: 14px;
  max-width: 52ch;
}
.bp .game-feat .warn {
  color: #ff8b6b;
  font-size: 13.5px;
  font-family: "JetBrains Mono";
  margin-bottom: 22px;
}
.bp .game-feat .btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* tools */
.bp .tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.bp .tool {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 26px;
  transition: transform 0.25s, border-color 0.25s;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.bp .tool:hover {
  transform: translateY(-6px);
  border-color: var(--yellow);
}
.bp .tool .ic {
  width: 50px;
  height: 50px;
  border-radius: 13px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  color: var(--yellow);
}
.bp .tool .ic svg {
  width: 24px;
  height: 24px;
}
.bp .tool h4 {
  font-weight: 800;
  font-size: 19px;
  letter-spacing: -0.01em;
}
.bp .tool p {
  color: var(--muted);
  font-size: 14px;
  flex: 1;
}
.bp .tool .more {
  font-family: "JetBrains Mono";
  font-size: 12px;
  font-weight: 700;
  color: var(--yellow);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.bp .tool .tool-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
}

/* contact band */
.bp .contact {
  padding: 0 0 88px;
}
.bp .contact-band {
  background: var(--yellow);
  color: var(--on-yellow);
  border-radius: 28px;
  padding: 64px 56px;
  position: relative;
  overflow: hidden;
}
html[data-contrast="high"] .bp .contact-band {
  border: 2px solid var(--yellow);
}
.bp .contact-band::after {
  content: "";
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 260px;
  height: 260px;
  border: 30px solid color-mix(in srgb, var(--on-yellow) 8%, transparent);
  border-radius: 50%;
}
.bp .contact-band .ct-tag {
  font-family: "JetBrains Mono";
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 16px;
}
.bp .contact-band h2 {
  font-weight: 900;
  font-size: clamp(34px, 5vw, 64px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  margin-bottom: 20px;
  max-width: 14ch;
}
.bp .contact-band p {
  font-size: 17px;
  max-width: 46ch;
  margin-bottom: 28px;
  opacity: 0.85;
}
.bp .contact-band .ct-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  z-index: 2;
}
.bp .btn-onyellow {
  background: var(--on-yellow);
  color: var(--yellow);
}
.bp .btn-onyellow:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 30px -12px rgba(0, 0, 0, 0.5);
}
.bp .btn-outline-y {
  background: transparent;
  color: var(--on-yellow);
  border: 1.5px solid var(--on-yellow);
}
.bp .btn-outline-y:hover {
  transform: translateY(-3px);
  background: var(--on-yellow);
  color: var(--yellow);
}
.bp .contact-band .joke {
  font-style: italic;
  font-size: 14px;
  margin-top: 26px;
  opacity: 0.7;
  font-family: "Space Grotesk";
}

/* footer */
.bp footer {
  border-top: 1px solid var(--line);
  padding: 46px 0 40px;
}
.bp .foot-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.bp .foot-brand {
  font-family: "Archivo";
  font-weight: 900;
  font-size: 18px;
}
.bp .foot-brand span {
  color: var(--yellow);
}
.bp .foot-brand .foot-rights {
  color: var(--muted);
  font-weight: 500;
}
.bp .foot-meta {
  font-family: "JetBrains Mono";
  font-size: 12px;
  color: var(--muted);
}
.bp .foot-soc {
  display: flex;
  gap: 10px;
}
.bp .foot-soc a {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--line-strong);
  display: grid;
  place-items: center;
  transition: all 0.2s;
}
.bp .foot-soc a:hover {
  background: var(--yellow);
  color: var(--on-yellow);
  border-color: var(--yellow);
}
.bp .foot-soc a svg {
  width: 18px;
  height: 18px;
}

/* reveal */
.bp .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.bp .reveal.in {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .bp .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .bp .wave,
  .bp .badge-1,
  .bp .badge-2,
  .bp .marquee-track {
    animation: none;
  }
}

/* responsive */
@media (max-width: 900px) {
  .bp .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .bp .hero-side {
    order: -1;
    justify-self: start;
  }
  .bp .about-grid,
  .bp .proj-grid,
  .bp .game-feat {
    grid-template-columns: 1fr;
  }
  .bp .game-feat .art {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  .bp .tool-grid {
    grid-template-columns: 1fr 1fr;
  }
  .bp nav.links {
    display: none;
  }
  .bp .toggle.burger {
    display: grid;
  }
  .bp .mobile-menu {
    display: flex;
  }
}
@media (max-width: 560px) {
  .bp .wrap {
    padding: 0 18px;
  }
  .bp .tool-grid {
    grid-template-columns: 1fr;
  }
  .bp .contact-band {
    padding: 44px 28px;
  }
  .bp .nav-tools .lang-txt {
    display: none;
  }
}
</style>
