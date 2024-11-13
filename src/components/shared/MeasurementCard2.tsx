const MeasurementCard2: React.FC<{
  label: string;
  value: number;
  unit: string;
}> = ({ label, value, unit }) => (
  <div className="w-full h-full">
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">{label}</span>
      </div>
      <div className="cardTextDiv">
        <span className="weatherDataText">
          {Math.round(value * 100) / 100} {unit}
        </span>
      </div>
    </div>
  </div>
);

export default MeasurementCard2;
