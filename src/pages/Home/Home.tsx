import Screen from "../../components/Screen/Screen";
import { HomeSection, BannerImage, HomePage } from "./styles";

const Home = () => {
  return (
    <Screen>
      <HomePage>
        <HomeSection id="banner" heightProps="600px" paddingProps="0 20px" backgroundProps="#fff">
          <BannerImage src="./images/banner.png" alt="Banner do ValidControl" />
        </HomeSection>

        <HomeSection id="home"></HomeSection>
      </HomePage>
    </Screen>
  );
};

export default Home;
