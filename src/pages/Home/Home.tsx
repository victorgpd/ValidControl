import { Link } from "react-router-dom";
import Screen from "../../components/Screen/Screen";
import useTitle from "../../hooks/useTitle";
import { RoutesEnum } from "../../enums/routes";

const Home = () => {
  useTitle("Home");

  return (
    <Screen>
      <Link to={RoutesEnum.Login}>a</Link>
      <section id="home">
        <h1>Home</h1>
      </section>
    </Screen>
  );
};

export default Home;
