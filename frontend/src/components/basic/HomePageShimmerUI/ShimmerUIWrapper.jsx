import { useMediaQuery } from "usehooks-ts";
import MobileShimmer from "./MobileShimmerUI";
import DesktopShimmerUI from "./DesktopShimmerUI";

export function HomeShimmerWrapper() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <>{isMobile ? <MobileShimmer /> : <DesktopShimmerUI />}</>;
}
