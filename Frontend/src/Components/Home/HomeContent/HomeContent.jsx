import Vets from "../../Vets/Vets";
import HomeSlider from "../HomeSlider/HomeSlider";
import TopRated from "../TopRated/TopRated";

const HomeContent = () => {
  return (
    <div>
      <HomeSlider></HomeSlider>
      <TopRated />
      <Vets />
    </div>
  );
};

export default HomeContent;
