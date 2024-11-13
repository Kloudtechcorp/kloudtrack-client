const NavigateIcon: React.FC<{ theme: string }> = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    // fill={theme === "dark" ? "#FFFFFF" : "#000000"}
    fill="none"
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export default NavigateIcon;
