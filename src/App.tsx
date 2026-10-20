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

type StoreCollection = {
  id: string;
  name: string;
  image: string;
  description: string | null;
  details: string | null;
  display_order: number;
  is_active: boolean;
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
  const [storeSettings, setStoreSettings] =
    useState<StoreSettings | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadFooterSettings() {
      const { data, error } = await supabase
        .from("store_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Footer settings error:", error);
        return;
      }

      if (mounted) {
        setStoreSettings(data as StoreSettings | null);
      }
    }

    void loadFooterSettings();

    return () => {
      mounted = false;
    };
  }, []);

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
    <footer
      id="contact"
      className="bg-[#0d2d20] px-6 py-16 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN FOOTER */}
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto]">
          {/* BRAND */}
          <div>
            <Logo inverse />

            <p className="mt-5 text-sm font-medium tracking-wide text-white/70">
              FOBCA LIMITED
              <span className="mx-2 text-white/25">|</span>
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
              <span className="mx-2 text-white/20">·</span>
              Online Furniture Business
              <span className="mx-2 text-white/20">·</span>
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
                Furnitures
              </button>

              <button
                onClick={() => navigate("/energy")}
                className="text-left text-sm text-white/60 transition hover:text-white"
              >
                Oil &amp; Gas
              </button>

              <button
                onClick={() => navigate("/building-interior")}
                className="text-left text-sm text-white/60 transition hover:text-white"
              >
                Building &amp; Interiors
              </button>

              <button
                onClick={() => navigate("/construction")}
                className="text-left text-sm text-white/60 transition hover:text-white"
              >
                Constructions
              </button>

              <button
                onClick={() => navigate("/architecture")}
                className="text-left text-sm text-white/60 transition hover:text-white"
              >
                Architectural Designs
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
                  <span className="text-xs text-white/35" aria-hidden="true">
                    ☎
                  </span>
                  <span>{storeSettings.phone}</span>
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
                  <span className="text-xs text-white/35" aria-hidden="true">
                    💬
                  </span>
                  <span>WhatsApp</span>
                </a>
              )}

              {/* EMAIL */}
              {storeSettings?.email && (
                <a
                  href={`mailto:${storeSettings.email}`}
                  className="flex items-start gap-2 break-all text-sm text-white/60 transition hover:text-white"
                >
                  <span
                    className="mt-0.5 shrink-0 text-xs text-white/35"
                    aria-hidden="true"
                  >
                    ✉
                  </span>
                  <span>{storeSettings.email}</span>
                </a>
              )}

              {/* SOCIAL MEDIA */}
              <div className="mt-3">
                <span className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Follow Us
                </span>

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
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:border-white/50 hover:bg-white hover:text-[#0d2d20]"
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

              {!storeSettings && (
                <span className="text-sm text-white/35">
                  Loading contact details...
                </span>
              )}

              {storeSettings &&
                !storeSettings.phone &&
                !storeSettings.whatsapp &&
                !storeSettings.email && (
                  <span className="text-sm text-white/35">
                    Contact details coming soon
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


const handleWhatsAppEnquiry = (product: Product) => {
  const phoneNumber = "2348022839548";

  const price = `₦${Number(product.price).toLocaleString("en-NG")}`;

  const message = [
    "Hello Fobca, I'm interested in this furniture piece.",
    "",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Price: ${price}`,
    "",
    "Please share more details about this product. Thank you.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};


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

  // LIGHTWEIGHT SCROLL REVEALS
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".fobca-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

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
      <style>{`
        .fobca-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.2, 0.65, 0.3, 1);
        }
        .fobca-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .fobca-reveal, .fobca-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>



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

              Furnitures

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
  className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#101b18] sm:min-h-[100svh]"
>
  {/* FULL HERO BANNER */}
  <picture className="absolute inset-0 -z-20 block">
    <source
      media="(max-width: 639px)"
      srcSet={homeBannerMobile}
    />
    <img
      src={homeBanner}
      alt="FOBCA Limited furniture collection"
      className="h-full w-full object-cover object-center"
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  </picture>

  {/* OVERLAY FOR TEXT LEGIBILITY */}
  <div className="absolute inset-0 -z-10 bg-black/20" />
  <div className="absolute inset-x-0 bottom-0 -z-10 h-[65%] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

  {/* HERO CONTENT */}
  <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] items-end px-6 pb-18 pt-36 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
    <div className="fobca-reveal max-w-4xl">
      <h1 className="max-w-4xl font-serif italic text-5xl leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[100px]">
  We realize
  <br />
  <span className="font-light">
    your dreams.
  </span>
</h1>

      <p className="mt-5 max-w-sm text-xs leading-6 tracking-[0.06em] text-white/95 sm:mt-6 sm:text-sm sm:leading-7">
        Electrifying imported furniture for modern living
      </p>

      <button
        onClick={() => navigate("/furniture")}
        className="mt-7 inline-flex items-center gap-5 bg-white/90 px-5 py-4 text-[10px] uppercase tracking-[0.18em] text-[#101b18] transition duration-300 hover:bg-white sm:mt-8 sm:px-6"
      >
        Explore Furniture
        <span className="text-base leading-none">→</span>
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

                    onClick={() => handleWhatsAppEnquiry(product)}

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

        className="fobca-reveal bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40"

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

        className="fobca-reveal bg-[#f3f0e8] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"

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



      <section className="fobca-reveal bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">



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

        className="fobca-reveal bg-[#101b18] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40"

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

        className="fobca-reveal bg-[#f3f0e8] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"

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



      <section className="fobca-reveal bg-[#f3f0e8] px-6 py-28 sm:px-10 sm:py-40 lg:px-16 lg:py-48">



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

            Furnitures | Oil &amp; Gas | Building &amp; Interior Decorations |  Constructions | Architectural Designs. <br/>

           We realize your dreams......

          </p>



        </div>

      </section>


      {/* =====================================================

          SCAMMER SECTION

      ===================================================== */}

   {/* SCAM ALERT & CUSTOMER PROTECTION NOTICE */}
<section className="border-t border-red-200 bg-[#fffafa] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
  <div className="mx-auto max-w-[1400px]">
    <div className="max-w-4xl">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </span>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
          Important Customer Notice
        </p>
      </div>

      <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-red-700 sm:text-4xl lg:text-5xl">
        Scam Alert & Customer Protection Notice
      </h2>

      <p className="mt-6 max-w-3xl text-sm leading-7 text-[#454545] sm:text-base sm:leading-8">
        Fobca Limited hereby alerts all customers and the general public to
        beware of fraudsters and impersonators who may falsely claim to
        represent our company.
      </p>

      <p className="mt-8 text-sm font-semibold text-[#101b18] sm:text-base">
        To protect yourself, please observe the following:
      </p>

      <div className="mt-5 space-y-5">
        <div className="border-l-2 border-red-600 pl-4 sm:pl-5">
          <h3 className="text-sm font-semibold text-[#101b18]">
            Official website
          </h3>
          <a
            href="https://www.fobcalimited.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm leading-6 text-[#454545] underline decoration-red-300 underline-offset-4 transition hover:text-red-700"
          >
            Visit www.fobcalimited.com
          </a>
        </div>

        <div className="border-l-2 border-red-600 pl-4 sm:pl-5">
          <h3 className="text-sm font-semibold text-[#101b18]">
            Official contact
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#454545]">
            Call or WhatsApp{" "}
            <a
              href="https://wa.me/2348022839548"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-red-700 underline decoration-red-300 underline-offset-4 transition hover:text-red-800"
            >
              0802-283-9548
            </a>{" "}
            to verify orders and enquiries.
          </p>
        </div>

        <div className="border-l-2 border-red-600 pl-4 sm:pl-5">
          <h3 className="text-sm font-semibold text-[#101b18]">
            Verify payments
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#454545]">
            Confirm all payment instructions and account details directly
            with Fobca Limited through our official contact channel before
            making payment.
          </p>
        </div>

        <div className="border-l-2 border-red-600 pl-4 sm:pl-5">
          <h3 className="text-sm font-semibold text-[#101b18]">
            Beware of impersonators
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#454545]">
            Do not rely solely on social media profiles, screenshots,
            payment receipts or messages claiming to be from Fobca Limited.
          </p>
        </div>
      </div>
    </div>
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

                  Furnitures

                </button>



                <button

                  onClick={() => navigate("/energy")}

                  className="text-left text-sm text-white/60 transition hover:text-white"

                >

                  Oil &amp; Gas

                </button>

               <button
  onClick={() => navigate("/building-interior")}
  className="text-left text-sm text-white/60 transition hover:text-white"
>
  Building & Interiors
</button>



                <button

                  onClick={() => navigate("/construction")}

                  className="text-left text-sm text-white/60 transition hover:text-white"

                >

                  Constructions

                </button>



                <button

                  onClick={() => navigate("/architecture")}

                  className="text-left text-sm text-white/60 transition hover:text-white"

                >

                  Architectural Designs

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




function FurnitureStorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [collections, setCollections] = useState<StoreCollection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(true);
  const [collectionsError, setCollectionsError] = useState<string | null>(
    null,
  );

  /* =========================================================
     WHATSAPP PRODUCT ENQUIRY
  ========================================================= */

  const handleWhatsAppEnquiry = (product: Product) => {
    const phoneNumber = "2348022839548";

    const price = `₦${Number(product.price).toLocaleString("en-NG")}`;

    const message = [
      "Hello Fobca, I'm interested in this furniture piece.",
      "",
      `Product: ${product.name}`,
      `Category: ${product.category}`,
      `Price: ${price}`,
      "",
      "Please share more details about this product. Thank you.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  /* =========================================================
     INITIAL CATEGORY
  ========================================================= */

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );

    if (category) {
      setActiveCategory(category);
    }
  }, []);

  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

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

  /* =========================================================
     LOAD COLLECTIONS FROM SUPABASE
  ========================================================= */

  useEffect(() => {
    const loadCollections = async () => {
      setLoadingCollections(true);
      setCollectionsError(null);

      const { data, error } = await supabase
        .from("collections")
        .select(
          "id, name, image, description, details, display_order, is_active",
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error loading collections:", error);

        setCollections([]);
        setCollectionsError(
          "Collections could not be loaded. Please try again.",
        );
        setLoadingCollections(false);
        return;
      }

      const loadedCollections: StoreCollection[] = (data ?? []).map(
        (collection) => {
          const imageUrl = collection.image?.startsWith("http")
            ? collection.image
            : supabase.storage
                .from("collection-images")
                .getPublicUrl(collection.image || "").data.publicUrl;

          return {
            id: collection.id,
            name: collection.name,
            image: imageUrl,
            description: collection.description,
            details: collection.details,
            display_order: collection.display_order,
            is_active: collection.is_active,
          };
        },
      );

      setCollections(loadedCollections);
      setLoadingCollections(false);
    };

    loadCollections();
  }, []);

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredTitle = search
    ? `Results for “${search}”`
    : activeCategory === "All"
      ? "All furniture"
      : activeCategory;

  /* =========================================================
     COLLECTION CLICK
  ========================================================= */

  const handleCollectionClick = (collectionName: string) => {
    const categoryMap: Record<string, string> = {
      Beds: "Bedroom",
      Sofas: "Living Room",
      Dining: "Dining",
      "Adjustable Coffee Tables": "Living Room",
      "Premium Shoe Racks": "Living Room",
      "Rocking Chairs": "Living Room",
      "Bedside Table Lamps": "Bedroom",
    };

    const category = categoryMap[collectionName] ?? collectionName;

    setActiveCategory(category);
    setSearch("");

    setTimeout(() => {
      document.getElementById("store-products")?.scrollIntoView({
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

            {loadingCollections ? (
              <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-6 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[0.86] bg-[#e8e3d8]" />
                    <div className="mt-4 h-5 w-3/4 bg-[#e8e3d8]" />
                    <div className="mt-3 h-3 w-full bg-[#e8e3d8]" />
                  </div>
                ))}
              </div>
            ) : collectionsError ? (
              <div className="mt-10 border border-black/10 px-5 py-12 text-center">
                <p className="text-sm text-black/55">
                  {collectionsError}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 text-xs uppercase tracking-[0.15em] text-[#174b32] underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            ) : collections.length === 0 ? (
              <div className="mt-10 py-16 text-center">
                <p className="font-['Playfair_Display'] text-2xl text-[#101b18]">
                  Collections coming soon.
                </p>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-6 lg:grid-cols-3">
                {collections.map((collection, index) => (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => handleCollectionClick(collection.name)}
                    className="group text-left"
                  >
                    {/* IMAGE */}

                    <div className="relative aspect-[0.86] overflow-hidden bg-[#e8e3d8]">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        loading="lazy"
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
            )}
          </section>

          {/* =====================================================
              STORE SECTION HEADING
          ===================================================== */}

          <div
            id="store-products"
            className="mt-24 flex items-end justify-between border-b border-black/10 pb-5"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#174b32]">
                Shop
              </p>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
                {filteredTitle}
              </h2>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.12em] text-black/35 sm:block">
              {filteredProducts.length} products
            </span>
          </div>

          {/* =====================================================
              PRODUCTS
          ===================================================== */}

          {loadingProducts ? (
            <div className="mt-12 py-20 text-center">
              <p className="text-[9px] uppercase tracking-[0.22em] text-black/40">
                Loading products...
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
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="group">
                  <div className="relative aspect-[0.86] overflow-hidden bg-[#e8e3d8]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
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
                      type="button"
                      onClick={() => handleWhatsAppEnquiry(product)}
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const { data, error } = await supabase.rpc(
        "verify_admin_login",
        {
          p_email: email.trim(),
          p_password: password,
        },
      );

      if (error) throw error;

      if (data !== true) {
        setLoginError("Invalid email or password.");
        return;
      }

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed:", error);
      setLoginError("Unable to sign in. Please try again.");
    } finally {
      setLoggingIn(false);
    }
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
                htmlFor="admin-email"
                className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-white/50"
              >
                Login Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="username"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-white"
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
                required
                autoComplete="current-password"
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-white"
              />
            </div>

            {loginError && (
              <p className="text-sm text-red-300" role="alert">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="mt-4 flex w-full items-center justify-between border border-white/20 px-5 py-4 text-left transition hover:border-white hover:bg-white hover:text-[#101b18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-[9px] uppercase tracking-[0.2em]">
                {loggingIn ? "Checking..." : "Sign in"}
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
      .select("*", { count: "exact", head: true });

    if (messageError) {
      console.error("Error loading customer message count:", messageError);
    } else {
      setMessageCount(messages ?? 0);
    }
  };

  loadDashboardCounts();
}, []);


  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
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
        {/* MANAGEMENT CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

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

            <p className="mt-3 text-sm leading-6 text-[#101b18]/50">
              Add, edit and remove furniture products from the online store.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              Manage products →
            </span>
          </button>

          {/* COLLECTIONS */}
          <button
            onClick={() => navigate("/admin/collections")}
            className="group border border-[#101b18]/10 bg-white p-7 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#174b32] hover:shadow-[0_12px_35px_rgba(16,27,24,0.06)]"
          >
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
              Furniture Categories
            </p>

            <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
              Collections
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#101b18]/50">
              Add, edit and remove furniture collections, images and
              descriptions.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              Manage collections →
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

            <p className="mt-3 text-sm leading-6 text-[#101b18]/50">
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

            <p className="mt-3 text-sm leading-6 text-[#101b18]/50">
              View customer enquiries, feedback, order support and other
              messages received through the website.
            </p>

            <span className="mt-7 block text-[9px] uppercase tracking-[0.2em] text-[#174b32] transition-transform duration-300 group-hover:translate-x-1">
              View customer messages →
            </span>
          </button>
        </div>

        {/* QUICK OVERVIEW */}
        <div className="mt-10 border-t border-[#101b18]/10 pt-8">
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/35">
            Quick overview
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {/* PRODUCT COUNT */}
            <div className="bg-white p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                Products
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                {productCount}
              </p>
            </div>

            {/* UNREAD MESSAGES */}
            <div className="bg-white p-6">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                Unread Messages
              </p>

              <p className="mt-3 font-['Playfair_Display'] text-4xl">
                {messageCount}
              </p>
            </div>

            {/* STORE STATUS */}
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
      .select("id, name, email, phone, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading messages:", error.message);
      setMessages([]);
    } else {
      const loadedMessages = (data ?? []) as CustomerMessage[];
      setMessages(loadedMessages);

      setSelectedMessage((current) =>
        current
          ? loadedMessages.find((message) => message.id === current.id) ?? null
          : null
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const openMessage = (message: CustomerMessage) => {
    setSelectedMessage(message);
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
      console.error("Error deleting message:", error.message);
      window.alert("Could not delete this message. Please try again.");
      return;
    }

    setMessages((current) =>
      current.filter((message) => message.id !== id)
    );

    setSelectedMessage((current) =>
      current?.id === id ? null : current
    );
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      <header className="border-b border-white/10 bg-[#101b18] px-6 py-5 text-white sm:px-10">
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

            <p className="mt-3 text-xs text-[#101b18]/50">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </p>
          </div>

          <button
            onClick={loadMessages}
            disabled={loading}
            className="border border-[#101b18]/15 px-5 py-3 text-[9px] uppercase tracking-[0.2em] transition hover:border-[#174b32] hover:text-[#174b32] disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh Messages"}
          </button>
        </div>

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
              No messages found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#101b18]/45">
              No messages were returned by Supabase. Click Refresh Messages
              to try again.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-y border-[#101b18]/10">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`block w-full border-b border-[#101b18]/10 p-5 text-left transition last:border-b-0 hover:bg-white ${
                    selectedMessage?.id === message.id
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="truncate text-sm font-medium">
                      {message.name}
                    </p>

                    <span className="shrink-0 text-[9px] text-[#101b18]/40">
                      {formatDate(message.created_at)}
                    </span>
                  </div>

                  <p className="mt-2 truncate text-xs text-[#101b18]/45">
                    {message.email}
                  </p>

                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#101b18]/60">
                    {message.message}
                  </p>
                </button>
              ))}
            </div>

            <div className="min-h-[400px] border border-[#101b18]/10 bg-white">
              {!selectedMessage ? (
                
<div className="flex min-h-[400px] items-center justify-center px-8 text-center">
  <p className="text-sm leading-7 text-[#101b18]/45">
    <span className="hidden lg:inline">
      Click any message on the left to read the full message.
    </span>
    <span className="lg:hidden">
      Click any message above to read the full message.
    </span>
  </p>
</div>

              ) : (
                <>
                  <div className="border-b border-[#101b18]/10 p-7 sm:p-9">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#174b32]/70">
                      Customer Message
                    </p>

                    <h3 className="mt-3 break-words font-['Playfair_Display'] text-3xl">
                      {selectedMessage.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#101b18]/40">
                      {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>

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

                  <div className="p-7 sm:p-9">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/35">
                      Message
                    </p>

                    <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-8 text-[#101b18]/70">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-[#101b18]/10 p-7 sm:p-9">
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

                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-red-700/70 transition hover:text-red-700"
                    >
                      Delete Message
                    </button>
                  </div>
                </>
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
          setMessage(`Product could not be updated: ${updateError.message}`);
          setLoading(false);
          return;
        }

        setMessage("Product updated successfully.");
      } else {
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
          setMessage(`Product could not be saved: ${productError.message}`);
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
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#101b18] px-5 py-5 text-white sm:px-10">
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
            className="rounded-full border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:text-white"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-4 py-7 sm:px-10 sm:py-10 lg:py-14">
        {/* ADD / EDIT PRODUCT */}
        <div className="border border-[#101b18]/10 bg-white p-5 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Store management
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
                className="shrink-0 rounded-full border border-[#101b18]/15 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-[#101b18]/60 transition hover:bg-[#f3f0e8]"
              >
                Cancel
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
              <p className="border-l-2 border-[#174b32] bg-[#174b32]/5 px-4 py-3 text-xs leading-5 text-[#174b32]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-between bg-[#101b18] px-5 py-4 text-white transition hover:bg-[#174b32] disabled:cursor-not-allowed disabled:opacity-50"
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

        {/* PRODUCT LIST */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4 border-b border-[#101b18]/10 pb-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#101b18]/40">
                Catalogue
              </p>

              <h2 className="mt-2 font-['Playfair_Display'] text-3xl">
                Products
              </h2>
            </div>

            <span className="text-[9px] uppercase tracking-[0.12em] text-[#101b18]/40">
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
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="min-w-0 overflow-hidden border border-[#101b18]/10 bg-white"
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

                  <div className="p-3 sm:p-5">
                    <p className="text-[8px] uppercase tracking-[0.12em] text-[#174b32] sm:text-[9px] sm:tracking-[0.15em]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 break-words font-['Playfair_Display'] text-base leading-snug sm:text-xl">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs font-medium text-[#101b18]/65 sm:text-sm">
                      ₦{Number(product.price).toLocaleString("en-NG")}
                    </p>

                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] sm:text-[9px] ${
                          product.is_active
                            ? "text-[#174b32]"
                            : "text-[#101b18]/40"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.is_active
                              ? "bg-[#174b32]"
                              : "bg-[#101b18]/30"
                          }`}
                        />
                        {product.is_active ? "Live on store" : "Hidden"}
                      </span>
                    </div>

                   
{/* PRODUCT ACTIONS */}
<div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-[#101b18]/10 pt-4 sm:mt-5 sm:gap-3 sm:pt-4">
  {/* EDIT */}
  <button
    type="button"
    onClick={() => startEditing(product)}
    className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#101b18]/15 bg-white px-2 py-3 text-[10px] font-medium uppercase tracking-[0.06em] text-[#101b18] transition hover:border-[#174b32] hover:bg-[#f3f0e8] active:scale-[0.98] sm:text-[11px]"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14 5 5 5M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z"
      />
    </svg>
    <span>Edit</span>
  </button>

  {/* SHOW / HIDE */}
  <button
    type="button"
    onClick={() => toggleProductStatus(product)}
    className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#174b32]/20 bg-[#174b32]/5 px-2 py-3 text-[10px] font-medium uppercase tracking-[0.03em] text-[#174b32] transition hover:bg-[#174b32]/10 active:scale-[0.98] sm:text-11px]"
  >
    {product.is_active ? (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-4 w-4 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.8M6.2 6.2C4.1 7.6 3 12 3 12s3.5 7 9 7a9 9 0 0 0 3-.5"
        />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-4 w-4 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z"
        />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    )}
    <span>{product.is_active ? "Hide" : "Show"}</span>
  </button>

  {/* DELETE */}
  <button
    type="button"
    onClick={() => deleteProduct(product)}
    className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/60 px-3 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-red-700 transition hover:border-red-300 hover:bg-red-50 active:scale-[0.99] sm:text-[11px]"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
      />
    </svg>
    <span>Delete</span>
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

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newLoginEmail, setNewLoginEmail] = useState("");
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securityMessage, setSecurityMessage] = useState("");
  const [securityError, setSecurityError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("store_settings")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) throw error;

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
      } catch (error) {
        console.error("Error loading store settings:", error);
      } finally {
        setLoading(false);
      }
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

  const handleSave = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSaving(true);

    try {
      const { data: existing, error: existingError } = await supabase
        .from("store_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (existingError) throw existingError;

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
          .insert(settings);

        error = result.error;
      }

      if (error) throw error;

      alert("Store details saved successfully.");
    } catch (error: any) {
      console.error("Error saving store settings:", error);
      alert(error.message || "Could not save store details.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSecurityMessage("");
    setSecurityError("");

    if (!currentPassword) {
      setSecurityError("Enter your current password.");
      return;
    }

    if (newPassword.length < 8) {
      setSecurityError(
        "Your new password must be at least 8 characters.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError("The new passwords do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      setSecurityError(
        "Your new password must be different from your current password.",
      );
      return;
    }

    setSecuritySaving(true);

    try {
      const { data, error } = await supabase.rpc(
        "change_admin_credentials",
        {
          p_current_password: currentPassword,
          p_new_email: null,
          p_new_password: newPassword,
        },
      );

      if (error) throw error;

      if (data !== true) {
        throw new Error("Your current password is incorrect.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSecurityMessage(
        "Password changed successfully. Use your new password next time you sign in.",
      );
    } catch (error: any) {
      console.error("Password change failed:", error);
      setSecurityError(
        error.message || "Unable to change password.",
      );
    } finally {
      setSecuritySaving(false);
    }
  };

  const handleChangeLoginEmail = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSecurityMessage("");
    setSecurityError("");

    const email = newLoginEmail.trim().toLowerCase();

    if (!currentPassword) {
      setSecurityError("Enter your current password.");
      return;
    }

    if (!email) {
      setSecurityError("Enter your new login email.");
      return;
    }

    setSecuritySaving(true);

    try {
      const { data, error } = await supabase.rpc(
        "change_admin_credentials",
        {
          p_current_password: currentPassword,
          p_new_email: email,
          p_new_password: null,
        },
      );

      if (error) throw error;

      if (data !== true) {
        throw new Error("Your current password is incorrect.");
      }

      setCurrentPassword("");
      setNewLoginEmail("");

      setSecurityMessage(
        "Login email changed successfully. Use the new email the next time you sign in.",
      );
    } catch (error: any) {
      console.error("Login email change failed:", error);
      setSecurityError(
        error.message ||
          "Unable to change login email. Make sure the address is valid and not already in use.",
      );
    } finally {
      setSecuritySaving(false);
    }
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
            type="button"
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
                  Business Email
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
                <p className="mt-2 text-xs text-[#101b18]/40">
                  Public contact email, separate from the admin login email.
                </p>
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
                  placeholder="08022839548"
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
                  placeholder="08022839548"
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
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#101b18]/50">
                Add the official FOBCA social media profiles for the website footer.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {(
                [
                  ["instagram_url", "Instagram", "https://instagram.com/..."],
                  ["facebook_url", "Facebook", "https://facebook.com/..."],
                  ["youtube_url", "YouTube", "https://youtube.com/@..."],
                  ["linkedin_url", "LinkedIn", "https://linkedin.com/company/..."],
                  ["x_url", "X", "https://x.com/..."],
                ] as const
              ).map(([field, label, placeholder]) => (
                <div key={field}>
                  <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                    {label}
                  </label>
                  <input
                    type="url"
                    value={settings[field]}
                    onChange={(event) =>
                      handleChange(field, event.target.value)
                    }
                    placeholder={placeholder}
                    className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#174b32]"
                  />
                </div>
              ))}
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
              className="bg-[#174b32] px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save store details"}
            </button>
          </div>
        </form>

        <section className="mt-12 border border-[#101b18]/10 bg-white p-6 sm:p-8 lg:p-10">
          <div className="border-b border-[#101b18]/10 pb-7">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[#174b32]">
              Account security
            </p>
            <h2 className="mt-3 font-['Playfair_Display'] text-3xl">
              Login & Security
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#101b18]/50">
              Change the credentials used to access the admin dashboard.
            </p>
          </div>

          {securityMessage && (
            <p
              role="status"
              className="mt-6 border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {securityMessage}
            </p>
          )}

          {securityError && (
            <p
              role="alert"
              className="mt-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {securityError}
            </p>
          )}

          <div className="mt-8">
            <h3 className="font-['Playfair_Display'] text-xl">
              Change password
            </h3>

            <form onSubmit={handleChangePassword} className="mt-5 space-y-5">
              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Current password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  New password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#174b32]"
                />
                <p className="mt-2 text-xs text-[#101b18]/40">
                  Use at least 8 characters.
                </p>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#174b32]"
                />
              </div>

              <button
                type="submit"
                disabled={securitySaving}
                className="bg-[#174b32] px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:opacity-50"
              >
                {securitySaving ? "Updating..." : "Change password"}
              </button>
            </form>
          </div>

          <div className="mt-10 border-t border-[#101b18]/10 pt-8">
            <h3 className="font-['Playfair_Display'] text-xl">
              Change login email
            </h3>

            <form onSubmit={handleChangeLoginEmail} className="mt-5 space-y-5">
              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  Current password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.target.value)
                  }
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#174b32]"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[0.18em] text-[#101b18]/45">
                  New login email
                </label>
                <input
                  type="email"
                  value={newLoginEmail}
                  onChange={(event) => setNewLoginEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="newemail@example.com"
                  className="mt-2 w-full border-b border-[#101b18]/15 bg-transparent px-0 py-3 text-sm outline-none focus:border-[#174b32]"
                />
              </div>

              <button
                type="submit"
                disabled={securitySaving}
                className="border border-[#101b18]/20 px-5 py-3 text-[9px] uppercase tracking-[0.2em] transition hover:border-[#174b32] hover:text-[#174b32] disabled:opacity-50"
              >
                {securitySaving ? "Updating..." : "Change login email"}
              </button>

              <p className="text-xs leading-5 text-[#101b18]/45">
                Your new email will be used for the next table-based login.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}



function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const emptyForm = {
    name: "",
    description: "",
    details: "",
    display_order: 1,
    is_active: true,
    image: "",
  };

  const [form, setForm] = useState(emptyForm);

  const getImageUrl = (image: string) => {
    if (!image) return "";

    if (image.startsWith("http")) return image;

    return supabase.storage
      .from("collection-images")
      .getPublicUrl(image)
      .data.publicUrl;
  };

  const loadCollections = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setCollections(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const resetForm = () => {
    setForm({
      ...emptyForm,
      display_order: collections.length + 1,
    });
    setEditingId(null);
    setSelectedImage(null);
  };

  const handleEdit = (collection: any) => {
    setEditingId(collection.id);
    setForm({
      name: collection.name || "",
      description: collection.description || "",
      details: collection.details || "",
      display_order: collection.display_order,
      is_active: collection.is_active,
      image: collection.image || "",
    });
    setSelectedImage(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      let imagePath = form.image;

      if (selectedImage) {
        const safeName = selectedImage.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const filePath = `${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("collection-images")
          .upload(filePath, selectedImage, { upsert: true });

        if (uploadError) throw uploadError;

        imagePath = filePath;
      }

      if (!imagePath) {
        throw new Error("Please select an image for this collection.");
      }

      const collectionData = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        details: form.details.trim() || null,
        display_order: Number(form.display_order),
        is_active: form.is_active,
        image: imagePath,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("collections")
          .update(collectionData)
          .eq("id", editingId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("collections")
          .insert({
            ...collectionData,
            created_at: new Date().toISOString(),
          });

        if (insertError) throw insertError;
      }

      await loadCollections();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Unable to save collection.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (collection: any) => {
    const { error } = await supabase
      .from("collections")
      .update({
        is_active: !collection.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", collection.id);

    if (error) {
      setError(error.message);
      return;
    }

    await loadCollections();
  };

 
const handleDelete = async (collection: any) => {
  const confirmed = window.confirm(
    `Delete "${collection.name}" and its uploaded image? This cannot be undone.`,
  );

  if (!confirmed) return;

  const { error: deleteError } = await supabase
    .from("collections")
    .delete()
    .eq("id", collection.id);

  if (deleteError) {
    setError(deleteError.message);
    return;
  }

  // Remove the associated image from Supabase Storage.
  let imagePath = collection.image || "";

  if (imagePath.startsWith("http")) {
    const marker = "/collection-images/";
    imagePath = imagePath.includes(marker)
      ? decodeURIComponent(
          imagePath.split(marker).pop()?.split("?")[0] || "",
        )
      : "";
  }

  if (imagePath) {
    const { error: storageError } = await supabase.storage
      .from("collection-images")
      .remove([imagePath]);

    if (storageError) {
      setError(
        `Collection deleted, but its image could not be removed: ${storageError.message}`,
      );
    }
  }

  if (editingId === collection.id) resetForm();

  await loadCollections();
};


  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#101b18]">
      <header className="bg-[#101b18] px-5 py-6 text-white sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/50">
              Fobca Limited · Administration
            </p>
            <h1 className="mt-2 font-serif text-2xl sm:text-3xl">
              Collections
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="border border-white/20 px-4 py-3 text-[9px] uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#101b18]"
          >
            Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-10 sm:py-14">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#174b32]">
            Store management
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
            Manage your collections
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#101b18]/60">
            Add new furniture collections, update images and descriptions, or
            control which collections appear on your store.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="mb-12 border border-black/10 bg-white/60 p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#174b32]">
                {editingId ? "Update collection" : "New collection"}
              </p>
              <h3 className="mt-2 font-serif text-xl">
                {editingId ? "Edit collection details" : "Add a collection"}
              </h3>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[9px] uppercase tracking-[0.2em] text-[#101b18]/60 underline"
              >
                Cancel editing
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em]">
                  Collection name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g. Bedroom Sets"
                  className="w-full border border-black/15 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#174b32]"
                />
              </div>

             
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.15em]">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="A short description shown on the store."
                className="w-full resize-y border border-black/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#174b32]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.15em]">
                Extra details
              </label>
              <input
                value={form.details}
                onChange={(e) =>
                  setForm({ ...form, details: e.target.value })
                }
                placeholder="e.g. Walnut · Black · Oak · White"
                className="w-full border border-black/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-[#174b32]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.15em]">
                Collection image {!editingId && "*"}
              </label>

              {form.image && (
                <img
                  src={getImageUrl(form.image)}
                  alt="Current collection"
                  className="mb-3 h-32 w-40 object-cover"
                />
              )}

              <input
                type="file"
                accept="image/*"
                required={!editingId && !form.image}
                onChange={(e) =>
                  setSelectedImage(e.target.files?.[0] || null)
                }
                className="block w-full text-sm file:mr-4 file:border-0 file:bg-[#101b18] file:px-4 file:py-3 file:text-xs file:uppercase file:tracking-wider file:text-white"
              />

              {selectedImage && (
                <p className="mt-2 text-xs text-[#174b32]">
                  Selected: {selectedImage.name}
                </p>
              )}

              {editingId && (
                <p className="mt-2 text-xs text-[#101b18]/50">
                  Choose a new image only if you want to replace the current one.
                </p>
              )}
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) =>
                  setForm({ ...form, is_active: e.target.checked })
                }
                className="h-4 w-4 accent-[#174b32]"
              />
              Show this collection on the store
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#174b32] px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#101b18] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save changes"
                  : "Add collection"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#174b32]">
                Your store
              </p>
              <h3 className="mt-2 font-serif text-xl">
                Existing collections
              </h3>
            </div>

            <span className="text-xs text-[#101b18]/50">
              {collections.length} total
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-sm text-[#101b18]/50">
              Loading collections...
            </div>
          ) : collections.length === 0 ? (
            <div className="border border-dashed border-black/20 py-12 text-center">
              <p className="font-serif text-lg">No collections yet</p>
              <p className="mt-2 text-sm text-[#101b18]/50">
                Add your first collection using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <article
                  key={collection.id}
                  className="overflow-hidden border border-black/10 bg-white/60"
                >
                  <div className="relative aspect-[4/3] bg-[#e8e5dc]">
                    {collection.image && (
                      <img
                        src={getImageUrl(collection.image)}
                        alt={collection.name}
                        className="h-full w-full object-cover"
                      />
                    )}

                    <span
                      className={`absolute left-3 top-3 px-3 py-2 text-[9px] uppercase tracking-wider ${
                        collection.is_active
                          ? "bg-[#174b32] text-white"
                          : "bg-white text-[#101b18]"
                      }`}
                    >
                      {collection.is_active ? "Visible" : "Hidden"}
                    </span>

                    <span className="absolute right-3 top-3 bg-white/90 px-3 py-2 text-[9px] uppercase tracking-wider">
                      Order {collection.display_order}
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-xl">{collection.name}</h4>

                    {collection.description && (
                      <p className="mt-2 text-sm leading-6 text-[#101b18]/60">
                        {collection.description}
                      </p>
                    )}

                    {collection.details && (
                      <p className="mt-2 text-xs text-[#174b32]">
                        {collection.details}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3 border-t border-black/10 pt-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(collection)}
                        className="text-[9px] uppercase tracking-[0.15em] text-[#174b32] underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleActive(collection)}
                        className="text-[9px] uppercase tracking-[0.15em] underline"
                      >
                        {collection.is_active ? "Hide" : "Show"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(collection)}
                        className="text-[9px] uppercase tracking-[0.15em] text-red-700 underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
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

  if (path === "/admin/collections") {
  return <AdminCollectionsPage />;
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