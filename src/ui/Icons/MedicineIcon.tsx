import { primaryColors } from "Theme/_muiPalette";
import { IconProps } from "typescript/interface/iconprops.interface";

const MedicineIcon = ({ IconColor, IconWidth, IconHeight }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={IconWidth || "16"}
      height={IconHeight || "16"}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 7.33317C2 5.86041 3.19391 4.6665 4.66667 4.6665H11.3333C12.8061 4.6665 14 5.86041 14 7.33317V11.3332C14 12.8059 12.8061 13.9998 11.3333 13.9998H4.66667C3.19391 13.9998 2 12.8059 2 11.3332V7.33317ZM4.66667 5.99984C3.93029 5.99984 3.33333 6.59679 3.33333 7.33317V11.3332C3.33333 12.0696 3.93029 12.6665 4.66667 12.6665H11.3333C12.0697 12.6665 12.6667 12.0696 12.6667 11.3332V7.33317C12.6667 6.59679 12.0697 5.99984 11.3333 5.99984H4.66667Z"
        fill={IconColor || primaryColors.primary}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 7.3335C7.63181 7.3335 7.33333 7.63197 7.33333 8.00016V8.66683H6.66667C6.29848 8.66683 6 8.96531 6 9.3335C6 9.70169 6.29848 10.0002 6.66667 10.0002H7.33333V10.6668C7.33333 11.035 7.63181 11.3335 8 11.3335C8.36819 11.3335 8.66667 11.035 8.66667 10.6668V10.0002H9.33333C9.70152 10.0002 10 9.70169 10 9.3335C10 8.96531 9.70152 8.66683 9.33333 8.66683L8.66667 8.66683V8.00016C8.66667 7.63197 8.36819 7.3335 8 7.3335Z"
        fill={IconColor || primaryColors.primary}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66675 3.33333C6.29856 3.33333 6.00008 3.63181 6.00008 4V4.66667H4.66675V4C4.66675 2.89543 5.56218 2 6.66675 2H9.33341C10.438 2 11.3334 2.89543 11.3334 4V4.66667H10.0001V4C10.0001 3.63181 9.7016 3.33333 9.33341 3.33333H6.66675Z"
        fill={IconColor || primaryColors.primary}
      />
    </svg>
  );
};

export default MedicineIcon;
