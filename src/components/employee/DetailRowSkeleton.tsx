import { Skeleton } from "@/components/ui/skeleton";

const DetailRowSkeleton = () => {
  return (
    <div className="flex items-center justify-between border-b border-default py-3 last:border-0">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
};

export default DetailRowSkeleton;
