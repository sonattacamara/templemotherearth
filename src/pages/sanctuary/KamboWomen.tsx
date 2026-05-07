import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

// TODO: Replace with the dedicated Eventbrite URL once provided.
const EVENTBRITE_URL = "/ceremony-intake";

const KamboWomen = () => (
  <SacredSeriesLayout
    title="Kambo · For Women Only · Temple Mother Earth"
    description="A sacred women-only Kambo Purification circle held the third Saturday of every month at 8:00 AM, guided by Sonatta Camara at Temple Mother Earth, Washington DC."
    path="/kambo-women"
  >
    <SanctuaryHero
      dateBadge="Third Saturday Monthly · 8:00 AM"
      eyebrow="A Sonatta Camara Offering"
      title={
        <>
          Kambo · For<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">
            Women Only
          </em>
        </>
      }
      subtitle=""
      lead="A sacred container free of masculine energy — where women gather to release, to surrender, and to remember the wisdom of the body, held in the presence of sisterhood."
      primaryCTA={{ label: "Reserve Your Seat", href: EVENTBRITE_URL, external: EVENTBRITE_URL.startsWith("http") }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/6541381/pexels-photo-6541381.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection
      id="about"
      eyebrow="The Circle"
      title={
        <>
          A Sanctuary for<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Sacred Feminine Release
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          There is something that opens in a women-only circle that cannot open anywhere else. No performance. No tending. No filtering through the eyes of the masculine. Only the raw, honest, unedited truth of what the body has been holding.
        </p>
        <p>
          This is Kambo Purification offered exclusively for women — a sacred ceremony for releasing what no longer serves, in the presence of sisters who understand without explanation.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Held the third Saturday of every month at 8:00 AM.</strong> A monthly rhythm — a returning home to your body, in community.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection
      id="who"
      eyebrow="Who This Is For"
      title={
        <>
          For the Sister Who Is<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Ready to Release</em>
        </>
      }
    >
      <SanctuaryColCards
        cards={[
          {
            title: "The Carrier",
            description:
              "Women holding stored grief, generational weight, or grief that has never had a safe place to land. The body remembers — and is ready to let go.",
            note: "WITNESSED HERE",
          },
          {
            title: "The Mother",
            description:
              "Mothers and caregivers who pour out daily and need a sacred reset — a morning held entirely for you, with no one needing anything from you.",
            note: "RESTORED HERE",
            featured: true,
          },
          {
            title: "The Sister",
            description:
              "Women called to deeper purification work who long for the unique safety of a circle that is, for one morning, entirely feminine.",
            note: "WELCOMED HERE",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuarySection
      eyebrow="The Holder"
      title={
        <>
          Guided by<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Sonatta Camara</em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          Sonatta Camara holds this offering as a dedicated space for women — a sacred ceremony shaped by the rhythms, the silences, and the wisdom that arise when sisters gather without the presence of masculine energy.
        </p>
        <p>
          Her guidance is gentle, grounded, and deeply attuned to the truth that some of what a woman is here to release can only be released in the company of other women.
        </p>
      </div>
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I have sat in many circles. None of them moved through me the way this one did. There was nothing to perform. Nothing to soften. Just sisters, and the truth of my body finally being allowed to speak."
      attribution="A Sister of the Circle"
    />

    <SanctuarySection
      eyebrow="Preparation"
      title={
        <>
          Arrive<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Prepared & Present</em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          Kambo Purification asks the body to be ready. Please review our preparation guidance before reserving your seat — it includes hydration, fasting, and the spiritual preparation that allows the ceremony to do its sacred work.
        </p>
        <p>
          <a href="/preparation" className="text-[hsl(45,70%,49%)] underline underline-offset-4 hover:text-[hsl(45,70%,58%)]">Read the full preparation protocol →</a>
        </p>
      </div>
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="Third Saturday Monthly · 8:00 AM · Washington, DC"
      title={
        <>
          The Sisters Are<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Waiting For You</em>
        </>
      }
      description="Reserve your seat through Eventbrite. Sacred reciprocity offered for those whose path requires it — write to us through our contact page."
      ctaLabel="Reserve Your Seat"
      ctaHref={EVENTBRITE_URL}
      external={EVENTBRITE_URL.startsWith("http")}
      note="21+ · Women only · Pre-registration required · Confidentiality honored"
    />
  </SacredSeriesLayout>
);

export default KamboWomen;