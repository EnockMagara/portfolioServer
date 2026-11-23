// The two platforms, written as case studies. Every number was counted in the
// repositories on 23 November 2026 (git log, test files, docs). Re-count before
// changing one.

const mybizna = {
  id: 'mybizna',
  title: 'Mybizna',
  shortTitle: 'Mybizna',
  description: 'A multi-tenant commerce platform for small businesses in Kenya: a website on the seller\'s own domain, orders and bookings, payments settled to M-Pesa or a bank, a web dashboard and a seller app on the App Store and Google Play.',
  date: 'Sept 2026 – present',
  category: 'Commerce platform · Payments · Multi-tenant',
  liveUrl: 'https://mybizna.com',
  technologies: [
    { name: 'TypeScript' }, { name: 'Express · Mongoose' }, { name: 'Next.js 16' }, { name: 'Flutter' },
    { name: 'Paystack · M-Pesa' }, { name: 'Cloudflare for SaaS' }, { name: 'Railway' }
  ],
  caseStudy: {
    headline: 'Mybizna: one deployment, every seller, real money',
    lede: 'A commerce platform for small businesses in Kenya. A seller signs up, gets a website on their own domain, takes orders and bookings, and is paid to M-Pesa or a bank. I am the only engineer. This page is about the decisions that made it safe to ship daily.',
    meta: [
      { k: 'Role', v: 'Founding engineer, SafiSend Limited. API, web, mobile, infrastructure, security review, release process.' },
      { k: 'When', v: 'September 2026 to present' },
      { k: 'Stack', v: 'TypeScript. Express and Mongoose API; Next.js 16 dashboard and host-routed storefronts; Flutter seller app; Zod schemas shared as one OpenAPI spec. Railway, Cloudflare, Paystack, Cloudinary.' },
      { k: 'Live', v: '<a href="https://mybizna.com" rel="noopener" target="_blank">mybizna.com</a> · <a href="https://apps.apple.com/app/id6819720099" rel="noopener" target="_blank">App Store</a> · <a href="https://play.google.com/store/apps/details?id=com.safisend.business" rel="noopener" target="_blank">Google Play</a>' }
    ],
    numbers: [
      { v: '3,043', k: 'commits, 19 September to 23 November 2026' },
      { v: '554', k: 'pull requests, each reviewed before merge' },
      { v: '~10,000', k: 'test cases: about 9,000 on the API across 680 files, 1,600 on the web, plus Flutter' },
      { v: '43', k: 'numbered design documents, from data model to security review to money model' },
      { v: '130+', k: 'deploys logged in the release checklist, each with what changed and how to verify it' },
      { v: '11', k: 'architecture ratchets in CI whose counts can only fall' },
      { v: '104 · 118 · 61', k: 'models on the API, pages on the web, screens in the app' }
    ],
    numbersNote: 'Counted in the repository on 23 November 2026.',
    decisionsIntro: 'Each one names the problem, what I chose, and where a reviewer can check it.',
    decisions: [
      {
        title: 'The tenant is a property of the actor, and the runtime refuses anything else',
        body: 'One process serves every shop, so a query that forgets the shop does not return slightly wrong data. It returns another business\'s data. Convention had failed at this once before, on the restaurant platform, where a review found 37 unguarded endpoints. So here the boundary is held in three places.\n\nOne middleware resolves the shop from the signed-in user\'s memberships and nothing else reads the header; an ESLint rule fails any other read. The verified shop enters an <code>AsyncLocalStorage</code> context. A Mongoose plugin registered before any model hooks every query, aggregate, save and bulk write: inside a context it refuses a filter whose tenant names another shop, outside one it refuses an unscoped query in staging and logs it in production until seven quiet days pass. The only way past is <code>.crossTenant(\'reason\')</code>, and the reason is a string so every exception is one grep away.',
        evidence: 'Evidence: docs/14 §1, <code>models/plugins/tenantScoped.ts</code>, <code>tests/unit/tenantIsolation.test.ts</code>, the ratchet in <code>scripts/arch/audit-tenant-scoping.js</code> (193 sites across 37 models on 25 September, falling since).'
      },
      {
        title: 'Rules get a check in CI that can only get stricter',
        body: 'A standards document nobody runs is a wish. Each rule here has an audit script with a baseline file: tenancy, layering (routes never touch models), structured logging, silent failures, native writes that skip the guard, secrets in the tree, environment variables typed in one place, feature flags generated from one registry, country-specific words outside the locale seam, one-off design values, and helper copy over eight words. A pull request may lower a count or hold it. The build fails if a count rises. The numbers trend down because that is the only direction allowed.',
        evidence: 'Evidence: <code>pnpm api lint:arch</code> in <code>.github/workflows/ci.yml</code>; the eleven <code>.*-baseline.json</code> files; docs/14 §11.'
      },
      {
        title: 'Money is append-only, then reconciled against the processor',
        body: 'Sellers are paid through Paystack split settlement: the buyer pays once, the platform fee and the seller\'s share are divided at the processor, and the seller\'s share lands in their M-Pesa or bank. Ledger rows are never edited.\n\nA scheduler polls settlements and matches them to sales; payouts are verified against the processor\'s own records; a failed settlement is a named state, not a silent skip. The money model (fee ladder, split timing, what the seller sees on each screen) is a document before it is code, and the first live payout was reconciled by hand against it. The open items are written down too: a sale on a failed settlement still stalls the matcher, found 20 November, not yet fixed.',
        evidence: 'Evidence: docs/13 money model, docs/16 Paystack review, docs/30 §2.8 append-only records, the settlement and payout schedulers under <code>services/</code>.'
      },
      {
        title: 'Observability was built before the second seller, not after the first outage',
        body: 'One logger on pino with ECS fields, shared by API and web. A request id minted at the edge, carried through every log line and returned in every response and error body, so a seller\'s screenshot leads to the exact trace. Liveness and readiness endpoints that check the database, graceful shutdown that drains in-flight requests, Prometheus metrics behind a token, and an access log. The audit that led to it listed nine gaps; each has a finding number and a status.',
        evidence: 'Evidence: docs/30 production readiness, <code>packages/logger</code>, <code>/api/health/live</code>, <code>/api/health/ready</code>, <code>/metrics</code>.'
      },
      {
        title: 'A security review with a status line per finding',
        body: 'A full review of authentication, tenancy, payments, the public storefront, uploads, the Worker, the app, schedulers and secrets produced 135 findings. Each carries a status a later reader can verify a fix against, and the launch review three weeks later recorded the delta after 293 commits. Dependency advisories are triaged by whether the vulnerable path is reachable, not by count: of seven in one Next.js upgrade, two applied.',
        evidence: 'Evidence: docs/25 security review, docs/40 help-assistant security review, the Next.js 16.4.6 upgrade PR.'
      },
      {
        title: 'Sellers\' own domains through Cloudflare for SaaS, with one Worker',
        body: 'Railway caps custom domains at 20 per service and gives each a different CNAME target, which would have meant every seller editing DNS if we ever moved. Instead a seller points a CNAME at a stable name under our zone, Cloudflare issues the certificate, and a Worker forwards to an origin host Railway knows, caching only hashed static files. Capacity is a number with a warning at 80 percent.',
        evidence: 'Evidence: docs/19 custom domains, <code>infra/cloudflare/</code>.'
      },
      {
        title: 'Road distance from our own router, so a pin never leaves the house',
        body: 'Delivery priced by distance needs road kilometres between two pins. Google\'s Distance Matrix costs per call and sees both addresses. A private Valhalla service on Railway builds Kenya\'s OpenStreetMap roads once and answers in under 1.5 seconds for a flat monthly cost; past the timeout, the straight line times 1.3 prices the order and the record says which method it used. The pins never reach a log.',
        evidence: 'Evidence: docs/26 delivery workflow, <code>services/routing/valhalla.ts</code>, <code>infra/railway/Dockerfile.routing</code>.'
      },
      {
        title: 'One door for every model call',
        body: 'Product descriptions, the help assistant, photo judgement and listing moderation all go through one gateway: Cloudflare AI Gateway in front, Claude Haiku first, the feature\'s OpenAI model as the fallback, a budget per prompt, and an alert when a feature\'s failure rate climbs. The help assistant answers only from written articles, builds its cards on the server, and prepares changes the seller confirms rather than applying them.',
        evidence: 'Evidence: docs/36 AI gateway, docs/39 help assistant, docs/40 its security review.'
      }
    ],
    sections: [
      {
        title: 'What I would do differently',
        body: 'Build the declared database indexes by migration from day one; Mongoose\'s auto-indexing was off and several declared indexes were never created in production. Put the four-shard API test suite in CI before the suite reached the size that needs sharding. Write the country seam before the first Kenya-specific string, not after a thousand of them.'
      }
    ],
    links: [
      { label: 'mybizna.com', href: 'https://mybizna.com' },
      { label: 'Mybizna on the App Store', href: 'https://apps.apple.com/app/id6819720099' },
      { label: 'Mybizna on Google Play', href: 'https://play.google.com/store/apps/details?id=com.safisend.business' }
    ],
    linksNote: 'The repository is private. I can walk through any of it, including the documents named above, on a call.',
    next: { label: 'Next: SafiSend for restaurants', href: '/project/safisend' }
  }
};

const safisend = {
  id: 'safisend',
  title: 'SafiSend for restaurants',
  shortTitle: 'SafiSend for restaurants',
  description: 'Restaurant operations for Kenya: QR and WhatsApp ordering, split bills, M-Pesa and card payments, inventory and analytics, with an AI layer that may act on the business only through a typed tool registry gated by risk.',
  date: 'Aug 2025 – Sept 2026',
  category: 'Restaurant platform · AI tools · Payments',
  liveUrl: 'https://safisend.com',
  technologies: [
    { name: 'TypeScript' }, { name: 'Node 20 · Express · Mongoose' }, { name: 'React · Capacitor' }, { name: 'OpenAI' },
    { name: 'Paystack · M-Pesa' }, { name: 'Playwright · Selenium · JMeter' }
  ],
  caseStudy: {
    headline: 'SafiSend for restaurants: an AI layer that may only touch the business through typed tools',
    lede: 'Restaurant operations for Kenya: QR and WhatsApp ordering, split bills, M-Pesa and card payments, inventory, analytics. The part worth a reviewer\'s time is how a model was allowed to act on a real business without being trusted.',
    meta: [
      { k: 'Role', v: 'Lead engineer. The platform Mybizna was later forked from.' },
      { k: 'When', v: 'August 2025 to September 2026' },
      { k: 'Stack', v: 'TypeScript on Node 20, Express, Mongoose, React with Capacitor for Android, OpenAI, Paystack, Playwright, Selenium, JMeter.' },
      { k: 'Live', v: '<a href="https://safisend.com" rel="noopener" target="_blank">safisend.com</a>' }
    ],
    numbers: [
      { v: '1,320', k: 'commits over 132 active days' },
      { v: '2,100+', k: 'test cases in 163 files, plus Playwright API suites, Selenium flows and JMeter fintech invariants' },
      { v: '30', k: 'tools in the registry: 25 read, 2 low-risk, 3 high-risk' },
      { v: '9', k: 'fail-closed gates every tool call passes' },
      { v: '37', k: 'unguarded endpoints found and fixed when tenant scoping became structural' },
      { v: '80 · 90 · 68', k: 'models, services, route files' }
    ],
    numbersNote: 'Counted in the repository on 23 November 2026.',
    decisionsIntro: '',
    decisions: [
      {
        title: 'Numbers are computed, never generated',
        body: 'A model chooses which tools to call and how to phrase the answer. Every figure it reports came back from a tool result and is citable to the rows that produced it; the ask-your-data panel shows those rows under the answer.\n\nProse from a model reads as equally confident whether or not it is grounded, so the citation is the only thing that tells the two apart. Asked how to improve something, it must name the dish, the change and what it is worth, because a model holding the menu-engineering classification has no excuse for a generic answer.',
        evidence: 'Evidence: <code>POST /api/copilot/ask</code>, a bounded loop capped at 5 iterations and 30 seconds, every call audited under one run id.'
      },
      {
        title: 'Thirty tools, each with a risk tier, behind nine gates',
        body: 'Reads run at once. Two low-risk writes run and are fully audited. Three high-risk actions never execute on an agent\'s say-so: they file a proposal and wait for a person. The restaurant id is never a tool parameter. It is bound from the actor and injected, and the registry asserts that at boot, so nothing a model emits can redirect a call to another restaurant.',
        gates: [
          ['0 · resolve', 'an unregistered name is unreachable'],
          ['1 · actor kind', 'staff, agent or system'],
          ['2 · tenant', 'bound from the actor, never a parameter'],
          ['3 · permissions', 'the actor\'s own, not the caller\'s'],
          ['4 · features', 'per-restaurant flags'],
          ['5 · validate', 'strict schema, unknown keys rejected'],
          ['6 · ownership', 'the resource belongs to this tenant'],
          ['7 · risk routing', 'high risk becomes a proposal'],
          ['8 · dispatch', 'then audit']
        ],
        evidence: 'Evidence: <code>services/tools/executor.ts</code>, <code>services/tools/catalog/</code>, the tool tests.'
      },
      {
        title: 'Agents propose; people decide',
        body: 'Two agents run on schedulers. The 86 agent watches stock against forecast demand and proposes taking a dish off the menu when an ingredient cannot cover the rest of service, and proposes putting it back when stock recovers. It only ever undoes its own snooze: a dish a person pulled was pulled for a reason the agent cannot see. The margin agent reviews profitability daily and proposes prices.\n\nThe margin agent holds the analytics permission and not the menu-update permission, so it cannot change a price even if its own code asked, because the executor checks the actor\'s permissions rather than trusting the caller. Approving a proposal applies it under the approver\'s authority.',
        evidence: 'Evidence: <code>services/agents/</code>; the decision arithmetic lives in pure modules with no I/O, clock or database, so it is exhaustively tested and a model at most rephrases the rationale.'
      },
      {
        title: 'Tenant scoping moved from convention to three layers',
        body: 'Roughly 1,300 query sites each had to remember the tenant filter, and the review that followed found the same failure in several places: someone forgot, and nothing noticed. Two menu routes had no middleware at all.\n\nThe fix was structural: membership verified before any handler runs, a Mongoose plugin that watches every query and reports or rejects one that does not constrain the tenant, and a static ratchet that blocks new unscoped sites in CI. Finding the gaps and fixing them was one piece of work; making the next one impossible was the point. The same design, hardened, became Mybizna\'s.',
        evidence: 'Evidence: <code>SECURITY_FINDINGS_TENANT_SCOPING.md</code>, <code>project_docs/TENANT_SCOPING.md</code>, <code>scripts/audit-tenant-scoping.js</code>.'
      },
      {
        title: 'A hash-chained financial audit log',
        body: 'Every payment writes a ledger entry carrying device, touchpoint, channel, method, time and origin, and the financial audit log chains entries by hash with atomic sequence allocation, so a removed or altered row is detectable. JMeter runs under load and a separate script asserts the fintech invariants afterwards: totals balance, no order is paid twice, no ledger row is orphaned.',
        evidence: 'Evidence: <code>models/FinancialAuditLog.ts</code>, <code>docs/AUDIT_TRAIL_IMPLEMENTATION.md</code>, <code>jmeter/validate-invariants.js</code>.'
      },
      {
        title: 'Everything ships dark',
        body: 'The registry, the copilot and the proposal routes mount only when their flag is on; each agent needs its own flag and the registry\'s. The phrasing model is optional: tools work with no API key at all. Per-restaurant feature flags gate the tools independently of the environment, so a capability can be on for one restaurant and absent for the rest.',
        evidence: ''
      }
    ],
    sections: [
      {
        title: 'Also in this platform',
        body: 'A menu recommender combining embeddings, collaborative filtering and FP-Growth basket mining written from the paper, with a five-tier cold-start ladder for anonymous diners and a cross-restaurant taste profile gated on history and opt-out. Menu onboarding from a photograph with a second pass over low-confidence items and human review before a price is published. Split billing across several diners at one table.'
      },
      {
        title: 'What I would do differently',
        body: 'Enforce tenancy from the first model, not after the first review. Keep decision logic in pure modules from the start; the agents were the first place that happened and it is the part I trust most. Fewer planning documents and more of the one-page kind that record a decision and how to verify it.'
      }
    ],
    links: [
      { label: 'safisend.com', href: 'https://safisend.com' }
    ],
    linksNote: 'The repository is private. I can walk through any of it on a call.',
    next: { label: 'Previous: Mybizna', href: '/project/mybizna' }
  }
};

module.exports = [mybizna, safisend];
