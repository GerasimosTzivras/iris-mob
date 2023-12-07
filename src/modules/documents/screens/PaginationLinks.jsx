import { useMemo } from "react";
import clsx from "clsx";
import { Icon } from "@rneui/themed";
import { Button } from "@rneui/base";

function PaginationLinks({ page = 1, pages = 1, onClick }) {
  const links = useMemo(
    () => [
      {
        icon: "verticleright",
        tooltip: "first",
        page: 1,
        active: page === 1,
        disabled: page === 1,
      },
      {
        icon: "chevron-left",
        tooltip: "previous",
        page: page - 1,
        active: page === page - 1,
        disabled: page === 1,
      },
      {
        icon: "right",
        tooltip: "next",
        page: page + 1,
        active: page === page + 1,
        disabled: page === pages || pages === 0,
      },
      {
        icon: "back",
        tooltip: "last",
        page: pages,
        active: page === pages,
        disabled: pages === 0 || page === pages,
      },
    ],
    [page, pages]
  );

  return (
    <div className={clsx("btn-group", "btn-group-sm")}>
      {links.map((link) => (
        <Button
          key={link.icon}
          className={clsx("btn", "btn-outline-secondary", "d-flex")}
          title={link.tooltip}
          disabled={link.disabled}
          onClick={() => onClick(link.page)}
        >
          <Icon name="save" color="white" />
        </Button>
      ))}
    </div>
  );
}

export default PaginationLinks;
