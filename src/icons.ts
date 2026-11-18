import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Bundles Font Awesome's CSS instead of injecting a <style> at runtime, so a
// strict CSP (no 'unsafe-inline' in style-src) can be added without changes.
config.autoAddCss = false;

export {
  faBars,
  faCircleCheck,
  faCopy,
  faDeleteLeft,
  faEclipse,
  faGear,
  faList,
  faTrashCan,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/sharp-duotone-light-svg-icons";
