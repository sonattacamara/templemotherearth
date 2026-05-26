import ImmersionPlaceholder from "./ImmersionPlaceholder";
import egyptVideo from "@/assets/video-egypt-hero.mp4";

const Egypt = () => (
  <ImmersionPlaceholder
    name="Egypt"
    region="Land of the Ancestors · Kemetic Pilgrimage"
    futureSubdomain="egypt.templemotherearth.org"
    path="/immersions/egypt"
    dates="February 2027"
    poetic="Stand where the ancestors stood. Remember what your blood already knows."
    description="A pilgrimage to the sacred sites of Kemet · a journey of remembrance, initiation, and reunion with the wisdom of the temples. We walk where the priesthoods walked, breathe where the mystery schools breathed, and let Egypt activate what is already within you."
    heroVideo={egyptVideo}
  />
);

export default Egypt;