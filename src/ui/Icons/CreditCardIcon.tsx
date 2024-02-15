import React from "react";
import { IconProps } from "typescript/interface/iconprops.interface";

const CreditCardIcon = ({ IconColor, IconWidth, IconHeight }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth ? IconWidth: "25"}
    height={IconHeight? IconHeight: "24"}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M7.5 15H10.5C10.7652 15 11.0196 14.8946 11.2071 14.7071C11.3946 14.5196 11.5 14.2652 11.5 14C11.5 13.7348 11.3946 13.4804 11.2071 13.2929C11.0196 13.1054 10.7652 13 10.5 13H7.5C7.23478 13 6.98043 13.1054 6.79289 13.2929C6.60536 13.4804 6.5 13.7348 6.5 14C6.5 14.2652 6.60536 14.5196 6.79289 14.7071C6.98043 14.8946 7.23478 15 7.5 15ZM19.5 5H5.5C4.70435 5 3.94129 5.31607 3.37868 5.87868C2.81607 6.44129 2.5 7.20435 2.5 8V17C2.5 17.7956 2.81607 18.5587 3.37868 19.1213C3.94129 19.6839 4.70435 20 5.5 20H19.5C20.2956 20 21.0587 19.6839 21.6213 19.1213C22.1839 18.5587 22.5 17.7956 22.5 17V8C22.5 7.20435 22.1839 6.44129 21.6213 5.87868C21.0587 5.31607 20.2956 5 19.5 5ZM20.5 17C20.5 17.2652 20.3946 17.5196 20.2071 17.7071C20.0196 17.8946 19.7652 18 19.5 18H5.5C5.23478 18 4.98043 17.8946 4.79289 17.7071C4.60536 17.5196 4.5 17.2652 4.5 17V11H20.5V17ZM20.5 9H4.5V8C4.5 7.73478 4.60536 7.48043 4.79289 7.29289C4.98043 7.10536 5.23478 7 5.5 7H19.5C19.7652 7 20.0196 7.10536 20.2071 7.29289C20.3946 7.48043 20.5 7.73478 20.5 8V9Z"
        fill={IconColor? IconColor: "#070707"}
      />
    </svg>
  );
};

export default CreditCardIcon;