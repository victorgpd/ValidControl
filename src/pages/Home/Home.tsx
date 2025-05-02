import { Link } from "react-router-dom";
import Screen from "../../components/Screen/Screen";
import useTitle from "../../hooks/useTitle";
import { RoutesEnum } from "../../enums/routes";
import { useAppDispatch } from "../../hooks/store";
import { setOpenCurrentMenu } from "../../redux/globalReducer/slice";
import { useEffect } from "react";

const Home = () => {
  useTitle("Home");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOpenCurrentMenu(["home"]));
  }, []);

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
