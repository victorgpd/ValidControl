import { Link } from "react-router-dom";
import Screen from "../../components/Screen/Screen";

const Home = () => {
  return (
    <Screen>
      <Link to={"/login"}>a</Link>
      <h1>Home</h1>
    </Screen>
  );
};

export default Home;
