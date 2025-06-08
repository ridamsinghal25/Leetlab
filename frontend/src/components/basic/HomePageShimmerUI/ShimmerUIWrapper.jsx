import { useMediaQuery } from "usehooks-ts";
import MobileShimmer from "./MobileShimmerUI";
import DesktopShimmerUI from "./DesktopShimmerUI";

export function ProblemsShimmerUI() {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return <>{isMobile ? <MobileShimmer /> : <DesktopShimmerUI />}</>;
}
