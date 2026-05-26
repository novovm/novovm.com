"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DetailPageHeader } from "@/components/site/DetailPageHeader";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { usePreferredLanguage } from "@/lib/usePreferredLanguage";
import { type Language } from "@/lib/site-content";

type Bilingual = {
  en: string;
  zh: string;
};

type ServiceArea = {
  description: Bilingual;
  items: Bilingual[];
  status: Bilingual;
  title: Bilingual;
};

type FlowStep = {
  description: Bilingual;
  title: Bilingual;
};

type EditorialPoint = {
  description: Bilingual;
  number: string;
  title: Bilingual;
};

const serviceAreas: ServiceArea[] = [
  {
    title: { en: "Finance", zh: "金融" },
    description: {
      en: "Access financial applications built on open network infrastructure.",
      zh: "访问建立在开放网络基础设施上的金融应用。",
    },
    items: [
      { en: "Manage digital assets", zh: "管理数字资产" },
      { en: "Use payment-related services", zh: "使用支付相关服务" },
      { en: "Access asset-based applications", zh: "进入基于资产的应用" },
      { en: "Interact with verifiable financial services", zh: "与可验证金融服务交互" },
    ],
    status: { en: "Ecosystem Direction", zh: "生态方向" },
  },
  {
    title: { en: "Games", zh: "游戏" },
    description: {
      en: "Play games where identity, assets, and in-game economies can connect to Web3.",
      zh: "体验让身份、资产和游戏内经济系统连接到 Web3 的游戏。",
    },
    items: [
      { en: "Sign in with wallet identity", zh: "使用钱包身份登录" },
      { en: "Use digital game assets", zh: "使用数字游戏资产" },
      { en: "Connect game progress with account identity", zh: "把游戏进度与账户身份连接" },
      { en: "Access ecosystem game services", zh: "进入生态游戏服务" },
    ],
    status: { en: "Ecosystem Direction", zh: "生态方向" },
  },
  {
    title: { en: "Social", zh: "社交" },
    description: {
      en: "Communicate and build communities with user-controlled identity.",
      zh: "以用户可控身份进行沟通并建设社群。",
    },
    items: [
      { en: "Connect through wallet-based identity", zh: "通过钱包身份建立连接" },
      { en: "Join communities", zh: "加入社群" },
      { en: "Manage profiles and permissions", zh: "管理资料和权限" },
      { en: "Use Web3-based messaging or social applications", zh: "使用基于 Web3 的消息或社交应用" },
    ],
    status: { en: "Ecosystem Direction", zh: "生态方向" },
  },
  {
    title: { en: "Commerce", zh: "电商" },
    description: {
      en: "Use digital commerce services connected to wallets, payments, and Web3 identity.",
      zh: "使用连接钱包、支付和 Web3 身份的数字商业服务。",
    },
    items: [
      { en: "Buy or sell digital goods and services", zh: "购买或出售数字商品与服务" },
      { en: "Use wallet-based checkout", zh: "使用基于钱包的结算方式" },
      { en: "Connect identity and payments", zh: "连接身份与支付" },
      { en: "Access ecosystem business tools", zh: "进入生态商业工具" },
    ],
    status: { en: "Ecosystem Direction", zh: "生态方向" },
  },
];

const accessSteps: FlowStep[] = [
  {
    title: { en: "Create NOVO Wallet", zh: "创建 NOVO Wallet" },
    description: {
      en: "Start with the wallet as your entry point.",
      zh: "从钱包开始，作为你的统一入口。",
    },
  },
  {
    title: { en: "Connect NOVO Account", zh: "连接 NOVO 账户" },
    description: {
      en: "Use your account identity across ecosystem services.",
      zh: "在生态服务中使用统一账户身份。",
    },
  },
  {
    title: { en: "Choose a Service", zh: "选择服务" },
    description: {
      en: "Select finance, games, social, commerce, or other Web3 services.",
      zh: "选择金融、游戏、社交、电商或其他 Web3 服务。",
    },
  },
  {
    title: { en: "Use Application", zh: "使用应用" },
    description: {
      en: "Open or download the related DAPP and interact through the network.",
      zh: "打开或下载相关 DAPP，并通过网络进行交互。",
    },
  },
];

const whyPoints: EditorialPoint[] = [
  {
    number: "01",
    title: { en: "One wallet-based entry point", zh: "一个基于钱包的统一入口" },
    description: {
      en: "Users can enter multiple service categories through one account and wallet flow.",
      zh: "用户可以通过同一个账户和钱包流程进入多个服务类别。",
    },
  },
  {
    number: "02",
    title: { en: "Clear service categories", zh: "清晰的服务分类" },
    description: {
      en: "Finance, games, social, and commerce become easier to understand as practical Web3 directions.",
      zh: "金融、游戏、社交和电商作为实际 Web3 方向，会更容易被理解。",
    },
  },
  {
    number: "03",
    title: { en: "A practical path from account to application", zh: "从账户到应用的实际路径" },
    description: {
      en: "NOVOVM makes it easier to move from identity and access into real service use.",
      zh: "NOVOVM 让用户更容易从身份和访问走向真实服务使用。",
    },
  },
];

function copy(text: Bilingual, language: Language) {
  return language === "zh" ? text.zh : text.en;
}

export function DecentralizedServicesPage({ initialLanguage }: { initialLanguage: Language }) {
  const { handleLanguageChange, language } = usePreferredLanguage(initialLanguage);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <DetailPageHeader language={language} onLanguageChange={handleLanguageChange} />
      <main className="bg-background pt-[72px]">
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="section-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(90,181,70,0.06),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(241,188,26,0.03),transparent_18%)]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.82fr)]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-green-bright">
                ECOSYSTEM SERVICES
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.04] text-text sm:text-5xl lg:text-[5rem]">
                {copy({ en: "Decentralized Services", zh: "去中心化服务" }, language)}
              </h1>
              <p className="mt-6 text-lg text-[rgba(90,181,70,0.9)] sm:text-xl">
                {copy(
                  {
                    en: "Finance, games, social, and commerce built for an open Web3 ecosystem.",
                    zh: "面向开放 Web3 生态的金融、游戏、社交与电商服务。",
                  },
                  language,
                )}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                {copy(
                  {
                    en: "Decentralized Services bring everyday digital experiences into the NOVOVM ecosystem — from financial applications and games to social interaction and digital commerce. Users can access these services through NOVO Wallet and interact with applications using their NOVO account.",
                    zh: "去中心化服务把日常数字体验带入 NOVOVM 生态，从金融应用和游戏到社交互动与数字商业。用户可以通过 NOVO Wallet 访问这些服务，并使用 NOVO 账户与应用交互。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Services", zh: "探索服务" }, language)}
                </Button>
                <Button href="/ecosystem" variant="secondary">
                  {copy({ en: "Back to Ecosystem", zh: "返回生态功能服务" }, language)}
                </Button>
              </div>
              <p className="mt-4 text-sm text-[rgba(245,242,232,0.58)]" id="coming-soon">
                {copy({ en: "Coming Soon", zh: "Coming Soon" }, language)}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8 shadow-[0_24px_52px_rgba(0,0,0,0.24)]">
                <div className="relative min-h-[320px]">
                  <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(90,181,70,0.32)] bg-[rgba(13,18,13,0.72)] text-center text-text">
                    NOVO
                    <br />
                    Wallet
                  </div>
                  {[
                    { label: copy({ en: "Finance", zh: "金融" }, language), left: "12%", top: "18%" },
                    { label: copy({ en: "Games", zh: "游戏" }, language), left: "72%", top: "20%" },
                    { label: copy({ en: "Social", zh: "社交" }, language), left: "16%", top: "68%" },
                    { label: copy({ en: "Commerce", zh: "电商" }, language), left: "68%", top: "68%" },
                  ].map((node) => (
                    <div
                      className="absolute rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-4 py-3 text-sm text-text"
                      key={node.label}
                      style={{ left: node.left, top: node.top }}
                    >
                      {node.label}
                    </div>
                  ))}
                  <div className="absolute left-[31%] top-[33%] h-px w-[16%] -rotate-[24deg] bg-[rgba(90,181,70,0.18)]" />
                  <div className="absolute left-[53%] top-[33%] h-px w-[16%] rotate-[24deg] bg-[rgba(90,181,70,0.18)]" />
                  <div className="absolute left-[31%] top-[64%] h-px w-[16%] rotate-[24deg] bg-[rgba(90,181,70,0.18)]" />
                  <div className="absolute left-[53%] top-[64%] h-px w-[16%] -rotate-[24deg] bg-[rgba(90,181,70,0.18)]" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "What are Decentralized Services?", zh: "什么是去中心化服务？" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Decentralized Services are applications and tools that run on open network infrastructure instead of depending entirely on centralized platforms. In NOVOVM, these services are connected through wallet identity, digital assets, permissions, and network access.",
                      zh: "去中心化服务是运行在开放网络基础设施上的应用和工具，而不是完全依赖中心化平台。在 NOVOVM 中，这些服务通过钱包身份、数字资产、权限和网络访问连接起来。",
                    },
                    language,
                  )}
                </p>
                <p className="mt-6 text-base leading-7 text-[rgba(245,242,232,0.76)] sm:text-lg">
                  {copy(
                    {
                      en: "They make Web3 useful for real activities: managing value, playing games, communicating, and doing business.",
                      zh: "它们让 Web3 可以真正用于现实活动，例如管理价值、玩游戏、交流和开展业务。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-14 rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-8">
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  {[
                    copy({ en: "User", zh: "用户" }, language),
                    "NOVO Wallet",
                    copy({ en: "Decentralized Services", zh: "去中心化服务" }, language),
                    "NOVOVM Network",
                  ].map((label, index, list) => (
                    <div className="flex w-full flex-col items-center" key={label}>
                      <div className="w-full max-w-[320px] rounded-[10px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-4 text-text">
                        {label}
                      </div>
                      {index < list.length - 1 ? (
                        <div className="my-3 h-10 w-px bg-[rgba(90,181,70,0.24)]" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Four service areas", zh: "四个服务方向" }, language)}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {serviceAreas.map((area, index) => (
                <Reveal delay={index * 0.05} key={area.title.en}>
                  <motion.div
                    className="group rounded-[16px] border border-[rgba(90,181,70,0.14)] bg-[rgba(8,4,4,0.76)] p-6 transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.42)]"
                    id={area.title.en.toLowerCase()}
                    transition={reduceMotion ? undefined : { duration: 0.28 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold leading-tight text-text">
                          {copy(area.title, language)}
                        </h3>
                        <p className="mt-4 text-base leading-7 text-[rgba(245,242,232,0.76)]">
                          {copy(area.description, language)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.8} />
                    </div>
                    <div className="mt-6 space-y-2 text-sm leading-6 text-[rgba(245,242,232,0.78)] sm:text-base">
                      {area.items.map((item) => (
                        <p key={item.en}>- {copy(item, language)}</p>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex rounded-[999px] border border-[rgba(90,181,70,0.16)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[rgba(90,181,70,0.58)] transition-colors duration-300 group-hover:text-green-bright">
                      {copy(area.status, language)}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "How users access decentralized services", zh: "用户如何访问去中心化服务" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "NOVOVM is designed to make Web3 services easier to access through one account and wallet-based entry point.",
                      zh: "NOVOVM 旨在通过同一个账户和基于钱包的入口，让 Web3 服务更容易被访问。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-4 lg:grid-cols-4">
              {accessSteps.map((step, index) => (
                <motion.button
                  className="relative rounded-[12px] border border-[rgba(90,181,70,0.14)] bg-[rgba(10,6,6,0.88)] px-5 py-6 text-left transition-[border-color,background-color] duration-300 hover:border-[rgba(90,181,70,0.42)] hover:bg-[rgba(13,18,13,0.42)]"
                  key={step.title.en}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <h3 className="text-xl text-text">{copy(step.title, language)}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{copy(step.description, language)}</p>
                  {index < accessSteps.length - 1 ? (
                    <span className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[rgba(90,181,70,0.28)] lg:block" />
                  ) : null}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                  {copy({ en: "Why decentralized services matter", zh: "为什么去中心化服务重要" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Web3 should not feel fragmented. Users should not need to move between disconnected tools just to access basic digital services. NOVOVM organizes services into a clearer ecosystem so users can discover, access, and use Web3 applications more naturally.",
                      zh: "Web3 不应该显得碎片化。用户不应该为了访问基本数字服务就在许多割裂工具之间来回切换。NOVOVM 把服务组织成更清晰的生态结构，让用户更自然地发现、进入并使用 Web3 应用。",
                    },
                    language,
                  )}
                </p>
              </div>
            </Reveal>

            <div className="mt-16">
              {whyPoints.map((point, index) => (
                <Reveal delay={index * 0.07} key={point.number}>
                  <div className="grid gap-5 border-b border-[rgba(90,181,70,0.12)] py-8 transition-colors duration-300 hover:border-[rgba(90,181,70,0.26)] lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-10">
                    <p className="pt-1 text-xs font-medium tracking-[0.32em] text-[rgba(90,181,70,0.44)] transition-colors duration-300 hover:text-green-bright">
                      {point.number}
                    </p>
                    <div>
                      <p className="text-2xl leading-tight text-text sm:text-[2rem]">
                        {copy(point.title, language)}
                      </p>
                      <p className="mt-4 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.76)]">
                        {copy(point.description, language)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[rgba(8,4,4,0.76)] p-8">
                <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl">
                  {copy({ en: "Security and responsibility", zh: "安全与责任" }, language)}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">
                  {copy(
                    {
                      en: "Decentralized services give users more control, but users should still understand what they are connecting to and approving.",
                      zh: "去中心化服务会给用户更多控制权，但用户仍然需要理解自己正在连接什么、批准什么。",
                    },
                    language,
                  )}
                </p>
                <div className="mt-8 space-y-3 text-base leading-7 text-[rgba(245,242,232,0.78)]">
                  <p>{copy({ en: "Verify applications before connecting your wallet.", zh: "连接钱包前先核验应用。" }, language)}</p>
                  <p>{copy({ en: "Review permissions before approving actions.", zh: "批准操作前先检查权限。" }, language)}</p>
                  <p>{copy({ en: "Never share your recovery phrase.", zh: "绝不要分享恢复助记词。" }, language)}</p>
                  <p>{copy({ en: "Some services may be experimental or coming soon.", zh: "部分服务可能仍处于实验阶段或即将推出。" }, language)}</p>
                  <p>{copy({ en: "NOVOVM does not promise profits, rewards, or financial outcomes.", zh: "NOVOVM 不承诺任何收益、奖励或金融结果。" }, language)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(90,181,70,0.12)] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[16px] border border-[rgba(90,181,70,0.18)] bg-[linear-gradient(180deg,rgba(13,18,13,0.94),rgba(8,4,4,0.96))] p-8 text-center shadow-[0_26px_60px_rgba(0,0,0,0.28)] sm:p-12">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight text-text sm:text-4xl lg:text-5xl">
                {copy({ en: "Explore Web3 services through NOVOVM.", zh: "通过 NOVOVM 探索 Web3 服务。" }, language)}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[rgba(245,242,232,0.78)] sm:text-lg">
                {copy(
                  {
                    en: "Finance, games, social, and commerce become easier to discover when they are connected through one ecosystem.",
                    zh: "当金融、游戏、社交和电商通过同一个生态连接起来时，它们会更容易被发现和使用。",
                  },
                  language,
                )}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button href="#coming-soon">
                  {copy({ en: "Explore Services", zh: "探索服务" }, language)}
                </Button>
                <Button href="/wallet/create" variant="secondary">
                  {copy({ en: "Download NOVO Wallet", zh: "下载 NOVO Wallet" }, language)}
                </Button>
                <Link
                  className="group inline-flex items-center gap-2 px-0 py-3 text-sm font-medium text-muted transition-colors duration-300 hover:text-text"
                  href="/ecosystem"
                >
                  <span>{copy({ en: "Back to Ecosystem Services", zh: "返回生态功能服务" }, language)}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer language={language} />
    </>
  );
}
