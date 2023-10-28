import clsx from "clsx";

import styles from "./icon.module.scss";
// import { Spinner } from 'modules/shared/components'

function Icon({
  icon,
  className,
  badge,
  badgeClasses = "bg-danger",
  title,
  disabled = false,
  loading = false,
  ...props
}) {
  // if (disabled || loading)
  //   return (
  //     <Spinner
  //       className={clsx(styles['spinner-size'], { [className]: className })}
  //     />
  //   )
  if (badge) {
    return (
      <i
        className={clsx(`bi-${icon}`, "position-relative", {
          [className]: className,
        })}
        title={title}
        {...props}
      >
        <span
          className={clsx(
            "position-absolute",
            "top-0",
            "start-100",
            "translate-middle",
            "badge",
            "rounded-pill",
            badgeClasses,
            styles["icon-badge"]
          )}
        >
          {badge}
        </span>
      </i>
    );
  }
  return (
    <i
      className={clsx(`bi-${icon}`, { [className]: className })}
      title={title}
      {...props}
    />
  );
}

export default Icon;

/*
  SVG Implementation

  import BootstrapIcons from 'bootstrap-icons/bootstrap-icons.svg'
  function Icon({ icon, size = '1rem' }) {
    const link = `${BootstrapIcons}#${icon}`
    return (
      <svg className="bi" width={size} height={size} fill="currentColor">
        <use xlinkHref={link} />
      </svg>
    )
  }

*/
