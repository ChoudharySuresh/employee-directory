interface DetailRowprops {
  label: string;
  value: string | number;
}

const DetailRow = ({ label, value }: DetailRowprops) => {
  return (
    <div className="flex items-center justify-between border-b border-default py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-heading">{value}</span>
    </div>
  );
};

export default DetailRow;
