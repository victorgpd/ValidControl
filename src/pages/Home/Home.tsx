import { Link } from "react-router-dom";
import Screen from "../../components/Screen/Screen";
import useTitle from "../../hooks/useTitle";
import { RoutesEnum } from "../../enums/routes";

const Home = () => {
  useTitle("Home");

  return (
    <Screen>
      <Link to={RoutesEnum.Login}>a</Link>
      <h1>Home</h1>
    </Screen>
  );
};

export default Home;
