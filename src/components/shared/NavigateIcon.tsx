const NavigateIcon: React.FC<{ theme: string }> = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill={theme === "dark" ? "#FFFFFF" : "#000000"}
  >
    <path d="M280-160v-360q0-33 23.5-56.5T360-600h328l-64-64 56-56 160 160-160 160-56-56 64-64H360v360h-80Z" />
  </svg>
);

export default NavigateIcon;
