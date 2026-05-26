"use client";

import { InteractiveGrid, type InteractiveGridItem } from "@/components/ui/InteractiveGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

type HomeSection = {
  columns: "two" | "three" | "four";
  description: Bilingual;
  eyebrow: Bilingual;
  id: string;
  items: Array<{
    description: Bilingual;
    meta?: Bilingual;
    title: Bilingual;
  }>;
  title: Bilingual;
};

const homeSections: HomeSection[] = [
  {
    id: "understand-web3",
    eyebrow: { en: "Understand", zh: "了解" },
    title: { en: "Understand Web3", zh: "了解 Web3" },
    description: {
      en: "A lighter introduction to the ideas people meet before they enter the NOVOVM ecosystem.",
      zh: "先用更轻的方式解释用户进入 NOVOVM 生态前会遇到的几个 Web3 基本概念。",
    },
    columns: "three",
    items: [
      {
        meta: { en: "Concept 01", zh: "概念 01" },
        title: { en: "Wallets", zh: "钱包" },
        description: {
          en: "Explain what a wallet is, what it stores, and why it is the first step for users.",
          zh: "解释什么是钱包、钱包保存什么，以及为什么它通常是用户的第一入口。",
        },
      },
      {
        meta: { en: "Concept 02", zh: "概念 02" },
        title: { en: "Assets", zh: "资产" },
        description: {
          en: "Frame tokens and digital assets as tools for access, transfer, and participation.",
          zh: "把代币与数字资产讲清楚，作为访问、流转与参与网络服务的工具来理解。",
        },
      },
      {
        meta: { en: "Concept 03", zh: "概念 03" },
        title: { en: "On-chain actions", zh: "链上操作" },
        description: {
          en: "Introduce transactions, signatures, and simple network interactions without jargon overload.",
          zh: "介绍交易、签名和基础网络交互，但不过度堆叠术语。",
        },
      },
    ],
  },
  {
    id: "usage",
    eyebrow: { en: "Use", zh: "使用" },
    title: { en: "Use", zh: "使用" },
    description: {
      en: "Describe the basic path from first contact to active use of NOVOVM products and services.",
      zh: "描述用户从第一次接触到真正开始使用 NOVOVM 产品与服务的基本路径。",
    },
    columns: "three",
    items: [
      {
        meta: { en: "Step 01", zh: "步骤 01" },
        title: { en: "Get ready", zh: "准备进入" },
        description: {
          en: "Prepare a wallet, understand identity, and set up the minimum tools needed to start.",
          zh: "准备钱包、理解身份关系，并完成开始使用前的最低配置。",
        },
      },
      {
        meta: { en: "Step 02", zh: "步骤 02" },
        title: { en: "Start using services", zh: "开始使用服务" },
        description: {
          en: "Move from setup into products, accounts, assets, and service entry points.",
          zh: "从准备阶段进入产品、账户、资产和各类服务入口。",
        },
      },
      {
        meta: { en: "Step 03", zh: "步骤 03" },
        title: { en: "Build habits", zh: "建立使用习惯" },
        description: {
          en: "Turn one-time access into repeated use through clearer actions and lower friction.",
          zh: "通过更清晰的操作路径和更低摩擦，把一次性访问变成持续使用。",
        },
      },
    ],
  },
  {
    id: "ecosystem-services",
    eyebrow: { en: "Services", zh: "服务" },
    title: { en: "Ecosystem Features and Services", zh: "生态功能服务" },
    description: {
      en: "Group the ecosystem around practical capabilities people can actually use, not abstract categories.",
      zh: "把生态按用户真的会使用的功能来组织，而不是继续沿用抽象分类。",
    },
    columns: "four",
    items: [
      {
        title: { en: "Wallet services", zh: "钱包服务" },
        description: {
          en: "Asset management, account tools, access control, and daily wallet actions.",
          zh: "资产管理、账户工具、访问控制，以及日常钱包操作能力。",
        },
      },
      {
        title: { en: "Application entry", zh: "应用入口" },
        description: {
          en: "The routes that connect users from the site into real products and experiences.",
          zh: "把用户从官网连接到真实产品与体验的各种入口。",
        },
      },
      {
        title: { en: "Network services", zh: "网络服务" },
        description: {
          en: "Execution, verification, account services, and broader system support surfaces.",
          zh: "执行、验证、账户服务，以及更广义的系统支撑能力。",
        },
      },
      {
        title: { en: "Support tools", zh: "支持工具" },
        description: {
          en: "Guides, onboarding, help flows, dashboards, and other support-facing utilities.",
          zh: "指南、上手引导、帮助流程、面板以及其他配套工具。",
        },
      },
    ],
  },
  {
    id: "participate",
    eyebrow: { en: "Participate", zh: "参与" },
    title: { en: "Participate", zh: "参与" },
    description: {
      en: "Show how different people can join the network, ecosystem, and community in concrete ways.",
      zh: "说明不同角色可以如何真正进入网络、生态和社区，而不是只停留在口号层面。",
    },
    columns: "three",
    items: [
      {
        meta: { en: "For users", zh: "面向用户" },
        title: { en: "Join products", zh: "加入产品使用" },
        description: {
          en: "Start from wallets and applications, then move toward more active ecosystem use.",
          zh: "从钱包和应用开始，再逐步进入更活跃的生态使用阶段。",
        },
      },
      {
        meta: { en: "For builders", zh: "面向建设者" },
        title: { en: "Build and integrate", zh: "构建与接入" },
        description: {
          en: "Developers, partners, and service teams can enter through integration and collaboration paths.",
          zh: "开发者、合作方与服务团队可以通过接入和协作路径加入进来。",
        },
      },
      {
        meta: { en: "For community", zh: "面向社区" },
        title: { en: "Contribute and co-create", zh: "贡献与共建" },
        description: {
          en: "Community members can contribute through feedback, education, testing, and growth support.",
          zh: "社区成员可以通过反馈、教育、测试和增长支持等方式参与共建。",
        },
      },
    ],
  },
  {
    id: "research",
    eyebrow: { en: "Research", zh: "研究" },
    title: { en: "Research", zh: "研究" },
    description: {
      en: "Reserve a clearer place for whitepapers, technical writing, experiments, and future thinking.",
      zh: "为白皮书、技术文章、实验内容和未来研究方向留出更清晰的位置。",
    },
    columns: "two",
    items: [
      {
        meta: { en: "Reading", zh: "阅读" },
        title: { en: "Whitepaper and documents", zh: "白皮书与说明文档" },
        description: {
          en: "This area can later hold the whitepaper, protocol notes, architectural writing, and study guides.",
          zh: "这里后续可以承载白皮书、协议说明、架构文档和阅读指南。",
        },
      },
      {
        meta: { en: "Lab", zh: "实验" },
        title: { en: "Experiments and future topics", zh: "实验与未来议题" },
        description: {
          en: "A place for speculative ideas, prototypes, test releases, and long-term research directions.",
          zh: "用于存放前瞻性想法、原型、测试发布以及长期研究方向。",
        },
      },
    ],
  },
];

function pick(copy: Bilingual, language: Language) {
  return language === "zh" ? copy.zh : copy.en;
}

export function HomeContentSections({ language }: { language: Language }) {
  return (
    <>
      {homeSections.map((section, index) => {
        const items: InteractiveGridItem[] = section.items.map((item) => ({
          description: pick(item.description, language),
          meta: item.meta ? pick(item.meta, language) : undefined,
          title: pick(item.title, language),
        }));

        return (
          <Section
            className={
              index % 2 === 0
                ? "bg-[radial-gradient(circle_at_top_right,rgba(90,181,70,0.08),transparent_34%),var(--background)]"
                : "bg-[radial-gradient(circle_at_bottom_left,rgba(241,188,26,0.06),transparent_30%),var(--background)]"
            }
            description={pick(section.description, language)}
            eyebrow={pick(section.eyebrow, language)}
            id={section.id}
            key={section.id}
            title={pick(section.title, language)}
          >
            <Reveal className="mt-14" delay={0.08}>
              <InteractiveGrid columns={section.columns} items={items} revealOnHover />
            </Reveal>
          </Section>
        );
      })}
    </>
  );
}
