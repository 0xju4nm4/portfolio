export type LangCode = "en" | "es" | "pt" | "fr" | "it" | "zh" | "ko" | "ja";

export const LANGUAGES: { code: LangCode; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "zh", label: "中文", name: "中文" },
  { code: "ko", label: "한국", name: "한국어" },
  { code: "ja", label: "日本", name: "日本語" },
];

export const INTRO_TEXT: Record<LangCode, string> = {
  en: `> Hey, I'm Juan Manuel Villarraza.

Blockchain Engineer based in Buenos Aires. I build Web3 products end to end, from architecture to shipped code.

Right now that's Pálpito: on-chain prediction markets for Latin America, built on Solana. I lead the blockchain, smart contracts and integrations workstream, owning architecture and execution end to end.

That's built on 8+ years shipping Web3 products: cross-chain infrastructure moving liquidity across 100+ blockchains at Squid, multi-chain DeFi trading and lending at Membrane Labs, NFT marketplaces built from scratch, and UI at Globant and Mercado Libre.

I also co-founded TNT Labs, a studio building products at the intersection of AI and crypto.

AI is part of how I work, not an add-on. I use it across the whole pipeline: architecture, planning, code, testing and documentation. That means working spec-driven: define the architecture and requirements clearly upfront, then leverage AI to execute against that spec, so velocity never costs consistency, code quality or architectural integrity.

This isn't vibe coding. It's AI engineering.

What I'm good at:

  → Designing systems that scale without losing clarity
  → Leading teams while staying hands-on
  → Bridging product vision and code
  → Shipping spec-driven, with AI across the pipeline
  → Mentoring engineers and raising the bar

I like building things people can trust: on-chain, auditable, and genuinely decentralized, not just marketed that way.

Let's talk juan.villarraza@gmail.com
`,

  es: `> Hola, soy Juan Manuel Villarraza.

Blockchain Engineer, basado en Buenos Aires. Construyo productos Web3 de punta a punta, de la arquitectura al código en producción.

Hoy eso es Pálpito: mercados de predicción on-chain para Latinoamérica, sobre Solana. Lidero el workstream de blockchain, smart contracts e integraciones, con la arquitectura y la ejecución a mi cargo.

Atrás hay 8+ años shippeando productos Web3: infraestructura cross-chain moviendo liquidez entre 100+ blockchains en Squid, trading y lending DeFi multichain en Membrane Labs, marketplaces NFT desde cero, y UI en Globant y Mercado Libre.

También co-fundé TNT Labs, un estudio que construye productos en la intersección de AI y crypto.

La AI es parte de cómo trabajo, no un agregado. La uso en todo el pipeline: arquitectura, planificación, código, testing y documentación. Eso significa trabajar spec-driven: definir arquitectura y requisitos con claridad primero, y después apalancar AI para ejecutar contra ese spec, para que la velocidad nunca cueste consistencia, calidad de código ni integridad arquitectónica.

Esto no es vibe coding. Es AI engineering.

En lo que soy bueno:

  → Diseñar sistemas que escalan sin perder claridad
  → Liderar equipos sin soltar el código
  → Conectar la visión de producto con el código
  → Shippear spec-driven, con AI en todo el pipeline
  → Mentorear ingenieros y subir la vara

Me gusta construir cosas en las que se puede confiar: on-chain, auditables y genuinamente descentralizadas, no solo en el marketing.

Hablemos juan.villarraza@gmail.com
`,

  pt: `> Oi, sou Juan Manuel Villarraza.

Blockchain Engineer, baseado em Buenos Aires. Construo produtos Web3 de ponta a ponta, da arquitetura ao código em produção.

Hoje isso é Pálpito: mercados de predição on-chain para a América Latina, na Solana. Lidero o workstream de blockchain, smart contracts e integrações, com a arquitetura e a execução sob minha responsabilidade.

Por trás disso tem 8+ anos entregando produtos Web3: infraestrutura cross-chain movendo liquidez entre 100+ blockchains na Squid, trading e lending DeFi multichain na Membrane Labs, marketplaces NFT do zero, e UI na Globant e no Mercado Libre.

Também co-fundei a TNT Labs, um estúdio que constrói produtos na interseção de AI e crypto.

AI é parte de como eu trabalho, não um extra. Uso em todo o pipeline: arquitetura, planejamento, código, testes e documentação. Isso significa trabalhar spec-driven: definir arquitetura e requisitos com clareza primeiro, e depois usar AI para executar contra esse spec, para que a velocidade nunca custe consistência, qualidade de código ou integridade arquitetural.

Isso não é vibe coding. É AI engineering.

No que sou bom:

  → Projetar sistemas que escalam sem perder clareza
  → Liderar times sem largar o código
  → Conectar visão de produto e código
  → Entregar spec-driven, com AI em todo o pipeline
  → Mentorar engenheiros e elevar o nível

Gosto de construir coisas em que dá pra confiar: on-chain, auditáveis e genuinamente descentralizadas, não só no marketing.

Bora conversar juan.villarraza@gmail.com
`,

  fr: `> Salut, je suis Juan Manuel Villarraza.

Blockchain Engineer, basé à Buenos Aires. Je construis des produits Web3 de bout en bout, de l'architecture au code en production.

En ce moment, c'est Pálpito : des marchés de prédiction on-chain pour l'Amérique latine, sur Solana. Je dirige le workstream blockchain, smart contracts et intégrations, avec l'architecture et l'exécution à ma charge.

Derrière, il y a 8+ ans à livrer des produits Web3 : infrastructure cross-chain déplaçant de la liquidité entre 100+ blockchains chez Squid, trading et lending DeFi multichain chez Membrane Labs, des marketplaces NFT construites de zéro, et de l'UI chez Globant et Mercado Libre.

J'ai aussi co-fondé TNT Labs, un studio qui construit des produits à l'intersection de l'AI et de la crypto.

L'AI fait partie de ma façon de travailler, ce n'est pas un extra. Je l'utilise sur tout le pipeline : architecture, planification, code, tests et documentation. Ça veut dire travailler spec-driven : définir clairement l'architecture et les exigences en amont, puis m'appuyer sur l'AI pour exécuter contre ce spec, pour que la vélocité ne coûte jamais la cohérence, la qualité du code ou l'intégrité architecturale.

Ce n'est pas du vibe coding. C'est de l'AI engineering.

Ce dans quoi je suis bon :

  → Concevoir des systèmes qui scalent sans perdre en clarté
  → Diriger des équipes en restant dans le code
  → Faire le pont entre vision produit et code
  → Livrer spec-driven, avec l'AI sur tout le pipeline
  → Mentorer des ingénieurs et élever le niveau

J'aime construire des choses auxquelles on peut faire confiance : on-chain, auditables et vraiment décentralisées, pas seulement dans le marketing.

Parlons-en juan.villarraza@gmail.com
`,

  it: `> Ciao, sono Juan Manuel Villarraza.

Blockchain Engineer, con base a Buenos Aires. Costruisco prodotti Web3 end to end, dall'architettura al codice in produzione.

Oggi questo è Pálpito: mercati di predizione on-chain per l'America Latina, su Solana. Guido il workstream di blockchain, smart contract e integrazioni, con architettura ed esecuzione sotto la mia responsabilità.

Dietro ci sono 8+ anni di prodotti Web3 consegnati: infrastruttura cross-chain che muove liquidità tra 100+ blockchain in Squid, trading e lending DeFi multichain in Membrane Labs, marketplace NFT costruiti da zero, e UI in Globant e Mercado Libre.

Ho anche co-fondato TNT Labs, uno studio che costruisce prodotti all'intersezione tra AI e crypto.

L'AI fa parte di come lavoro, non è un extra. La uso su tutto il pipeline: architettura, pianificazione, codice, testing e documentazione. Significa lavorare spec-driven: definire architettura e requisiti con chiarezza prima, e poi sfruttare l'AI per eseguire contro quello spec, così la velocità non costa mai coerenza, qualità del codice o integrità architetturale.

Questo non è vibe coding. È AI engineering.

In cosa sono bravo:

  → Progettare sistemi che scalano senza perdere chiarezza
  → Guidare team restando dentro il codice
  → Collegare visione di prodotto e codice
  → Consegnare spec-driven, con l'AI su tutto il pipeline
  → Fare mentoring e alzare l'asticella

Mi piace costruire cose di cui ci si può fidare: on-chain, verificabili e davvero decentralizzate, non solo nel marketing.

Parliamone juan.villarraza@gmail.com
`,

  zh: `> 嗨，我是 Juan Manuel Villarraza。

Blockchain Engineer，常驻布宜诺斯艾利斯。我端到端地构建 Web3 产品，从架构一路到上线的代码。

现在做的是 Pálpito：面向拉丁美洲的链上预测市场，建立在 Solana 上。我负责区块链、智能合约与集成这条主线，架构和落地执行都由我承担。

背后是 8 年以上交付 Web3 产品的经历：在 Squid 做跨链基础设施，在 100+ 条链之间流转流动性；在 Membrane Labs 做多链 DeFi 交易与借贷；从零构建 NFT 市场；以及在 Globant 和 Mercado Libre 做 UI。

我还与人共同创办了 TNT Labs，一个位于 AI 与 crypto 交叉点的产品工作室。

AI 是我工作方式的一部分，不是附加项。我在整个流程里使用它：架构、规划、编码、测试和文档。这意味着 spec-driven 的工作方式：先把架构和需求定义清楚，再借助 AI 按照这份 spec 执行，让速度不必以一致性、代码质量或架构完整性为代价。

这不是 vibe coding，这是 AI engineering。

我擅长的：

  → 设计可扩展且不失清晰的系统
  → 带团队的同时保持动手写代码
  → 连接产品愿景与代码实现
  → 以 spec 驱动交付，AI 贯穿整个流程
  → 指导工程师，提升团队水平

我喜欢构建值得信任的东西：链上、可审计、真正去中心化，而不只是营销话术。

聊聊吧 juan.villarraza@gmail.com
`,

  ko: `> 안녕하세요, Juan Manuel Villarraza입니다.

부에노스아이레스 기반 Blockchain Engineer. 아키텍처부터 실제 배포되는 코드까지, Web3 제품을 엔드투엔드로 만듭니다.

지금은 Pálpito입니다. Solana 위에 올린 라틴아메리카 대상 온체인 예측 시장이고, 블록체인, 스마트 컨트랙트, 인테그레이션 워크스트림을 이끌면서 아키텍처와 실행을 직접 책임지고 있습니다.

그 밑에는 8년 넘게 Web3 제품을 출시해 온 경험이 있습니다. Squid에서 100+ 체인 사이로 유동성을 옮기는 크로스체인 인프라, Membrane Labs에서 멀티체인 DeFi 트레이딩과 렌딩, 처음부터 만든 NFT 마켓플레이스, 그리고 Globant과 Mercado Libre에서의 UI.

AI와 crypto의 교차점에서 제품을 만드는 스튜디오 TNT Labs를 공동 창업하기도 했습니다.

AI는 제 작업 방식의 일부지 부가 기능이 아닙니다. 아키텍처, 기획, 코드, 테스트, 문서화까지 전체 파이프라인에서 사용합니다. 그래서 spec-driven으로 일합니다. 아키텍처와 요구사항을 먼저 명확히 정의하고, 그 스펙에 맞춰 AI로 실행합니다. 속도가 일관성이나 코드 품질, 아키텍처 무결성을 대가로 치르지 않도록.

이건 vibe coding이 아니라 AI engineering입니다.

잘하는 것:

  → 명확성을 잃지 않으면서 확장되는 시스템 설계
  → 직접 코딩하면서 팀 리딩
  → 제품 비전과 코드 사이를 잇기
  → 스펙 기반으로, 전 파이프라인에 AI를 써서 출시
  → 엔지니어 멘토링과 수준 향상

저는 신뢰할 수 있는 것을 만드는 걸 좋아합니다. 온체인이고, 검증 가능하고, 마케팅 문구가 아니라 실제로 탈중앙화된 것들.

연락주세요 juan.villarraza@gmail.com
`,

  ja: `> こんにちは、Juan Manuel Villarraza です。

ブエノスアイレス拠点の Blockchain Engineer。アーキテクチャから本番のコードまで、Web3 プロダクトをエンドツーエンドで作ります。

今やっているのは Pálpito。Solana 上に構築したラテンアメリカ向けのオンチェーン予測市場です。ブロックチェーン、スマートコントラクト、インテグレーションのワークストリームを率いて、アーキテクチャと実行を自分で持っています。

その土台には 8 年以上 Web3 プロダクトを出してきた経験があります。Squid では 100+ のチェーン間で流動性を動かすクロスチェーン基盤、Membrane Labs ではマルチチェーンの DeFi トレーディングとレンディング、NFT マーケットプレイスをゼロから、そして Globant と Mercado Libre では UI を作りました。

AI と crypto の交差点でプロダクトを作るスタジオ TNT Labs も共同創業しています。

AI は働き方の一部であって、後付けの機能ではありません。アーキテクチャ、計画、コード、テスト、ドキュメントまでパイプライン全体で使います。つまり spec-driven に働くということ。アーキテクチャと要件を先に明確に定義し、そのスペックに沿って AI で実行する。速度が一貫性やコード品質、アーキテクチャの整合性を犠牲にしないように。

これは vibe coding ではなく AI engineering です。

得意なこと：

  → 明確さを失わずにスケールするシステム設計
  → 手を動かしながらのチームリード
  → プロダクトの構想とコードをつなぐ
  → スペック駆動で、AI をパイプライン全体に使って出荷
  → エンジニアのメンタリングと基準の引き上げ

信頼できるものを作るのが好きです。オンチェーンで、検証可能で、マーケティングの言葉だけではなく本当に分散されたもの。

話しましょう juan.villarraza@gmail.com
`,
};

export const UI_TEXT: Record<
  LangCode,
  {
    online: string;
    placeholder: string;
    thinking: string;
    back: string;
    fullscreen: string;
  }
> = {
  en: {
    online: "Juan AI is online. Ask me anything.",
    placeholder: "ask juan anything...",
    thinking: "thinking...",
    back: "back",
    fullscreen: "fullscreen",
  },
  es: {
    online: "Juan AI está online. Preguntame lo que quieras.",
    placeholder: "preguntale a juan...",
    thinking: "pensando...",
    back: "volver",
    fullscreen: "pantalla completa",
  },
  pt: {
    online: "Juan AI está online. Me pergunte qualquer coisa.",
    placeholder: "pergunte ao juan...",
    thinking: "pensando...",
    back: "voltar",
    fullscreen: "tela cheia",
  },
  fr: {
    online: "Juan AI est en ligne. Demandez-moi ce que vous voulez.",
    placeholder: "demandez à juan...",
    thinking: "réflexion...",
    back: "retour",
    fullscreen: "plein écran",
  },
  it: {
    online: "Juan AI è online. Chiedimi quello che vuoi.",
    placeholder: "chiedi a juan...",
    thinking: "sto pensando...",
    back: "indietro",
    fullscreen: "schermo intero",
  },
  zh: {
    online: "Juan AI 在线。随便问我。",
    placeholder: "问 juan 任何问题...",
    thinking: "思考中...",
    back: "返回",
    fullscreen: "全屏",
  },
  ko: {
    online: "Juan AI 온라인. 뭐든 물어보세요.",
    placeholder: "juan에게 물어보세요...",
    thinking: "생각 중...",
    back: "돌아가기",
    fullscreen: "전체 화면",
  },
  ja: {
    online: "Juan AI オンライン。何でも聞いてください。",
    placeholder: "juan に何でも聞いて...",
    thinking: "考え中...",
    back: "戻る",
    fullscreen: "全画面",
  },
};
