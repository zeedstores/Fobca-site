import { useEffect, useState } from "react";
import heroVideo from "./imports/VID-20261005-WA0000.mp4";
import fobcaBanner from "./imports/fobca-banner.png";
import fobcaImage from "./imports/Fobca-image.png";
import { supabase } from "./lib/supabase";


type Department = {
  name: string;
  eyebrow: string;
  path: string;
  available?: boolean;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type StoreSettings = {
  id: string;
  store_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  updated_at: string;
};

async function getStoreSettings(): Promise<StoreSettings | null> {
  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error loading store settings:", error);
    return null;
  }

  return data as StoreSettings | null;
}

const departments: Department[] = [
  {
    name: "Furniture",
    eyebrow: "Available now",
    path: "/furniture",
    available: true,
  },
  {
    name: "Building & Interior decorations",
    eyebrow: "Coming soon",
    path: "/energy",
  },
  {
    name: "Construction",
    eyebrow: "Coming soon",
    path: "/construction",
  },
  {
    name: "Architectural Design",
    eyebrow: "Coming soon",
    path: "/architecture",
  },
  {
    name: "Oil & Gas",
    eyebrow: "Coming soon",
    path: "/living",
  },
];

const categories = [
  "Living-Room",
  "Dining-Sets",
  "Bedroom-Sets",
  "Adjustable-Coffee-Table",
  "Rocking-Chair-with-Footstool",
   "Sofa-Sets",
   "Bedside-Table-Lamps",
];

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================================
   ICONS
========================================================= */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H7" />
      <path d="M10 20h.01" />
      <path d="M17 20h.01" />
    </svg>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <button
      onClick={() => navigate("/")}
      aria-label="FOBCA home"
      className="flex items-center"
    >
      <img
        src="/assets/fobca-logo-source.png"
        alt="FOBCA Limited"
        className={`h-10 w-auto object-contain ${
          inverse ? "brightness-0 invert" : ""
        }`}
      />
    </button>
  );
}

/* =========================================================
   GENERAL HEADER
========================================================= */

function Header({
  dark = false,
  store = false,
  hero = false,
}: {
  dark?: boolean;
  store?: boolean;
  hero?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = dark ? "text-white" : "text-[#101b18]";
  const mutedColor = dark ? "text-white/70" : "text-[#101b18]/65";
  const borderColor = dark ? "border-white/15" : "border-black/10";

  const go = (path: string) => {
    setMenuOpen(false);

    if (path === "/#about") {
      navigate("/");

      window.setTimeout(() => {
        document
          .querySelector("#about")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);

      return;
    }

    if (path === "/#departments") {
      navigate("/");

      window.setTimeout(() => {
        document
          .querySelector("#departments")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);

      return;
    }

    navigate(path);
  };

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 ${textColor}`}>
      <div
        className={`mx-auto flex h-24 w-[calc(100%-40px)] max-w-[1280px] items-center justify-between border-b ${borderColor} sm:w-[calc(100%-64px)]`}
      >
        <Logo inverse={dark} />

        <nav className="hidden items-center gap-9 md:flex">
          <button
            onClick={() => go("/")}
            className={`text-[11px] uppercase tracking-[0.16em] transition hover:opacity-50 ${mutedColor}`}
          >
            Home
          </button>

          <button
            onClick={() => go("/#about")}
            className={`text-[11px] uppercase tracking-[0.16em] transition hover:opacity-50 ${mutedColor}`}
          >
            About
          </button>

          <button
            onClick={() => go("/#departments")}
            className={`text-[11px] uppercase tracking-[0.16em] transition hover:opacity-50 ${mutedColor}`}
          >
            Departments
          </button>

          <button
            onClick={() => go("/furniture")}
            className={`text-[11px] uppercase tracking-[0.16em] transition hover:opacity-50 ${mutedColor}`}
          >
            Furniture
          </button>

          {store && (
            <button
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>("#store-search")
                  ?.focus()
              }
              className={mutedColor}
              aria-label="Search furniture"
            >
              <SearchIcon />
            </button>
          )}

          {store && (
            <button
              onClick={() => go("/furniture")}
              className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] ${mutedColor}`}
            >
              Cart
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-current px-1 text-[9px]">
                0
              </span>
            </button>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-end justify-center gap-2 md:hidden"
          aria-label="Toggle navigation"
        >
          <span
            className={`h-px w-7 ${
              dark ? "bg-white" : "bg-[#101b18]"
            }`}
          />

          <span
            className={`h-px w-5 ${
              dark ? "bg-white" : "bg-[#101b18]"
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute left-0 right-0 top-24 border-b px-5 pb-7 pt-3 md:hidden ${
            dark
              ? "border-white/10 bg-[#101b18]"
              : "border-black/10 bg-[#f8f6ef]"
          }`}
        >
          <nav className="flex flex-col">
            <button
              onClick={() => go("/")}
              className={`border-b py-4 text-left text-xs uppercase tracking-[0.15em] ${borderColor}`}
            >
              Home
            </button>

            <button
              onClick={() => go("/#about")}
              className={`border-b py-4 text-left text-xs uppercase tracking-[0.15em] ${borderColor}`}
            >
              About
            </button>

            <button
              onClick={() => go("/#departments")}
              className={`border-b py-4 text-left text-xs uppercase tracking-[0.15em] ${borderColor}`}
            >
              Departments
            </button>

            <button
              onClick={() => go("/furniture")}
              className={`border-b py-4 text-left text-xs uppercase tracking-[0.15em] ${borderColor}`}
            >
              Furniture
            </button>

            {store && (
              <button
                onClick={() => {
                  setMenuOpen(false);

                  window.setTimeout(() => {
                    document
                      .querySelector<HTMLInputElement>("#store-search")
                      ?.focus();
                  }, 100);
                }}
                className={`py-4 text-left text-xs uppercase tracking-[0.15em] ${mutedColor}`}
              >
                Search Furniture
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   IMAGE PLACEHOLDER
========================================================= */

function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full min-h-[300px] items-center justify-center bg-[#ded8ca] ${className}`}
    >
      <span className="text-[10px] uppercase tracking-[0.18em] text-[#101b18]/30">
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   PRODUCT PLACEHOLDER
========================================================= */

function ProductPlaceholderCard({ index }: { index: number }) {
  return (
    <article className="border border-black/10 bg-[#fbfaf6]">
      <div className="aspect-square">
        <ImagePlaceholder label={`Furniture ${index}`} />
      </div>

      <div className="p-5">
        <p className="text-[9px] uppercase tracking-[0.16em] text-black/40">
          Catalogue item
        </p>

        <h3 className="mt-2 font-['Playfair_Display'] text-xl">
          Details coming soon
        </h3>

        <button
          disabled
          className="mt-5 w-full border border-black/10 py-3 text-[10px] uppercase tracking-[0.14em] text-black/30"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   FOOTER
========================================================= */
function Footer() {
  console.log("FOOTER COMPONENT RENDERED");

  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(
    null,
  );
  useEffect(() => {
    const loadFooterSettings = async () => {
      const { data, error } = await supabase
        .from("store_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Footer settings error:", error);
        return;
      }

      console.log("Footer store settings:", data);
      setStoreSettings(data as StoreSettings | null);
    };

    loadFooterSettings();
  }, []);

  return (
    <footer className="bg-[#101b18] px-5 py-14 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2">
          <div>
            <Logo inverse />

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              Building businesses and creating possibilities across the spaces
              that shape modern life.
            </p>

            {storeSettings?.address && (
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
                {storeSettings.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-self-end md:min-w-[300px]">
            <div className="flex flex-col gap-3">
              <strong className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Explore
              </strong>

              <button
                onClick={() => navigate("/")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/furniture")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Furniture
              </button>

              <button
                onClick={() => navigate("/construction")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Construction
              </button>

              <button
                onClick={() => navigate("/architecture")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Architecture
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <strong className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Contact
              </strong>

              {storeSettings?.phone && (
                <a
                  href={`tel:${storeSettings.phone}`}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {storeSettings.phone}
                </a>
              )}

              {storeSettings?.whatsapp && (
                <a
                  href={`https://wa.me/${storeSettings.whatsapp.replace(
                    /\D/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  WhatsApp
                </a>
              )}

              {storeSettings?.email && (
                <a
                  href={`mailto:${storeSettings.email}`}
                  className="break-all text-sm text-white/65 transition hover:text-white"
                >
                  {storeSettings.email}
                </a>
              )}

              {storeSettings?.instagram_url && (
                <a
                  href={storeSettings.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  Instagram
                </a>
              )}

              {storeSettings?.facebook_url && (
                <a
                  href={storeSettings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  Facebook
                </a>
              )}

              {storeSettings?.tiktok_url && (
                <a
                  href={storeSettings.tiktok_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  TikTok
                </a>
              )}

              {!storeSettings && (
                <span className="text-sm text-white/40">
                  Loading contact details...
                </span>
              )}

              {storeSettings &&
                !storeSettings.phone &&
                !storeSettings.whatsapp &&
                !storeSettings.email &&
                !storeSettings.instagram_url &&
                !storeSettings.facebook_url &&
                !storeSettings.tiktok_url && (
                  <span className="text-sm text-white/40">
                    Contact details coming soon
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 pt-5 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:flex-row">
          <span>© {new Date().getFullYear()} FOBCA Limited</span>

          <span>We realize your dreams.</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   HOMEPAGE
========================================================= */

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [headerDark, setHeaderDark] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings | null>(
    null,
  );

  const toggleSound = () => {
    setSoundOn((current) => !current);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setHeaderDark(window.scrollY > heroHeight - 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error loading homepage products:", error);
        return;
      }

      setFeaturedProducts((data ?? []) as Product[]);
    };

    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    const loadStoreSettings = async () => {
      const { data, error } = await supabase
        .from("store_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error loading store settings:", error);
        return;
      }

      console.log("Homepage store settings:", data);

      setStoreSettings(data as StoreSettings | null);
    };

    loadStoreSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      {/* HEADER */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/");
            }}
            className="group flex items-center"
          >
            <img
              src="/assets/fobca-logo-source.png"
              alt="FOBCA Limited"
              className={`h-12 w-auto object-contain transition duration-500 ${
                headerDark ? "" : "brightness-0 invert"
              }`}
            />
          </button>

          <nav className="hidden items-center gap-10 md:flex">
            <button
              onClick={() => navigate("/")}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark ? "text-[#101b18]" : "text-white"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark
                  ? "text-[#101b18]/65 hover:text-[#101b18]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              About
            </button>

            <button
              onClick={() => {
                document
                  .querySelector("#departments")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark
                  ? "text-[#101b18]/65 hover:text-[#101b18]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Departments
            </button>

            <button
              onClick={() => navigate("/furniture")}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark
                  ? "text-[#101b18]/65 hover:text-[#101b18]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Furniture
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-10 w-10 flex-col items-end justify-center gap-2 md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-px w-7 transition-all duration-500 ${
                headerDark ? "bg-[#101b18]" : "bg-white"
              } ${menuOpen ? "translate-y-[4.5px] -rotate-45" : ""}`}
            />

            <span
              className={`h-px w-5 transition-all duration-500 ${
                headerDark ? "bg-[#101b18]" : "bg-white"
              } ${menuOpen ? "-translate-y-[4.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 bg-[#101b18]/95 px-6 pb-8 pt-3 backdrop-blur-md md:hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/");
                }}
                className="border-b border-white/10 py-5 text-left text-xs uppercase tracking-[0.2em] text-white"
              >
                Home
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-b border-white/10 py-5 text-left text-xs uppercase tracking-[0.2em] text-white/70"
              >
                About
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .querySelector("#departments")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-b border-white/10 py-5 text-left text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Departments
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/furniture");
                }}
                className="py-5 text-left text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Furniture
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}

      <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#101b18]">
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_70%] sm:object-[center_25%] lg:object-[center_20%]"
          src={heroVideo}
          autoPlay
          muted={!soundOn}
          loop
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-end px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
          <div className="max-w-4xl">
            <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-white/70 sm:text-xs">
              FOBCA LIMITED
            </p>

            <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[100px]">
              We realize
              <br />
              <span className="italic font-light">your dreams.</span>
            </h1>

            <div className="mt-8 flex max-w-xl items-start gap-5">
              <span className="mt-2 h-px w-12 shrink-0 bg-white/60" />
            </div>
          </div>
        </div>

        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute video" : "Turn video sound on"}
          className="absolute bottom-8 right-6 z-20 flex items-center gap-3 border border-white/30 px-4 py-1 text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm transition hover:border-white hover:text-white sm:right-10 lg:right-16"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              soundOn ? "bg-white" : "border border-white/70"
            }`}
          />

          {soundOn ? "Sound On" : "Sound Off"}
        </button>

        <div className="absolute bottom-9 left-6 z-20 hidden items-center gap-4 sm:flex lg:left-16">
          <span className="h-12 w-px bg-white/40" />

          <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="relative overflow-hidden bg-[#f3f0e8] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      >
        <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full border border-[#174b32]/10" />

        <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-[320px] w-[320px] rounded-full border border-[#174b32]/10" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between border-b border-[#101b18]/15 pb-5">
            <div className="flex items-center gap-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#174b32]" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#101b18]/55">
                About Fobca
              </span>
            </div>

            <span className="font-mono text-[9px] tracking-[0.2em] text-[#101b18]/35">
              01 / 05
            </span>
          </div>

          <div className="mt-16 lg:mt-24">
            <p className="max-w-5xl font-serif text-4xl leading-[1.08] tracking-[-0.035em] text-[#101b18] sm:text-5xl md:text-6xl lg:text-[76px]">
              We bring together
              <span className="italic font-light text-[#174b32]">
                {" "}
                style, comfort
              </span>{" "}
              and function to create spaces worth living in.
            </p>
          </div>

          <div className="mt-20 grid gap-16 border-t border-[#101b18]/15 pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:pt-16">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#101b18]/40">
                Our approach
              </p>

              <div className="mt-8 flex items-start gap-5">
                <span className="mt-1 font-serif text-5xl leading-none text-[#174b32]/25">
                  “
                </span>

                <p className="max-w-xs font-serif text-xl leading-8 text-[#101b18]/75">
                  We don't just sell furniture. We help people create beautiful,
                  comfortable and functional spaces.
                </p>
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="text-base leading-8 text-[#101b18]/65 sm:text-lg sm:leading-9">
                Fobca Limited is a premium furniture company dedicated to
                bringing stylish, functional and quality furniture to homes,
                offices and hospitality spaces.
              </p>

              <p className="mt-3 text-base leading-8 text-[#101b18]/65 sm:text-lg sm:leading-9">
                We source carefully selected furniture designs from
                international markets, including China, Dubai, Egypt and
                Turkey, and make them accessible to customers in Nigeria.
              </p>

              <p className="mt-3 text-base leading-8 text-[#101b18]/65 sm:text-lg sm:leading-9">
                From elegant bedroom and living-room sets to modern dining
                furniture, adjustable coffee tables, premium shoe racks,
                rocking chairs and bedside lamps, we provide furniture
                solutions that combine comfort, functionality and style.
              </p>

              <div className="mt-14 flex items-end justify-between border-t border-[#101b18]/15 pt-7">
                <div>
                  <p className="font-serif text-2xl text-[#101b18]">
                    Fobca Limited
                  </p>

                  <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#101b18]/40">
                    Premium furniture & lifestyle
                  </p>
                </div>

                <span className="font-serif text-3xl italic text-[#174b32]/70">
                  F
                </span>
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-col gap-5 border-t border-[#101b18]/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#101b18]/40">
              China · Dubai · Egypt · Turkey
            </span>

            <span className="font-serif text-lg italic text-[#174b32]">
              We realize your dreams.
            </span>
          </div>

          {/* HOMEPAGE STORE */}

          <div className="mt-20 border-t border-[#101b18]/15 pt-14 sm:mt-24 sm:pt-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#101b18]/40">
                  From the collection
                </p>

                <h3 className="mt-4 max-w-2xl font-serif text-3xl leading-[1.05] tracking-[-0.03em] text-[#101b18] sm:text-4xl lg:text-5xl">
                  Pieces chosen for
                  <span className="italic font-light text-[#174b32]">
                    {" "}
                    beautiful spaces.
                  </span>
                </h3>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
              {featuredProducts.map((product, index) => (
                <article key={product.id} className="group">
                  <button
                    onClick={() => navigate("/furniture")}
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-[#e2ddd2] text-left"
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                    ) : (
                      <ImagePlaceholder label={product.name} />
                    )}

                    <span className="absolute left-4 top-4 font-mono text-[8px] tracking-[0.15em] text-white/75">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center border border-white/50 bg-black/10 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      ↗
                    </span>
                  </button>

                  <div className="pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-serif text-lg leading-[1.1] tracking-[-0.015em] text-[#101b18] sm:text-xl">
                        {product.name}
                      </h4>

                      <p className="whitespace-nowrap pt-1 text-[10px] tracking-[0.03em] text-[#101b18]/55">
                        ₦{Number(product.price).toLocaleString("en-NG")}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/furniture")}
                      className="mt-2 flex w-full items-center justify-between border border-[#101b18]/20 px-4 py-1 text-left transition-all duration-300 hover:border-[#174b32] hover:bg-[#174b32] hover:text-white"
                    >
                      <span className="text-[8px] uppercase tracking-[0.2em]">
                        Order this piece
                      </span>

                      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-[#101b18]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-6 text-[#101b18]/45">
                Explore our collection of bedroom sets, sofa sets, dining
                sets, adjustable coffee tables, rocking chairs with footstools
                and bedside table lamps — selected to bring comfort, function
                and style into your space.
              </p>

              <button
                onClick={() => navigate("/furniture")}
                className="group flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#174b32]"
              >
                Explore all furniture

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}

      <section
        id="departments"
        className="bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
                Our departments
              </p>

              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                More than
                <span className="font-light italic"> furniture.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              Explore the different sides of FOBCA, from furniture to the
              businesses we&apos;re building next.
            </p>
          </div>

          <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
            {departments.map((department, index) => (
              <button
                key={department.path}
                onClick={() => navigate(department.path)}
                className="group flex w-full items-center justify-between py-8 text-left sm:py-10"
              >
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-[10px] text-white/25">
                    0{index + 1}
                  </span>

                  <span
                    className={`font-serif text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl ${
                      department.available
                        ? "text-white transition group-hover:translate-x-2"
                        : "text-white/35 transition group-hover:text-white/55"
                    }`}
                  >
                    {department.name}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/35 sm:block">
                    {department.available ? "Explore" : "Coming soon"}
                  </span>

                  <span className="text-xl text-white/40 transition group-hover:translate-x-2 group-hover:text-white">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FURNITURE FEATURE */}

      <section className="bg-[#ded8ca] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#174b32]/70">
              FOBCA Furniture
            </p>

            <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#101b18] sm:text-6xl lg:text-7xl">
              Designed for
              <span className="italic font-light"> living.</span>
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-[#101b18]/60">
              Discover carefully selected furniture pieces for homes, offices
              and hospitality spaces. Thoughtful designs, quality materials and
              timeless forms.
            </p>

            <button
              onClick={() => navigate("/furniture")}
              className="mt-5 border border-[#174b32] px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-[#174b32] transition hover:bg-[#174b32] hover:text-white"
            >
              Enter furniture
            </button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-[#c8c0ae]">
            <img
              src={fobcaImage}
              alt="FOBCA furniture"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/45 to-transparent p-6 sm:p-8">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/80">
                Explore collection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}

      <section className="bg-[#f3f0e8] px-6 py-28 sm:px-10 sm:py-40 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#174b32]/60">
            FOBCA LIMITED
          </p>

          <h2 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#101b18] sm:text-6xl lg:text-8xl">
            We are building
            <br />
            <span className="italic font-light">what comes next.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[#101b18]/55 sm:text-base">
            Furniture. Oil & Gas. Construction. Architectural Design. A
            growing company creating solutions for modern Nigeria.
          </p>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#0d2d20] px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto]">

            {/* BRAND */}

            <div>
              <img
                src="/assets/fobca-logo-source.png"
                alt="FOBCA Limited"
                className="h-14 w-auto object-contain brightness-0 invert"
              />

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
                Building quality products, services and solutions for modern
                living.
              </p>

              {storeSettings?.address && (
                <p className="mt-5 text-sm leading-7 text-white/40">
                  {storeSettings.address}
                </p>
              )}
            </div>

            {/* LINKS + CONTACT */}

            <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:gap-x-20">

              {/* EXPLORE */}

              <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Explore
                </span>

                <button
                  onClick={() => navigate("/furniture")}
                  className="text-left text-sm text-white/60 transition hover:text-white"
                >
                  Furniture
                </button>

                <button
                  onClick={() => navigate("/energy")}
                  className="text-left text-sm text-white/60 transition hover:text-white"
                >
                  Oil & Gas
                </button>

                <button
                  onClick={() => navigate("/construction")}
                  className="text-left text-sm text-white/60 transition hover:text-white"
                >
                  Construction
                </button>

                <button
                  onClick={() => navigate("/architecture")}
                  className="text-left text-sm text-white/60 transition hover:text-white"
                >
                  Architectural Design
                </button>
              </div>

              {/* CONTACT */}

              <div className="flex flex-col gap-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Contact
                </span>

                {storeSettings?.phone && (
                  <a
                    href={`tel:${storeSettings.phone}`}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {storeSettings.phone}
                  </a>
                )}

                {storeSettings?.whatsapp && (
                  <a
                    href={`https://wa.me/${storeSettings.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    WhatsApp
                  </a>
                )}

                {storeSettings?.email && (
                  <a
                    href={`mailto:${storeSettings.email}`}
                    className="break-all text-sm text-white/60 transition hover:text-white"
                  >
                    {storeSettings.email}
                  </a>
                )}

                {storeSettings?.instagram_url && (
                  <a
                    href={storeSettings.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    Instagram
                  </a>
                )}

                {storeSettings?.facebook_url && (
                  <a
                    href={storeSettings.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    Facebook
                  </a>
                )}

                {storeSettings?.tiktok_url && (
                  <a
                    href={storeSettings.tiktok_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    TikTok
                  </a>
                )}

                {!storeSettings && (
                  <span className="text-sm text-white/35">
                    Loading contact details...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}

          <div className="flex flex-col gap-3 pt-8 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} FOBCA Limited</span>

            <span>We realize your dreams.</span>

            <button
              onClick={() => navigate("/admin")}
              className="text-left transition hover:text-white"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}



/* =========================================================
   FURNITURE STORE
========================================================= */

function FurnitureStorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );

    if (category) {
      setActiveCategory(category);
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        setLoadingProducts(false);
        return;
      }

      setProducts((data ?? []) as Product[]);
      setLoadingProducts(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredTitle = search
    ? `Results for “${search}”`
    : activeCategory === "All"
      ? "All furniture"
      : activeCategory;

  return (
    <>
      <Header store />

      <main className="bg-[#fbfaf6]">
        {/* STORE HERO */}

        <section className="relative min-h-[560px] overflow-hidden bg-[#ded8ca] sm:min-h-[620px]">
          <img
            src={fobcaBanner}
            alt="FOBCA Furniture"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="relative z-10 flex min-h-[560px] items-center sm:min-h-[620px]">
            <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-10 lg:px-20 xl:px-28">
              <div className="max-w-[420px] text-white">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">
                  FOBCA Furniture
                </p>

                <h1 className="mt-4 font-['Playfair_Display'] text-[clamp(3rem,8vw,6rem)] font-normal leading-[0.9] tracking-[-0.05em]">
                  Furniture for
                  <br />
                  beautiful spaces.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                  Discover carefully selected furniture designed to bring
                  comfort, function and character into your space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STORE CONTROLS */}

        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 lg:px-20 xl:px-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-md items-center gap-3 border-b border-black/20 py-3">
              <SearchIcon />

              <input
                id="store-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search furniture"
                aria-label="Search furniture"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
              />
            </div>

            
          </div>

          {/* Categories */}

          <div className="relative mt-8 overflow-hidden py-3">
            <div className="flex w-max animate-category-marquee">
              {[0, 1].map((loop) => (
                <div key={loop} className="flex shrink-0">
                  {["All", ...categories].map((category) => (
                    <button
                      key={`${loop}-${category}`}
                      onClick={() => setActiveCategory(category)}
                      className={`mr-8 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] transition ${
                        activeCategory === category
                          ? "font-semibold text-[#174b32]"
                          : "text-black/75 hover:text-[#174b32]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Section heading */}

          <div className="mt-14 flex items-end justify-between border-b border-black/10 pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#174b32]">
                Shop
              </p>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
                {filteredTitle}
              </h2>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.12em] text-black/35 sm:block">
              {products.length} products
            </span>
          </div>

          {/* PRODUCTS */}

          {loadingProducts ? (
            <div className="mt-12 py-20 text-center">
              <p className="text-[9px] uppercase tracking-[0.22em] text-black/40">
                Loading collection...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-12 border-t border-black/10 py-20 text-center">
              <p className="font-['Playfair_Display'] text-2xl">
                No furniture found.
              </p>

              <p className="mt-3 text-sm text-black/40">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div
              id="store-products"
              className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            >
              {filteredProducts.map((product) => (
                <article key={product.id} className="group">
                  <div className="relative aspect-[0.86] overflow-hidden bg-[#e8e3d8]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <ImagePlaceholder label="No image" />
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="mb-1 text-[8px] uppercase tracking-[0.15em] text-[#174b32]">
                      {product.category}
                    </p>

                    <h3 className="font-['Playfair_Display'] text-sm leading-[1.2] tracking-[-0.01em] text-[#101b18] sm:text-base">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#101b18]/60">
                      ₦{Number(product.price).toLocaleString("en-NG")}
                    </p>

                    <button
                      onClick={() => {
                        // Cart functionality comes next.
                      }}
                      className="group mt-4 flex items-center gap-2 text-[#174b32]"
                    >
                      <span className="text-[8px] uppercase tracking-[0.2em]">
                        Buy this piece
                      </span>

                      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   COMING SOON
========================================================= */

function ComingSoonPage({
  department,
}: {
  department: Department;
}) {
  return (
    <div className="min-h-screen bg-[#101b18] text-white">
      <Header dark />

      <main className="flex min-h-screen flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">
          FOBCA {department.name}
        </p>

        <h1 className="mt-5 max-w-4xl font-['Playfair_Display'] text-[clamp(4rem,8vw,7rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          Something powerful
          <br />
          is coming.
        </h1>

        <p className="mt-8 max-w-xl text-sm leading-7 text-white/50">
          We're carefully developing this department to meet the standard of
          quality, purpose and service our customers expect.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-white px-6 py-4 text-sm font-semibold text-[#101b18]"
          >
            Back to FOBCA
          </button>

          <button
            onClick={() => navigate("/furniture")}
            className="border border-white/30 px-6 py-4 text-sm font-semibold text-white"
          >
            Explore Furniture
          </button>
        </div>
      </main>

      <div className="fixed bottom-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.15em] text-white/30 sm:left-10 sm:right-10">
        <span>In development</span>

        <span>We realize your dreams.</span>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN LOGIN
========================================================= */

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_USERNAME = "fobcaadmin";
  const ADMIN_PASSWORD = "Fobca@admin";

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      navigate("/admin/dashboard");
      return;
    }

    alert("Invalid username or password.");
  };

  return (
    <main className="min-h-screen bg-[#101b18] text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
              FOBCA Limited
            </p>

            <h1 className="mt-4 font-['Playfair_Display'] text-5xl font-normal tracking-[-0.04em]">
              Admin
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
              Sign in to manage products and store information.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/50"
              >
                Username
              </label>

              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-white"
                autoComplete="username"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/50"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-white"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-between border border-white/20 px-5 py-4 text-left transition hover:border-white hover:bg-white hover:text-[#101b18]"
            >
              <span className="text-[9px] uppercase tracking-[0.2em]">
                Sign in
              </span>

              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboardPage() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const loadProductCount = async () => {
      const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error loading product count:", error);
        return;
      }

      setProductCount(count ?? 0);
    };

    loadProductCount();
  }, []);

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      <header className="border-b border-[#101b18]/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              FOBCA Limited
            </p>

            <h1 className="mt-1 font-['Playfair_Display'] text-2xl">
              Admin Dashboard
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Products */}
          <button
            onClick={() => navigate("/admin/products")}
            className="group border border-[#101b18]/10 bg-white p-7 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#174b32] hover:shadow-[0_12px_35px_rgba(16,27,24,0.06)]"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
              Store
            </p>

            <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
              Products
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#101b18]/50">
              Add, edit and remove furniture products from the online store.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              Manage products →
            </span>
          </button>

          {/* Store Details */}
          <button
            onClick={() => navigate("/admin/settings")}
            className="group border border-[#101b18]/10 bg-white p-7 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#174b32] hover:shadow-[0_12px_35px_rgba(16,27,24,0.06)]"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
              Information
            </p>

            <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
              Store Details
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#101b18]/50">
              Manage FOBCA&apos;s phone number, WhatsApp, address, email and
              social links.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              Manage details →
            </span>
          </button>
        </div>

        <div className="mt-10 border-t border-[#101b18]/10 pt-8">
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/35">
            Quick overview
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="bg-white p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                Products
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                {productCount}
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                Active
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                —
              </p>
            </div>

            <div className="bg-white p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                Store
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                Live
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function AdminProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Living Room");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = [
    "Living Room",
    "Dining",
    "Bedroom",
    "Office",
    "Hospitality",
  ];

  const loadProducts = async () => {
  setLoadingProducts(true);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading admin products:", error);
    setProducts([]);
    setLoadingProducts(false);
    return;
  }

  setProducts((data ?? []) as Product[]);
  setLoadingProducts(false);
};

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("Living Room");
    setDescription("");
    setImage(null);
    setIsActive(true);
    setEditingProduct(null);

    const fileInput = document.getElementById(
      "product-image",
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(String(product.price));
    setCategory(product.category);
    setDescription(product.description ?? "");
    setIsActive(product.is_active);
    setImage(null);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !price || !category) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (Number(price) < 0) {
      setMessage("Price cannot be negative.");
      return;
    }

    if (!editingProduct && !image) {
      setMessage("Please select a product image.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let imageUrl = editingProduct?.image_url ?? null;

      // Upload a new image if one was selected
      if (image) {
        const fileExtension =
          image.name.split(".").pop()?.toLowerCase() || "jpg";

        const safeFileName = image.name
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9.-]/g, "");

        const filePath = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}-${safeFileName || `product.${fileExtension}`}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, image, {
            upsert: false,
          });

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          setMessage(`Image upload failed: ${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      if (editingProduct) {
        // UPDATE EXISTING PRODUCT
        const { error: updateError } = await supabase
          .from("products")
          .update({
            name: name.trim(),
            description: description.trim() || null,
            price: Number(price),
            category,
            image_url: imageUrl,
            is_active: isActive,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProduct.id);

        if (updateError) {
          console.error("Product update error:", updateError);
          setMessage(
            `Product could not be updated: ${updateError.message}`,
          );
          setLoading(false);
          return;
        }

        setMessage("Product updated successfully.");
      } else {
        // ADD NEW PRODUCT
        const { error: productError } = await supabase
          .from("products")
          .insert({
            name: name.trim(),
            description: description.trim() || null,
            price: Number(price),
            category,
            image_url: imageUrl,
            is_active: isActive,
          });

        if (productError) {
          console.error("Product insert error:", productError);
          setMessage(
            `Product could not be saved: ${productError.message}`,
          );
          setLoading(false);
          return;
        }

        setMessage("Product added successfully.");
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (product: Product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    setMessage("");

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("Delete error:", error);
      setMessage(`Product could not be deleted: ${error.message}`);
      return;
    }

    if (editingProduct?.id === product.id) {
      resetForm();
    }

    setMessage("Product deleted successfully.");
    await loadProducts();
  };

 const toggleProductStatus = async (product: Product) => {
  setMessage("");

  const { error } = await supabase
    .from("products")
    .update({
      is_active: !product.is_active,
    })
    .eq("id", product.id);

  if (error) {
    console.error("Status update error:", error);
    setMessage(`Could not update product status: ${error.message}`);
    return;
  }

  setMessage(
    product.is_active
      ? "Product hidden from store."
      : "Product is now live on store.",
  );

  await loadProducts();
};

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      <header className="border-b border-[#101b18]/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              FOBCA Limited
            </p>

            <h1 className="mt-1 font-['Playfair_Display'] text-2xl">
              Products
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 py-10 sm:px-10 lg:py-14">
        {/* ============================================================
            ADD / EDIT PRODUCT
        ============================================================ */}

        <div className="border border-[#101b18]/10 bg-white p-6 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Store
              </p>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl">
                {editingProduct ? "Edit product" : "Add product"}
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#101b18]/50">
                {editingProduct
                  ? "Update the details of this furniture product."
                  : "Add a furniture product to the FOBCA online store."}
              </p>
            </div>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                className="shrink-0 text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45 transition hover:text-[#174b32]"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="product-name"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#101b18]/50"
              >
                Product name
              </label>

              <input
                id="product-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Modern Lounge Chair"
                className="w-full border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
              />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="product-price"
                  className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#101b18]/50"
                >
                  Price
                </label>

                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="185000"
                  className="w-full border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label
                  htmlFor="product-category"
                  className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#101b18]/50"
                >
                  Category
                </label>

                <select
                  id="product-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm outline-none"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="product-description"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#101b18]/50"
              >
                Description
              </label>

              <textarea
                id="product-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the furniture piece..."
                rows={4}
                className="w-full resize-none border border-[#101b18]/15 bg-transparent p-3 text-sm outline-none transition focus:border-[#174b32]"
              />
            </div>

            <div>
              <label
                htmlFor="product-image"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-[#101b18]/50"
              >
                {editingProduct ? "Replace product image" : "Product image"}
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setImage(event.target.files?.[0] ?? null)
                }
                className="block w-full text-sm"
              />

              <p className="mt-2 text-[10px] text-[#101b18]/40">
                {editingProduct
                  ? "Leave empty to keep the current image."
                  : "Upload a clear product image."}
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                className="h-4 w-4 accent-[#174b32]"
              />

              <span className="text-xs">
                Show this product on the store
              </span>
            </label>

            {message && (
              <p className="border-l-2 border-[#174b32] bg-[#174b32]/5 px-4 py-3 text-xs text-[#174b32]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-between border border-[#101b18] bg-[#101b18] px-5 py-4 text-left text-white transition hover:bg-[#174b32] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-[9px] uppercase tracking-[0.2em]">
                {loading
                  ? editingProduct
                    ? "Saving changes..."
                    : "Adding product..."
                  : editingProduct
                    ? "Save changes"
                    : "Add product"}
              </span>

              <span>→</span>
            </button>
          </form>
        </div>

        {/* ============================================================
            PRODUCT LIST
        ============================================================ */}

        <div className="mt-12">
          <div className="flex items-end justify-between border-b border-[#101b18]/10 pb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Catalogue
              </p>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl">
                Products
              </h2>
            </div>

            <span className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
              {products.length} total
            </span>
          </div>

          {loadingProducts ? (
            <div className="py-16 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                Loading products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="border-b border-[#101b18]/10 py-16 text-center">
              <p className="font-['Playfair_Display'] text-2xl">
                No products yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden border border-[#101b18]/10 bg-white"
                >
                  <div className="aspect-square bg-[#e8e3d8]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlaceholder label="No image" />
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#174b32]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 font-['Playfair_Display'] text-lg leading-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#101b18]/55">
                      ₦{Number(product.price).toLocaleString("en-NG")}
                    </p>

                    <p
                      className={`mt-3 text-[8px] uppercase tracking-[0.15em] ${
                        product.is_active
                          ? "text-[#174b32]"
                          : "text-black/30"
                      }`}
                    >
                      {product.is_active ? "Live on store" : "Hidden"}
                    </p>

                    {/* ACTIONS */}

                    <div className="mt-4 grid grid-cols-3 border-t border-[#101b18]/10">
                      <button
                        type="button"
                        onClick={() => startEditing(product)}
                        className="border-r border-[#101b18]/10 py-3 text-[8px] uppercase tracking-[0.12em] text-[#101b18]/60 transition hover:bg-[#f3f0e8] hover:text-[#174b32]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleProductStatus(product)}
                        className="border-r border-[#101b18]/10 py-3 text-[8px] uppercase tracking-[0.12em] text-[#101b18]/60 transition hover:bg-[#f3f0e8] hover:text-[#174b32]"
                      >
                        {product.is_active ? "Hide" : "Show"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product)}
                        className="py-3 text-[8px] uppercase tracking-[0.12em] text-[#101b18]/60 transition hover:bg-red-50 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    store_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    instagram_url: "",
    facebook_url: "",
    tiktok_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const { data, error } = await supabase
        .from("store_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error loading store settings:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setSettings({
          store_name: data.store_name ?? "",
          phone: data.phone ?? "",
          whatsapp: data.whatsapp ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          instagram_url: data.instagram_url ?? "",
          facebook_url: data.facebook_url ?? "",
          tiktok_url: data.tiktok_url ?? "",
        });
      }

      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleChange = (
    field: keyof typeof settings,
    value: string,
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const { data: existing, error: existingError } = await supabase
      .from("store_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existingError) {
      console.error("Error checking store settings:", existingError);
      alert("Could not save store details.");
      setSaving(false);
      return;
    }

    let error;

    if (existing) {
      const result = await supabase
        .from("store_settings")
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      error = result.error;
    } else {
      const result = await supabase
        .from("store_settings")
        .insert({
          ...settings,
        });

      error = result.error;
    }

    if (error) {
      console.error("Error saving store settings:", error);
      alert("Could not save store details.");
      setSaving(false);
      return;
    }

    alert("Store details saved successfully.");
    setSaving(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f0e8] text-[#101b18]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#101b18]/40">
          Loading store details...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      <header className="border-b border-[#101b18]/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              FOBCA Limited
            </p>

            <h1 className="mt-1 font-['Playfair_Display'] text-2xl">
              Store Details
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            ← Dashboard
          </button>
        </div>
      </header>



      <div className="mx-auto max-w-[1000px] px-6 py-10 sm:px-10 lg:py-14">
        <form onSubmit={handleSave}>
          <div className="border border-[#101b18]/10 bg-white p-6 sm:p-8 lg:p-10">
            <div className="border-b border-[#101b18]/10 pb-7">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Business information
              </p>

              <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
                FOBCA details
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#101b18]/50">
                These details can be used across the FOBCA website and store.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Company Name
                </label>

                <input
                  type="text"
                  value={settings.store_name}
                  onChange={(event) =>
                    handleChange("store_name", event.target.value)
                  }
                  placeholder="FOBCA Limited"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Email
                </label>

                <input
                  type="email"
                  value={settings.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="hello@fobca.com"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Phone
                </label>

                <input
                  type="text"
                  value={settings.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  placeholder="08000000000"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  WhatsApp
                </label>

                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(event) =>
                    handleChange("whatsapp", event.target.value)
                  }
                  placeholder="08000000000"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Address
                </label>

                <textarea
                  value={settings.address}
                  onChange={(event) =>
                    handleChange("address", event.target.value)
                  }
                  placeholder="FOBCA office address"
                  rows={3}
                  className="mt-2 w-full resize-none border border-[#101b18]/15 bg-transparent p-4 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border border-[#101b18]/10 bg-white p-6 sm:p-8 lg:p-10">
            <div className="border-b border-[#101b18]/10 pb-7">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Social media
              </p>

              <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
                Social links
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Instagram
                </label>

                <input
                  type="url"
                  value={settings.instagram_url}
                  onChange={(event) =>
                    handleChange("instagram_url", event.target.value)
                  }
                  placeholder="https://instagram.com/..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Facebook
                </label>

                <input
                  type="url"
                  value={settings.facebook_url}
                  onChange={(event) =>
                    handleChange("facebook_url", event.target.value)
                  }
                  placeholder="https://facebook.com/..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  TikTok
                </label>

                <input
                  type="url"
                  value={settings.tiktok_url}
                  onChange={(event) =>
                    handleChange("tiktok_url", event.target.value)
                  }
                  placeholder="https://tiktok.com/@..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-5">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/45 transition hover:text-[#101b18]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#174b32] px-1 py-2 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save store details"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
/* =========================================================
   APP ROUTER
========================================================= */

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", updatePath);

    return () => {
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  useEffect(() => {
    console.log("Supabase client:", supabase);
  }, []);

  if (path === "/admin") {
    return <AdminLoginPage />;
  }

  if (path === "/admin/dashboard") {
    return <AdminDashboardPage />;
  }

  if (path === "/admin/settings") {
  return <AdminSettingsPage />;
}

  if (path === "/admin/products") {
    return <AdminProductsPage />;
  }

  if (path === "/furniture" || path === "/store") {
    return <FurnitureStorePage />;
  }

  const department = departments.find(
    (item) => item.path === path && !item.available,
  );

  if (department) {
    return <ComingSoonPage department={department} />;
  }

  return <HomePage />;
}