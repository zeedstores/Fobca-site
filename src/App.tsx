import { useEffect, useState } from "react";
import heroVideo from "./imports/VID-20261005-WA0000.mp4";
import fobcaBanner from "./imports/fobca-banner.png";
import fobcaImage from "./imports/Fobca-image.png";
import { supabase } from "./lib/supabase";
import homeBanner from "./imports/home-banner.png";
import homeBannerMobile from "./imports/home-banner-mobile.png";

type Department = {
  name: string;
  eyebrow: string;
  path: string;
  available?: boolean;
};

type CustomerMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  rating: number | null;
  message: string;
  is_read: boolean;
  created_at: string;
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

  youtube_url: string | null;
  linkedin_url: string | null;
  x_url: string | null;

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
    name: "Furnitures",
    eyebrow: "Available now",
    path: "/furniture",
    available: true,
  },
  {
    name: "Oil & Gas",
    eyebrow: "Coming soon",
    path: "/oil-gas",
    available: false,
  },
  {
    name: "Building & Interiors ",
    eyebrow: "Coming soon",
    path: "/building-interior",
    available: false,
  },
  {
    name: "Constructions",
    eyebrow: "Coming soon",
    path: "/construction",
    available: false,
  },
  {
    name: "Architectural Designs",
    eyebrow: "Coming soon",
    path: "/architecture",
    available: false,
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
  className={`mx-auto flex ${
    store ? "h-20 sm:h-24" : "h-24"
  } w-[calc(100%-40px)] max-w-[1280px] items-center justify-between border-b ${borderColor} sm:w-[calc(100%-64px)]`}
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
  className={`absolute left-0 right-0 ${
    store ? "top-20 sm:top-24" : "top-24"
  } border-b px-5 pb-7 pt-3 md:hidden ${
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
   SOCIAL ICONS
========================================================= */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5V14h2.5v7h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5.2 8.4H1.6V20h3.6V8.4ZM3.4 3A2.1 2.1 0 1 0 3.4 7.2 2.1 2.1 0 0 0 3.4 3ZM20.4 13.4c0-3.5-1.9-5.2-4.5-5.2-2.1 0-3 1.2-3.5 2v-1.8H8.8V20h3.6v-5.7c0-1.5.3-3 2.2-3 1.8 0 1.8 1.7 1.8 3.1V20H20v-6.6Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.2 2H22l-8.3 9.5L23.5 22h-7.4l-5.8-7.1L4.1 22H.3l8.9-10.2L.5 2H8l5.2 6.5L18.2 2Zm-1.3 17.8H19L6.9 4H4.7l12.2 15.8Z" />
    </svg>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  console.log("FOOTER COMPONENT RENDERED");

  const [storeSettings, setStoreSettings] =
    useState<StoreSettings | null>(null);

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

  /*
    These extra social fields are read safely even if your current
    StoreSettings type has not been updated yet.
  */
  const socialSettings = storeSettings as
    | (StoreSettings & {
        youtube_url?: string | null;
        linkedin_url?: string | null;
        x_url?: string | null;
      })
    | null;

  const socialLinks = [
    {
      name: "Facebook",
      url: socialSettings?.facebook_url,
      icon: <FacebookIcon />,
    },
    {
      name: "Instagram",
      url: socialSettings?.instagram_url,
      icon: <InstagramIcon />,
    },
    {
      name: "YouTube",
      url: socialSettings?.youtube_url,
      icon: <YouTubeIcon />,
    },
    {
      name: "LinkedIn",
      url: socialSettings?.linkedin_url,
      icon: <LinkedInIcon />,
    },
    {
      name: "X",
      url: socialSettings?.x_url,
      icon: <XIcon />,
    },
  ];

  const hasSocialLinks = socialLinks.some((social) => social.url);

  return (
    <footer className="bg-[#101b18] px-5 py-14 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid gap-14 border-b border-white/10 pb-12 md:grid-cols-2">

          {/* BRAND */}

          <div>
            <Logo inverse />

            <p className="mt-5 text-sm font-medium tracking-wide text-white/70">
              We realize your dreams.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">
              Premium Imported Furniture &amp; Home Solutions
            </p>

            {/* ONLINE BUSINESS LOCATION */}

            <p className="mt-6 max-w-md text-[10px] uppercase leading-6 tracking-[0.13em] text-white/35">
              Lagos, Nigeria
              <span className="mx-2 text-white/20">·</span>
              Online Furniture Business
              <span className="mx-2 text-white/20">·</span>
              Nationwide Delivery
            </p>
          </div>

          {/* LINKS */}

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

            {/* QUICK LINKS */}

            <div className="flex flex-col gap-3">
              <strong className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Quick Links
              </strong>

              <button
                onClick={() => navigate("/")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => {
                  navigate("/");

                  window.setTimeout(() => {
                    document
                      .querySelector("#about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 80);
                }}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                About Us
              </button>

              <button
                onClick={() => navigate("/furniture")}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Products
              </button>

              <button
                onClick={() => {
                  navigate("/");

                  window.setTimeout(() => {
                    document
                      .querySelector("#departments")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 80);
                }}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Services
              </button>

              <button
                onClick={() => {
                  navigate("/");

                  window.setTimeout(() => {
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 80);
                }}
                className="text-left text-sm text-white/65 transition hover:text-white"
              >
                Contact Us
              </button>
            </div>

            {/* CONTACT */}

            <div className="flex flex-col gap-3">
              <strong className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/35">
                Contact Us
              </strong>

              {storeSettings?.phone && (
                <a
                  href={`tel:${storeSettings.phone}`}
                  className="flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                >
                  <span className="text-xs text-white/40">☎</span>
                  <span>{storeSettings.phone}</span>
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
                  className="flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                >
                  <span className="text-xs text-white/40">💬</span>
                  <span>WhatsApp</span>
                </a>
              )}

              {storeSettings?.email && (
                <a
                  href={`mailto:${storeSettings.email}`}
                  className="flex items-start gap-2 break-all text-sm text-white/65 transition hover:text-white"
                >
                  <span className="mt-0.5 shrink-0 text-xs text-white/40">
                    ✉
                  </span>

                  <span>{storeSettings.email}</span>
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
                !storeSettings.email && (
                  <span className="text-sm text-white/40">
                    Contact details coming soon
                  </span>
                )}
            </div>

            {/* DELIVERY + SOCIAL */}

            <div className="col-span-2 flex flex-col gap-7 sm:col-span-1">

              {/* DELIVERY */}

              <div>
                <strong className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Delivery
                </strong>

                <p className="max-w-[180px] text-sm leading-6 text-white/65">
                  Nationwide Delivery Available
                </p>
              </div>

              {/* SOCIAL MEDIA */}

              <div>
                <strong className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Follow Us
                </strong>

                {hasSocialLinks ? (
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map(
                      (social) =>
                        social.url && (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Follow FOBCA Limited on ${social.name}`}
                            title={social.name}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#101b18]"
                          >
                            {social.icon}
                          </a>
                        ),
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-white/35">
                    Social links coming soon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col justify-between gap-3 pt-5 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Fobca Limited. All Rights Reserved.
          </span>

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
  const [storeSettings, setStoreSettings] =
    useState<StoreSettings | null>(null);

  // =====================================================
  // CUSTOMER MESSAGE FORM
  // =====================================================

  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [messageSending, setMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageError, setMessageError] = useState("");

  const toggleSound = () => {
    setSoundOn((current) => !current);
  };

  // =====================================================
  // HEADER SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setHeaderDark(window.scrollY > heroHeight - 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =====================================================
  // LOAD FEATURED PRODUCTS
  // =====================================================

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

  // =====================================================
  // LOAD STORE SETTINGS
  // =====================================================

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

  // =====================================================
  // CUSTOMER MESSAGE SUBMIT
  // =====================================================

  const handleMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setMessageSending(true);
    setMessageSent(false);
    setMessageError("");

    const { error } = await supabase.from("customer_messages").insert({
      name: messageForm.name.trim(),
      email: messageForm.email.trim(),
      phone: messageForm.phone.trim() || null,
      message: messageForm.message.trim(),
    });

    if (error) {
      console.error("Error sending customer message:", error);

      setMessageError(
        "We couldn't send your message right now. Please try again.",
      );

      setMessageSending(false);
      return;
    }

    setMessageForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setMessageSent(true);
    setMessageSending(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#101b18]">

      {/* =====================================================
          HEADER
      ===================================================== */}

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

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-10 md:flex">

            {/* HOME */}
            <button
              onClick={() => navigate("/")}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark
                  ? "text-[#101b18]"
                  : "text-white"
              }`}
            >
              Home
            </button>

            {/* ABOUT US */}
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
              About Us
            </button>

            {/* FURNITURE */}
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

            {/* DEPARTMENTS */}
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

            {/* CONTACT US */}
            <button
              onClick={() => {
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-[11px] uppercase tracking-[0.2em] transition duration-500 ${
                headerDark
                  ? "text-[#101b18]/65 hover:text-[#101b18]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-10 w-10 flex-col items-end justify-center gap-2 md:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-px w-7 transition-all duration-500 ${
                headerDark ? "bg-[#101b18]" : "bg-white"
              } ${
                menuOpen
                  ? "translate-y-[4.5px] -rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-px w-5 transition-all duration-500 ${
                headerDark ? "bg-[#101b18]" : "bg-white"
              } ${
                menuOpen
                  ? "-translate-y-[4.5px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>

        {/* MOBILE NAV */}
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
                About Us
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/furniture");
                }}
                className="border-b border-white/10 py-5 text-left text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Furniture
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
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-5 text-left text-xs uppercase tracking-[0.2em] text-white/70"
              >
                Contact Us
              </button>

            </nav>
          </div>
        )}
      </header>

     {/* HERO */}
<section
  id="qdcwfs"
  className="relative min-h-[100svh] overflow-hidden bg-[#101b18]"
>
  {/* HERO BANNER */}
 <picture className="absolute inset-0">
  <source
    media="(max-width: 639px)"
    srcSet={homeBannerMobile}
  />

  <img
    src={homeBanner}
    alt="FOBCA Limited"
    className="h-full w-full object-cover object-center"
  />
</picture>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/30" />

  {/* BOTTOM DARKENING */}
  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

  {/* HERO CONTENT */}
  <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] items-end px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
    <div className="max-w-4xl">

      <p className="mb-6 text-[10px] uppercase tracking-[0.35em] text-white/70 sm:text-xs">
        FOBCA LIMITED
      </p>

      <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[100px]">
        We realize
        <br />
        <span className="font-light italic">
          your dreams.
        </span>
      </h1>

      <div className="mt-8 flex max-w-xl items-start gap-5">
        <span className="mt-2 h-px w-12 shrink-0 bg-white/60" />
      </div>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-8 inline-flex items-center gap-5 bg-white/80 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-[#101b18] transition duration-300 hover:bg-white"
      >
        Explore Furniture
        <span className="text-base leading-none">
          →
        </span>
      </button>
    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-9 left-6 z-20 hidden items-center gap-4 sm:flex lg:left-16">
    <span className="h-12 w-px bg-white/40" />
    <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">
      Scroll to explore
    </span>
  </div>
</section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="relative overflow-hidden bg-[#f3f0e8] px-6 py-18 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
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

          {/* ABOUT STATEMENT */}
          <div className="mt-4 lg:mt-16">
            <p className="max-w-4xl font-serif text-xl leading-[1.2] tracking-[-0.02em] text-[#101b18] sm:text-3xl md:text-4xl lg:text-6xl">
              Fobca Limited is a premium furniture company offering
              <span className="font-light italic text-[#174b32]">
                {" "}
                carefully selected imported furniture
              </span>{" "}
              from China, Dubai, Egypt and Turkiye designed to bring comfort,
              elegance and functionality into modern spaces.
            </p>
          </div>

          {/* APPROACH + COMPANY DESCRIPTION */}
          <div className="mt-6 grid gap-16 border-t border-[#101b18]/15 pt-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:pt-16">

            {/* OUR APPROACH */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#101b18]/40">
                Our Approach
              </p>

              <div className="mt-8 flex items-start gap-5">
                <span className="mt-1 font-serif text-5xl leading-none text-[#174b32]/25">
                  “
                </span>

                <p className="max-w-xs font-serif text-xl leading-8 text-[#101b18]/75">
                  We don't just sell furniture.
                  <br />
                  We provide carefully selected furniture solutions that bring
                  comfort, functionality and elegance into your home, office
                  and commercial spaces.
                </p>
              </div>
            </div>

            {/* COMPANY DESCRIPTION */}
            <div className="max-w-md">

             
              {/* COMPACT BRAND SIGNATURE */}
              <div className="mt-6 border-t border-[#101b18]/15 pt-4">
                <p className="font-serif text-2xl leading-none text-[#101b18]">
                  Fobca Limited
                </p>

                <p className="mt-2 origin-left -skew-x-10 font-serif text-lg italic leading-none tracking-[-0.025em] text-[#174b32]">
                  We realize your dreams.
                </p>
              </div>

              {/* ORIGIN */}
              <div className="mt-5">
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#101b18]/40">
                  China · Dubai · Egypt · Turkiye
                </span>
              </div>
            </div>
          </div>

          {/* HOMEPAGE STORE */}
          <div className="mt-6 border-t border-[#101b18]/15 pt-14 sm:mt-24 sm:pt-16">

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
                <article
                  key={product.id}
                  className="group"
                >

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

      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

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
                <span className="font-light italic">
                  {" "}furniture.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              Explore the different sides of FOBCA, from furniture to the
              businesses we're building next.
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
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`font-serif text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl ${
                      department.available
                        ? "text-white transition group-hover:translate-x-2"
                        : "text-white/35 transition group-hover:text-white/55"
                    }`}
                  >
                    <span className="text-[#d8961c]">
                      {department.name.charAt(0)}
                    </span>

                    {department.name.slice(1)}
                  </span>

                </div>

                <div className="flex items-center gap-5">

                  <span className="hidden text-[9px] uppercase tracking-[0.2em] text-white/35 sm:block">
                    {department.available
                      ? "Explore"
                      : "Coming soon"}
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

      {/* =====================================================
          OUR BUSINESSES & AREAS OF EXPANSION
      ===================================================== */}

      <section
        id="businesses"
        className="bg-[#f3f0e8] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      >

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-10 border-b border-[#101b18]/15 pb-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#174b32]/65">
                Our businesses
              </p>

              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Our Businesses
                <span className="font-light italic text-[#174b32]">
                  {" "} &amp; Areas of Expansion
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#101b18]/55 lg:ml-auto">
              Fobca Limited is building a diversified business group with
              interests in furniture, transportation, real estate, building
              and interior decoration, construction, architectural design,
              and the Oil &amp; Gas sector.
            </p>

          </div>

          <div className="mt-16 divide-y divide-[#101b18]/10 border-y border-[#101b18]/10">

            {/* FURNITURE */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                01
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Fobca Furniture
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Premium imported furniture and furnishing solutions.
                </p>
              </div>

              <button
                onClick={() => navigate("/furniture")}
                className="flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#174b32]"
              >
                Explore
                <span>→</span>
              </button>
            </div>

            {/* FOBCA LINE */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                02
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Fobca Line
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Transportation and mobility solutions.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

            {/* FOBCA RESIDENCE */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                03
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Fobca Residence
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Residential property and lifestyle solutions.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

            {/* BUILDING & INTERIOR */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                04
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Building &amp; Interior Decorations
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Building finishing, interior decoration and space
                  transformation.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

            {/* CONSTRUCTION */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                05
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Construction
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Construction and property development.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

            {/* ARCHITECTURAL DESIGNS */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                06
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Architectural Designs
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Architectural planning and creative building designs.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

            {/* OIL & GAS */}
            <div className="grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[10px] text-[#101b18]/30">
                07
              </span>

              <div>
                <h3 className="font-serif text-2xl tracking-[-0.02em] sm:text-3xl">
                  Oil &amp; Gas
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#101b18]/50 sm:text-sm">
                  Future business interests and opportunities within the
                  Oil &amp; Gas sector.
                </p>
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/30">
                Coming soon
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FOBCA FILM
      ===================================================== */}

      <section className="bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                The FOBCA experience
              </p>

              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                A closer look at
                <span className="font-light italic text-[#d8961c]">
                  {" "}FOBCA.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/45">
              Discover the spaces, details and moments behind the brand.
            </p>

          </div>

          <div className="relative overflow-hidden bg-black">

            <video
              className="block aspect-video w-full object-cover"
              src={heroVideo}
              autoPlay
              muted={!soundOn}
              loop
              playsInline
              preload="auto"
              controls
            />

            <button
              onClick={toggleSound}
              aria-label={
                soundOn
                  ? "Mute video"
                  : "Turn video sound on"
              }
              className="absolute bottom-5 right-5 z-20 flex items-center gap-3 border border-white/30 bg-black/20 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm transition hover:border-white hover:text-white sm:bottom-6 sm:right-6"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  soundOn
                    ? "bg-white"
                    : "border border-white/70"
                }`}
              />

              {soundOn ? "Sound On" : "Sound Off"}
            </button>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY FOBCA
      ===================================================== */}

      <section
        className="bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      >

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Why Fobca?
              </p>

              <h2 className="mt-6 max-w-md font-serif text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Selected with
                <span className="font-light italic text-[#d8961c]">
                  {" "}purpose.
                </span>
              </h2>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">

              {/* PREMIUM SELECTION */}
              <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-serif text-xl">
                  Premium Selection
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  Distinctive furniture designs sourced internationally.
                </p>
              </div>

              {/* QUALITY */}
              <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-serif text-xl">
                  Quality &amp; Functionality
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  Products selected for comfort, practicality and durability.
                </p>
              </div>

              {/* CONVENIENT SHOPPING */}
              <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-serif text-xl">
                  Convenient Shopping
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  Browse and order from anywhere.
                </p>
              </div>

              {/* RELIABLE DELIVERY */}
              <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-serif text-xl">
                  Reliable Delivery
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  We coordinate delivery to your location.
                </p>
              </div>

              {/* CUSTOMER SERVICE */}
              <div className="grid gap-3 py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                <h3 className="font-serif text-xl">
                  Customer-Focused Service
                </h3>

                <p className="text-sm leading-7 text-white/50">
                  We are available before and after your purchase.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FURNITURE FEATURE
      ===================================================== */}

      <section className="bg-[#ded8ca] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40">

        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-24">

          <div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#174b32]/70">
              FOBCA Furniture
            </p>

            <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#101b18] sm:text-6xl lg:text-7xl">
              Designed for
              <span className="italic font-light">
                {" "}living.
              </span>
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

      {/* =====================================================
          CUSTOMER FEEDBACK & ENQUIRIES
      ===================================================== */}

      <section
        id="customer-feedback"
        className="bg-[#f3f0e8] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      >

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

            {/* LEFT */}
            <div>

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#174b32]/65">
                Customer feedback
              </p>

              <h2 className="mt-6 max-w-lg font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                We'd love to
                <span className="font-light italic text-[#174b32]">
                  {" "}hear from you.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-[#101b18]/55">
                Have a question, need help with an order, or want to share
                your experience with FOBCA? Send us a message and our team
                will get back to you.
              </p>

              <div className="mt-10 border-t border-[#101b18]/15 pt-6">

                <p className="text-[9px] uppercase tracking-[0.25em] text-[#101b18]/40">
                  Direct contact
                </p>

                <div className="mt-4 space-y-3">

                  {storeSettings?.phone && (
                    <a
                      href={`tel:${storeSettings.phone}`}
                      className="block text-sm text-[#101b18]/65 transition hover:text-[#174b32]"
                    >
                      {storeSettings.phone}
                    </a>
                  )}

                  {storeSettings?.email && (
                    <a
                      href={`mailto:${storeSettings.email}`}
                      className="block break-all text-sm text-[#101b18]/65 transition hover:text-[#174b32]"
                    >
                      {storeSettings.email}
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
                      className="block text-sm text-[#101b18]/65 transition hover:text-[#174b32]"
                    >
                      WhatsApp
                    </a>
                  )}

                </div>
              </div>
            </div>

            {/* RIGHT - FORM */}
            <div>

              <form
                onSubmit={handleMessageSubmit}
                className="border-t border-[#101b18]/15 pt-8"
              >

                <div className="grid gap-8 sm:grid-cols-2">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/40"
                    >
                      Your Name
                    </label>

                    <input
                      id="customer-name"
                      type="text"
                      required
                      value={messageForm.name}
                      onChange={(event) =>
                        setMessageForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      className="mt-3 w-full border-0 border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm text-[#101b18] outline-none transition placeholder:text-[#101b18]/25 focus:border-[#174b32]"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="customer-email"
                      className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/40"
                    >
                      Email Address
                    </label>

                    <input
                      id="customer-email"
                      type="email"
                      required
                      value={messageForm.email}
                      onChange={(event) =>
                        setMessageForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className="mt-3 w-full border-0 border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm text-[#101b18] outline-none transition placeholder:text-[#101b18]/25 focus:border-[#174b32]"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="customer-phone"
                      className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/40"
                    >
                      Phone Number
                      <span className="ml-2 text-[#101b18]/25">
                        Optional
                      </span>
                    </label>

                    <input
                      id="customer-phone"
                      type="tel"
                      value={messageForm.phone}
                      onChange={(event) =>
                        setMessageForm((current) => ({
                          ...current,
                          phone: event.target.value,
                        }))
                      }
                      className="mt-3 w-full border-0 border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm text-[#101b18] outline-none transition placeholder:text-[#101b18]/25 focus:border-[#174b32]"
                      placeholder="0800 000 0000"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="customer-message"
                      className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/40"
                    >
                      Message
                    </label>

                    <textarea
                      id="customer-message"
                      required
                      rows={5}
                      value={messageForm.message}
                      onChange={(event) =>
                        setMessageForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      className="mt-3 w-full resize-none border-0 border-b border-[#101b18]/20 bg-transparent px-0 py-3 text-sm leading-7 text-[#101b18] outline-none transition placeholder:text-[#101b18]/25 focus:border-[#174b32]"
                      placeholder="How can we help you?"
                    />
                  </div>

                </div>

                {/* SUCCESS */}
                {messageSent && (
                  <p className="mt-6 text-xs leading-6 text-[#174b32]">
                    Thank you. Your message has been received. We'll get
                    back to you shortly.
                  </p>
                )}

                {/* ERROR */}
                {messageError && (
                  <p className="mt-6 text-xs leading-6 text-red-700">
                    {messageError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={messageSending}
                  className="mt-8 inline-flex items-center gap-5 bg-[#174b32] px-6 py-4 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {messageSending
                    ? "Sending..."
                    : "Send Message"}

                  <span className="text-base leading-none">
                    →
                  </span>
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="bg-[#f3f0e8] px-6 py-28 sm:px-10 sm:py-40 lg:px-16 lg:py-48">

        <div className="mx-auto max-w-[1200px] text-center">

          <p className="text-[10px] uppercase tracking-[0.35em] text-[#174b32]/60">
            FOBCA LIMITED
          </p>

          <h2 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#101b18] sm:text-6xl lg:text-8xl">
            We are building
            <br />
            <span className="italic font-light">
              what comes next.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[#101b18]/55 sm:text-base">
            Furniture. Oil &amp; Gas. Construction. Architectural Design. A
            growing company creating solutions for modern Nigeria.
          </p>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="contact"
        className="bg-[#0d2d20] px-6 py-16 text-white sm:px-10 lg:px-16"
      >

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto]">

            {/* BRAND */}
            <div>

              <img
                src="/assets/fobca-logo-source.png"
                alt="FOBCA Limited"
                className="h-14 w-auto object-contain brightness-0 invert"
              />

              <p className="mt-5 text-sm font-medium tracking-wide text-white/70">
                FOBCA LIMITED
                <span className="mx-2 text-white/25">
                  |
                </span>
                RC No. 1816516
              </p>

              <p className="mt-2 text-sm font-medium tracking-wide text-white/70">
                We realize your dreams.
              </p>

              <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">
                Premium Imported Furniture &amp; Home Solutions
              </p>

              <p className="mt-6 max-w-md text-[10px] uppercase leading-6 tracking-[0.13em] text-white/35">
                Lagos, Nigeria
                <span className="mx-2 text-white/20">
                  ·
                </span>
                Online Furniture Business
                <span className="mx-2 text-white/20">
                  ·
                </span>
                Nationwide Delivery
              </p>

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
                  Oil &amp; Gas
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

                {/* PHONE */}
                {storeSettings?.phone && (
                  <a
                    href={`tel:${storeSettings.phone}`}
                    className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <span className="text-xs text-white/35">
                      ☎
                    </span>

                    <span>
                      {storeSettings.phone}
                    </span>
                  </a>
                )}

                {/* WHATSAPP */}
                {storeSettings?.whatsapp && (
                  <a
                    href={`https://wa.me/${storeSettings.whatsapp.replace(
                      /\D/g,
                      "",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                  >
                    <span className="text-xs text-white/35">
                      💬
                    </span>

                    <span>
                      WhatsApp
                    </span>
                  </a>
                )}

                {/* EMAIL */}
                {storeSettings?.email && (
                  <a
                    href={`mailto:${storeSettings.email}`}
                    className="flex items-start gap-2 break-all text-sm text-white/60 transition hover:text-white"
                  >
                    <span className="mt-0.5 shrink-0 text-xs text-white/35">
                      ✉
                    </span>

                    <span>
                      {storeSettings.email}
                    </span>
                  </a>
                )}

                {/* SOCIAL MEDIA */}
                <div className="mt-3">

                  <span className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Follow Us
                  </span>

                  <div className="flex flex-wrap gap-2">

                    {/* FACEBOOK */}
                    {storeSettings?.facebook_url && (
                      <a
                        href={storeSettings.facebook_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        title="Facebook"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
                      >
                        <FacebookIcon />
                      </a>
                    )}

                    {/* INSTAGRAM */}
                    {storeSettings?.instagram_url && (
                      <a
                        href={storeSettings.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
                      >
                        <InstagramIcon />
                      </a>
                    )}

                    {/* YOUTUBE */}
                    {storeSettings?.youtube_url && (
                      <a
                        href={storeSettings.youtube_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="YouTube"
                        title="YouTube"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
                      >
                        <YouTubeIcon />
                      </a>
                    )}

                    {/* LINKEDIN */}
                    {storeSettings?.linkedin_url && (
                      <a
                        href={storeSettings.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
                      >
                        <LinkedInIcon />
                      </a>
                    )}

                    {/* X */}
                    {storeSettings?.x_url && (
                      <a
                        href={storeSettings.x_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="X"
                        title="X"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
                      >
                        <XIcon />
                      </a>
                    )}

                  </div>
                </div>

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

            <span>
              © {new Date().getFullYear()} Fobca Limited. All Rights Reserved.
            </span>

            <span>
              We realize your dreams.
            </span>

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

import bedsImage from "./imports/beds.jpeg";
import sofasImage from "./imports/sofas.jpeg";
import diningImage from "./imports/dining.jpeg";
import coffeeTablesImage from "./imports/coffee-tables.jpeg";
import shoeRacksImage from "./imports/shoe-racks.jpeg";
import rockingChairsImage from "./imports/rocking-chairs.jpeg";
import bedsideLampsImage from "./imports/bedside-lamps.jpeg";

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

  /* =========================================================
     COLLECTIONS
  ========================================================= */

  const collections = [
    {
      name: "Beds",
      image: bedsImage,
      description: "Comfortable pieces for considered bedrooms.",
      details: "",
    },
    {
      name: "Sofas",
      image: sofasImage,
      description: "Refined seating for modern living spaces.",
      details: "",
    },
    {
      name: "Dining",
      image: diningImage,
      description: "Designed for everyday gathering and entertaining.",
      details: "",
    },
    {
      name: "Adjustable Coffee Tables",
      image: coffeeTablesImage,
      description: "Flexible forms designed around your space.",
      details: "Walnut · Black · Oak · White",
    },
    {
      name: "Premium Shoe Racks",
      image: shoeRacksImage,
      description: "Practical storage with a refined finish.",
      details: "White Oak · Teak Wood",
    },
    {
      name: "Rocking Chairs",
      image: rockingChairsImage,
      description: "Comfortable statement pieces in distinctive colours.",
      details:
        "Orange · Coffee · Brown · Off-white · Green · Dark Grey · Purple · Grey",
    },
    {
      name: "Bedside Table Lamps",
      image: bedsideLampsImage,
      description: "Soft lighting with convenient modern controls.",
      details: "Remote Control · Soft Touch",
    },
  ];

  const handleCollectionClick = (category: string) => {
    setActiveCategory(category);
    setSearch("");

    setTimeout(() => {
      document
        .getElementById("store-products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <>
      <Header store />

      <main className="bg-[#fbfaf6]">

        {/* =====================================================
            STORE HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#ded8ca]">

          {/* MOBILE — FULL IMAGE */}

          <div className="relative block sm:hidden">

            <img
              src={fobcaBanner}
              alt="FOBCA Furniture"
              className="block h-auto w-full"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute inset-0 z-10 flex items-center">
              <div className="mx-auto w-full px-5">
                <div className="max-w-[320px] text-white">

                 
                  <h1 className="mt-6 font-['Playfair_Display'] text-[clamp(2.5rem,10vw,4rem)] font-normal leading-[0.9] tracking-[-0.05em]">
                    Furniture <br /> for
                    <br />
                    beautiful spaces.
                  </h1>

                  

                </div>
              </div>
            </div>

          </div>

          {/* DESKTOP */}

          <div className="relative hidden min-h-[560px] sm:block sm:min-h-[620px]">

            <img
              src={fobcaBanner}
              alt="FOBCA Furniture"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="relative z-10 flex min-h-[560px] items-center sm:min-h-[620px]">

              <div className="mx-auto w-full max-w-[1400px] px-10 lg:px-20 xl:px-28">

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

          </div>

        </section>


        {/* =====================================================
            STORE CONTROLS
        ===================================================== */}

        <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 lg:px-20 xl:px-28">

          {/* SEARCH */}

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


          {/* =====================================================
              OUR COLLECTIONS
          ===================================================== */}

          <section className="mt-20">

            <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-6 sm:flex-row sm:items-end">

              <div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#174b32]">
                  Explore
                </p>

                <h2 className="mt-3 font-['Playfair_Display'] text-4xl font-normal leading-none tracking-[-0.03em] sm:text-5xl">
                  Our Collections
                </h2>

              </div>

              <p className="max-w-sm text-xs leading-6 text-black/45 sm:text-sm">
                Explore carefully selected furniture pieces for every
                part of your space.
              </p>

            </div>


            {/* COLLECTION GRID */}

            <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

              {collections.map((collection, index) => (

                <button
                  key={collection.name}
                  onClick={() => handleCollectionClick(collection.name)}
                  className="group text-left"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[0.86] overflow-hidden bg-[#e8e3d8]">

                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                    />

                    {/* NUMBER */}

                    <span className="absolute left-3 top-3 font-mono text-[8px] tracking-[0.15em] text-white/80 sm:left-4 sm:top-4">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* ARROW */}

                    <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center border border-white/50 bg-black/10 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:bottom-4 sm:right-4">
                      ↗
                    </span>

                  </div>


                  {/* TEXT */}

                  <div className="pt-4">

                    <h3 className="font-['Playfair_Display'] text-lg leading-[1.05] tracking-[-0.02em] text-[#101b18] sm:text-xl">
                      {collection.name}
                    </h3>

                    {collection.description && (
                      <p className="mt-2 max-w-sm text-[10px] leading-5 text-black/45 sm:text-xs sm:leading-6">
                        {collection.description}
                      </p>
                    )}

                    {collection.details && (
                      <p className="mt-2 text-[8px] uppercase leading-4 tracking-[0.12em] text-[#174b32]/70 sm:text-[9px]">
                        {collection.details}
                      </p>
                    )}

                  </div>

                </button>

              ))}

            </div>

          </section>


          {/* =====================================================
              SECTION HEADING
          ===================================================== */}

          <div className="mt-24 flex items-end justify-between border-b border-black/10 pb-5">

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


          {/* =====================================================
              PRODUCTS
          ===================================================== */}

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

                <article
                  key={product.id}
                  className="group"
                >

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
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const loadDashboardCounts = async () => {
      const { count: products, error: productError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (productError) {
        console.error("Error loading product count:", productError);
      } else {
        setProductCount(products ?? 0);
      }

      const { count: messages, error: messageError } = await supabase
        .from("customer_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      if (messageError) {
        console.error(
          "Error loading customer message count:",
          messageError
        );
      } else {
        setMessageCount(messages ?? 0);
      }
    };

    loadDashboardCounts();
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
        <div className="grid gap-5 md:grid-cols-3">
          {/* PRODUCTS */}
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

          {/* STORE DETAILS */}
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

          {/* CUSTOMER MESSAGES */}
          <button
            onClick={() => navigate("/admin/messages")}
            className="group border border-[#101b18]/10 bg-white p-7 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#174b32] hover:shadow-[0_12px_35px_rgba(16,27,24,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                  Customer Care
                </p>

                <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
                  Messages
                </h2>
              </div>

              {messageCount > 0 && (
                <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#174b32] px-2 text-xs font-medium text-white">
                  {messageCount}
                </span>
              )}
            </div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#101b18]/50">
              View customer enquiries, feedback, order support and other
              messages received through the website.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              View customer messages →
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
                Unread Messages
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                {messageCount}
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

function AdminMessagesPage() {
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
const [loading, setLoading] = useState(true);
const [selectedMessage, setSelectedMessage] =
  useState<CustomerMessage | null>(null);

  const loadMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("customer_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading customer messages:", error);
      setMessages([]);
    } else {
      setMessages(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("customer_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      console.error("Error marking message as read:", error);
      return;
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, is_read: true } : message
      )
    );

    setSelectedMessage((current) =>
      current?.id === id ? { ...current, is_read: true } : current
    );
  };

  const markAsUnread = async (id: string) => {
    const { error } = await supabase
      .from("customer_messages")
      .update({ is_read: false })
      .eq("id", id);

    if (error) {
      console.error("Error marking message as unread:", error);
      return;
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, is_read: false } : message
      )
    );

    setSelectedMessage((current) =>
      current?.id === id ? { ...current, is_read: false } : current
    );
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("customer_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting customer message:", error);
      return;
    }

    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );

    setSelectedMessage((current) =>
      current?.id === id ? null : current
    );
  };

 const openMessage = async (message: CustomerMessage) => {
    setSelectedMessage(message);

    if (!message.is_read) {
      await markAsRead(message.id);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      {/* HEADER */}
      <header className="border-b border-[#101b18]/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              FOBCA Limited
            </p>

            <h1 className="mt-1 font-['Playfair_Display'] text-2xl">
              Customer Messages
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        {/* PAGE INTRO */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#101b18]/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
              Customer Care
            </p>

            <h2 className="mt-3 font-['Playfair_Display'] text-4xl tracking-[-0.03em]">
              Inbox
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#101b18]/50">
              Read and manage enquiries, feedback and messages submitted
              through the FOBCA website.
            </p>
          </div>

          <button
            onClick={loadMessages}
            className="border border-[#101b18]/15 px-5 py-3 text-[9px] uppercase tracking-[0.2em] transition hover:border-[#174b32] hover:text-[#174b32]"
          >
            Refresh Messages
          </button>
        </div>

        {/* MESSAGE LIST */}
        {loading ? (
          <div className="border border-[#101b18]/10 bg-white p-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#101b18]/40">
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="border border-[#101b18]/10 bg-white px-6 py-20 text-center">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#101b18]/35">
              Inbox
            </p>

            <h3 className="mt-4 font-['Playfair_Display'] text-3xl">
              No messages yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#101b18]/45">
              Customer enquiries and feedback submitted through the website
              will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* INBOX LIST */}
            <div className="border-y border-[#101b18]/10">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`group flex w-full border-b border-[#101b18]/10 p-5 text-left transition last:border-b-0 hover:bg-white ${
                    selectedMessage?.id === message.id
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        {!message.is_read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[#174b32]" />
                        )}

                        <p
                          className={`truncate text-sm ${
                            message.is_read
                              ? "font-normal text-[#101b18]/70"
                              : "font-medium text-[#101b18]"
                          }`}
                        >
                          {message.name}
                        </p>
                      </div>

                      <span className="shrink-0 text-[9px] uppercase tracking-[0.08em] text-[#101b18]/35">
                        {formatDate(message.created_at)}
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-[#174b32]/70">
                      {message.type}
                    </p>

                    <p className="mt-2 truncate text-xs leading-6 text-[#101b18]/45">
                      {message.message}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* MESSAGE DETAIL */}
            <div className="min-h-[500px] border border-[#101b18]/10 bg-white">
              {!selectedMessage ? (
                <div className="flex min-h-[500px] items-center justify-center px-8 text-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#101b18]/30">
                      Select a message
                    </p>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-[#101b18]/45">
                      Select a customer message from the inbox to read the
                      full enquiry.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* MESSAGE HEADER */}
                  <div className="border-b border-[#101b18]/10 p-7 sm:p-9">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#174b32]/70">
                          {selectedMessage.type}
                        </p>

                        <h3 className="mt-3 font-['Playfair_Display'] text-3xl">
                          {selectedMessage.name}
                        </h3>

                        <p className="mt-2 text-xs text-[#101b18]/40">
                          {formatDate(selectedMessage.created_at)}
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit px-3 py-2 text-[9px] uppercase tracking-[0.15em] ${
                          selectedMessage.is_read
                            ? "bg-[#101b18]/5 text-[#101b18]/40"
                            : "bg-[#174b32] text-white"
                        }`}
                      >
                        {selectedMessage.is_read ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOMER DETAILS */}
                  <div className="grid gap-px border-b border-[#101b18]/10 bg-[#101b18]/10 sm:grid-cols-2">
                    <div className="bg-white p-6">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                        Email
                      </p>

                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="mt-2 block break-all text-sm text-[#174b32] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>

                    <div className="bg-white p-6">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                        Phone
                      </p>

                      {selectedMessage.phone ? (
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="mt-2 block text-sm text-[#174b32] hover:underline"
                        >
                          {selectedMessage.phone}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm text-[#101b18]/30">
                          Not provided
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RATING */}
                  {selectedMessage.rating && (
                    <div className="border-b border-[#101b18]/10 p-7 sm:p-9">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                        Customer Rating
                      </p>

                      <p className="mt-3 font-['Playfair_Display'] text-2xl">
                        {selectedMessage.rating}/5
                      </p>
                    </div>
                  )}

                  {/* MESSAGE */}
                  <div className="p-7 sm:p-9">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                      Message
                    </p>

                    <p className="mt-5 whitespace-pre-wrap text-sm leading-8 text-[#101b18]/70">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3 border-t border-[#101b18]/10 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                    <div className="flex flex-wrap gap-3">
                      {selectedMessage.is_read ? (
                        <button
                          onClick={() =>
                            markAsUnread(selectedMessage.id)
                          }
                          className="border border-[#101b18]/15 px-4 py-3 text-[9px] uppercase tracking-[0.16em] transition hover:border-[#174b32] hover:text-[#174b32]"
                        >
                          Mark Unread
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            markAsRead(selectedMessage.id)
                          }
                          className="bg-[#174b32] px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white transition hover:bg-[#101b18]"
                        >
                          Mark Read
                        </button>
                      )}

                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="border border-[#101b18]/15 px-4 py-3 text-[9px] uppercase tracking-[0.16em] transition hover:border-[#174b32] hover:text-[#174b32]"
                      >
                        Reply by Email
                      </a>

                      {selectedMessage.phone && (
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="border border-[#101b18]/15 px-4 py-3 text-[9px] uppercase tracking-[0.16em] transition hover:border-[#174b32] hover:text-[#174b32]"
                        >
                          Call Customer
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        deleteMessage(selectedMessage.id)
                      }
                      className="px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-red-700/60 transition hover:text-red-700"
                    >
                      Delete Message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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
    youtube_url: "",
    linkedin_url: "",
    x_url: "",
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
          youtube_url: data.youtube_url ?? "",
          linkedin_url: data.linkedin_url ?? "",
          x_url: data.x_url ?? "",
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
      {/* =====================================================
          HEADER
      ===================================================== */}

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

          {/* =====================================================
              BUSINESS INFORMATION
          ===================================================== */}

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

              {/* COMPANY NAME */}

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

              {/* EMAIL */}

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
                  placeholder="info@fobcalimited.com"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              {/* PHONE */}

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
                  placeholder="08022839548"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              {/* WHATSAPP */}

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
                  placeholder="08022839548"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              {/* ADDRESS */}

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

          {/* =====================================================
              SOCIAL MEDIA
          ===================================================== */}

          <div className="mt-6 border border-[#101b18]/10 bg-white p-6 sm:p-8 lg:p-10">
            <div className="border-b border-[#101b18]/10 pb-7">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Social media
              </p>

              <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
                Social links
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#101b18]/50">
                Add the official FOBCA social media profiles. These links will
                appear as social icons in the website footer.
              </p>
            </div>

            <div className="mt-8 space-y-6">

              {/* INSTAGRAM */}

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

              {/* FACEBOOK */}

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

              {/* YOUTUBE */}

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  YouTube
                </label>

                <input
                  type="url"
                  value={settings.youtube_url}
                  onChange={(event) =>
                    handleChange("youtube_url", event.target.value)
                  }
                  placeholder="https://youtube.com/@..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              {/* LINKEDIN */}

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  LinkedIn
                </label>

                <input
                  type="url"
                  value={settings.linkedin_url}
                  onChange={(event) =>
                    handleChange("linkedin_url", event.target.value)
                  }
                  placeholder="https://linkedin.com/company/..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

              {/* X */}

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  X
                </label>

                <input
                  type="url"
                  value={settings.x_url}
                  onChange={(event) =>
                    handleChange("x_url", event.target.value)
                  }
                  placeholder="https://x.com/..."
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>
            </div>
          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

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
              className="bg-[#174b32] px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:cursor-not-allowed disabled:opacity-50"
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

  if (path === "/admin/messages") {
  return <AdminMessagesPage />;
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