export type Language = "en" | "zh";

export type BilingualCopy = {
  en: string;
  zh: string;
};

type NavItem = {
  href: string;
  label: string;
};

type ContentItem = {
  description: string;
  meta?: string;
  title: string;
};

type WhatIsInfoItem = {
  description: BilingualCopy;
  headline: BilingualCopy;
  number: string;
};

type WhatIsCapability = {
  description: BilingualCopy;
  icon: "gauge" | "shield" | "badge-check" | "waypoints";
  title: BilingualCopy;
};

type WhatIsStep = {
  description: BilingualCopy;
  note: BilingualCopy;
  number: string;
  title: BilingualCopy;
};

type WhatIsAudience = {
  cta: BilingualCopy;
  description: BilingualCopy;
  href: string;
  title: BilingualCopy;
};

type WhatIsButton = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary" | "text";
};

export type WhatIsNovoVMContent = {
  audience: {
    items: WhatIsAudience[];
    title: BilingualCopy;
  };
  capabilities: {
    items: WhatIsCapability[];
    title: BilingualCopy;
  };
  getStarted: {
    buttons: WhatIsButton[];
    description: BilingualCopy;
    title: BilingualCopy;
  };
  hero: {
    definition: BilingualCopy;
    diagramLabels: {
      input: BilingualCopy;
      network: BilingualCopy;
      output: BilingualCopy;
    };
    paragraphs: BilingualCopy[];
    title: BilingualCopy;
  };
  why: {
    items: WhatIsInfoItem[];
    title: BilingualCopy;
  };
  workflow: {
    items: WhatIsStep[];
    title: BilingualCopy;
  };
};

type WhatIsNovInfoItem = {
  description: BilingualCopy;
  headline: BilingualCopy;
  number: string;
};

type WhatIsNovCapability = {
  description: BilingualCopy;
  icon: "coins" | "wallet" | "blocks" | "network";
  title: BilingualCopy;
};

type WhatIsNovFitItem = {
  description: BilingualCopy;
  eyebrow: BilingualCopy;
  title: BilingualCopy;
};

type WhatIsNovAudience = {
  description: BilingualCopy;
  title: BilingualCopy;
};

type WhatIsNovAction = {
  href: string;
  label: BilingualCopy;
  variant: "primary" | "secondary" | "text";
};

export type WhatIsNovContent = {
  audience: {
    items: WhatIsNovAudience[];
    title: BilingualCopy;
  };
  capabilities: {
    items: WhatIsNovCapability[];
    title: BilingualCopy;
  };
  fit: {
    items: WhatIsNovFitItem[];
    title: BilingualCopy;
  };
  getNov: {
    actions: WhatIsNovAction[];
    description: BilingualCopy;
    title: BilingualCopy;
  };
  hero: {
    description: BilingualCopy;
    points: BilingualCopy[];
    supporting: BilingualCopy[];
    title: BilingualCopy;
  };
  why: {
    items: WhatIsNovInfoItem[];
    title: BilingualCopy;
  };
};

type SiteLanguageContent = {
  coreTechnology: {
    description: string;
    eyebrow: string;
    items: ContentItem[];
    title: string;
  };
  developers: {
    codeSample: string;
    codeWindowLabel: string;
    description: string;
    eyebrow: string;
    items: ContentItem[];
    previewCta: string;
    title: string;
  };
  economy: {
    description: string;
    eyebrow: string;
    items: ContentItem[];
    spotlightDescription: string;
    spotlightLabel: string;
    spotlightTitle: string;
    title: string;
  };
  ecosystem: {
    description: string;
    eyebrow: string;
    items: ContentItem[];
    title: string;
  };
  finalCta: {
    description: string;
    eyebrow: string;
    primaryCta: string;
    secondaryCta: string;
    title: string;
  };
  footer: {
    description: string;
  };
  fourLayerNetwork: {
    description: string;
    eyebrow: string;
    layers: ContentItem[];
    title: string;
  };
  header: {
    developersCta: string;
  };
  hero: {
    eyebrow: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{
      description: string;
      title: string;
    }>;
    subtitle: string;
    title: string[];
  };
  navItems: NavItem[];
  whatIsNovoVM: {
    description: string;
    eyebrow: string;
    items: ContentItem[];
    title: string;
  };
};

export const defaultLanguage: Language = "zh";
export const LANGUAGE_STORAGE_KEY = "novovm-language";
export const LANGUAGE_COOKIE_KEY = LANGUAGE_STORAGE_KEY;

export const languageLabels: Record<Language, string> = {
  en: "EN",
  zh: "中文",
};

const codeSample = `import { NovoVM } from "@novovm/sdk";

const vm = new NovoVM({
  network: "preview",
  proofs: "required",
});

const result = await vm.execute({
  app: "private-agent",
  input: encryptedPayload,
});`;

const siteContent: Record<Language, SiteLanguageContent> = {
  en: {
    navItems: [
      { label: "Understand Web3", href: "/learn-web3" },
      { label: "Use", href: "/using" },
      { label: "Features & Services", href: "/ecosystem" },
      { label: "Participate", href: "/participate" },
      { label: "Research", href: "/research" },
    ],
    header: {
      developersCta: "Developers",
    },
    footer: {
      description:
        "High-performance execution infrastructure for the next generation of decentralized applications.",
    },
    hero: {
      eyebrow: "Execution infrastructure",
      title: ["NOVOVM", "The Execution Layer", "for the Next Internet."],
      subtitle:
        "High-performance, privacy-preserving, and verifiable infrastructure for Web3, AI, and decentralized applications.",
      primaryCta: "Explore NOVOVM",
      secondaryCta: "Read Whitepaper",
      stats: [
        {
          title: "Execution",
          description: "High-throughput application runtime.",
        },
        {
          title: "Privacy",
          description: "Confidential paths for sensitive workloads.",
        },
        {
          title: "Verification",
          description: "Proof-aware infrastructure layer.",
        },
      ],
    },
    whatIsNovoVM: {
      eyebrow: "What is NOVOVM",
      title:
        "Execution infrastructure for systems that need speed, privacy, and proof.",
      description:
        "NOVOVM is a virtual-machine layer for decentralized workloads, designed to unify performance, privacy, and verifiability in one execution environment.",
      items: [
        {
          title: "High-performance execution",
          description:
            "A runtime foundation for applications that need fast settlement, predictable throughput, and low operational friction.",
        },
        {
          title: "Privacy-preserving design",
          description:
            "A restrained privacy layer for sensitive data flows, private computation, and verifiable application states.",
        },
        {
          title: "Verifiable infrastructure",
          description:
            "Proof-aware architecture that helps participants validate execution without turning the interface into a proof dashboard.",
        },
      ],
    },
    coreTechnology: {
      eyebrow: "Core Technology",
      title: "A compact execution stack for decentralized applications.",
      description:
        "NOVOVM keeps the technology story focused on runtime, privacy, verification, and developer access.",
      items: [
        {
          meta: "Runtime",
          title: "Parallel execution",
          description:
            "Deterministic execution lanes built for high-volume application workloads and composable infrastructure.",
        },
        {
          meta: "Privacy",
          title: "Confidential compute",
          description:
            "Privacy-aware computation patterns that keep sensitive application logic out of the public surface.",
        },
        {
          meta: "Proofs",
          title: "Verifiable results",
          description:
            "Execution output can be validated by the network, creating trust without adding visual noise.",
        },
        {
          meta: "Access",
          title: "Developer APIs",
          description:
            "A clear surface for teams building applications, tooling, and network integrations on NOVOVM.",
        },
      ],
    },
    fourLayerNetwork: {
      eyebrow: "Four-Layer Network",
      title: "One network, four quiet layers.",
      description:
        "Hover each layer to reveal its role without turning the section into a complex animated diagram.",
      layers: [
        {
          meta: "Layer 01",
          title: "Execution Layer",
          description:
            "Processes application workloads with deterministic state transitions and predictable performance boundaries.",
        },
        {
          meta: "Layer 02",
          title: "Privacy Layer",
          description:
            "Protects sensitive computation paths and application data through privacy-preserving primitives.",
        },
        {
          meta: "Layer 03",
          title: "Verification Layer",
          description:
            "Validates execution output so applications can prove state changes without exposing unnecessary internals.",
        },
        {
          meta: "Layer 04",
          title: "Network Layer",
          description:
            "Coordinates operators, developers, and applications across a resilient infrastructure network.",
        },
      ],
    },
    economy: {
      eyebrow: "NOV Economy",
      title:
        "A utility economy for compute, validation, and long-term network alignment.",
      description:
        "The NOV economy is framed around resource access, operator contribution, and ecosystem growth.",
      spotlightLabel: "NOV",
      spotlightTitle: "Utility",
      spotlightDescription:
        "A compact frame for token utility, incentives, and network contribution. The next pass can expand concrete tokenomics.",
      items: [
        {
          meta: "Utility",
          title: "Compute access",
          description:
            "NOV can serve as the unit that opens execution, verification, and network resource access.",
        },
        {
          meta: "Security",
          title: "Operator alignment",
          description:
            "Operators, validators, and builders can be aligned around measurable infrastructure contribution.",
        },
        {
          meta: "Growth",
          title: "Ecosystem allocation",
          description:
            "Future refinements can define incentives for applications, tooling, grants, and research.",
        },
      ],
    },
    ecosystem: {
      eyebrow: "Ecosystem",
      title:
        "Built for applications that need infrastructure to disappear into the product.",
      description:
        "The ecosystem grid stays minimal. Hover cards reveal one line of context while keeping the page calm.",
      items: [
        {
          title: "AI Applications",
          description:
            "Private inference, agent coordination, and verifiable AI workflows.",
        },
        {
          title: "Web3 Apps",
          description:
            "Fast execution for consumer and financial decentralized products.",
        },
        {
          title: "DePIN",
          description:
            "Compute, sensor, and infrastructure networks with verifiable activity.",
        },
        {
          title: "Rollups",
          description:
            "Execution support for modular chains and specialized settlement paths.",
        },
        {
          title: "Privacy Apps",
          description:
            "Application layers where sensitive state needs careful handling.",
        },
        {
          title: "Developer Tooling",
          description:
            "SDKs, indexers, monitors, and deployment surfaces for builders.",
        },
        {
          title: "Data Networks",
          description:
            "Verified data flows for applications and machine intelligence systems.",
        },
        {
          title: "Enterprise Nodes",
          description:
            "Operator-grade infrastructure for teams that need controlled access.",
        },
      ],
    },
    developers: {
      eyebrow: "Developers",
      title: "A builder surface for teams shipping infrastructure-backed products.",
      description:
        "This section maps the developer surface: docs, SDKs, examples, and local testing for teams integrating with NOVOVM.",
      codeWindowLabel: "novovm-preview.ts",
      codeSample,
      previewCta: "Developer Preview",
      items: [
        {
          title: "SDK-first access",
          description:
            "A future SDK area for authentication, execution calls, network reads, and deployment flows.",
        },
        {
          title: "Local testing",
          description:
            "A planned sandbox surface for reproducing application execution before connecting to a network.",
        },
        {
          title: "Reference examples",
          description:
            "A place for sample apps, integration patterns, and minimal production templates.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Start Building",
      title: "Build on the execution layer for the next internet.",
      description:
        "Explore NOVOVM architecture, review the network model, and prepare your team for early integrations.",
      primaryCta: "Explore NOVOVM",
      secondaryCta: "Read Whitepaper",
    },
  },
  zh: {
    navItems: [
      { label: "了解 Web3", href: "/learn-web3" },
      { label: "使用", href: "/using" },
      { label: "生态功能服务", href: "/ecosystem" },
      { label: "参与", href: "/participate" },
      { label: "研究", href: "/research" },
    ],
    header: {
      developersCta: "开发者",
    },
    footer: {
      description:
        "面向下一代去中心化应用的高性能执行基础设施。",
    },
    hero: {
      eyebrow: "执行基础设施",
      title: ["NOVOVM", "面向下一代互联网的", "执行层基础设施"],
      subtitle:
        "为 Web3、AI 与去中心化应用提供高性能、隐私保护与可验证的基础设施能力。",
      primaryCta: "探索 NOVOVM",
      secondaryCta: "查看白皮书",
      stats: [
        {
          title: "执行",
          description: "面向高吞吐应用场景的运行时能力。",
        },
        {
          title: "隐私",
          description: "为敏感工作负载提供保密执行路径。",
        },
        {
          title: "验证",
          description: "面向网络验证的证明型基础设施层。",
        },
      ],
    },
    whatIsNovoVM: {
      eyebrow: "什么是 NOVOVM",
      title: "为速度、隐私与可验证性而生的执行基础设施。",
      description:
        "NOVOVM 是面向去中心化工作负载的虚拟机执行层，在统一的运行环境中同时提供性能、隐私与可验证能力。",
      items: [
        {
          title: "高性能执行",
          description:
            "为需要快速结算、稳定吞吐与低摩擦运行的应用提供底层执行环境。",
        },
        {
          title: "隐私保护设计",
          description:
            "为敏感数据流、私有计算与可验证状态提供克制而清晰的隐私层能力。",
        },
        {
          title: "可验证基础设施",
          description:
            "通过证明感知架构帮助参与者验证执行结果，而不把界面做成复杂的证明面板。",
        },
      ],
    },
    coreTechnology: {
      eyebrow: "核心技术",
      title: "为去中心化应用而生的紧凑型执行技术栈。",
      description:
        "NOVOVM 将技术叙事聚焦在运行时、隐私、验证与开发者接入四个层面。",
      items: [
        {
          meta: "运行时",
          title: "并行执行",
          description:
            "为高并发应用场景打造确定性的执行通道，兼顾吞吐与可组合基础设施能力。",
        },
        {
          meta: "隐私",
          title: "保密计算",
          description:
            "通过隐私感知的计算模式，将敏感逻辑与关键数据尽量隔离在公开表层之外。",
        },
        {
          meta: "证明",
          title: "结果可验证",
          description:
            "执行结果可由网络验证，帮助应用建立可信性而不引入额外的信息噪音。",
        },
        {
          meta: "接入",
          title: "开发者接口",
          description:
            "为应用团队、工具开发者与网络集成方提供清晰一致的接入表面。",
        },
      ],
    },
    fourLayerNetwork: {
      eyebrow: "四层网络",
      title: "一个网络，四个清晰而克制的层级。",
      description:
        "将鼠标悬停在每一层上即可查看其作用，不用复杂动画也能读懂整体结构。",
      layers: [
        {
          meta: "第 01 层",
          title: "执行层",
          description:
            "负责处理应用工作负载，确保状态转换具备确定性，并维持稳定的性能边界。",
        },
        {
          meta: "第 02 层",
          title: "隐私层",
          description:
            "通过隐私保护原语，为敏感计算路径与应用数据提供隔离与保护。",
        },
        {
          meta: "第 03 层",
          title: "验证层",
          description:
            "对执行结果进行验证，使应用能够在不暴露内部细节的前提下证明状态变化。",
        },
        {
          meta: "第 04 层",
          title: "网络层",
          description:
            "连接节点运营者、开发者与应用系统，共同构成稳定而可扩展的基础设施网络。",
        },
      ],
    },
    economy: {
      eyebrow: "NOV 经济",
      title: "围绕算力、验证与长期网络协同而构建的效用型经济体系。",
      description:
        "NOV 经济模型围绕资源访问、运营者贡献与生态增长展开，保持结构清晰而不过度堆砌细节。",
      spotlightLabel: "NOV",
      spotlightTitle: "效用",
      spotlightDescription:
        "用于承载 Token 效用、激励与网络贡献的核心框架。下一轮可以继续细化具体 tokenomics。",
      items: [
        {
          meta: "效用",
          title: "算力访问",
          description:
            "NOV 可以作为开启执行、验证与网络资源访问的基础计量单位。",
        },
        {
          meta: "安全",
          title: "运营者协同",
          description:
            "围绕可度量的基础设施贡献，将运营者、验证者与构建者纳入同一激励逻辑中。",
        },
        {
          meta: "增长",
          title: "生态分配",
          description:
            "后续可进一步定义面向应用、工具、资助计划与研究的生态激励机制。",
        },
      ],
    },
    ecosystem: {
      eyebrow: "生态系统",
      title: "为那些希望把基础设施能力隐藏在产品体验之后的应用而构建。",
      description:
        "生态网格保持极简，悬停后显示一行说明，让页面在信息丰富的同时仍然克制。",
      items: [
        {
          title: "AI 应用",
          description:
            "面向私有推理、智能体协作与可验证 AI 工作流的基础设施能力。",
        },
        {
          title: "Web3 应用",
          description:
            "为消费级与金融类去中心化产品提供快速执行能力。",
        },
        {
          title: "DePIN",
          description:
            "支持算力、传感器与基础设施网络中的可验证活动记录。",
        },
        {
          title: "Rollups",
          description:
            "为模块化链与专用结算路径提供执行支持。",
        },
        {
          title: "隐私应用",
          description:
            "适用于需要谨慎处理敏感状态与数据访问的应用层场景。",
        },
        {
          title: "开发者工具",
          description:
            "支持 SDK、索引器、监控系统与部署平台等开发工具链。",
        },
        {
          title: "数据网络",
          description:
            "面向应用系统与机器智能提供可验证的数据流能力。",
        },
        {
          title: "企业节点",
          description:
            "为需要受控访问与运营级稳定性的团队提供节点能力。",
        },
      ],
    },
    developers: {
      eyebrow: "开发者",
      title: "面向基础设施型产品团队的构建者入口。",
      description:
        "这一部分承载文档、SDK、示例与本地测试能力，帮助团队以更低摩擦接入 NOVOVM。",
      codeWindowLabel: "novovm-preview.ts",
      codeSample,
      previewCta: "开发者预览",
      items: [
        {
          title: "SDK 优先接入",
          description:
            "预留给认证、执行调用、网络读取与部署流程的一体化 SDK 能力。",
        },
        {
          title: "本地测试",
          description:
            "为接入网络前的应用执行复现与调试提供计划中的本地沙盒环境。",
        },
        {
          title: "参考示例",
          description:
            "用于承载示例应用、集成模式与最小可用生产模板。",
        },
      ],
    },
    finalCta: {
      eyebrow: "开始构建",
      title: "在面向下一代互联网的执行层上构建应用。",
      description:
        "探索 NOVOVM 的架构、网络模型与开发接口，为团队的早期集成与产品规划做好准备。",
      primaryCta: "探索 NOVOVM",
      secondaryCta: "查看白皮书",
    },
  },
};

export const whatIsNovoVMContent: WhatIsNovoVMContent = {
  hero: {
    title: {
      en: "What is NOVOVM?",
      zh: "什么是 NOVOVM？",
    },
    definition: {
      en: "NOVOVM is a decentralized network where applications can run securely and efficiently.",
      zh: "NOVOVM 是一个让应用可以安全、快速运行的去中心化计算网络。",
    },
    paragraphs: [
      {
        en: "Just like the internet allows websites to run, NOVOVM provides a unified network for decentralized applications.",
        zh: "就像互联网让网站可以运行一样，NOVOVM 为去中心化应用提供一个统一的运行网络。",
      },
      {
        en: "It makes applications faster, protects user data, and ensures results can be verified.",
        zh: "它让应用运行更快，保护用户数据，并确保结果可以被验证。",
      },
    ],
    diagramLabels: {
      input: {
        en: "Applications",
        zh: "应用",
      },
      network: {
        en: "Unified network",
        zh: "统一网络",
      },
      output: {
        en: "Verified results",
        zh: "可验证结果",
      },
    },
  },
  why: {
    title: {
      en: "Why does it matter?",
      zh: "为什么它重要？",
    },
    items: [
      {
        number: "01",
        headline: {
          en: "Today's networks are slow, expensive, and expose user data.",
          zh: "现在很多网络速度慢、成本高，并且容易暴露用户数据。",
        },
        description: {
          en: "Many people give up on decentralized products because the experience still feels heavy.",
          zh: "很多人放弃去中心化产品，不是因为理念，而是因为体验仍然太重。",
        },
      },
      {
        number: "02",
        headline: {
          en: "NOVOVM is designed to fix these limitations.",
          zh: "NOVOVM 的目标就是解决这些限制。",
        },
        description: {
          en: "It brings execution, privacy, and verification into one calmer infrastructure layer.",
          zh: "它把执行、隐私与验证能力收敛到同一个更清晰的基础设施层中。",
        },
      },
      {
        number: "03",
        headline: {
          en: "You get faster apps, stronger privacy, and trustworthy results.",
          zh: "用户可以获得更快的应用、更强的隐私保护，以及可信的计算结果。",
        },
        description: {
          en: "That makes decentralized applications easier to use and easier to trust.",
          zh: "这会让去中心化应用更容易使用，也更容易建立信任。",
        },
      },
    ],
  },
  capabilities: {
    title: {
      en: "What can you do with NOVOVM?",
      zh: "你可以用 NOVOVM 做什么？",
    },
    items: [
      {
        icon: "gauge",
        title: {
          en: "Use faster applications",
          zh: "使用更快的应用",
        },
        description: {
          en: "Run applications without delays or high fees.",
          zh: "减少延迟与高费用，让应用使用更顺畅。",
        },
      },
      {
        icon: "shield",
        title: {
          en: "Protect your data",
          zh: "保护你的数据",
        },
        description: {
          en: "Keep your data private, even during computation.",
          zh: "即使在计算过程中，也能尽量保持数据隐私。",
        },
      },
      {
        icon: "badge-check",
        title: {
          en: "Verify results",
          zh: "验证结果",
        },
        description: {
          en: "Verify results without relying on any central authority.",
          zh: "不依赖任何中心化机构，也能验证结果是否可信。",
        },
      },
      {
        icon: "waypoints",
        title: {
          en: "Power future systems",
          zh: "支撑未来系统",
        },
        description: {
          en: "Power Web3, AI, and next-generation decentralized systems.",
          zh: "支撑 Web3、AI 与下一代去中心化系统。",
        },
      },
    ],
  },
  workflow: {
    title: {
      en: "How does NOVOVM work?",
      zh: "NOVOVM 由哪些部分组成？",
    },
    items: [
      {
        number: "01",
        title: {
          en: "NOV",
          zh: "NOV",
        },
        description: {
          en: "NOV is the native currency used to pay for execution and network services.",
          zh: "NOV 是 NOVOVM 的原生货币，用于支付执行和网络服务。",
        },
        note: {
          en: "It is the value layer for using the network.",
          zh: "它负责承载网络中的价值与使用成本。",
        },
      },
      {
        number: "02",
        title: {
          en: "NOVO Wallet",
          zh: "NOVO 钱包",
        },
        description: {
          en: "Wallets allow users to store assets, interact with applications, and access the network.",
          zh: "NOVO 钱包是用户进入网络、管理资产和使用应用的入口。",
        },
        note: {
          en: "It is the simplest entry point for people using NOVOVM.",
          zh: "它是用户进入 NOVOVM 的第一入口。",
        },
      },
      {
        number: "03",
        title: {
          en: "Execution Engine",
          zh: "执行引擎",
        },
        description: {
          en: "The execution engine runs applications and processes transactions.",
          zh: "执行引擎负责运行应用、处理交易和完成计算。",
        },
        note: {
          en: "It is where the actual work gets done.",
          zh: "这里负责完成真正的执行与计算工作。",
        },
      },
      {
        number: "04",
        title: {
          en: "Network",
          zh: "网络",
        },
        description: {
          en: "The network connects nodes and keeps communication secure and reliable.",
          zh: "网络连接节点，并保证通信安全、稳定、可靠。",
        },
        note: {
          en: "It keeps the whole system connected and dependable.",
          zh: "它让整个系统保持连接、稳定且可靠。",
        },
      },
    ],
  },
  audience: {
    title: {
      en: "Who is it for?",
      zh: "谁适合使用 NOVOVM？",
    },
    items: [
      {
        title: {
          en: "Users",
          zh: "普通用户",
        },
        description: {
          en: "Use applications faster and more securely.",
          zh: "更快、更安全地使用应用。",
        },
        cta: {
          en: "Explore apps",
          zh: "了解应用",
        },
        href: "#ecosystem",
      },
      {
        title: {
          en: "Developers",
          zh: "开发者",
        },
        description: {
          en: "Build high-performance decentralized applications.",
          zh: "构建高性能去中心化应用。",
        },
        cta: {
          en: "Read docs",
          zh: "阅读文档",
        },
        href: "#developers",
      },
      {
        title: {
          en: "Enterprises",
          zh: "企业",
        },
        description: {
          en: "Run scalable and privacy-preserving systems.",
          zh: "运行可扩展、保护隐私的系统。",
        },
        cta: {
          en: "Contact us",
          zh: "联系我们",
        },
        href: "#final-cta",
      },
    ],
  },
  getStarted: {
    title: {
      en: "Get started with NOVOVM",
      zh: "开始了解 NOVOVM",
    },
    description: {
      en: "Explore the network, read the whitepaper, or start building with NOVOVM.",
      zh: "你可以继续了解网络、阅读白皮书，或开始基于 NOVOVM 构建应用。",
    },
    buttons: [
      {
        href: "#hero",
        label: {
          en: "Explore NOVOVM",
          zh: "探索 NOVOVM",
        },
        variant: "primary",
      },
      {
        href: "#final-cta",
        label: {
          en: "Read Whitepaper",
          zh: "阅读白皮书",
        },
        variant: "secondary",
      },
      {
        href: "#developers",
        label: {
          en: "Developers",
          zh: "开发者",
        },
        variant: "text",
      },
    ],
  },
};

export const whatIsNovContent: WhatIsNovContent = {
  hero: {
    title: {
      en: "What is NOV",
      zh: "什么是 NOV",
    },
    description: {
      en: "NOV is the native currency used inside NOVOVM.",
      zh: "NOV 是 NOVOVM 网络中使用的原生货币。",
    },
    supporting: [
      {
        en: "It helps people pay for network use, access applications, and move through services built on NOVOVM.",
        zh: "它帮助用户支付网络使用成本、进入应用，并在 NOVOVM 的服务之间完成操作。",
      },
      {
        en: "You do not need to understand blockchain jargon to understand NOV. If you can use an app or a wallet, you can understand what NOV does.",
        zh: "你不需要懂区块链术语也能理解 NOV。只要你会用应用或钱包，就能明白 NOV 的作用。",
      },
    ],
    points: [
      {
        en: "Pay for use",
        zh: "支付使用成本",
      },
      {
        en: "Access applications",
        zh: "进入网络应用",
      },
      {
        en: "Move through the network",
        zh: "在网络中流转",
      },
    ],
  },
  why: {
    title: {
      en: "Why does NOV exist",
      zh: "为什么会有 NOV",
    },
    items: [
      {
        number: "01",
        headline: {
          en: "A network needs one simple way to handle use.",
          zh: "一个网络需要一种简单统一的使用方式。",
        },
        description: {
          en: "Without a shared currency, every product feels different and harder to learn.",
          zh: "如果没有统一的使用货币，每个产品都会变得更难理解、更难上手。",
        },
      },
      {
        number: "02",
        headline: {
          en: "People and applications need a common unit.",
          zh: "用户和应用都需要一个共同的计量单位。",
        },
        description: {
          en: "NOV gives NOVOVM one clear way to handle payments for actions and services.",
          zh: "NOV 为 NOVOVM 提供一种清晰的方式来处理操作和服务的支付。",
        },
      },
      {
        number: "03",
        headline: {
          en: "NOV makes the experience easier to follow.",
          zh: "NOV 让整个使用体验更容易理解。",
        },
        description: {
          en: "One network and one currency create fewer steps for people getting started.",
          zh: "一个网络配合一种货币，可以让初次接触的人少走很多弯路。",
        },
      },
    ],
  },
  capabilities: {
    title: {
      en: "What can you do with NOV",
      zh: "你可以用 NOV 做什么",
    },
    items: [
      {
        icon: "coins",
        title: {
          en: "Pay for network use",
          zh: "支付网络使用成本",
        },
        description: {
          en: "Use NOV when an application or service on NOVOVM needs payment.",
          zh: "当 NOVOVM 上的应用或服务需要支付时，可以使用 NOV。",
        },
      },
      {
        icon: "wallet",
        title: {
          en: "Use it in a wallet",
          zh: "在钱包中使用",
        },
        description: {
          en: "Store NOV in supported wallets and use it when you interact with the network.",
          zh: "把 NOV 放在支持的钱包里，并在你使用网络时进行管理和调用。",
        },
      },
      {
        icon: "blocks",
        title: {
          en: "Use applications more easily",
          zh: "更顺畅地使用应用",
        },
        description: {
          en: "NOV can act as the simple payment layer behind actions you take in apps.",
          zh: "NOV 可以作为应用操作背后的简单支付层，让流程更顺畅。",
        },
      },
      {
        icon: "network",
        title: {
          en: "Move across services",
          zh: "在服务之间流转",
        },
        description: {
          en: "It helps people move through one connected network instead of separate payment systems.",
          zh: "它让用户在一个连贯的网络中流转，而不是在多个分散的支付系统间切换。",
        },
      },
    ],
  },
  fit: {
    title: {
      en: "How NOV fits into NOVOVM",
      zh: "NOV 在 NOVOVM 里扮演什么角色",
    },
    items: [
      {
        eyebrow: {
          en: "Wallet",
          zh: "钱包",
        },
        title: {
          en: "People hold NOV",
          zh: "用户持有 NOV",
        },
        description: {
          en: "Users start with a wallet, where NOV is stored and used.",
          zh: "用户从钱包开始，在这里持有和使用 NOV。",
        },
      },
      {
        eyebrow: {
          en: "Application",
          zh: "应用",
        },
        title: {
          en: "Applications use NOV",
          zh: "应用会使用 NOV",
        },
        description: {
          en: "Apps can use NOV when people take actions or access paid services.",
          zh: "当用户执行操作或访问付费服务时，应用可以使用 NOV。",
        },
      },
      {
        eyebrow: {
          en: "Network",
          zh: "网络",
        },
        title: {
          en: "NOV connects to the network layer",
          zh: "NOV 连接到网络层",
        },
        description: {
          en: "That is how NOV becomes part of the broader NOVOVM experience.",
          zh: "也正因为如此，NOV 才会成为整个 NOVOVM 体验中的一部分。",
        },
      },
    ],
  },
  audience: {
    title: {
      en: "Who uses NOV",
      zh: "谁会使用 NOV",
    },
    items: [
      {
        title: {
          en: "Users",
          zh: "普通用户",
        },
        description: {
          en: "People who want to use applications and pay for actions in a simple way.",
          zh: "希望以更简单方式使用应用并完成支付的普通用户。",
        },
      },
      {
        title: {
          en: "Developers",
          zh: "开发者",
        },
        description: {
          en: "Builders who need one clear currency inside their product flows.",
          zh: "希望在产品流程中使用统一货币的开发者。",
        },
      },
      {
        title: {
          en: "Teams",
          zh: "团队与企业",
        },
        description: {
          en: "Teams that want a cleaner way to connect users, applications, and network services.",
          zh: "希望以更清晰方式连接用户、应用和网络服务的团队与企业。",
        },
      },
    ],
  },
  getNov: {
    title: {
      en: "Get NOV",
      zh: "获取 NOV",
    },
    description: {
      en: "Start with NOVOVM, supported wallets, and participating applications when NOV becomes available to you.",
      zh: "当 NOV 通过支持的钱包和应用向你开放时，你可以从 NOVOVM 生态中的这些入口开始。",
    },
    actions: [
      {
        href: "/",
        label: {
          en: "Explore NOVOVM",
          zh: "探索 NOVOVM",
        },
        variant: "primary",
      },
      {
        href: "/#what-is-novovm",
        label: {
          en: "What is NOVOVM",
          zh: "什么是 NOVOVM",
        },
        variant: "secondary",
      },
      {
        href: "/#final-cta",
        label: {
          en: "Contact us",
          zh: "联系我们",
        },
        variant: "text",
      },
    ],
  },
};

export function getSiteContent(language: Language) {
  return siteContent[language];
}
