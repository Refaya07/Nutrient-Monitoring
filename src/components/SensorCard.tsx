type Props = {
  label: string;
  value: string;
  unit?: string;
  color: string;
};

const SensorCard = ({ label, value, unit, color }: Props) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 ${color}`}>
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-3xl font-bold">
        {value} <span className="text-base">{unit}</span>
      </p>
    </div>
  );
};

export default SensorCard;
