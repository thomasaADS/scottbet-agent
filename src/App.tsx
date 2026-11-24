import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import type { ScrollScrubScene } from "@/components/scroll-scrub/scroll-scrub";
import { DemoGames } from "@/components/site/games";
import {
  EnterCta,
  Faq,
  FinalCall,
  HeroStats,
  HeroStrip,
  SeoBlock,
  GhostLink,
  SiteFooter,
  SiteHeader,
  Steps,
  StickyBar,
  WhatsappCta,
  Why,
  Worlds,
} from "@/components/site/site";
import "@/components/site/site.css";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";
import { site } from "@/site-config";

const chapterActions = [
  <>
    <EnterCta key="enter">כניסה ל-{site.brand}</EnterCta>
    <WhatsappCta key="wa">פתיחת חשבון בוואטסאפ</WhatsappCta>
    <GhostLink href="#games" key="demo">למשחקי הדמו</GhostLink>
    <HeroStats key="stats" />
  </>,
  <GhostLink href="#worlds" key="worlds">לעולמות המשחק</GhostLink>,
  <GhostLink href="#how" key="how">איך מצטרפים</GhostLink>,
  <>
    <GhostLink href="#games" key="demo">למשחקי הדמו</GhostLink>
    <EnterCta key="enter" variant="ruby">ישר ל-{site.brand}</EnterCta>
  </>,
];

// Module constant on purpose: a new array identity rebuilds the scrub controller.
const journeyScenes: ScrollScrubScene[] = scrollScrubScenes.map((scene, index) => ({
  ...scene,
  actions: chapterActions[index],
}));

export default function App() {
  return (
    <div className="site">
      <SiteHeader />
      <main>
        <div className="journey-wrap">
          <ScrollScrub className="journey" scenes={journeyScenes} theme={scrollScrubTheme} />
          <HeroStrip />
        </div>
        <Worlds />
        <Steps />
        <Why />
        <Faq />
        <DemoGames />
        <SeoBlock />
        <FinalCall />
      </main>
      <SiteFooter />
      <StickyBar />
    </div>
  );
}
