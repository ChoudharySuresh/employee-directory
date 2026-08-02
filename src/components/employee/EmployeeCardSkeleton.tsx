import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeeCardSkeleton = () => {
  return (
    <Card className="relative p-5">
      <Skeleton className="absolute right-4 top-4 h-9 w-9 rounded-full" />

      <div className="flex items-center gap-3">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <Skeleton className="mt-4 h-5 w-28 rounded-full" />

      <div className="mt-4 space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );
};

export default EmployeeCardSkeleton;
