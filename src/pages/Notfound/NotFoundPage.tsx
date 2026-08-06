import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";

const floatingAnimation = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
`;

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
      <style dangerouslySetInnerHTML={{ __html: floatingAnimation }} />

      {/* Decorative premium ambient glow background mesh */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40 dark:opacity-20">
        <div className="h-[400px] w-[400px] rounded-full bg-radial from-brand/40 to-transparent blur-3xl sm:h-[600px] sm:w-[600px]" />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-radial from-favorite/30 to-transparent blur-3xl sm:h-[450px] sm:w-[450px]" />
      </div>

      <div className="relative z-10 max-w-md">
        {/* Floating 404 badge */}
        <div className="animate-float select-none text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand to-favorite">
          404
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </p>

        {/* Dynamic call to actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button render={<Link to="/" />} nativeButton={false} className="w-full sm:w-auto gap-2">
            <LuArrowLeft size={16} />
            Back to Home
          </Button>

          <Button render={<Link to="/favorites" />} nativeButton={false} variant="outline" className="w-full sm:w-auto gap-2">
            <LuHeart size={16} />
            View Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
