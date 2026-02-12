import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-950 via-emerald-900 to-gray-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-emerald-500/30 blur-3xl rounded-full animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative flex flex-col items-center gap-4 px-10 py-8 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl border border-white/20">
        <Loader className="animate-spin w-16 h-16 text-emerald-400 drop-shadow-lg" />

        <p className="text-white text-lg font-medium tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
