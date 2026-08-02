import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DetailRowSkeleton from "@/components/employee/DetailRowSkeleton";

const EmployeeDetailsSkeleton = () => {
  return (
    <div className="pt-24 max-w-screen-xl mx-auto px-4 pb-12">
      <Skeleton className="mb-6 h-4 w-32" />

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Skeleton className="mb-4 h-3 w-20" />
          {Array.from({ length: 10 }).map((_, i) => (
            <DetailRowSkeleton key={i} />
          ))}
        </Card>

        <Card className="p-6">
          <Skeleton className="mb-4 h-3 w-20" />
          {Array.from({ length: 4 }).map((_, i) => (
            <DetailRowSkeleton key={i} />
          ))}
        </Card>

        <Card className="p-6">
          <Skeleton className="mb-4 h-3 w-20" />
          {Array.from({ length: 5 }).map((_, i) => (
            <DetailRowSkeleton key={i} />
          ))}
        </Card>

        <Card className="p-6">
          <Skeleton className="mb-4 h-3 w-20" />
          {Array.from({ length: 5 }).map((_, i) => (
            <DetailRowSkeleton key={i} />
          ))}
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <Skeleton className="mb-3 h-3 w-24" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-2/3" />
      </Card>
    </div>
  );
};

export default EmployeeDetailsSkeleton;
