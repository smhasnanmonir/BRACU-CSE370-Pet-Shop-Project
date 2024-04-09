import Pets from "../../Pets/Pets";
import Vets from "../../Vets/Vets";
import HomeSlider from "../HomeSlider/HomeSlider";
import TopRated from "../TopRated/TopRated";

const HomeContent = () => {
  return (
    <div>
      <HomeSlider></HomeSlider>
      <TopRated />
      <Vets />
      <h3 className="text-center">Pets to adopt</h3>
      <Pets></Pets>
    </div>
  );
};

export default HomeContent;
