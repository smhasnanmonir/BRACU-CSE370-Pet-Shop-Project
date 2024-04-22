import Pets from "../../Pets/Pets";
import Vets from "../../Vets/Vets";
import useAdmin from "../../hooks/useAdmin";
import HomeSlider from "../HomeSlider/HomeSlider";
import TopRated from "../TopRated/TopRated";

const HomeContent = () => {
  const { filterAdmin } = useAdmin();
  console.log(filterAdmin);
  return (
    <div>
      <HomeSlider></HomeSlider>
      <h3 className="productH1">Our top rated products</h3>
      <TopRated />
      <h1 className="text-center vetH1">Our Top Rated Vets</h1>
      <Vets />
      <h3 className="text-center">Pets to adopt</h3>
      <Pets></Pets>
    </div>
  );
};

export default HomeContent;
