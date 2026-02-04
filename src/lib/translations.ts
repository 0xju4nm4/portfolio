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

CTO at tntlabs.xyz - Product Studio and my own company
focused on removing friction from DeFi.
Staff Engineer & Architect based in Buenos Aires.
I build things that move value across blockchains
— and I make them feel simple.

Most recently at Squid, where I built and scaled
cross-chain routing infrastructure from the ground up.
Hundreds of recurrent users, low latency, elegant
architecture — designed to last, not just to ship.

Before that, I led frontend teams in crypto fintech,
built OTC trading desks, shipped NFT marketplaces
end-to-end, and built UI at Globant and Mercado Libre
for millions of users.

I've been writing code professionally since 2017.
Bachelor's in Computer Science from Universidad
Nacional de Rosario. Went from junior dev at a small
fintech in Rosario to staff engineer on a globally
distributed team — and now CTO of my own.

What I'm good at:

  → Designing systems that scale without losing clarity
  → Leading teams while staying hands-on
  → Bridging the gap between product vision and code
  → Making Web3 accessible to Web2 developers
  → Mentoring engineers and raising the bar

I speak at Ethereum conferences.
I think in systems, but I ship in sprints.
I care about the craft, the team, and the user.

Let's talk juan@tntlabs.xyz
`,

  es: `> Hola, soy Juan Manuel Villarraza.

CTO en tntlabs.xyz - Product Studio y mi propia empresa
enfocada en simplificar DeFi.
Staff Engineer & Arquitecto en Buenos Aires.
Construyo cosas que mueven valor entre blockchains
— y las hago parecer simples.

Lo más reciente: Squid, donde construí y escalé
infraestructura de ruteo cross-chain desde cero.
Cientos de usuarios recurrentes, baja latencia,
arquitectura elegante — diseñada para durar.

Antes de eso, lideré equipos frontend en fintech crypto,
construí mesas OTC, shippeé marketplaces NFT
de punta a punta, e hice UI en Globant y Mercado Libre
para millones de usuarios.

Escribo código profesionalmente desde 2017.
Licenciado en Ciencias de la Computación de la
Universidad Nacional de Rosario. De junior en una
fintech chica en Rosario a staff engineer en un equipo
distribuido global — y ahora CTO de lo mío.

En lo que soy bueno:

  → Diseñar sistemas que escalan sin perder claridad
  → Liderar equipos sin dejar de meter mano en el código
  → Conectar la visión de producto con el código
  → Hacer Web3 accesible para devs de Web2
  → Mentorear ingenieros y subir la vara

Doy charlas en conferencias de Ethereum.
Pienso en sistemas, pero shippeo en sprints.
Me importa el oficio, el equipo y el usuario.

Hablemos juan@tntlabs.xyz
`,

  pt: `> Oi, sou Juan Manuel Villarraza.

CTO na tntlabs.xyz - Product Studio e minha própria empresa
focada em remover fricção do DeFi.
Staff Engineer & Arquiteto em Buenos Aires.
Construo coisas que movem valor entre blockchains
— e faço parecer simples.

Mais recentemente na Squid, onde construí e escalei
infraestrutura de roteamento cross-chain do zero.
Centenas de usuários recorrentes, baixa latência,
arquitetura elegante — feita pra durar.

Antes disso, liderei times de frontend em fintech crypto,
construí mesas OTC, entreguei marketplaces NFT
de ponta a ponta, e fiz UI na Globant e Mercado Libre
pra milhões de usuários.

Escrevo código profissionalmente desde 2017.
Bacharel em Ciência da Computação pela Universidad
Nacional de Rosario. De junior numa fintech pequena
em Rosario a staff engineer num time distribuído global
— e agora CTO do meu próprio negócio.

No que sou bom:

  → Projetar sistemas que escalam sem perder clareza
  → Liderar times sem largar a mão do código
  → Conectar visão de produto com código
  → Tornar Web3 acessível pra devs Web2
  → Mentorar engenheiros e elevar o nível

Palestro em conferências de Ethereum.
Penso em sistemas, mas entrego em sprints.
Me importo com o ofício, o time e o usuário.

Bora conversar juan@tntlabs.xyz
`,

  fr: `> Salut, je suis Juan Manuel Villarraza.

CTO chez tntlabs.xyz - Product Studio et ma propre boîte
focalisée sur simplifier le DeFi.
Staff Engineer & Architecte basé à Buenos Aires.
Je construis des trucs qui déplacent de la valeur
entre blockchains — et je les rends simples.

Dernièrement chez Squid, où j'ai construit et scalé
l'infrastructure de routage cross-chain depuis zéro.
Des centaines d'utilisateurs récurrents, faible latence,
architecture élégante — conçue pour durer.

Avant ça, j'ai dirigé des équipes frontend en fintech
crypto, construit des desks OTC, livré des marketplaces
NFT de bout en bout, et fait de l'UI chez Globant
et Mercado Libre pour des millions d'utilisateurs.

J'écris du code pro depuis 2017.
Licence en Informatique de l'Universidad Nacional
de Rosario. De dev junior dans une petite fintech
à Rosario à staff engineer dans une équipe distribuée
à l'échelle mondiale — et maintenant CTO de ma boîte.

Ce dans quoi je suis bon :

  → Concevoir des systèmes qui scalent sans perdre en clarté
  → Diriger des équipes tout en restant les mains dans le code
  → Faire le pont entre vision produit et code
  → Rendre le Web3 accessible aux devs Web2
  → Mentorer des ingénieurs et élever le niveau

Je parle aux conférences Ethereum.
Je pense en systèmes, mais je livre en sprints.
Le métier, l'équipe et l'utilisateur — c'est ce qui compte.

Parlons-en juan@tntlabs.xyz
`,

  it: `> Ciao, sono Juan Manuel Villarraza.

CTO di tntlabs.xyz - Product Studio e la mia azienda
focalizzata su semplificare il DeFi.
Staff Engineer & Architetto a Buenos Aires.
Costruisco cose che muovono valore tra blockchain
— e le faccio sembrare semplici.

Più di recente da Squid, dove ho costruito e scalato
infrastruttura di routing cross-chain da zero.
Centinaia di utenti ricorrenti, bassa latenza,
architettura elegante — progettata per durare.

Prima di quello, ho guidato team frontend in fintech
crypto, costruito desk OTC, consegnato marketplace NFT
end-to-end, e fatto UI da Globant e Mercado Libre
per milioni di utenti.

Scrivo codice professionalmente dal 2017.
Laurea in Informatica all'Universidad Nacional
de Rosario. Da dev junior in una piccola fintech
a Rosario a staff engineer in un team distribuito
globalmente — e ora CTO della mia azienda.

In cosa sono bravo:

  → Progettare sistemi che scalano senza perdere chiarezza
  → Guidare team restando con le mani nel codice
  → Collegare la visione di prodotto al codice
  → Rendere il Web3 accessibile ai dev Web2
  → Fare mentoring e alzare l'asticella

Parlo alle conferenze Ethereum.
Penso in sistemi, ma consegno in sprint.
Mi importa del mestiere, del team e dell'utente.

Parliamone juan@tntlabs.xyz
`,

  zh: `> 嗨，我是 Juan Manuel Villarraza。

tntlabs.xyz 的 CTO — 我自己的产品工作室，
专注于简化 DeFi 的使用体验。
Staff Engineer & 架构师，坐标布宜诺斯艾利斯。
我构建跨链价值流转的基础设施
— 并让它们看起来很简单。

最近在 Squid，从零开始构建和扩展了
跨链路由基础设施。
数百名活跃用户，低延迟，
优雅的架构 — 为持久而设计。

在此之前，我在加密金融科技领域带过前端团队，
搭建过 OTC 交易平台，端到端交付过 NFT 市场，
还在 Globant 和 Mercado Libre
为数百万用户做过 UI。

从 2017 年开始写代码。
罗萨里奥国立大学计算机科学学士。
从罗萨里奥一家小金融科技公司的初级开发，
到全球分布式团队的 Staff Engineer
— 现在是自己公司的 CTO。

我擅长的：

  → 设计可扩展且清晰的系统
  → 带团队的同时保持动手写代码
  → 连接产品愿景与代码实现
  → 让 Web3 对 Web2 开发者更友好
  → 指导工程师，提升团队水平

我在以太坊大会上做技术演讲。
我用系统思维思考，用 sprint 交付。
我在乎手艺、团队和用户。

聊聊吧 juan@tntlabs.xyz
`,

  ko: `> 안녕하세요, Juan Manuel Villarraza입니다.

tntlabs.xyz의 CTO — DeFi의 마찰을 줄이는 데
집중하는 나만의 프로덕트 스튜디오입니다.
부에노스아이레스 기반 Staff Engineer & 아키텍트.
블록체인 간 가치 이동을 구축하고
— 그걸 심플하게 만듭니다.

최근에는 Squid에서 크로스체인 라우팅
인프라를 처음부터 구축하고 확장했습니다.
수백 명의 활성 사용자, 낮은 지연시간,
우아한 아키텍처 — 오래가도록 설계했습니다.

그 전에는 크립토 핀테크에서 프론트엔드 팀을 이끌고,
OTC 트레이딩 데스크를 구축하고, NFT 마켓플레이스를
처음부터 끝까지 배포하고, Globant과 Mercado Libre에서
수백만 사용자를 위한 UI를 만들었습니다.

2017년부터 전문적으로 코드를 작성해왔습니다.
로사리오 국립대학교 컴퓨터과학 학사.
로사리오의 작은 핀테크 주니어 개발자에서
글로벌 분산 팀의 Staff Engineer로
— 그리고 지금은 내 회사의 CTO.

잘하는 것:

  → 명확성을 잃지 않으면서 확장 가능한 시스템 설계
  → 직접 코딩하면서 팀 리딩
  → 제품 비전과 코드 사이의 간극 메우기
  → Web2 개발자에게 Web3를 쉽게 만들기
  → 엔지니어 멘토링과 수준 향상

이더리움 컨퍼런스에서 발표합니다.
시스템으로 사고하고, 스프린트로 배포합니다.
기술, 팀, 그리고 사용자를 중요하게 생각합니다.

연락주세요 juan@tntlabs.xyz
`,

  ja: `> こんにちは、Juan Manuel Villarraza です。

tntlabs.xyz の CTO — DeFi の摩擦をなくすことに
フォーカスした自分のプロダクトスタジオです。
ブエノスアイレス拠点の Staff Engineer & アーキテクト。
ブロックチェーン間で価値を動かすものを作り
— それをシンプルに見せます。

直近では Squid で、クロスチェーンルーティング
インフラをゼロから構築・スケールしました。
数百人のアクティブユーザー、低レイテンシー、
エレガントなアーキテクチャ — 長持ちする設計。

その前は、クリプトフィンテックでフロントエンドチームを
リード、OTC トレーディングデスクを構築、
NFT マーケットプレイスをエンドツーエンドで納品、
Globant と Mercado Libre で数百万ユーザー向けの
UI を作りました。

2017年からプロとしてコードを書いています。
ロサリオ国立大学コンピュータサイエンス学士。
ロサリオの小さなフィンテックのジュニア開発者から
グローバル分散チームの Staff Engineer へ
— そして今、自分の会社の CTO。

得意なこと：

  → 明確さを失わずにスケールするシステム設計
  → ハンズオンを維持しながらのチームリード
  → プロダクトビジョンとコードの橋渡し
  → Web2 開発者に Web3 をわかりやすくする
  → エンジニアのメンタリングとレベルアップ

Ethereum カンファレンスで登壇しています。
システムで考え、スプリントで出荷します。
技術、チーム、そしてユーザーを大切にしています。

話しましょう juan@tntlabs.xyz
`,
};

export const UI_TEXT: Record<LangCode, { online: string; placeholder: string }> = {
  en: { online: "Juan AI is online. Ask me anything.", placeholder: "ask juan anything..." },
  es: { online: "Juan AI está online. Preguntame lo que quieras.", placeholder: "preguntale a juan..." },
  pt: { online: "Juan AI está online. Me pergunte qualquer coisa.", placeholder: "pergunte ao juan..." },
  fr: { online: "Juan AI est en ligne. Demandez-moi ce que vous voulez.", placeholder: "demandez à juan..." },
  it: { online: "Juan AI è online. Chiedimi quello che vuoi.", placeholder: "chiedi a juan..." },
  zh: { online: "Juan AI 在线。随便问我。", placeholder: "问 juan 任何问题..." },
  ko: { online: "Juan AI 온라인. 뭐든 물어보세요.", placeholder: "juan에게 물어보세요..." },
  ja: { online: "Juan AI オンライン。何でも聞いてください。", placeholder: "juan に何でも聞いて..." },
};
