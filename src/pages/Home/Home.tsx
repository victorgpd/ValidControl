import { Link } from "react-router-dom";
import Screen from "../../components/Screen/Screen";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <Screen>
      <Link to={"/login"}>a</Link>
      <h1>Home</h1>
    </Screen>
  );
};

export default Home;
