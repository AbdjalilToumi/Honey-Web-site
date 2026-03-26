const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-amber-50">

      {/* Honeycomb animated background blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-300 rounded-full opacity-20 blur-3xl animate-pulse delay-700"></div>

      <div className="relative flex flex-col items-center gap-6 z-10">

        {/* Jar icon with drip animation */}
        <div className="relative flex items-center justify-center">
          <div className="text-8xl drop-shadow-xl animate-bounce">🍯</div>
          {/* Drip drop */}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-5 bg-amber-400 rounded-b-full opacity-80 animate-ping"></span>
        </div>

        {/* Brand name */}
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">
          Ifrane Miel
        </h1>

        {/* DaisyUI progress bar */}
        <div className="w-64 md:w-80">
          <progress className="progress progress-warning w-full h-3 rounded-full shadow-md"></progress>
        </div>

        {/* DaisyUI loading spinner + text */}
        <div className="flex items-center gap-3 text-amber-700">
          <span className="loading loading-spinner loading-md"></span>
          <span className="text-base md:text-lg font-semibold tracking-wide">
            Chargement en cours...
          </span>
        </div>

        {/* Bee row */}
        <div className="flex gap-3 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-2xl animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              🐝
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
