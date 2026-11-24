import { DemoGames } from "@/components/site/games";
import {
  About,
  ChatPill,
  Compare,
  Faq,
  Hero,
  SeoBlock,
  Signup,
  SiteFooter,
  SiteHeader,
  SiteTour,
  Steps,
} from "@/components/site/site";
import "@/components/site/site.css";

export default function App() {
  return (
    <div className="site">
      <SiteHeader />
      <main>
        <Hero />
        <SiteTour />
        <About />
        <Compare />
        <Steps />
        <Faq />
        <DemoGames />
        <SeoBlock />
        <Signup />
      </main>
      <SiteFooter />
      <ChatPill />
    </div>
  );
}
