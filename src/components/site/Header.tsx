"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import {
  getSiteContent,
  languageLabels,
  type Language,
} from "@/lib/site-content";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  sectionHrefPrefix?: "" | "/";
};

type DropdownItem = {
  description?: string;
  href: string;
  label: string;
};

type NestedDropdownItem = {
  description?: string;
  href: string;
  label: string;
  children: DropdownItem[];
};

function getLearnWeb3Items(language: Language) {
  if (language === "zh") {
    return [
      {
        href: "/learn-web3#novo-mainnet",
        label: "主网",
        description: "了解 NOVO 主网的基础网络定位。",
        children: [
          {
            href: "/learn-web3#novo-mainnet",
            label: "NOVO 主网介绍",
            description: "查看基础网络、用户、开发者和服务关系。",
          },
        ],
      },
      {
        href: "/learn-web3#ecosystem-and-solutions",
        label: "生态",
        description: "查看生态功能、服务与解决方案结构。",
        children: [
          {
            href: "/learn-web3#ecosystem-and-solutions",
            label: "生态和解决方案",
            description: "了解钱包、支付、应用、开发工具和基础设施。",
          },
        ],
      },
      {
        href: "/learn-web3#recommended-ecosystem",
        label: "推荐",
        description: "从最核心的入口开始理解生态。",
        children: [
          {
            href: "/learn-web3#recommended-ecosystem",
            label: "推荐生态",
            description: "查看钱包、主网、应用与开发接口入口。",
          },
        ],
      },
      {
        href: "/learn-web3#qa",
        label: "问答",
        description: "快速理解常见问题和开始路径。",
        children: [
          {
            href: "/learn-web3#qa",
            label: "Q&A",
            description: "集中查看 Web3、NOVO 和主网相关问答。",
          },
        ],
      },
    ];
  }

  return [
    {
      href: "/learn-web3#novo-mainnet",
      label: "Mainnet",
      description: "Understand the NOVO base network.",
      children: [
        {
          href: "/learn-web3#novo-mainnet",
          label: "NOVO Mainnet",
          description: "See how the base network connects users, apps, and services.",
        },
      ],
    },
    {
      href: "/learn-web3#ecosystem-and-solutions",
      label: "Ecosystem",
      description: "See ecosystem capabilities and service structure.",
      children: [
        {
          href: "/learn-web3#ecosystem-and-solutions",
          label: "Ecosystem and solutions",
          description: "Explore wallets, payments, apps, tools, and infrastructure.",
        },
      ],
    },
    {
      href: "/learn-web3#recommended-ecosystem",
      label: "Recommended",
      description: "Start with the essential ecosystem entry points.",
      children: [
        {
          href: "/learn-web3#recommended-ecosystem",
          label: "Recommended ecosystem",
          description: "See wallet, mainnet, app, and developer entry points.",
        },
      ],
    },
    {
      href: "/learn-web3#qa",
      label: "Q&A",
      description: "Quick answers for common questions.",
      children: [
        {
          href: "/learn-web3#qa",
          label: "Q&A",
          description: "Read answers about Web3, NOVO, and the mainnet.",
        },
      ],
    },
  ];
}

function getUsingItems(language: Language) {
  if (language === "zh") {
    return [
      {
        href: "/using#first-time",
        label: "第一次使用",
        description: "获取 Web3 / NOVO 统一账户，进入生态的第一步。",
        children: [
          {
            href: "/wallet/create",
            label: "创建钱包",
            description: "管理资产并进入应用。",
          },
          {
            href: "/wallet/account",
            label: "创建 NOVO 账户",
            description: "建立统一身份入口。",
          },
          {
            href: "/using#first-time",
            label: "连接网络",
            description: "访问应用、资产和服务。",
          },
        ],
      },
      {
        href: "/using#personal-users",
        label: "个人用户",
        description: "遨游 Web3，访问服务、应用和数字资产能力。",
        children: [
          {
            href: "/ecosystem",
            label: "探索生态",
            description: "查看应用、资产与网络服务入口。",
          },
          {
            href: "/using#personal-users",
            label: "享受服务",
            description: "使用身份、AI、存储等网络型服务。",
          },
        ],
      },
      {
        href: "/using#participate-network",
        label: "参与节点建设",
        description: "加入 Web3 节点网络，贡献算力与存储资源。",
        children: [
          {
            href: "/network",
            label: "加入 Web3 节点",
            description: "了解节点运行与网络连接方式。",
          },
          {
            href: "/using#participate-network",
            label: "贡献算力与存储",
            description: "提供计算与分布式存储能力。",
          },
        ],
      },
      {
        href: "/using#downloads",
        label: "下载",
        description: "获取 NOVOVM 核心工具与浏览入口。",
        children: [
          {
            href: "/network",
            label: "NOVOVM",
            description: "访问网络基础设施入口。",
          },
          {
            href: "/wallet/create",
            label: "钱包",
            description: "管理资产与应用访问。",
          },
          {
            href: "/ecosystem",
            label: "NOVO3 浏览器",
            description: "探索 Web3 服务和去中心化应用。",
          },
        ],
      },
    ];
  }

  return [
    {
      href: "/using#first-time",
      label: "First time using",
      description: "Get your unified Web3 / NOVO account and enter the ecosystem.",
      children: [
        {
          href: "/wallet/create",
          label: "Create wallet",
          description: "Store assets and access applications.",
        },
        {
          href: "/wallet/account",
          label: "Create NOVO account",
          description: "Set up your unified identity entry point.",
        },
        {
          href: "/using#first-time",
          label: "Connect to the network",
          description: "Access apps, assets, and services.",
        },
      ],
    },
    {
      href: "/using#personal-users",
      label: "Personal users",
      description: "Explore Web3 and use ecosystem services through one entry.",
      children: [
        {
          href: "/ecosystem",
          label: "Explore ecosystem",
          description: "See apps, assets, and network service entry points.",
        },
        {
          href: "/using#personal-users",
          label: "Use services",
          description: "Access identity, AI, storage, and network services.",
        },
      ],
    },
    {
      href: "/using#participate-network",
      label: "Participate in the network",
      description: "Join Web3 nodes and contribute compute and storage resources.",
      children: [
        {
          href: "/network",
          label: "Join Web3 nodes",
          description: "Understand node operation and network connectivity.",
        },
        {
          href: "/using#participate-network",
          label: "Contribute compute and storage",
          description: "Provide compute and distributed storage capacity.",
        },
      ],
    },
    {
      href: "/using#downloads",
      label: "Downloads",
      description: "Get core NOVOVM tools and ecosystem access points.",
      children: [
        {
          href: "/network",
          label: "NOVOVM",
          description: "Access the network infrastructure entry.",
        },
        {
          href: "/wallet/create",
          label: "Wallet",
          description: "Manage assets and application access.",
        },
        {
          href: "/ecosystem",
          label: "NOVO3 Browser",
          description: "Explore Web3 services and decentralized applications.",
        },
      ],
    },
  ];
}

function getEcosystemItems(language: Language) {
  if (language === "zh") {
    return [
      {
        href: "/ecosystem/trading-services",
        label: "交易服务",
        description: "交换数字资产并访问市场相关服务。",
        children: [],
      },
      {
        href: "/ecosystem/wallet-services",
        label: "钱包服务",
        description: "管理账户、资产、权限和应用访问。",
        children: [],
      },
      {
        href: "/ecosystem/storage-services",
        label: "存储服务",
        description: "通过去中心化存储访问和管理数据。",
        children: [],
      },
      {
        href: "/ecosystem/chain-name-services",
        label: "链名服务",
        description: "为账户、服务和网络身份使用可读名称。",
        children: [],
      },
      {
        href: "/ecosystem/decentralized-services",
        label: "去中心化服务",
        description: "从金融、游戏、社交和电商等服务进入 Web3 生态。",
        children: [
          {
            href: "/ecosystem/decentralized-services#finance",
            label: "金融",
            description: "访问开放网络基础设施上的金融应用。",
          },
          {
            href: "/ecosystem/decentralized-services#games",
            label: "游戏",
            description: "体验连接资产、身份和经济系统的 Web3 游戏。",
          },
          {
            href: "/ecosystem/decentralized-services#social",
            label: "社交",
            description: "以用户可控身份进行聊天和社区建设。",
          },
          {
            href: "/ecosystem/decentralized-services#commerce",
            label: "电商",
            description: "在生态中进行买卖并使用数字商业服务。",
          },
        ],
      },
    ];
  }

  return [
    {
      href: "/ecosystem/trading-services",
      label: "Trading services",
      description: "Exchange digital assets and access market services.",
      children: [],
    },
    {
      href: "/ecosystem/wallet-services",
      label: "Wallet services",
      description: "Manage accounts, assets, permissions, and app access.",
      children: [],
    },
    {
      href: "/ecosystem/storage-services",
      label: "Storage services",
      description: "Access and manage data through decentralized storage.",
      children: [],
    },
    {
      href: "/ecosystem/chain-name-services",
      label: "Chain name services",
      description: "Use readable names for accounts and network identities.",
      children: [],
    },
    {
      href: "/ecosystem/decentralized-services",
      label: "Decentralized services",
      description: "Enter finance, gaming, social, and commerce services through one ecosystem.",
      children: [
        {
          href: "/ecosystem/decentralized-services#finance",
          label: "Finance",
          description: "Access financial applications on open network infrastructure.",
        },
        {
          href: "/ecosystem/decentralized-services#games",
          label: "Games",
          description: "Use Web3 games connected to assets and identity.",
        },
        {
          href: "/ecosystem/decentralized-services#social",
          label: "Social",
          description: "Connect and build communities with user-controlled identity.",
        },
        {
          href: "/ecosystem/decentralized-services#commerce",
          label: "Commerce",
          description: "Buy, sell, and interact with digital commerce services.",
        },
      ],
    },
  ];
}

function getParticipateItems(language: Language) {
  if (language === "zh") {
    return [
      {
        href: "/participate#community",
        label: "社群",
        description: "进入 NOVO 社区，跟进更新并认识其他用户。",
        children: [],
      },
      {
        href: "/participate#forum",
        label: "论坛",
        description: "查看更深入的讨论、提案、技术话题和反馈空间。",
        children: [],
      },
      {
        href: "/participate#events",
        label: "活动",
        description: "关注线上线下活动、开发者活动和生态发布节奏。",
        children: [],
      },
      {
        href: "/participate#join",
        label: "加入",
        description: "选择成为用户、开发者、节点参与者或生态伙伴。",
        children: [],
      },
    ];
  }

  return [
    {
      href: "/participate#community",
      label: "Community",
      description: "Enter the NOVO community and follow ecosystem updates.",
      children: [],
    },
    {
      href: "/participate#forum",
      label: "Forum",
      description: "See deeper discussions, proposals, technical topics, and feedback.",
      children: [],
    },
    {
      href: "/participate#events",
      label: "Events",
      description: "Follow online and offline sessions, launches, and meetups.",
      children: [],
    },
    {
      href: "/participate#join",
      label: "Join",
      description: "Choose how to participate as a user, builder, node participant, or partner.",
      children: [],
    },
  ];
}

export function Header({
  language,
  onLanguageChange,
  sectionHrefPrefix = "",
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeUsingMenu, setActiveUsingMenu] = useState<number | null>(null);
  const [activeLearnWeb3Menu, setActiveLearnWeb3Menu] = useState<number | null>(null);
  const [activeEcosystemMenu, setActiveEcosystemMenu] = useState<number | null>(null);
  const [activeParticipateMenu, setActiveParticipateMenu] = useState<number | null>(null);
  const pathname = usePathname();
  const copy = getSiteContent(language);
  const learnWeb3Items = getLearnWeb3Items(language);
  const usingItems = getUsingItems(language);
  const ecosystemItems = getEcosystemItems(language);
  const participateItems = getParticipateItems(language);

  function renderNestedDropdown(
    items: NestedDropdownItem[],
    activeIndex: number | null,
    setActiveIndex: (index: number | null) => void,
  ) {
    const activeItem = activeIndex !== null ? items[activeIndex] : null;

    return (
      <div className="flex items-start gap-3" onMouseLeave={() => setActiveIndex(null)}>
        <div className="w-[360px] rounded-[14px] border border-border bg-[rgba(4,0,0,0.97)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl">
          <div className="space-y-2">
            {items.map((dropdownItem, index) => (
              <div
                className={cn(
                  "rounded-[12px] transition-colors duration-300",
                  index === activeIndex && "bg-[rgba(13,18,13,0.7)]",
                )}
                key={dropdownItem.label}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <Link
                  className="block rounded-[12px] px-5 py-5"
                  href={dropdownItem.href}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[15px] font-semibold leading-7 text-text">
                        {dropdownItem.label}
                      </p>
                      {dropdownItem.description ? (
                        <p className="mt-2 max-w-[420px] text-sm leading-6 text-[rgba(245,242,232,0.76)]">
                          {dropdownItem.description}
                        </p>
                      ) : null}
                    </div>
                    {dropdownItem.children.length > 0 ? (
                      <span className="pt-1 text-xl text-[rgba(245,242,232,0.6)]">›</span>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {activeItem && activeItem.children.length > 0 ? (
          <div className="w-[380px] rounded-[14px] border border-border bg-[rgba(4,0,0,0.97)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-xl">
            <div className="grid gap-2">
              {activeItem.children.map((child) => (
                <Link
                  className="rounded-[12px] px-5 py-5 transition-colors duration-300 hover:bg-[rgba(13,18,13,0.72)]"
                  href={child.href}
                  key={`${activeItem.label}-${child.label}`}
                >
                  <p className="text-[15px] font-semibold leading-7 text-text">
                    {child.label}
                  </p>
                  {child.description ? (
                    <p className="mt-2 text-sm leading-6 text-[rgba(245,242,232,0.76)]">
                      {child.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  function renderMobileNestedDropdown(items: NestedDropdownItem[]) {
    return (
      <div className="mt-1 flex flex-col gap-2 pl-4">
        {items.map((usingItem) => (
          <div className="rounded-[10px] bg-[rgba(13,18,13,0.26)] px-3 py-3" key={usingItem.label}>
            <Link
              className="block text-sm font-medium text-text"
              href={usingItem.href}
              onClick={() => setOpen(false)}
            >
              {usingItem.label}
            </Link>
            {usingItem.description ? (
              <p className="mt-1 text-xs leading-5 text-muted">
                {usingItem.description}
              </p>
            ) : null}
            <div className="mt-2 flex flex-col gap-1">
              {usingItem.children.map((child) => (
                <Link
                  className="text-xs leading-5 text-muted transition-colors duration-200 hover:text-text"
                  href={child.href}
                  key={`${usingItem.label}-${child.label}`}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function resolveHref(href: string) {
    if (!href.startsWith("#")) {
      return href;
    }

    return `${sectionHrefPrefix}${href}`;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Determine active section based on scroll position
      let currentSection = "";
      for (const item of copy.navItems) {
        if (!item.href.startsWith("#")) {
          continue;
        }

        const id = item.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is somewhat above the middle of the viewport and bottom is below it
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentSection = item.href;
          }
        }
      }
      
      // Fallback: Check if we are at the very bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        currentSection = copy.navItems[copy.navItems.length - 1]?.href || "";
      }

      if (window.scrollY < 100) {
        currentSection = ""; // Clear when at the absolute top (Hero section)
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [copy.navItems]);

  function renderLanguageSwitch(compact = false) {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-[6px] border border-border bg-[rgba(35,24,21,0.28)] p-1",
          compact && "w-full justify-between",
        )}
      >
        {(["en", "zh"] as const).map((option) => {
          const active = option === language;

          return (
            <button
              aria-pressed={active}
              className={cn(
                "rounded-[4px] px-3 py-1.5 text-xs font-medium transition-[background-color,color,box-shadow] duration-200",
                active
                  ? "bg-green text-text shadow-[0_0_16px_rgba(90,181,70,0.2)]"
                  : "text-muted hover:text-text",
              )}
              key={option}
              onClick={() => onLanguageChange(option)}
              type="button"
            >
              {languageLabels[option]}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border bg-[rgba(4,0,0,0.82)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-5 sm:px-6 lg:px-8 xl:gap-12">
        <a
          aria-label="NOVOVM"
          className="flex shrink-0 items-center gap-3 text-sm font-semibold text-text"
          href={resolveHref("#hero")}
          onClick={() => setOpen(false)}
        >
          <Image
            alt=""
            className="h-9 w-auto object-contain sm:h-10"
            height={231}
            priority
            src="/logo.svg"
            width={384}
          />
          <Image
            alt="NOVOVM"
            className="hidden h-[18px] w-auto object-contain sm:block"
            height={91}
            priority
            src="/wordmark.svg"
            width={724}
          />
        </a>

        <nav className="hidden items-center gap-9 text-sm xl:gap-10 lg:flex">
          {copy.navItems.map((item) => {
            const isActive =
              activeSection === item.href ||
              (!item.href.startsWith("#") && pathname === item.href);

            if (
              item.href === "/learn-web3" ||
              item.href === "/using" ||
              item.href === "/ecosystem" ||
              item.href === "/participate"
            ) {
              return (
                <div className="group relative" key={item.href}>
                  <a
                    className={cn(
                      "relative transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                      isActive
                        ? "font-medium text-[#5AB546]"
                        : "text-muted hover:text-text",
                    )}
                    href={item.href}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#5AB546] shadow-[0_0_8px_rgba(90,181,70,0.8)]" />
                    )}
                  </a>

                  <div className="pointer-events-none absolute left-0 top-full z-30 translate-y-2 pt-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.href === "/learn-web3"
                      ? renderNestedDropdown(
                          learnWeb3Items,
                          activeLearnWeb3Menu,
                          setActiveLearnWeb3Menu,
                        )
                      : item.href === "/using"
                        ? renderNestedDropdown(
                            usingItems,
                            activeUsingMenu,
                            setActiveUsingMenu,
                          )
                        : item.href === "/ecosystem"
                          ? renderNestedDropdown(
                            ecosystemItems,
                            activeEcosystemMenu,
                            setActiveEcosystemMenu,
                          )
                          : renderNestedDropdown(
                            participateItems,
                            activeParticipateMenu,
                            setActiveParticipateMenu,
                          )}
                  </div>
                </div>
              );
            }

            return (
              <a
                className={cn(
                  "transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold relative",
                  isActive
                    ? "text-[#5AB546] font-medium"
                    : "text-muted hover:text-text"
                )}
                href={resolveHref(item.href)}
                key={item.href}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#5AB546] rounded-full shadow-[0_0_8px_rgba(90,181,70,0.8)]" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          {renderLanguageSwitch()}
        </div>

        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border text-text transition-colors duration-200 hover:border-[rgba(90,181,70,0.48)] hover:bg-[rgba(35,24,21,0.35)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border bg-[rgba(4,0,0,0.95)] transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="min-h-0 px-5 sm:px-6">
          <div className="flex flex-col gap-3 py-4">
            {renderLanguageSwitch(true)}
            {copy.navItems.map((item) => {
              const isActive =
                activeSection === item.href ||
                (!item.href.startsWith("#") && pathname === item.href);
              return (
                <div key={item.href}>
                  <a
                    className={cn(
                      "rounded-[6px] px-2 py-3 text-sm transition-colors duration-200 hover:bg-surface-soft",
                      isActive
                        ? "bg-[rgba(90,181,70,0.1)] font-medium text-[#5AB546]"
                        : "text-muted hover:text-text",
                    )}
                    href={resolveHref(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.href === "/learn-web3" || item.href === "/using" || item.href === "/ecosystem" || item.href === "/participate" ? (
                    item.href === "/learn-web3" ? (
                      <div className="mt-1 flex flex-col gap-1 pl-4">
                        {learnWeb3Items.map((learnItem) => (
                          <Link
                            className="rounded-[6px] px-2 py-2 text-xs text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-text"
                            href={learnItem.href}
                            key={learnItem.href}
                            onClick={() => setOpen(false)}
                          >
                            {learnItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : item.href === "/using" ? (
                      renderMobileNestedDropdown(usingItems)
                    ) : item.href === "/ecosystem" ? (
                      renderMobileNestedDropdown(ecosystemItems)
                    ) : (
                      renderMobileNestedDropdown(participateItems)
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
